currentKitchen = null;
onAnimation = false;
schemeTop = $('#scheme').offset().top;
$(function () {
	$('.pin-text[data-popup]').click(function(){
		$('.modal').modal('hide');
		$('#'+$(this).data('popup')).modal('show');
	});

	$('.pImage, .pin-text[data-popup]').css('cursor', 'pointer');
	$('.pImage').css('color', '#ef7000');
	$('.pImage').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		image: {
			verticalFit: false
		}
	});
/*	$('form input[name="phone"]').bind('focus change blur keypress keyup keydown mouseup mousedown click', function(){
		var f_value = this.value.replace(/[^ \(\)0-9+-]+/g, '');
		if (f_value !== this.value) {
			this.value = f_value;
		}
	});*/
	$('form a[data-type="submit"]').click(function (evt) {
		var form = $(this).closest('form');
		form.validate({
			rules: {
				name: "required",
				phone: "required"
			}
		});

		if (form.valid()) {
			$.post('/send.php', form.serialize()).success(function (response) {
				$('#modal-kitchen').modal('hide');
				$('#modal-call').modal('hide');
				$('#modal-success').modal('show');

				$('form').each(function () {
					this.reset();
				});
			});
		}

		evt.preventDefault();
		return false;
	});

	var items = $('#prices .col-xs-4');
	items.each(function(index){
		if (index > 5) {
			$(this).hide();
		}
	});

	$('.gallery-more').click(function (evt) {
		$('#prices .col-xs-4:hidden').slice(0, 6).each(function () {
			$(this).show('slow');
		});

		if ($('#prices .col-xs-4:hidden').length === 0) {
			$(this).addClass('hidden');
			$('.gallery-hide').removeClass('hidden');
		}

		evt.preventDefault();
		return false;
	});

	$('.gallery-hide').click(function(evt){
		var items = $('#prices .col-xs-4');
		items.each(function(index){
			if (index > 5) {
				$(this).hide('slow');
			}
		});
		$(this).addClass('hidden');
		$('.gallery-more').removeClass('hidden');
		evt.preventDefault();
		return false;
	});

	$('#modal-kitchen').on('show.bs.modal', function (e) {
		var $invoker = $(e.relatedTarget);
		if ($invoker.length) {
			currentKitchen = $invoker.closest('.gallery-item');
		}


		$('#modal-kitchen .img-responsive').attr('src', currentKitchen.find('img').attr('src'));
		$('#modal-kitchen h3:first').html(currentKitchen.find('h4:first').html());
		$('#modal-kitchen h4:first').html(currentKitchen.find('h5').html());
		$('#modal-kitchen .modal-description h4:last').html(currentKitchen.find('h4:last').html());

		if (currentKitchen === null) {
			e.preventDefault();
		}
	});


	/*Collapse plugin options*/

	function toggleIcon(evt) {
		var header = $(evt.target).prev('.collapse-header');

		header.find('i.fa').toggleClass('fa-caret-down fa-caret-up');
		header.find('a').toggleClass('active');
		header.find('.container-fill-collapse').toggleClass('no-bg');
		header.toggleClass('no-bg');
	}

	$('#accordion').on('show.bs.collapse', toggleIcon)
	$('#accordion').on('hide.bs.collapse', toggleIcon)

	/*Scrollorama*/

	/*Scrollorama*/
	if (!isMobile.any) {
		var controller = $.superscrollorama();

		controller.pin($('.scheme'), 4000, {
			anim: (new TimelineLite())
				.append([
					TweenMax.to($('.pin-orange-1'), .5,
						{css:{width: 320}}),
					TweenMax.to($('.pencil'), .5,
						{css:{opacity: 1}}),
					TweenMax.to($('.text-2'), .5,
						{css:{opacity: 1}})
				])
				.append([
					TweenMax.to($('.pin-orange-1'), .5,
						{css:{width: 560}}),
					TweenMax.to($('.briefcase'), .5,
						{css:{opacity: 1}}),
					TweenMax.to($('.text-3'), .5,
						{css:{opacity: 1}})
				])
				.append([
					TweenMax.to($('.pin-orange-1'), .5,
						{css:{width: 795}}),
					TweenMax.to($('.config'), .5,
						{css:{opacity: 1}}),
					TweenMax.to($('.text-4'), .5,
						{css:{opacity: 1}})
				])
				.append([
					TweenMax.to($('.pin-orange-2'), .5,
						{css:{height: 216}}),
					TweenMax.to($('.truck'), .5,
						{css:{opacity: 1}}),
					TweenMax.to($('.text-5'), .5,
						{css:{opacity: 1}})
				])
				.append([
					TweenMax.to($('.pin-orange-3'), .5,
						{css:{width: 240, left: 480}}),
					TweenMax.to($('.person'), .5,
						{css:{opacity: 1}}),
					TweenMax.to($('.text-6'), .5,
						{css:{opacity: 1}})
				])
				.append([
					TweenMax.to($('.pin-orange-3'), .5,
						{css:{width: 480, left: 240}}),
					TweenMax.to($('.wallet'), .5,
						{css:{opacity: 1}}),
					TweenMax.to($('.text-7'), .5,
						{css:{opacity: 1}})
				])
				.append([
					TweenMax.to($('.pin-orange-3'), .5,
						{css:{width: 760, left: 0}}),
					TweenMax.to($('.thumbs'), .5,
						{css:{opacity: 1}}),
					TweenMax.to($('.text-8'), .5,
						{css:{opacity: 1}})
				]),
			offset: -55,
			pushFollowers: true,
			onPin: function () {
				/*var top = parseInt($('#comments').offset().top - $(window).scrollTop());*/
				$('.comments').css({'position': 'fixed', 'top': 642, 'z-index': 20});
				$('.contacts').css({'padding-top': 200});
				onAnimation = true;
			},
			onUnpin: function () {
				$('.comments').removeAttr('style');
				$('.contacts').removeAttr('style');
				onAnimation = false;
			}
		});
	} else {
		$('.pin-orange-1').css("width", 795);
		$('.pin-orange-2').css("height", 216);
		$('.pin-orange-3').css({"width": 760, "left": 0});
		$('.pin-icon').css("opacity", 1);
		$('.pin-text').css("opacity", 1);
	}

	/*Carousel comments*/
	$('.slider-items').slick({
		dots: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		variableWidth: false,
		prevArrow: ".slider-prev",
		nextArrow: ".slider-next"
	});

	/*Yandex Maps*/
	function init() {
		var myMap = new ymaps.Map("yamaps", {
			center: [53.8709,27.5367],
			zoom: 15,
			controls: []
		});
		myMap.behaviors.disable('scrollZoom');
		myPlacemark = new ymaps.Placemark(myMap.getCenter(53.8709,27.5367), {}, {
			iconLayout: 'default#image',
			iconImageHref: './img/map_marker.png',
			iconImageSize: [28, 42]
		});
		myMap.geoObjects.add(myPlacemark);
	}

	ymaps.ready(init);

	/* Modal test open*/

	$('.gallery-item .item-hover').click(function(){
		currentKitchen = $(this).closest('.gallery-item');
		$('#modal-kitchen').modal('show');
	});

	/*Scroll to*/

	$(".navigation li:not(:last-child) a[href^='#']").on('click', function(e) {
		var target;
		target = this.hash;

		e.preventDefault();
		$('.navigation a').each(function() {
			$(this).removeClass('active');
		})
		$(this).addClass('active');

		var navOffset = $('.navigation').height(),
			scrollTop = $(this.hash).offset().top - navOffset,
			offtop = $(document).height();

		if (target=='#masters' || target=='#contacts') {
			scrollTop = scrollTop - 25;
		}

		if (target=='#contacts' || target=='#comments'){
			if (offtop < 8000 && !isMobile.any) {
				scrollTop += 4000;
			} 
/*			else
			if (onAnimation && offtop>8000){
				scrollTop += 4000 - ($(window).scrollTop() - schemeTop);
				console.log(scrollTop);
			}*/
		}

		return $('html, body').animate({
			scrollTop: scrollTop
		}, 500, 'swing', function() {
			return window.history.pushState(null, null, target);
		});
	});

	/* Youtube pop-up*/
	$('.arrow-box a').magnificPopup({type:'iframe'});

	/*tel mask*/
	$("input[name=phone]").mask("+ 375 ( 99 ) 999-99-99");

});

