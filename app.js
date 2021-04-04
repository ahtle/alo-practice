// ********************************** BST *******************************

/*
                        9
                4               17
            3       6       10         22
                  5   7              20

*/
// inOrder (Depth first): left-most leaf to right-most leaf: 3,4,5,6,7,9,10,17,20,22
// preOrder (Depth first): explore root node first.. left to right: 9,4,3,6,5,7,17,10,22,20
// postOrder (Depth first): explore leaf node first.. left to right: 3,5,7,6,4,10,20,22,17,9
// levelOrder (Breadth first): starting from root, explore each level left -> right: 9,4,17,3,6,10,22,6,7,20

// worst case: O(n)
// balance the tree (different between min height and max height is <=1) to get O (logN)

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  findMax() {
    if (this.right == null) {
      return this.data;
    } else {
      return this.right.findMax();
    }
  }

  findMin() {
    if (this.left == null) {
      return this.data;
    } else {
      return this.left.findMin();
    }
  }

  find(data) {
    if (data === this.data) {
      return this;
    } else if (data < this.data && this.left !== null) {
      return this.left.find(data);
    } else if (data > this.data && this.right !== null) {
      return this.right.find(data);
    }
    return null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.root == null) {
      this.root = newNode;
      return;
    }

    const addNode = (node) => {
      if (newNode.data < node.data) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          addNode(node.left);
        }
      } else if (newNode.data > node.data) {
        if (node.right === null) {
          node.right = newNode;
        } else {
          addNode(node.right);
        }
      }
    };

    addNode(this.root);
  }

  findMin() {
    return this.root.findMin();
  }

  findMax() {
    return this.root.findMax();
  }

  find(data) {
    return this.root.find(data);
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (node === null) {
        return null;
      }
      if (data === node.data) {
        // if node have no childrens
        if (node.left === null && node.right === null) {
          return null;
        }
        // node have no left child
        if (node.left == null) {
          return node.right;
        }
        // node have no right child
        if (node.right == null) {
          return node.left;
        }
        // if node have both childs
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };

    this.root = removeNode(this.root, data);
  }

  inOrder(root = this.root) {
    root.left && this.inOrder(root.left);
    console.log(root.data);
    root.right && this.inOrder(root.right);
  }

  levelOrder(root = this.root) {
    const levels = [];
    if (!root) return levels;

    const queue = [root];
    while (queue.length) {
      const queueLen = queue.length;
      const level = [];
      for (let i = 0; i < queueLen; i++) {
        const node = queue.shift();
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
        level.push(node.data);
      }
      levels.push(level);
    }
    return levels;
  }
}

// const bst = new BST();
// bst.add(9);
// bst.add(4);
// bst.add(17);
// bst.add(3);
// bst.add(6);
// bst.add(3);
// bst.add(10);
// bst.add(22);
// bst.add(5);
// bst.add(20);
// // console.log(bst);
// // console.log(bst.find(4));
// // console.log(bst.findMax());
// // console.log(bst.findMin());
// bst.inOrder();
// console.log(bst.levelOrder());

// ******************************** END BST *******************************

// ***************************** HASH TABLE *******************************
// hash table/map is userful for unordered key/value.
// O(1)

class HashTable {
  constructor() {
    this.values = {};
    this.length = 0;
    this.size = 10;
  }

  calculateHash(key) {
    return key.toString().length % this.size;
  }

  set(key, value) {
    const hash = this.calculateHash(key);
    if (!this.values.hasOwnProperty(hash)) {
      this.values[hash] = {};
    }
    if (!this.values[hash].hasOwnProperty(key)) {
      this.length++;
    }
    this.values[hash][key] = value;
  }

  get(key) {
    const hash = this.calculateHash(key);
    if (this.values[hash]?.hasOwnProperty(key)) {
      return this.values[hash][key];
    } else {
      return null;
    }
  }
}

// const ht = new Map([
//     ['hi', 1],
//     ['hello', 2],
//     ['bye', 3],
// ]);

