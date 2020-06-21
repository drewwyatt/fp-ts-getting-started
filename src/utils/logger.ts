export const logger = (exercise: string) => (...args: any[]) =>
  console.log(`[${exercise}]`, ...args)
