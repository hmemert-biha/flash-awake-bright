export interface Alarm {
  id: string;
  time: string;
  enabled: boolean;
  repeat: RepeatType;
  flashMode: FlashMode;
  flashInterval?: number;
  screenLight: boolean;
  label?: string;
}

export type RepeatType = 'once' | 'daily' | 'weekdays' | 'weekends';

export type FlashMode = 'off' | 'steady' | 'interval';

export const REPEAT_LABELS: Record<RepeatType, string> = {
  once: 'Bir kez',
  daily: 'Her gün',
  weekdays: 'Hafta içi',
  weekends: 'Hafta sonu',
};

export const FLASH_INTERVALS = [1, 2, 5, 10, 30];
