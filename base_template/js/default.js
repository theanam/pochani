var slider = $('.slide').pochaSlider({
		autoPlay:false,
		keyboardNavigation:true
	});
$('.slidecontainer').show();
//touch events
if('ontouchstart' in document){
	//touch navigation
	$('.slide').on('swiperight',slider.next);
	$('.slide').on('swipeleft',slider.previous);
	//touch navigation buttons while drawing
	$('.touchnav.right').on('tap',slider.next);
	$('touchnav.left').on('tap',slider.previous);
}