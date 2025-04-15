import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSchedule } from '../contexts/ScheduleContext';
import Header from '../components/navigation/Header';
import SwipeableDateSelector from '../components/schedule/SwipeableDateSelector';
import SwipeableDaySchedule from '../components/schedule/SwipeableDaySchedule';
import styles from './ScheduleView.module.css';
import { useTranslation } from 'react-i18next';

const ScheduleView = () => {
  const { getCurrentWeekDates, checkHasClassesOnDate } =
    useSchedule();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);
  const [weekDates, setWeekDates] = useState(() => {
    // Initialize with current week dates on component mount
    return getCurrentWeekDates(0);
  });

  const [prevWeekDates, setPrevWeekDates] = useState([]);
  const [nextWeekDates, setNextWeekDates] = useState([]);

  const { t } = useTranslation();

  // Update week dates when the week offset changes
  useEffect(() => {
    const newDates = getCurrentWeekDates(weekOffset);
    setWeekDates(newDates);

    const prevDates = getCurrentWeekDates(weekOffset - 1);
    setPrevWeekDates(prevDates);

    const nextDates = getCurrentWeekDates(weekOffset + 1);
    setNextWeekDates(nextDates);

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

      if (isWithinWeek) {
        return prev;
      } else {
        const currentDayOfWeek = prev.getDay();
        const sameDayOfWeek = newDates.find(
          (date) => date.getDay() === currentDayOfWeek
        );

        // Fall back to first day of week if same day not found
        return sameDayOfWeek || newDates[0];
      }
    });
  }, [weekOffset, getCurrentWeekDates]);

  // Check if selected date is within current week and adjust week if needed
  useEffect(() => {
    if (!weekDates || weekDates.length === 0) return;
    const isInCurrentWeek = weekDates.some(
      (date) =>
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
    );

    if (!isInCurrentWeek) {
      const isInNextWeek = nextWeekDates.some(
        (date) =>
          date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear()
      );

      if (isInNextWeek) {
        setWeekOffset((prev) => prev + 1);
        return;
      }

      const isInPrevWeek = prevWeekDates.some(
        (date) =>
          date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear()
      );

      if (isInPrevWeek) {
        setWeekOffset((prev) => prev - 1);
        return;
      }

      // If date is not in adjacent weeks, find the correct week offset
      const selectedWeekStart = new Date(selectedDate);
      selectedWeekStart.setDate(
        selectedWeekStart.getDate() - selectedWeekStart.getDay() + 1
      );

      const currentWeekStart = new Date(weekDates[0]);

      const diffTime =
        selectedWeekStart.getTime() - currentWeekStart.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      const diffWeeks = Math.round(diffDays / 7);

      setWeekOffset((prev) => prev + diffWeeks);
    }
  }, [selectedDate, weekDates, nextWeekDates, prevWeekDates]);

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

  const prevWeekDatesWithClasses = useMemo(() => {
    if (!prevWeekDates) return [];
    return prevWeekDates.filter((date) =>
      checkHasClassesOnDate(date)
    );
  }, [prevWeekDates, checkHasClassesOnDate]);

  const nextWeekDatesWithClasses = useMemo(() => {
    if (!nextWeekDates) return [];
    return nextWeekDates.filter((date) =>
      checkHasClassesOnDate(date)
    );
  }, [nextWeekDates, checkHasClassesOnDate]);

  return (
    <>
      <Header title={t('navigation.schedule')} constantBorder={true}>
        <SwipeableDateSelector
          dates={weekDates}
          prevWeekDates={prevWeekDates}
          nextWeekDates={nextWeekDates}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onPreviousWeek={handlePreviousWeek}
          onNextWeek={handleNextWeek}
          datesWithClasses={datesWithClasses}
          prevWeekDatesWithClasses={prevWeekDatesWithClasses}
          nextWeekDatesWithClasses={nextWeekDatesWithClasses}
        />
      </Header>
      <div className={styles.container}>
        <SwipeableDaySchedule
          date={selectedDate}
          onDateChange={handleDateSelect}
        />
      </div>
    </>
  );
};

export default ScheduleView;
