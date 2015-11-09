var strokeColor='#2c3e50';
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
    $('.toolbox').css('z-index','1000');
    if(e.offsetX){
        previousX=e.offsetX;
        previousY=e.offsetY;
    }
    else{
        //touch event
        previousY=e.originalEvent.touches[0].clientY;
        previousX=e.originalEvent.touches[0].clientX;
    }
}
function drawingEnd(e){
        e.preventDefault();
        mouseDown=false;
        $('.toolbox').css('z-index','5000');
}
function drawingProgress(e){
        e.preventDefault();
        if(mouseDown){
            ctx.beginPath();
            ctx.moveTo(previousX,previousY);
            var currentX;
            var currentY;
            if(e.offsetX){
                currentX=e.clientX;
                currentY=e.clientY;
            }
            else{
                //touch
                currentX=e.originalEvent.touches[0].clientX;
                currentY=e.originalEvent.touches[0].clientY;
            }
            ctx.lineTo(currentX,currentY);
            ctx.stroke();
            previousX=currentX;
            previousY=currentY;
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
/*Touch Events*/
if('ontouchstart' in document){
console.log('Registering touch events...');
canvas.on('touchstart',drawingStart);
canvas.on('touchend',drawingEnd);
canvas.on('touchmove',drawingProgress);
}