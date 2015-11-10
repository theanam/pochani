## Creating your own presentation template
It's recommended that you clone the whole pochani repository and set up local development environment, it's really easy to do, you'll have to have **node.js** and **npm** and [gulp](//gulpjs.com) installed. 

at first clone the repository:

	git clone https://github.com/theanam/pochani.git

Then install dependencies by running this command inside the repository folder,

	npm install

this will install all the necessary files required. now run gulp by using the command:

	gulp

and gulp will start watching your files, srart up a development server and open up the test file in your default browser. or you can navigate to `http://localhost:3000` (port may vary, check gulp output in the terminal) from the browser.

the template files are on `base_template/css/template` folder, there are two file, `animation.css` and `template_styles.css`, as the name suggests, animation.css controls the slide transition animations (if you are clever enough, you can use the same classed to make different animations for different slides, or even add child element effects) You can read how to work with PochaSlider [here](//github.com/theanam/pochaslider)

the other file `template_styles.css` contains all the styles for the template, it's well documented, you can change colors, font, background and anything from there. Pochani adds some helper classes to make styling easier, the classes are:

 * childs-x (x = number of immediate child nodes)
 * has-list (if the slide has a list as immediate child node)
 * single-image (the slide contains only one image)
 * multiple-image (the slide contains multiple images)

These will help create specific CSS styles of your choice. the browser will refresh once you change anything in your template. **Note: you don't need to add vendor prefixes, gulp automatically takes care of it**

### Distributing the template:

both the animation and the styles are compiled into `templating/template.css`, if you wish to distribute the template, you can  distribute this single file.