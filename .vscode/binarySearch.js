#!/usr/bin/env node

const list = [2,5,7,8,9,10,20,21,22,23,24,25]; // must be ordered

const defaultComparator = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

// This is messy - had to do a lot to avoid off-by-one errors. 
// The approach is to keep track of index and step size, and just keep halving step size. 
const binarySearch = (list, target, comparator = defaultComparator)=>{
  let stepSize = list.length/2;
  let currIndex = Math.ceil(stepSize - 1);
  let compared = comparator(list[currIndex], target);
  while (compared !== 0 && stepSize > 0.125) {
    // Increment step size
    stepSize = stepSize/2

    if (compared === -1) { // If haven't reached the value

      // Go forward 1/2
      let testCurrIndex = currIndex + Math.ceil(stepSize); 

      // Check that you havn't gone past the end of the list
      currIndex = (testCurrIndex > list.length - 1) ? list.length - 1 : testCurrIndex;
    // If you passed the value
    } else if (comparator === 1) {
      // Go back 1/2
      let testCurrIndex = currIndex - Math.ceil(stepSize);

      // Check that above 0
      currIndex = (testCurrIndex < 0) ? 0 : testCurrIndex;

    } else {
      console.log('Not found!!');
    }
    compared = comparator(list[currIndex], target)
  }
  return currIndex
}

// this one is way better - keeps a window around the value, and moves either end of that to the middle, depending on value. 
const binarySearch2 = (list, target) => {
  let start = 0;
  let end = list.length - 1;
  let middle = Math.floor((end - start) /2);

  while (list[middle] !== target && start !== end) {
    if (list[middle] < target) { 
      start = middle + 1; // if the middle value was less than the target, must be in latter half of prior range
    } else if (list[middle] > target) {
      end = middle - 1; // if the middle value was greater than the target, must be in first half of prior range
    }
    // reset middle
    middle = start + (Math.floor((end - start) /2));
  }

  return (list[middle] === target) ? middle : -1; // if found, return index of number. Else return -1
}