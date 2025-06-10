function MyPromise(executor) {
  let onResolve;
  let onReject;
  let isFullfilled = false;
  let isRejected = false;
  let isCalled = false;
  let value;

  function resolve(val) {
    isFullfilled = true;
    value = val;

    if (typeof onResolve === 'function') {
      onResolve(val);
      isCalled = true;
    }
  }

  function reject(val) {
    isRejected = true;
    value = val;

    if (typeof onReject === 'function') {
      onReject(val);
      isCalled = true;
    }
  }

  this.then = function (cb) {
    onResolve = cb;

    if (isFullfilled && !isCalled) {
      isCalled = true;
      onResolve(value);
    }

    return this;
  };

  this.catch = function (cb) {
    onReject = cb;

    if (isRejected && !isCalled) {
      isCalled = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

const testPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(2);
  }, 1000);
});

testPromise.then((res) => console.log(res)).catch((err) => console.log(err));

MyPromise.resolve = (val) => {
  return new MyPromise((resolve, reject) => {
    resolve(2);
  });
};

MyPromise.reject = (val) => {
  return new MyPromise((resolve, reject) => {
    reject(2);
  });
};
