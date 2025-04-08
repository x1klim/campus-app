import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSchedule } from '../contexts/ScheduleContext';
import Header from '../components/navigation/Header';
import DateSelector from '../components/schedule/DateSelector';
import DaySchedule from '../components/schedule/DaySchedule';
import styles from './ScheduleView.module.css';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';

const ScheduleView = () => {
  const {
    getCurrentWeekDates,
    checkHasClassesOnDate,
    getSemesterWeekNumberForDate,
    getWeekTypeForDate,
  } = useSchedule();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);
  const [weekDates, setWeekDates] = useState(() => {
    // Initialize with current week dates on component mount
    return getCurrentWeekDates(0);
  });

  // Update week dates when the week offset changes
  useEffect(() => {
    const newDates = getCurrentWeekDates(weekOffset);
    setWeekDates(newDates);

    // Update selected date to be within the new week range if it's not already
    setSelectedDate((prev) => {
      // Make sure we have dates before trying to filter
      if (!newDates || newDates.length === 0) {
        return prev;
      }

      const isWithinWeek = newDates.some(
        (date) =>
          date.getDate() === prev.getDate() &&
          date.getMonth() === prev.getMonth() &&
          date.getFullYear() === prev.getFullYear()
      );
      return isWithinWeek ? prev : newDates[0];
    });
  }, [weekOffset, getCurrentWeekDates]);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const handlePreviousWeek = useCallback(() => {
    setWeekOffset((prev) => prev - 1);
  }, []);

  const handleNextWeek = useCallback(() => {
    setWeekOffset((prev) => prev + 1);
  }, []);

  // Calculate which dates in the current week have classes
  const datesWithClasses = useMemo(() => {
    if (!weekDates) return [];
    return weekDates.filter((date) => checkHasClassesOnDate(date));
  }, [weekDates, checkHasClassesOnDate]);

  // Get week number and type for the selected date
  const weekInfo = useMemo(() => {
    if (!selectedDate) return { number: 0, type: 'a' };

    const weekNumber = getSemesterWeekNumberForDate(selectedDate);
    const weekType = getWeekTypeForDate(selectedDate);

    return {
      number: weekNumber,
      type: weekType.toUpperCase(),
    };
  }, [
    selectedDate,
    getSemesterWeekNumberForDate,
    getWeekTypeForDate,
  ]);

  const { t } = useTranslation();

  return (
    <>
      <Header title={t('navigation.schedule')} constantBorder={true}>
        <DateSelector
          dates={weekDates}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onPreviousWeek={handlePreviousWeek}
          onNextWeek={handleNextWeek}
          datesWithClasses={datesWithClasses}
        />
      </Header>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.date}>
            {(() => {
              const dateStr = selectedDate.toLocaleDateString(
                i18n.language,
                {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                }
              );
              return (
                dateStr.charAt(0).toUpperCase() + dateStr.slice(1)
              );
            })()}
          </h2>
          <span className={styles.weekInfo}>
            {t('schedule.weekInfo', {
              number: weekInfo.number,
              type:
                i18n.language === 'en'
                  ? weekInfo.type
                  : weekInfo.type === 'A'
                  ? 'числитель'
                  : 'знаменатель',
            })}
          </span>
        </div>
        <DaySchedule date={selectedDate} />
      </div>
    </>
  );
};

export default ScheduleView;
