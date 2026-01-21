import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  return (
    <>
      <SiteHeader />
      <ProfileClient />
      <SiteFooter />
    </>
  );
}