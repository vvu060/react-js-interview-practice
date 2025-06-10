const myMemoize = function (fn, context) {
  const res = {};

  return function (...args) {
    let argsCache = JSON.stringify(args);

    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args);
    }

    return res[argsCache];
  };
};

const clumsyProduct = (num1, num2) => {
  for (let i = 0; i < 10000000; i++) {}
  return num1 * num2;
};

const memoizedClumsyProduct = myMemoize(clumsyProduct);

console.time('First Call');
console.log(clumsyProduct(9458, 15646));
console.timeEnd('First Call');

console.time('Memoized Call');
console.log(memoizedClumsyProduct(9458, 15646));
console.timeEnd('Memoized Call');
