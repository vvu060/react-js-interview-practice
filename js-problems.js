// Given:
// An array and a chunk size n.

// Goal:
// Break the array into subarrays, each of length n (last one can be smaller).

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// Test
console.log(chunkArray([1, 2, 3, 4, 5, 6, 7], 3));
// Output: [[1, 2, 3], [4, 5, 6], [7]]

function chunkArrayReduce(arr, size) {
  return arr.reduce((result, value, index) => {
    if (index % size === 0) {
      result.push(arr.slice(index, index + size));
    }
    return result;
  }, []);
}

// Sort by Age

function sortByAge(arr) {
  return arr.slice().sort((a, b) => {
    const ageA = parseInt(a.split(' ')[1], 10);
    const ageB = parseInt(b.split(' ')[1], 10);
    return ageA - ageB;
  });
}

const arr3 = ['John 21', 'Jaime 14', 'Jorah 34', 'Rob 45', 'Jamica 5'];

const sorted = sortByAge(arr);
console.log(sorted);
// Output: ["Jamica 5", "Jaime 14", "John 21", "Jorah 34", "Rob 45"]

const user = {
  id: 339,
  name: 'Fred',
  age: 42,
  education: {
    degree: 'Masters',
  },
};

const {
  education: { degree },
} = user;

console.log(degree); // prints: Masters

// KO Banana
function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  const hoursNeeded = (speed) => {
    return piles.reduce((acc, pile) => acc + Math.ceil(pile / speed), 0);
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (hoursNeeded(mid) <= h) {
      right = mid; // try smaller k
    } else {
      left = mid + 1; // need more speed
    }
  }

  return left;
}

console.log(minEatingSpeed([3, 6, 7, 11], 8)); // 4

// FizzBuzz
function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    let output = '';

    if (i % 3 === 0) output += 'Fizz';
    if (i % 5 === 0) output += 'Buzz';

    console.log(output || i);
  }
}

fizzBuzz(15);

// Print Steps Pattern
function steps(n) {
  for (let row = 1; row <= n; row++) {
    let step = '#'.repeat(row) + ' '.repeat(n - row);
    console.log(step);
  }
}

steps(5);

// #
// ##
// ###
// ####
// #####

function rightSteps(n) {
  for (let i = 1; i <= n; i++) {
    const step = ' '.repeat(n - i) + '#'.repeat(i);
    console.log(step);
  }
}

//   #
//   ##
//  ###
// ####
// #####

function pyramid(n) {
  for (let i = 1; i <= n; i++) {
    const spaces = ' '.repeat(n - i);
    const hashes = '#'.repeat(2 * i - 1);
    console.log(spaces + hashes + spaces);
  }
}

//     #
//    ###
//   #####
//  #######
// #########

// Problem: whast Number (LeetCode #179)
// Given: An array of non-negative integers
// Goal: Rearrange them such that they form the largest possible number.
// Hint: "9" + "34" > "34" + "9"  // so "9" comes before "34"

function largestNumber(nums) {
  const result = nums
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b)) // custom sort
    .join('');

  // Edge case: when array contains only zeros
  return result[0] === '0' ? '0' : result;
}

console.log(largestNumber([10, 2])); // "210"
console.log(largestNumber([3, 30, 34, 5, 9])); // "9534330"
console.log(largestNumber([0, 0, 0])); // "0"

// remove duplicates from an array in JavaScript
const arr = [1, 2, 3, 3, 2, 5];
const unique = arr.filter((value, index) => arr.indexOf(value) === index);
console.log(unique); // [1, 2, 3, 4, 5]

const uniqueReduce = arr.reduce((acc, val) => {
  if (!acc.includes(val)) acc.push(val);
  return acc;
}, []);
console.log(unique); // [1, 2, 3, 4, 5]

// Stack Data Structure in JavaScript (ES6), including common methods:
class Stack {
  constructor() {
    this.items = [];
  }

  // Push item to top
  push(element) {
    this.items.push(element);
  }

  // Remove and return top item
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  // Peek at the top item without removing
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get size of the stack
  size() {
    return this.items.length;
  }

  // Clear the stack
  clear() {
    this.items = [];
  }

  // Print stack as a string (for debugging)
  print() {
    console.log(this.items.join(' '));
  }
}

