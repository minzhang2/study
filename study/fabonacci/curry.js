// 1,1,2,3,5,8,13,21,34,55,89

function sum() {
	let first = 1,
			last = 0,
			temp;
	
	return function fn() {
  	last = 1;
    for(let i = 0; i < 12; i++) {
    	console.log(first)
    	temp = last;
    	first = last;
  		last = temp + first;
    }
  }
}