class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BTree {
  constructor(data) {
    this.data = this.sortRemoveDuplicates(data);
    this.root = this.buildTree();
  }

  /** Sorts an array and removes duplicate values */
  sortRemoveDuplicates(arr) {
    let singleValues = [];
    arr.forEach(item => {
      if (!singleValues.includes(item)) {
        singleValues.push(item);
      }
    });
    return singleValues.sort((a, b) => a - b);
  }

  /** Builds a balanced binary tree out of an ordered array */
  buildTree(arr = this.data) {
    let end = arr.length - 1;
    let middle = Math.floor(end / 2);
    let rootNode = new Node(arr[middle]);

    // base case: if the indices cross, return null
    if (end < 0) return null;

    let leftSubArray = arr.slice(0, middle);
    let rightSubArray = arr.slice(middle + 1);

    rootNode.left = this.buildTree(leftSubArray);
    rootNode.right = this.buildTree(rightSubArray);

    return rootNode;
  }

  /** Traverses and prints the tree in level order (recursive) */
  levelOrderRec(node = this.root, queue = [], values = []) {
    if (node !== null) {
      queue.push(node.left);
      queue.push(node.right);
      values.push(node.value);
    } else if (queue.length <= 0) {
      return values;
    }
    return this.levelOrderRec(queue.shift(), queue, values);
  }

  /** Traverses and prints the tree in level order (iterative) */
  levelOrder() {
    let queue = [];
    let values = [];
    let node = this.root;

    if (node !== null) {
      queue.push(node.left);
      queue.push(node.right);
      values.push(node.value);
    }

    while (queue.length > 0) {
      node = queue.shift();
      if (node !== null) {
        queue.push(node.left);
        queue.push(node.right);
        values.push(node.value);
      }
    }
    return values;
  }

  /** Traverses and prints the tree depth first in preorder */
  preOrder(node = this.root, values = []) {
    if (node === null) return null;
    values.push(node.value);
    this.preOrder(node.left, values);
    this.preOrder(node.right, values);
    return values;
  }

  /** Traverses and prints the tree depth first inorder */
  inOrder(node = this.root, values = []) {
    if (node === null) return null;
    this.inOrder(node.left, values);
    values.push(node.value);
    this.inOrder(node.right, values);
    return values;
  }

  /** Traverses and prints the tree depth first in postorder */
  postOrder(node = this.root, values = []) {
    if (node === null) return null;
    this.postOrder(node.left, values);
    this.postOrder(node.right, values);
    values.push(node.value);
    return values;
  }

  /** Returns the node that contains the search value or null if not found */
  find(value, node = this.root) {
    if (node === null) return null;
    if (node.value === value) return node;
    if (value < node.value) return this.find(value, node.left);
    if (value > node.value) return this.find(value, node.right);
  }

  /** Returns the distance of a given node to the root node */
  depth(node, root = this.root, depth = 0) {
    if (node === root) return depth;
    if (node.value < root.value) return this.depth(node, root.left, ++depth);
    if (node.value > root.value) return this.depth(node, root.right, ++depth);
  }

  /** Returns the distance of a node to the furthermost leaf node */
  height(node) {
    if (node.left === null && node.right === null) return 0;
    if (node.left === null) {
      return this.height(node.right) + 1;
    }
    if (node.right === null) {
      return this.height(node.left) + 1;
    }
    let hLeft = this.height(node.left) + 1;
    let hRight = this.height(node.right) + 1;
    if (hLeft >= hRight) return hLeft;
    return hRight;
  }

  /** Inserts the given value into the tree, if it doesn't already exist */
  insert(value, root = this.root) {
    if (this.find(value) !== null) return 'Value already exists';
    if (value < root.value && root.left === null) {
      root.left = new Node(value);
    } else if (value > root.value && root.right === null) {
      root.right = new Node(value);
    } else if (value < root.value) {
      this.insert(value, root.left);
    } else if (value > root.value) {
      this.insert(value, root.right);
    }
  }

  /** Helper that returns the parent of a given node */
  parent(node, root = this.root, parent = null) {
    if (root === null) return null;
    if (node.value === root.value) return parent;
    if (node.value < root.value && root.left !== null) {
      return this.parent(node, root.left, root);
    }
    if (node.value > root.value && root.right !== null) {
      return this.parent(node, root.right, root);
    }
    return null;
  }

  /** Helper that returns the leftmost child of a given node */
  findLeftMostChild(node) {
    if (node.left === null) return node;
    return this.findLeftMostChild(node.left);
  }

