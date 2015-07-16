function getRandomColor(){
	// if you split with no space ('') it splits between the letters
	// if you split with a space within it (' ') it splits btwn every space
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}




var clickedTime; var createdTime; var reactionTime;

function makeBox() {

	var time = Math.random();
	time *= 5000;



	setTimeout(function() {

		// Make our box into a circle with borderRadius
		if (Math.random() > 0.5){
			document.getElementById("box").style.borderRadius = "100px";
		} else {
			document.getElementById("box").style.borderRadius = "0";
		}


		// Randomizing the positioning of our div
		var top = Math.random();
		top *= 300;

		var left = Math.random();
		left *= 500;

		document.getElementById("box").style.top = top + "px";
		document.getElementById("box").style.left = left + "px";


		// this links back to the getRandomColor function
		document.getElementById("box").style.backgroundColor = getRandomColor();

		document.getElementById("box").style.visibility = "visible";

			createdTime = Date.now();

	}, time); //<= 3000 miliseconds, which equal 3 seconds

}



document.getElementById("box").onclick = function(){
	clickedTime = Date.now();
	reactionTime = (clickedTime - createdTime) / 1000;

	document.getElementById("time").innerHTML = reactionTime;

	// document.getElementById("box").style.visibility = "hidden";
	// or "this". "this" refers to the document.getElement....etc.
	this.style.visibility = "hidden";

	makeBox();
}

makeBox();
