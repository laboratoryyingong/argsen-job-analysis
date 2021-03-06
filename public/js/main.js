var programId = 1; //default program id = 1

(function($) {
    "use strict";
    $(function(){

        var loadData = function (programId) {

            var programPath = null;
            var linkedinPath = null;

            switch (programId) {
                case 1:
                    programPath = '/public/data/data/Bachelor of Information Technology (Software Development) -summary.json';
                    linkedinPath = '/public/data/data/linkedin.json';
                    break;
                case 2:
                    programPath = '/public/data/data/Bachelor of Education (Early Childhood) - summary.json';
                    linkedinPath = null;
                    break;
                case 3:
                    programPath = '/public/data/data/Bachelor of Nursing (Mount Gambier) - summary.json';
                    linkedinPath = null;
                    break;
                case 4:
                    programPath = '/public/data/data/Bachelor of Commerce (Accounting) - summary.json';
                    linkedinPath = null;
                    break;

                default:
                    break;
            }

            $.getJSON(programPath, function (data) {

                /**
                 * @description: program block
                 */
                var program = data["Program"][0];

                $("#program-name").text(program["Program name"]);
                $("#current-date").text(Date().split("GMT")[0]);

                $("#total-number-of-course").text("The number of courses in the program : " + program["The number of courses in the program"]);

                $("#program-table").empty();

                for (var i = 0; i < program["The list of course names"].length; i++) {
                    var tr = '<tr class="table-row">' +
                        '<td class="left col-2">' +
                        '<span>' + (i + 1) + '</span>' +
                        '</td>' +
                        '<td class="left col-1">' +
                        '<span>' + program["The list of course names"][i] + '</span>' +
                        '</td>' +
                        '</tr>';

                    $("#program-table").append(tr);
                }

                var words = [];
                for (var i = 0; i < program["Program category"].length; i++) {
                    var item = { text: program["Program category"][i], weight: Math.random() % 5 }
                    words.push(item);
                }

                $('#program-category').empty();

                $('#program-category').jQCloud(words, {
                    width: 350,
                    height: 350,
                    autoResize: true
                });

                /**
                 * @description: jobs block
                 */
                var job = data["Job"][0];
                $("#total-number-of-job").text("The total number of jobs : " + job["The total number of jobs"]);

                var chartDataClassification = {
                    labels: [],
                    series: []
                }

                for (var i = 0; i < job["Job distribution by job classification"].length; i++) {
                    chartDataClassification.labels.push(job["Job distribution by job classification"][i][0]);
                    chartDataClassification.series.push(job["Job distribution by job classification"][i][1]);
                }

                new Chartist.Bar('#job-classification', chartDataClassification, {
                    distributeSeries: true,
                    width: "700px",
                    height: "400px",
                    plugins: [
                        Chartist.plugins.ctBarLabels()
                    ]
                });

                var chartDataStates = {
                    labels: [],
                    series: []
                }

                for (var i = 0; i < job["Job distribution by states"].length; i++) {
                    chartDataStates.labels.push(job["Job distribution by states"][i][0]);
                    chartDataStates.series.push(job["Job distribution by states"][i][1]);
                }

                new Chartist.Bar('#job-states', chartDataStates, {
                    distributeSeries: true,
                    width: "700px",
                    height: "400px",
                    plugins: [
                        Chartist.plugins.ctBarLabels()
                    ]
                });

                var jobWords = [];
                var item = { text: job["job category"], weight: Math.random() % 5 }
                jobWords.push(item);

                $("#job-category").empty();

                $("#job-category").jQCloud(jobWords, {
                    width: 350,
                    height: 350,
                    autoResize: true
                });

                $("#job-seek").empty();
                var tr = '<tr class="table-row">' +
                    '<td class="left col-2">' +
                    '<span>' + job["seek"]["name"] + '</span>' +
                    '</td>' +
                    '<td class="col-2">' +
                    '<a href="' + job["seek"]["url"] + '" target="_blank">' + 'Click to review' + '</a>' +
                    '</td>' +
                    '</tr>';

                $("#job-seek").append(tr);

                /**
                 * @description: linkedin block
                 */

                var matching = data["Matching"][0];

                $("#matching-title").text("Program : " + program["Program name"] + " vs. " + job["The total number of jobs"] + " " + job["job category"] + " jobs");

                $("#matched-hard-skills-overall").empty();

                for (var i = 0; i < matching["Hard skills"]["Matched hard skills (Overall)"].length; i++) {

                    var status = matching["Hard skills"]["Matched hard skills (Overall)"][i][1] === 0 ? true : false;

                    if (status) {
                        var tr = '<tr class="table-row">' +
                            '<td class="left col-1">' +
                            '<span>' + matching["Hard skills"]["Matched hard skills (Overall)"][i][0] + '</span>' +
                            '</td>' +
                            '<td class="col-2">' +
                            '<div class="bg-green">neutral</div>' +
                            '</td>' +
                            '</tr>';
                    } else {
                        var tr = '<tr class="table-row">' +
                            '<td class="left col-1">' +
                            '<span>' + matching["Hard skills"]["Matched hard skills (Overall)"][i][0] + '</span>' +
                            '</td>' +
                            '<td class="col-2">' +
                            '<div class="bg-yellow">beyond</div>' +
                            '</td>' +
                            '</tr>';

                    }

                    $("#matched-hard-skills-overall").append(tr);
                }

                $("#unmatched-hard-skills-overall").empty();

                for (var i = 0; i < matching["Hard skills"]["Unmatched hard skills (Overall)"].length; i++) {

                    var tr = '<tr class="table-row">' +
                        '<td class="left col-1">' +
                        '<span>' + matching["Hard skills"]["Unmatched hard skills (Overall)"][i] + '</span>' +
                        '</td>' +
                        '<td class="col-2">' +
                        '<div class="bg-red">Unmatched</div>' +
                        '</td>' +
                        '</tr>';

                    $("#unmatched-hard-skills-overall").append(tr);
                }

                $("#matched-soft-skills-overall").empty();

                for (var i = 0; i < matching["Soft skills"]["Matched soft skills (Overall)"].length; i++) {

                    var status = matching["Soft skills"]["Matched soft skills (Overall)"][i][1] === 0 ? true : false;

                    if (status) {
                        var tr = '<tr class="table-row">' +
                            '<td class="left col-1">' +
                            '<span>' + matching["Soft skills"]["Matched soft skills (Overall)"][i][0] + '</span>' +
                            '</td>' +
                            '<td class="col-2">' +
                            '<div class="bg-green">neutral</div>' +
                            '</td>' +
                            '</tr>';
                    } else {
                        var tr = '<tr class="table-row">' +
                            '<td class="left col-1">' +
                            '<span>' + matching["Soft skills"]["Matched soft skills (Overall)"][i][0] + '</span>' +
                            '</td>' +
                            '<td class="col-2">' +
                            '<div class="bg-yellow">beyond</div>' +
                            '</td>' +
                            '</tr>';

                    }

                    $("#matched-soft-skills-overall").append(tr);
                }

                $("#unmatched-soft-skills-overall").empty();

                for (var i = 0; i < matching["Soft skills"]["Unmatched soft skills (Overall)"].length; i++) {

                    var tr = '<tr class="table-row">' +
                        '<td class="left col-1">' +
                        '<span>' + matching["Soft skills"]["Unmatched soft skills (Overall)"][i] + '</span>' +
                        '</td>' +
                        '<td class="col-2">' +
                        '<div class="bg-red">Unmatched</div>' +
                        '</td>' +
                        '</tr>';

                    $("#unmatched-soft-skills-overall").append(tr);
                }



            });

            if (linkedinPath) {

                $("#linkedin-section").show();

                $.getJSON(linkedinPath, function (data) {

                    /**
                     * @description: linkedin block
                     */

                    var linkedin = data["details"];

                    $("#total-number-of-linkedin").text("Total number of LinkedIn Profiles :" + data.summary.list.length);

                    $("#linkedin-table").empty();

                    for (var i = 0; i < linkedin.length; i++) {

                        var sub = '';

                        for (var j = 0; j < linkedin[i]["working-experience"].length; j++) {
                            sub += '<p>' + linkedin[i]["working-experience"][j]["company"] + ':' + linkedin[i]["working-experience"][j]["period"] + '</p>';
                        }

                        var tr = '<tr class="table-row">' +
                            '<td class="left col-2">' +
                            '<span>' + linkedin[i]["name"] + '</span>' +
                            '</td>' +
                            '<td class="left col-2">' +
                            '<span>' + linkedin[i]["status"] + '</span>' +
                            '</td>' +
                            '<td class="left col-3">' +
                            '<span>' + linkedin[i]["degree"] + '</span>' +
                            '</td>' +
                            '<td class="left col-4">' +
                            '<span>' + sub + '</span>' +
                            '</td>' +
                            '</tr>';

                        $("#linkedin-table").append(tr);
                    }

                    var linkedinChartData = {
                        labels: ["work in top 500", "not work in top 500", "unknown"],
                        series: [0, 0, 0]
                    }

                    for (var i = 0; i < data.summary.list.length; i++) {
                        switch (data.summary.list[i].status) {
                            case "True":
                                linkedinChartData.series[0]++;

                                break;
                            case "False":
                                linkedinChartData.series[1]++;

                                break;
                            case "Undefined":
                                linkedinChartData.series[2]++;

                                break;
                            default:
                                break;
                        }
                    }

                    new Chartist.Bar('#fortune-500-chart', linkedinChartData, {
                        distributeSeries: true,
                        plugins: [
                            Chartist.plugins.ctBarLabels()
                        ]
                    });

                    /**
                     * @description: linkedin example block 1
                     */

                    var chart = new Chartist.Line('#linkein-example-1', {
                        labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
                        // Naming the series with the series object array notation
                        series: [{
                            name: 'series-1',
                            data: [1, 2.5, 5, 5, 10, 10, 12, 12]
                        }]
                    }, {
                            axisY: {
                                labelInterpolationFnc: function (value, index) {

                                    switch (value) {
                                        case 2.5:
                                            return "IBM (Contract)";
                                            break;
                                        case 5:
                                            return "HP Australia";
                                            break;
                                        case 10:
                                            return "Dodo Services";
                                            break;
                                        case 12.5:
                                            return "M2 Telecommunications Group Ltd";
                                            break;

                                        default:
                                            break;
                                    }
                                }
                            },
                            width: "800px",
                            height: "400px",
                            fullWidth: true,
                            // Within the series options you can use the series names
                            // to specify configuration that will only be used for the
                            // specific series.
                            series: {
                                'series-1': {
                                    lineSmooth: Chartist.Interpolation.step()
                                },
                                'series-2': {
                                    lineSmooth: Chartist.Interpolation.simple(),
                                    showArea: true
                                },
                                'series-3': {
                                    showPoint: false
                                }
                            }
                        }, [
                            // You can even use responsive configuration overrides to
                            // customize your series configuration even further!
                            ['screen and (max-width: 320px)', {
                                series: {
                                    'series-1': {
                                        lineSmooth: Chartist.Interpolation.none()
                                    },
                                    'series-2': {
                                        lineSmooth: Chartist.Interpolation.none(),
                                        showArea: false
                                    },
                                    'series-3': {
                                        lineSmooth: Chartist.Interpolation.none(),
                                        showPoint: true
                                    }
                                }
                            }]
                        ]);

                });

            } else {
                $("#linkedin-section").hide();
            }

        }

        loadData(programId);

        //bind event
        $("#submit-program-id").on("click", function(event){
            event.preventDefault();

            var selected = $(".sbSelector").text();

            switch (selected) {
                case "Bachelor of Information Technology (Software Development)":
                    programId = 1;
                    break;
                case "Bachelor of Education (Early Childhood) - summary":
                    programId = 2;
                    break;
                case "Bachelor of Nursing (Mount Gambier) - summary":
                    programId = 3;
                    break;
                case "Bachelor of Commerce (Accounting) - summary":
                    programId = 4;
                    break;
            
                default:
                    break;
            }

            loadData(programId);
            
        });

        //accordion action panel
        $('.accordion .panel .panel-heading').on('click', function() {
            var accor = $(this).closest('.accordion');
            var accor_panel = $(this).parent();
            if (accor_panel.hasClass('active')){
                accor_panel.removeClass('active');
            } else{
                if ($('.panel-title a.accordion-toggle').hasClass('collapsed')) {
                    $('.panel', accor).removeClass('active');
                    accor_panel.addClass('active');
                } else{
                    accor_panel.removeClass('active');
                }
            }
        });

        // AMIMATED NUMBER
        $('.progress-bar-number').appear(function(){
            setTimeout(function(){
                $('.progress-bar-number .num').countTo();
            },1000);
        });

        $('.pricing').appear(function(){
            setTimeout(function(){
                $('.pricing .inner-number').countTo();
            },1000);
        });

        // BACK TOP
        $('#back-top a').on('click', function () {
            $('body,html').animate({
                scrollTop: 0
            }, 700);
            return false;
        });
        // -------------------------------------//

        // SHOW BUTTON BACK TOP WHEN SCROLL DOWN
        var temp = $(window).height();
        $(window).scroll(function () {
            if ($(window).scrollTop() > temp){
                $('#back-top a').addClass('show');
                $('#back-top a').removeClass('hide');
            }
            else {
                $('#back-top a').addClass('hide');
                $('#back-top a').removeClass('show');
            }
        });
        // -------------------------------------//

        // WOW JS
        new WOW().init();
        // -------------------------------------//

        // CHANGE SELECTBOX
        $(".selectbox").selectbox();
        // -------------------------------------//

        // SHOW - HIDE - BOX SEARCH ON MENU
        $('.button-search').on('click', function () {
            $('.nav-search').toggleClass('hide');
        });
        // HIDE BOX SEARCH WHEN CLICK OUTSIDE
        if ($(window).width() > 767){
            $('body').on('click', function (event) {
                if ($('.button-search').has(event.target).length == 0 && !$('.button-search').is(event.target)
                    && $('.nav-search').has(event.target).length == 0 && !$('.nav-search').is(event.target)) {
                    if ($('.nav-search').hasClass('hide') == false) {
                        $('.nav-search').toggleClass('hide');
                    };
                }
            });
        }
        // -------------------------------------//

        // HEADER FIXED WHEN SCROLL
        if ($('.header-main').hasClass('homepage-01')) {
            if ($(window).width() > 767) {
                var topmenu = $(".header-topbar").height();

                $(window).scroll(function () {
                    if ($(window).scrollTop() > topmenu) {
                        $(".header-main.homepage-01").addClass('header-fixed');
                    }
                    else {
                        $(".header-main.homepage-01").removeClass('header-fixed');
                    };
                });
            }
            else {
                var offset = 117;

                $(window).scroll(function () {
                    if ($(window).scrollTop() > offset) {
                        $(".header-main.homepage-01").addClass('header-fixed');
                    }
                    else {
                        $(".header-main.homepage-01").removeClass('header-fixed');
                    }
                });
            }
        }
        else if ($('.header-main').hasClass('homepage-02')) {
            var $topmenu = $(".choose-course-2"),
                offset = $topmenu.offset();

            $(window).scroll(function () {
                if ($(window).scrollTop() > offset.top - 1) {
                    $(".header-main.homepage-02").addClass('header-fixed');
                }
                else {
                    $(".header-main.homepage-02").removeClass('header-fixed');
                }
            });

            // button scroll
            $('.arrow-down').click(function () {
                $('html, body').animate({
                    scrollTop: $(".choose-course-2").offset().top
                }, 1000);
            });
        }
        else if ($('.header-main').hasClass('homepage-03')) {
            var $topmenu = $(".section.slider-banner-03"),
                offset = $topmenu.offset();

            $(window).scroll(function () {
                if ($(window).scrollTop() > offset.top) {
                    $(".header-main.homepage-03").addClass('header-fixed');
                }
                else {
                    $(".header-main.homepage-03").removeClass('header-fixed');
                }
            });
        }
        // -------------------------------------//

        // SHOW HIDE MENU WHEN SCROLL DOWN - UP
        if ($(window).width() <= 1024) {
            var lastScroll = 50;
            $(window).scroll(function (event) {
                //Sets the current scroll position
                var st = $(this).scrollTop();
                //Determines up-or-down scrolling
                if (st > lastScroll) {
                    //Replace this with your function call for downward-scrolling
                    $('.header-main').addClass('hide-menu');
                }
                else {
                    //Replace this with your function call for upward-scrolling
                    $('.header-main').removeClass('hide-menu');
                }

                if ($(window).scrollTop() == 0 ){
                    $('.header-main').removeClass('.header-fixed').removeClass('hide-menu');
                };
                //Updates scroll position
                lastScroll = st;
            });
        }
        $(window).scroll(function (event) {
            // hide dropdown menu when scroll
            if ($('.navbar-collapse').hasClass('in')) {
                $('.edugate-navbar').click();
            }

            // overflow scroll when screen small
            if ($(window).scrollTop() < 52) {
                var screen_height = $(window).height() - $('.header-main').height() - $('.header-topbar').height(),
                    navigation = $('.navigation').height();
                $('.navigation').css('max-height', screen_height - 20);
                if (navigation > screen_height) {
                    $('.navigation').addClass('scroll-nav');
                }
            }
            else {
                var screen_height = $(window).height() - $('.header-main').height(),
                    navigation = $('.navigation').height();
                $('.navigation').css('max-height', screen_height - 30);
                if (navigation > screen_height) {
                    $('.navigation').addClass('scroll-nav');
                }
            }

            // close dropdown sub menu
            var st2 = $(this).scrollTop();
            if (st2 > 0) {
                //Replace this with your function call for downward-scrolling
                $('.navigation').find('.dropdown').removeClass('open');
            };

        });
        // show hide dropdown menu
        if ($(window).width() <= 767) {
            $('.nav-links>.dropdown>a').on('click', function(){
                if ($(this).parent().find('.edugate-dropdown-menu-1').hasClass('dropdown-focus') == true) {
                    $(this).parent().find('.edugate-dropdown-menu-1').removeClass('dropdown-focus');
                }
                else {
                    $('.nav-links .dropdown .edugate-dropdown-menu-1').removeClass('dropdown-focus');
                    $(this).parent().find('.edugate-dropdown-menu-1').addClass('dropdown-focus');
                }
            });
            $('.edugate-dropdown-menu-1 .dropdown>a').on('click', function(){
                $(this).parent().find('.edugate-dropdown-menu-2:first').toggleClass('dropdown-focus');
            });

            $('body').click(function (event) {
                if ( $('.nav-links').has(event.target).length == 0 && !$('.nav-links').is(event.target)) {
                    if ($('.dropdown-menu').hasClass('dropdown-focus')) {
                        $('.dropdown-menu').removeClass('dropdown-focus');
                    }
                }

                if (
                    $('.edugate-navbar').has(event.target).length == 0 && !$('.edugate-navbar').is(event.target)
                    && $('.navigation').has(event.target).length == 0 && !$('.navigation').is(event.target)
                ) {
                    if ($('.navbar-collapse').hasClass('in')) {
                        $('.edugate-navbar').click();
                    }
                }
            });
        }

        // -------------------------------------//
        // THEME SETTING
        $('.theme-setting > a.btn-theme-setting').on('click', function(){
            if($('.theme-setting').css('left') < '0'){
                $('.theme-setting').css('left', '0');
            } else {
                $('.theme-setting').css('left', '-220px');
            }
        });

        var list_color = $('.theme-setting > .content-theme-setting > ul.color-skins > li');

        var setTheme = function (color) {
            $('#color-skins').attr('href', 'assets/css/'+ color + '.css');
            $('.logo .header-logo img').attr('src', 'assets/images/logo-' + color + '.png');    
            setTimeout(function(){
                $('.theme-loading').hide();
            }, 1000);
        };

        list_color.on('click', function() {
            list_color.removeClass("active");
            $(this).addClass("active");
            $('.theme-loading').show();
            setTheme($(this).attr('data-color'));
            Cookies.set('color-skin', $(this).attr('data-color'));
        });
    });

    // set height and width
    var shw_set_height_width = function() {
        // set width for section search
        $('.search-input .form-input').width($('.container').width() - ($('.form-select').width()*3) - 115 );

        if ($(window).width() > 767) {
            // slider banner 1
            $('.slider-banner').height($(window).height() - $('header').height() + 1);
            $('.slider-banner .slider-item').height($(window).height() - $('header').height() + 1);
            // slider banner 3
            $('.slider-banner-03').height($(window).height() - $('header').height() + 1);
        }

        // set height for page 03
        var height_page03 = $('.choose-course-3 .item-course').height();
        $('.choose-course-3').find('.item-course').height( height_page03);

    };

    // owl carousel for ....
    var shw_slider_carousel = function() {
         // owl carousel slider banner
        $('.slider-banner').owlCarousel({
            margin: 0,
            loop: true,
            //lazyLoad: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav: false,
            responsiveClass: true,
            autoplay:true,
            autoplayTimeout: 7000,
            smartSpeed: 800,
            responsive: {
                0: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });

         // owl carousel event-detail-list-staff
        $('.event-detail-list-staff').owlCarousel({
            margin: 30,
            loop: true,
            nav: false,
            responsiveClass: true,
            autoplay:true,
            autoplayTimeout: 7000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                600: {
                    items: 2
                },
                768: {
                    items: 3,
                    margin: 15
                },
                1024: {
                    items: 3
                }
            }
        });

        // owl carousel top courses
        $('.top-courses-slider').owlCarousel({
            margin: 30,
            loop: true,
            nav: false,
            responsiveClass: true,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                1024: {
                    items: 1
                },
                1025: {
                    items: 2
                }
            }
        });
        // button click slider top courses
        $('.group-btn-top-courses-slider .btn-prev').on('click', function(){
            $('.top-courses-slider .owl-prev').click();
        });
        $('.group-btn-top-courses-slider .btn-next').on('click', function(){
            $('.top-courses-slider .owl-next').click();
        });

        // owl carousel slider logos
        $('.carousel-logos').owlCarousel({
            margin: 115,
            loop: true,
            //lazyLoad: true,
            nav: false,
            autoplay:true,
            autoplayTimeout: 5000,
            smartSpeed: 1500,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2,
                    margin: 30,
                },
                320: {
                    items: 3,
                    margin: 40,
                },
                480: {
                    items: 3,
                    margin: 50,
                },
                600: {
                    items: 4,
                    margin: 90,
                },
                768: {
                    items: 5,
                    margin: 60,
                },
                1024: {
                    items: 5,
                    margin: 90,
                },
                1025: {
                    items: 6
                }
            }
        });

        // owl carousel slider best staff
        $('.best-staff-content').owlCarousel({
            margin: 30,
            loop: true,
            nav: false,
            responsiveClass: true,
            //autoplay:true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1,
                    margin: 15,
                },
                400: {
                    items: 2,
                    margin: 15,
                },
                768: {
                    items: 3
                },
                1024: {
                    items: 3
                },
                1025: {
                    items: 4
                }
            }
        });
        // button click slider best staff
        $('.best-staff .group-btn-slider .btn-prev').on('click', function(){
            $('.best-staff .owl-prev').click();
        });
        $('.best-staff .group-btn-slider .btn-next').on('click', function(){
            $('.best-staff .owl-next').click();
        });

        // responsive for section pricing when screen < 768
        if ($(window).width() <= 768){
            $('.pricing-wrapper').owlCarousel({
                margin: 15,
                loop: true,
                nav: false,
                responsiveClass: true,
                smartSpeed: 1000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0,
                    },
                    636: {
                        items: 2
                    },
                    768: {
                        items: 2
                    }
                }
            });

            $('.event-detail-content .row').owlCarousel({
                margin: 15,
                loop: true,
                nav: false,
                responsiveClass: true,
                smartSpeed: 1000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    768: {
                        items: 2
                    }
                }
            });
        };
        // button click slider
        $('.pricing .group-btn-slider .btn-prev').on('click', function(){
            $('.pricing-wrapper .owl-prev').click();
        });
        $('.pricing .group-btn-slider .btn-next').on('click', function(){
            $('.pricing-wrapper .owl-next').click();
        });

        // Responsive for Progress bar when screen < 767
        if ($(window).width() <= 767){
            $('.progress-bar-wrapper .content').owlCarousel({
                margin: 0,
                loop: true,
                nav: false,
                responsiveClass: true,
                smartSpeed: 1000,
                responsive: {
                    0: {
                        items: 2,
                        margin: 15,
                    },
                    480: {
                        items: 2,
                        margin: 15,
                    },
                    600: {
                        items: 3
                    },
                    767: {
                        items: 3
                    }
                }
            });
        };
        // button click slider
        $('.progress-bars .group-btn-slider .btn-prev').on('click', function(){
            $('.progress-bars .owl-prev').click();
        });
        $('.progress-bars .group-btn-slider .btn-next').on('click', function(){
            $('.progress-bars .owl-next').click();
        });
    };

    // Responsive for table
    var shw_responsive_table = function() {
        $(".table-body").scroll(function ()
        {
            $(".table-header").offset({ left: -1*this.scrollLeft + 15});
        });

        $(".course-table").height($(".inner-container").height());
        $(".course-table").width($(".inner-container").width());
    };

    $(document).ready(function() {
        shw_set_height_width();
    });

    $(window).load(function() {
        shw_slider_carousel();
        shw_responsive_table();

    });

    $(window).resize(function() {
        shw_set_height_width();
    });

})(jQuery);

