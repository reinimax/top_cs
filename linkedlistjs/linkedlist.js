class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.header = new Node();
  }

  /** Returns the value of the first node */
  head() {
    let firstNode = this.header.next;
    return firstNode.value;
  }

  /** Returns the value of the last node */
  tail() {
    let last = this.findLast();
    return last.value;
  }

  /** Helper function that returns the last node */
  findLast(start = this.header) {
    if (start.next === null) {
      return start;
    } else {
      return this.findLast(start.next);
    }
  }

  /** Appends a node to the list */
  append(value) {
    let newNode = new Node(value);
    if (this.header.next === null) {
      this.header.next = newNode;
    } else {
      let last = this.findLast();
      last.next = newNode;
    }
    return this;
  }

  /** Prepends a node to the list */
  prepend(value) {
    let first = this.header.next;
    let newNode = new Node(value, first);
    this.header.next = newNode;
    return this;
  }

  /** Prints a representation of the list */
  toString(start = this.header.next, str = '') {
    if (this.header.next === null) {
      console.log('The list is empty');
      return;
    }
    str += '( ' + start.value + ' ) -> ';
    if (start.next === null) {
      str += 'null';
      console.log(str);
      return;
    } else {
      return this.toString(start.next, str);
    }
  }

  /** Returns the total number of nodes in the list */
  size(start = this.header, counter = 0) {
    if (start.next === null) {
      return counter;
    } else {
      return this.size(start.next, ++counter);
    }
  }

  /** Helper that returns the node at the given index */
  findNode(index) {
    if (this.size() <= index || index < 0) {
      return false;
    }
    let node = this.header.next;
    let counter = 0;
    while (counter !== index) {
      node = node.next;
      counter++;
    }
    return node;
  }

  /** Returns the value of the node at the given index */
  at(index) {
    let node = this.findNode(index);
    if (node === false) {
      return 'Error: index must be less than size of the list and equal to or greater than zero.';
    }
    return node.value;
  }

  /** Removes the last node from the list */
  pop() {
    if (this.header.next === null) {
      return 'The list is already empty.';
    }
    let size = this.size();
    if (size === 1) {
      this.header.next = null;
    } else {
      // last node is size - 1, therefore the node before is size -2
      let nodeBeforeLastNode = this.findNode(size - 2);
      nodeBeforeLastNode.next = null;
    }
  }

  /** Returns true if value is contained in the list, false if not */
  contains(value, start = this.header) {
    if (start.value === value) {
      return true;
    } else if (start.next === null) {
      return false;
    } else {
      return this.contains(value, start.next);
    }
  }

  /** Returns the index of the node containing value, or null if not found */
  find(value, start = this.header.next, counter = 0) {
    if (this.header.next === null) {
      return null;
    }
    if (start.value === value) {
      return counter;
    } else if (start.next === null) {
      return null;
    } else {
      return this.find(value, start.next, ++counter);
    }
  }

  /** Inserts a given value at a given index. Returns true on success, false on failure. */
  insertAt(value, index) {
    let currentNode;
    // edge case 1: insert something at index 0 of an empty list
    if (this.size() === 0 && index === 0) {
      currentNode = null;
    } else if (this.size() === index) {
      // edge case 2: insert something at the very end of a list
      currentNode = null;
    } else {
      currentNode = this.findNode(index);
    }
    if (currentNode === false) {
      return false;
    }
    let newNode = new Node(value, currentNode);
    let nodeBeforecurrentNode = this.findNode(index - 1);
    // since we already found currentNode, not finding a node before it
    // means that the node before it must be the header
    if (!nodeBeforecurrentNode) {
      this.header.next = newNode;
    } else {
      nodeBeforecurrentNode.next = newNode;
    }
    return true;
  }
}
