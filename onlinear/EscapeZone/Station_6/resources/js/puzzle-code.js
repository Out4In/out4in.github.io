var mrkrs = document.querySelectorAll("a-marker");

var elm_doneBtn = document.querySelector("#doneBtn");
var elm_correctAnswerImg = document.querySelector("#correct-answer-img");

var objs = [];
for (var i = 0, len = 4; i < len; i++)      //CHANGED TO FOUR.
{
    objs[i] = mrkrs[i].object3D;
}

var CORRECT_ORDER = [    
    [2, 3, 4, 1],           //london
    [1, 2, 3, 4],           //vegas
    [4, 1, 2, 3],           //madrid
    [3, 4, 1, 2]            //rome                    
    
];


var finishedPuzzles = [];
for (var i = 0, len = CORRECT_ORDER.length; i < len; i++)
{
    finishedPuzzles.push(false);
}

setTimeout(function(){
    OfferHint();
}, 240000);
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
        
        // צריך כאן להאט איכשהו את כמות הפעמים שהוא אומר שהוא מצא.
        if (dir !== false)
        {
            var order = getIndexOrderByXPos(objs);
            console.log(order);
            i = compareArrays(order, CORRECT_ORDER);


            if (i != -1)
            {
                if(i == 0 && dir == 0 && !london)              //london
                {
                    alert("מצאת את העיר לונדון, בריטניה !\n חלק מן הקוד: 8");
                    london = true;
                }
                else if(i == 1 && dir == 1 && !vegas)         //vegas
                {
                    alert("מצאת את העיר וגאס, נבדה. !\n חלק מן הקוד: 8");
                    vegas = true;
                }
                else if(i == 2 && dir == 2 && !madrid)         //madrid
                {
                    alert(" מצאת את העיר מדריד, ספרד. !\n חלק מן הקוד: puzz");
                    madrid = true;
                }
                else if(i == 3 && dir == 3 && !rome)         //rome
                {
                    alert("מצאת את העיר רומא, איטליה. !\n חלק מן הקוד: 8");
                    rome = true;
                }
                
                if (!finishedPuzzles[i])
                {
                    finishedPuzzles[i] = true;
					//alert("כל הכבוד! השלמתם את הפאזל בהצלחה!");
					checkIfFinished();
                    /*setTimeout(function() {
                        //alert("כל הכבוד! השלמתם את פאזל " + (dir + 1) + " בהצלחה!");
                        alert("כל הכבוד! השלמתם את הפאזל בהצלחה!");
                        checkIfFinished();
                    }, 8000);*/
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
        alert("כל הכבוד השלמתם את כל הפאזלים !");
        document.location.href = "index.html?finish=yes"
    }
}

function isAllPuzzlesFinished()
{
    for (var i = 0, len = finishedPuzzles.length; i < len; i++)
    {
        if (!finishedPuzzles[i])
        {
            return false;
        }
    }
    
    return true;
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
        setTimeout(function(){          //To remove image before alert.
            alert("בתוך העיר הזו נמצאת המדינה הקטנה בעולם מהי העיר:  (רומא) ");
        }, 250);
    }
    else
    {
        setTimeout(OfferHint, 120000);
    }
}