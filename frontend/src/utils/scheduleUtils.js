import i18n from '../i18n/config';
import { transliterate as tr } from 'transliteration';

export const getFirstDayOfSemester = (date) => {
  const currentYear = date.getFullYear();

  // Determine if we're in the first or second semester
  const month = date.getMonth();

  let firstDay;

  if (month >= 8) {
    firstDay = new Date(currentYear, 8, 1);
  } else if (month < 8) {
    firstDay = new Date(currentYear, 1, 1);
  }

  // If the first day falls on weekend (6 = Saturday, 0 = Sunday), move to next Monday
  const dayOfWeek = firstDay.getDay();
  if (dayOfWeek === 6) {
    // Saturday
    firstDay.setDate(firstDay.getDate() + 2);
  } else if (dayOfWeek === 0) {
    // Sunday
    firstDay.setDate(firstDay.getDate() + 1);
  }

  return firstDay;
};

export const getSemesterWeekNumber = (date) => {
  const firstDay = getFirstDayOfSemester(date);

  // Calculate the difference in days
  const diffTime = Math.abs(date - firstDay);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Calculate week number (1-based)
  return Math.floor(diffDays / 7) + 1;
};

export const getWeekTypeForDate = (date) => {
  const weekNumber = getSemesterWeekNumber(date);
  return weekNumber % 2 === 1 ? 'a' : 'b';
};

export const getCurrentWeekType = () => {
  return getWeekTypeForDate(new Date());
};

export const hasClassesOnDate = (date, getClassesForDate) => {
  if (!getClassesForDate) return true; // Default to true if function not provided

  const classes = getClassesForDate(date);
  return classes && classes.length > 0;
};

export const getClassTypeLabel = (classType) => {
  const types = {
    LEC: i18n.t('classTypes.lecture'),
    EXC: i18n.t('classTypes.seminar'),
    LAB: i18n.t('classTypes.lab'),
    SEM: i18n.t('classTypes.seminar'),
  };
  return types[classType] || classType;
};

export const getWeekdayName = (weekday) => {
  const date = new Date();
  date.setDate(
    date.getDate() +
      ((weekday - date.getDay() + (weekday < date.getDay() ? 7 : 0)) %
        7)
  );

  return date.toLocaleDateString(i18n.language, { weekday: 'long' });
};

export const formatDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString(i18n.language, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

export const formatShortDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString(i18n.language, {
    month: 'short',
    day: 'numeric',
  });
};

export const getShortWeekdayName = (date) => {
  if (!date) return '';
  return date.toLocaleDateString(i18n.language, { weekday: 'short' });
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

export const formatTeacherName = (teacher) => {
  if (!teacher) return '';

  if (teacher.last_name) {
    if (i18n.language === 'ru') {
      if (teacher.first_name && teacher.patronymic) {
        return `${teacher.last_name} ${teacher.first_name.charAt(
          0
        )}. ${teacher.patronymic.charAt(0)}.`;
      } else if (teacher.first_name) {
        return `${teacher.last_name} ${teacher.first_name.charAt(
          0
        )}.`;
      } else {
        return teacher.last_name;
      }
    } else {
      const transliteratedName = tr(teacher.last_name);
      const prefix = teacher.gender === 'female' ? 'Ms.' : 'Mr.';
      return `${prefix} ${transliteratedName}`;
    }
  }

  // Fallback to full_name if structured data is not available
  if (teacher.full_name) {
    return teacher.full_name;
  }

  return '';
};

export const formatSubjectName = (subject) => {
  if (!subject) return '';

  if (i18n.language === 'en' && subject.english_name) {
    return subject.english_name;
  }

  if (subject.short_name) {
    return subject.short_name;
  }

  return subject.full_name || '';
};

export const formatLocation = (location) => {
  if (!location) return '';

  // Match pattern like УАК1-2.34
  const match = location.match(/^УАК(\d)-(\d)\.(\d+)$/);
  if (match) {
    const [_, building, floor, room] = match;
    return `${building}.${floor}${room}`;
  }

  if (i18n.language === 'en' && location === 'Стадион') {
    return 'Stadium';
  }

  return location;
};

export const formatTimeSlot = (timeSlot) => {
  if (!timeSlot) return '';

  if (i18n.language === 'en' && timeSlot.start_time) {
    const [hours, minutes] = timeSlot.start_time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));

    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: minutes === '00' ? undefined : '2-digit',
      hour12: true,
    });
  }

  return timeSlot.name;
};

/**
 * Formats a weekday name according to the current language and formatting requirements
 * @param {Date} date - The date to get weekday for
 * @returns {string} - Formatted weekday name or abbreviation
 */
export const formatWeekday = (date) => {
  const weekday = date.getDay();

  // Use dedicated translation key for short weekday names
  // This allows translators to provide proper abbreviations for each language
  return i18n.t(`weekdays.short.${weekday}`);
};
