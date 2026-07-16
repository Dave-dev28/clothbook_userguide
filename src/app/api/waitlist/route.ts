import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { siteConfig } from "@/lib/config";

const ROLES = new Set(["tailor", "shop_staff", "customer", "curious"]);
const INTERESTS = new Set([
  "voice_agent",
  "design_studio",
  "aso_ebi",
  "basics",
]);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { name, phone, role, interested_in } = body as {
    name?: string | null;
    phone?: string;
    role?: string;
    interested_in?: string[];
  };

  const cleanedPhone =
    typeof phone === "string" ? phone.replace(/[\s\-()]/g, "") : "";
  if (!cleanedPhone || cleanedPhone.length < 10) {
    return NextResponse.json(
      { error: "A valid phone number is required." },
      { status: 400 },
    );
  }

  if (!role || !ROLES.has(role)) {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }

  const interests = Array.isArray(interested_in)
    ? interested_in.filter((i) => INTERESTS.has(i))
    : [];

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // Dev-friendly: accept signups without Supabase so UI can be tested
    if (process.env.NODE_ENV === "development") {
      console.info("[waitlist] Supabase not configured — dry-run signup", {
        name,
        phone: cleanedPhone,
        role,
        interested_in: interests,
      });
      return NextResponse.json({ ok: true, dryRun: true });
    }
    return NextResponse.json(
      { error: "Waitlist is temporarily unavailable." },
      { status: 503 },
    );
  }

  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("waitlist_signups").insert({
    name: typeof name === "string" && name.trim() ? name.trim() : null,
    phone: cleanedPhone,
    role,
    interested_in: interests,
    source: siteConfig.source,
  });

  if (error) {
    console.error("[waitlist] insert failed", error.message);
    return NextResponse.json(
      { error: "Could not save signup. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
