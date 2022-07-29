// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();

function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();

document.querySelectorAll('.spoiler-construction__title').forEach((el) => {
	el.addEventListener('click', () => {
		let content = el.nextElementSibling;
		if (content.style.maxHeight) {
			document.querySelectorAll('.body-spoiler').forEach((el) => el.style.maxHeight = null)
		} else {
			document.querySelectorAll('.body-spoiler').forEach((el) => el.style.maxHeight = null)
			content.style.maxHeight = content.scrollHeight + 'px'
		}
	})
})
document.querySelectorAll('.spoiler-construction_m__title').forEach((el) => {
	el.addEventListener('click', () => {
		let content = el.nextElementSibling;
		if (content.style.maxHeight) {
			document.querySelectorAll('.body-spoiler').forEach((el) => el.style.maxHeight = null)
		} else {
			document.querySelectorAll('.body-spoiler').forEach((el) => el.style.maxHeight = null)
			content.style.maxHeight = content.scrollHeight + 'px'
		}
	})
})

$(document).ready(function () {
	$('.header__info').click(function (event) {
		$('.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('.menu__close').click(function (event) {
		$('.menu__close').addClass('active');
		$('.header__menu,.menu__close').removeClass('active');
	});

	$('.spoiler-construction__title').click(function (event) {
		if ($('.spoiler-construction__title').hasClass('active')){
			$('.spoiler-construction__title').not($(this)).removeClass('active');
		}
			$(this).toggleClass('active');
	});
	$('.spoiler-construction_m__title').click(function (event) {
		if ($('.spoiler-construction_m__title').hasClass('active')){
			$('.spoiler-construction_m__title').not($(this)).removeClass('active');
		}
			$(this).toggleClass('active');
	});

	// $('.spoiler-construction__title').click(function (event) {
	// 	if($('.spoiler-construction').hasClass('one')){
	// 		$('.spoiler-construction__title').not($(this)).removeClass('active');
	// 		$('.body-spoiler').not($(this).next()).slideUp(300);
	// 	}
	// 	$(this).toggleClass('active').next().slideToggle(300);
	// });

	$('.images-favorite__mainslider').slick({
		arrows: false,
		fade: true,
		adaptiveHeight: true,
		infinite: true,
		speed: 500,
		responsive: [
			{
				breakpoint: 767.98,
				settings: {
					dots: true
				}
			}
		],
		asNavFor: '.images-favorite__subslider'
	});
	$('.images-favorite__subslider').slick({
		slidesToShow: 10,
		asNavFor: '.images-favorite__mainslider',
		dots: false,
		adaptiveHeight: true,
		focusOnSelect: true,
		infinite: true,
		speed: 500,
		initialSlide: 0,
		autoplay: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 991.98,
				settings: {
					slidesToShow: 6
				}
			}
		]
	});

	$('.images-favorite_m__mainslider').slick({
		arrows: false,
		fade: true,
		adaptiveHeight: true,
		infinite: true,
		speed: 500,
		responsive: [
			{
				breakpoint: 767.98,
				settings: {
					dots: true
				}
			}
		],
		asNavFor: '.images-favorite_m__subslider'
	});
	$('.images-favorite_m__subslider').slick({
		slidesToShow: 10,
		asNavFor: '.images-favorite_m__mainslider',
		dots: false,
		adaptiveHeight: true,
		focusOnSelect: true,
		infinite: true,
		speed: 500,
		initialSlide: 0,
		autoplay: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 991.98,
				settings: {
					slidesToShow: 6
				}
			}
		]
	});

	$('.images-advanced__mainslider').slick({
		arrows: false,
		fade: true,
		adaptiveHeight: true,
		infinite: true,
		speed: 500,
		responsive: [
			{
				breakpoint: 767.98,
				settings: {
					dots: true
				}
			}
		],
		asNavFor: '.images-advanced__subslider'
	});
	$('.images-advanced__subslider').slick({
		slidesToShow: 10,
		asNavFor: '.images-advanced__mainslider',
		dots: false,
		adaptiveHeight: true,
		focusOnSelect: true,
		infinite: true,
		speed: 500,
		initialSlide: 0,
		autoplay: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 991.98,
				settings: {
					slidesToShow: 6
				}
			}
		]
	});

	$('.images-advanced_m__mainslider').slick({
		arrows: false,
		fade: true,
		adaptiveHeight: true,
		infinite: true,
		speed: 500,
		responsive: [
			{
				breakpoint: 767.98,
				settings: {
					dots: true
				}
			}
		],
		asNavFor: '.images-advanced_m__subslider'
	});
	$('.images-advanced_m__subslider').slick({
		slidesToShow: 10,
		asNavFor: '.images-advanced_m__mainslider',
		dots: false,
		adaptiveHeight: true,
		focusOnSelect: true,
		infinite: true,
		speed: 500,
		initialSlide: 0,
		autoplay: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 991.98,
				settings: {
					slidesToShow: 6
				}
			}
		]
	});

	$('a[href^="#"]').click(function () {
		var target = $(this).attr('href');
		$('body,html').animate({
			scrollTop: $(target).offset().top
		}, 800);
	});

});