const stack = new Stack();

stack.push(10);
stack.push(20);
stack.push(30);

console.log('Top element:', stack.peek()); // 30
console.log('Stack size:', stack.size()); // 3

stack.pop(); // removes 30
stack.print(); // 10 20

stack.clear();
console.log('Is empty?', stack.isEmpty()); // true

// Find Max number
const numbers = [3, 7, 2, 9, 1, 14, 5];
const max = Math.max(...numbers);
console.log(max); // 14

const maxReduce = numbers.reduce((a, b) => (a > b ? a : b));
console.log(max); // 14

let maxLoop = numbers[0];
for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > max) max = numbers[i];
}
console.log(max); // 14

// Group array items into an object based on the value of a specified key or property.
function groupBy(arr, key) {
  return arr.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
}

function groupByInterview(arr, key) {
  const result = {};

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const groupKey = typeof key === 'function' ? key(item) : item[key];

    if (result.hasOwnProperty(groupKey)) {
      result[groupKey].push(item);
    } else {
      result[groupKey] = [item];
    }
  }

  return result;
}

const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 30 },
];

const grouped = groupBy(people, 'age');
console.log(grouped);

/*
    {
      25: [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 25 }],
      30: [{ name: 'Charlie', age: 30 }]
    }
    */

// Is Palindrome

function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const clean = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  const reversed = clean.split('').reverse().join('');
  return clean === reversed;
}

const isPalindromeShort = (s) =>
  (s = s.toLowerCase().replace(/[^a-z0-9]/g, '')) === [...s].reverse().join('');

isPalindrome('racecar'); // true
isPalindrome('A man, a plan, a canal: Panama'); // true
isPalindrome('hello');

// Get By Path
function getByPath(obj, path) {
  if (!obj || !path) return undefined;

  const keys = Array.isArray(path) ? path : path.split('.');

  return keys.reduce((acc, key) => {
    return acc && acc.hasOwnProperty(key) ? acc[key] : undefined;
  }, obj);
}

const data = {
  settings: {
    theme: {
      darkMode: true,
    },
    language: 'en',
  },
};

console.log(getByPath(data, 'settings.theme.darkMode')); // true
console.log(getByPath(data, ['settings', 'language'])); // "en"
console.log(getByPath(data, 'settings.currency')); // undefined

//   one(fn)
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

const init = once(() => {
  console.log('Initialized!');
  return 42;
});

console.log(init()); // "Initialized!" → 42
console.log(init()); // No log → 42
console.log(init()); // No log → 42

// Curried Sum
function curry(fn) {
  return function curried(...args) {
    if (args.lenght >= fn.length) {
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

// Shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap
  }
  return array;
}

const arr1 = [1, 2, 3, 4, 5];
const shuffled = shuffle([...arr]); // Use spread to avoid mutating original
console.log(shuffled);

// Basic Vowel Counter
function countVowels(str) {
  const vowels = 'aeiouAEIOU';
  let count = 0;

  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }

  return count;
}

console.log(countVowels('Vishal Urankar')); // 5
console.log(countVowels('rhythm')); // 0
console.log(countVowels('AEIOU')); // 5

// Custome resuce
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = this;
  let accumulator;
  let startIndex;

  // Handle initial value
  if (initialValue !== undefined) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // If no initialValue, use first non-empty element
    if (arr.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = arr[0];
    startIndex = 1;
  }

  // Iterate and reduce
  for (let i = startIndex; i < arr.length; i++) {
    if (i in arr) {
      // skip holes in sparse arrays
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
};

const nums = [1, 2, 3, 4];

const sum = nums.myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10

const product = nums.myReduce((acc, curr) => acc * curr);
console.log(product); // 24

// Flatten Array
function flattenDeep(arr) {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenDeep(item)); // recursively flatten
    } else {
      result.push(item);
    }
  }

  return result;
}

const nested = [1, [2, [3, [4, 5]], 6], 7];

console.log(flattenDeep(nested));
// Output: [1, 2, 3, 4, 5, 6, 7]

