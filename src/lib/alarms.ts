import { LocalNotifications } from '@capacitor/local-notifications';
import { Alarm, RepeatType } from './types';

export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const { display } = await LocalNotifications.requestPermissions();
    return display === 'granted';
  } catch (error) {
    console.error('Failed to request notification permission:', error);
    return false;
  }
};

const getRepeatSchedule = (repeat: RepeatType, time: string, selectedDays?: number[]) => {
  const [hours, minutes] = time.split(':').map(Number);
  
  switch (repeat) {
    case 'daily':
      return { every: 'day' as const, hour: hours, minute: minutes };
    case 'weekdays':
      return { on: { weekday: [2, 3, 4, 5, 6] }, hour: hours, minute: minutes };
    case 'weekends':
      return { on: { weekday: [1, 7] }, hour: hours, minute: minutes };
    case 'custom':
      if (selectedDays && selectedDays.length > 0) {
        return { on: { weekday: selectedDays }, hour: hours, minute: minutes };
      }
      return undefined;
    default:
      return undefined;
  }
};

export const scheduleAlarm = async (alarm: Alarm): Promise<void> => {
  try {
    const [hours, minutes] = alarm.time.split(':').map(Number);
    const now = new Date();
    const alarmTime = new Date(now);
    alarmTime.setHours(hours, minutes, 0, 0);
    
    if (alarmTime <= now) {
      alarmTime.setDate(alarmTime.getDate() + 1);
    }

    const schedule = alarm.repeat !== 'once' 
      ? getRepeatSchedule(alarm.repeat, alarm.time, alarm.selectedDays)
      : { at: alarmTime };

    await LocalNotifications.schedule({
      notifications: [
        {
          id: parseInt(alarm.id),
          title: 'FlashAlarm',
          body: alarm.label || 'Alarm çalıyor!',
          schedule: schedule as any,
          sound: 'default',
          channelId: 'alarm-channel',
        },
      ],
    });
  } catch (error) {
    console.error('Failed to schedule alarm:', error);
    throw error;
  }
};

export const cancelAlarm = async (alarmId: string): Promise<void> => {
  try {
    await LocalNotifications.cancel({
      notifications: [{ id: parseInt(alarmId) }],
    });
  } catch (error) {
    console.error('Failed to cancel alarm:', error);
    throw error;
  }
};

export const loadAlarms = (): Alarm[] => {
  const stored = localStorage.getItem('alarms');
  return stored ? JSON.parse(stored) : [];
};

export const saveAlarms = (alarms: Alarm[]): void => {
  localStorage.setItem('alarms', JSON.stringify(alarms));
};
