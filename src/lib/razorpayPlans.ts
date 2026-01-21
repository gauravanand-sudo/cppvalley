export type PlanKey = "monthly" | "yearly";

export const trackPlanIds: Record<string, Record<PlanKey, string>> = {
  "60-day-cpp-interview": {
    monthly: "plan_XXXXXXXXXXXXXX",
    yearly: "plan_YYYYYYYYYYYYYY",
  },
  // Add more tracks here
};

export const sitePlanIds: Record<PlanKey, string> = {
  monthly: "plan_SITE_MONTHLY",
  yearly: "plan_SITE_YEARLY",
};
