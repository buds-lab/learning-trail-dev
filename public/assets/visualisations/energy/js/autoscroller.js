// 14 January 2019
// Author: Prageeth Jayathissa
// p.jayathissa@gmail.com


var delayedAutoscroller = function(delay=1000) {
	console.log("autoscroller run")
	setTimeout(autoscroller, delay)
}

var autoscroller = function(){


	console.log("body offset height " + document.body.offsetHeight)
	console.log("window inner height " + window.innerHeight)

	var autoscroll = setInterval(function(){ 
		window.scrollBy(0,1); 

		if ((window.innerHeight + window.scrollY +10) >= document.body.offsetHeight) {
		console.log("At bottom of page");
		window.scrollTo(0,0);


		// if (currentPathnameIndex === 6){
		// 	document.location.href = pathnames[0]
		// }
		// else{
		// 		document.location.href = pathnames[currentPathnameIndex+1]
		// }
	}
		

			}, 25);
	console.log("Autoscroller run")


return autoscroller

}