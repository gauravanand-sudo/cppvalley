import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";
import AppLoadingScreen from "@/components/AppLoadingScreen";

export default function CheckoutPage() {
  return (
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
  );
}
