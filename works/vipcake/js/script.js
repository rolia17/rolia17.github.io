$(function(){

	/*Slick Slider*/
	$('.awards__slider .slider').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		prevArrow: '.slider-prev',
		nextArrow: '.slider-next',
		customPaging: function(){
			return '<span>&bull;</span>';
		}
	})

	$('.feedback__slider .slider').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		prevArrow: '.slider-prev',
		nextArrow: '.slider-next',
		customPaging: function(){
			return '<span>&bull;</span>';
		}
	})



	/*Yandex Maps*/
	function init() {
		var myMap = new ymaps.Map("ymap", {
			center: [53.85390093, 27.50976971],
			zoom: 16,
			controls: []
		});
		myMap.behaviors.disable('scrollZoom');
		myPlacemark = new ymaps.Placemark([53.85412928, 27.51393250], {
			balloonContent: '<div class="balloon">Студия Людмилы Мостаковой<br>Минск, ул. Казинца, 49а</div>'
		}, {
			hideIconOnBalloonOpen: false,
			balloonContentSize: [248, 68],
			balloonLayout: "default#imageWithContent",
			balloonImageHref: './img/plashka_cont.png',
			balloonImageOffset: [-265, -45],
			balloonImageSize: [248, 68],
			balloonShadow: false
		});
		myMap.geoObjects.add(myPlacemark);
		myPlacemark.balloon.open();
	}

	ymaps.ready(init);

	/* Modals */

	$('.gallery__item a, .how__text a').click(function(e) {
		e.preventDefault();
		$('#modal-call').modal(open);
	});

	/**
	 * Smooth scroling
	 */

	$(".navigation a[href^='#']").on('click', function(e) {
			var target;
			target = this.hash;

			e.preventDefault();
			var navOffset = $('.navigation').height(),
				scrollTop = $(this.hash).offset().top - navOffset;

			return $('html, body').animate({
				scrollTop: scrollTop
			}, 500, 'swing', function() {
				return window.history.pushState(null, null, target);
			});
		});

	 /* Phone Check */

	$('form input[name="phone"]').bind('focus change blur keypress keyup keydown mouseup mousedown click', function(){
		var f_value = this.value.replace(/[^ \(\)0-9+-]+/g, '');
		if (f_value !== this.value) {
			this.value = f_value;
		}
	});

		/**
	 * Form Validation
	 */

	$('form a[data-type="submit"]').click(function (evt) {
		var form = $(this).closest('form');
		form.validate({
			rules: {
				name: "required",
				phone: "required"
			}
		});

		if (form.valid()) {
			$.post('./send.php', form.serialize()).success(function (response) {
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

	/**
	 * Show more
	 */
	var more = $('#show-more'),
			less = $('#show-less'),
			row = $('#gallery .gallery-row'),
			index = row.length,
			num = 0;

	more.hide();

	if (index>2) {
		for (var i=2; i<index; i++) {
			$(row[i]).hide(0);
		}
		more.show();
	}

	more.click(function(e) {
		e.preventDefault();
		$(row[2+num]).slideDown();
/*		$(row[2+num]).fadeIn();
		$('body').animate({
			scrollTop: $(row[2+num]).offset().top - topMenu.height()
		}, 400, 'swing');*/
		index--;
		if (index>2) {
			num++;
		} else {
			$(this).hide(0, function(){
				less.show(0);
			});
			index = row.length;
			num=0;
		}
	});

	less.click(function(e){
		e.preventDefault();
		for (var i = 2; i < index; i++) {
			$(row[i]).slideUp();
		};
		$(this).hide(0, function(){
			more.show(0);
		});
		$('body').animate({
			scrollTop: $(row[1]).offset().top - topMenu.height()
		}, 400, 'swing');
	})

})

$(window).bind('scroll', function () {

	/* Fixed menu */
	if ($(window).scrollTop() > 110) {
		$('.main__navigation').addClass('fixed');
	} else {
		$('.main__navigation').removeClass('fixed');
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
    topMenuHeight = topMenu.outerHeight()+50,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });