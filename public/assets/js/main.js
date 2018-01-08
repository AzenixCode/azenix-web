/* ---------------------------------------------- /*
 * Preloader
 /* ---------------------------------------------- */
(function () {
    $(window)
        .on('load', function () {
            $('.loader').fadeOut();
            $('.page-loader')
                .delay(350)
                .fadeOut('slow');
        });

    $(document).ready(function () {

        /* ---------------------------------------------- /*
         * WOW Animation When You Scroll
         /* ---------------------------------------------- */
        wow = new WOW({mobile: false});
        wow.init();

        /* ---------------------------------------------- /*
         * Scroll top
         /* ---------------------------------------------- */
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });

        $('a[href="#totop"]').click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 'slow');
            return false;
        });

        /* ---------------------------------------------- /*
         * Initialization General Scripts for all pages
         /* ---------------------------------------------- */

        var homeSection = $('.home-section'),
            navbar = $('.navbar-custom'),
			navbarBrand = $('.navbar-brand'),
            navHeight = navbar.height(),
			caption = $('.caption-content > .azenix-title-size-1'),
            worksgrid = $('#works-grid'),
            width = Math.max($(window).width(), window.innerWidth),
            mobileTest = false;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
        }

        buildHomeSection(homeSection);
        navbarAnimation(navbar, homeSection, navHeight);
        navbarSubmenu(width);
        hoverDropdown(width, mobileTest);

        $(window).resize(function () {
            var width = Math.max($(window).width(), window.innerWidth);
            buildHomeSection(homeSection);
            hoverDropdown(width, mobileTest);
        });

        $(window).scroll(function () {
            effectsHomeSection(homeSection, this);
            navbarAnimation(navbar, homeSection, navHeight);
			navbarBrandAnimation(navbarBrand, caption);
        });

        /* ---------------------------------------------- /*
         * Set sections backgrounds
         /* ---------------------------------------------- */
        var module = $('.home-section, .module, .module-small, .side-image');
        module.each(function (i) {
            if ($(this).attr('data-background')) {
                $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
            }
        });

        /* ---------------------------------------------- /*
         * Home section height
         /* ---------------------------------------------- */
        function buildHomeSection(homeSection) {
            if (homeSection.length > 0) {
                if (homeSection.hasClass('home-full-height')) {
                    homeSection.height($(window).height());
                } else {
                    homeSection.height($(window).height() * 0.85);
                }
            }
        }

        /* ---------------------------------------------- /*
         * Home section effects
         /* ---------------------------------------------- */
        function effectsHomeSection(homeSection, scrollTopp) {
            if (homeSection.length > 0) {
                var homeSHeight = homeSection.height();
                var topScroll = $(document).scrollTop();
                if ((homeSection.hasClass('home-parallax')) && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    homeSection.css('top', (topScroll * 0.55));
                }
                if (homeSection.hasClass('home-fade') && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    var caption = $('.caption-content');
                    caption.css('opacity', (1 - topScroll / homeSection.height() * 1));
                }
            }
        }

        /* ---------------------------------------------- /*
         * Rotate
         /* ---------------------------------------------- */
        $(".rotate").textrotator({animation: "dissolve", separator: "|", speed: 3000});

        /* ---------------------------------------------- /*
         * Transparent navbar animation
         /* ---------------------------------------------- */
        function navbarAnimation(navbar, homeSection, navHeight) {
            var topScroll = $(window).scrollTop();
            if (navbar.length > 0 && homeSection.length > 0) {
                if (topScroll >= navHeight) {
                    navbar.removeClass('navbar-transparent');
                } else {
                    navbar.addClass('navbar-transparent');
                }
            }
        }
		
		/* ---------------------------------------------- /*
         * Navbar brand animation
         /* ---------------------------------------------- */
		function navbarBrandAnimation(navbarBrand, caption, captionHeight) {
			var topScroll = $(window).scrollTop();
			if (navbarBrand.length > 0 && caption.length > 0) {
				if (topScroll >= caption.offset().top + caption.height() + 10) {
					navbarBrand.fadeIn(450);
				} else {
					navbarBrand.fadeOut(450);
				}
			}
		}

        /* ---------------------------------------------- /*
         * Navbar submenu
         /* ---------------------------------------------- */
        function navbarSubmenu(width) {
            if (width > 767) {
                $('.navbar-custom .navbar-nav > li.dropdown')
                    .hover(function () {
                        var MenuLeftOffset = $('.dropdown-menu', $(this))
                            .offset()
                            .left;
                        var Menu1LevelWidth = $('.dropdown-menu', $(this)).width();
                        if (width - MenuLeftOffset < Menu1LevelWidth * 2) {
                            $(this)
                                .children('.dropdown-menu')
                                .addClass('leftauto');
                        } else {
                            $(this)
                                .children('.dropdown-menu')
                                .removeClass('leftauto');
                        }
                        if ($('.dropdown', $(this)).length > 0) {
                            var Menu2LevelWidth = $('.dropdown-menu', $(this)).width();
                            if (width - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
                                $(this)
                                    .children('.dropdown-menu')
                                    .addClass('left-side');
                            } else {
                                $(this)
                                    .children('.dropdown-menu')
                                    .removeClass('left-side');
                            }
                        }
                    });
            }
        }

        /* ---------------------------------------------- /*
         * Navbar hover dropdown on desktop
         /* ---------------------------------------------- */
        function hoverDropdown(width, mobileTest) {
            if ((width > 767) && (mobileTest !== true)) {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.d' +
                        'ropdown').removeClass('open');
                var delay = 0;
                var setTimeoutConst;
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.d' +
                            'ropdown').hover(function () {
                    var $this = $(this);
                    setTimeoutConst = setTimeout(function () {
                        $this.addClass('open');
                        $this
                            .find('.dropdown-toggle')
                            .addClass('disabled');
                    }, delay);
                }, function () {
                    clearTimeout(setTimeoutConst);
                    $(this).removeClass('open');
                    $(this)
                        .find('.dropdown-toggle')
                        .removeClass('disabled');
                });
            } else {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.d' +
                        'ropdown').unbind('mouseenter mouseleave');
                $('.navbar-custom [data-toggle=dropdown]')
                    .not('.binded')
                    .addClass('binded')
                    .on('click', function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $(this)
                            .parent()
                            .siblings()
                            .removeClass('open');
                        $(this)
                            .parent()
                            .siblings()
                            .find('[data-toggle=dropdown]')
                            .parent()
                            .removeClass('open');
                        $(this)
                            .parent()
                            .toggleClass('open');
                    });
            }
        }

        /* ---------------------------------------------- /*
         * Navbar collapse on click
         /* ---------------------------------------------- */
        $(document)
            .on('click', '.navbar-collapse.in', function (e) {
                if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                    $(this).collapse('hide');
                }
            });

        /* ---------------------------------------------- /*
         * Progress bar animations
         /* ---------------------------------------------- */
        $('.progress-bar').each(function (i) {
            $(this)
                .appear(function () {
                    var percent = $(this).attr('aria-valuenow');
                    $(this).animate({
                        'width': percent + '%'
                    });
                    $(this)
                        .find('span')
                        .animate({
                            'opacity': 1
                        }, 900);
                    $(this)
                        .find('span')
                        .countTo({from: 0, to: percent, speed: 900, refreshInterval: 30});
                });
        });

        /* ---------------------------------------------- /*
         * Video popup, Gallery
         /* ---------------------------------------------- */
        $('.video-pop-up').magnificPopup({
            type: 'iframe'
        });

        /* ---------------------------------------------- /*
         * Youtube video background
         /* ---------------------------------------------- */
         $(function(){
            $(".video-player").mb_YTPlayer();
        });

        $('#video-play').click(function(event) {
            event.preventDefault();
            if ($(this).hasClass('fa-play')) {
                $('.video-player').playYTP();
            } else {
                $('.video-player').pauseYTP();
            }
            $(this).toggleClass('fa-play fa-pause');
            return false;
        });

        $('#video-volume').click(function(event) {
            event.preventDefault();
            if ($(this).hasClass('fa-volume-off')) {
                $('.video-player').YTPUnmute();
            } else {
                $('.video-player').YTPMute();
            }
            $(this).toggleClass('fa-volume-off fa-volume-up');
            return false;
        });

        /* ---------------------------------------------- /*
         * Funfact Count-up
         /* ---------------------------------------------- */
        $('.count-item').each(function (i) {
            $(this)
                .appear(function () {
                    var number = $(this)
                        .find('.count-to')
                        .data('countto');
                    $(this)
                        .find('.count-to')
                        .countTo({from: 0, to: number, speed: 1200, refreshInterval: 30});
                });
        });

        /* ---------------------------------------------- /*
         * Scroll Animation
         /* ---------------------------------------------- */
        $('.section-scroll').bind('click', function (e) {
            var anchor = $(this);
            $('html, body')
                .stop()
                .animate({
                    scrollTop: $(anchor.attr('href'))
                        .offset()
                        .top - 50
                }, 1000);
            e.preventDefault();
        });

        /*===============================================================
         Working Contact Form
         ================================================================*/
         $("#contactForm").submit(function (e) {

            e.preventDefault();
            var $ = jQuery;

            var postData = $(this).serializeArray(),
                formURL = $(this).attr("action"),
                $cfResponse = $('#contactFormResponse'),
                $cfsubmit = $("#cfsubmit"),
                cfsubmitText = $cfsubmit.text();

            $cfsubmit.text("Sending...");


            $.ajax(
                {
                    url: formURL,
                    type: "POST",
                    data: postData,
                    success: function (data) {
                        $cfResponse.html(data);
                        $cfsubmit.text(cfsubmitText);
                        $('#contactForm input[name=name]').val('');
                        $('#contactForm input[name=email]').val('');
                        $('#contactForm textarea[name=message]').val('');
                    },
                    error: function (data) {
                        alert("Error occurd! Please try again");
                    }
                });

            return false;
        });
    });
})(jQuery);
