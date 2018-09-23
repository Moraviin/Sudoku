module.exports = function solveSudoku(matrix) {
  let uniqNumbers={1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[], count:0};
  let zeros=[];
  let numbers=[];
  let row,column,district;
  let copyMatrix=[];
  let k=0;
  let changes=0;
  for(let r=0;r<9;r++){//zero init
    for(let c=0;c<9;c++){
      if (matrix[r][c]==0){
        zeros.push({1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 7:1, 8:1, 9:1});
        zeros[zeros.length-1].row=r; //last zero position
        zeros[zeros.length-1].column=c;
        zeros[zeros.length-1].district=Math.floor(r/3)*3+Math.floor(c/3);
     }
    }
  }
  while(1){
    changes=0;
    for(let i=0; i<zeros.length; i++){//simple check
      numbers=[];
      row=zeros[i].row;
      column=zeros[i].column;
      district=zeros[i].district;
      for(let c=0; c<9; c++){//rows numbers
       if(matrix[row][c]!=0)numbers.push(matrix[row][c]);
      }
      for(let r=0; r<9; r++){//columns numbers
        if(matrix[r][column]!=0)numbers.push(matrix[r][column]);
      }
      row=Math.floor(district/3)*3;
      column=district%3*3;
      for(let r=row;r<row+3;r++){//district numbers
        for(let c=column;c<column+3;c++){
          if(matrix[r][c]!=0)numbers.push(matrix[r][c]);
        }
      }
      numbers.forEach(function(number){
      delete zeros[i][number];})
    }

    for(let distr=0; distr<9; distr++){//unique zeros in district check
      uniqNumbers={1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[], count:0};
      for(let i=0; i<zeros.length; i++){
        if(zeros[i].district == distr){
          for(var numb in zeros[i]){
            if(!isNaN(numb)){ // if numb-integer
            uniqNumbers[numb].push(i);
            }
          }
          uniqNumbers.count++;
        }    
      }
      if(uniqNumbers.count>1){
        for(var key in uniqNumbers){
          if(uniqNumbers[key].length==1){
           k = uniqNumbers[key][0]; // k - number of zero in zeros_array with uniq variable
           for(var keyZ in zeros[k]){
             if(keyZ!=key && !isNaN(keyZ)){
             delete zeros[k][keyZ];
             } 
           }
         }
       }
      }
     }

    for(let i=0;i<zeros.length;i++){//solution->matrix
      if(Object.keys(zeros[i]).length==4){
        row=zeros[i].row;
        column=zeros[i].column;
        matrix[row][column]=parseInt(Object.keys(zeros[i])[0]);
        zeros.splice(i,1);
        i--;
        changes++;
      }
    }
    if(changes==0){
      return matrix;
    }
  }
  // your solution
}
