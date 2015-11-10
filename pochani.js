#!/usr/bin/env node
var markdown = require('marked');
var fs = require('fs');
var path = require('path');
var options = process.argv.slice(2);
//markdown file
//added for node 12.x compatibility
function find(arr,str){
	var found = undefined;
	for(i=0;i<arr.length;i++){
		if(arr[i].match(str)){
			found=arr[i];
			break;
		}
	}
	return found;
}
function copyFile(oldf,newf){
	var oldFile = fs.createReadStream(oldf);
	var newFile = fs.createWriteStream(newf);
	oldFile.pipe(newFile);
	console.log("Copied "+newf);
}

var filename = find(options,/.md$/) || find(options,/.markdown$/);
if(!filename){
	console.log("No Markdown file was specified, please use either .md or .markdown format file");
	process.exit();
}
else{
	fs.access(filename,fs.R_OK,function(error){
		if(error){
			console.log("Markdown file doesn't exist. Exiting...");
			process.exit();
		}
		else{
			render();
		}
	});
}
//custom css file
function copyStyle(){
	var style = find(options,'.css');;
	if(style){
		fs.access(path.join(process.cwd(),style),fs.R_OK,function(error){
			if(!error){
				copyFile(path.join(process.cwd(),style),path.join(process.cwd(),'res/template.css'));
			}
			else{
				console.log('template file not found. using default template..');
				copyFile(path.join(__dirname,'/resources/template.css'),path.join(process.cwd(),'res/template.css'));
			}
		});
	}
	else{
		copyFile(path.join(__dirname,'/resources/template.css'),path.join(process.cwd(),'res/template.css'));
	}
}
//custom css
function render(){
	var contents = fs.readFileSync(filename,'utf-8');
	var pages = contents.split(/\-\-SLIDE\-\-$/gm);
	//get rid of the empty page
	if(pages[0]==''){
		pages.splice(0,1);
	}
	var starting = '<div class="slidecontainer">';
	var itemTemplate = '<div class="slide">{{{{{slidecontent}}}}}</div>';
	var ending = '</div>';
	//start output
	var output = starting;
	//add pages
	console.log('Compiling Markdown...');
	pages.forEach(function(page){
		output+=itemTemplate.replace('{{{{{slidecontent}}}}}',markdown(page));
	});
	//end output
	output+=ending;
	// console.log(output);
	//read the template
	var template = fs.readFileSync(path.join(__dirname,'resources/template.html'),'utf-8');
	var finalResult = template.replace('{{{{{pochani}}}}}',output);
	//generate file
	//copy libraries
	try{
		console.log('Making resource directory...');
		fs.mkdirSync(path.join(process.cwd(),'./res'));
	}catch(e){
		console.log('Directory Exists, using the existing one..');
	}
	copyFile(path.join(__dirname,'/resources/style.css'),path.join(process.cwd(),'res/style.css'));
	copyFile(path.join(__dirname,'resources/pochaslider.min.js'),path.join(process.cwd(),'res/pochaslider.min.js'));
	copyFile(path.join(__dirname,'/resources/functions.min.js'),path.join(process.cwd(),'res/functions.min.js'));
	copyFile(path.join(__dirname,'/resources/jquery.js'),path.join(process.cwd(),'res/jquery.js'));
	copyFile(path.join(__dirname,'/resources/touch.js'),path.join(process.cwd(),'res/touch.js'));
	copyStyle();
	fs.writeFileSync(filename+".html",finalResult,'utf-8');
}