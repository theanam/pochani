Pochani: Presentation from the command line
=====

Pochani is a customizable Command line tool for creating great presentation from __Markdown__ file. You don't need any memory hungry presentation application to create presentation.Simply create a markdown file and convert it to a wonderful presentation with this command line utility. The output presentation is beautiful, independent and full of useful features.

#### [Click here for a demo presentation](//theanam.github.io/pochani/test/test.md.html)

## Features

* Create presentation from markdown file, familiar syntax, fast creation
* Custom Styles and templates
* Responsive by default
* Full touch support
* Draw and annotate on your presentation
* Show webcam feed inside your presentation

> Feature video coming soon

## Installation

Pochani requires at least **node.js 0.12.x**, and it can be installed directly with npm, just use the below command as *root* user:

    npm istall -g pochani
    
If you wish to install manually, that's also possible, just clone the Git repository and create a *symbolic link* to your /usr/local/bin directory with the following code:

    git clone https://github.com/theanam/pochani.git
    sudo ln -s /location/to/pochani/pochani.js /usr/local/bin/pochani
    
obviously don't forget to change the `location/to/pochani` to the folder you've cloned pochani into. 

## Usage

### Preparing the Markdown file:
Pochani uses [markdown](//daringfireball.net/projects/markdown/) syntax. if you are not familiar with it, you can learn it I wrote a Bangla article on markdown, you can [Check it out](http://blog.anam.co/node/7) if you speak Bangla. You'll be amazed how quickly you can create documents with markdown. In fact, this document is written in Markdown as well.

however you'll have to know one more thing, Pochani uses a special identifier **`--SLIDE--`** at the beginning of each slide.This helps create multiple slides out of a single file. **_note: it's case sensitive so, `--SLIDE--` should be in uppercase_** . Here's a sample file with three slides:

    --SLIDE--
    # Hello world
    Pochani is nice, and fast
    --SLIDE--
    # The Slide has a list
    * List element one
    * List element two
    * List element three
    --SLIDE--
    Did you notice we just created three slides with just a few lines of text?
    Isn't it awesome?
    --SLIDE--
    # Thanks for using Pochani
    happy that it helped

> make sure that the identifier --SLIDE-- is on a single line.

Save the file with **.md** or **.markdown** format. both are supported, let's say you saved it as *mypresentation.md*

### Converting to presentation
Go to the folder where your file is located, and run this command:

    pochani mypresentation.md
     
This will copy all the necessary files and convert your file into a nice presentation. the filename should be **mypresentation.md.html**. The `res` folder contains all the necessary libraries and files, put them and the file in a server then open it in your browser and start presenting it. You can directly double click and open the file to present it, but for security reasons, Video won't work.

> I'm working on a integrated server with support for remote control for a future release.

### Using custom templates

Pochani comes with a default template. But the main power is with you. You can [Create your own](//github.com/theanam/pochani/blob/master/templating/README.md) very easily. just download the base template file (template.css) from [here](//github.com/theanam/pochani/tree/master/templating) edit it, and then use the filename as an extra parameter while converting. Like this:

    pochani filename.md mytheme.css

And it will use styles from this file, rather than the default file.

## Browser Support

* All latest **firefox**,and **chrome** browsers
* Microsoft Egde 12+
* Apple Safari 8+ (Video not supported yet)
* Internet Explorer! 9+ (partially supported)
* Opera 32+
* Android Browser 4.1+ (Video maybe not supported for some versions or smaller screens)