// capitalizeWords
function capitalizeWords(sentence) {
  return sentence
    .split(' ')
    .map((word) => {
      if (word.length === 0) return '';
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

console.log(capitalizeWords('hello world'));
// Output: "Hello World"

console.log(capitalizeWords('vishal urankar is coding'));
// Output: "Vishal Urankar Is Coding"

// Anagram Checker
function isAnagram(str1, str2) {
  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .split('')
      .sort()
      .join('');

  return normalize(str1) === normalize(str2);
}

isAnagram('listen', 'silent'); // true
isAnagram('Hello', 'Olelh'); // true
isAnagram('apple', 'pale'); // false

// Make Counter
function makeCounter() {
  let count = 0;

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    reset() {
      count = 0;
      return count;
    },
    value() {
      return count;
    },
  };
}

const counter = makeCounter();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.value()); // 1
console.log(counter.reset()); // 0
console.log(counter.value()); // 0

// Find Missing Number
function findMissingNumber(arr) {
  const n = arr.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((acc, val) => acc + val, 0);
  return expectedSum - actualSum;
}
findMissingNumber([3, 0, 1]); // Output: 2
findMissingNumber([0, 1, 2, 4, 5]); // Output: 3

// Memoization
// Implement a memoization function that takes a function as an argument and returns a memoized version of that function.
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args); // create a unique key based on arguments
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function slowAdd(a, b) {
  console.log('Computing...');
  return a + b;
}

const memoizedAdd = memoize(slowAdd);

console.log(memoizedAdd(2, 3)); // Computing... → 5
console.log(memoizedAdd(2, 3)); // Cached → 5 (no "Computing...")

// Flatten Deep objects
function flattenObject(obj, parentKey = '', result = {}) {
  // Your implementation
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      const value = obj[key];

      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        flattenObject(value, fullKey, result);
      } else {
        result[fullKey] = value;
      }
    }
  }

  return result;
}

//For the purpose of user debugging.
flattenObject({ a: { b: 1 } });

function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Throttle. Implement a Throttle Function
function logScroll() {
  console.log('Scrolled at', new Date().toLocaleTimeString());
}

const throttledScroll = throttle(logScroll, 1000);

window.addEventListener('scroll', throttledScroll);

// Longest Substring No Repeats
// Find the length of the longest substring without repeating characters (e.g., "abcabcbb" → 3)
function lengthOfLongestSubstring(s) {
  let maxLen = 0;
  let start = 0;
  const seen = new Map(); // stores character → index

  for (let end = 0; end < s.length; end++) {
    const char = s[end];

    if (seen.has(char) && seen.get(char) >= start) {
      // Move the start pointer just past the last occurrence
      start = seen.get(char) + 1;
    }

    seen.set(char, end); // Update last seen index
    maxLen = Math.max(maxLen, end - start + 1);
  }

  return maxLen;
}
lengthOfLongestSubstring('abcabcbb'); // 3 → "abc"
lengthOfLongestSubstring('bbbbb'); // 1 → "b"
lengthOfLongestSubstring('pwwkew'); // 3 → "wke"

// Debounce
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function logInput(value) {
  console.log('Searching for:', value);
}

const debouncedLog = debounce(logInput, 300);

// Event Emitter
// Design and implement an EventEmitter class that mimics Node.js-style event handling.
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // Register a listener
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // Register a one-time listener
  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper); // remove after first call
      listener(...args);
    };
    this.on(event, wrapper);
  }

  // Emit an event
  emit(event, ...args) {
    if (!this.events[event]) return false;
    for (const listener of this.events[event]) {
      listener(...args);
    }
    return true;
  }

  // Remove a listener
  off(event, listenerToRemove) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(
      (listener) => listener !== listenerToRemove
    );
  }
}

const emitter = new EventEmitter();

function greet(name) {
  console.log(`Hello, ${name}!`);
}

emitter.on('hello', greet);
emitter.emit('hello', 'Vishal'); // Hello, Vishal!

emitter.off('hello', greet);
emitter.emit('hello', 'Vishal'); // (No output)

emitter.once('ping', () => console.log('Pong!'));
emitter.emit('ping'); // Pong!
emitter.emit('ping'); // (No output)

