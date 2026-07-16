"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

/**
 * The single truly interactive demo on the page:
 * order status stepper (cutting → delivered).
 */
export function StatusStepper() {
  const { t } = useLocale();
  const stages = t.howItWorks.stepper.stages;
  const [active, setActive] = useState(0);

  return (
    <div className="rounded-2xl border border-[var(--ink)]/10 bg-[var(--calico-raised)] p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold text-[var(--indigo)]">
        {t.howItWorks.stepper.label}
      </p>
      <p className="mt-1 text-sm text-[var(--thread-grey)]">
        {t.howItWorks.stepper.hint}
      </p>

      <ol className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-1">
        {stages.map((stage, i) => {
          const isActive = i === active;
          const isDone = i < active;
          return (
            <li key={stage} className="flex items-center gap-1 sm:contents">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={isActive ? "step" : undefined}
                className={`min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--indigo)] ${
                  isActive
                    ? "bg-[var(--indigo)] text-[var(--calico)]"
                    : isDone
                      ? "bg-[var(--indigo)]/15 text-[var(--indigo)]"
                      : "bg-[var(--ink)]/5 text-[var(--ink)] hover:bg-[var(--ink)]/10"
                }`}
              >
                {stage}
              </button>
              {i < stages.length - 1 && (
                <span
                  className="hidden text-[var(--thread-grey)] sm:inline"
                  aria-hidden
                >
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div
        className="mt-5 rounded-xl bg-[var(--ink)]/5 px-4 py-3 text-sm text-[var(--ink)]"
        role="status"
        aria-live="polite"
      >
        <span className="font-semibold text-[var(--indigo)]">
          {stages[active]}
        </span>
        <span className="text-[var(--thread-grey)]">
          {" "}
          · step {active + 1} of {stages.length}
        </span>
      </div>
    </div>
  );
}
