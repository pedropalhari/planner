import scheduleJSON from "./SCHEDULE.json";

export interface Time {
  hours: number;
  minutes: number;
}

export interface Schedule {
  name: string;
  startingTime: Time;
  duration: Time;
}

export const SCHEDULE: Schedule[] = scheduleJSON.map<Schedule>((s) => {
  let [fromHoursString, fromMinutesString] = s.from.split("h");
  let [toHoursString, toMinutesString] = s.to.split("h");

  let [fromHours, fromMinutes, toHours, toMinutes] = [
    fromHoursString,
    fromMinutesString,
    toHoursString,
    toMinutesString,
  ].map((t) => parseInt(t));

  return {
    name: s.name,
    startingTime: {
      hours: fromHours,
      minutes: fromMinutes,
    },
    duration: {
      hours: toHours - fromHours,
      minutes: toMinutes - fromMinutes,
    },
  };
});
