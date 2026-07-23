$(document).ready(function () {
    const $header = $("#header");
    const $subMenus = $("#nav .sub");
    const $subArea = $(".submn_area");

    function closeDesktopMenu() {
        $subMenus.stop(true, true).hide();

        $subArea
            .stop(true, true)
            .css({ height: 0 })
            .hide();
    }

    function openDesktopMenu() {
        if (window.innerWidth <= 1024) {
            closeDesktopMenu();
            return;
        }

        $subArea
            .stop(true, true)
            .show()
            .animate({ height: 300 }, 200);

        $subMenus
            .stop(true, true)
            .fadeIn(150);
    }

    closeDesktopMenu();

    $header.on("mouseenter.desktopMenu", openDesktopMenu);

    $header.on("mouseleave.desktopMenu", function () {
        if (window.innerWidth <= 1024) {
            closeDesktopMenu();
            return;
        }

        $subMenus
            .stop(true, true)
            .fadeOut(100);

        $subArea
            .stop(true, true)
            .delay(50)
            .animate({ height: 0 }, 150, function () {
                $(this).hide();
            });
    });

    $(window).on("resize.desktopMenu", function () {
        if (window.innerWidth <= 1024) {
            closeDesktopMenu();
        }
    });
});


        // 메인이미지 슬라이드

        $(document).ready(function(){
            var visual = $('.main_img > li:not(.btn_wrap)');
            var button = $('.btn > li');
            var current = 0;
            var setIntervalId;

            button.click(function(e){
                e.preventDefault();

                var i = $(this).index();

                move(i);
                

            });

            function move(i){
                var currentEl = visual.eq(current);
                var nextEl = visual.eq(i);

                currentEl.css({left:0}).stop().animate({left:'-100%'});
                nextEl.css({left:'100%'}).stop().animate({left:'0'});

                button.removeClass('on').eq(i).addClass('on');

                current = i;
            }
            
            //자동실행함수
            function timer(){
            clearInterval(setIntervalId);
            setIntervalId = setInterval(function(){
                var n = current+1;
                if(n== visual.length){
                    n=0;

                }
                move(n);
            },3000)
            }
            timer();

            //자동실행을 중지하는 함수
            $('#main').on({

                mouseover:function(){
                    clearInterval(setIntervalId);
                },
                mouseout:function(){
                    timer();
                }
                
            })

        });



