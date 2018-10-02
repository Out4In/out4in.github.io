var QUESTION_COUNT = 10;
var FORM_ID = "userAnswerForm";
var MAX_AMOUNT_OF_QUESTIONS = 5;
var elm_form = document.forms[FORM_ID];
var elm_title = document.querySelector("title");

var qNum = getQNum();

displayQNum();

function saveAnswer()
{
    var curr_input;
    var inputs = [];
    var flag = false;
    
    for(var i = 1; i <= MAX_AMOUNT_OF_QUESTIONS; i++)                                 //Getting questions inputs.
    {
        curr_input = document.getElementById("a" + i);
        if(curr_input != null && curr_input != undefined)
        {
            inputs.push(curr_input);
            
            if (curr_input.checked)
            {
                flag = true;
            }
        }
        else
        {
            break;
        }
    }
    
    
    if(flag)
    {
        for(var i = 0; i < inputs.length; i++)          //if a right answer was not checked
        {
            if(inputs[i].value == "1")
            {
                if(!inputs[i].checked)
                {
                    alert("תשובה לא נכונה, נסו שנית");
                    return;
                }
            }
            else if(inputs[i].value == "0")             //if a wrong answer checked.
            {
                if(inputs[i].checked)
                {
                    alert("תשובה לא נכונה, נסו שנית");
                    return;
                }
            }
        }
    }
    else
    {
        alert("עליכם לבחור באחת התשובות לפני שתמשיכו");
        return;
    }
    
    localStorage.setItem("isCorrectQ" + qNum, "1");

    var nextQNum = qNum + 1;
    if (nextQNum > QUESTION_COUNT)
    {
        finishQuiz();
    }
    else
    {
        window.location.href = "q" + nextQNum + ".html";
    }
}

function getQNum()
{
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var name = page.split(".")[0];
    var qNum = name.substr(1) * 1;
    return qNum;
}

function displayQNum()
{
    document.querySelector("span#qNum").innerHTML = qNum;
    elm_title.innerHTML = elm_title.innerHTML.replace("{{qNum}}", qNum);
}

function finishQuiz()
{
    var name = localStorage.getItem("userName");
    var email = localStorage.getItem("userEmail");
    var score = 0;
    var tmpScore;
    for (var i = 1; i <= QUESTION_COUNT; i++)
    {   
        tmpScore = localStorage.getItem("isCorrectQ" + i);
        score += (tmpScore == null) ? 0 : tmpScore == "1" ? 1 : 0;
    }
    localStorage.setItem("finalScore", score);
    window.location.href = "score.html";
}