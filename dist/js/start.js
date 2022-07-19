//=========================================================================================================
//Burger
$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
	//==================================================================================================

	//slider


function onScroll(event) {
	var scrollPos = $(document).scrollTop();
	$('.decor__circle').each(function () {
		var currLink = $(this);
		var refElement = $(currLink.attr("href"));
		if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
			$('.decor__circle').removeClass("active");
			currLink.addClass("active");
		}
		else {
			currLink.removeClass("active");
		}
	});
}

$(window).scroll(function () {
		if ($(this).scrollTop() > 3500) {
			$('.decor').fadeOut();
		} else {
			$('.decor').fadeIn();
		}
	});

	//active point scroll
	$(document).on("scroll", onScroll);

	//smoothscroll
	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault();
		$(document).off("scroll")
		$('a').each(function () {
			$(this).removeClass('active');
		})
		$(this).addClass('active')
		var target = this.hash,
			menu = target;
		$target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top + 2
		}, 800, 'swing', function () {
			window.location.hash = target;
			$(document).on("scroll", onScroll);
		});
	});
	new WOW().init();
});
	$('.slider__row').slick({
		// infinite: true,
		// autoplay: true,
		// autoplaySpeed: 5000,
		arrows: true,
		adaptiveHeight: true,
		speed: 1200,
		nextArrow: document.querySelector('.control__arrow-r'),
		prevArrow: document.querySelector('.control__arrow-l')
	});
	$('.trade__row').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
		speed: 1200,
		slidesToShow: 3,
		adaptiveHeight: true,
		prevArrow: document.querySelector('.control-trade__arrow-l'),
		nextArrow: document.querySelector('.control-trade__arrow-r'),
		responsive: [
			{
				breakpoint: 991.98,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 575.98,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	$('.quotes__row').slick({
		// infinite: true,
		// autoplay: true,
		// autoplaySpeed: 3000,
		arrows: true,
		adaptiveHeight: true,
		speed: 1200,
		nextArrow: document.querySelector('.control-quotes__decor'),
		prevArrow: false
	});
//=============================================================================================================
//animate scroll

	$("a[href^='#']").click(function () {
		const _href = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
		return false;
	});

	// $("a").on('click', function (event) {
	// 	if (this.hash !== "") {
	// 		event.preventDefault();
	// 		var hash = this.hash;
	// 		$('html, body').animate({
	// 			scrollTop: $(hash).offset().top
	// 		}, 800, function () {
	// 			window.location.hash = hash;
	// 		});
	// 	}
	// });

});
//================================================================================================================
//animate header
$(window).scroll(function () {
	var top = $(document).scrollTop();
	if (top < 790) $(".header").css({ background: 'none', transition: ' all 0.5s ease' });
	else $(".header").css({ background: 'rgba(0, 0, 0, 0.82)' });
});

//zoom
if ($('.gallery').length > 0) {
	baguetteBox.run('.gallery', {
		// Custom options
	});
}
//=====================================================================================================================
//filter
$('.body-portfolio__link').click(function (event) {
	var i = $(this).data('filter');
	if (i == 1) {
		$('.body-portfolio__column').show();
	} else {
		$('.body-portfolio__column').hide();
		$('.body-portfolio__column.f_' + i).show();
	}
	$('.body-portfolio__link').removeClass('active');
	$(this).addClass('active');

	return false;
});
//=====================================================================================================================

//goto block
$('.goto').click(function () {
	var el = $(this).attr('href').replace('#', '');
	var offset = 0;
	$('body,html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });
});
//=====================================================================================================================
// tabs
$(document).ready(function () {
	$('ul.news-tabs').on('click', 'li:not(.news-tab__active)', function () {
		$(this)
			.addClass('news-tab__active').siblings().removeClass('news-tab__active')
			.closest('.news-body').find('.news-content').removeClass('news-content__active').eq($(this).index()).addClass('news-content__active');
	});
});
//=====================================================================================================================

//Выпадающее меню

let user_icon = document.querySelector('.user__icon');
user_icon.addEventListener("click", function (e) {
	let user_menu = document.querySelector('.user__list');
	user_menu.classList.toggle('active');
});
//==================================================================================================

//клик вне области

document.documentElement.addEventListener("click", function (e) {
	if (!e.target.closest('.user')) {
		let user_menu = document.querySelector('.user__list');
		user_menu.classList.remove('active')
	}
});
//==================================================================================================
//%тное заполнение
const counter = document.querySelectorAll('.skills__rating-counter'),
	lines = document.querySelectorAll('.skills__rating-line span');

counter.forEach((item, i) => {
	lines[i].style.width = item.innerHTML;
});
//======================================================================================================

//modal

	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function () {
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});

	$('.button_mini').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	});

	function validateForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 5
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Введите {0} символов!")
				},
				phone: "Пожалуйста, введите свой телефон",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Неправильно введен аддрес почты"
				}
			}
		});
	};
	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');

	$('input[name=phone]').mask("+7 (999) 999-9999");

	$('form').submit(function (e) {
		e.preventDefault();

		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 1000) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});