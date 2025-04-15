import { useMemo, useState, useCallback, useEffect } from 'react';
import SwipeableContainer from '../common/SwipeableContainer';
import DaySchedule from './DaySchedule';
import styles from './SwipeableDaySchedule.module.css';
import {
  getWeekTypeForDate,
  getSemesterWeekNumber,
} from '../../utils/scheduleUtils';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/config';

const SwipeableDaySchedule = ({ date, onDateChange }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t } = useTranslation();

  const dates = useMemo(() => {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    return [prevDate, date, nextDate];
  }, [date]);

  // Reset transition state when date changes
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [date, isTransitioning]);

  const handleSwipe = useCallback(
    (direction) => {
      // Prevent multiple swipes while transitioning
      if (isTransitioning) return;

      setIsTransitioning(true);

      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + direction);
      onDateChange(newDate);
    },
    [date, onDateChange, isTransitioning]
  );

  const formatDayInfo = (itemDate) => {
    const dateStr = itemDate.toLocaleDateString(i18n.language, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
    const formattedDate =
      dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

    const weekNumber = getSemesterWeekNumber(itemDate);
    const weekType = getWeekTypeForDate(itemDate).toUpperCase();

    const formattedWeekInfo = t('schedule.weekInfo', {
      number: weekNumber,
      type:
        i18n.language === 'en'
          ? weekType
          : weekType === 'A'
          ? 'чс.'
          : 'зн.',
    });

    return { formattedDate, formattedWeekInfo };
  };

  const renderDayView = (itemDate) => {
    const { formattedDate, formattedWeekInfo } =
      formatDayInfo(itemDate);

    return (
      <div className={styles.dayView}>
        <div className={styles.header}>
          <h2 className={styles.date}>{formattedDate}</h2>
          <span className={styles.weekInfo}>{formattedWeekInfo}</span>
        </div>
        <div className={styles.scheduleWrapper}>
          <DaySchedule date={itemDate} />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <SwipeableContainer
        items={dates}
        renderItem={renderDayView}
        onSwipe={handleSwipe}
        className={styles.swipeContainer}
      />
    </div>
  );
};

export default SwipeableDaySchedule;
