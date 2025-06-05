let count = 0;

const getData = () => {
  // API Call here
  console.log('Fetching Data', count++);
};

const debouce = (fn, delay) => {
  let timer;
  return function () {
    let context = this;
    args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, arguments);
    }, delay);
  };
};

const onInputChange = debouce(getData, 400);
