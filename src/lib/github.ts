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
    next: { revalidate: 3600 },
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

type PushEvent = {
  type: string;
  repo: { name: string };
  payload: { head?: string };
};

type CommitResponse = {
  html_url: string;
  commit: { message: string; author: { date: string } };
};

export async function getLastCommit(): Promise<LastCommit | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const headers = {
    Authorization: `bearer ${token}`,
    Accept: "application/vnd.github+json",
  };

  const eventsRes = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
    { headers, next: { revalidate: 3600 } },
  );
  if (!eventsRes.ok) return null;

  const events: PushEvent[] = await eventsRes.json();
  const push = events.find((e) => e.type === "PushEvent" && e.payload.head);
  if (!push?.payload.head) return null;

  // The events feed only carries before/after SHAs, not the commit
  // message -- a second request against the commit itself gets that.
  const commitRes = await fetch(
    `https://api.github.com/repos/${push.repo.name}/commits/${push.payload.head}`,
    { headers, next: { revalidate: 3600 } },
  );
  if (!commitRes.ok) return null;

  const commit: CommitResponse = await commitRes.json();
  return {
    repo: push.repo.name,
    message: commit.commit.message.split("\n")[0],
    url: commit.html_url,
    date: commit.commit.author.date,
  };
}
