import { useMemo, useCallback } from 'react';
import SwipeableContainer from '../common/SwipeableContainer';
import DateSelector from './DateSelector';
import styles from './SwipeableDateSelector.module.css';

const SwipeableDateSelector = ({
  dates,
  prevWeekDates = [],
  nextWeekDates = [],
  selectedDate,
  onDateSelect,
  onPreviousWeek,
  onNextWeek,
  datesWithClasses = [],
  prevWeekDatesWithClasses = [],
  nextWeekDatesWithClasses = [],
}) => {
  const weekOptions = useMemo(() => {
    return [
      {
        id: 'prev',
        dates: prevWeekDates,
        datesWithClasses: prevWeekDatesWithClasses,
      },
      {
        id: 'current',
        dates,
        datesWithClasses,
      },
      {
        id: 'next',
        dates: nextWeekDates,
        datesWithClasses: nextWeekDatesWithClasses,
      },
    ];
  }, [
    dates,
    prevWeekDates,
    nextWeekDates,
    datesWithClasses,
    prevWeekDatesWithClasses,
    nextWeekDatesWithClasses,
  ]);

  const handleSwipe = useCallback(
    (direction) => {
      if (direction < 0) {
        onPreviousWeek();
      } else if (direction > 0) {
        onNextWeek();
      }
    },
    [onPreviousWeek, onNextWeek]
  );

  const renderWeekSelector = (week) => {
    return (
      <div className={styles.dateSelector}>
        <DateSelector
          dates={week.dates}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          datesWithClasses={week.datesWithClasses}
        />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <SwipeableContainer
        items={weekOptions}
        renderItem={renderWeekSelector}
        onSwipe={handleSwipe}
        className={styles.swipeContainer}
      />
    </div>
  );
};

export default SwipeableDateSelector;
