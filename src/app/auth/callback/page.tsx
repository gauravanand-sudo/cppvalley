import { Suspense } from "react";
import CallbackClient from "./CallbackClient";
import AppLoadingScreen from "@/components/AppLoadingScreen";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <AppLoadingScreen
          label="cppvalley loading"
          caption="Signing you in with cppvalley."
        />
      }
    >
      <CallbackClient />
    </Suspense>
  );
}
