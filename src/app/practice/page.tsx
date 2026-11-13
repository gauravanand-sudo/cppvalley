import { permanentRedirect } from "next/navigation";

/** Preserve the original Practice URL while keeping one unified 400-topic catalog. */
export default function PracticeIndex() {
  permanentRedirect("/problems");
}
