module.exports = function solveSudoku(matrix) {
  let uniqNumbers={1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[], count:0};
  let zeros=[];
  let zerosGroup=[];
  let numbers=[];
  let row,column,district;
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
    for(let r=0; r<9 ; r++){
      validation(r,"row");
    }
    for(let c=0; c<9; c++){
      validation(c,"column");
    }
    for(let distr=0; distr<9; distr++){//unique zeros in district check
      validation(distr,"district")
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
  function validation(value, group){
    zerosGroup=[];
    for(let i=0; i<zeros.length; i++){
      if(zeros[i][group] == value){
        zerosGroup.push(i)
      }    
    }
    uniqCheck(zerosGroup);
   }
  function uniqCheck (arr){// arr - array of number zeros element in group
    uniqNumbers={1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[], count:0};
    for(let i=0; i<arr.length; i++){
      for(var numb in zeros[arr[i]]){
        if(!isNaN(numb)){ // if numb-integer
        uniqNumbers[numb].push(arr[i]);
        }
      }
      uniqNumbers.count++;     
    }
    hidenOnesCheck();
    hidenDoublesCheck();
    nakedDoubles();
  }
  function hidenOnesCheck(){
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
  function hidenDoublesCheck(){
    let double=[];
    let firstKey=0;
    let secondKey=0;
    if(uniqNumbers.count>2){
      for(let key in uniqNumbers){
        if(uniqNumbers[key].length==2){
         double.push(key); // k - number of zero in zeros_array with uniq variable
         }
       }
      for(let i=0; i<double.length; i++){
        for(let b=i+1;b<double.length;b++){
          if(uniqNumbers[double[i]]==uniqNumbers[double[b]]){
            firstKey=uniqNumbers[double[i]][0];
            secondKey=uniqNumbers[double[i]][1];
            deletingDoubles(firstKey,double[i],double[b]);
            deletingDoubles(secondKey,double[i],double[b]);
          }
        }
     }
    }
  }
  function deletingDoubles(pos,num1,num2){
    for(var key in zeros[pos]){
      const firstCondition=(key!=num1||key!=num2);
      const secondCodition=!isNaN(key);
      if(firstCondition&&secondCodition){
        delete zeros[pos][key];
      }
    }
  }
  function nakedDoubles(){
    let doubleKeyGroup=[];
    zeros.forEach(function(value,i){
      if (Object.keys(value).length==5){ //2key + 3key position
        doubleKeyGroup.push(i);
      }
    });
    doubleKeyGroup.forEach(function(val,i,arr){//0->end
      for(let b=i+1, len=arr.length;b<len ;b++){//current->end
        const condition0=Object.keys(zeros[val])[0]==Object.keys(zeros[arr[b]])[0];
        const condition1=Object.keys(zeros[val])[1]==Object.keys(zeros[arr[b]])[1];
        if(condition0 && condition1){
          if(zeros[val].row==zeros[arr[b]].row){
            let group=zeros[val].row;
            let n1=Object.keys(zeros[val])[0];
            let n2=Object.keys(zeros[val])[1];
            deletingPairs(n1,n2,"row",group,val,arr[b])
          }
          if(zeros[val].column==zeros[arr[b]].column){
            let group=zeros[val].column;
            let n1=Object.keys(zeros[val])[0];
            let n2=Object.keys(zeros[val])[1];
            deletingPairs(n1,n2,"column",group,val,arr[b])
          }
          if(zeros[val].district==zeros[arr[b]].district){
            let group=zeros[val].district;
            let n1=Object.keys(zeros[val])[0];
            let n2=Object.keys(zeros[val])[1];
            deletingPairs(n1,n2,"district",group,val,arr[b])
          }
        }
      }
    })
  }
  function deletingPairs(num1,num2,group,value,zero1,zero2){
    for(let i=0; i<zeros.length; i++){
      const condition1=zeros[i][group] == value;
      const condition2=i!=zero1&&i!=zero2;
      if(condition1 && condition2){
        delete zeros[i][num1];
        delete zeros[i][num2];
      }    
    }
  }
}
