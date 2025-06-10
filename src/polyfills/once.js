function myOnce(fn, context) {
  let ran;

  return function () {
    if (fn) {
      ran = fn.apply(context || this, arguments);
      fn = null;
    }

    return ran;
  };
}

const hello = () => console.log('Hello');

// Runs multiple times
hello();
hello();
hello();

const helloOnce = once((a, b) => console.log('Hello', a, b));
helloOnce(1, 2);
helloOnce();
helloOnce();
helloOnce();
