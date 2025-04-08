import { useSchedule } from '../../contexts/ScheduleContext';
import { ClassCard } from './ClassCard';
import styles from './DaySchedule.module.css';
import { useTranslation } from 'react-i18next';

const DaySchedule = ({ date }) => {
  const { getClassesForDate, loading } = useSchedule();
  const { t } = useTranslation();
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
      {classes.length === 0 ? (
        <div className={styles.emptyState}>
          <p>{t('schedule.noClasses')}</p>
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
