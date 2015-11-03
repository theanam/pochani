#!/usr/bin/env node
var markdown = require('marked');
var http = require('http');
var fs = require('fs');
var path = require('path');
var options = process.argv.slice(2);
//markdown file
var filename = options.find(function(e){
	return (e.match('.md')||e.match('.markdown'));
});
//custom css file
var style = options.find(function(e){
	return e.match('.css');
});
if(style){
	fs.exists(style,function(exists){
		if(!exists)
			style = path.join(__dirname,"resources/default.css");
	});
}
else{
	style= path.join(__dirname,"/resources/default.css");
}
function copyFile(oldf,newf){
	var oldFile = fs.createReadStream(oldf);
	var newFile = fs.createWriteStream(newf);
	oldFile.pipe(newFile);
}
var contents = fs.readFileSync(filename,'utf-8');
var pages = contents.split('--page--');
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
pages.forEach(function(page){
	output+=itemTemplate.replace('{{{{{slidecontent}}}}}',markdown(page));
});
//end output
output+=ending;
// console.log(output);
//read the template
var template = fs.readFileSync(path.join(__dirname,'resources/template.html'),'utf-8');
//read the style file
var styles = fs.readFileSync(style);
var finalResult = template.replace('{{{{{pochani}}}}}',output).replace('{{{{{css}}}}}',styles);
//generate file
fs.writeFileSync(filename+".html",finalResult,'utf-8');
//copy libraries
copyFile(path.join(__dirname,"resources/pochaslider.min.js"),path.join(process.cwd(),"pochaslider.min.js"));
copyFile(path.join(__dirname,"/resources/functions.js"),path.join(process.cwd(),"functions.js"));
//get jQuery
//var jq=fs.createWriteStream(path.join(process.cwd(),'jquery.js'));
//http.get('http://code.jquery.com/jquery-2.1.4.min.js',function(file){
//    file.pipe(jq);
//})