export const debounce = (func: any, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function (...args: any[]) {
    // @ts-ignore
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};
