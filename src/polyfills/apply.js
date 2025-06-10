let car = {
  color: 'Black',
  make: 'Tata',
  model: 'Nexon',
};

function purchaseCar(currency, price) {
  console.log(
    `I have purchased a ${this.color} ${this.make} ${this.model} for ${currency} ${price}.`
  );
}

// How apply works, takes context, and args as params array
purchaseCar.apply(car, ['Rs', 2000000]);

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== 'function') {
    throw new Error(`${this} is not callable`);
  }

  if (Array.isArray(args)) {
    throw new Error('CreateListFromArrayLike called on non-object');
  }

  context.fn = this;

  context.fn(...args);
};

purchaseCar.myApply(car, ['Rs', 2000000]);
