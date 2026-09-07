import type { ReactNode } from "react";
import type { PrivateApplicationDto } from "@/lib/api/types";
import { MobileApplicationRow } from "./mobile-application-row";

export function MobileApplicationsList({ applications, renderActions }: {
  applications: PrivateApplicationDto[];
  renderActions: (application: PrivateApplicationDto) => ReactNode;
}) {
  return (
    <ul aria-label="Your applications" className="divide-y divide-slate-100 border-t border-slate-200/80 @min-[740px]:hidden">
      {applications.map((application) => <MobileApplicationRow key={application.id} application={application} actions={renderActions(application)} />)}
    </ul>
  );
}
