const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('on');
    });
}, { threshold: .15 });
reveals.forEach(el => io.observe(el));

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function updateSplitAbout() {
    const section = document.querySelector('.about-split');
    const topText = document.querySelector('[data-split-top]');
    const bottomText = document.querySelector('[data-split-bottom]');
    const copy = document.querySelector('[data-split-copy]');
    const bar = document.querySelector('[data-split-progress]');

    if (!section || !topText || !bottomText || !copy) return;

    const rect = section.getBoundingClientRect();
    const maxScroll = section.offsetHeight - window.innerHeight;
    const progress = clamp(-rect.top / maxScroll, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    const splitY = window.innerHeight * 0.34 * eased;
    const driftX = window.innerWidth * 0.16 * eased;

    topText.style.transform = `translate3d(calc(-50% - ${driftX}px), ${-splitY}px, 0)`;
    bottomText.style.transform = `translate3d(calc(-50% + ${driftX}px), ${splitY}px, 0)`;

    const show = clamp((progress - 0.18) / 0.5, 0, 1);
    const pop = 1 - Math.pow(1 - show, 3);
    copy.style.opacity = pop;
    copy.style.filter = `blur(${(1 - pop) * 10}px)`;
    copy.style.transform = `translateY(${(1 - pop) * 46}px) scale(${0.92 + pop * 0.08})`;

    if (bar) bar.style.transform = `scaleX(${progress})`;
}

function updateVisionZoom() {
    const section = document.querySelector('.vision-zoom');
    const image = document.querySelector('[data-vision-image]');
    const intro = document.querySelector('[data-vision-intro]');
    const content = document.querySelector('[data-vision-content]');
    const left = document.querySelector('[data-vision-left]');
    const right = document.querySelector('[data-vision-right]');
    const sideLeft = document.querySelector('[data-vision-side-left]');
    const sideRight = document.querySelector('[data-vision-side-right]');
    const bar = document.querySelector('[data-vision-progress]');
    if (!section || !image || !intro || !content) return;

    /*
       모바일은 긴 sticky/zoom 대신
       가벼운 등장 모션을 별도로 사용합니다.
    */
    if (window.innerWidth <= 768) {
        [image, intro, content, left, right, sideLeft, sideRight].forEach(el => {
            if (!el) return;
            el.style.removeProperty('width');
            el.style.removeProperty('height');
            el.style.removeProperty('left');
            el.style.removeProperty('top');
            el.style.removeProperty('opacity');
            el.style.removeProperty('transform');
            el.style.removeProperty('filter');
            el.style.removeProperty('border-radius');
        });

        if (bar) bar.style.removeProperty('transform');
        return;
    }

    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const progress = clamp(-rect.top / total, 0, 1);

    const startGrow = clamp(progress / 0.58, 0, 1);
    const growEase = 1 - Math.pow(1 - startGrow, 3);

    const startW = Math.min(760, window.innerWidth * 0.62);
    const startH = Math.min(420, window.innerHeight * 0.42);
    const targetW = window.innerWidth * 1.04;
    const targetH = window.innerHeight * 1.04;
    const w = startW + (targetW - startW) * growEase;
    const h = startH + (targetH - startH) * growEase;
    const radius = 18 * (1 - growEase);

    image.style.left = `50%`;
    image.style.top = `50%`;
    image.style.width = `${w}px`;
    image.style.height = `${h}px`;
    image.style.borderRadius = `${radius}px`;
    image.style.transform = `translate(-50%, -50%) scale(${1 + growEase * 0.04})`;
    image.style.transformOrigin = `center center`;
    image.style.filter = `brightness(${0.88 - growEase * 0.08}) contrast(${1.06 + growEase * 0.05})`;

    const introOut = clamp(progress / 0.34, 0, 1);
    intro.style.opacity = 1 - introOut;
    intro.style.transform = `translateX(-50%) translateY(${-introOut * 46}px) scale(${1 - introOut * .04})`;
    intro.style.filter = `blur(${introOut * 12}px)`;

    const contentIn = clamp((progress - 0.34) / 0.32, 0, 1);
    const contentEase = 1 - Math.pow(1 - contentIn, 3);
    content.style.opacity = contentEase;
    content.style.transform = `translateY(${(1 - contentEase) * 52}px)`;
    content.style.filter = `blur(${(1 - contentEase) * 14}px)`;

    if (left) {
        left.style.transform = `translateX(${(1 - contentEase) * -90}px)`;
        left.style.opacity = contentEase;
    }
    if (right) {
        right.style.transform = `translateX(${(1 - contentEase) * 90}px)`;
        right.style.opacity = contentEase;
    }

    const sideIn = clamp((progress - 0.48) / 0.28, 0, 1);
    const sideEase = 1 - Math.pow(1 - sideIn, 3);

    if (sideLeft) {
        sideLeft.style.opacity = sideEase * .9;
        sideLeft.style.filter = `blur(${(1 - sideEase) * 8}px)`;
        sideLeft.style.transform = `translateY(-50%) rotate(180deg) translateY(${(1 - sideEase) * 60}px)`;
    }

    if (sideRight) {
        sideRight.style.opacity = sideEase * .9;
        sideRight.style.filter = `blur(${(1 - sideEase) * 8}px)`;
        sideRight.style.transform = `translateY(-50%) translateY(${(1 - sideEase) * -60}px)`;
    }

    if (bar) bar.style.transform = `scaleX(${progress})`;
}

window.addEventListener('scroll', () => {
    const y = scrollY;

    document.querySelectorAll('[data-speed]').forEach(el => {
        el.style.translate = `0 ${y * parseFloat(el.dataset.speed)}px`;
    });

    const tech = document.querySelector('.tech-stack');
    const cards = document.querySelectorAll('.stack-card');

    if (tech && cards.length && window.innerWidth > 1100) {
        const rect = tech.getBoundingClientRect();
        const total = tech.offsetHeight - window.innerHeight;
        const progress = clamp(-rect.top / total, 0, 1);

        /*
           카드 높이를 CSS에서 반응형으로 줄여도 스택 이동 간격이
           자동으로 맞도록 실제 카드 높이를 기준으로 계산합니다.
        */
        const cardGap = window.innerHeight <= 820 ? 40 : 60;
        const cardStep = cards[0].offsetHeight + cardGap;
        const maxMove = cardStep * (cards.length - 1);

        cards.forEach((card, i) => {
            const base = i * cardStep;
            const move = progress * maxMove;
            const yPos = Math.max(base - move, 0);

            card.style.transform = `translateY(${yPos}px)`;
            card.style.scale = '1';
            card.style.opacity = '1';
        });
    }

    updateSplitAbout();
    updateVisionZoom();
});

function updateSplitAbout() {
    const section = document.querySelector('.about-split');
    const topText = document.querySelector('[data-split-top]');
    const bottomText = document.querySelector('[data-split-bottom]');
    const copy = document.querySelector('[data-split-copy]');
    const bar = document.querySelector('[data-split-progress]');

    if (!section || !topText || !bottomText || !copy) return;

    if (window.innerWidth <= 768) {
        const rect = section.getBoundingClientRect();
        const trigger = window.innerHeight * 0.72;

        if (rect.top < trigger) {
            copy.classList.add('mobile-pop');
        }

        topText.style.transform = '';
        bottomText.style.transform = '';
        if (bar) bar.style.transform = '';

        return;
    }

    copy.classList.remove('mobile-pop');

    const rect = section.getBoundingClientRect();
    const maxScroll = section.offsetHeight - window.innerHeight;
    const progress = clamp(-rect.top / maxScroll, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    const splitY = window.innerHeight * 0.34 * eased;
    const driftX = window.innerWidth * 0.16 * eased;

    topText.style.transform = `translate3d(calc(-50% - ${driftX}px), ${-splitY}px, 0)`;
    bottomText.style.transform = `translate3d(calc(-50% + ${driftX}px), ${splitY}px, 0)`;

    const show = clamp((progress - 0.18) / 0.5, 0, 1);
    const pop = 1 - Math.pow(1 - show, 3);

    copy.style.opacity = pop;
    copy.style.filter = `blur(${(1 - pop) * 10}px)`;
    copy.style.transform = `translateY(${(1 - pop) * 46}px) scale(${0.92 + pop * 0.08})`;

    if (bar) bar.style.transform = `scaleX(${progress})`;
}
window.addEventListener('load', () => {
    updateSplitAbout();
    updateVisionZoom();
});

/* PRODUCT SLIDER V2: seamless autoplay + drag + mobile swipe */
(function initProductSlider() {
    const viewport = document.querySelector('#products .product-marquee');
    const track = document.querySelector('#products .product-track');
    const prevButton = document.querySelector('#products .product-prev');
    const nextButton = document.querySelector('#products .product-next');

    if (!viewport || !track) return;

    const originalCards = Array.from(track.querySelectorAll('.product-card'));
    if (!originalCards.length) return;

    const desktopAutoQuery = window.matchMedia('(min-width: 769px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let allCards = [];
    let middleCards = [];
    let middleStart = 0;
    let setWidth = 0;
    let cardStep = 0;

    let isDragging = false;
    let isTouching = false;
    let isHovered = false;
    let isFocused = false;
    let isButtonMoving = false;
    let startX = 0;
    let startScrollLeft = 0;
    let dragDistance = 0;

    let animationFrame = 0;
    let lastTime = 0;
    let resizeTimer = 0;
    let buttonTimer = 0;
    const AUTO_SPEED = 31; // px per second

    function makeClone(card) {
        const clone = card.cloneNode(true);
        clone.classList.add('product-card-clone');
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('a,button,input,select,textarea,[tabindex]').forEach(el => {
            el.setAttribute('tabindex', '-1');
        });
        return clone;
    }

    function buildInfiniteTrack() {
        if (track.dataset.infiniteReady === 'true') return;

        const prefix = document.createDocumentFragment();
        const suffix = document.createDocumentFragment();

        originalCards.forEach(card => prefix.appendChild(makeClone(card)));
        originalCards.forEach(card => suffix.appendChild(makeClone(card)));

        track.insertBefore(prefix, track.firstChild);
        track.appendChild(suffix);
        track.dataset.infiniteReady = 'true';
    }

    function measureSlider(keepVisualPosition = false) {
        const oldWidth = setWidth;
        const oldRelative = oldWidth
            ? (viewport.scrollLeft - middleStart) / oldWidth
            : 0;

        allCards = Array.from(track.querySelectorAll('.product-card'));
        middleCards = allCards.slice(originalCards.length, originalCards.length * 2);

        const firstMiddle = middleCards[0];
        const firstSuffix = allCards[originalCards.length * 2];

        if (!firstMiddle || !firstSuffix) return;

        middleStart = firstMiddle.offsetLeft;
        setWidth = firstSuffix.offsetLeft - firstMiddle.offsetLeft;

        if (middleCards.length > 1) {
            cardStep = middleCards[1].offsetLeft - middleCards[0].offsetLeft;
        } else {
            cardStep = firstMiddle.offsetWidth;
        }

        if (keepVisualPosition && oldWidth) {
            viewport.scrollLeft = middleStart + oldRelative * setWidth;
        } else {
            viewport.scrollLeft = middleStart;
        }

        normalizeLoop();
    }

    function normalizeLoop() {
        if (!setWidth) return;

        const lowerEdge = middleStart - setWidth * .5;
        const upperEdge = middleStart + setWidth * .5;

        if (viewport.scrollLeft <= lowerEdge) {
            viewport.scrollLeft += setWidth;
        } else if (viewport.scrollLeft >= upperEdge) {
            viewport.scrollLeft -= setWidth;
        }
    }

    function shouldAutoPlay() {
        return desktopAutoQuery.matches &&
            !reducedMotionQuery.matches &&
            !isDragging &&
            !isTouching &&
            !isHovered &&
            !isFocused &&
            !isButtonMoving &&
            !document.hidden;
    }

    function autoLoop(time) {
        if (!lastTime) lastTime = time;
        const delta = Math.min(time - lastTime, 50);
        lastTime = time;

        if (shouldAutoPlay()) {
            viewport.scrollLeft += AUTO_SPEED * (delta / 1000);
            normalizeLoop();
        }

        animationFrame = requestAnimationFrame(autoLoop);
    }

    function pauseForButton() {
        isButtonMoving = true;
        clearTimeout(buttonTimer);
        buttonTimer = window.setTimeout(() => {
            isButtonMoving = false;
            normalizeLoop();
        }, 650);
    }

    function moveByCard(direction) {
        if (!cardStep) return;
        pauseForButton();
        viewport.scrollBy({
            left: direction * cardStep,
            behavior: 'smooth'
        });
    }

    function getNearestMiddleCard() {
        const center = viewport.scrollLeft + viewport.clientWidth / 2;
        let nearest = null;
        let nearestDistance = Infinity;

        middleCards.forEach(card => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(center - cardCenter);
            if (distance < nearestDistance) {
                nearest = card;
                nearestDistance = distance;
            }
        });

        return nearest;
    }

    function snapToNearestCard() {
        if (desktopAutoQuery.matches) {
            const card = getNearestMiddleCard();
            if (!card) return;

            const target = card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;
            isButtonMoving = true;
            viewport.scrollTo({ left: target, behavior: 'smooth' });
            clearTimeout(buttonTimer);
            buttonTimer = window.setTimeout(() => {
                isButtonMoving = false;
                normalizeLoop();
            }, 520);
        } else {
            normalizeLoop();
        }
    }

    prevButton?.addEventListener('click', () => moveByCard(-1));
    nextButton?.addEventListener('click', () => moveByCard(1));

    /* PC 마우스와 펜 드래그 */
    viewport.addEventListener('pointerdown', event => {
        if (event.pointerType === 'touch' || event.button !== 0) return;

        isDragging = true;
        startX = event.clientX;
        startScrollLeft = viewport.scrollLeft;
        dragDistance = 0;

        viewport.classList.add('dragging');
        viewport.setPointerCapture?.(event.pointerId);
        event.preventDefault();
    });

    viewport.addEventListener('pointermove', event => {
        if (!isDragging) return;

        const distance = event.clientX - startX;
        dragDistance = Math.max(dragDistance, Math.abs(distance));
        viewport.scrollLeft = startScrollLeft - distance;
        normalizeLoop();
    });

    function finishMouseDrag(event) {
        if (!isDragging) return;

        isDragging = false;
        viewport.classList.remove('dragging');

        if (viewport.hasPointerCapture?.(event.pointerId)) {
            viewport.releasePointerCapture(event.pointerId);
        }

        if (dragDistance > 4) snapToNearestCard();
    }

    viewport.addEventListener('pointerup', finishMouseDrag);
    viewport.addEventListener('pointercancel', finishMouseDrag);
    viewport.addEventListener('lostpointercapture', event => {
        if (isDragging) finishMouseDrag(event);
    });

    /* 태블릿·모바일은 브라우저 기본 손가락 스와이프 사용 */
    viewport.addEventListener('touchstart', () => {
        isTouching = true;
    }, { passive: true });

    viewport.addEventListener('touchend', () => {
        window.setTimeout(() => {
            isTouching = false;
            normalizeLoop();
        }, 180);
    }, { passive: true });

    viewport.addEventListener('touchcancel', () => {
        isTouching = false;
        normalizeLoop();
    }, { passive: true });

    viewport.addEventListener('scroll', normalizeLoop, { passive: true });

    viewport.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    viewport.addEventListener('mouseleave', () => {
        isHovered = false;
    });

    viewport.addEventListener('focusin', () => {
        isFocused = true;
    });

    viewport.addEventListener('focusout', () => {
        isFocused = false;
    });

    viewport.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            moveByCard(-1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            moveByCard(1);
        }
    });

    /* 카드 기울기 효과: PC에서만 */
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        originalCards.forEach(card => {
            card.addEventListener('mousemove', event => {
                if (isDragging) return;

                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - .5;
                const y = (event.clientY - rect.top) / rect.height - .5;
                card.style.transform = `translateY(-12px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => measureSlider(true), 150);
    });

    desktopAutoQuery.addEventListener?.('change', () => {
        lastTime = performance.now();
        normalizeLoop();
    });

    document.addEventListener('visibilitychange', () => {
        lastTime = performance.now();
    });

    buildInfiniteTrack();

    requestAnimationFrame(() => {
        measureSlider(false);
        animationFrame = requestAnimationFrame(autoLoop);
    });

    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationFrame);
    });
})();

/* RIBBON */
document.querySelectorAll('.ribbon-text').forEach(track => {
    if (track.dataset.filled === 'true') return;

    const original = track.innerHTML;
    track.innerHTML = original.repeat(8);
    track.innerHTML += track.innerHTML;
    track.dataset.filled = 'true';
});

/* SNS SPREAD: responsive card widths without title overlap */
function resetSnsSpread() {
    document.querySelectorAll('[data-spread-card]').forEach(card => {
        card.style.removeProperty('transform');
        card.style.removeProperty('opacity');
    });
}

function updateSnsSpread() {
    const section = document.querySelector('.sns-spread-section');
    const stage = document.querySelector('[data-sns-spread]');
    const cards = Array.from(document.querySelectorAll('[data-spread-card]'));

    if (!section || !stage || !cards.length) return;

    /* 1100px 이하에서는 기존 2열/1열 반응형 배치를 그대로 사용합니다. */
    if (window.innerWidth <= 1100) {
        resetSnsSpread();
        return;
    }

    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const raw = total > 0 ? -rect.top / total : 0;
    const progress = clamp(raw, 0, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    const stageWidth = stage.clientWidth || window.innerWidth;
    const isShortDesktop = window.innerWidth > 1100 && window.innerHeight <= 820;

    /* transform의 scale 값에 흔들리지 않도록 실제 레이아웃 너비를 사용합니다. */
    const cardWidth = cards[0].offsetWidth || cards[0].getBoundingClientRect().width;
    const gap = isShortDesktop
        ? clamp(stageWidth * .012, 12, 20)
        : clamp(stageWidth * .016, 16, 28);
    const step = cardWidth + gap;
    const finalX = [-1.5 * step, -.5 * step, .5 * step, 1.5 * step];

    const stackX = isShortDesktop ? [-22, -7, 7, 22] : [-30, -10, 10, 30];
    const startRot = isShortDesktop ? [-7, -3, 3, 7] : [-10, -4, 4, 10];
    const endRot = isShortDesktop ? [-2, 1, -1, 2] : [-3, 2, -2, 3];
    const startY = isShortDesktop ? [10, 6, 3, 0] : [26, 14, 8, 0];
    const endY = isShortDesktop ? [0, 8, 0, 6] : [18, 34, 18, 30];
    const scales = isShortDesktop ? [.96, .98, .99, 1] : [.94, .97, .99, 1];

    cards.forEach((card, index) => {
        const x = stackX[index] + (finalX[index] - stackX[index]) * ease;
        const y = startY[index] + (endY[index] - startY[index]) * ease;
        const rotation = startRot[index] + (endRot[index] - startRot[index]) * ease;
        const scale = scales[index] + (1 - scales[index]) * ease;

        card.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px) rotate(${rotation}deg) scale(${scale})`;
        card.style.opacity = '1';
    });
}

window.addEventListener('scroll', updateSnsSpread, { passive: true });
window.addEventListener('resize', updateSnsSpread);
window.addEventListener('load', updateSnsSpread);
updateSnsSpread();

// 모바일
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

/* MOBILE SCROLL MOTION */
(function initMobileScrollMotion() {
    if (window.innerWidth > 768) return;

    const vision = document.querySelector('#vision');
    const targets = [
        document.querySelector('#vision .vision-left'),
        document.querySelector('#vision .vision-right'),
        ...document.querySelectorAll('#tech .stack-card'),
        ...document.querySelectorAll('#sns .sns-case-card'),
        document.querySelector('#footer .footer_bottom')
    ].filter(Boolean);

    targets.forEach((target, index) => {
        target.classList.add('mobile-motion-target');
        target.style.setProperty(
            '--mobile-delay',
            `${Math.min(index * 70, 280)}ms`
        );
    });

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
        vision?.classList.add('mobile-motion-on');
        targets.forEach(target => target.classList.add('mobile-in'));
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                if (entry.target === vision) {
                    vision.classList.add('mobile-motion-on');
                } else {
                    entry.target.classList.add('mobile-in');
                }

                observer.unobserve(entry.target);
            });
        },
        {
            threshold: .14,
            rootMargin: '0px 0px -8% 0px'
        }
    );

    if (vision) observer.observe(vision);
    targets.forEach(target => observer.observe(target));
})();

