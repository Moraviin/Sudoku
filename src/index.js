module.exports = function solveSudoku(matrix) {
  for(let r=0; r<9; r++){
    for(let c=0; c<9; c++){
      if(matrix[r][c]==0){
        let variable = avaibleElem(r,c,matrix);
        for(let i=0 , len= variable.length; i<len;i++){
          matrix[r][c]=variable[i];
          if(solveSudoku(matrix)){
            return matrix;
          }
            matrix[r][c]=0;
        }
        return false;
      }
    }
  }

  return true;   
}
function avaibleElem(row,element,matrix){
  let variable=[1, 2, 3, 4, 5, 6, 7, 8, 9];
 
  matrix.forEach(function(row){ //column check
    variable=uniqChek(row[element], variable);
  });

  matrix[row].forEach(function(element){
    variable=uniqChek(element, variable);
  })

  groupRow=Math.floor(row/3)*3;
  groupCol=Math.floor(element/3)*3;
  for(let r=groupRow; r<groupRow+3;r++)
    for(let c=groupCol; c<groupCol+3;c++){
      uniqChek(matrix[r][c], variable);
    }
  return variable
}

function uniqChek(element,variable){
  let index=variable.indexOf(element);
    const uniq=index==-1;
    if(!uniq){
      variable.splice(index,1);
    }
  return variable;
}
