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
// Find the lowest common ancestor on a binary search tree. If both number are larger than a node, you need to search down the right branch - if both are smaller, you search down the left. 
// If the node is between the sameller and larger nodes, you know you're at the lowest common anestor, as the path to each one is in a different direction. 
const findLCABinarySearchTree = (head, val1, val2) => {
  if (val1 === val2) {
    // TODO put in error handling
    console.log('val1 = val2')
  }
  // larger and smaller are the larger and smaller search values. 
  const larger = (val1 > val2) ? val1 : val2;
  const smaller = (val1 < val2) ? val1 : val2;

  const search = (node, smaller, larger) => {
    // If LCA, left will be smaller and right will be larger. 
    if (smaller <= node.data && larger >= node.data) {
      return [node];
    // If larger is greater than the node, than both are down the right branch
    } else if (larger < node.data) {
      let pathBelow = search(node.left, smaller, larger);
      pathBelow.unshift('left'); // unshift adds to the beginning of an array - a linked list would be more efficient, but arrays are easy. 
      return pathBelow;
    // if smaller is greater than the node, than both are down the left branch
    } else if (smaller > node.data) {
      let pathBelow = search(node.right, smaller, larger);
      pathBelow.unshift('right'); // unshift adds to the beginning of an array - a linked list would be more efficient, but arrays are easy. 
      return pathBelow;
    }
  }

  let pathWithNode = search(head, smaller, larger);
  let node = pathWithNode.pop()
  return {node: node, sharedPath: pathWithNode};
}

const lcaResult = findLCABinarySearchTree(binarySearchTree, 5,5)
console.log(lcaResult.sharedPath, lcaResult.node)