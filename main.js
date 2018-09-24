
function throttle(f, ms){
  var run = false;
  var mThis;
  var myArguments; 
return function wrapper(){ // deco for all logik
  if(run){ // logik if run === true
    mThis = this;// save this and args of func that works now 
    myArguments = arguments;
    return; // and throw func if it in 1000 area
  } 
  f.apply(this, arguments); // call func 
  run = true;// and change flag
  setTimeout(function(){
    run = false;// and going to false 
    if(myArguments){
      wrapper.apply(mThis, myArguments);
      mThis = null; // -> for every func we need to have it's own this and args
      myArguments = null;// so we just zero that value        
    }
  }, ms)
}
}


var f = function(a) {
console.log(a)
};

// затормозить функцию до одного раза в 1000 мс
var f1000 = throttle(f, 1000);

f1000(1); // выведет 1
f1000(2); // (тормозим, не прошло 1000 мс)
f1000(3); // (тормозим, не прошло 1000 мс)

setTimeout(function(){f1000(4), 1100});
setTimeout(function(){f1000(5), 1200});