var ALL_IMAGES = []
var DETECTED_IMAGES = []
var TD_ELEMENTS = []
var PARTS = 8
var FirstClick = undefined;


for(var i = 1; i <= PARTS; i++)
{
    var tmp_img = document.createElement("img");
    tmp_img.src = "images/img_" + i  +".png";
    tmp_img.addEventListener("click",function()
                            {
        ClickedImg(this);
    })
    ALL_IMAGES.push(tmp_img)
    
    var td = document.getElementById("img" + i);
    TD_ELEMENTS.push(td);
}



function AddImageAsDetected(image_name)
{
    debugger;
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
    
    
    DETECTED_IMAGES.push(ALL_IMAGES[index]);
    var attach_img = false;
    while(!attach_img)
    {
        var r_number = Math.floor(Math.random()*8 + 1);
        if(!TD_ELEMENTS[r_number - 1].hasChildNodes())
        {
            TD_ELEMENTS[r_number - 1].appendChild(ALL_IMAGES[index]);
            attach_img = true;
        }
    }   
    
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
        }
        FirstClick = undefined;
    }
}

function MoveToPuzzle()
{
    var elm = document.getElementById('camera_holder');
    elm.style.visibility = "hidden";
    elm.style.display = "none";
    elm = document.getElementById("puzzle_holder");
    elm.style.visibility = "visible";
    elm.style.display = "block";
}

function MoveToCamera()
{
    var elm = document.getElementById('puzzle_holder');
    elm.style.visibility = "hidden";
    elm.style.display = "none";
    elm = document.getElementById("camera_holder");
    elm.style.visibility = "visible";
    elm.style.display = "block";
}