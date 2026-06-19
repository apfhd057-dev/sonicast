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

        cards.forEach((card, i) => {
            const base = i * 560;
            const move = progress * 1120;
            let yPos = base - move;
            if (yPos < 0) yPos = 0;

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

/* PRODUCT SLIDE */
const productMarquee = document.querySelector('#products .product-marquee');
const productTrack = document.querySelector('#products .product-track');

if (productTrack && !productTrack.dataset.cloned) {
    const originalCards = Array.from(productTrack.children);

    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        productTrack.appendChild(clone);
    });

    productTrack.dataset.cloned = 'true';
}

/* PRODUCT CARD HOVER */
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        if (productMarquee && productMarquee.classList.contains('dragging')) return;

        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;

        card.style.transform = `translateY(-12px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* PRODUCT DRAG */
if (productMarquee && productTrack) {
    let isProductDrag = false;
    let productStartX = 0;
    let productBaseX = 0;

    function getTranslateX(el) {
        const transform = window.getComputedStyle(el).transform;
        if (!transform || transform === 'none') return 0;

        const matrix = new DOMMatrixReadOnly(transform);
        return matrix.m41;
    }

    productMarquee.addEventListener('pointerdown', e => {
        isProductDrag = true;
        productStartX = e.clientX;
        productBaseX = getTranslateX(productTrack);

        productMarquee.classList.add('dragging');
        productTrack.classList.add('is-dragging');
        productTrack.style.animationPlayState = 'paused';
        productTrack.style.transform = `translateX(${productBaseX}px)`;

        productMarquee.setPointerCapture(e.pointerId);
    });

    productMarquee.addEventListener('pointermove', e => {
        if (!isProductDrag) return;

        const moveX = e.clientX - productStartX;
        productTrack.style.transform = `translateX(${productBaseX + moveX}px)`;
    });

    function endProductDrag(e) {
        if (!isProductDrag) return;

        isProductDrag = false;
        productMarquee.classList.remove('dragging');

        if (e && productMarquee.hasPointerCapture(e.pointerId)) {
            productMarquee.releasePointerCapture(e.pointerId);
        }

        productTrack.classList.remove('is-dragging');
        productTrack.style.transform = '';
        productTrack.style.animationPlayState = 'running';
    }

    productMarquee.addEventListener('pointerup', endProductDrag);
    productMarquee.addEventListener('pointercancel', endProductDrag);
}

/* RIBBON */
document.querySelectorAll('.ribbon-text').forEach(track => {
    if (track.dataset.filled === 'true') return;

    const original = track.innerHTML;
    track.innerHTML = original.repeat(8);
    track.innerHTML += track.innerHTML;
    track.dataset.filled = 'true';
});

/* SNS SPREAD */
function updateSnsSpread() {
    const section = document.querySelector('.sns-spread-section');
    const cards = document.querySelectorAll('[data-spread-card]');
    if (!section || !cards.length || window.innerWidth <= 900) return;

    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const raw = total > 0 ? -rect.top / total : 0;
    const p = clamp(raw, 0, 1);
    const ease = 1 - Math.pow(1 - p, 3);

    const vw = window.innerWidth;
    const spreadX = [
        -Math.min(vw * 0.43, 690),
        -Math.min(vw * 0.16, 260),
         Math.min(vw * 0.16, 260),
         Math.min(vw * 0.43, 690)
    ];

    const stackX = [-30, -10, 10, 30];
    const startRot = [-10, -4, 4, 10];
    const endRot = [-4, 3, -2, 3];
    const startY = [26, 14, 8, 0];
    const endY = [18, 42, 22, 36];
    const scales = [.94, .97, .99, 1];

    cards.forEach((card, i) => {
        const x = stackX[i] + (spreadX[i] - stackX[i]) * ease;
        const y = startY[i] + (endY[i] - startY[i]) * ease;
        const rot = startRot[i] + (endRot[i] - startRot[i]) * ease;
        const scale = scales[i] + (1 - scales[i]) * ease;

        card.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px) rotate(${rot}deg) scale(${scale})`;
        card.style.opacity = 1;
    });
}

window.addEventListener('scroll', updateSnsSpread);
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