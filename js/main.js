jQuery.fn.centerFixed = function () {
    this.css("position","fixed");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

var closeWindow = function() {
    $('.mouth').addClass('closed');
    $('.window-left-toast').addClass('closed');
    $('.window-right-toast').addClass('closed');
    $('.window-center-col').addClass('closed');
    $('.window-container').hide();
};

var openWindow = function() {
    $('.mouth').removeClass('closed');
    $('.window-left-toast').removeClass('closed');
    $('.window-right-toast').removeClass('closed');
    $('.window-center-col').removeClass('closed');
    $('.window-container').show();
};

var toggleWindow = function() {
    $('.mouth').toggleClass('closed');
    $('.window-left-toast').toggleClass('closed');
    $('.window-right-toast').toggleClass('closed');
    $('.window-center-col').toggleClass('closed');
    $('.window-container').toggle();
};

var resetTools = function() {
    $('#pencil').removeClass('selected');
    $('#eraser').removeClass('selected');
    $('#pencil').removeClass('inactive');
    $('#eraser').removeClass('inactive');
};

var selectPencil = function() {
    isEraserSelected=false;
    resetTools();
    $('#pencil').addClass('selected');
    $('#eraser').addClass('inactive');
    openWindow();

    $("#eraser-selected-balloon").hide();
};

var selectEraser = function() {
    isEraserSelected=true;
    resetTools();
    $('#eraser').addClass('selected');
    $('#pencil').addClass('inactive');
    closeWindow();

    $("#eraser-selected-balloon").show();
    $("#eraser-selected-balloon").css("left", $('.window').width()/2 + 30);
};

//initialize selectbox
$('select').selectBox();
// init
$('#map-container').hide();
$('#tileset-widget').hide();
$('#export-widget').hide();
$('#tools-widget').hide();
$('#data-widget').center();
$('#export-widget').centerFixed(); 
$('#data-form').validate();
$('#new-button').addClass("disabled");
$('#export-button').addClass("disabled");

var initWidth = 229;
console.log("INIT WIDTH = "+initWidth);

// pencil is selected by default
selectPencil();

$('#pencil').click(function(){
    selectPencil();
});

$('#eraser').click(function(){
    selectEraser();
});

$('#tileset-widget-button').click(function(){
    if(isEraserSelected)
    {
        selectPencil();
        toggleWindow();
    }
});

window.onresize = function(event) {
    $('#map-container').center();
    $('#data-widget').center();
    $('#export-widget').centerFixed(); 

    if($('#map-container').offset().top < 52)
    {
        $('#map-container').css('top', '72px');
    }

    if($('#data-widget').offset().top < 52)
    {
        $('#data-widget').css('top', '72px');
    }

    if($('#export-widget').offset().top < 52)
    {
        $('#export-widget').css('top', '72px');
    }
};

var setupWindows = function() {
    // leave 30px for the scrollbar
    // and 20*2px for the toast background
    $('.window-container').width($('.window-container').width() + 30);
    $('.window-center-col').width($('.window-container').width());
    $('.window').width($('.window-container').width() + 20*2);

    $('.window-header-button').click(function(event) {

        if(!isEraserSelected)
        {
            toggleWindow();
        }
    });

    // jQuery UI for dragging
    $('.window').draggable();
};

$('#language-select').change(function() {
    console.log('select changed = '+$("#language-select").val());
    languageChanged($("#language-select").val());
});

var languageChanged = function(language) {

    if(language === "cpp")
    {
        $('#export-text-area').show();
        $('#ogmo-project-export').hide();
        $('#ogmo-level-export').hide();
        $('#export-text-area').val(printLevelCpp());
    }
    else if(language === "as3")
    {
        $('#export-text-area').show();
        $('#ogmo-project-export').hide();
        $('#ogmo-level-export').hide();
        $('#export-text-area').val(printLevelAS3());
    }
    else if(language === "flashpunk")
    {
        $('#export-text-area').show();
        $('#ogmo-project-export').hide();
        $('#ogmo-level-export').hide();
        $('#export-text-area').val(printLevelFlashPunk());
    }
    else if(language === "toast")
    {
        $('#export-text-area').show();
        $('#ogmo-project-export').hide();
        $('#ogmo-level-export').hide();
        $('#export-text-area').val(printLevelToast());
    }
    else if(language === "ogmo")
    {
        $('#export-text-area').hide();
        $('#ogmo-project-export').show();
        $('#ogmo-level-export').show();

        $('#ogmo-project-area').val(printOgmoProject());
        $('#ogmo-level-area').val(printOgmoLevel());
    }
    else if(language === "csv")
    {
        $('#export-text-area').show();
        $('#ogmo-project-export').hide();
        $('#ogmo-level-export').hide();

        $('#export-text-area').val(printLevelCSV());
    }
};

