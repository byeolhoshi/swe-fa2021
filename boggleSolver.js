//Nyhriel Smith
function trieFunc(chara) {
  this.chara = chara;
  this.parent = null;
  this.child = {};
  this.isWord = false;
}

// Returns the word corresponding to this node.
trieFunc.prototype.asFullWord = function () {
  var output = [];
  var node = this;

  while (node !== null) {
    output.push(node.character);
    node = node.parent;
  }

  output.reverse();
  return output.join("");
};

function trieAdd(root, word) {
  let node = root;
  for (let i = 0; i < word.length; ++i) {
    let c = word[i];
    // If 'Q' is the final letter, word[i+1] is undefined
    if (c == "Q" && word[i + 1] == "U") {
      c = "QU";
      i = i + 1;
    }
    if (node.child[c] == undefined) {
      node.child[c] = new trieFunc(c);
      node.child[c].parent = node;
    }
    node = node.child[c];
  }
  node.isWord = true;
}


function boggleSolver(dict, grid) {
  this.trieRoot = new trieFunc();
  for (let word of dict) {
    trieAdd(this.trieRoot, word);
  }
  this.grid = grid;
  this.solutions = new Set();
}

boggleSolver.prototype.solve = function () {
  for (let row = 0; row < this.grid.length; ++row) {
    for (let col = 0; col < this.grid[0].length; ++col) {
      this.recursiveSolve(row, col, this.trieRoot);
    }
  }
};

boggleSolver.prototype.recursiveSolve = function (row, col, parentNode) {
  if (
    row < 0 ||
    row >= this.grid.length ||
    col < 0 ||
    col >= this.grid[0].length
  )
    return;

  const currentTile = this.grid[row][col];
  const currentNode = parentNode.child[currentTile];
  if (currentNode == undefined) return; 
  // '==' is undef
  console.log("currentNode");
  console.log(currentNode);

  if (currentNode.isWord) {
    this.solutions.add(currentNode.asFullWord());
  }
  this.grid[row][col] = "."; 
  //marking cell

  for (let dx = -1; dx < 2; ++dx) {
    for (let dy = -1; dy < 2; ++dy) {
      this.recursiveSolve(row + dx, col + dy, currentNode);
    }
  }

  this.grid[row][col] = currentTile; // Unmark the cell.
};


function findAllSolutions(grid, dict) {
  console.log("findAllSolutions");
  let boggleSolver = new boggleSolver(dict, grid);
  boggleSolver.solve();
  return [...boggleSolver.solutions];
}

export default findAllSolutions;

var grid = [['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'R'],
              ['O', 'N', 'T', 'A']];
var dic = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar', 'ra'];

console.log("Solutions: \n");

console.log(exports.findAllSolutions(grid, dic));