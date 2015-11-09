(This documentation isn't complete yet please igonre)
Pochani: Presentation from the command line
=====

Pochani is a customizable Command line tool for creating great presentation from __Markdown__ file. You don't need any memory hingry presentation application to create presentation.Simply 


##Installation

Pochani requires at least **node.js 4.x**, and it can be installed directly with npm, just use the below command:

    npm istall -g pochani
    
If you wish to install manually, that's also possible, just clone the Git repository and create a *symbolic link* to your /usr/local/bin directory with the following code:

    git clone path-to-git-repo
    sudo ln -s /location/to/pochani/pochani.js /usr/local/bin/pochani
    
obviously don't forget to change the `location/to/pochani` to the folder you've cloned pochani into. 

##Usage

###Preparing the Markdown file:
Pochani uses [markdown](http://daringfireball.net/projects/markdown/) syntax. if you are not familiar with it, you can learn it. You'll be amazed how quickly you can create documents. In fact this document is written in Markdown.

however you'll have to know one more thing, Pochani uses a special identifier `--SLIDE--` at the beginning of each slide.This helps create multiple slides out of a single file. **_note: it's case sensitive so, `--SLIDE--` should be in uppercase_** . Here's a sample file with three slides:

    --SLIDE--
    # Hello world
    Pochani is nice, and fast
    --SLIDE--
    #The Slide has a list
    * List element one
    * List element two
    * List element three
    --SLIDE--
    Did you notice we just created three slides with just a few lines of text?
    Isn't it awesome?
    --SLIDE--
    #Thanks for using Pochani
    happy that it helped

Save the file with **.md** or **.markdown** format. both are supported, let's say you saved it as *mypresentation.md*

###Converting to presentation
Go to the folder where your file is located, and run this command:

    pochani mypresentation.md
     
This will convert your file into a nice presentation and create **mypresentation.md.html**, open it in your browser and start presenting it.

