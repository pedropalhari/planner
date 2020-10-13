export interface Time {
  hours: number;
  minutes: number;
}

export interface Schedule {
  name: string;
  startingTime: Time;
  duration: Time;
}

export const SCHEDULE: Schedule[] = [
  {
    name: "Irricontrol 💦",
    startingTime: {
      hours: 13,
      minutes: 0,
    },
    duration: {
      hours: 3,
      minutes: 30,
    },
  },
  {
    name: "Zapelim 💬",
    startingTime: {
      hours: 16,
      minutes: 45,
    },
    duration: {
      hours: 1,
      minutes: 0,
    },
  },
  {
    name: "TFG 📃",
    startingTime: {
      hours: 18,
      minutes: 0,
    },
    duration: {
      hours: 2,
      minutes: 0,
    },
  },
  {
    name: "OOH 🏗️",
    startingTime: { hours: 21, minutes: 0 },
    duration: { hours: 1, minutes: 30 },
  },
];

/**
  {name: "Zapelim 💬",   startingTime: {     hours: 16,     minutes: 45,   },   duration: {     hours: 1,     minutes: 0,   }, },
 */
