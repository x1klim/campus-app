import { useState, useEffect, useCallback } from 'react';
import { useSchedule } from '../contexts/ScheduleContext';
import DateSelector from '../components/schedule/DateSelector';
import DaySchedule from '../components/schedule/DaySchedule';
import styles from './ScheduleView.module.css';

const ScheduleView = () => {
  const { getCurrentWeekDates } = useSchedule();
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Расписание</h1>

      <DateSelector
        dates={weekDates}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
      />

      <DaySchedule date={selectedDate} />
    </div>
  );
};

export default ScheduleView;
