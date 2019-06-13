#!/usr/bin/env node

// custom hashtable inplementation. Handles collisions with linked lists, 
class HashTable {
  constructor() {
    this.array = new Array(8).fill(null);
    this.collisions = 0
  }
  generateHash(string) { // stolen from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    var hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
  insert(key, value) {
    const index = this.generateHash(key) % this.array.length;
    if (this.array[index]) { // If there's something there, increment collisions. 
      this.collisions ++
    } 
    this.array[index] = {key: key, value: value, next: this.array[index]} // Handles collisions by building linked list. 
  }
  retrieve(key) {
    let node = this.array[this.generateHash(key) % this.array.length];
    while (node.next && node.key !== key) {
      node = node.next;
    }
    if (node.key === key) {
      return node.value;
    } else {
      return 'not found'
    }
  }
  remove(key) {
    const index = this.generateHash(key) % this.array.length;
    let node = this.array[index];
    debugger
    // If first item, move node.next to head
    if (node.key === key) { 
      this.array[index] = node.next;
    } else if (node.next) { 
      while (node.next.next && node.next.key !== key) {
        node = node.next;
      }
      if (node.next.key === key) {
        node.next = node.next.next
      } else {
        return 'not found'
      }
    } else {
      return 'not found'
    }
  }
  update(key, value) {
    const index = this.generateHash(key) % this.array.length;
    let node = this.array[index];
    while (node.next && node.key !== key) {
      node = node.next;
    }
    if (node.key === key) {
      node.value = value;
      return 'updated'
    } else {
      return 'not found'
    }
  }
}

let testTable = new HashTable()
testTable.insert('blue', 2);
testTable.insert('red', 4);
testTable.insert('v', 4);
testTable.insert('r', 6);
testTable.insert('w', 7);
testTable.insert('t', 10);
testTable.insert('y', 1);
testTable.insert('a', 7);
testTable.insert('b', 0);
testTable.insert('c', 1);
// testTable.remove('b'); // remove first item from array
// testTable.remove('r') // remove middle item from array
testTable.remove('blue') // remove last item from array

// console.log(testTable.retrieve('t'));
// console.log(testTable.update('t', 'new!!'));
// console.log(testTable.retrieve('t'));