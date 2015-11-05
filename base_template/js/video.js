var videoPlaying=false;
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
