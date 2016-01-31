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
    var raptorUrls = [
        '/images/raptor1.png',
        '/images/raptor2.png',
        '/images/raptor3.png',
        '/images/raptor4.png',
        '/images/raptor5.png',
        '/images/raptor6.png',
        '/images/raptor7.png',
        '/images/raptor8.png',
        '/images/raptor9.png',
        '/images/prehistoric_trends.png'
    ];
    var raptorCounter = 0;

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

            //Determine Entrance
            if (options.enterOn == 'timer') {
                setTimeout(init, options.delayTime);
            } else if (options.enterOn == 'click') {
                _this.bind('click', function (e) {
                    e.preventDefault();
                    if (!locked) {
                        init();
                    }
                })
            } else if (options.enterOn == 'konami-code') {
                var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
                $(window).bind("keydown.raptorz", function (e) {
                    kkeys.push(e.keyCode);
                    if (kkeys.toString().indexOf(konami) >= 0) {
                        init();
                        $(window).unbind('keydown.raptorz');
                    }
                }, true);

            }

        }); //each call
    } //orbit plugin call
})(jQuery);

$("body").raptorize();
$(window).scrollTop(9999999); // run away!
        