import { useSchedule } from '../../contexts/ScheduleContext';
import { ClassCard } from './ClassCard';
import styles from './DaySchedule.module.css';

const DaySchedule = ({ date }) => {
  const { getClassesForDate, loading } = useSchedule();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading schedule...</p>
      </div>
    );
  }

  const classes = getClassesForDate(date);

  return (
    <div className={styles.container}>
      <h2 className={styles.date}>
        {date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
      </h2>

      {classes.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>
            No classes scheduled for this day
          </p>
        </div>
      ) : (
        <div className={styles.classList}>
          {classes.map((classItem) => (
            <ClassCard key={classItem.id} classItem={classItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DaySchedule;
