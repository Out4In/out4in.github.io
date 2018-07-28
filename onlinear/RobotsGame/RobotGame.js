//global vars.
var img1 = document.getElementById("img_1");
var img2 = document.getElementById("img_2");
var first_div = document.getElementById("first_div");
var second_div = document.getElementById("second_div");
var sound_elem = document.getElementById("sound");
var h = $(window).height() - img1.clientHeight;
var w = $(window).width() - img1.clientWidth;
var clown_prev = 0;
var robot_prev = 0;
var score = 0;
var clicked = false;
var level;


//Starting game when page loaded, and changing levels.
$(document).ready(function(){
	startGame();
	level = setInterval(startGame, 1820);
	
	setTimeout(function(){
		document.getElementById("wrap").style.display = "block";
		document.getElementById("game").style.display = "none";
	}, 60000);
});


function startGame()
{
	moveRobot('.a');
	moveRobot('.b');
}


//Moving the robot to new location and changing its image.
function moveRobot(myclass)
{
	//Randomaizing new position to the character.			
	var nh = Math.floor(Math.random() * h);
	var nw = Math.floor(Math.random() * w);
	
	//changing image.
	changeImage();
	
	//Moving image to new location.
	$(myclass).animate({ top: nh, left: nw }, 0, function(){
		setTimeout(function(){
			if(img1.style.display == "none" || img2.style.display == "none")
			{
				img1.style.display = "block";
				img2.style.display = "block";
			}
		}, 180);
	});
}


//changing characters' images without repeating the last one.
function changeImage()
{
	var clown_rand = Math.floor(Math.random() * 6) + 1;
	var robot_rand = Math.floor(Math.random() * 7) + 7;
	
	//If number repeated himself.
	/*while(clown_rand == clown_prev || robot_rand == robot_prev)
	{
		clown_rand = Math.floor(Math.random() * 6) + 1;
		robot_rand = Math.floor(Math.random() * 7) + 7;
	}*/
	
	if(clown_rand == clown_prev)
	{
		if(clown_rand != 6)
		{
			clown_rand++;
		}
		else
		{
			clown_rand = 1;
		}
	}
	
	if(robot_rand == robot_prev)
	{
		if(robot_rand != 13)
		{
			robot_rand++;
		}
		else
		{
			robot_rand = 7;
		}
	}
	clown_prev = clown_rand;
	robot_prev = robot_rand;
	
	//Now we have two numbers, and need to change sec accordingly.
	img1.src = "images/img" + clown_rand + ".png";
	img2.src = "images/img" + robot_rand + ".png";
    
    //images with big width.
    if(clown_rand == 13 || clown_rand == 12)
    {
        img1.style.width = '50px';
    }
}


//Changes to new level.
function changeLevel(level, delay)
{
	document.body.style.background = "url('images/b3.jpg')  no-repeat center center";
	document.body.style.backgroundSize= "100% 100%";
	document.getElementById("wrap").style.display = "none";
	document.getElementById("game").style.display = "block";
	
	clearInterval(level);
	
	startGame();
	var new_level = setInterval(startGame, delay);
    
    setTimeout(function(){
		alert("נגמר הזמן...\nצברת " + score + " נקודות.");
        document.getElementById("game").style.display = "none";
	}, 60000);
    
	return new_level;
}


//What happens when the clown was clicked.
img1.addEventListener("click", function(){
	$(img1).toggle("explode", "fast");
	sound_elem.src = "audio/wrong_answer.mp3";
	sound_elem.play();
	if(score > 0)
	{
		score--;
		console.log(score);
	}
});

//What happens when the robot was clicked.
img2.addEventListener("click", function(){
	$(img2).toggle("explode", "fast");
	sound_elem.src = "audio/right_answer.mp3";
	sound_elem.play();
	score++;
	console.log(score);
});