var IMG_WIDTH = 3544
var IMG_HEIGHT = 1578

function InitScreen(width, height)
{
    var width_scale = width / IMG_WIDTH;
    var height_scale = height / IMG_HEIGHT;
    
    var area_tags = document.getElementsByTagName("area");
    
    for(var i = 0; i < area_tags.length; i++)
    {
        var c = area_tags[i].coords;
        var x_and_y = c.split(",");
        
        //alert("x1: " + x_and_y[0] + ", y1: " + x_and_y[1] + ", x2: " + x_and_y[2] + ", y2: " + x_and_y[3]);
        
        x_and_y[0] = Math.floor(width_scale * x_and_y[0]);
        x_and_y[2] = Math.floor(width_scale * x_and_y[2]);
        x_and_y[1] = Math.floor(height_scale * x_and_y[1]);
        x_and_y[3] = Math.floor(height_scale * x_and_y[3]);;
        area_tags[i].coords = x_and_y.join(",");
    }
    
}