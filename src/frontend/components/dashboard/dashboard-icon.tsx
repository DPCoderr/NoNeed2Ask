import Image from "next/image";

const iconPath = "/dashboard-icons";

export function DashboardIcon({
  alt,
  className,
  name,
  priority,
}: {
  alt: string;
  className?: string;
  name: string;
  priority?: boolean;
}) {
  return (
    <Image
      alt={alt}
      className={className}
      height={96}
      priority={priority}
      src={`${iconPath}/${name}`}
      width={96}
    />
  );
}
