/** This class represents a cyclic, undirected, unweighted graph */
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  /** Adds a vertex to the graph */
  addVertex(vertex) {
    this.adjacencyList.set(vertex, []);
  }

  /** Checks if an edge exists */
  edgeExists(vertex1, vertex2) {
    let key1 = this.adjacencyList.get(vertex1);
    let key2 = this.adjacencyList.get(vertex2);
    // if one of the two keys doesn't exist, return false
    if (key1 === undefined || key2 === undefined) return false;
    // check the adjacency list for key1. This is sufficient since this is an undirected graph
    return key1.includes(vertex2);
  }

  /** Adds an edge to the graph */
  addEdge(vertex1, vertex2) {
    // if edge already exists, return false
    if (this.edgeExists(vertex1, vertex2) === true) return false;
    // add vertex2 to the adjacency list of vertex 1
    let key1 = this.adjacencyList.get(vertex1);
    if (key1 === undefined) return false;
    key1.push(vertex2);
    // add vertex1 to the adjacency list of vertex 2
    let key2 = this.adjacencyList.get(vertex2);
    if (key2 === undefined) return false;
    key2.push(vertex1);

    return true;
  }

  /** Print the adjacency list */
  printList() {
    for (let [key, value] of this.adjacencyList) {
      console.log(key + ' => ' + value);
    }
  }

  /** Breadth first traversal of the graph */
  bft(start, visited = [], result = [], queue = []) {
    // only visit each node once
    if (visited.includes(start) === false) {
      visited.push(start);
      result.push(start);
      let edges = this.adjacencyList.get(start);
      edges.forEach(edge => queue.push(edge));
    }
    while (queue.length >= 1) {
      this.bft(queue.shift(), visited, result, queue);
    }
    return result;
  }

  /** Find the shortest path between two vertices */
  bfs(start, end, visited = [], queue = [], prev = new Map()) {
    // only visit each node once
    if (visited.includes(start) === false) {
      visited.push(start);
      let edges = this.adjacencyList.get(start);
      edges.forEach(edge => {
        if (visited.includes(edge) === false) {
          queue.push(edge);
          prev.set(edge, start);
        }
      });
    }
    while (queue.length >= 1) {
      this.bfs(queue.shift(), end, visited, queue, prev);
    }
    return prev;
  }

  /** Reconstruct a path to an endpoint */
  reconstructPath(end, prev) {
    let path = [end];
    let node = prev.get(end);
    while (node !== undefined) {
      path.push(node);
      node = prev.get(node);
    }
    return path.reverse();
  }

  /** Returns the shortest path from start to end */
  shortestPath(start, end) {
    return this.reconstructPath(end, this.bfs(start, end));
  }
}

/*------------------------------------------------------*
 * here starts the code for the knights travails problem *
 *-------------------------------------------------------*/

// create the chessboard
let board = [];
let chars = [...'ABCDEFGH'];
for (let i = 0; i <= 7; i++) {
  for (let j = 1; j <= 8; j++) {
    board.push(chars[i] + j);
  }
}

// add each field to the graph as a vertex
let graph = new Graph();
board.forEach(field => graph.addVertex(field));

// create the knight
class Knight {
  /** The knight needs a starting field in the format 'A1'
   * and a board in the form of a populated Graph object */
  constructor(field, board) {
    this.position = field;
    this.board = board;
    // in total 8 allowed moves. First number is up (positive) or down (negative),
    // second number is left (negative) or right (positive)
    this.allowedMoves = [
      [2, -1],
      [2, 1],
      [1, -2],
      [1, 2],
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2]
    ];
  }

  /** Returns the field as coordinates from 0 to 7 */
  uglifyField(field = this.position) {
    let coords = field.split('');
    let chars = [...'ABCDEFGH'];
    let coord1 = chars.indexOf(coords[0]);
    let coord2 = parseInt(coords[1]) - 1;
    return [coord1, coord2];
  }

  /** Takes in coordinates and returns the corresponding chess field */
  beautifyCoords(coords) {
    let chars = [...'ABCDEFGH'];
    return chars[coords[0]] + (coords[1] + 1);
  }

  /** The valiant knight explores his surroundings ... */
  exploreBoard(position = this.position, queue = []) {
    let start = this.uglifyField(position);
    this.allowedMoves.forEach(modifiers => {
      // check if the move leads out of the board
      if (
        start[0] + modifiers[0] >= 0 &&
        start[0] + modifiers[0] <= 7 &&
        start[1] + modifiers[1] >= 0 &&
        start[1] + modifiers[1] <= 7
      ) {
        let field = this.beautifyCoords([
          start[0] + modifiers[0],
          start[1] + modifiers[1]
        ]);
        // create the edges of the board
        let edgeCreated = this.board.addEdge(position, field);
        // if the edge doesn't already exist, push it to the queue
        if (edgeCreated === true) {
          queue.push(field);
        }
      }
    });
    while (queue.length >= 1) {
      this.exploreBoard(queue.shift(), queue);
    }
  }
}

let knight = new Knight('D4', graph);
