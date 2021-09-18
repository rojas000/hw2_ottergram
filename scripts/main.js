var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var PREV_BUTTON = '.prev';
var NEXT_BUTTON = '.next';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var index=0;

function setDetails(url, title){
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', url);
    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = title;
}

function imageFromThumb(thumb){
    'use strict';
    return thumb.getAttribute('data-image-url');
}

function titleFromThumb(thumb){
    'use strict';
    return thumb.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumb){
    'use strict';
    setDetails(imageFromThumb(thumb),titleFromThumb(thumb));
}

function addThumbClickHandler(thumb){
    'use strict';
    thumb.addEventListener('click', function (event){
        event.preventDefault();
        setDetailsFromThumb(thumb);
        var inn = thumb.getAttribute('data-image-index')
        index = parseInt(inn);
        console.log("index:", index);
        showDetails();
    });
}


function addButtonNextClickHandler(button, thumbArray){
    'use strict';
    document.querySelector(button).addEventListener('click', function (event){
        event.preventDefault();
        if(index+1 >= thumbArray.length){
            window.alert("Oh no! No more pictures in the list, but don't worry because you can go back to previous ones.")
        }
        else{
            index++;
            setDetailsFromThumb(thumbArray[index]);
            showDetails();
        }
    });
}

function addButtonPrevClickHandler(button, thumbArray){
    'use strict';
    document.querySelector(button).addEventListener('click', function (event){
        event.preventDefault();
        if(index < 1){
            window.alert("Oops! This is the start of a great list. You can navigate through these photos using the > button or scroll and pick the images that get your attention. Have fun!")
        }
        else{
            index--;
            setDetailsFromThumb(thumbArray[index]);
            showDetails();
        }
    });
}

function getThumbnailsArray(){
    'use strict';
    var thumbs = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbArray = [].slice.call(thumbs);
    return thumbArray;
}

function hideDetails(){
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails(){
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function(){
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler(){
    'use strict';
    document.body.addEventListener('keyup', function (event){
        event.preventDefault();
        console.log(event.keyCode);
        if(event.keyCode == ESC_KEY){
            hideDetails();
        }
    });
}

function initializeEvents(){
    'use strict';
    var thumbs = getThumbnailsArray();
    thumbs.forEach((element,index) => { element.setAttribute("data-image-index", index.toString());
                                        addThumbClickHandler(element);});
    console.log(thumbs[3]);
    addKeyPressHandler();
    addButtonNextClickHandler(NEXT_BUTTON, thumbs);
    addButtonPrevClickHandler(PREV_BUTTON, thumbs);
}

initializeEvents();