$(window).bind('scroll', function () {
	if ($(window).scrollTop() > 108) {
		$('.container-navigation').addClass('fixed');
	} else {
		$('.container-navigation').removeClass('fixed');
	}

		/* Spy Scroll */
	
   // Get container scroll position
   var fromTop = $(this).scrollTop() + topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function() {
       if ($(this).offset().top < fromTop)
           return this;
   });
   // Get the id of the current element
   cur = cur[cur.length - 1];
   var id = cur && cur.length ? cur[0].id : "";

   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
           .removeClass("active")
           .filter("[href=#" + id + "]")
           .addClass("active");
   }
});

var lastId,
    topMenu = $(".navigation"),
    topMenuHeight = topMenu.outerHeight(),
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/IEMobile/i,h=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,i=/BlackBerry/i,j=/BB10/i,k=/Opera Mini/i,l=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,m=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),n=function(a,b){return a.test(b)},o=function(a){var o=a||navigator.userAgent,p=o.split("[FBAN");return"undefined"!=typeof p[1]&&(o=p[0]),this.apple={phone:n(b,o),ipod:n(c,o),tablet:!n(b,o)&&n(d,o),device:n(b,o)||n(c,o)||n(d,o)},this.android={phone:n(e,o),tablet:!n(e,o)&&n(f,o),device:n(e,o)||n(f,o)},this.windows={phone:n(g,o),tablet:n(h,o),device:n(g,o)||n(h,o)},this.other={blackberry:n(i,o),blackberry10:n(j,o),opera:n(k,o),firefox:n(l,o),device:n(i,o)||n(j,o)||n(k,o)||n(l,o)},this.seven_inch=n(m,o),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},p=function(){var a=new o;return a.Class=o,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=o:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=p():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=p()):a.isMobile=p()}(this);