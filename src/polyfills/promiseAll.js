function importantAction(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Subscribe to ${username}`);
    }, 1000);
  });
}

function likeTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Like the ${video} video`);
    }, 1000);
  });
}

function shareTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Share the ${video} video`);
    });
  });
}

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];

    if (!promises.length) {
      resolve(results);
      return;
    }

    let pending = promises.length;

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((result) => {
        results[index] = result;
        pending--;

        if (pending === 0) {
          resolve(results);
        }
      }, reject);
    });
  });
};

// Promise.all([
//   importantAction('Vishal'),
//   likeTheVideo('Promises Video'),
//   shareTheVideo('Promises Video'),
// ]).then((res) => console.log(res));

Promise.myAll([
  importantAction('Vishal'),
  likeTheVideo('Promises'),
  shareTheVideo('Promises'),
])
  .then((res) => console.log(res))
  .catch((err) => console.error('Failed:', err));
