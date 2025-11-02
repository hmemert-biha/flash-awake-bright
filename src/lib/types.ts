export interface Alarm {
  id: string;
  time: string;
  enabled: boolean;
  repeat: RepeatType;
  flashMode: FlashMode;
  flashInterval?: number;
  screenLight: boolean;
  label?: string;
  selectedDays?: number[]; // 1=Pazar, 2=Pazartesi, ..., 7=Cumartesi
}

export type RepeatType = 'once' | 'daily' | 'weekdays' | 'weekends' | 'custom';

export type FlashMode = 'off' | 'steady' | 'interval';

export const REPEAT_LABELS: Record<RepeatType, string> = {
  once: 'Bir kez',
  daily: 'Her gün',
  weekdays: 'Hafta içi',
  weekends: 'Hafta sonu',
  custom: 'Özel günler',
};

export const WEEKDAY_LABELS: Record<number, string> = {
  1: 'Paz',
  2: 'Pzt',
  3: 'Sal',
  4: 'Çar',
  5: 'Per',
  6: 'Cum',
  7: 'Cmt',
};

export const FLASH_INTERVALS = [1, 2, 5, 10, 30];
