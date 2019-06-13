#!/usr/bin/env node


// Note - algorithm doesn't need a binary search tree to work! Just had one handy. 
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

// Assumes binary tree, but not a binary search tree. 
// Builds paths from head to node. Then compares paths, and returns last node before they diverge. 
function findLowestCommonAncestor(head, node1, node2){

  // find path to node
  const dfs = (currentNode, target) => {
    // If left branch, search it
    if (currentNode.left) {
      // If next node is it, push that into array
      if (currentNode.left.data === target) {
        return [{ node: currentNode.left, direction: 'left' }];
      // Else search down array
      } else {
        // Left will only exist if it's somewhere down left path. 
        let left = dfs(currentNode.left, target);
        if (left) {
          left.unshift({ node: currentNode.left, direction: 'left' });
          return left;
        }
      }

    }
    // Repeat process for right
    if (currentNode.right) {
      if (currentNode.right.data === target) {
        return [{ node: currentNode.right, direction: 'right' }];
      } else {
        let right = dfs(currentNode.right, target)
        if (right) {
          right.unshift({ node: currentNode.right, direction: 'right' }); 
          return right
        }
      }
    } 

    // If end, respond with null
    if (!currentNode.left && !currentNode.right){
      return null
    }
  }
  // find ancestor 
  const node1Path = dfs(head, node1);
  const node2Path = dfs(head, node2);

  let sharedPath = []
  // maxPathLength is whichever path is longer. 
  let maxPathLength = node1Path.length < node2Path.length ? node1Path.length : node2Path.length;
  for (let i = 0; i <= maxPathLength; i++) { //
    // If paths are shared, add to shared path. 
    if (node1Path[i] && node2Path[i] && node2Path[i].direction === node1Path[i].direction) {
      sharedPath.push(node1Path[i].direction);
    } else { // Once the paths diverge, the last point on the shared path is the node. 
      return {
        sharedPath: sharedPath, 
        node: i === 0 ? head : node1Path[i-1].node}
    }
  } 
}



const lcaResult = findLowestCommonAncestor(binarySearchTree, 2,20)
console.log(lcaResult.sharedPath, lcaResult.node)