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

// How bind works, takes context, and args as params
const newFunc = purchaseCar.bind(car);
console.log(newFunc('Rs', 2000000));

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== 'function') {
    throw new Error(`${this} cannot be bound as it's not callable`);
  }

  context.fn = this;

  return function (...newArgs) {
    return context.fn(...args, ...newArgs);
  };
};

const newFuncMyBind = purchaseCar.myBind(car, 'Rs', 2000000);
console.log(newFuncMyBind('Rs', 2000000));
