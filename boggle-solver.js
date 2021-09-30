//Nyhriel Smith, @02915670
// Legland Burge, Source[code basis]
exports.findAllSolutions = function(grid, dic) {
  let solutions = [];

  if (grid == null || dic == null){
    return solutions;
  }
  
  let gridsize = grid.length;
  for (let i=0; i<gridsize; i++){
    if (grid[i].length != gridsize){
      return solutions;
    }
  }
  toLowerCase(grid, dic);
  
  if (!isValid(grid)){
    return solutions;
  }
  
  let solutionSet = new Set();
  let hash = createHash(dic); 
  
  for (let y=0; y<gridsize; y++){
    for (let x=0; x<gridsize; x++){
      let found = "";
      let visited = new Array(gridsize).fill(false).map(() => new Array(gridsize).fill(false));
      gridSearch(found, y, x, grid, visited, hash, solutionSet) 
    }
  }
  solutions = Array.from(solutionSet);
  
  return solutions;
    function isValid(grid){
    guide = /(st|qu) | [a-prt-z]/;
    for (let i=0; i < grid.length; i++){
      for (let j=0; j<grid[i].length; j++){
        if(!grid[i][j].match(guide)){
          return solutions;
        }
      }
    }
    return grid;
  } 

   function toLowerCase(grid, dic){
     for (let i=0; i<grid.length; i++){
       for(let j=0; j<grid[i].length; j++){
         grid[i][j] = grid[i][j].toLowerCase();
       }
     }
     
     for (let i=0; i<dic.length; i++){
       dic[i] = dic[i].toLowerCase();
    }
  }
  

  
  function gridSearch(found, y, x, grid, visited, hash, solutionSet){
    let adjacents = [[-1,-1], [-1,0], [-1,1], [0,1], [1,1], [1,0], [1, -1], [0, -1]];
    
    if (y<0 || x<0 || y>=grid.length || x>=grid.length || visited[y][x] == true){
      return;
    }
    
    found += grid[y][x];
    
    if (isPrefix(found, hash)){
      visited[y][x] = true;
      
      if (isWord(found, hash)){
        if (found.length >= 3){
          for (let i = 0; i < found.length; i++ ){
            if (i != (found.length-1)){
              continue;
            }
            else if(found[i] =='q' || found[i-1]=='q'){
              break;
            }
            else{
              solutionSet.add(found);
            }
          }
        }
      }
      
      for (let i=0; i<8; i++){
      gridSearch(found, y + adjacents[i][0], x + adjacents[i][1], grid, visited, hash, solutionSet);
      } 
   }
    
    visited[y][x] = false;
  
  }
  
  function createHash(dic){
    var hashDict = {};
    for (let i=0; i<dic.length; i++){
      hashDict[dic[i]] = 1;
      let wordlength = dic[i].length;
      var hashstrng = dic[i];
      for (let j=wordlength; wordlength > 1; wordlength--){
        hashstrng = hashstrng.substr(0, wordlength-1);
        if (hashstrng in hashDict){
          if (hashstrng == 1){
            hashDict[hashstrng] = 1;
          }
        }
        else{
          hashDict[hashstrng] = 0;
        }
      }
    }
    return hashDict;
  }

  function isPrefix(found, hash){
    return hash[found] != undefined;
  }
  
  function isWord(found, hash){
    return hash[found] == 1;
  }
  
} 

var grid = [['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'R'],
              ['O', 'N', 'T', 'A']];
var dic = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar', 'ra'];

console.log("Solutions: \n");

console.log(exports.findAllSolutions(grid, dic));