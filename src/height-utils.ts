const MAX_TIME = 24 * 60;
export const TOTAL_HEIGHT = 24 * 100; //Height per hour

/**
 * Returns current height based on hours/minutes
 */
export function getHeight({
  hours,
  minutes,
}: {
  hours: number;
  minutes: number;
}) {
  let time = hours * 60 + minutes;
  let relativeTime = time / MAX_TIME;

  return relativeTime * TOTAL_HEIGHT;
}
