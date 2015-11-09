$.each($('.slide'),function(i,e){
    var current = $(e);
    // add child count class
    current.addClass("childs-"+current.find(">*").length);
    //has list
    current.find('>ul,>ol').length>0 && current.addClass('has-list');
    //has image(s)
    current.find('img').length==1 && current.addClass('single-image');
    current.find('img').length>1 && current.addClass("multiple-image");
});