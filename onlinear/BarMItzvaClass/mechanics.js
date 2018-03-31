var ALL_IMAGES = []
var DETECTED_IMAGES = []
var PARTS = 8
for(var i = 1; i <= PARTS; i++)
{
    var tmp_img = document.createElement("img");
    tmp_img.src = "images/img_" + i  +".png";
    ALL_IMAGES.push(tmp_img)
}



function AddImageAsDetected(image_name)
{
    for(var i = 0; i < PARTS;i++) // check if image in all images
    {
            if((image_name + ".png") == ALL_IMAGES[i])
            {
                break;
            }
            if(i == PARTS - 1) // last iteration
            {
                return;
            }
    }
    
    for(var i = 0; i < PARTS; i ++) //check if image already detected
    {
        if(image_name == DETECTED_IMAGES[i])
        {
            return;
        }
    }
    DETECTED_IMAGES.push(image_name);
    alert(DETECTED_IMAGES); // for debug 
}