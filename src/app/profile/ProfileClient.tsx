"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  User,
  Briefcase,
  Clock,
  Phone,
  BookOpen,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

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
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    company: "",
    role: "",
    phone: "",
  });
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push("/");
      return;
    }
    
    fetchProfile(session.user.id);
    fetchPurchases(session.user.id);
  };

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

  const createProfile = async (user: any) => {
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
      alert("Failed to update profile");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <main className="relative bg-white text-gray-900">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="mt-3 text-gray-600">
            Manage your account, view purchases, and track your learning progress.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt={profile.name || "User"}
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {profile.name?.[0]?.toUpperCase() || profile.email?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold">{profile.name || "User"}</h2>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                  </div>
                </div>
                
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="text-sm text-cyan-600 hover:text-cyan-800 font-medium"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditing(false);
                        fetchProfile(profile.id);
                      }}
                      className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="text-sm bg-cyan-600 text-white px-3 py-1 rounded-lg hover:bg-cyan-700 font-medium"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {editing ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Role
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Name</div>
                        <div className="font-medium">{profile.name || "Not set"}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Experience</div>
                        <div className="font-medium">
                          {profile.experience} years
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Company & Role</div>
                        <div className="font-medium">
                          {profile.company && profile.role
                            ? `${profile.company} • ${profile.role}`
                            : "Not set"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium">{profile.phone || "Not set"}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Purchases Card */}
            <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-6">
              <h2 className="text-xl font-bold mb-6">Your Purchases</h2>

              {purchases.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p>No purchases yet</p>
                  <Link
                    href="/learn/tracks"
                    className="inline-block mt-3 text-cyan-600 hover:text-cyan-800 font-medium"
                  >
                    Browse tracks →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="rounded-xl border border-gray-200 bg-white p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            {purchase.track_title || "Track Access"}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Purchased on {formatDate(purchase.purchased_at)}
                            {purchase.expires_at && (
                              <span> • Expires {formatDate(purchase.expires_at)}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            {formatCurrency(purchase.amount, purchase.currency)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {purchase.status}
                          </div>
                        </div>
                      </div>

                      {purchase.track_slug && (
                        <Link
                          href={`/learn/tracks/${purchase.track_slug}`}
                          className="mt-3 inline-flex items-center text-sm text-cyan-600 hover:text-cyan-800 font-medium"
                        >
                          Access Track →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Stats & Actions */}
          <div className="space-y-8">
            {/* Account Stats */}
            <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-6">
              <h2 className="text-xl font-bold mb-6">Account Stats</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Total Purchases</div>
                  <div className="font-medium text-2xl">{purchases.length}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Active Courses</div>
                  <div className="font-medium text-2xl">
                    {purchases.filter(p => !p.expires_at || new Date(p.expires_at) > new Date()).length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Spent</div>
                  <div className="font-medium text-2xl">
                    {formatCurrency(
                      purchases.reduce((sum, p) => sum + p.amount, 0),
                      "INR"
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-6">
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <Link
                  href="/learn/tracks"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition"
                >
                  <span className="font-medium">Browse All Tracks</span>
                  <span className="text-gray-400">→</span>
                </Link>
                <Link
                  href="/pricing"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition"
                >
                  <span className="font-medium">Upgrade Plan</span>
                  <span className="text-gray-400">→</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center justify-between p-3 rounded-lg border border-red-200 hover:border-red-300 hover:bg-red-50 transition text-red-600"
                >
                  <span className="font-medium">Logout</span>
                  <span className="text-red-400">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}