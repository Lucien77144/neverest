// Get the total duration of the array
export const total = (arr: any[], key: string): number =>
  arr.reduce((acc, curr) => acc + curr?.[key], 0)
