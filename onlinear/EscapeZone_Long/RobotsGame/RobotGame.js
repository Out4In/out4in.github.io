/*
    HEY !
    sorry for the mess.
    This is the javascript page for the robots game.
    the game contains 4 characters: 1 robot.
                                    1 clown.
                                    2 spaceships.
    When clicking a robot you get 1 point,
    when clicking a clown you lose 1 point,
    and when clicking a spaceship you get 2 points.
    
    You may find in this game some useless code, and you should
    play with it and possibly delete it.
*/


//global vars.
var img1 = document.getElementById("img_1");
var img2 = document.getElementById("img_2");
var img3 = document.getElementById("img_3");
var img4 = document.getElementById("img_4");
var first_div = document.getElementById("first_div");
var second_div = document.getElementById("second_div");
var sound_elem = document.getElementById("sound");
var score_elem = document.getElementById("score_text");
var score_image = document.getElementById("score_img");
var gh = $(window).height();
var gw = $(window).width();
var h = $(window).height() - img1.clientHeight;
var w = $(window).width() - img1.clientWidth;
var clown_prev = 0;
var robot_prev = 0;
var score = 0;
var clicked = false;
var level;
var spaceship;
var new_level;
var time_left = 60;
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);      //finding os
var ship_stay_time = 1600;
var ship_wait_time = 4500;
var ship_right_interval;
var ship_up_interval;
var ship_stop_after = 4;

localStorage.setItem("finishedRobots", false);

if(iOS)
{
    //between levels text size.
    document.getElementById("firstWrapDiv").style.fontSize = "22px";
    document.getElementById("secondWrapDiv").style.fontSize = "22px";
    document.getElementById("thirdWrapDiv").style.fontSize = "22px";
    
    //between levels button's text size.
    document.getElementById("firstWrapBut").style.fontSize = "22px";
    document.getElementById("secondWrapBut").style.fontSize = "22px";
    document.getElementById("thirdWrapBut").style.fontSize = "22px";
    
    //between levels button's width and height.
    /*document.getElementById("firstWrapBut").style.height = "40%;"
    document.getElementById("firstWrapBut").style.width = "55%";
    document.getElementById("secondWrapBut").style.height = "40%;"
    document.getElementById("secondWrapBut").style.width = "55%";
    document.getElementById("thirdWrapBut").style.height = "40%;"
    document.getElementById("thirdWrapBut").style.width = "55%";*/
    
    //score image width and height.
    document.getElementById("score_img").style.width = "7%";
    document.getElementById("score_img").style.height = "12%";
    
    //score text top left and text size.
    document.getElementById("score_text").style.fontSize = "22px";
    document.getElementById("score_text").style.top = "2.5%";
    document.getElementById("score_text").style.left = "4%";
}


