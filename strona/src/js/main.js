const nav = document.querySelector('.nav');
const navBtn = document.querySelector('.burger-btn');
const allNavItems = document.querySelectorAll('.nav__item');
const navBtnBars = document.querySelector('.burger-btn__bars');
const allSections = document.querySelectorAll('.section');
const footerYear = document.querySelector('.footer__year');

var lastScrollTop = 0;
const hiddenElements = document.querySelectorAll('.hidden');

window.addEventListener('scroll', function () {
	var st = window.scrollY || document.body.scrollTop;
	console.log(st);

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			// console.log(entry.target)
			if (entry.isIntersecting && st > lastScrollTop) {
				entry.target.classList.add('show');
			} else if (entry.isIntersecting && st < lastScrollTop) {
				entry.target.classList.remove('show');
				console.log('remove');
			}
		});
	});
	hiddenElements.forEach((el) => observer.observe(el));
});

// window.addEventListener(
// 	'scroll',
// 	function () {
// 		var st = window.pageYOffset || document.body.scrollTop;
// 		console.log(st);
// 		if (st > lastScrollTop) {
// 			// console.log('down');
// 			hiddenElements.forEach((hiddenElement) => {
// 				hiddenElement.classList.remove('hidden');
// 				hiddenElement.classList.add('show');
// 			});
// 		} else if (st < lastScrollTop && st < 300) {
// 			// console.log('top');
// 			hiddenElements.forEach((hiddenElement) => {
// 				hiddenElement.classList.remove('show');
// 				hiddenElement.classList.add('hidden');
// 			});
// 		}
// 		lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
// 	},
// 	false
// );

const handleNav = () => {
	nav.classList.toggle('nav--active');

	allNavItems.forEach((item) => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav--active');
		});
	});

	allSections.forEach((item) => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav--active');
		});
	});

	handleNavItemsAnimation();
};

const handleNavItemsAnimation = () => {
	allNavItems.forEach((item) => {
		item.classList.toggle('nav-items-animation');
	});
};

const handleObserver = () => {
	const currentSection = window.scrollY;

	allSections.forEach((section) => {
		if (
			section.classList.contains('white-section') &&
			section.offsetTop <= currentSection + 60
		) {
			navBtnBars.classList.add('black-bars-color');
		} else if (
			!section.classList.contains('white-section') &&
			section.offsetTop <= currentSection + 60
		) {
			navBtnBars.classList.remove('black-bars-color');
		}
	});
};

const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};

handleCurrentYear();
navBtn.addEventListener('click', handleNav);
window.addEventListener('scroll', handleObserver);
