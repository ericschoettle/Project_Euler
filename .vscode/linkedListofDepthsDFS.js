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


// depth-first approach on BST
function listOfDepthsDFS(head) {
  let depths = [];
  function dfs(treeNode, depth = 0) {
    let linkedListNode = depths[depth] || null;
    // Build linked list by adding to the front of it. 
    depths[depth] = {
      data: treeNode.data, 
      next: linkedListNode
    };
    // If nodes exist, recurse
    if (treeNode.right) {
      dfs(treeNode.right, depth + 1);
    }
    if (treeNode.left) {
      dfs(treeNode.left, depth + 1);
    }
  }
  dfs(head);
  return depths;
}
