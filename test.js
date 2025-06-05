function reverseString(str) {
  // Method 1: Using a stack (your approach with a fix)
  const letters = [];
  const result = [];

  // Push all characters onto the stack
  for (const char of str) {
    letters.push(char);
  }

  // Pop characters from the stack to reverse the order
  while (letters.length > 0) {
    result.push(letters.pop());
  }

  return result.join('');
}

// Method 2: Two-pointer technique (most efficient)
function reverseStringTwoPointers(str) {
  const chars = str.split('');
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    // Swap characters
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }

  return chars.join('');
}

function reverseStr(str) {
  const chars = str.split('');
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }

  return chars.join('');
}

// Method 3: Using reduce
function reverseStringReduce(str) {
  return str.split('').reduce((acc, char) => char + acc, '');
}

// Test all methods
const original = 'abcde';
console.log(`Original: ${original}`);
console.log(`Method 1: ${reverseString(original)}`);
console.log(`Method 2: ${reverseStringTwoPointers(original)}`);
console.log(`Method 3: ${reverseStringReduce(original)}`);

console.log([1, 2, 3] + [4, 5, 6]);
console.log({ a: 1, b: 2 } + { c: 3, d: 4 });

function sortByAge(arr) {
  return arr.sort((a, b) => {
    const ageA = parseInt(a.split(' ')[1], 10);
    const ageB = parseInt(b.split(' ')[1], 10);
    return ageA - ageB;
  });
}

const arr3 = ['John 21', 'Jaime 14', 'Jorah 34', 'Rob 45', 'Jamica 5'];
const sorted = sortByAge(arr3);
console.log(sorted);
