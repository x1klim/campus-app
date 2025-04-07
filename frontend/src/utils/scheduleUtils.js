import i18n from '../i18n/config';
import { transliterate as tr } from 'transliteration';

export const getCurrentWeekType = () => {
  // This is a simple implementation that alternates weeks
  // You might want to implement a more sophisticated logic based on your academic calendar
  const weekNumber = Math.floor(
    (new Date().getTime() - new Date('2024-01-01').getTime()) /
      (7 * 24 * 60 * 60 * 1000)
  );
  return weekNumber % 2 === 0 ? 'a' : 'b';
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
