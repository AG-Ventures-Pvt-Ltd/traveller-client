import { Suspense } from "react";
import PageContent from "./PageContent";
import Loader from "@/components/Loader/loader";


export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <PageContent />
    </Suspense>
  );
}
