$('.slide').pochaSlider({
		autoPlay:false,
		keyboardNavigation:true
	});
	$('.slidecontainer').show();
	//toolbox
		//pinning
	$('.pin').on('click',function(){
		//pin
		$('.toolbox-inner').toggleClass('hide');
		$(this).toggleClass('pinned');
	});
	var videoPlaying=false;
		//annotation
	$('.annotation').on('click',function(){
		toggleAnnotation();
	});
	$('.colors').on('click','.button',function(){
		ctx.strokeStyle=this.style.backgroundColor;
        //remove existing reference
        $('.colors .button').removeClass('selected');
        $(this).addClass('selected');
		strokeColor=this.style.backgroundColor;
	});
		//webcam
	var theStream=null;
	var v = $('.webcam').get(0);
	function turnOnVideo(){
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
		navigator.getUserMedia({video:true,audio:false},function(stream){
			videoPlaying=true;
			theStream=stream;
			var videosrc = window.URL.createObjectURL(stream);
			v.style.display="block";
			v.src=videosrc;
			v.play();
		},function(err){
			console.log(err);
		});
	}
	function turnOffVideo(){
		if(theStream.stop){
			theStream.stop();
			thestream=null;
		}
		v.style.display="none";
		v.pause();
		v.src="";
		videoPlaying=false;
	}
	$('.video').on('click',function(){
		if(videoPlaying){
			turnOffVideo();
		}
		else{
			turnOnVideo();
		}
	});
	//annotations and others
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
    resizeAnnotate();
    //hide annotation on slide change
    $(document).on('keydown',function(e){
    	if(e.keyCode==32 || e.keyCode==37 ||e.keyCode==39){
    		resizeAnnotate();
    		$('.colors').removeClass('hiddencolor');
    		$('.annotate').hide();
    	}
    });
    $(window).on('resize',resizeAnnotate);
    //annotation functionality
    function drawingStart(e){
        e.preventDefault();
        mouseDown=true;
        previousX=e.offsetX;
        previousY=e.offsetY;
    }
    //event listeners
    canvas.on('mousedown',drawingStart);
    function drawingEnd(e){
        e.preventDefault();
        mouseDown=false;
    }
    canvas.on('mouseup',drawingEnd);
    canvas.on('mouseleave',drawingEnd);
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
    //event listener
    canvas.on('mousemove',drawingProgress);