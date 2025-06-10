Array.reduce((acc, curr, i, arr) => {}, initialValue);

Array.prototype.myReduce = function (cb, initialValue) {
  var accumulator = initialValue;

  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
  }

  return accumulator;
};

const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, curr, i, arr) => {
  return acc + curr;
});

console.log({ sum });

const sumMyReduce = nums.myReduce((acc, num, i, arr) => {
  return acc + num;
});

console.log({ sumMyReduce });
