var mrkrs = document.querySelectorAll("a-marker");

var elm_doneBtn = document.querySelector("#doneBtn");
var elm_correctAnswerImg = document.querySelector("#correct-answer-img");

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var modal_text = modal.querySelector('p');

var objs = [];
for (var i = 0, len = 4; i < len; i++)      //CHANGED TO FOUR.
{
    objs[i] = mrkrs[i].object3D;
}


var CORRECT_ORDER = [    
    [4, 2, 1, 3],           //london
    [2, 1, 4, 3],           //vegas
    [1, 3, 4, 2],           //madrid
    [3, 1, 2, 4]            //rome
    
];


var finishedPuzzles = [];
var len = CORRECT_ORDER.length;

for (var i = 0; i < len; i++)
{
    finishedPuzzles.push(false);
}

setTimeout(function(){
    OfferHint();
}, 240000);

modalFunctions();

var loop = setInterval(loopFunc, 100);

var dir;
var firstTimeInvisible = true;
var london = false;
var vegas = false;
var madrid = false;
var rome = false;

function loopFunc()
{
    if (allVisible(objs))
    {
        firstTimeInvisible = true;
        
        dir = getDirectionIfSame(objs);
        console.log(dir);
        
        if (dir !== false)
        {
            var order = getIndexOrderByXPos(objs);
            console.log(order);
            i = compareArrays(order, CORRECT_ORDER);


            if (i != -1)
            {
                if(i == 0 && dir == 0 && !london)              //london
                {
                    modal_text.innerHTML = "מצאת את העיר לונדון, בריטניה !";
                    modal.style.display = "block";
                    //alert("מצאת את העיר לונדון, בריטניה !");
                    london = true;
                }
                else if(i == 1 && dir == 1 && !vegas)         //vegas
                {
                    modal_text.innerHTML = "מצאת את העיר וגאס, נבדה !";
                    modal.style.display = "block";
                    //alert("מצאת את העיר וגאס, נבדה !");
                    vegas = true;
                }
                else if(i == 2 && dir == 2 && !madrid)         //madrid
                {
                    modal_text.innerHTML = "מצאת את העיר מדריד, ספרד !";
                    modal.style.display = "block";
                    //alert("מצאת את העיר מדריד, ספרד !");
                    madrid = true;
                }
                else if(i == 3 && dir == 3 && !rome)         //rome
                {
                    modal_text.innerHTML = "מצאת את העיר רומא, איטליה !";
                    modal.style.display = "block";
                    //alert("מצאת את העיר רומא, איטליה !");
                    rome = true;
                }
                
                if (finishedPuzzles[i] == false)
                {
                    finishedPuzzles[i] = true;
					checkIfFinished();
                }
            }
        }
    }
    else if (firstTimeInvisible)
    {
        console.log("NOT ALL MARKERS VISIBLE");
        firstTimeInvisible = false;
    }
}

function allVisible(arr)
{
    for (var i = 0, len = arr.length; i < len; i++)
    {
        if (!arr[i].visible)
        {
            return false;
        }
    }
    return true;
}

function compareArrays(arr1, arr2)
{
    for(var i = 0; i < arr2.length; i++)
	{
		var semi_arr = arr2[i];
		
		if(arr1.length == semi_arr.length)
		{
			var counter = 0;
			for (var k = 0, len = arr1.length; k < len; k++)
			{
				if (arr1[k] == semi_arr[k])
				{
					counter += 1;
				}
			}  
			if(counter == arr1.length)
			{
				return i;
				
			}
		}
	}
    return -1;
}

function getDirectionIfSame(arr)
{
    var dir = getGeneralDirection(arr[0].rotation);
    
    for (var i = 1, len = arr.length; i < len; i++)
    {
        var g = getGeneralDirection(arr[i].rotation)
        if (g != dir)
        {
            dir = -1;
            break;
        }
    }
    
    return (dir == -1 ? false : dir);
}

function getIndexOrderByXPos(arr)
{
    var len = arr.length;
    
    var order = [];
    
    var indexes = [];
    for (var i = 0; i < len; i++)
    {
        indexes.push(i);
    }
    
    var index;
    for (var i = 0; i < len; i++)
    {
        index = getMinXPosIndex(arr, indexes);
        order.push(index + 1);
        remove(indexes, index);
    }
    
    return order;
}

function remove(array, element) 
{
    var index = array.indexOf(element);
    array.splice(index, 1);
}

function getMinXPosIndex(arr, indexes)
{
    var minVal = arr[indexes[0]].position.x;
    var minIndex = indexes[0];
    var index, val;
    for (var i = 1, len = indexes.length; i < len; i++)			//Possible error !!!
    {
        index = indexes[i];
        val = arr[index].position.x;
        if (minVal > val)
        {
            minVal = val;
            minIndex = index;
        }
    }
    return minIndex;
}

function radiansToDegrees(rad)
{
    var deg = (rad / Math.PI) * 180;
    //alert("Rad: " + rad + ", deg: " + deg);
	return deg;
}

function getGeneralDirection(rot)
{
    var y = radiansToDegrees(rot._y);
    var range = (45 / 360);
    
    var degs = [0, 90, 180,-90];
    
    var dir = -1;
    for (var i = 0, len = degs.length; i < len; i++)
    {
        
        if (inDegRange(degs[i], range, y))
        {
            dir = i;
            
            break;
        }
    }
    
    return dir;
}

function inDegRange(threshold, range, val)
{
    var min = threshold - range * 360;
    var max = threshold + range * 360;
    
    var overTheEdge = false;
    if (min < -180)
    {
        min = 360 + min;
        overTheEdge = true;
    }
    
    if (max > 180)
    {
        max = max - 360;
        overTheEdge = true;
    }
    
    var minOk = (val > min);
    var maxOk = (val < max);
    
    if (overTheEdge)
    {
        return (minOk || maxOk);
    }
    else
    {
        return (minOk && maxOk);
    }
}

function checkIfFinished()
{
    if (isAllPuzzlesFinished())
    {
        //alert("כל הכבוד השלמתם את כל הפאזלים !\nהקוד הוא: puzz576");
        var audio = new Audio('resources/audio/right-answer.mp3');
        audio.play();
        elm_doneBtn.style.display = "block";
    }
}

function done()
{
    //localStorage.setItem("for_5", "OK");          //have to do this in out4in.xyz domain !!!
    alert("כל הכבוד סיימתם את המשימה ! \nהקוד puzz576 הוסף אוטומטית למאגר (סטטוסים הקודים - בדף הבית).");
    document.location.href = "http://out4in.xyz/EscapeZone_Long/Station_5/index.html?finish=yes";
}


function isAllPuzzlesFinished()
{
    var len = finishedPuzzles.length;
    var flag = true;
    for (var i = 0; i < len; i++)
    {
        if (finishedPuzzles[i] == false)
        {
            flag = false;
            break;
        }
    }
    
    return flag;
}

function autoFinishPuzzles()
{
    finishedPuzzles = [true,true,true, true];
    checkIfFinished();
}

function OfferHint()
{
    var answer = confirm("ראינו שאתם מתקשים, האם אתם רוצים עזרה?");
    if(answer)
    {
		alert("בתוך העיר הזו נמצאת המדינה הקטנה בעולם, מהי העיר?");
    }
    else
    {
        setTimeout(OfferHint, 60000);
    }
}

function modalFunctions()
{
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}