import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";
import AppLoadingScreen from "@/components/AppLoadingScreen";
import SiteHeader from "@/components/SiteHeader";

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <Suspense
        fallback={
          <AppLoadingScreen
            label="cppvalley loading"
            caption="Preparing your secure cppvalley checkout."
          />
        }
      >
        <CheckoutClient />
      </Suspense>
    </>
  );
}
