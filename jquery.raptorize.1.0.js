/*
 * jQuery Raptorize Plugin 1.0
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Modified
*/


(function ($) {
    var raptorImageUrl = "http://rsunde.github.io/Websites__Static/images/";
    var raptorUrls = [
        raptorImageUrl + 'raptor1.png',
        raptorImageUrl + 'raptor2.png',
        raptorImageUrl + 'raptor3.png',
        raptorImageUrl + 'raptor4.png',
        raptorImageUrl + 'raptor5.png',
        raptorImageUrl + 'raptor6.png',
        raptorImageUrl + 'raptor7.png',
        raptorImageUrl + 'raptor8.png',
        raptorImageUrl + 'raptor9.png',
        raptorImageUrl + 'prehistoric_trends.png'
    ];
    var raptorCounter = 0;

    var code = String.fromCharCode(38, 38, 40, 40, 37, 39, 37, 39, 66, 65);
    var codeBuffer = "";

    $.fn.raptorize = function (options) {

        var randomImageUrl = raptorUrls[Math.floor(Math.random() * raptorUrls.length)];
        //Yo' defaults
        var defaults = {
            enterOn: 'konami-code', //timer, konami-code, click
            delayTime: 100 //time before raptor attacks on timer mode
        };

        //Extend those options
        var options = $.extend(defaults, options);

        return this.each(function () {

            var _this = $(this);
            var audioSupported = false;

            $("#elRaptor").remove();
            //Raptor Vars
            var raptorImageMarkup = '<img style="display: none;z-index:30000" src="' + randomImageUrl + '" />';
            var locked = false;

            //Append Raptor and Style
            var raptor = $(raptorImageMarkup);
            $('body').append(raptor);
            raptor.css({
                "position": "fixed",
                "bottom": "-310px",
                "right": "0",
                "display": "block"
            })

            init();

            function init() {
                var image = new Image();
                image.onload = function () { initAfterImageLoad() };
                image.src = randomImageUrl;
            }

            // Animating Code
            function initAfterImageLoad() {
                locked = true;

                // Movement Hilarity	
                raptor.animate({
                    "bottom": "0"
                }, function () {

                    $(this).animate({
                        "bottom": "-20px"
                    }, 100, function () {
                        var offset = (($(this).position().left) + 400);
                        $(this).delay(300).animate({
                            "right": offset
                        }, 2200, function () {
                            raptor.remove();
                            locked = false;
                        })
                    });
                });
            }
        }); //each call
    } //orbit plugin call
})(jQuery);

// konami code - up up down down left right left right b a
var code = String.fromCharCode(38, 38, 40, 40, 37, 39, 37, 39, 66, 65);
var codeBuffer = "";
$(document).keyup(function (e) {
    codeBuffer += String.fromCharCode(e.which);
    if (code.substring(0, codeBuffer.length) == codeBuffer) {
        if (code.length == codeBuffer.length) {
            $("body").raptorize();
            codeBuffer = String.fromCharCode(38, 38, 40, 40, 37, 39, 37, 39, 66);
        }
    } else {
        codeBuffer = "";
    }
});


        