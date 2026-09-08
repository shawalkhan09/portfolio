const GITHUB_USERNAME = "shawalkhan09";

export type ContributionDay = {
  date: string;
  count: number;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionDay[][];
};

export type LastCommit = {
  repo: string;
  message: string;
  url: string;
  date: string;
};

type GraphqlContributionDay = { date: string; contributionCount: number };

type GraphqlResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: GraphqlContributionDay[] }[];
        };
      };
    };
  };
  errors?: unknown;
};

export async function getContributionCalendar(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }`,
      variables: { login: GITHUB_USERNAME },
    }),
    next: { revalidate: 300 },
  });

  if (!res.ok) return null;
  const json: GraphqlResponse = await res.json();
  const calendar = json.data?.user.contributionsCollection.contributionCalendar;
  if (!calendar) return null;

  return {
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
      })),
    ),
  };
}

type RepoCommitNode = {
  name: string;
  defaultBranchRef: {
    target: {
      oid: string;
      message: string;
      committedDate: string;
      url: string;
    };
  } | null;
};

type LastCommitGraphqlResponse = {
  data?: {
    user: { repositories: { nodes: RepoCommitNode[] } };
  };
};

export async function getLastCommit(): Promise<LastCommit | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  // Reads the latest commit straight off each repo's default branch ref,
  // ordered by push time -- the public Events API was tried first but
  // silently drops pushes (confirmed: a same-day push was still missing
  // a full day later), so it can't be trusted for "most recent".
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query($login: String!) {
        user(login: $login) {
          repositories(first: 1, orderBy: {field: PUSHED_AT, direction: DESC}, ownerAffiliations: OWNER, isFork: false) {
            nodes {
              name
              defaultBranchRef {
                target {
                  ... on Commit {
                    oid
                    message
                    committedDate
                    url
                  }
                }
              }
            }
          }
        }
      }`,
      variables: { login: GITHUB_USERNAME },
    }),
    next: { revalidate: 300 },
  });

  if (!res.ok) return null;
  const json: LastCommitGraphqlResponse = await res.json();
  const repo = json.data?.user.repositories.nodes[0];
  const commit = repo?.defaultBranchRef?.target;
  if (!repo || !commit) return null;

  return {
    repo: repo.name,
    message: commit.message.split("\n")[0],
    url: commit.url,
    date: commit.committedDate,
  };
}
