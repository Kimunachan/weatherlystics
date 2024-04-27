export const range = (start: number, stop: number, step: number = 1) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
