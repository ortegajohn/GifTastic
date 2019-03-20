/** draw.js **/

window.addEventListener("DOMContentLoaded", function()
{
    var image  = document.getElementById("ZZ");
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    canvas.width  = image.width;
    canvas.height = image.height;

    var context = canvas.getContext("2d");

    context.drawImage(image, 0, 0);
});