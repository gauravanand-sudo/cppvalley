"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  User,
  Briefcase,
  Clock,
  Phone,
  CreditCard,
  ArrowRight,
  PencilLine,
  Sparkles,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type Profile = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  experience: number;
  company: string | null;
  role: string | null;
  phone: string | null;
};

type Purchase = {
  id: string;
  track_slug: string | null;
  track_title: string | null;
  amount: number;
  currency: string;
  status: string;
  purchased_at: string;
  expires_at: string | null;
};

export default function ProfileClient() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    company: "",
    role: "",
    phone: "",
  });
  
  const router = useRouter();
  const supabase = createClient();

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push("/");
      return;
    }
    
    fetchProfile(session.user.id);
    fetchPurchases(session.user.id);
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // If profile doesn't exist, create it
        const { data: userData } = await supabase.auth.getUser();
        
        if (userData.user) {
          await createProfile(userData.user);
          fetchProfile(userData.user.id);
        }
      } else {
        setProfile(data);
        setFormData({
          name: data.name || "",
          experience: data.experience?.toString() || "0",
          company: data.company || "",
          role: data.role || "",
          phone: data.phone || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const createProfile = async (user: SupabaseUser) => {
    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.email?.split("@")[0],
      image: user.user_metadata?.avatar_url,
      experience: 0,
      company: "",
      role: "",
      phone: "",
    });

    if (error) {
      console.error("Error creating profile:", error);
    }
  };

  const fetchPurchases = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("purchases")
        .select("*")
        .eq("user_id", userId)
        .order("purchased_at", { ascending: false });

      if (!error && data) {
        setPurchases(data);
      }
    } catch (error) {
      console.error("Error fetching purchases:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;

    try {
      setSaveError(null);
      const { error } = await supabase
        .from("profiles")
        .update({
          name: formData.name,
          experience: parseInt(formData.experience) || 0,
          company: formData.company,
          role: formData.role,
          phone: formData.phone,
        })
        .eq("id", profile.id);

      if (error) throw error;

      // Refresh profile
      fetchProfile(profile.id);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveError("Unable to update your profile right now.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      minimumFractionDigits: 0,
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const transactionRef = (purchaseId: string) => {
    return purchaseId.slice(0, 8).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,#4A1F2C_0%,#181215_42%,#130F12_100%)]">
        <div className="text-[#CFB8C0]">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <main className="relative min-h-screen bg-[radial-gradient(circle_at_top_left,#4A1F2C_0%,#181215_42%,#130F12_100%)] text-[#F6EDF0]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-[#D46886]/18 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-[#7B3148]/28 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F2C8D5]">
            <Sparkles className="h-3.5 w-3.5" />
            Account hub
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Your profile, purchases, and learning progress
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#CFB8C0]">
            Keep your account details up to date, jump back into purchased courses, and review your learning activity in one clean place.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {profile.image ? (
                    <Image
                      src={profile.image}
                      alt={profile.name || "User"}
                      width={48}
                      height={48}
                      className="h-14 w-14 rounded-full ring-2 ring-white/10"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9B1C3A,#C45472)] text-lg font-bold text-white">
                      {profile.name?.[0]?.toUpperCase() || profile.email?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-white">{profile.name || "User"}</h2>
                    <p className="text-sm text-[#B996A2]">{profile.email}</p>
                  </div>
                </div>
                
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-[#F2C8D5] transition-colors hover:bg-white/[0.1]"
                  >
                    <PencilLine className="h-4 w-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditing(false);
                        fetchProfile(profile.id);
                      }}
                      className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-[#CFB8C0] transition-colors hover:bg-white/[0.08]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="rounded-full bg-[#9B1C3A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#7F1730]"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {saveError ? (
                  <div className="rounded-xl border border-[#D46886]/25 bg-[#D46886]/10 px-4 py-3 text-sm text-[#F2C8D5]">
                    {saveError}
                  </div>
                ) : null}
                {editing ? (
                  <>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#6B4D55]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none focus:border-[#9B1C3A]/50 focus:ring-2 focus:ring-[#9B1C3A]/10"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#6B4D55]">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none focus:border-[#9B1C3A]/50 focus:ring-2 focus:ring-[#9B1C3A]/10"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#6B4D55]">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none focus:border-[#9B1C3A]/50 focus:ring-2 focus:ring-[#9B1C3A]/10"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#6B4D55]">
                        Current Role
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none focus:border-[#9B1C3A]/50 focus:ring-2 focus:ring-[#9B1C3A]/10"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#6B4D55]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none focus:border-[#9B1C3A]/50 focus:ring-2 focus:ring-[#9B1C3A]/10"
                      />
                    </div>
                  </>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="mb-3 inline-flex rounded-xl bg-white/[0.08] p-2 text-[#F2C8D5]">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="text-sm text-[#B996A2]">Name</div>
                      <div className="font-medium text-white">{profile.name || "Not set"}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="mb-3 inline-flex rounded-xl bg-white/[0.08] p-2 text-[#F2C8D5]">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="text-sm text-[#B996A2]">Experience</div>
                      <div className="font-medium text-white">{profile.experience} years</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="mb-3 inline-flex rounded-xl bg-white/[0.08] p-2 text-[#F2C8D5]">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <div className="text-sm text-[#B996A2]">Company & Role</div>
                      <div className="font-medium text-white">
                        {profile.company && profile.role ? `${profile.company} • ${profile.role}` : "Not set"}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="mb-3 inline-flex rounded-xl bg-white/[0.08] p-2 text-[#F2C8D5]">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="text-sm text-[#B996A2]">Phone</div>
                      <div className="font-medium text-white">{profile.phone || "Not set"}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur">
              <h2 className="mb-6 text-xl font-semibold text-white">Your Purchases</h2>

              {purchases.length === 0 ? (
                <div className="py-10 text-center text-[#B996A2]">
                  <CreditCard className="mx-auto mb-3 h-12 w-12 text-[#8F717B]" />
                  <p>No purchases yet</p>
                  <Link
                    href="/learn/tracks"
                    className="mt-3 inline-flex items-center gap-2 font-medium text-[#F2C8D5] hover:text-white"
                  >
                    Browse courses
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">
                            {purchase.track_title || "Course Access"}
                          </div>
                          <div className="mt-1 text-sm text-[#B996A2]">
                            Purchased on {formatDate(purchase.purchased_at)}
                            {purchase.expires_at && (
                              <span> • Expires {formatDate(purchase.expires_at)}</span>
                            )}
                          </div>
                          <div className="mt-1 text-xs text-[#8F717B]">
                            Transaction #{transactionRef(purchase.id)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-white">
                            {formatCurrency(purchase.amount, purchase.currency)}
                          </div>
                          <div className="text-sm capitalize text-[#B996A2]">
                            {purchase.status}
                          </div>
                        </div>
                      </div>

                      {purchase.track_slug && (
                        <div className="mt-3 flex items-center justify-between gap-4">
                          <Link
                            href={`/learn/tracks/${purchase.track_slug}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#F2C8D5] hover:text-white"
                          >
                            Open Purchased Course
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                          <div className="text-xs text-[#8F717B]">
                            Course: {purchase.track_slug}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[1.75rem] border border-white/10 bg-[#171216]/85 p-6 text-[#F8EFF2] shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur">
              <h2 className="mb-6 text-xl font-semibold text-white">Account Stats</h2>
              
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-[#D8C0C8]">Total Purchases</div>
                  <div className="text-2xl font-semibold text-white">{purchases.length}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-[#D8C0C8]">Active Courses</div>
                  <div className="text-2xl font-semibold text-white">
                    {purchases.filter(p => !p.expires_at || new Date(p.expires_at) > new Date()).length}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-[#D8C0C8]">Total Spent</div>
                  <div className="text-2xl font-semibold text-white">
                    {formatCurrency(
                      purchases.reduce((sum, p) => sum + p.amount, 0),
                      "INR"
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur">
              <h2 className="mb-6 text-xl font-semibold text-white">Quick Actions</h2>
              
              <div className="space-y-3">
                <Link
                  href="/learn/tracks"
                  className="flex items-center justify-between rounded-2xl border border-white/10 p-4 transition hover:bg-white/[0.06]"
                >
                  <span className="font-medium text-white">Browse All Courses</span>
                  <ArrowRight className="h-4 w-4 text-[#F2C8D5]" />
                </Link>
                <Link
                  href="/learn/tracks"
                  className="flex items-center justify-between rounded-2xl border border-white/10 p-4 transition hover:bg-white/[0.06]"
                >
                  <span className="font-medium text-white">Purchase More Courses</span>
                  <Wallet className="h-4 w-4 text-[#F2C8D5]" />
                </Link>
                <Link
                  href="/learn/tracks"
                  className="flex items-center justify-between rounded-2xl border border-white/10 p-4 transition hover:bg-white/[0.06]"
                >
                  <span className="font-medium text-white">Open Learning Dashboard</span>
                  <ShieldCheck className="h-4 w-4 text-[#F2C8D5]" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-between rounded-2xl border border-[#D46886]/25 p-4 text-left text-[#F2C8D5] transition hover:bg-white/[0.06]"
                >
                  <span className="font-medium">Logout</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
