// Curried Sum
function curry(fn) {
  return function curried(...args) {
    if (args.length > fn.length) {
      return fn(...args);
    } else {
      return function (...nextArgs) {
        return curried(...args, ...nextArgs);
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

//For the purpose of user debugging.
//pass appropriate input in below function call
const curriedSum = curry(sum);

curriedSum(1)(2)(3);
curriedSum(1, 2)(3);
curriedSum(1)(2, 3);

console.log(curriedSum(1)(2)(3));
