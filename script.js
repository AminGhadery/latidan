// ==================== تنظیمات اولیه ====================
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    handleMobileMenu();
    handleScrollAnimations();
    handleStickyHeader();
    handleScrollToTop();
    handleSmoothScroll();
    handleActiveNavLinks();
    initCounters();
    initFaq();
    initLightbox();
    setCurrentYear();
}

// ==================== منوی موبایل ====================
function handleMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileMenuBtn || !mobileMenu) return;

    const closeMenu = function () {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
    };

    mobileMenuBtn.addEventListener('click', function () {
        const isOpen = mobileMenu.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));

        const svg = this.querySelector('svg');
        if (isOpen) {
            svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        } else {
            svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
    });

    mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));
}

// ==================== انیمیشن اسکرول ====================
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// ==================== هدر ثابت ====================
function handleStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==================== دکمه بازگشت به بالا ====================
function handleScrollToTop() {
    const scrollButton = document.getElementById('scroll-to-top');
    if (!scrollButton) return;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });

    scrollButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== اسکرول نرم ====================
function handleSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight + 4;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== فعال‌سازی لینک‌های منو ====================
function handleActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== شمارنده‌های آمار ====================
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setFinalValue = function (el) {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        el.textContent = target.toLocaleString('fa-IR') + suffix;
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            observer.unobserve(el);

            if (reduceMotion) {
                setFinalValue(el);
                return;
            }

            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            const duration = 1600;
            const start = performance.now();

            const tick = function (now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased).toLocaleString('fa-IR') + suffix;

                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            };

            requestAnimationFrame(tick);
        });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
}

// ==================== آکاردئون سوالات متداول ====================
function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn) return;

        questionBtn.addEventListener('click', function () {
            const isOpen = item.classList.contains('active');

            // بستن همه سوالات باز
            document.querySelectorAll('.faq-item.active').forEach(openItem => {
                openItem.classList.remove('active');
                const openBtn = openItem.querySelector('.faq-question');
                if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                item.classList.add('active');
                questionBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ==================== لایت‌باکس گالری ====================
function initLightbox() {
    const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
    const overlay = document.getElementById('lightbox');
    if (!triggers.length || !overlay) return;

    const image = document.getElementById('lightbox-image');
    const caption = document.getElementById('lightbox-caption');
    const counter = document.getElementById('lightbox-counter');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let currentIndex = 0;

    const updateLightbox = function () {
        const trigger = triggers[currentIndex];
        const imgEl = trigger.querySelector('img');

        image.src = imgEl ? imgEl.getAttribute('src') : '';
        image.alt = imgEl ? imgEl.getAttribute('alt') : '';
        caption.textContent = trigger.dataset.caption || '';
        counter.textContent = (currentIndex + 1).toLocaleString('fa-IR') + ' / ' + triggers.length.toLocaleString('fa-IR');
    };

    const openLightbox = function (index) {
        currentIndex = index;
        updateLightbox();
        overlay.classList.add('open');
        document.body.classList.add('lightbox-open');
    };

    const closeLightbox = function () {
        overlay.classList.remove('open');
        document.body.classList.remove('lightbox-open');
    };

    const showPrev = function () {
        currentIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        updateLightbox();
    };

    const showNext = function () {
        currentIndex = (currentIndex + 1) % triggers.length;
        updateLightbox();
    };

    triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', function () {
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (!overlay.classList.contains('open')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showPrev();
        if (e.key === 'ArrowLeft') showNext();
    });
}

// ==================== سال شمسی در فوتر ====================
function setCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (!yearEl) return;

    const gregorianYear = new Date().getFullYear();
    const persianYear = new Intl.DateTimeFormat('en-US-u-ca-persian', { year: 'numeric' })
        .format(new Date());

    yearEl.textContent = persianYear + ' هجری شمسی (' + gregorianYear.toLocaleString('fa-IR') + ' میلادی)';
}

// ==================== لاگ موفقیت ====================
console.log('🏞️ وب‌سایت روستای لاتیدان با موفقیت بارگذاری شد!');
console.log('📍 پل تاریخی لاتیدان - طولانی‌ترین پل تاریخی ایران');
