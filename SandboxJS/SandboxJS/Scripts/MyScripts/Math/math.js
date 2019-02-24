'use strict';

(function(){
   var mth = mathjs();
  
  function math(){}
  
  math.prototype = {
    add:function(x, y){ 
      x = App.ToNumber(x);
      y = App.ToNumber(y);
      
      return mth.add(mth.bignumber(x), mth.bignumber(y));
    },
    subtract:function(x,y){
       x = App.ToNumber(x);
      y = App.ToNumber(y);
      
      return mth.subtract(mth.bignumber(x), mth.bignumber(y));
    },
    divide:function(x,y){
       x = App.ToNumber(x);
       y = App.ToNumber(y);
      
      return y == 0 ? 0 : mth.divide(mth.bignumber(x), mth.bignumber(y));
    },
    multiply:function(x,y){
       x = App.ToNumber(x);
       y = App.ToNumber(y);
      
      return mth.multiply(mth.bignumber(x), mth.bignumber(y));
    },
    changeSign:function(x){
      
      x = this.toString(-App.ToNumber(x));
//       debugger;
      console.log(this);
      return x;
    },
    toString:function(x){
      return (x+"").replace('.',',');
    }
  }
  
  window.math = new math();
})();