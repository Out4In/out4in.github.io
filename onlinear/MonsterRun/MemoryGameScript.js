var IMAGES = ["Images/MemoryGame_1.jpg", "Images/MemoryGame_2.jpg","Images/MemoryGame_3.jpg","Images/MemoryGame_4.jpg","Images/MemoryGame_5.jpg","Images/MemoryGame_6.jpg"]; // TODO add more images
var PairSelectedImages = [];
var CorrectImages = []
var GameState = "";
var currect_level = 1;
var loaded_images;
var timer = "";

function Init(level, need_to_print)
{
    if(need_to_print)
        {
            alert("כל הכבוד עברת לשלב הבא!");
        }
    //Setting up the images.
    ClearTable("MemoryPicture");
    ClearTable("front_card");
    ClearTable("back_card");
    ClearTable("flipper");
    ClearTable("flip-container");
    loaded_images = 0;
    if(level > 3)
    {
        alert("כל הכבוד!!! ניצחת את המפלצת");
    }
    var number_of_images = (level * 1 == 1 ? 2 : level * 1 == 2 ? 4 : 6); // number of images per level go from 2 - 6 with jumps of 2.
    currect_level = level;
    var SelectedImages =  GetRandomFromArray(number_of_images,IMAGES);
    var SelectedTD = GetRandomFromArray(number_of_images * 2, document.getElementsByClassName("MemoryTableTD"));//twice the number of images, there must be 2 cards
    for(var SelectImageIndex = 0,  SelectedTdIndex = 0; SelectImageIndex < number_of_images; SelectImageIndex++, SelectedTdIndex += 2)
    {
        var image = SelectedImages[SelectImageIndex];
        var td_1 = SelectedTD[SelectedTdIndex];
        var td_2 = SelectedTD[SelectedTdIndex + 1];
        
        var div1 = CreateFlipDiv(image);
        var div2 = CreateFlipDiv(image);
        td_1.appendChild(div1);
        td_2.appendChild(div2);
    }
    
    //Init the arrays.
    PairSelectedImages = [];
    CorrectImages = [];
    GameState = "ShowFirst";
    
    timer = setInterval(LoadStart, 200);
}

function LoadStart()
{
    if (loaded_images == currect_level * 4)
    {
        
        clearInterval(timer);
        timer = NaN;
        ToggleAll();
        
        setTimeout(StartGame,1500);
    }
}


//Toggle all containers
function ToggleAll()
{
    var l = document.getElementsByClassName("flip-container");
    for(var i = 0; i < l.length; i ++)
    {
        l[i].classList.toggle("active");
    }
}
// start the game within time out of 1 sec, need to flip all the cards to the back side.
function StartGame()
{
    GameState = "Playing"
    ToggleAll();
    
}

//ClearTable from all elements.
function ClearTable(class_name)
{
    var params = document.getElementsByClassName(class_name);
    while(params[0])
    {
        params[0].parentNode.removeChild(params[0]);
    }
}

// function takes as param number of elements and return number_wanted random images from from_arr array
function GetRandomFromArray(number_wanted, from_arr)
{
    var arr = [];
    var i = 0;
    while(i != number_wanted)
    {
        var selected = from_arr[Math.floor(random() * from_arr.length)];
        var in_array = false;
        for(var k = 0; k < arr.length; k++)
        {
            if(arr[k] == selected)
            {
                in_array = true;
                break;
            }
        }
        if(!in_array)
        {
            arr.push(selected);
            i++;
        }
    }
    return arr;
}

//call back when calling from function
function OnClickOnImages(flip_container)
{
    if(GameState == "ShowFirst") // if in state of first showing the user the cards, we dont want them to flip them.
    {
        return;
    }
    
    for(var i = 0; i < PairSelectedImages.length; i++)
    {
        if(PairSelectedImages[i] == flip_container)
        {
            return;
        }
    }
    
    for(var k = 0; k < CorrectImages.length; k++)
    {
        if(flip_container == CorrectImages[k])
        {
            return;
        }
    }
    
    flip_container.classList.toggle("active");
    PairSelectedImages.push(flip_container);
    if(PairSelectedImages.length == 2) // 2 images clicked
    {
        if(PairSelectedImages[0].querySelector("img[name='MemoryImg']").src == PairSelectedImages[1].querySelector("img[name='MemoryImg']").src)
        {
            CorrectImages.push(PairSelectedImages[0]);
            CorrectImages.push(PairSelectedImages[1]);
            if(CorrectImages.length == document.getElementsByClassName("flip-container").length) // all correct
            {
                
                
                setTimeout(function(){Init(currect_level + 1,true);}, 1000);
                return;
            }
            
        }
        else
        {
            var holder_1 = PairSelectedImages[0];
            var holder_2 = PairSelectedImages[1];
            window.setTimeout(function() { FlipImage(holder_1);},1000);
            window.setTimeout(function() { FlipImage(holder_2);},1000);
        }
        PairSelectedImages = [];
    }
}   

//flip image function for timeout callback
function FlipImage(container)
{
    container.classList.toggle("active");
}

//Create the flip div for the card effect

function CreateFlipDiv(front_img)
{
    
    var first_div = document.createElement("div");
    first_div.onclick = function() {OnClickOnImages(first_div);};
    first_div.className = "flip-container";
    var flipper_div = document.createElement("div");
    flipper_div.className = "flipper";
    first_div.appendChild(flipper_div);
    
    var in_div = document.createElement("div");
    in_div.className = "front_card";
    
    var image_1 = document.createElement("img");
    image_1.src = "Images/BackCard.png";
    image_1.className = "MemoryPicture";
    in_div.appendChild(image_1);
    
    var back_div = document.createElement("div");
    back_div.className = "back_card";
    
    var image_2 = document.createElement("img");
    image_2.className = "MemoryPicture";
    image_2.src = front_img;
    image_2.addEventListener("load", function()
                            {
        loaded_images++;
    })
    image_2.setAttribute("name","MemoryImg")
    back_div.appendChild(image_2);
    
    flipper_div.appendChild(in_div);
    flipper_div.appendChild(back_div);
    
    return first_div;
}
//real fucking random
var seed = Math.random();
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}