// 학습 도서 무한 슬라이드
document.addEventListener("DOMContentLoaded", function () {
    const bookData = {
        all: [
            { title: "Grammar Inside 1", desc: "많은 양의 문제를 반복 연습하여 문법 기초를 다지는 초등 영문법", image: "./images/elementary1.png", link: "#" },
            { title: "중등 내신백신 기출문제집 English 2", desc: "내신 백점을 위한 NE능률 교과서 내신 대비서", image: "./images/middle1.png", link: "#" },
            { title: "High School English Reading & Writing 자습서", desc: "2022 개정 교육과정 High School English Reading & Writing의 핵심 내용 완벽 정리", image: "./images/high1.png", link: "#" },
            { title: "Read It! 30 1", desc: "단계별 필수 학습 요소를 쉽고, 재미있게 익히는 독해력 향상 Reading 시리즈", image: "./images/etc1.png", link: "#" },
            { title: "사고셈 초등", desc: "생각의 힘을 키우는 연산", image: "./images/elementary2.png", link: "#" }
        ],

        elementary: [
            { title: "Grammar Inside 1", desc: "많은 양의 문제를 반복 연습하여 문법 기초를 다지는 초등 영문법", image: "./images/elementary1.png", link: "#" },
            { title: "사고셈 초등", desc: "생각의 힘을 키우는 연산", image: "./images/elementary2.png", link: "#" },
            { title: "수능까지 이어지는 초등 고학년 수학 대수1-1 심화편", desc: "상위권 수능 전략", image: "./images/elementary3.png", link: "#" },
            { title: "Subject Link 1 (2nd Edition)", desc: "주제별 통합 교과과정 프로그램을 바탕으로 창의·융합적 사고를 길러주는 Reading 시리즈", image: "./images/elementary4.png", link: "#" },
            { title: "능률VOCA 초등 기본 (2025 개정)", desc: "따라 쓰며 체계적으로 완성하는", image: "./images/elementary5.png", link: "#" }
        ],

        middle: [
            { title: "중등 내신백신 기출문제집 English 2", desc: "내신 백점을 위한 NE능률 교과서 내신 대비서", image: "./images/middle1.png", link: "#" },
            { title: "Middle School English 2", desc: "2022 개정 교육과정 Middle School English 2의 핵심 내용 완벽 정리", image: "./images/middle2.png", link: "#" },
            { title: "한수 중학국어 1-2", desc: "한 번에 수능까지 완성하는 중학국어", image: "./images/middle3.png", link: "#" },
            { title: "수심달(수학에 심장을 달다) 심화편", desc: "사고의 확장을 완성하다", image: "./images/middle4.png", link: "#" },
            { title: "경시 대수의 테크닉", desc: "KMO, 영재교, 과고, 자사고, 고등교내경시 대비 필독서", image: "./images/middle5.png", link: "#" }
        ],

        high: [
            { title: "High School English Reading & Writing 자습서", desc: "2022 개정 교육과정 High School English Reading & Writing의 핵심 내용 완벽 정리", image: "./images/high1.png", link: "#" },
            { title: "섹션뽀개기 극수필편", desc: "100명 전문가들의 확실한 실전 수능 국어 기출문제 해설서", image: "./images/high2.png", link: "#" },
            { title: "내신 HIGH-END(내신하이엔드)_미적분", desc: "1등급을 위한 심화 문제 공략서", image: "./images/high3.png", link: "#" },
            { title: "능률VOCA 고등 기본", desc: "내신부터 모의고사까지 대비하는 고등 기본 어휘", image: "./images/high4.png", link: "#" },
            { title: "내신백신 기출문제집 Common English 1", desc: "내신 1등급을 위한 NE능률 교과서 내신 대비서", image: "./images/high5.png", link: "#" }
        ],

        etc: [
            { title: "Read It! 30 1", desc: "단계별 필수 학습 요소를 쉽고, 재미있게 익히는 독해력 향상 Reading 시리즈", image: "./images/etc1.png", link: "#" },
            { title: "세 마리 토끼 잡는 역사 탐험 4.경상", desc: "책으로 만나고 엄마와 함께 떠나는 초등 역사 여행", image: "./images/etc2.png", link: "#" },
            { title: "Come On, Phonics 1: Student Book", desc: "기초부터 쉽고 재미있게 공부할 수 있는 Come On 시리즈의 새로운 파닉스 교재", image: "./images/etc3.png", link: "#" },
            { title: "Easy Link Starter 1", desc: "주제별 통합교과과정을 바탕으로 읽기의 기본기를 세워주는 Reading 시리즈", image: "./images/etc4.png", link: "#" },
            { title: "Come On, Everyone 1", desc: "영어의 기본기를 잡아주는, Input과 Output이 확실한 Real 코스북", image: "./images/etc5.png", link: "#" }
        ]
    };

    const buttons = document.querySelectorAll("#publish .category button");
    const mainBookImg = document.getElementById("mainBookImg");
    const mainBookTitle = document.getElementById("mainBookTitle");
    const mainBookDesc = document.getElementById("mainBookDesc");
    const mainBookLink = document.getElementById("mainBookLink");
    const previewList = document.getElementById("previewList");
    const prevBtn = document.querySelector("#publish .prev_btn");
    const nextBtn = document.querySelector("#publish .next_btn");
    const booksWrap = document.querySelector("#publish .books_wrap");

    let currentBooks = [];
    let currentIndex = 0;
    let autoSlide = null;

    function renderMainBook(book) {
        mainBookImg.src = book.image;
        mainBookImg.alt = book.title;
        mainBookTitle.textContent = book.title;
        mainBookDesc.textContent = book.desc;
        mainBookLink.href = book.link;
    }

    function renderPreview() {
        previewList.innerHTML = "";

        if (currentBooks.length <= 1) return;

        const previewCount = Math.min(4, currentBooks.length - 1);

        for (let offset = 1; offset <= previewCount; offset++) {
            const bookIndex = (currentIndex + offset) % currentBooks.length;
            const book = currentBooks[bookIndex];

            const item = document.createElement("div");
            item.className = "preview_item";
            item.dataset.index = String(bookIndex);

            item.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <p class="preview_title">${book.title}</p>
            `;

            item.addEventListener("click", function () {
                currentIndex = Number(this.dataset.index);
                updateBookSlider();
                restartAutoSlide();
            });

            previewList.appendChild(item);
        }
    }

    function updateBookSlider() {
        if (!currentBooks.length) return;

        renderMainBook(currentBooks[currentIndex]);
        renderPreview();
    }

    function moveBook(direction) {
        if (!currentBooks.length) return;

        currentIndex =
            (currentIndex + direction + currentBooks.length) %
            currentBooks.length;

        updateBookSlider();
    }

    function stopAutoSlide() {
        if (autoSlide) {
            clearInterval(autoSlide);
            autoSlide = null;
        }
    }

    function startAutoSlide() {
        stopAutoSlide();

        if (currentBooks.length <= 1) return;

        autoSlide = setInterval(function () {
            moveBook(1);
        }, 3000);
    }

    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    function renderTab(tabName) {
        const books = bookData[tabName];

        if (!books || books.length === 0) return;

        currentBooks = books;
        currentIndex = 0;

        updateBookSlider();
        restartAutoSlide();
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            buttons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");
            renderTab(this.dataset.tab);
        });
    });

    prevBtn.addEventListener("click", function () {
        moveBook(-1);
        restartAutoSlide();
    });

    nextBtn.addEventListener("click", function () {
        moveBook(1);
        restartAutoSlide();
    });

    if (booksWrap) {
        booksWrap.addEventListener("mouseenter", stopAutoSlide);
        booksWrap.addEventListener("mouseleave", startAutoSlide);
    }

    renderTab("all");
});

//아래 탭메뉴
$(document).ready(function(){
    $('#notice .c_box').hide();
    $('#notice .c_box').eq(0).show();

    $('#notice .category button').click(function(){
        var i = $(this).index();

        $('#notice .category button').removeClass('active');
        $(this).addClass('active');

        $('#notice .c_box').hide();
        $('#notice .c_box').eq(i).show();
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const solutionData = {
        baby: [
            {
                tag: '#놀이형 콘텐츠 #월령 맞춤 설계',
                title: '아이 챌린지',
                desc: '영유아 월령 발달에 맞춰 바른 습관을 길러주는<br>홈스쿨 프로그램',
                image: './images/soution_img1.png',
                link: '#'
            },
            {
                tag: '#창의력 발달 #놀이 학습',
                title: 'NE Kids',
                desc: '누리과정을 반영한 독서,영어 등<br>유아교육 프로그램',
                image: './images/soution_img2.png',
                link: '#'
            }
        ],

        student: [
            {
                tag: '#수준별 학습 #교과 연계',
                title: '교과서',
                desc: '오랜 교육 연구 노하우로 만든<br>중고등 영어, 수학, 제2외국어 교과서',
                image: './images/student_img1.png',
                link: '#'
            },
            {
                tag: '#내신 대비 #학습 관리',
                title: '학습서',
                desc: '영어,수학,국어,ELT 등 다양한 학습 교재',
                image: './images/student_img2.png',
                link: '#'
            },
            {
                tag: '#자기주도학습 #실력 향상',
                title: 'NE능률 주니어랩',
                desc: '초ㆍ중등 영어학습의 모든것,<br>No.1 영어전문학원',
                image: './images/student_img3.png',
                link: '#'
            },
            {
                tag: '#자기주도학습 #실력 향상',
                title: 'NETimes',
                desc: '영어 실력과 비판적 사고력을<br>키워주는 초중고 교육용 영자신문',
                image: './images/student_img4.png',
                link: '#'
            }
        ]
    };

    const tabButtons = document.querySelectorAll('#solution .category button');
    const solutionImg = document.getElementById('solutionImg');
    const solutionTag = document.getElementById('solutionTag');
    const solutionTitle = document.getElementById('solutionTitle');
    const solutionDesc = document.getElementById('solutionDesc');
    const solutionDots = document.getElementById('solutionDots');
    const solutionCurrent = document.getElementById('solutionCurrent');
    const solutionTotal = document.getElementById('solutionTotal');
    const solutionPrev = document.getElementById('solutionPrev');
    const solutionNext = document.getElementById('solutionNext');

    let currentTab = 'baby';
    let currentIndex = 0;

    function renderSolution() {
        const list = solutionData[currentTab];
        const item = list[currentIndex];

        solutionImg.src = item.image;
        solutionImg.alt = item.title;
        solutionTag.textContent = item.tag;
        solutionTitle.textContent = item.title;
        solutionDesc.innerHTML = item.desc;

        solutionCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
        solutionTotal.textContent = String(list.length).padStart(2, '0');

        renderDots();
    }

    function renderDots() {
        const list = solutionData[currentTab];
        solutionDots.innerHTML = '';

        list.forEach(function (item, index) {
            const dot = document.createElement('button');

            if (index === currentIndex) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', function () {
                currentIndex = index;
                renderSolution();
            });

            solutionDots.appendChild(dot);
        });
    }

    tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            tabButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });

            this.classList.add('active');

            currentTab = this.dataset.solutionTab;
            currentIndex = 0;

            renderSolution();
        });
    });

    solutionNext.addEventListener('click', function () {
        const list = solutionData[currentTab];

        currentIndex++;

        if (currentIndex >= list.length) {
            currentIndex = 0;
        }

        renderSolution();
    });

    solutionPrev.addEventListener('click', function () {
        const list = solutionData[currentTab];

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = list.length - 1;
        }

        renderSolution();
    });

    renderSolution();
});

/* ==================================================
   SCROLL REVEAL MOTION
   배경 장식 오브제 없이 콘텐츠 등장 효과만 적용
================================================== */
(function () {
    "use strict";

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let revealObserver = null;

    function observeElement(element) {
        if (
            reducedMotion.matches ||
            !("IntersectionObserver" in window)
        ) {
            element.classList.add("is-visible");
            return;
        }

        revealObserver.observe(element);
    }

    function addReveal(selector, options) {
        const settings = Object.assign(
            {
                type: "",
                startDelay: 0,
                step: 0
            },
            options || {}
        );

        document.querySelectorAll(selector).forEach(function (element, index) {
            if (element.classList.contains("motion-reveal")) return;

            element.classList.add("motion-reveal");

            if (settings.type) {
                element.classList.add(settings.type);
            }

            element.style.setProperty(
                "--motion-delay",
                (settings.startDelay + index * settings.step) + "ms"
            );

            observeElement(element);
        });
    }

    function retriggerSwap(element) {
        if (!element) return;

        element.classList.remove("motion-swap");
        void element.offsetWidth;
        element.classList.add("motion-swap");
    }

    function observeImageSwap(image, target) {
        if (
            !image ||
            !target ||
            !("MutationObserver" in window)
        ) {
            return;
        }

        const observer = new MutationObserver(function (mutations) {
            const srcChanged = mutations.some(function (mutation) {
                return (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "src"
                );
            });

            if (srcChanged) {
                retriggerSwap(target);
            }
        });

        observer.observe(image, {
            attributes: true,
            attributeFilter: ["src"]
        });
    }

    function preparePreviewItems() {
        addReveal("#previewList .preview_item", {
            type: "motion-pop",
            startDelay: 0,
            step: 65
        });
    }

    function observePreviewList() {
        const previewList = document.getElementById("previewList");

        if (
            !previewList ||
            !("MutationObserver" in window)
        ) {
            return;
        }

        const observer = new MutationObserver(function () {
            requestAnimationFrame(preparePreviewItems);
        });

        observer.observe(previewList, {
            childList: true
        });

        preparePreviewItems();
    }

    function initScrollMotion() {
        document.documentElement.classList.add("motion-ready");

        revealObserver = "IntersectionObserver" in window
            ? new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    });
                },
                {
                    threshold: .14,
                    rootMargin: "0px 0px -8% 0px"
                }
            )
            : null;

        /* HISTORY */
        addReveal("#history .history_section > *", {
            startDelay: 0,
            step: 100
        });

        addReveal("#history ul > li", {
            type: "motion-pop",
            startDelay: 0,
            step: 105
        });

        addReveal("#history .bottom_text", {
            type: "motion-left"
        });

        /* PUBLISH */
        addReveal("#publish .section_title > *", {
            startDelay: 0,
            step: 95
        });

        addReveal("#publish .category button", {
            type: "motion-pop",
            startDelay: 70,
            step: 60
        });

        addReveal("#publish .book_thumb", {
            type: "motion-left"
        });

        addReveal("#publish .book_info", {
            type: "motion-right",
            startDelay: 90
        });

        addReveal("#publish .book_arrow", {
            type: "motion-pop",
            startDelay: 130
        });

        /* SOLUTION */
        addReveal("#solution .section_title > *", {
            startDelay: 0,
            step: 95
        });

        addReveal("#solution .visual", {
            type: "motion-left"
        });

        addReveal("#solution .r_text", {
            type: "motion-right",
            startDelay: 95
        });

        addReveal("#solution .slide_r", {
            type: "motion-pop",
            startDelay: 170
        });

        /* TEACHER */
        addReveal("#teacher .section_title > *", {
            startDelay: 0,
            step: 95
        });

        addReveal("#teacher .t_list > li", {
            type: "motion-pop",
            startDelay: 0,
            step: 120
        });

        /* NOTICE */
        addReveal("#notice .section_title > *", {
            startDelay: 0,
            step: 95
        });

        addReveal("#notice > .n_section > .category button", {
            type: "motion-pop",
            startDelay: 65,
            step: 65
        });

        addReveal("#notice .notice_wrap li", {
            startDelay: 0,
            step: 65
        });

        addReveal("#notice .social_box", {
            type: "motion-pop",
            startDelay: 0,
            step: 110
        });

        addReveal("#notice .promotion_box", {
            type: "motion-pop",
            startDelay: 0,
            step: 80
        });

        observePreviewList();

        observeImageSwap(
            document.getElementById("mainBookImg"),
            document.querySelector("#publish .book_main")
        );

        observeImageSwap(
            document.getElementById("solutionImg"),
            document.querySelector("#solution .s_inner")
        );
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initScrollMotion,
            { once: true }
        );
    } else {
        initScrollMotion();
    }
})();

/* ==================================================
   MOBILE SITEMAP
================================================== */
(function () {
    "use strict";

    const openButton = document.querySelector(".hamburger_btn");
    const sitemap = document.getElementById("mobileSitemap");
    const closeButton = document.querySelector(".mobile_close_btn");
    const mobileLinks = document.querySelectorAll(
        ".mobile_sitemap a"
    );

    if (!openButton || !sitemap || !closeButton) return;

    function openMenu() {
        sitemap.classList.add("is-open");
        sitemap.setAttribute("aria-hidden", "false");

        openButton.setAttribute("aria-expanded", "true");
        openButton.setAttribute("aria-label", "전체 메뉴 닫기");

        document.body.classList.add("menu-open");

        requestAnimationFrame(function () {
            closeButton.focus();
        });
    }

    function closeMenu() {
        sitemap.classList.remove("is-open");
        sitemap.setAttribute("aria-hidden", "true");

        openButton.setAttribute("aria-expanded", "false");
        openButton.setAttribute("aria-label", "전체 메뉴 열기");

        document.body.classList.remove("menu-open");
    }

    openButton.addEventListener("click", function () {
        const isOpen = sitemap.classList.contains("is-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    closeButton.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            sitemap.classList.contains("is-open")
        ) {
            closeMenu();
            openButton.focus();
        }
    });

    mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (this.getAttribute("href") !== "#") {
                closeMenu();
            }
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    });
})();

/* ==================================================
   RESPONSIVE MAIN VISUAL IMAGE FALLBACK
   태블릿·모바일 이미지가 없을 때 데스크톱 이미지로 복구
================================================== */
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("#main .main_img picture img").forEach(function (image) {
        image.addEventListener("error", function handleMainImageError() {
            const fallback = this.dataset.fallback;

            if (!fallback || this.src.endsWith(fallback.replace("./", "/"))) {
                return;
            }

            const picture = this.closest("picture");

            if (picture) {
                picture.querySelectorAll("source").forEach(function (source) {
                    source.remove();
                });
            }

            this.src = fallback;
        });
    });
});

