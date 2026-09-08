import { PublicStatusFrame } from "@/components/status/public-status-frame";
import { PublicStatusLoading } from "@/components/status/public-status-loading";

export default function StatusLoadingPage() {
  return <PublicStatusFrame navigation={false}><PublicStatusLoading /></PublicStatusFrame>;
}
