import styles from "./public-status-background.module.css";

export function PublicStatusBackground() {
  return (
    <div aria-hidden="true" className={styles.artwork}>
      <span className={styles.arch} />
      <span className={styles.counterform} />
    </div>
  );
}
