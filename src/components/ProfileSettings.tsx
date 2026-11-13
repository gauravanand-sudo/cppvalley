"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { getSupabaseClient } from "@/lib/supabase-client";

type ProfileRecord = {
  username: string;
  display_name: string | null;
  leaderboard_opt_in: boolean;
};

const USERNAME_RULE = /^[a-z0-9_]{3,30}$/;

export function ProfileSettings() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [publicProfile, setPublicProfile] = useState(false);
  const [status, setStatus] = useState("Checking your profile…");
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    const client = getSupabaseClient();
    if (!client) { setStatus("Supabase authentication is not configured."); return; }
    client.auth.getUser().then(async ({ data, error }) => {
      if (!active) return;
      if (error || !data.user) {
        setStatus("Sign in to manage your public C++ engineering profile.");
        return;
      }
      setUserId(data.user.id);
      const result = await client.from("profiles")
        .select("username,display_name,leaderboard_opt_in")
        .eq("id", data.user.id).maybeSingle();
      if (!active) return;
      if (result.error || !result.data) {
        setStatus("Profile storage is not configured. Apply the reviewed Supabase migration first.");
        return;
      }
      const profile = result.data as ProfileRecord;
      setUsername(profile.username);
      setDisplayName(profile.display_name || "");
      setPublicProfile(profile.leaderboard_opt_in);
      setLoaded(true);
      setStatus("");
    }).catch(() => { if (active) setStatus("Unable to load your profile."); });
    return () => { active = false; };
  }, []);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!USERNAME_RULE.test(username)) {
      setStatus("Username must be 3–30 lowercase letters, digits, or underscores.");
      return;
    }
    if (displayName.length > 80) {
      setStatus("Display name must contain at most 80 characters.");
      return;
    }
    const client = getSupabaseClient();
    if (!client || !userId || !loaded) return;
    setBusy(true);
    setStatus("");
    try {
      const response = await client.from("profiles")
        .update({
          username,
          display_name: displayName.trim() || null,
          leaderboard_opt_in: publicProfile,
          updated_at: new Date().toISOString(),
        }).eq("id", userId).select("username").single();
      setStatus(response.error ? "Could not save profile: " + response.error.message :
        "Saved. " + (publicProfile ? "Your public profile is visible." : "Your profile remains private."));
    } catch {
      setStatus("Could not save the profile. Try again.");
    } finally { setBusy(false); }
  }

  return <section className="cv-profile-settings cv-white-card">
    <div className="cv-section-head">
      <div><span className="cv-eyebrow">PUBLIC IDENTITY</span><h2>Engineering profile</h2></div>
      {loaded && publicProfile && USERNAME_RULE.test(username)
        ? <Link href={"/u/" + username}>View public profile ↗</Link>
        : null}
    </div>
    {!loaded ? <p role="status">{status}</p> : <form onSubmit={save}>
      <div className="cv-profile-settings-fields">
        <label>Username
          <input value={username} onChange={event => setUsername(event.target.value.toLowerCase())}
            pattern="[a-z0-9_]{3,30}" maxLength={30} minLength={3} required />
        </label>
        <label>Display name (optional)
          <input value={displayName} onChange={event => setDisplayName(event.target.value)}
            maxLength={80} placeholder="How others should address you" />
        </label>
      </div>
      <label className="cv-profile-toggle">
        <input type="checkbox" checked={publicProfile}
          onChange={event => setPublicProfile(event.target.checked)} />
        <span><strong>Make my profile public</strong>
          <small>Opt in to a public username and display name. Your email and source code are never displayed publicly.</small>
        </span>
      </label>
      <div className="cv-profile-actions">
        <button type="submit" className="cv-btn cv-btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Save profile"}
        </button>
        <p role="status">{status}</p>
      </div>
    </form>}
  </section>;
}
