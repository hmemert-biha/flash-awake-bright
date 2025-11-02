import { Torch } from '@capawesome/capacitor-torch';

export const checkFlashlightAvailable = async (): Promise<boolean> => {
  try {
    const { available } = await Torch.isAvailable();
    return available;
  } catch (error) {
    console.error('Flashlight availability check failed:', error);
    return false;
  }
};

export const enableFlashlight = async (): Promise<void> => {
  try {
    await Torch.enable();
  } catch (error) {
    console.error('Failed to enable flashlight:', error);
    throw error;
  }
};

export const disableFlashlight = async (): Promise<void> => {
  try {
    await Torch.disable();
  } catch (error) {
    console.error('Failed to disable flashlight:', error);
    throw error;
  }
};

export const toggleFlashlight = async (): Promise<void> => {
  try {
    await Torch.toggle();
  } catch (error) {
    console.error('Failed to toggle flashlight:', error);
    throw error;
  }
};

export const startFlashInterval = (intervalSeconds: number): NodeJS.Timeout => {
  return setInterval(async () => {
    await toggleFlashlight();
  }, intervalSeconds * 1000);
};

export const stopFlashInterval = (intervalId: NodeJS.Timeout): void => {
  clearInterval(intervalId);
  disableFlashlight();
};