// Merge Array
// Merge the array of object data by id
function mergeById(arr) {
  const merged = {};

  for (const item of arr) {
    const id = item.id;

    if (!merged[id]) {
      merged[id] = { ...item };
    } else {
      merged[id] = { ...merged[id], ...item };
    }
  }

  return Object.values(merged);
}
const input = [
  { id: 1, name: 'Alice' },
  { id: 2, city: 'Bangalore' },
  { id: 1, age: 30 },
  { id: 2, name: 'Bob' },
];

console.log(mergeById(input));

// List Format
// Write a function that takes an array of strings and returns a human-readable list
function formatList(items) {
  const len = items.length;

  if (len === 0) return '';
  if (len === 1) return items[0];
  if (len === 2) return `${items[0]} and ${items[1]}`;

  return `${items.slice(0, -1).join(', ')} and ${items[len - 1]}`;
}
console.log(formatList([])); // ''
console.log(formatList(['Apples'])); // 'Apples'
console.log(formatList(['Apples', 'Bananas'])); // 'Apples and Bananas'
console.log(formatList(['Apples', 'Bananas', 'Oranges'])); // 'Apples, Bananas and Oranges'
console.log(formatList(['A', 'B', 'C', 'D'])); // 'A, B, C and D'

// Lazy Evaluation
// Create a lazy function evaluator that allows chaining of functions
function lazyEvaluator(initialValue) {
  const operations = [];

  const api = {
    add(n) {
      operations.push((val) => val + n);
      return api;
    },
    subtract(n) {
      operations.push((val) => val - n);
      return api;
    },
    multiply(n) {
      operations.push((val) => val * n);
      return api;
    },
    divide(n) {
      operations.push((val) => val / n);
      return api;
    },
    evaluate() {
      return operations.reduce((acc, fn) => fn(acc), initialValue);
    },
  };

  return api;
}

const result = lazyEvaluator(5)
  .add(3) // 5 + 3 = 8
  .multiply(2) // 8 * 2 = 16
  .subtract(4) // 16 - 4 = 12
  .evaluate();

console.log(result); // 12

// JSON.stringify. Implement a custom version of JSON.stringify.
function jsonStringify(value) {
  // Handle null
  if (value === null) return 'null';

  // Handle strings
  if (typeof value === 'string') return `"${value}"`;

  // Handle numbers and booleans
  if (typeof value === 'number' || typeof value === 'boolean')
    return String(value);

  // Handle arrays
  if (Array.isArray(value)) {
    const elements = value.map((el) => jsonStringify(el) ?? 'null');
    return `[${elements.join(',')}]`;
  }

  // Handle plain objects
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const entries = keys.reduce((acc, key) => {
      const val = value[key];
      if (typeof val !== 'function' && val !== undefined) {
        acc.push(`"${key}":${jsonStringify(val)}`);
      }
      return acc;
    }, []);
    return `{${entries.join(',')}}`;
  }

  // Ignore functions and undefined
  return undefined;
}

console.log(jsonStringify({ name: 'Vishal', age: 30 }));
// {"name":"Vishal","age":30}

console.log(jsonStringify([1, 'test', null, true]));
// [1,"test",null,true]

console.log(jsonStringify({ a: undefined, b: () => {}, c: 'valid' }));
// {"c":"valid"}

// Deep Clone Object
// Create a function that performs a deep clone of a given JavaScript object.
function deepClone(obj, hash = new WeakMap()) {
  // Handle null, undefined, primitive types
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle circular references
  if (hash.has(obj)) return hash.get(obj);

  // Handle Date
  if (obj instanceof Date) return new Date(obj);

  // Handle RegExp
  if (obj instanceof RegExp) return new RegExp(obj);

  // Handle Arrays
  if (Array.isArray(obj)) {
    const arr = [];
    hash.set(obj, arr); // set before recursion to handle circular
    for (let item of obj) {
      arr.push(deepClone(item, hash));
    }
    return arr;
  }

  // Handle Objects
  const clone = {};
  hash.set(obj, clone); // set before recursion
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }

  return clone;
}

const original = {
  name: 'Vishal',
  meta: {
    age: 30,
    skills: ['JS', 'Node', 'AI'],
  },
  created: new Date(),
  pattern: /abc/gi,
};

const copy = deepClone(original);
console.log(copy);
console.log(copy === original); // false
console.log(copy.meta === original.meta); // false