/* ==================================================
   RESPONSIVE HERO VIDEO
   1000px 기준으로 PC / 모바일 영상 교체
================================================== */
(function initResponsiveHeroVideo() {
    "use strict";

    const hero = document.getElementById("hero");
    const video = document.getElementById("heroVideo");
    const source = document.getElementById("heroVideoSource");

    if (!hero || !video || !source) return;

    const mobileQuery = window.matchMedia("(max-width: 1000px)");
    let currentMode = "";

    function getVideoSettings() {
        const isMobile = mobileQuery.matches;

        return {
            mode: isMobile ? "mobile" : "desktop",
            src: isMobile
                ? video.dataset.mobileSrc
                : video.dataset.desktopSrc,
            poster: isMobile
                ? video.dataset.mobilePoster
                : video.dataset.desktopPoster
        };
    }

    function applyVideoSource() {
        const settings = getVideoSettings();

        if (!settings.src || currentMode === settings.mode) return;

        currentMode = settings.mode;
        hero.classList.remove("hero-loaded");

        source.src = settings.src;

        if (settings.poster) {
            video.poster = settings.poster;
        } else {
            video.removeAttribute("poster");
        }

        video.load();

        const playPromise = video.play();

        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(function () {
                /*
                   브라우저가 자동 재생을 막더라도
                   포스터와 HTML 타이틀은 정상적으로 보입니다.
                */
            });
        }
    }

    function showHeroCopy() {
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                hero.classList.add("hero-copy-on");
            });
        });
    }

    video.addEventListener("loadeddata", function () {
        hero.classList.add("hero-loaded");
    });

    video.addEventListener("canplay", function () {
        hero.classList.add("hero-loaded");
    });

    video.addEventListener("error", function () {
        /*
           사용자가 아직 영상을 넣지 않았을 때도
           타이틀과 배경은 유지됩니다.
        */
        hero.classList.add("hero-loaded");
    });

    applyVideoSource();
    showHeroCopy();

    if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", applyVideoSource);
    } else {
        mobileQuery.addListener(applyVideoSource);
    }
})();



/* FOOTER TOP BUTTON */
document.querySelector('#footer .top_circle')?.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