  /** Deletes the given value from the tree */
  delete(value) {
    let nodeToDelete = this.find(value);
    if (nodeToDelete === null) return "Value doesn't exist";
    let parent = this.parent(nodeToDelete);
    // case 1: node is a leaf node
    if (nodeToDelete.left === null && nodeToDelete.right === null) {
      // if there is no parent, it means we are deleting the root node
      if (parent === null) this.root = null;
      if (parent.left === nodeToDelete) {
        parent.left = null;
      } else if (parent.right === nodeToDelete) {
        parent.right = null;
      }
    }
    // case 2: node has a single child
    else if (nodeToDelete.left === null) {
      if (parent === null) {
        this.root = nodeToDelete.right;
      } else if (parent.left === nodeToDelete) {
        parent.left = nodeToDelete.right;
      } else if (parent.right === nodeToDelete) {
        parent.right = nodeToDelete.right;
      }
    } else if (nodeToDelete.right === null) {
      if (parent === null) {
        this.root = nodeToDelete.left;
      } else if (parent.left === nodeToDelete) {
        parent.left = nodeToDelete.left;
      } else if (parent.right === nodeToDelete) {
        parent.right = nodeToDelete.left;
      }
    }
    // case 3: node has 2 children
    // this doesn't quite work
    else {
      // go the right child, and then to the leftmost child of that
      let nextBiggest = this.findLeftMostChild(nodeToDelete.right);
      // set the pointer of the parent of the switching node
      let parentOfNextBiggest = this.parent(nextBiggest);
      // when there are right children, handle them
      if (nextBiggest.right !== null) {
        // note: nextBiggest can also be the right node of its parent! (in case it has no left children!)
        if (parentOfNextBiggest.left === nextBiggest) {
          parentOfNextBiggest.left = nextBiggest.right;
        } else if (parentOfNextBiggest.right === nextBiggest) {
          parentOfNextBiggest.right = nextBiggest.right;
        }
      } else {
        if (parentOfNextBiggest.left === nextBiggest) {
          parentOfNextBiggest.left = null;
        } else if (parentOfNextBiggest.right === nextBiggest) {
          parentOfNextBiggest.right = null;
        }
      }
      // switch that node with the node to delete
      if (parent === null) {
        this.root = nextBiggest;
      } else if (parent.left === nodeToDelete) {
        parent.left = nextBiggest;
      } else if (parent.right === nodeToDelete) {
        parent.right = nextBiggest;
      }
      //adjust the pointers of nextBiggest to replace the deleted node
      nextBiggest.left = nodeToDelete.left;
      nextBiggest.right = nodeToDelete.right;
    }
    return nodeToDelete;
  }

  /** Checks if the tree is balanced */
  isBalanced(node = this.root) {
    // base case: if node is  null, return -1 and balanced is true
    if (node === null) return { depth: -1, balanced: true };
    // otherwise, ask the left and right subtree
    let leftSubTree = this.isBalanced(node.left);
    let rightSubTree = this.isBalanced(node.right);
    let depth = Math.max(leftSubTree.depth, rightSubTree.depth) + 1;
    let balanced = true;
    if (
      Math.abs(leftSubTree.depth - rightSubTree.depth) > 1 ||
      !leftSubTree.balanced ||
      !rightSubTree.balanced
    )
      balanced = false;
    return { depth: depth, balanced: balanced };
  }

  /** Rebalances the tree */
  rebalance() {
    let orderedArr = this.inOrder();
    this.root = this.buildTree(orderedArr);
  }
}

// script
let testArr = [];
for (let i = 0; i < 15; i++) {
  testArr.push(Math.floor(Math.random() * 101));
}
// create the tree
let test = new BTree(testArr);
// print if it is balanced
let balancedInfo = test.isBalanced();
let balanced = balancedInfo.balanced ? 'balanced' : 'not balanced';
console.log('The tree is ' + balanced);
// print out level, pre-, in- and postorder
console.log('Level Order of Tree:');
console.log(test.levelOrder());
console.log('PreOrder of Tree:');
console.log(test.preOrder());
console.log('InOrder of Tree:');
console.log(test.inOrder());
console.log('PostOrder of Tree:');
console.log(test.postOrder());
// unbalance the tree
console.log('Inserting ...');
test.insert(120);
test.insert(140);
test.insert(160);
test.insert(130);
test.insert(110);
// confirm unbalance
balancedInfo = test.isBalanced();
balanced = balancedInfo.balanced ? 'balanced' : 'not balanced';
console.log('The tree is ' + balanced);
// rebalance
console.log('Rebalancing ...');
test.rebalance();
// confirm balance
balancedInfo = test.isBalanced();
balanced = balancedInfo.balanced ? 'balanced' : 'not balanced';
console.log('The tree is ' + balanced);
// print out level, pre-, in- and postorder
console.log('Level Order of Tree:');
console.log(test.levelOrder());
console.log('PreOrder of Tree:');
console.log(test.preOrder());
console.log('InOrder of Tree:');
console.log(test.inOrder());
console.log('PostOrder of Tree:');
console.log(test.postOrder());
