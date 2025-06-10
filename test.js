const myThrottle = (cb, delay) => {
  let last = 0;

  return function (...args) {
    let now = new Date().getTime();

    if (now - last < dealy) return;

    last = now;

    return cb(...args);
  };
};
