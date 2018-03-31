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
}