function sortByAge(arr) {
  return arr.sort((a, b) => {
    const ageA = parseInt(a.split(' ')[1], 10);
    const ageB = parseInt(b.split(' ')[1], 10);
    return ageA - ageB;
  });
}

function removeDuplicate(arr) {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

function removeDuplicateIndexOf(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result;
}

function isPalindrome(str) {
  const clean = str.replace(/[^a-z0-9]/g, '').toLowerCase();
  const reversed = clean.split('').reverse().join();
  return (clean = reversed);
}

function addCurry(a) {
  return function (b) {
    if (b) return addCurry(a + b);
    return a;
  };
}

function countVowels(str) {
  const vowels = 'aeiouAEIOU';
  const count = 0;

  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }

  return count;
}

function flattenDeep(arr) {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenDeep(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

function isAnagram(str1, str2) {
  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .split('')
      .sort()
      .join();

  return normalize(str1) === normalize(str2);
}

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

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

function debounce(fn, delay) {
  let timeOutId;

  return function (...args) {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

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

function compressString(str) {
  if (!str || str.length === 0) {
    return '';
  }

  let result = '';
  let currentChar = str[0];
  let count = 1;

  for (let i = 1; i <= str.length; i++) {
    // If current character is the same as previous, increment count
    if (i < str.length && str[i] === currentChar) {
      count++;
    } else {
      // Add the current character and its count to the result
      result += currentChar + count;

      // Reset count and update currentChar for the next sequence
      if (i < str.length) {
        currentChar = str[i];
        count = 1;
      }
    }
  }

  return result;
}

console.log(compressString('aaabbcaabbb'));
