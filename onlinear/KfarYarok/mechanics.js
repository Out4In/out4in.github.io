var ALL_IMAGES = []
var DETECTED_IMAGES = []
var TD_ELEMENTS = []
var PARTS = 12;
var FirstClick = undefined;
var curr_img = 1;
var elm_doneBtn = document.querySelector("#doneBtn");
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var modal_text = modal.querySelector('p');

//modalFunctions();

for(var i = 1; i <= PARTS; i++)
{
    var tmp_img = document.createElement("img");
  
    tmp_img.src = "images/" + window.location.search.split('?')[1] + "/img" + i +".png";
    tmp_img.id = "img" + i;
    //tmp_img.width = "100%";
    tmp_img.addEventListener("click",function()
	{
        ClickedImg(this);
    });
    ALL_IMAGES.push(tmp_img);
    
    var td = document.getElementById("img" + i);
    TD_ELEMENTS.push(td);
}



function AddImageAsDetected(image_name)
{
    var s = "img" + curr_img;
    
    if(parseInt(image_name.split("img")[1]) <= PARTS)
    {
        if(s == image_name)
	{
            curr_img++;
        }
        else if(curr_img <= PARTS)
        {
            return;
        }
    }
    
    var index = 0;
    for(; index < PARTS;index++) // check if image in all images
    {
            if((image_name + ".png") == ALL_IMAGES[index].src.split("/")[ALL_IMAGES[index].src.split("/").length - 1])
            {
                break;
            }
            if(index == PARTS - 1) // last iteration
            {
                return;
            }
    }
    
    for(var i = 0; i < DETECTED_IMAGES.length; i ++) //check if image already detected
    {
        if(image_name + ".png" == DETECTED_IMAGES[i].src.split("/")[DETECTED_IMAGES[i].src.split("/").length - 1])
        {
            return;
        }
    }
    
    
    DETECTED_IMAGES.push(ALL_IMAGES[index]);            //adding the picture as new detected.
    var attach_img = false;
    while(!attach_img)
    {
	/*if(index == 0 || index == PARTS - 1)
	{
		TD_ELEMENTS[index].appendChild(ALL_IMAGES[index]);
		attach_img = true;
	}*/
	//else
	//{
        	var r_number = Math.floor(Math.random()*PARTS + 1);
        	if(!TD_ELEMENTS[r_number - 1].hasChildNodes())			//if TD is empty.
        	{
            		TD_ELEMENTS[r_number - 1].appendChild(ALL_IMAGES[index]);
            		attach_img = true;
        	}
	//}
    }   
    
}


function CheckWin()
{
    if (DETECTED_IMAGES.length == ALL_IMAGES.length)
    {
            for(var i = 0; i < DETECTED_IMAGES.length; i++)
            {
                var img = DETECTED_IMAGES[i];
                if(img.parentNode.id != ALL_IMAGES[i].id)
                {
                    return false;
                }
            }
            return true;
    }
    return false;
}

function ClickedImg(img)
{
    if(FirstClick == undefined)
    {
        
        FirstClick = img;
        img.classList.add("selected");
    }
    else // need to swap imgs
    {
        FirstClick.classList.remove("selected");
        if(img != FirstClick)
        {
            var hold_1 = FirstClick.parentNode;
            var hold_2 = img.parentNode;
            hold_1.removeChild(FirstClick);
            hold_2.removeChild(img);
            hold_1.appendChild(img);
            hold_2.appendChild(FirstClick);
            if(CheckWin())
            {
                //alert("כל הכבוד, הרכבת את הקלסטרון !\nהנה מקטע הקוד: Face134");
                var audio = new Audio('Resources/audio/right-answer.mp3');
                audio.play();
                setTimeout(function(){                          //So the player can see the entire face.
                    elm_doneBtn.style.display = "block";
                }, 1500);
                //EnterAnswer();
            }
        }
        FirstClick = undefined;
    }
}

function done()
{
    //localStorage.setItem("for_7", "OK");          //have to do this in out4in.xyz domain !!!
    alert("כל הכבוד סיימתם את המשימה ! \nהקוד face134 הוסף אוטומטית למאגר (סטטוסים הקודים - בדף הבית).");
    document.location.href = "http://out4in.xyz/EscapeZone_Long/Station_7/index.html?finish=yes";
}

/*function EnterAnswer()
{
    while(true)
    {
        var x = prompt("הכנס את קוד התחנה: ");
        x = x.toLocaleLowerCase();
        if(x.localeCompare("face134") == 0)
        {
            localStorage.setItem("for_8", "OK");
            alert("נכון, הקוד הוסף למאגר.");
            document.location.href = "../Welcome/index.html";
            return;
        }
        else
        {
            alert("לא נכון, אנא נסית שנית.");
        }   
    }
    
    alert("OUT!");
}*/

function modalFunctions()
{
    var passed_turn = false;
    
    span.onclick = function() {
        modal.style.display = "none";
        passed_turn = localStorage.getItem("passed_turn");
        
        if(passed_turn == "false" || !passed_turn)
        {
            window.location.reload(false);
        }
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            passed_turn = localStorage.getItem("passed_turn");
            
            if(passed_turn == "false" || !passed_turn)
            {
                window.location.reload(false);
            }
        }
    }
}
