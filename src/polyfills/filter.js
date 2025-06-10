Array.filter((num, imdex, arr) => {});

Array.prototype.myFilter = function (cb) {
  let temp = [];

  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      temp.push(this[i]);
    }
  }

  return temp;
};

const nums = [1, 2, 3, 5, 7];
const moreThanTwo = nums.map((num, i, arr) => {
  return num * 3;
});

console.log({ moreThanTwo });

const moreThanTwoMyFilter = nums.myMap((num, i, arr) => {
  return num * 3;
});

console.log({ moreThanTwoMyFilter });
