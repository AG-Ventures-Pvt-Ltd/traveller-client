import { Suspense } from "react";
import PageContent from "./PageContent";
import Loader from "@/common/components/composites/Loader/loader";


export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <PageContent />
    </Suspense>
  );
}