//Starting game when page loaded, and changing levels.
$(document).ready(function(){
	startGame();
	level = setInterval(startGame, 1500);
    
    moveShipRight("third_div");
    moveShipUp("forth_div");
    
    createBackgroundEvents();
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
	var nh = Math.floor(Math.random() * (h - 50));
	var nw = Math.floor(Math.random() * (w - 50));
	
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
    
    
    //some images are too fat or too tall.
    if(clown_rand == 2 || clown_rand == 5)
    {
        img1.style.width = "70%";
    }
    else
    {
        img1.style.width = "100%";
    }
    
    if(robot_rand == 12)
    {
        img2.style.width = "70%";
    }
    else if(robot_rand == 10 || robot_rand == 13)
    {
        img2.style.width = "80%";
    }
    else
    {
        img2.style.width = "100%";
    }
}


//Changes to new level.
function changeLevel(curr_level, delay, ship_move, ship_hold, ship_stop_amount)
{
    
    //resets the spaceships to new level difficulty.
    clearInterval(ship_right_interval);
    clearInterval(ship_up_interval);
    ship_stay_time = ship_hold;             //Amount of time the ship stays on screen when not moving (clickable).
    ship_wait_time = ship_move;             //Amount of time the ship has to wait before she starts a new run.
    ship_stop_after = ship_stop_amount;     //After how many times does the ship stop.
    moveShipRight("third_div");
    moveShipUp("forth_div");
    
    
    //resets the robot and clown to new level difficulty.
	if (delay == 1100)
	{
		document.body.style.background = "url('images/b3.jpg')  no-repeat center center";
		document.body.style.backgroundSize= "100% 100%";
		document.getElementById("firstWrap").style.display = "none";
		document.getElementById("game").style.display = "block";
		
		clearInterval(curr_level);
		
		startGame();
		new_level = setInterval(startGame, delay);
		
		setTimeout(function(){
			//alert("נגמר הזמן...\nצברת " + score + " נקודות.");
			document.getElementById("game").style.display = "none";
			document.getElementById("secondWrap").style.display = "block";
		}, 35000);
	}
	else if(delay == 1000)
	{
		document.body.style.background = "url('images/b2.png')  no-repeat center center";
		document.body.style.backgroundSize= "100% 100%";
		document.getElementById("secondWrap").style.display = "none";
		document.getElementById("game").style.display = "block";
		
		clearInterval(curr_level);
		
		startGame();
		new_level = setInterval(startGame, delay);
		
		setTimeout(function(){
			document.getElementById("game").style.display = "none";
			document.getElementById("thirdWrap").style.display = "block";
		}, 40000);
	}
    else if(delay == 900)
    {
        var s = "";
        document.body.style.background = "url('images/b4.png')  no-repeat center center";
		document.body.style.backgroundSize= "100% 100%";
		document.getElementById("thirdWrap").style.display = "none";
		document.getElementById("game").style.display = "block";
		
		clearInterval(curr_level);
		
		startGame();
		new_level = setInterval(startGame, delay);
		
		setTimeout(function(){
            document.getElementById("game").style.display = "none";
            if(score >= 50)
            {
                s = "כל הכבוד, השגת " + score + " נקודות !<br/>המספר המשותף הוא 15.";    
            }
            else
            {
                s = "מצטערים, לא הצלחתם להגיע ל 50 נקודות. נסו שוב.";
            }
            
            localStorage.setItem("finishedRobots", true);
            modal_text.innerHTML = s;
            document.getElementById("phone_img").style.display = "none";
            modal.style.display = "block";
		}, 40000);
    }
}


function createBackgroundEvents()
{
    setTimeout(function(){
        freakyBackground("url('images/b1.jpg')");
    }, 10000);
    
    setTimeout(function(){
        freakyBackground("url('images/b1.jpg')");
    }, 22000);
    
    setTimeout(function(){
        freakyBackground("url('images/b3.jpg') no-repeat center center");
    }, 42000);
    
    setTimeout(function(){
        freakyBackground("url('images/b3.jpg') no-repeat center center");
    }, 60000);
    
    setTimeout(function(){
        freakyBackground("url('images/b2.png') no-repeat center center");
    }, 75000);
    
    setTimeout(function(){
        freakyBackground("url('images/b2.png') no-repeat center center");
    }, 95000);
    
    setTimeout(function(){
        freakyBackground("url('images/b4.png') no-repeat center center");
    }, 122000);
    
    setTimeout(function(){
        freakyBackground("url('images/b4.png') no-repeat center center");
    }, 135000);
    
	setTimeout(function(){
		document.getElementById("firstWrap").style.display = "block";
		document.getElementById("game").style.display = "none";
	}, 30000);
}


/*
----------------------------------
    FIRST SHIP, GOING RIGHT !
----------------------------------    
*/
function moveShipRight(id)
{
    var elm = document.getElementById(id);
    var rand;
    var newRand;
    var counter = 0;
    var nh ;
    var nw;
    
    ship_right_interval = setInterval(function(){
        if(counter != 0 && counter % ship_stop_after == 0)
        {            
            //Randomaizing new position to the character.			
            nh = Math.floor(Math.random() * h);
            nw = Math.floor(Math.random() * w);
            
            img3.style.display = "block";
            elm.style.display = "block";
            
            //Moving image to new location.
            $(elm).animate({ top: nh, left: nw }, 0, function(){
                counter++;
                
                setTimeout(function(){                                              //dissapearing after amount of time.
                    img3.style.display = "none";
                }, ship_stay_time);
            });
        }
        else
        {
            rand = Math.floor(Math.random() * (gh - 80)) + 80;
            newRand = Math.floor(Math.random() * (gh - 80)) + 80;
            img3.style.display = "none";
            
            $(elm).animate({ top: rand, left: 0 }, 0, function(){              //moving to starting position.
                img3.style.display = "block";
                
                $(elm).animate({ top: newRand, left: gw}, 800, function(){       //moving to new position.
                    img3.style.display = "none";
                    counter++;
                });
            });
        }
    }, ship_wait_time - 1000);
}


/*
----------------------------------
    SECOND SHIP, GOING UP !
----------------------------------
*/
function moveShipUp(id)
{
    var elm = document.getElementById(id);
    var rand;
    var newRand;
    var counter = 0;
    var nh ;
    var nw;
    
    ship_up_interval = setInterval(function(){
        if(counter != 0 && counter % ship_stop_after == 0)
        {
            //Randomaizing new position to the character.			
            nh = Math.floor(Math.random() * h);
            nw = Math.floor(Math.random() * w);
            
            img4.style.display = "block";
            elm.style.display = "block";
            
            //Moving image to new location.
            $(elm).animate({ top: nh, left: nw }, 0, function(){
                counter++;
                
                setTimeout(function(){                                              //dissapearing after amount of time.
                    img4.style.display = "none";
                }, ship_stay_time);
            });
        }
        else
        {
            rand = Math.floor(Math.random() * gw);
            newRand = Math.floor(Math.random() * gw);
            img4.style.display = "none";
            
            $(elm).animate({ top: gh, left: rand }, 0, function(){              //moving to starting position.
                img4.style.display = "block";
                
                $(elm).animate({ top: 0, left: newRand}, 800, function(){       //moving to new position.
                    img4.style.display = "none";
                    counter++;
                });
            });
        }
    }, ship_wait_time);
}


function freakyBackground(back)
{
    var a;
    var b;
    var c;
    document.body.style.backgroundImage = "none";
    
    y = setInterval(function(){
        a = Math.floor(Math.random() * 255);
        b = Math.floor(Math.random() * 255);
        c = Math.floor(Math.random() * 255);
        document.body.style.backgroundColor='rgb(' + a + ',' + b + ',' + c + ')';   
    }, 100);
    
    setTimeout(function(){
        clearInterval(y);
        console.log(back.indexOf("b1"));
        if(back.indexOf("b1") != -1)
        {
            document.body.style.backgroundImage = back;   
        }
        else
        {
            document.body.style.background = back;
            document.body.style.backgroundSize= "100% 100%";
        }
    }, 2000);
}


//What happens when the clown is clicked.
img1.addEventListener("click", function(){
	$(img1).toggle("explode", "fast");
	sound_elem.src = "Audio/wrong.mp3";
	sound_elem.play();
    if(score > 0)
	{
        if(iOS)
        {
            if(score >= 100)
            {
                score_image.style.width = "9%";
            }
            else if(score >= 10)
            {
                score_image.style.width = "8%";
            }
            else
            {
                score_image.style.width = "7%";
            }
        }
        else
        {
            if(score >= 100)
            {
                score_image.style.width = "7.5%";
            }
            else if(score >= 10)
            {
                score_image.style.width = "6.5%";
            }
            else
            {
                score_image.style.width = "5.5%";
            }
        }
        score--;
        score_elem.innerHTML = score;
	}
});

//What happens when the robot is clicked.
img2.addEventListener("click", function(){
	$(img2).toggle("explode", "fast");
	sound_elem.src = "Audio/right.mp3";
	sound_elem.play();
	score++;
	console.log(score);
    if(iOS)
    {
        if(score >= 100)
        {
            score_image.style.width = "9%";
        }
        else if(score >= 10)
        {
            score_image.style.width = "8%";
        }
        else
        {
            score_image.style.width = "7%";
        }
    }
    else
    {
        if(score >= 100)
        {
            score_image.style.width = "7.5%";
        }
        else if(score >= 10)
        {
            score_image.style.width = "6.5%";
        }
        else
        {
            score_image.style.width = "5.5%";
        }
    }
    score_elem.innerHTML = score;
});

//What happens when ship1 is clicked.
img3.addEventListener("click", function(){
	$(img3).toggle("explode", "fast");
	sound_elem.src = "Audio/spaceship.mp3";
	sound_elem.play();
	score += 2;
	console.log(score);
    if(iOS)
    {
        if(score >= 100)
        {
            score_image.style.width = "9%";
        }
        else if(score >= 10)
        {
            score_image.style.width = "8%";
        }
        else
        {
            score_image.style.width = "7%";
        }
    }
    else
    {
        if(score >= 100)
        {
            score_image.style.width = "7.5%";
        }
        else if(score >= 10)
        {
            score_image.style.width = "6.5%";
        }
        else
        {
            score_image.style.width = "5.5%";
        }
    }
    score_elem.innerHTML = score;
});


//What happens when ship2 is clicked.
img4.addEventListener("click", function(){
	$(img4).toggle("explode", "fast");
	sound_elem.src = "Audio/spaceship.mp3";
	sound_elem.play();
	score += 2;
	console.log(score);
    if(iOS)
    {
        if(score >= 100)
        {
            score_image.style.width = "9%";
        }
        else if(score >= 10)
        {
            score_image.style.width = "8%";
        }
        else
        {
            score_image.style.width = "7%";
        }
    }
    else
    {
        if(score >= 100)
        {
            score_image.style.width = "7.5%";
        }
        else if(score >= 10)
        {
            score_image.style.width = "6.5%";
        }
        else
        {
            score_image.style.width = "5.5%";
        }
    }
    score_elem.innerHTML = score;
});