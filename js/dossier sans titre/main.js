$(function () {
    var SliderModule = (function () {
        var pb = {};
        pb.el = $('#sliders');
        pb.items = {
            panels: pb.el.find('.slider-wrapper > li'),
        }
        var SliderInterval, currentSlider = 0,
            nextSlider = 1,
            lengthSlider = pb.items.panels.length;
        pb.init = function (settings) {
            this.settings = settings || {
                duration: 8000
            };
            var items = this.items,
                lengthPanels = items.panels.length,
                output = '';
            for (var i = 0; i < lengthPanels; i++) {
                if (i == 0) {
                    output += '<li class="active"></li>'
                } else {
                    output += '<li></li>'
                }
            }
            $('#control-buttons').html(output);
            activateSlider();
            $('#control-buttons').on('click', 'li', function (e) {
                var $this = $(this);
                if (!(currentSlider === $this.index())) {
                    changePanel($this.index())
                }
            })
        }
        var activateSlider = function () {
            SliderInterval = setInterval(pb.startSlider, pb.settings.duration)
        }
        pb.startSlider = function () {
            var items = pb.items,
                controls = $('#control-buttons li');
            if (nextSlider >= lengthSlider) {
                nextSlider = 0;
                currentSlider = lengthSlider - 1
            }
            controls.removeClass('active').eq(nextSlider).addClass('active');
            items.panels.eq(currentSlider).fadeOut('slow');
            items.panels.eq(nextSlider).fadeIn('slow');
            currentSlider = nextSlider;
            nextSlider += 1
        }
        var changePanel = function (id) {
            clearInterval(SliderInterval);
            var items = pb.items,
                controls = $('#control-buttons li');
            if (id >= lengthSlider) {
                id = 0
            } else if (id < 0) {
                id = lengthSlider - 1
            }
            controls.removeClass('active').eq(id).addClass('active');
            items.panels.eq(currentSlider).fadeOut('slow');
            items.panels.eq(id).fadeIn('slow');
            currentSlider = id;
            nextSlider = id + 1;
            activateSlider()
        }
        return pb
    }());
    SliderModule.init({
        duration: 4000
    })
});
jQuery(window).on("load", function () {
    "use strict";
    setTimeout(function () {
        $("#loader").fadeOut("slow")
    }, 3000)
});
(function ($) {
    "use strict";
    $.fn.sliderResponsive = function (settings) {
        var set = $.extend({
            slidePause: 5000,
            fadeSpeed: 800,
            autoPlay: "on",
            showArrows: "off",
            hideDots: "off",
            hoverZoom: "on",
            titleBarTop: "off"
        }, settings);
        var $slider = $(this);
        var size = $slider.find("> div").length;
        var position = 0;
        var sliderIntervalID;
        $slider.append("<ul></ul>");
        $slider.find("> div").each(function () {
            $slider.find("> ul").append('<li></li>')
        });
        $slider.find("div:first-of-type").addClass("show");
        $slider.find("li:first-of-type").addClass("showli")
        $slider.find("> div").not(".show").fadeOut();
        if (set.autoPlay === "on") {
            startSlider()
        }
        if (set.showArrows === "on") {
            $slider.addClass('showArrows')
        }
        if (set.hideDots === "on") {
            $slider.addClass('hideDots')
        }
        if (set.hoverZoom === "off") {
            $slider.addClass('hoverZoomOff')
        }
        if (set.titleBarTop === "on") {
            $slider.addClass('titleBarTop')
        }

        function startSlider() {
            sliderIntervalID = setInterval(function () {
                nextSlide()
            }, set.slidePause)
        }
        $slider.mouseover(function () {
            if (set.autoPlay === "on") {
                clearInterval(sliderIntervalID)
            }
        });
        $slider.mouseout(function () {
            if (set.autoPlay === "on") {
                startSlider()
            }
        });
        $slider.find("> .right").click(nextSlide)
        $slider.find("> .left").click(prevSlide);

        function nextSlide() {
            position = $slider.find(".show").index() + 1;
            if (position > size - 1) position = 0;
            changeCarousel(position)
        }

        function prevSlide() {
            position = $slider.find(".show").index() - 1;
            if (position < 0) position = size - 1;
            changeCarousel(position)
        }
        $slider.find(" > ul > li").click(function () {
            position = $(this).index();
            changeCarousel($(this).index())
        });

        function changeCarousel() {
            $slider.find(".show").removeClass("show").fadeOut();
            $slider.find("> div").eq(position).fadeIn(set.fadeSpeed).addClass("show");
            $slider.find("> ul").find(".showli").removeClass("showli");
            $slider.find("> ul > li").eq(position).addClass("showli")
        }
        return $slider
    }
})(jQuery);
$(document).ready(function () {
    $("#slider1").sliderResponsive({});
    $("#slider2").sliderResponsive({
        fadeSpeed: 300,
        autoPlay: "off",
        showArrows: "on",
        hideDots: "on"
    });
    $("#slider3").sliderResponsive({
        hoverZoom: "off",
        hideDots: "on"
    })
});
jQuery(function ($) {
    "use strict";
    var $window = $(window);
    var owl5 = $('.owl-slider');
    owl5.owlCarousel({
        loop: !0,
        items: 1,
        dots: 3,
    });
    $(window).on('beforeunload', function () {
        $(window).scrollTop(0)
    });
    $('.gallery').isotope({
        layoutMode: 'packery',
        itemSelector: '.items',
    });
    var $gallery = $('.gallery').isotope({});
    $('.filtering').on('click', 'span', function () {
        var filterValue = $(this).attr('data-filter');
        $gallery.isotope({
            filter: filterValue
        })
    });
    $('.filtering').on('click', 'span', function () {
        $(this).addClass('active').siblings().removeClass('active')
    });
    setTimeout(function () {
        $('.filtering .active').click()
    }, 2300);
    if ($("#sidemenu_toggle").length) {
        $("body").addClass("pushwrap");
        $("#sidemenu_toggle").on("click", function () {
            $(".pushwrap").toggleClass("active");
            $(".side-menu").addClass("side-menu-active"), $("#close_side_menu").fadeIn(700)
        }), $("#close_side_menu").on("click", function () {
            $(".side-menu").removeClass("side-menu-active"), $(this).fadeOut(200), $(".pushwrap").removeClass("active")
        }), $("#btn_sideNavClose").on("click", function () {
            $(".side-menu").removeClass("side-menu-active"), $("#close_side_menu").fadeOut(200), $(".pushwrap").removeClass("active")
        }), $(".side-nav .navbar-nav .nav-link").on("click", function () {
            $(".side-menu").removeClass("side-menu-active"), $("#close_side_menu").fadeOut(300)
        })
    }
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 120) {
            $('header').addClass('header-appear')
        } else {
            $('header').removeClass('header-appear')
        }
    });
    $(".scroll-top").on('click', function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top - 68
        }, 1200)
    });
    if ($(window).width() > 767) {
        $(".scroll").on('click', function (event) {
            event.preventDefault();
            $('html,body').animate({
                scrollTop: $(this.hash).offset().top - 0
            }, 1200)
        })
    } else {
        $(".scroll").on('click', function (event) {
            event.preventDefault();
            $('html,body').animate({
                scrollTop: $(this.hash).offset().top - 50
            }, 1200)
        })
    }
    $("#testimonial-slider").owlCarousel({
        dots: !0,
        autoplay: 2500,
        autoplayHoverPause: !0,
        loop: !0,
        margin: 30,
        nav: !1,
        responsive: {
            1280: {
                items: 3,
            },
            600: {
                items: 2,
                dots: !1,
            },
            320: {
                items: 1,
                dots: !1,
            },
        }
    });
    if ($(window).width() > 992) {
        $('.parallax').parallaxie({
            speed: 0.5,
            offset: 20
        })
    }
    $("#js-rotating").Morphext({
        animation: "flipInX",
        separator: ",",
        speed: 3000,
        complete: function () {}
    });
    $(".demo-banner").appear(function () {
        $('.count').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 5000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now))
                }
            })
        })
    });
    new Swiper(".blog-listing-image-slider", {
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: !0
        },
        effect: 'fade',
        autoplay: {
            delay: 3000
        }
    });
    $(".progress-bar").each(function () {
        $(this).appear(function () {
            $(this).animate({
                width: $(this).attr("aria-valuenow") + "%"
            }, 2000)
        })
    });
    (function ($, window, document, undefined) {
        $('#js-grid-mosaic-flat').cubeportfolio({
            filters: '#js-filters-mosaic-flat',
            layoutMode: 'mosaic',
            defaultFilter: '*',
            animationType: 'fadeOutTop',
            gapHorizontal: 0,
            gapVertical: 0,
            gridAdjustment: 'responsive',
            caption: 'zoom',
            displayType: 'fadeIn',
            displayTypeSpeed: 100,
            sortByDimension: !0,
            mediaQueries: [{
                width: 1500,
                cols: 4
            }, {
                width: 1100,
                cols: 4
            }, {
                width: 768,
                cols: 2
            }, {
                width: 480,
                cols: 1
            }, {
                width: 320,
                cols: 1
            }],
            lightboxDelegate: '.cbp-lightbox',
            lightboxGallery: !0,
            lightboxTitleSrc: 'data-title',
            lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
            plugins: {
                loadMore: {
                    element: '#js-loadMore-mosaic-flat',
                    action: 'click',
                    loadItems: 3
                }
            }
        }).on('initComplete.cbp', function () {
            var $this = $(this);
            if ($(".cbp-filter-item-active").attr("data-filter") === "*") {
                $("#js-loadMore-mosaic-flat").addClass("active")
            } else {
                $("#js-loadMore-mosaic-flat").removeClass("active")
            }
            $this.find(".cbp-wrapper").find(".cbp-item:not(.cbp-item-off)").each(function (index) {
                $(this).removeClass("even");
                console.log()
                var val = index + 1;
                if ($(this).css('left') !== "0px") {
                    $(this).addClass("even")
                }
            })
        }).on('onAfterLoadMore.cbp', function () {
            var $this = $(this);
            $("#js-loadMore-mosaic-flat a").addClass("d-none");
            $("#js-loadMore-mosaic-flat").addClass("active-outer");
            $this.find(".cbp-wrapper").find(".cbp-item:not(.cbp-item-off)").each(function (index) {
                $(this).removeClass("even");
                console.log()
                var val = index + 1;
                if ($(this).css('left') !== "0px") {
                    $(this).addClass("even")
                }
            })
        }).on('filterComplete.cbp', function () {
            var $this = $(this);
            if ($(".cbp-filter-item-active").attr("data-filter") === "*") {
                $("#js-loadMore-mosaic-flat").addClass("active");
                $("#js-loadMore-mosaic-flat").removeClass("d-none")
            } else {
                $("#js-loadMore-mosaic-flat").removeClass("active");
                $("#js-loadMore-mosaic-flat").addClass("d-none")
            }
            $this.find(".cbp-wrapper").find(".cbp-item:not(.cbp-item-off)").each(function (index) {
                $(this).removeClass("even");
                var val = index + 1;
                if ($(this).css('left') !== "0px") {
                    $(this).addClass("even")
                }
            })
        })
    })(jQuery, window, document);
    var owl3 = $('.owl-client');
    owl3.owlCarousel({
        loop: !0,
        dots: !1,
        items: 5,
        margin: 90,
        nav: !1,
        responsiveClass: !0,
        responsive: {
            0: {
                items: 1,
                dots: !0,
            },
            767: {
                items: 3,
                dots: !0,
            },
            1000: {
                items: 5,
            }
        }
    });
    $(".items > li:first-child .sub-items").fadeIn();
    $(".items > li:first-child >").addClass("expanded");
    $(".items > li > a").on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.hasClass("expanded")) {
            $this.removeClass("expanded")
        } else {
            $(".items a.expanded").removeClass("expanded");
            $this.addClass("expanded");
            $(".sub-items").filter(":visible").slideUp("normal")
        }
        $this.parent().children("ul").stop(!0, !0).slideToggle("normal")
    });
    var windowsize = $(window).width();
    checheight();
    $window.on("resize", function () {
        checheight()
    });

    function checheight() {
        var $smae_height = $(".equalheight");
        if ($smae_height.length) {
            if (windowsize > 767) {
                $smae_height.matchHeight({
                    property: "height",
                })
            }
        }
    }
    if ($("nav.navbar").hasClass("static-nav")) {
        $window.scroll(function () {
            var $scroll = $window.scrollTop();
            var $navbar = $(".static-nav");
            if ($scroll >= 120) {
                $navbar.addClass("bottom-fixedmenu")
            } else {
                $navbar.removeClass("bottom-fixedmenu")
            }
        })
    }
    if ($("nav.navbar").hasClass("fixed-bottom")) {
        var navHeight = $(".fixed-bottom").offset().top;
        $window.scroll(function () {
            if ($window.scrollTop() > navHeight) {
                $('.fixed-bottom').addClass('bottom-fixedmenu')
            } else {
                $('.fixed-bottom').removeClass('bottom-fixedmenu')
            }
        })
    }
    $("#banner-main").show().revolution({
        sliderType: "standard",
        sliderLayout: "fullscreen",
        scrollbarDrag: "true",
        dottedOverlay: "none",
        navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            bullets: {
                style: "",
                enable: !0,
                rtl: !1,
                hide_onmobile: !1,
                hide_onleave: !1,
                hide_under: 767,
                hide_over: 9999,
                tmp: '',
                direction: "vertical",
                space: 10,
                h_align: "right",
                v_align: "center",
                h_offset: 40,
                v_offset: 0
            },
            arrows: {
                enable: !1,
                hide_onmobile: !0,
                hide_onleave: !1,
                hide_under: 767,
                left: {
                    h_align: "left",
                    v_align: "center",
                    h_offset: 20,
                    v_offset: 30,
                },
                right: {
                    h_align: "right",
                    v_align: "center",
                    h_offset: 20,
                    v_offset: 30
                },
            },
            touch: {
                touchenabled: "on",
                swipe_threshold: 75,
                swipe_min_touches: 1,
                swipe_direction: "horizontal",
                drag_block_vertical: !1,
            }
        },
        viewPort: {
            enable: !0,
            outof: "pause",
            visible_area: "90%"
        },
        responsiveLevels: [4096, 1024, 778, 480],
        gridwidth: [1140, 1024, 750, 480],
        gridheight: [600, 500, 500, 350],
        lazyType: "none",
        parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 9000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
        },
        shadow: 0,
        spinner: "off",
        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,
        shuffle: "off",
        autoHeight: "off",
        hideThumbsOnMobile: "off",
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: !1,
        fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: !1,
        }
    });
    if ($("#main-slider-four").length) {
        $("#main-slider-four").show().revolution({
            sliderType: "standard",
            jsFileLocation: "//server.local/revslider/wp-content/plugins/revslider/public/assets/js/",
            sliderLayout: "fullscreen",
            dottedOverlay: "none",
            delay: 9000,
            navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                mouseScrollReverse: "default",
                onHoverStop: "off",
            },
            responsiveLevels: [1240, 1240, 1240, 480],
            visibilityLevels: [1240, 1240, 1240, 480],
            gridwidth: [1200, 1200, 1200, 480],
            gridheight: [800, 800, 800, 700],
            lazyType: "none",
            parallax: {
                type: "mouse+scroll",
                origo: "slidercenter",
                speed: 400,
                speedbg: 0,
                speedls: 0,
                levels: [1, 2, 3, 4, 5, 6, 7, 8, 12, 16, 47, 48, 49, 50, 51, 55]
            },
            shadow: 0,
            spinner: "off",
            stopLoop: "on",
            stopAfterLoops: 0,
            stopAtSlide: 1,
            shuffle: "off",
            autoHeight: "off",
            fullScreenAutoWidth: "off",
            fullScreenAlignForce: "off",
            fullScreenOffsetContainer: "",
            fullScreenOffset: "",
            disableProgressBar: "on",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: !1,
            fallbacks: {
                simplifyAll: "off",
                nextSlideOnWindowFocus: "off",
                disableFocusListener: !1
            }
        });
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || ("CSS" in window && "supports" in window.CSS && !window.CSS.supports("mix-blend-mode", "screen"))) {
            var bgColor = "rgba(245, 245, 245, 0.5)";
            jQuery(".rev_slider .tp-caption.tp-blendvideo[data-blendmode]").remove()
        }
        RevSliderBeforeAfter(jQuery, jQuery("#main-slider-four"), {
            arrowStyles: {
                leftIcon: "fa fa-caret-left",
                rightIcon: "fa fa-caret-right",
                size: "35",
                color: "#ffffff",
                bgColor: "transparent",
                spacing: "10",
                padding: "0",
                borderRadius: "0"
            },
            dividerStyles: {
                width: "1",
                color: "rgba(255, 255, 255, 0.5)"
            },
            onClick: {
                time: "500",
                easing: "Power2.easeOut"
            },
            cursor: "move",
            carousel: !1
        })
    }
    $("#video").show().revolution({
        sliderType: "standard",
        sliderLayout: "fullscreen",
        scrollbarDrag: "true",
        dottedOverlay: "none",
        navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            bullets: {
                enable: !1,
            },
            touch: {
                touchenabled: "on",
                swipe_threshold: 75,
                swipe_min_touches: 1,
                swipe_direction: "horizontal",
                drag_block_vertical: !1
            }
        },
        viewPort: {
            enable: !0,
            outof: "pause",
            visible_area: "90%"
        },
        responsiveLevels: [4096, 1024, 778, 480],
        gridwidth: [1140, 1024, 750, 480],
        gridheight: [600, 500, 500, 350],
        lazyType: "none",
        parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 9000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50]
        },
        shadow: 0,
        spinner: "off",
        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,
        shuffle: "off",
        autoHeight: "off",
        hideThumbsOnMobile: "off",
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: !1,
        fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: !1
        }
    });
    $("#banner-2").show().revolution({
        sliderType: "standard",
        sliderLayout: "fullscreen",
        scrollbarDrag: "true",
        dottedOverlay: "none",
        navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            bullets: {
                style: "",
                enable: !1,
                rtl: !1,
                hide_onmobile: !1,
                hide_onleave: !1,
                hide_under: 767,
                hide_over: 9999,
                tmp: '',
                direction: "vertical",
                space: 10,
                h_align: "right",
                v_align: "center",
                h_offset: 40,
                v_offset: 0
            },
            arrows: {
                enable: !1,
                hide_onmobile: !0,
                hide_onleave: !1,
                hide_under: 767,
                left: {
                    h_align: "left",
                    v_align: "center",
                    h_offset: 20,
                    v_offset: 30,
                },
                right: {
                    h_align: "right",
                    v_align: "center",
                    h_offset: 20,
                    v_offset: 30
                },
            },
            touch: {
                touchenabled: "on",
                swipe_threshold: 75,
                swipe_min_touches: 1,
                swipe_direction: "horizontal",
                drag_block_vertical: !1,
            }
        },
        viewPort: {
            enable: !0,
            outof: "pause",
            visible_area: "90%"
        },
        responsiveLevels: [4096, 1024, 778, 480],
        gridwidth: [1140, 1024, 750, 480],
        gridheight: [600, 500, 500, 350],
        lazyType: "none",
        parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 9000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
        },
        shadow: 0,
        spinner: "off",
        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,
        shuffle: "off",
        autoHeight: "off",
        hideThumbsOnMobile: "off",
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: !1,
        fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: !1,
        }
    });
    $("#rev_slider_5_1").show().revolution({
        sliderType: "standard",
        jsFileLocation: "//localhost:82/revslider/revslider/public/assets/js/",
        sliderLayout: "fullscreen",
        dottedOverlay: "none",
        delay: 9000,
        navigation: {},
        responsiveLevels: [1240, 1024, 778, 480],
        visibilityLevels: [1240, 1024, 778, 480],
        gridwidth: [1240, 1024, 778, 480],
        gridheight: [868, 768, 960, 720],
        lazyType: "none",
        parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 2000,
            speedbg: 0,
            speedls: 0,
            levels: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 55],
            disable_onmobile: "on"
        },
        shadow: 0,
        spinner: "off",
        autoHeight: "off",
        fullScreenAutoWidth: "off",
        fullScreenAlignForce: "off",
        fullScreenOffsetContainer: "",
        fullScreenOffset: "",
        disableProgressBar: "on",
        hideThumbsOnMobile: "off",
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: !1,
        fallbacks: {
            simplifyAll: "off",
            disableFocusListener: !1
        }
    })
});
if ($("#particles-js").length) {
    window.onload = function () {
        Particles.init({
            selector: '#particles-js',
            color: '#ffffff',
            connectParticles: !1,
            sizeVariations: 14,
            maxParticles: 140,
        })
    }
}


/* BG PARALLAX */

$(window).scroll(function(e){
    parallax();
  });

  function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bge').css('top',-(scrolled*0.1)+'px');
  }
  

  /* FIN BG PARALLAX */