(function () {
	const carousels = document.querySelectorAll('.js-product-carousel');

	[].forEach.call(carousels, function (carousel) {
		carouselize(carousel);
	});
})();

function carouselize(carousel) {
	const productList = carousel.querySelector('.js-product-list'),
		products = Array.from(carousel.querySelectorAll('.product-list__item'));


	let isDragging = false,
		startPos = 0,
		currentTranslate = 0,
		prevTranslate = 0,
		animationID = 0,
		currentIndex = 0,
        currentPosition = 0,
	    productListWidth = 0;
    const carouselPrev = carousel.querySelector('.js-carousel-prev');
	const carouselNext = carousel.querySelector('.js-carousel-next');

    carouselNext.onclick = function () {
        if(currentIndex < products.length - 1)
        currentIndex += 1;
        setPositionByIndex();
	};

	carouselPrev.onclick = function () {
		if (currentIndex > 0) 
        currentIndex -= 1;
			setPositionByIndex();
		}
	

	//Count all the products
	products.forEach((slide, index) => {

		productListWidth += 470;
		productList.style.width = productListWidth + 'px';

		// Touch events
		slide.addEventListener('touchstart', touchStart(index));
		slide.addEventListener('touchend', touchEnd);
		slide.addEventListener('touchmove', touchMove);

		// Mouse events
		slide.addEventListener('mousedown', touchStart(index));
		slide.addEventListener('mouseup', touchEnd);
		slide.addEventListener('mouseleave', touchEnd);
		slide.addEventListener('mousemove', touchMove);
	});

	//disable context menu
	window.oncontextmenu = function (event) {
		// event.preventDeafult();
		event.stopPropagation();
		return false;
	};

	function touchStart(index) {
		return function (event) {
			currentIndex = index;
			startPos = event.type.includes('mouse')
				? event.pageX
				: event.touches[0].clientX;
			isDragging = true;

			animationID = requestAnimationFrame(animation);
			productList.classList.add('grabbing');
		};
	}

	function touchEnd() {
		isDragging = false;
		cancelAnimationFrame(animationID);

		const movedBy = currentTranslate - prevTranslate;

		if (movedBy < -30 && currentIndex < products.length - 1) currentIndex += 1;

		if (movedBy > +30 && currentIndex > 0) currentIndex -= 1;

		setPositionByIndex();

		productList.classList.remove('grabbing');
	}

	function touchMove(event) {
        if (isDragging) {
            currentPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
	}

    // console.log(products[0].clientWidth)

	function animation() {
		setSliderPosition();
		if (isDragging) requestAnimationFrame(animation);
	}

	function setSliderPosition() {
		productList.style.transform = `translateX(${currentTranslate}px)`;
	}

	function setPositionByIndex() {
		currentTranslate = currentIndex * -products[0].clientWidth;
		prevTranslate = currentTranslate;
		productList.style.transform = `translateX(${currentTranslate}px)`;
	}
}
