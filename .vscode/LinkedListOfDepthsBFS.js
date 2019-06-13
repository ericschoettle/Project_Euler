#!/usr/bin/env node

// Binary search tree obeys the rules that for any given node, the value to the left is smaller than the value to the right. 
const binarySearchTree = { 
  data: 8, 
  left: { 
    data: 4, 
    left: { 
      data: 2, 
      left: null, 
      right: null 
    }, 
    right: { 
      data: 6, 
      left: { 
        data: 5, 
        left: null, 
        right: null 
      }, 
      right: null 
    },
  },
  right: { 
    data: 10, 
    left: null, 
    right: { 
      data: 20, 
      left: null, 
      right: null 
    } 
  }  
};

// Takes binary tree, and using a Breadth First Search, creates an array of linked lists
function listOfDepthsBFS(head) {
  let depths = [[head]];
  let currentDepth = depths[0];
  // grab all and put into nested array
  while (currentDepth.length > 0) {
    let nextDepth = [];
    currentDepth.forEach(node=>{
      if (node.left) {
        nextDepth.push(node.left);
      }
      if (node.right) {
        nextDepth.push(node.right);
      }
    });
    depths.push(nextDepth);
    currentDepth = nextDepth;
  }
  depths.pop(); // Last one will be empty 'next depth'
  linkdedListDepths = []; // Put depths in here as a linked list
  depths.forEach(depth=>{
    let nextNode = null;
    for (let i = depth.length - 1; i >= 0; i--) { // run in reverse so that our linked list goes from smallest to largest (b/c we start with innermost)
      const node = depth[i];
      nextNode = {data: node.data, next: nextNode};
    }
    linkdedListDepths.push(nextNode);
  })
  return linkdedListDepths;
}

// console.log(listOfDepthsBFS(binarySearchTree))