// Detect data type in JS
// Create a function detectType() that returns the data type of the given input.
function detectType(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Date) return 'date';
  if (value instanceof RegExp) return 'regexp';
  if (value instanceof Map) return 'map';
  if (value instanceof Set) return 'set';
  if (value instanceof WeakMap) return 'weakmap';
  if (value instanceof WeakSet) return 'weakset';

  return typeof value;
}

console.log(detectType(42)); // "number"
console.log(detectType('hello')); // "string"
console.log(detectType(null)); // "null"
console.log(detectType(undefined)); // "undefined"
console.log(detectType([1, 2, 3])); // "array"
console.log(detectType({ a: 1 })); // "object"
console.log(detectType(() => {})); // "function"
console.log(detectType(new Date())); // "date"
console.log(detectType(/abc/)); // "regexp"
console.log(detectType(new Map())); // "map"
console.log(detectType(new Set())); // "set"

// Implement Promise Race
// Polyfill Promise.race() that resolves or rejects as soon as the first promise in the iterable settles.
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject);
    }
  });
}

const p1 = new Promise((res) => setTimeout(() => res('First'), 300));
const p2 = new Promise((res) => setTimeout(() => res('Second'), 100));

promiseRace([p1, p2]).then(console.log); // → "Second"

// Deep Omit
// Remove specified keys from a deeply nested object or array.
function deepOmit(obj, keysToOmit) {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepOmit(item, keysToOmit));
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (!keysToOmit.includes(key)) {
        acc[key] = deepOmit(value, keysToOmit);
      }
      return acc;
    }, {});
  }

  return obj;
}

const data1 = {
  id: 1,
  name: 'Vishal',
  meta: {
    password: 'secret',
    token: 'abc123',
    profile: {
      email: 'test@example.com',
      password: 'hidden',
    },
  },
  items: [
    { id: 1, secret: 'yes' },
    { id: 2, secret: 'no' },
  ],
};

const cleaned = deepOmit(data, ['password', 'token', 'secret']);
console.log(cleaned);

// PromiseAll With Concurrency Limit
// Implement a function that works like Promise.all() but with a concurrency limit.
function promiseAllWithLimit(tasks, limit) {
  return new Promise((resolve, reject) => {
    const results = [];
    let inProgress = 0;
    let index = 0;
    let completed = 0;

    function runNext() {
      if (completed === tasks.length) {
        return resolve(results);
      }

      while (inProgress < limit && index < tasks.length) {
        const currentIndex = index++;
        inProgress++;

        Promise.resolve()
          .then(() => tasks[currentIndex]())
          .then((result) => {
            results[currentIndex] = result;
            inProgress--;
            completed++;
            runNext(); // trigger the next task
          })
          .catch((err) => {
            reject(err); // reject immediately on any error
          });
      }
    }

    runNext();
  });
}

const delay = (ms, val) => () =>
  new Promise((res) => setTimeout(() => res(val), ms));

const tasks = [
  delay(1000, 'A'),
  delay(500, 'B'),
  delay(300, 'C'),
  delay(400, 'D'),
  delay(200, 'E'),
];

promiseAllWithLimit(tasks, 2).then(console.log);
// Output (order preserved): ['A', 'B', 'C', 'D', 'E'] after total ~2s

// Concurrency Limited Task Scheduler
// You are given an array of asynchronous functions called tasks, where each function returns a Promise resolving to a value.
function runTasksWithConcurrencyLimit(tasks, limit) {
  return new Promise((resolve, reject) => {
    const results = [];
    let currentIndex = 0;
    let activeCount = 0;
    let completedCount = 0;

    function runNext() {
      if (completedCount === tasks.length) {
        return resolve(results);
      }

      while (activeCount < limit && currentIndex < tasks.length) {
        const idx = currentIndex++;
        activeCount++;

        Promise.resolve()
          .then(() => tasks[idx]())
          .then((result) => {
            results[idx] = result;
            activeCount--;
            completedCount++;
            runNext();
          })
          .catch(reject); // Fail fast
      }
    }

    runNext();
  });
}

const delay1 = (ms, val) => () =>
  new Promise((res) => setTimeout(() => res(val), ms));

