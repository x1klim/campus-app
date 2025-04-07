export const getCurrentWeekType = () => {
  // This is a simple implementation that alternates weeks
  // You might want to implement a more sophisticated logic based on your academic calendar
  const weekNumber = Math.floor(
    (new Date().getTime() - new Date('2024-01-01').getTime()) /
      (7 * 24 * 60 * 60 * 1000)
  );
  return weekNumber % 2 === 0 ? 'a' : 'b';
};

export const formatTime = (timeString) => {
  if (!timeString) return '';
  return timeString.substring(0, 5);
};

export const getClassTypeLabel = (classType) => {
  const types = {
    LEC: 'Lecture',
    EXC: 'Exercise',
    LAB: 'Laboratory',
  };
  return types[classType] || classType;
};

export const getWeekdayName = (weekday) => {
  const weekdays = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
  };
  return weekdays[weekday] || `Day ${weekday}`;
};

export const formatDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

export const formatShortDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const getShortWeekdayName = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
