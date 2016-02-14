function setPopupWimdowMargin() {
    $('.popup_window').each(function() {
        $(this).css({
            'margin-top': - $(this).outerHeight() / 2,
            'margin-left': - $(this).outerWidth() / 2
        });
    });
}

$(document).ready(function(){
// нестандартный селект
    $(".my_select_box").chosen({
        disable_search_threshold: 0
    });

// вызов попапов
	$('.popup_registration').each(function(){
		var $this = $(this),
            loginPopup = $('.loginPopup'),
            buttonLogin = $('.buttonLogin'),
            buttonRegistration = $('.buttonRegistration'),
            passwordHint = $('.form-password-hint');

        setPopupWimdowMargin();
        $(window).resize(setPopupWimdowMargin);
        

        loginPopup.click(function(event){
            event.preventDefault();
            $(this).parent().addClass('active');
            $('#popup_block').addClass('show_popup');
            $('#popup_fone').addClass('popup_fone-active');
            $('.popup-entry').addClass('window-active');
            $('.popup-entry').addClass('active');
            $('.popup-entry').addClass('popup_transition');
        });

        $('#registr_close, #popup_fone, .popupClose, .popup-wrap').on('click', function(event){
            event.preventDefault();
            $('#popup_block').removeClass('show_popup');
            $('.loginPopup').parent().removeClass('active');
            buttonRegistration.removeClass('active');
            $('.popup-entry').removeClass('active');
            $('.popup_registration').removeClass('active');
            $('.popup_window').removeClass('window-active');
            $('#popup_fone').removeClass('popup_fone-active');
            $('.popup-entry').removeClass('popup_transition');
        });

        $('.popup_window').on('click', function(event){
            event.stopPropagation();
        });



    // Переходы
        buttonLogin.on('click', function(event){
            event.preventDefault();
            $(this).closest('.popup_window').removeClass('window-active active').siblings('.popup-entry').addClass('window-active active');
        });
        buttonRegistration.on('click', function(event){
            event.preventDefault();
            $(this).closest('.popup_window').removeClass('window-active active').siblings('.popup_registration').addClass('window-active active');
            $('.popup-entry').removeClass('popup_transition');
        });
        passwordHint.on('click', function(event){
            event.preventDefault();
            $(this).closest('.popup_window').removeClass('window-active active').siblings('.popup_password').addClass('window-active active');
            $('.popup-entry').removeClass('popup_transition');
        });

    });


// валидность
	$('.validateForm').each(function(){
		var $this = $(this),
            $inpMail = $('.input_mail', $this);

        $inpMail.on('change', function(){
            checkmail($(this).val());
        });

        function checkmail(value) {
            var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
  
            if ( !value.match(reg) ) {
                $inpMail.addClass('error');
                return false;
            } else {
                $inpMail.addClass('complete');
                $inpMail.removeClass('error');
            };            
        };

        $('.exampleInputPhone').inputmask("+7 (999)-999-99-99",
            {
                "placeholder": "+7 (___)-___-__-__",
                showMaskOnFocus: true,
                showMaskOnHover: false,
                onincomplete: function(){
                    $(this).val('');
                }
            }
        );


        $('.exampleInputData').inputmask("dd/mm/yyyy", 
            { 
                "placeholder": "дд мм гггг",
                showMaskOnFocus: true,
                showMaskOnHover: false,
                onincomplete: function(){
                    $(this).val('');
                }
            }
        );
	});

// Слайдер мы рядом
    $('.carousel').carousel({
        interval: false
    });
// Карта мы рядом
    $('.location-list').on('click', '> li', function(){
        $(this).closest('.location-block').addClass('mapOpen');
    });
    $('.map-overlay-close').on('click', function(){
        $(this).closest('.location-block').removeClass('mapOpen');
    });
// Inputs male
    $('.events-registration-form').each(function(){
        var $this = $(this),
            radioButton = $('.input-radio-wrap', $this),
            checkBox = $('.input-checkbox-wrap', $this),
            eventsQuestionHint = $('.ico-events-question-hint', $this),
            block = false,
            speed = 400;

        radioButton.on('click', function(){
            $(this).addClass('checkedRadio').closest('.input-radio-wrap').siblings('.input-radio-wrap').removeClass('checkedRadio');
        });
        checkBox.on('click', 'input', function(){
            if( block ) return false; 
                block = true;

            $(this).closest('.input-checkbox-wrap').siblings('.events-registration-row').fadeToggle(speed, function(){
                block = false;
            });

            var eventsRegistration = $(this).closest('.input-checkbox-wrap').siblings('.events-registration-row'),
                hintHeight = eventsRegistration.find('.events-question-hint').outerHeight(),
                icoHeught = eventsRegistration.find('.ico-arrow-question-hint').outerHeight(),
                posTopHint = -(hintHeight / 2 - icoHeught / 2);
            eventsRegistration.find('.events-question-hint').css('top', posTopHint);

        });
        eventsQuestionHint.on('click', function(){
            if( block ) return false; 
                block = true;

            $(this).find('.events-question-hint').fadeToggle(speed, function(){
                block = false;
            });
        });
    });

// подключение лайтбокса
    $('.lightBoxWrap').each(function(){
        var $this = $(this);
        $('.lightBox', $this).lightBox({
            imageBtnClose: 'img/lightbox-btn-close.gif',
            imageLoading: 'img/lightbox-ico-loading.gif'
        });
    });

});
;jQuery(function ($) {
    if (window.ymaps === undefined) return;

    ymaps.ready(init);

    function init() {
        var myMap,
            balloonConfig = {
                iconImageSize: [26, 32],
                iconImageOffset: [-15, -36],
                balloonCloseButton: true,
                balloonMaxWidth: 350,
                hideIconOnBalloonOpen: false,
                balloonOffset: [0, -35]
            };

        var busPlacemark = new ymaps.Placemark([55.656336, 37.355189], {
                    hintContent: "платформа Переделкино",
                    balloonContent:"<p>Для удобства гостей &laquo;Бадминтон Клуб&raquo; работает бесплатный автобус</p> <p>Маршрут следования:<br> &laquo;Переделкино&raquo; - &laquo;Бадминтон клуб&raquo;<br> &laquo;Мичуринец&raquo; - &laquo;Бадминтон Клуб&raquo; </p>"
                }, $.extend({}, balloonConfig, {iconImageHref: "../img/bus_icon.png"})
            ),
            busPlacemark1 = new ymaps.Placemark([55.646217, 37.315106], {
                    hintContent: "платформа Мичуринец",
                    balloonContent: "<p>Для удобства гостей &laquo;Бадминтон Клуб&raquo; работает бесплатный автобус</p> <p>Маршрут следования:<br> &laquo;Переделкино&raquo; - &laquo;Бадминтон клуб&raquo;<br> &laquo;Мичуринец&raquo; - &laquo;Бадминтон Клуб&raquo; </p>"
                }, $.extend({}, balloonConfig, {iconImageHref: "../img/bus_icon.png"})
            ),
            addressPlacemark = new ymaps.Placemark([55.647541, 37.329481], {
                    hintContent: "Бадминтон Клуб",
                    balloonContent: "<p>Московская область, Ленинский район, посёлок Мичуринец, ул. Энгельса д.8Ю</p> <p>тел. 8(905)585-21-54 </p><p>Email: <a href=\"mailto:info@michsport.ru\">info@michsport.ru</a></p>"
                }, $.extend({}, balloonConfig, {iconImageHref: "../img/address_icon.png"})
            ),
            map = $('#map'),
            mapOverlayCanvas = $('#map-canvas'),
            mapSwitch1 = $('.list-item-1'),
            mapSwitch2 = $('.list-item-2');

        mapSwitch2.click(function () {
            myMap.geoObjects.remove(addressPlacemark).add(busPlacemark).add(busPlacemark1);
            busPlacemark1.balloon.open();
        });

        mapSwitch1.click(function () {
            myMap.geoObjects.remove(busPlacemark).remove(busPlacemark1).add(addressPlacemark);
            addressPlacemark.balloon.open();
        });

        $(".map-overlay-close").click(function () {
            var $this = $(this);
            mapOverlayCanvas.css('z-index', 2);
            map.css('z-index', -1);
            assignCanvasHandlers();
            clearInterval(drawInterval);
            var center = getCircleImgPosition(clickedItem);
            drawConcentricCircles(center.left, center.top, 2500, 1500, true);

        });

        myMap = new ymaps.Map("map", {
            center: [55.651217, 37.315100],
            zoom: 14
        });

        myMap.controls.add("zoomControl", {left: 5, top: 5});

        mapOverlayCanvas.attr('width', window.innerWidth);
        mapOverlayCanvas.attr('height', parseInt(mapOverlayCanvas.css('height'), 10));

        var context = mapOverlayCanvas[0].getContext('2d');
        var drawInterval,
            clickedItem;

        //Функции для рисования окружностей
        function drawEmptyCircle(x, y, r) {
            context.fillStyle = "#f30";
            context.globalCompositeOperation = "destination-out";
            context.beginPath();
            context.arc(x, y, r, 0, Math.PI * 2);
            context.fill();
        }

        function clearRect() {
            context.globalCompositeOperation = "source-over";
            context.fillStyle = '#F6F8F9';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        }

        function drawConcentricCircles(x, y, maxR, duration, inside, minR) {
            var minR = minR || 0,
                r = inside ? maxR : minR,
                frameRate = 60,
                radiusIncrement = maxR / (duration / frameRate);
            var interval = setInterval(function () {
                r = inside ? r - radiusIncrement : r + radiusIncrement;

                if (r >= maxR || r <= minR + 0.001) {
                    if (r <= 0) clearRect();
                    clearInterval(interval);
                    return;
                }
                clearRect();
                drawEmptyCircle(x, y, r);

            }, duration / frameRate);
            return interval;
        }

        function getCircleImgPosition(container) {
            var img = container.find('img'),
                isMacOsChrome = navigator.appVersion.indexOf('Mac OS') > -1 && navigator.appVersion.indexOf('Chrome') > - 1,
                isIE11 = !!navigator.userAgent.match(/Trident\/7\./),
                myNav = navigator.userAgent.toLowerCase(),
                isIE9 = (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) == '9': false,
                offset = img.offset();

            if(!isMacOsChrome && !isIE11 || isIE9) {
                offset.left += img.position().left / 2
            }

            return {               
                left:  Math.ceil(offset.left) + img.width() / 2,
                top: Math.ceil(offset.top) - mapOverlayCanvas.offset().top + img.height() / 2
            };
        }

        function assignCanvasHandlers() {
            $('ul.location-list li')
                .bind('mouseenter.canvas', function () {
                    var center = getCircleImgPosition($(this));
                    clearInterval(drawInterval);
                    clearRect();
                    drawInterval = drawConcentricCircles(center.left, center.top, 45, 1300, false, 35);
                    console.log(center.left)
                })
                .bind('mouseleave.canvas', function () {
                    var center = getCircleImgPosition($(this));
                    drawInterval = drawConcentricCircles(center.left, center.top, 45, 1000, true);
                })
                .bind('click.canvas', function () {
                    var center = getCircleImgPosition($(this));
                    clickedItem = $(this);
                    $('ul.location-list li').unbind('mouseenter.canvas mouseleave.canvas click.canvas');
                    drawInterval = drawConcentricCircles(center.left, center.top, 3000, 3000);
                    setTimeout(function () {
                        mapOverlayCanvas.css('z-index', -1);
                        map.css('z-index', 3);
                    }, 1500);
                });
        }

        clearRect();

        assignCanvasHandlers();
    }
});