const tasks1 = [
  delay(1000, 'A'),
  delay(300, 'B'),
  delay(400, 'C'),
  delay(100, 'D'),
  delay(200, 'E'),
  delay(500, 'F'),
];

runTasksWithConcurrencyLimit(tasks, 2).then(console.log);
// Output (in order): ['A', 'B', 'C', 'D', 'E', 'F']

// Search Rotated Array
// Search for a target in a rotated sorted array
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // search left
      } else {
        left = mid + 1; // search right
      }
    }
    // Right half is sorted
    else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1; // search right
      } else {
        right = mid - 1; // search left
      }
    }
  }

  return -1;
}

search([4, 5, 6, 7, 0, 1, 2], 0); // Output: 4
search([4, 5, 6, 7, 0, 1, 2], 3); // Output: -1
search([1], 0); // Output: -1

function reverseStringOptimized(str) {
  const letters = [];
  const result = [];

  // Collect all letters first
  for (const char of str) {
    if (/[A-Za-z]/.test(char)) {
      letters.push(char);
    }
  }

  // Rebuild string, replacing letters in reverse order
  for (const char of str) {
    if (/[A-Za-z]/.test(char)) {
      result.push(letters.pop()); // pop from end of letter stack
    } else {
      result.push(char); // non-letter remains in place
    }
  }

  return result.join('');
}

// Example
console.log(reverseStringOptimized('Ab,c,de!$')); // "ed,c,bA!$"

function moveZerosToEnd(arr) {
  let insertPos = 0;

  // Move all non-zero elements to the front
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[insertPos++] = arr[i];
    }
  }

  // Fill remaining positions with 0s
  while (insertPos < arr.length) {
    arr[insertPos++] = 0;
  }

  return arr;
}

console.log(moveZerosToEnd([1, 20, 0, 12, 0])); // [1, 20, 12, 0, 0]

// Basic JavaScript Types
console.log('NaN:', typeof NaN); // number
console.log('undefined:', typeof undefined); // undefined
console.log('null:', typeof null); // object (this is a known JavaScript quirk)
console.log('Array constructor:', typeof Array); // function
console.log('Object literal:', typeof {}); // object
console.log('Array literal:', typeof []); // object
console.log('Boolean true:', typeof true); // boolean
console.log('Boolean false:', typeof false); // boolean
console.log('Symbol constructor:', typeof Symbol); // function
console.log('Empty string:', typeof ''); // string

// Add more types and expressions for interview questions
console.log('Function expression:', typeof function () {}); // function
console.log('Class declaration:', typeof class Person {}); // function
console.log('BigInt constructor:', typeof BigInt(123)); // bigint
console.log('Date object:', typeof new Date()); // object
console.log('RegExp object:', typeof new RegExp('\\w+')); // object
console.log('Map object:', typeof new Map()); // object
console.log('Set object:', typeof new Set()); // object
console.log('Promise object:', typeof Promise.resolve()); // object
console.log('Error object:', typeof new Error()); // object

// Tricky JavaScript values
console.log('BigInt literal (1n):', typeof 1n); // bigint
console.log('Symbol instance:', typeof Symbol('desc')); // symbol
console.log('Array.isArray([]):', Array.isArray([])); // true
console.log(
  'Object.prototype.toString.call([]):',
  Object.prototype.toString.call([])
); // [object Array]
console.log(
  'Object.prototype.toString.call({}):',
  Object.prototype.toString.call({})
); // [object Object]
console.log(
  'Object.prototype.toString.call(null):',
  Object.prototype.toString.call(null)
); // [object Null]
console.log(
  'Object.prototype.toString.call(undefined):',
  Object.prototype.toString.call(undefined)
); // [object Undefined]

// More interview questions
console.log('NaN === NaN:', NaN === NaN); // false
console.log('0 === -0:', 0 === -0); // true
console.log('Object.is(NaN, NaN):', Object.is(NaN, NaN)); // true
console.log('Object.is(0, -0):', Object.is(0, -0)); // false
console.log('[] == ![]:', [] == ![]); // true ([] coerces to empty string, ![] is false, '' == false is true)
console.log('typeof document:', typeof document); // object in browser, undefined in Node.js
console.log('typeof window:', typeof window); // object in browser, undefined in Node.js
