/*
OK, I want to remember how linked lists work, so I'm gonna create a class for singly linked lists, with functions to add, remove, and search the list. 

Then, maybe, I'll make it doubly linked? Also, it seems like a pain in the ass to initilaize, so I'm gonna hard code one to start, and then maybe think about how I can intelligently initialize, or test that something is a linked list. 

Basic data structure: {data: {}, next: {data: {}, {next: null}}}
*/

class LinkedList {
  constructor(head = {data: null, next: null}) {
    this.head = head;
  }
  // traverse = () => {

  // }
  appendToEnd(node) {
    let curr = this.head;
    while (curr.next) {
      curr = curr.next
    }
    curr.next = node;
  }
  remove(condition) {
    let curr = this.head;
    let counter = 0;
    let callback = ()=>{}
    if (typeof condition === 'function') { 
    	callback = condition;
    } else if (typeof condition === 'number') {
      callback = (data, index) => {
        return index === condition;
      }
    }
    while (curr.next && !callback(curr.next.data, counter + 1)) {
      curr = curr.next
      counter++
    }
    if (curr.next) {
    	curr.next = curr.next.next;
    } else {
    	console.log('not found!')
    }
  }
  insertAtIndex(index, node) {
    let curr = this.head;
    let counter = 0
    while (curr.next && counter + 1 < index) {
      curr = curr.next
      counter++
    }
    node.next = curr.next;
    curr.next = node;
  }
}

var list = new LinkedList({data: 1, next: null});
list.appendToEnd({data: 2, next: null});
list.appendToEnd({data: 3, next: null});
list.appendToEnd({data: 4, next: null});
list.appendToEnd({data: 4, next: null});
console.log(list.head)
list.remove((data)=>{debugger; return data === 3});
console.log(list.head)



// problems - how do I traverse without rewritting