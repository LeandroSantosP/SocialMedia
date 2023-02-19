export function GetDateClose(dates: Date[]): Date | null {
  const toDay = new Date();

  const ValidDates = dates.filter(function (data) {
    return data.getTime() <= toDay.getTime();
  });

  ValidDates.sort(function (a, b) {
    return b.getTime() - a.getTime();
  });

  return ValidDates.length > 0 ? ValidDates[0] : null;
}
