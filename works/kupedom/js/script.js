$(function(){

	/**
	 * Yandex Map
	 */
	
	function init() {
	    var myMap = new ymaps.Map("ymap", {
	        center: [53.92421378, 27.54964050],
	        zoom: 16,
	        controls: []
	    });
	    myMap.behaviors.disable('scrollZoom');
	    myPlacemark = new ymaps.Placemark(myMap.getCenter(53.92421378, 27.54964050), {}, {
	        iconLayout: 'default#image',
	        iconImageHref: './img/map_marker.png',
	        iconImageSize: [28, 42]
	    });
	    myMap.geoObjects.add(myPlacemark);
	}

	ymaps.ready(init);

	/**
	 * Smooth Scrolling	
	 */
	
	$(".navigation li:not(:last-child) a[href^='#']").on('click', function(e) {
		var target;
		target = this.hash;

		e.preventDefault();
/*		$('.navigation a').each(function() {
			$(this).removeClass('active');
		})
		$(this).addClass('active');*/

		var navOffset = $('.navigation').height(),
			scrollTop = $(this.hash).offset().top - navOffset;

		return $('html, body').animate({
			scrollTop: scrollTop
		}, 500, 'swing', function() {
			return window.history.pushState(null, null, target);
		});
	});

	/**
	 * Open Gallery Modal
	 */
	
	$('.gallery-item a').click(function(e){
		$('#modal-gallery-want').modal('show');
		e.preventDefault();
	})

	$('.gallery-item .item-hover-text').click(function(e){
		$('#modal-gallery').modal('show');
		e.preventDefault();
	})

	/**
	 * Phone Check
	 */

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
				$('#modal-gallery-want').modal('hide');
				$('#modal-gallery').modal('hide');
				$('#modal-success').modal('show');

				$('form').each(function () {
					this.reset();
				});
			});
		}

		evt.preventDefault();
		return false;
	});

})

$(window).bind('scroll', function () {

	/* Fixed menu */
	if ($(window).scrollTop() > 70) {
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
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });