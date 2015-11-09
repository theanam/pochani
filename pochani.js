#!/usr/bin/env node
var markdown = require('marked');
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
			style = path.join(__dirname,'resources/template.css');
	});
}
else{
	style= path.join(__dirname,'/resources/template.css');
}
function copyFile(oldf,newf){
	var oldFile = fs.createReadStream(oldf);
	var newFile = fs.createWriteStream(newf);
	oldFile.pipe(newFile);
}
var contents = fs.readFileSync(filename,'utf-8');
var pages = contents.split('--SLIDE--');
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
//read the style file
var styles = fs.readFileSync(style);
var finalResult = template.replace('{{{{{pochani}}}}}',output);
//generate file
//copy libraries
console.log('Copying Necessary files and libraries...');
try{
console.log('Making resource directory...');
fs.mkdirSync(path.join(process.cwd(),'./res'));
}catch(e){
console.log('Directory Exists..');
}
copyFile(path.join(__dirname,'/resources/style.css'),path.join(process.cwd(),'res/style.css'));
copyFile(style,path.join(process.cwd(),'res/template.css'));
copyFile(path.join(__dirname,'resources/pochaslider.min.js'),path.join(process.cwd(),'res/pochaslider.min.js'));
copyFile(path.join(__dirname,'/resources/functions.min.js'),path.join(process.cwd(),'res/functions.min.js'));
copyFile(path.join(__dirname,'/resources/jquery.js'),path.join(process.cwd(),'res/jquery.js'));
copyFile(path.join(__dirname,'/resources/touch.js'),path.join(process.cwd(),'res/touch.js'));
console.log('Writing output file...');
fs.writeFileSync(filename+".html",finalResult,'utf-8');
console.log('All Done...')