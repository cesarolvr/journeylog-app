import { DateTime } from "luxon";

const useArtboardInsights = () => {
  const getDaysInARow = ({ isMonthly, isDaily, isWeekly, frequency }: any) => {
    let acc: number = 1;
    let accObj: any = isMonthly ? {} : { 0: DateTime.local() };

    const reversedList = frequency?.toReversed();

    if (!frequency || frequency.length === 0) {
      acc = 0;
      return 0;
    }

    if (isDaily) {
      if (reversedList.length > 1) {
        reversedList?.forEach((prev: any, index: any): any => {
          if (index === 0) return 0;
          const current = reversedList[index - 1];

          const currentDate = DateTime.fromJSDate(
            new Date(current?.date)
          ).toUTC();
          const prevDate = DateTime.fromJSDate(new Date(prev?.date)).toUTC();

          const diff: any = currentDate.diff(prevDate, "days")?.toObject();
          const diffInDays = diff?.days * -1;

          if (diffInDays === 1) {
            acc++;
          } else if (diffInDays > 1) {
            acc = 1;
          }

          const isLastItem =
            reversedList.indexOf(prev) === reversedList.length - 1;

          if (isLastItem) {
            const isTodayOrYesterday =
              prevDate.toISODate() === DateTime.local().toISODate() ||
              prevDate.toISODate() ===
                DateTime.local().minus({ days: 1 }).toISODate();
            if (!isTodayOrYesterday) {
              acc = 0;
            }
          }

          return 0;
        });
      } else if (reversedList.length === 1) {
        const isToday = reversedList[0]?.date === DateTime.local().toISODate();
        if (isToday) {
          acc = 1;
        } else {
          acc = 0;
        }
      }
    } else if (isWeekly) {
      if (reversedList.length > 1) {
        reversedList.forEach((prev: any, index: any) => {
          if (index === 0) return 0;
          const current = reversedList[index - 1];

          const currentDate = DateTime.fromJSDate(
            new Date(current?.date)
          ).toLocal();

          const prevDate = DateTime.fromJSDate(new Date(prev?.date)).toLocal();
          const diff: any = currentDate.diff(prevDate, "weeks")?.toObject();
          const diffInWeeks = diff?.weeks * -1;
          const isToday =
            DateTime.fromJSDate(new Date(prev?.date)).localWeekNumber ===
              DateTime.local().localWeekNumber ||
            DateTime.fromJSDate(new Date(current?.date)).localWeekNumber ===
              DateTime.local().localWeekNumber;
          const isLastItemInARow =
            reversedList.indexOf(prev) === reversedList.length - 1;

          const dateAToAeAdded = DateTime.fromJSDate(new Date(prev?.date));
          const dateBToBeAdded = DateTime.fromJSDate(new Date(current?.date));

          if (diffInWeeks <= 1) {
            accObj[dateBToBeAdded.localWeekNumber] = dateBToBeAdded;

            if (isLastItemInARow && isToday) {
              accObj[dateAToAeAdded.localWeekNumber] = dateAToAeAdded;
            }
          } else {
            if (isToday) {
              accObj[dateBToBeAdded.localWeekNumber] = dateBToBeAdded;
            }
          }
        });
      } else {
        const isToday = reversedList[0]?.date === DateTime.local().toISODate();
        if (isToday) {
          accObj[0] = DateTime.local();
        } else {
          accObj = [];
        }
      }
    } else if (isMonthly) {
      
      if (reversedList.length > 1) {
        reversedList.forEach((prev: any, index: any) => {
          if (index === 0) return 0;
          const current = reversedList[index - 1];

          const aMonth = DateTime.fromJSDate(new Date(prev?.date));
          const bMonth = DateTime.fromJSDate(new Date(current?.date));
          const diffInMonths = Math.abs(aMonth.month - bMonth.month);

          const isTodaysMonth =
            (aMonth.month === DateTime.local().month &&
              aMonth.year === DateTime.local().year) ||
            (bMonth.month === DateTime.local().month &&
              bMonth.year === DateTime.local().year);

          const isLastItemInARow =
            reversedList.indexOf(prev) === reversedList.length - 1;

          const dateAToBeAdded = DateTime.fromJSDate(new Date(prev?.date));
          const dateBToBeAdded = DateTime.fromJSDate(new Date(current?.date));

          if (diffInMonths <= 1) {
            accObj[dateBToBeAdded.month] = dateBToBeAdded;

            if (isLastItemInARow && isTodaysMonth) {
              accObj[dateAToBeAdded.month] = dateAToBeAdded;
            }
          } else {
            if (isTodaysMonth) {
              accObj[dateBToBeAdded.month] = dateBToBeAdded;
            }
          }
        });
      } else {
        const isTodaysMonth =
          reversedList[0]?.date === DateTime.local().toISODate();
        if (isTodaysMonth) {
          accObj[0] = DateTime.local();
        }
      }
    }

    return isDaily ? acc : Object.keys(accObj).length;
  };

  const getLastDaysConsistency: any = {
    daily: {
      days: Array.from(Array(31).keys()),
      text: "Last 30 days",
      value: 31,
    },
    weekly: {
      days: Array.from(Array(12).keys()),
      text: "Last 12 weeks",
      value: 12,
    },
    monthly: {
      days: Array.from(Array(12).keys()),
      text: "Last 12 months",
      value: 12,
    },
  };

  const getLastDaysDensity: any = {
    daily: {
      days: Array.from(Array(7).keys()),
      text: "Last 7 days",
      value: 31,
    },
  };

  return {
    getDaysInARow,
    getLastDaysConsistency,
    getLastDaysDensity
  };
};

export default useArtboardInsights;
