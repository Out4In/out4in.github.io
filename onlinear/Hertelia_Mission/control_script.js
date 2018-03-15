var CONTROLLERS = []
var PASSWORDELM = undefined;
var WINELM = undefined;
var USERNAMEDIV = undefined;
var ANSWER = "יעקבלוי";
var PASSWORD_DIV = undefined;
function Init()
{
    CONTROLLERS = [document.getElementById("txt_user_name_1_letter"),document.getElementById("txt_user_name_2_letter"),document.getElementById("txt_user_name_3_letter"),document.getElementById("txt_user_name_4_letter"),document.getElementById("txt_user_name_5_letter"),document.getElementById("txt_user_name_6_letter"),document.getElementById("txt_user_name_7_letter")]
    for(var i = 0; i < CONTROLLERS.length; i++)
    {
        var controller = CONTROLLERS[i];
        controller.addEventListener("input", function(event)
        {
            this.value = event.data;
            var next_id = this.id.split("_")[3]*1 + 1;
            if(next_id <=7)
            {
                CONTROLLERS[next_id - 1].focus()
            }
            if(Check())
                {
                    document.getElementById("password_input").style.visibility = "visible";
                }
        });
    }
    USERNAMEDIV = document.getElementById("wrapper");
    WINELM = document.getElementById("win");
    PASSWORD_DIV = document.getElementById("password_input");
    PASSWORDELM = document.getElementById("txt_password");
    
    PASSWORDELM.addEventListener("input",function(event)
    {
        if(isNaN(event.data))
            {
                this.value = this.value.substring(0,this.value.length - 1); // remove last char
                return;
            }
        
        
        if(this.value.length >7)
            {
                this.value = this.value.substring(0,this.value.length - 1); //remove last char
                return; 
            }
        if(CheckPassword())
        {
            USERNAMEDIV.style.visibility = "hidden";
            USERNAMEDIV.style.display = "none";
            PASSWORD_DIV.style.visibility  ="hidden";
            PASSWORD_DIV.style.display = "none";
            WINELM.style.visibility = "visible"
        }
        
    });
    
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
    return (PASSWORDELM.value * 1 == 6954854)
}