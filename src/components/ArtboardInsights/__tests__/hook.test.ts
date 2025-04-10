import { DateTime } from "luxon";
import useArtboardInsights from "../hook";

describe("useArtboardInsights - Monthly Streak Calculation", () => {
  const { getDaysInARow } = useArtboardInsights();

  const createTestData = (dates: string[]) => {
    return dates.map(date => ({
      date,
      value: 3,
      content: "{}",
      empty: false
    }));
  };

  it("should calculate streak for consecutive months without gaps", () => {
    const data = createTestData([
      "2025-01-29",
      "2025-02-20",
      "2025-03-15",
      "2025-04-07"
    ]);
    const result = getDaysInARow({ isMonthly: true, frequency: data });
    expect(result).toBe(4);
  });

  it("should calculate streak for months with gap in the middle", () => {
    const data = createTestData([
      "2025-01-29",
      "2025-02-20",
      "2025-04-07"
    ]);
    const result = getDaysInARow({ isMonthly: true, frequency: data });
    expect(result).toBe(1);
  });

  it("should calculate streak for non-consecutive months", () => {
    const data = createTestData([
      "2025-01-29",
      "2025-03-15",
      "2025-05-07"
    ]);
    const result = getDaysInARow({ isMonthly: true, frequency: data });
    expect(result).toBe(1);
  });

  it("should calculate streak for months in the same year", () => {
    const data = createTestData([
      "2025-01-29",
      "2025-02-20",
      "2025-03-15"
    ]);
    const result = getDaysInARow({ isMonthly: true, frequency: data });
    expect(result).toBe(3);
  });

  it("should calculate streak for months across different years", () => {
    const data = createTestData([
      "2023-12-29",
      "2024-01-20",
      "2024-02-15"
    ]);
    const result = getDaysInARow({ isMonthly: true, frequency: data });
    expect(result).toBe(3);
  });

  it("should calculate streak for multiple entries in the same month", () => {
    const data = createTestData([
      "2025-01-01",
      "2025-01-15",
      "2025-02-01",
      "2025-02-15",
      "2025-03-01"
    ]);
    const result = getDaysInARow({ isMonthly: true, frequency: data });
    expect(result).toBe(3);
  });

  it("should calculate streak for last month with gap", () => {
    const data = createTestData([
      "2025-01-29",
      "2025-02-20",
      "2025-03-15",
      "2025-06-07"
    ]);
    const result = getDaysInARow({ isMonthly: true, frequency: data });
    expect(result).toBe(1);
  });

  it("should return 1 for single entry in current month", () => {
    const currentDate = DateTime.local();
    const data = createTestData([currentDate.toISODate()]);
    const result = getDaysInARow({ isMonthly: true, frequency: data });
    expect(result).toBe(1);
  });

  it("should return 0 for single entry in past month", () => {
    const pastDate = DateTime.local().minus({ months: 1 });
    const data = createTestData([pastDate.toISODate()]);
    const result = getDaysInARow({ isMonthly: true, frequency: data });
    expect(result).toBe(0);
  });

  it("should return 0 for empty frequency array", () => {
    const result = getDaysInARow({ isMonthly: true, frequency: [] });
    expect(result).toBe(0);
  });
}); 