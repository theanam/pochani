$('.pin').on('click',function(){
		//pin
		$('.toolbox-inner').toggleClass('hide');
		$(this).toggleClass('pinned');
	});
$('.annotation').on('click',function(){
	toggleAnnotation();
});
$('.video').on('click',function(){
	/*The functions are in video.js*/
	if(videoPlaying){
		turnOffVideo();
	}
	else{
		turnOnVideo();
	}
});
$('.colors').on('click','.button',function(){
	ctx.strokeStyle=this.style.backgroundColor; /*ctx is from drawing.js*/
    //remove existing reference
    $('.colors .button').removeClass('selected');
    $(this).addClass('selected');
    strokeColor=this.style.backgroundColor;
});