var CONTROLLERS = [];
var PASSWORD_CONTROLLERS = [];
var PASSWORDELM = undefined;
var WINELM = undefined;
var USERNAMEDIV = undefined;
var ANSWER = "יעקבלוי";
var PASSWORD_DIV = undefined;
function Init()
{
    CONTROLLERS = [document.getElementById("txt_user_name_1_letter"),document.getElementById("txt_user_name_2_letter"),document.getElementById("txt_user_name_3_letter"),document.getElementById("txt_user_name_4_letter"),document.getElementById("txt_user_name_5_letter"),document.getElementById("txt_user_name_6_letter"),document.getElementById("txt_user_name_7_letter")]
    
    
    PASSWORD_CONTROLLERS = [document.getElementById("txt_password_1_letter"),document.getElementById("txt_password_2_letter"),document.getElementById("txt_password_3_letter"),document.getElementById("txt_password_4_letter"),document.getElementById("txt_password_5_letter"),document.getElementById("txt_password_6_letter"),document.getElementById("txt_password_7_letter")]
    for(var i = 0; i < CONTROLLERS.length; i++)
    {
        var controller = CONTROLLERS[i];
        
        controller.addEventListener("input", function(event)
        {
            var this_id = this.id.split("_")[3]*1;
            
            if(this_id == 3 || this.id == 6) // the constant
            {
                this.value = this.value.substr(0, this.value.length - 1);        
                Check();
                var next_id = this_id + 1;
                if(next_id <=7)
                {
                    CONTROLLERS[next_id - 1].focus()
                }
                return;
            }
            
            this.value = event.data;
            var next_id = this_id + 1;
            if(next_id <=7)
            {
                CONTROLLERS[next_id - 1].focus()
            }
            if(Check())
                {
                    document.getElementById("password_input").style.visibility = "visible";
                }
        });
        
        
        var password_controller = PASSWORD_CONTROLLERS[i];
        
        password_controller.addEventListener("input",function(event)
        {
            var this_id = this.id.split("_")[2]*1 - 1;     
            if(isNaN(event.data))
            {
                this.value = this.value.substr(0,this.value.length - 1);
                return;
            }
            this.value = event.data;
            if(this_id + 1 < 7)
            {
                PASSWORD_CONTROLLERS[this_id + 1].focus();
            }
            
            
            if(CheckPassword())
            {
                USERNAMEDIV.style.visibility = "hidden";
                USERNAMEDIV.style.display = "none";

                PASSWORD_DIV.style.visibility  ="hidden";
                PASSWORD_DIV.style.display = "none";

                WINELM.style.visibility = "visible"
                PlayWin();
            }
        });
    }
    USERNAMEDIV = document.getElementById("wrapper");
    WINELM = document.getElementById("win");
    PASSWORD_DIV = document.getElementById("password_input");
}


function Check()
{
    
    var word ="";
    for(var i = 0; i < CONTROLLERS.length; i++)
    {
        if(CONTROLLERS[i].value.length != 1)
        {
            return;
        }
        
        word += CONTROLLERS[i].value;
    }
    
    if(word.localeCompare(ANSWER) == 0)
    {
        return true;
    }
}

function CheckPassword()
{
    var pass = "";
    for(var i = 0; i < PASSWORD_CONTROLLERS.length; i++)
    {
        if(PASSWORD_CONTROLLERS[i].value.length != 1)
            {
                return;
            }
        pass += PASSWORD_CONTROLLERS[i].value;
    }
    return (pass * 1 == 6954854)
}


function PlayWin()
{
    var audio = document.getElementById("audio");
    audio.src ="audio/right_answer.mp3";
    audio.play();
}