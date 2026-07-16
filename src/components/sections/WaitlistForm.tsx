"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { siteConfig } from "@/lib/config";
import type { InterestValue, RoleValue } from "@/content";

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const { t } = useLocale();
  const section = t.waitlist;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<RoleValue>("tailor");
  const [interests, setInterests] = useState<InterestValue[]>([]);

  if (!siteConfig.waitlistEnabled) {
    return (
      <section
        id="join"
        className="scroll-mt-20 border-b border-[var(--ink)]/8 py-14 sm:py-20"
      >
        <div className="mx-auto max-w-xl px-4 pl-11 text-center sm:px-6 sm:pl-16 md:pl-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)]">
            {t.appCta.title}
          </h2>
          <p className="mt-3 text-base text-[var(--ink)]/85">{t.appCta.body}</p>
          <a
            href={siteConfig.appUrl}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3 text-base font-semibold text-[var(--calico)] shadow-sm shadow-[var(--brand)]/30 transition-colors hover:bg-[var(--brand-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
            rel="noopener noreferrer"
          >
            {t.appCta.button}
          </a>
        </div>
      </section>
    );
  }

  function toggleInterest(value: InterestValue) {
    setInterests((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value],
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const cleaned = phone.replace(/[\s\-()]/g, "");
    if (cleaned.length < 10) {
      setStatus("error");
      setErrorMsg(section.errorPhone);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || null,
          phone: cleaned,
          role,
          interested_in: interests,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || section.errorGeneric);
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(section.errorGeneric);
    }
  }

  return (
    <section
      id="join"
      className="scroll-mt-20 border-b border-[var(--ink)]/8 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-xl px-4 pl-11 sm:px-6 sm:pl-16 md:pl-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand-deep)]">
          {section.eyebrow}
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
          {section.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--ink)]/85">
          {section.body}
        </p>

        {status === "success" ? (
          <div
            className="mt-8 rounded-2xl border border-[var(--indigo)]/30 bg-[var(--indigo)]/10 p-6"
            role="status"
          >
            <p className="font-display text-xl font-semibold text-[var(--ink)]">
              {section.successTitle}
            </p>
            <p className="mt-2 text-base text-[var(--ink)]/85">
              {section.successBody}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label
                htmlFor="wl-name"
                className="block text-sm font-semibold text-[var(--ink)]"
              >
                {section.fields.name}
              </label>
              <input
                id="wl-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={section.fields.namePlaceholder}
                className="field-input mt-1.5"
              />
            </div>

            <div>
              <label
                htmlFor="wl-phone"
                className="block text-sm font-semibold text-[var(--ink)]"
              >
                {section.fields.phone}{" "}
                <span className="text-[var(--terracotta-clay)]">*</span>
              </label>
              <input
                id="wl-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={section.fields.phonePlaceholder}
                className="field-input mt-1.5"
                aria-describedby="wl-phone-hint"
              />
              <p
                id="wl-phone-hint"
                className="mt-1 text-xs text-[var(--thread-grey)]"
              >
                {section.fields.phoneHint}
              </p>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold text-[var(--ink)]">
                {section.fields.role}
              </legend>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {section.roles.map((r) => (
                  <label
                    key={r.value}
                    className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                      role === r.value
                        ? "border-[var(--indigo)] bg-[var(--indigo)]/10 text-[var(--indigo)]"
                        : "border-[var(--ink)]/15 text-[var(--ink)] hover:border-[var(--ink)]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r.value}
                      checked={role === r.value}
                      onChange={() => setRole(r.value)}
                      className="sr-only"
                    />
                    {r.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-[var(--ink)]">
                {section.fields.interests}
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {section.interests.map((item) => {
                  const on = interests.includes(item.value);
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => toggleInterest(item.value)}
                      aria-pressed={on}
                      className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--indigo)] ${
                        on
                          ? "bg-[var(--thread-gold)] text-[var(--ink)]"
                          : "bg-[var(--ink)]/5 text-[var(--ink)] hover:bg-[var(--ink)]/10"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {status === "error" && errorMsg && (
              <p
                className="rounded-xl border border-[var(--terracotta-clay)]/40 bg-[var(--terracotta-clay)]/10 px-3 py-2 text-sm text-[var(--ink)]"
                role="alert"
              >
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex w-full min-h-12 items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3 text-base font-semibold text-[var(--calico)] shadow-sm shadow-[var(--brand)]/30 transition-colors hover:bg-[var(--brand-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] disabled:opacity-60"
            >
              {status === "submitting"
                ? section.submitting
                : section.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
