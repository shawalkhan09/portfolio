import { getContributionCalendar, getLastCommit } from "@/lib/github";
import { GithubActivityView } from "./GithubActivityView";

export async function GithubActivity() {
  const calendar = await getContributionCalendar();
  if (!calendar) return null;

  const lastCommit = await getLastCommit();

  return (
    <section
      id="github-activity"
      aria-label="GitHub activity"
      className="px-6 py-24 sm:px-12"
    >
      <h2 className="text-display-lg">GitHub Activity</h2>
      <GithubActivityView calendar={calendar} lastCommit={lastCommit} />
    </section>
  );
}
