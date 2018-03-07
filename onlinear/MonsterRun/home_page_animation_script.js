var NUMBER_OF_BUTTONS = 8;
var BACKGROUND = document.createElement("img");
BACKGROUND.src = "images/background.png";


var BUTTON_1 = document.createElement("img");
BUTTON_1.src = "images/button_1.png";

var BUTTON_2 = document.createElement("img");
BUTTON_2.src = "images/button_2.png";

var BUTTON_3 = document.createElement("img");
BUTTON_3.src = "images/button_3.png";

var BUTTON_4 = document.createElement("img");
BUTTON_4.src = "images/button_4.png";

var BUTTON_5 = document.createElement("img");
BUTTON_5.src = "images/button_5.png";

var BUTTON_6 = document.createElement("img");
BUTTON_6.src = "images/button_6.png";

var BUTTON_7 = document.createElement("img");
BUTTON_7.src = "images/button_7.png";

var BUTTON_8 = document.createElement("img");
BUTTON_8.src = "images/button_8.png";

var main_page = undefined;

var canvas = document.getElementById("container");
var counter = 0
BACKGROUND.onload = function()
{
    counter++;
}

BUTTON_1.onload = function()
{
    counter++;
}

BUTTON_2.onload = function()
{
    counter++;
}

BUTTON_3.onload = function()
{
    counter++;
}

BUTTON_4.onload = function()
{
    counter++;
}

BUTTON_5.onload = function()
{
    counter++;
}

BUTTON_6.onload = function()
{
    counter++;
}

BUTTON_7.onload = function()
{
    counter++;
}

BUTTON_8.onload = function()
{
    counter++;
}


var timer_int = setInterval(CheckToStart, 150);

function CheckToStart()
{
    if(counter == 9) // 8 buttons + BACKGROUND
    {
        clearInterval(timer_int);
        main_page = new MainPage();
        main_page.Start();
        timer_int = setInterval(function(){main_page.DrawAll()},120);
    }
}

function MainPage()
{
    this._canvas = canvas;
    this._ctx = canvas.getContext("2d");
    this._buttons_array = [];
    this._scale_y = this._canvas.height / window.innerHeight;
    this._scale_x = this._canvas.width / window.innerWidth;
    this.Start = function()
    {
        this._ctx.height = window.innerHeight;
        this._ctx.width = window.innerWidth;
        this._ctx.drawImage(BACKGROUND,0,0,BACKGROUND.width,BACKGROUND.height,0,0,this._canvas.width,this._canvas.height);
        
        var top_buttons_height = this._canvas.height * 40 / 100;
        var bottom_buttons_height = this._canvas.height * 70 / 100;
        
        var width_jump = this._canvas.width * 15 / 100;
        var first_width = this._canvas.width * 25 / 100;
        
        var x_holder = first_width;
        var y_holder = top_buttons_height;
        for(var i = 0; i < NUMBER_OF_BUTTONS; i++)
        {
            this._buttons_array[i] = new MainButton(x_holder,y_holder, i + 1,this._canvas);
            if(i == 3) // need to go to the second row after that button
            {
                x_holder = first_width;
                y_holder = bottom_buttons_height;
            }
            else
            {
                x_holder += width_jump;
            }
        }
    }
    
    this.DrawAll = function()
    {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.drawImage(BACKGROUND,0,0,BACKGROUND.width,BACKGROUND.height,0,0,this._canvas.width,this._canvas.height);
        for(var i = 0; i < this._buttons_array.length; i++)
        {
                this._buttons_array[i].Draw();
        }
    }
    
    this.Clicked = function(x,y)
    {
        
        x = x * this._scale_x;
        y = y * this._scale_y;
          for(var i = 0; i < NUMBER_OF_BUTTONS; i++)
          {
            if(InRangeOfImage(this._buttons_array[i],x,y))
                {
                    this._buttons_array[i].ButtonClicked();
                    break;
                }
          }
    }
}


function InRangeOfImage(button, x, y)
{
    return ((x >= button._x && x <= button._x + BUTTON_1.width* 0.55) && (y >= button._y && y <= button._y + BUTTON_1.height * 0.55))
        
}

canvas.addEventListener("click", function(event){
    var mouseY = event.pageY;
    var mouseX = event.pageX;
    main_page.Clicked(mouseX,mouseY);
});

function MainButton(x, y ,id,canvas)
{
    this._id = id;
    this._x = x;
    this._y = y;
    this._top_y = this._y - window.innerHeight * 1 / 100;
    this._bottom_y = this._y + window.innerHeight * 1 / 100;
    this._state = "GoTop";
    this._canvas = canvas;
    this._ctx = canvas.getContext("2d");
    
    this.Draw = function()
    {
        var but = undefined;
        switch(this._id)
        {
            case 1:
            {
                but =  BUTTON_1;
                break;
            }
            case 2:
            {
                but =  BUTTON_2;
                break;
            }
            case 3:
            {
                but =  BUTTON_3;
                break;
            }
            case 4:
            {
                but =  BUTTON_4;
                break;
            }
            case 5:
            {
                but =  BUTTON_5;
                break;
            }
            case 6:
            {
                but =  BUTTON_6;
                break;
            }
            case 7:
            {
                but =  BUTTON_7;
                break;
            }
            case 8:
            {
                but =  BUTTON_8;
                break;
            }
        }
        this._ctx.drawImage(but, this._x, this._y, but.width * 0.55, but.height * 0.55);
        this.Move();
    }
    
    this.Move = function() // need to change only the y
    {
        if(this._state == "GoTop")
        {
            this._y -= 2;
        }
        else
        {
            this._y += 2;
        }
        
        if(this._y < this._top_y)
        {
            this._state = "GoBottom";
        }
        else if(this._y > this._bottom_y)
        {
            this._state = "GoTop"
        }
    }
    
    
    this.ButtonClicked = function()
    {
        switch(this._id)
        {
            case 1:
                window.open("ARPuzzle/index.html","_self");
                break;
            case 2:
                window.open("MemoryGameFolder/index.html","_self");
                break;
            case 3:
                window.open("ArcadeQuestion/index.html","_self");
                break;    
            default:
                alert("Working on that game");
                break;
        }
    }
}