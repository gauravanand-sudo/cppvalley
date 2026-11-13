import "server-only";

type VerifiedWrite = {
  jwt: string | null;
  problemSlug: string;
  source: string;
  accepted: boolean;
  status: string;
  passed: number;
  total: number;
};

const allowedStatuses = new Set([
  "Accepted","Wrong Answer","Compilation Error","Runtime Error",
  "Time Limit Exceeded","Time or Memory Limit Exceeded","Execution Error",
]);

function supabaseBase() {
  const raw=process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  try {
    const url=new URL(raw);
    return url.protocol==="https:" && !url.username && !url.password ? url.origin : null;
  }catch{return null;}
}

/**
 * Persistence is entirely opt-in. If the DB migration or the server-only
 * service-role key is missing, coding verdicts still return normally and
 * remain in the browser's local progress. A forged client "Accepted" cannot
 * be persisted because only this trusted route can insert into the table.
 */
export async function persistVerifiedSubmission(info: VerifiedWrite):Promise<boolean> {
  const root=supabaseBase();
  const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
  const publicKey=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!root || !serviceKey || !publicKey || !info.jwt ||
      info.jwt.length>4096 || info.source.length>25000) return false;

  try {
    // This request validates the user JWT at Supabase Auth, rather than
    // accepting a user ID or an unverified JWT payload from the browser.
    const identity=await fetch(root+"/auth/v1/user",{
      headers:{apikey:publicKey,Authorization:"Bearer "+info.jwt},
      cache:"no-store",signal:AbortSignal.timeout(6500),
    });
    if (!identity.ok) return false;
    const user=await identity.json() as {id?:unknown};
    if (typeof user.id!=="string" || !/^[0-9a-f-]{36}$/i.test(user.id)) return false;

    const verdict=info.accepted ? "Accepted" :
      allowedStatuses.has(info.status) ? info.status : "Execution Error";

    const result=await fetch(root+"/rest/v1/practice_submissions",{
      method:"POST",
      headers:{
        apikey:serviceKey,Authorization:"Bearer "+serviceKey,
        "Content-Type":"application/json",Prefer:"return=minimal",
      },
      body:JSON.stringify({
        user_id:user.id,
        problem_slug:info.problemSlug,
        source_code:info.source,
        verdict,
        passed:info.passed,
        total:info.total,
      }),
      cache:"no-store",signal:AbortSignal.timeout(6500),
    });
    return result.ok;
  }catch{return false;}
}
