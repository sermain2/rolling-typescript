import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./Skeleton.module.scss";

function CardSkeleton() {
  return (
    <div className={styles["skeleton-container"]}>
      <Skeleton className={styles["skeleton-name"]} />
      <div className={styles["skeleton-profile-container"]}>
        <Skeleton className={styles["skeleton-profile-img"]} />
        <Skeleton className={styles["skeleton-profile-img"]} />
        <Skeleton className={styles["skeleton-profile-img"]} />
      </div>
      <Skeleton className={styles["skeleton-sender-count"]} />
      <div className={styles.divider} />
      <div className={styles["skeleton-reaction-container"]}>
        <Skeleton className={styles["skeleton-reaction"]} />
        <Skeleton className={styles["skeleton-reaction"]} />
        <Skeleton className={styles["skeleton-reaction"]} />
      </div>
    </div>
  );
}
export default function ListSkeleton() {
  return (
    <div className={styles["skeleton-list-container"]}>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
