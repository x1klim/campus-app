import { useSchedule } from '../../contexts/ScheduleContext';
import { ClassCard } from './ClassCard';
import styles from './DaySchedule.module.css';
import { useTranslation } from 'react-i18next';
import { formatTimeSlotMessage } from '../../utils/timeSlotFormatter';

const DaySchedule = ({ date }) => {
  const { getClassesForDate, loading } = useSchedule();
  const { t } = useTranslation();
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  const classes = getClassesForDate(date);

  const showLateStartHint =
    classes.length > 0 &&
    classes[0].time_slot.id > 1 &&
    classes[0].time_slot.id <= 5;

  return (
    <div className={styles.container}>
      {classes.length === 0 ? (
        <div className={`${styles.hint} ${styles.emptyState}`}>
          <p>🏡 {t('schedule.noClasses')}</p>
        </div>
      ) : (
        <>
          {showLateStartHint && (
            <div className={styles.hint}>
              <p>
                😴{' '}
                {formatTimeSlotMessage(
                  classes[0].time_slot,
                  'lateStart'
                )}
              </p>
            </div>
          )}
          <div className={styles.classList}>
            {classes.map((classItem) => (
              <ClassCard key={classItem.id} classItem={classItem} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DaySchedule;
