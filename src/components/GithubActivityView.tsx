"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ContributionCalendar, LastCommit } from "@/lib/github";

function levelForCount(count: number) {
  if (count === 0) return 0.08;
  if (count <= 2) return 0.35;
  if (count <= 5) return 0.55;
  if (count <= 9) return 0.75;
  return 1;
}

function formatRelative(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const hours = Math.round(diffMs / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export function GithubActivityView({
  calendar,
  lastCommit,
}: {
  calendar: ContributionCalendar;
  lastCommit: LastCommit | null;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className="mt-8"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="font-display text-3xl uppercase">
          {calendar.totalContributions}
        </p>
        <p className="text-muted text-sm">contributions in the last year</p>
      </div>

      <div
        aria-hidden="true"
        className="mt-6 flex gap-[3px] overflow-x-auto pb-2"
      >
        {calendar.weeks.map((week) => (
          <div key={week[0]?.date} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.count} contributions on ${day.date}`}
                className="bg-accent h-2.5 w-2.5 rounded-[2px]"
                style={{ opacity: levelForCount(day.count) }}
              />
            ))}
          </div>
        ))}
      </div>

      {lastCommit && (
        <p className="text-muted mt-6 text-sm">
          Last commit{" "}
          <a
            href={lastCommit.url}
            target="_blank"
            rel="noopener noreferrer"
            title={lastCommit.message}
            className="link-underline text-accent"
          >
            {truncate(lastCommit.message, 72)}
          </a>{" "}
          on {lastCommit.repo}, {formatRelative(lastCommit.date)}
        </p>
      )}
    </motion.div>
  );
}