// const ht = new HashTable();
// ht.set('foo', 100);
// ht.set('bizz', 200);
// ht.set('bar', 300);

// console.log(ht);
// console.log('get bizz', ht.get('bizz'));

// ***************************** END TABLE *******************************

// ***************************** END QUICKSORT *******************************

function partition(arr, start, end) {
  // Taking the last element as the pivot
  const pivotValue = arr[end];
  let pivotIndex = start;

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      // Swapping elements
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      // Moving to next element
      pivotIndex++;
    }
  }

  // Putting the pivot value in the middle
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
}

function quickSortRecursive(arr, start, end) {
  // Base case or terminating case
  if (start >= end) {
    return;
  }

  // Returns pivotIndex
  let index = partition(arr, start, end);

  // Recursively apply the same logic to the left and right subarrays
  quickSortRecursive(arr, start, index - 1);
  quickSortRecursive(arr, index + 1, end);
}

const arr = [5, 3, 1, 2, 7, 0, 10, 4];
quickSortRecursive(arr, 0, arr.length - 1);
console.log(arr);

// ***************************** END QUICKSORT *******************************

// ***************************** START Binary Search *******************************
function binarySearch(arr, target, start, end) {
  // base
  if (start > end) return -1;

  let mid = Math.floor((start + end) / 2);

  // found
  if (arr[mid] === target) return mid;

  if (arr[mid] < target) return binarySearch(arr, target, mid + 1, end);

  return binarySearch(arr, target, start, mid - 1);
}

let index = binarySearch(arr, 4, 0, arr.length - 1);
console.log(index);

// ***************************** END Binary Search *******************************

// *****************************  MERGESORT *******************************
const mergeSort = (arr1, arr2) => {
  let sorted = [];

  // while (arr1.length && arr2.length) {
  //     if (arr1[0] < arr2[0]) {
  //         sorted.push(arr1.shift());
  //     } else if (arr1[0] >= arr2[0]) {
  //         sorted.push(arr2.shift());
  //     }
  // }
  // return [...sorted, ...arr1, ...arr2];

  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      sorted.push(arr1[i]);
      i++;
    } else {
      sorted.push(arr2[j]);
      j++;
    }
  }

  if (i < arr1.length) {
    sorted = sorted.concat(arr1.slice(i));
  } else {
    sorted = sorted.concat(arr2.slice(j));
  }
  return sorted;
};

// console.log(mergeSort([1,2,3,5,5,9],[2,4,6,7,8,10,11,12,13,14]));

// ***************************** END MERGESORT *******************************

// ***************************** singleNumber *******************************

// let nums = [4,1,2,5,2,1,4];
// var singleNumber = function(nums) {
//     // 2: use Set
//     const set1 = new Set();
//     for (let i = 0; i < nums.length; i++) {
//         if (!set1.has(nums[i])) {
//             set1.add(nums[i]);
//         } else {
//             set1.delete(nums[i]);
//         }
//     }

//     for (let key of set1) {
//         return key;
//     }
// };

// let res = singleNumber(nums);
// console.log(res);

// ***************************** intersect *******************************
// let nums1 = [1,2,2,1,4];
// let nums2 = [2,2];

// let intersect = (nums1, nums2) => {
//     let x = new Map();
//     nums1.forEach(element => {
//         if (!x.has(element)) {
//             x.set(element, 1);
//         } else {
//             x.set(element, x.get(element) + 1);
//         }
//     });

//     let res = [];
//     nums2.forEach(element => {
//         if (x.has(element) && x.get(element) > 0) {
//             res.push(element);
//             x.set(element, x.get(element) - 1);
//         }
//     });

//     return res;
// }

// let res = intersect(nums1, nums2);
// console.log(res);

// ***************************** plusOne *******************************
// const digits = [9,9];

// var plusOne = function(digits) {
//     digits[digits.length - 1]++;

