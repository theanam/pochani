var strokeColor="#2c3e50";
var mouseDown = false;
var previousX=0;
var previousY=0;
var canvas = $('.annotate');
var ctx = $('.annotate').get(0).getContext('2d');
function toggleAnnotation(){
   $('.colors').toggleClass('hiddencolor');
   $('.annotate').toggle();
}
function resizeAnnotate(){
    $('.annotate').attr({
        'width':$(window).width(),
        'height':$(window).height()
    });
    ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.strokeStyle=strokeColor;
};
function drawingStart(e){
        e.preventDefault();
        mouseDown=true;
        previousX=e.offsetX;
        previousY=e.offsetY;
        //make the toolbox behind
        $('.toolbox').css('z-index','1000');
}
function drawingEnd(e){
        e.preventDefault();
        mouseDown=false;
        //draw above toolbox
        $('.toolbox').css('z-index','5000');
}
function drawingProgress(e){
        e.preventDefault();
        if(mouseDown){
            ctx.beginPath();
            ctx.moveTo(previousX,previousY);
            ctx.lineTo(e.offsetX,e.offsetY);
            ctx.stroke();
            previousX=e.offsetX;
            previousY=e.offsetY;
        }
}
//hide annotation on slide change
$(document).on('keydown',function(e){
    	if(e.keyCode==32 || e.keyCode==37 ||e.keyCode==39){
    		resizeAnnotate();
    		$('.colors').removeClass('hiddencolor');
    		$('.annotate').hide();
    	}
    });
resizeAnnotate(); //very beginning
$(window).on('resize',resizeAnnotate);
canvas.on('mousedown',drawingStart);
canvas.on('mouseup',drawingEnd);
canvas.on('mouseleave',drawingEnd);
canvas.on('mousemove',drawingProgress);