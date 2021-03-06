var REG_WIDTH = 860;
var REG_HEIGHT = 614;

function InitScreen(width, height)
{
    var width_scale = width / REG_WIDTH;
    var height_scale = height / REG_HEIGHT;
    
    var area_tags = document.getElementsByTagName("area");
    
    for(var i = 0; i < area_tags.length; i++)
    {
        var c = area_tags[i].coords;
        var x_and_y = c.split(",");
        x_and_y[0] = Math.floor(width_scale * x_and_y[0]);
        x_and_y[2] = Math.floor(width_scale * x_and_y[2]);
        x_and_y[1] = Math.floor(height_scale * x_and_y[1]);
        x_and_y[3] = Math.floor(height_scale * x_and_y[3]);;
        area_tags[i].coords = x_and_y.join(",");
    }
    
}