//     for (let i = digits.length - 1; i > 0; i--) {
//         if (digits[i] === 10) {
//             digits[i] = 0;
//             ++digits[i - 1];
//         } else {
//             return digits;
//         }
//     }

//     if (digits[0] === 10) {
//         digits[0] = 0;
//         digits.unshift(1);
//     }
//     return digits;
// };

// let res = plusOne(digits);
// console.log(res);

// ***************************** moveZeroes *******************************
// let nums = [0,1,0,3,12];
// var moveZeroes = function(nums) {
//     let j = 0;
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] !== 0) {
//             nums[j] = nums[i];
//             j++;
//         }
//     }
//     for (let i = j; i < nums.length; i++) {
//         nums[i] = 0;
//     }
// };

// let res = moveZeroes(nums);

// ***************************** twoSum *******************************
// const nums = [3,2,4];
// const target = 6;
// var twoSum = function(nums, target) {
//     for (let i = 0; i < nums.length - 1; i++) {
//         for (let j = i + 1; j < nums.length; j++) {
//             if (nums[i] + nums[j] === target) {
//                 return [i, j];
//             }
//         }
//     }

// //     let hashStorage = {};
// //     for (let i in nums) {
// //         let dif = target - nums[i];

// //         if (dif in hashStorage) {
// //             return [i, hashStorage[dif]];
// //         }
// //         hashStorage[nums[i]] = i;
// //     }
// };

// let res = twoSum(nums, target);
// console.log(res);

// ***************************** firstUniqChar *******************************
// var firstUniqChar = function(s) {
//     for (let i = 0; i < s.length; i++) {
//         if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
//             return i;
//         }
//     }
//     return -1;
// };

// let res = firstUniqChar("aadadaad");
// console.log(res);

// ***************************** anagram *******************************
// var isAnagram = function(s, t) {
//     if (s.length !== t.length) {
//         return false;
//     }

//     let obj = {};
//     for (let i = 0; i < s.length; i++) {
//         !obj[s[i]] ? obj[s[i]] = 1 : obj[s[i]]++;
//     }
//     for (let i = 0; i < t.length; i++) {
//         if (obj[t[i]]) {
//             if (obj[t[i]] === 0) {
//                 return false;
//             }
//             obj[t[i]]--;
//         } else {
//             return false;
//         }
//     }
//     return true;
// };

// let res = isAnagram("ab", 'a');
// console.log(res);

// ***************************** isPalindrome *******************************
//  var isPalindrome = function(s) {
//     s = s.toLocaleLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
//     let i = 0;
//     let j = s.length - 1;
//     while (i < j) {
//         if (s[i] !== s[j]) {
//             return false;
//         }
//         i++;
//         j--;
//     }
//     return true;
// };

// let res = isPalindrome('A man, a plan, a canal: Panama');
// console.log(res);

// ***************************** longest prefix *******************************
// var longestCommonPrefix = function(strs) {
//     if (strs.length == 0)
//         return '';

//     // start with first word
//     let prefix = strs[0];

//     // loop through other words;
//     for (let i = 1; i < strs.length; i++) {

//         while (strs[i].indexOf(prefix) != 0) {
//             prefix = prefix.substring(0, prefix.length - 1);
//             if (prefix.length == 0) {
//                 return ''
//             }
//         }
//     }

//     return prefix;
// };

// let res = longestCommonPrefix(["flower","flow","flight"]);
// console.log(res);

// ***************************** climbstairs / Fibonacci *******************************
// var climbStairs = function(n, memo = {}) {
//     if (n in memo) return memo[n];
//     if (n <= 1) return 1;

//     let res = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
//     memo[n] = res;
//     return res;
// };

// console.log(climbStairs(20)); // 10946

// const fib = (n, memo = {}) => {
//     if (n in memo)  return memo[n];
//     if (n <= 1) return 1;

//     let res = fib(n - 1, memo) + fib(n - 2, memo);
//     memo[n] = res;
//     return res;
// }

// console.log(fib(7))
// console.log(fib(8))
// console.log(fib(9))
// console.log(fib(100))
