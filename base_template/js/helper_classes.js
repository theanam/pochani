$.each($('.slide'),function(i,e){
    var current = $(e);
    //has list
    current.find('ul,ol').length>0 && current.addClass('has-list');
    //has image(s)
    current.find('img').length==1 && current.addClass('single-image');
    current.find('img').length>1 && current.addClass("multiple-image");
    //has heading and description
    current.find('h1,h2').length>0 && current.find('p').length>0 && current.addClass('heading-paragaraph');
});