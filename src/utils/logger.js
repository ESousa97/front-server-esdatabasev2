const isDevelopment = process.env.NODE_ENV !== 'production';

export const logger = {
  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  error: (...args) => {
    if (isDevelopment) {
      console.error(...args);
    } else if (args.length > 0) {
      console.error(args[0]);
    }
  },
};
