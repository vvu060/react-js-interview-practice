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

// How call works, takes context, and args as paams
purchaseCar.call(car, 'Rs', 2000000);

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== 'function') {
    throw new Error(`${this} is not callable`);
  }

  context.fn = this;

  context.fn(...args);
};

purchaseCar.myCall(car, 'Rs', 2000000);
