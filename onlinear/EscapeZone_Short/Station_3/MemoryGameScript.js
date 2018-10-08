var IMAGES = ["Images/card1.png", "Images/card2.png","Images/card3.png","Images/card4.png","Images/card5.png","Images/card6.png","Images/card7.png","Images/card8.png","Images/card9.png","Images/card10.png","Images/card11.png","Images/card12.png","Images/card13.png","Images/card14.png","Images/card15.png","Images/card16.png","Images/card17.png","Images/card18.png","Images/card19.png","Images/card20.png"]; // TODO add more images


var counter = 0;
var flag = false;
var answer = false;

var IMG_1 = document.createElement("img");
IMG_1.src = "Images/card1.png";
IMG_1.addEventListener("load",function()
{
    counter += 1;
});

var IMG_2 = document.createElement("img");
IMG_2.src = "Images/card2.png";
IMG_2.addEventListener("load",function()
{
    counter += 1;
});


var IMG_3 = document.createElement("img");
IMG_3.src = "Images/card3.png";
IMG_3.addEventListener("load",function()
{
    counter += 1;
});


var IMG_4 = document.createElement("img");
IMG_4.src = "Images/card4.png";
IMG_4.addEventListener("load",function()
{
    counter += 1;
});


var IMG_5 = document.createElement("img");
IMG_5.src = "Images/card5.png";
IMG_5.addEventListener("load",function()
{
    counter += 1;
});


var IMG_6 = document.createElement("img");
IMG_6.src = "Images/card6.png";
IMG_6.addEventListener("load",function()
{
    counter += 1;
});


var IMG_7 = document.createElement("img");
IMG_7.src = "Images/card7.png";
IMG_7.addEventListener("load",function()
{
    counter += 1;
});


var IMG_8 = document.createElement("img");
IMG_8.src = "Images/card8.png";
IMG_8.addEventListener("load",function()
{
    counter += 1;
});


var IMG_9 = document.createElement("img");
IMG_9.src = "Images/card9.png";
IMG_9.addEventListener("load",function()
{
    counter += 1;
});


var IMG_10 = document.createElement("img");
IMG_10.src = "Images/card10.png";
IMG_10.addEventListener("load",function()
{
    counter += 1;
});



var IMG_11 = document.createElement("img");
IMG_11.src = "Images/card11.png";
IMG_11.addEventListener("load",function()
{
    counter += 1;
});

var IMG_12 = document.createElement("img");
IMG_12.src = "Images/card12.png";
IMG_12.addEventListener("load",function()
{
    counter += 1;
});

var IMG_13 = document.createElement("img");
IMG_13.src = "Images/card13.png";
IMG_13.addEventListener("load",function()
{
    counter += 1;
});

var IMG_14 = document.createElement("img");
IMG_14.src = "Images/card14.png";
IMG_14.addEventListener("load",function()
{
    counter += 1;
});

var IMG_15 = document.createElement("img");
IMG_15.src = "Images/card15.png";
IMG_15.addEventListener("load",function()
{
    counter += 1;
});

var IMG_16 = document.createElement("img");
IMG_16.src = "Images/card16.png";
IMG_16.addEventListener("load",function()
{
    counter += 1;
});

var IMG_17 = document.createElement("img");
IMG_17.src = "Images/card17.png";
IMG_17.addEventListener("load",function()
{
    counter += 1;
});

var IMG_18 = document.createElement("img");
IMG_18.src = "Images/card18.png";
IMG_18.addEventListener("load",function()
{
    counter += 1;
});

var IMG_19 = document.createElement("img");
IMG_19.src = "Images/card19.png";
IMG_19.addEventListener("load",function()
{
    counter += 1;
});

var IMG_20 = document.createElement("img");
IMG_20.src = "Images/card20.png";
IMG_20.addEventListener("load",function()
{
    counter += 1;
});




var PairSelectedImages = [];
var CorrectImages = []
var GameState = "";
var currect_level = 1;
var loaded_images;
var timer = "";
var sound_element = ""
function Init(level, need_to_print)
{
    if(sound_element == "")
    {
        sound_element = document.getElementById("sound");
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
        if (level == 4)
        {
            localStorage.setItem("for_3", "OK");
            alert("כל הכבוד סיימתם את המשימה ! \nהקוד memo768 הוסף אוטומטית למאגר (סטטוסים הקודים - בדף הבית).");
        }
        document.location.href = "http://out4in.xyz/EscapeZone_Short/Welcome/index.html";
        return;
    }
    
    if(need_to_print)
    {
        var str = "";
        if(level == 3)
        {
            str = ".כל הכבוד נשאר לך רק עוד שלב אחד";
        }
        else if(level == 2)
        {
            str = "כל הכבוד עברת שלב 1 מתוך 3."
            
            if(answer)
            {
                document.getElementById("clueDiv").style.display = "block";
                document.getElementById("clueBr").style.display = "block";   
            }
        }
        /*else
        {
            str = "כל הכבוד עברת שלב 1 מתוך 3."
        }*/
        alert(str);
    }
    
    // first level - 6 cards of a kind (12 total), second level - 12(24 total), third level - 20 (40 total).
    var number_of_images = (level * 1 == 1 ? 6 : level * 1 == 2 ? 12 : 20); 
    currect_level = level;
    var SelectedImages =  GetRandomFromArray(number_of_images,IMAGES);
    var SelectedTD = GetRandomFromArray(number_of_images * 2, document.getElementsByClassName("MemoryTableTD"));//twice the number of images, there must be 2 cards
    for(var SelectImageIndex = 0,  SelectedTdIndex = 0;SelectImageIndex < number_of_images; SelectImageIndex++, SelectedTdIndex += 2)
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
    if (counter == IMAGES.length)
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
            sound_element.src = "Audio/right_answer.mp3";
            sound_element.play();
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
            sound_element.src = "Audio/wrong_answer.mp3";
            sound_element.play();
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
    
    var w = document.documentElement.clientWidth / 7;
    var h =  document.documentElement.clientHeight / 7;
    console.log(w + " : " + h);
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
    image_1.width = w;
    image_1.height = h;
    
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
    image_2.width = w;
    image_2.height = h;
    
    
    
    back_div.appendChild(image_2);
    in_div.appendChild(image_1);
    
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

function checkClue()
{
    s = document.getElementById("resID");
    s_value = s.value;
    if(s_value.localeCompare("768") == 0)
    {
        alert("נכון, הקוד של התחנה הנו memo768\nאנא הכנס את הקוד בתיבת הטקסט החדשה.");
        Init(5, true);
    }
    else
    {
        alert("לא נכון, נסו שוב.");
        s.value = "";
    }
}