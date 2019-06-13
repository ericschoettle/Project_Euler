#!/usr/bin/env node

const bubbleSort = (list)=>{
  let numSwitches;
  while (numSwitches !== 0) { // Loop through switching positions until none needed. 
    numSwitches = 0;
    for (let i = 0; i < list.length - 1; i++) {
      if (list[i] > list [i + 1]) { // if out of order
        // switch items and increment numSwitches. 
        let temp = list[i];
        list [i] = list[i + 1];
        list [i+1] = temp;
        numSwitches += 1;
      }
    }
  }
  return list;
}

// console.log(bubbleSort([4,2,3,1]));