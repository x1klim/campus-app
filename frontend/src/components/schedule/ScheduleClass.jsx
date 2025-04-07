import {
  getClassTypeLabel,
  formatTime,
} from '../../utils/scheduleUtils';
import styles from './ScheduleClass.module.css';

export const ScheduleClass = ({ class_ }) => {
  return (
    <div className={styles.classCard}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.subject}>
            {class_.subject.short_name}
          </h3>
          <p className={styles.teacher}>{class_.teacher.full_name}</p>
        </div>
        <span className={styles.typeBadge}>
          {getClassTypeLabel(class_.class_type)}
        </span>
      </div>

      <div className={styles.details}>
        <span className={styles.detailItem}>
          <svg
            className={styles.icon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {formatTime(class_.time_slot.start_time)} -{' '}
          {formatTime(class_.time_slot.end_time)}
        </span>
        <span className={styles.divider}>•</span>
        <span className={styles.detailItem}>
          <svg
            className={styles.icon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {class_.location}
        </span>
      </div>
    </div>
  );
};
