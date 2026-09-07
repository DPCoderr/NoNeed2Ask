import type { ReactNode } from "react";
import type { PrivateApplicationDto } from "@/lib/api/types";
import { ApplicationTableRow } from "./application-table-row";

export function ApplicationsTable({ applications, renderActions }: {
  applications: PrivateApplicationDto[];
  renderActions: (application: PrivateApplicationDto) => ReactNode;
}) {
  return (
    <div className="hidden @min-[740px]:block">
      <table className="w-full table-fixed border-collapse text-left">
        <caption className="sr-only">Your applications</caption>
        <thead>
          <tr className="border-y border-slate-200/80 bg-[#fafbfc] text-[11px] font-medium text-slate-500">
            <th scope="col" className="w-[38%] px-6 py-3 font-medium">Company / role</th>
            <th scope="col" className="w-[22%] px-3 py-3 font-medium">Status</th>
            <th scope="col" className="w-[18%] px-3 py-3 font-medium">Last updated</th>
            <th scope="col" className="px-3 py-3 font-medium">Next action</th>
            <th scope="col" className="w-14 py-3 pr-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {applications.map((application) => <ApplicationTableRow key={application.id} application={application} actions={renderActions(application)} />)}
        </tbody>
      </table>
    </div>
  );
}
