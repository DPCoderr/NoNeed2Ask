import type { ReactNode } from "react";

import styles from "./workspace-background.module.css";

export function WorkspaceBackground({ children, variant }: { children: ReactNode; variant: "dashboard" | "applications" }) {
  return (
    <div className={`${styles.surface} ${variant === "applications" ? styles.applications : ""}`} data-workspace-background={variant}>
      <div aria-hidden="true" className={styles.decoration}>
        <span className={styles.panel} />
      </div>
      {children}
    </div>
  );
}
