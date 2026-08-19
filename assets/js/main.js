/* ==========================================================================
   روستای لاتیدان (کلمتلی) — اسکریپت اصلی
   ========================================================================== */
(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // مسیر پایه پروژه — نسخه انگلیسی داخل پوشه /en/ قرار دارد
    var isEnglish = document.documentElement.lang === 'en';
    var BASE = isEnglish ? '../' : './';
    var LOCALE = isEnglish ? 'en-US' : 'fa-IR';

    /* ==================== حالت تاریک ==================== */
    function initTheme() {
        var toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', function () {
            var isDark = document.documentElement.classList.toggle('dark');
            try {
                localStorage.setItem('latidan-theme', isDark ? 'dark' : 'light');
            } catch (e) {}
            var meta = document.querySelector('meta[name="theme-color"]');
            if (meta) meta.setAttribute('content', isDark ? '#12100E' : '#8B7355');
        });
    }

    /* ==================== منوی موبایل ==================== */
    function initMobileMenu() {
        var btn = document.getElementById('mobile-menu-btn');
        var menu = document.getElementById('mobile-menu');
        if (!btn || !menu) return;

        btn.addEventListener('click', function () {
            var open = menu.classList.toggle('active');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ==================== هدر چسبان ==================== */
    function initStickyHeader() {
        var header = document.getElementById('header');
        if (!header) return;

        function update() {
            if (window.scrollY > 60) {
                header.classList.add('shadow-lg');
                header.classList.remove('shadow-md');
            } else {
                header.classList.add('shadow-md');
                header.classList.remove('shadow-lg');
            }
        }
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ==================== نوار پیشرفت خواندن ==================== */
    function initReadingProgress() {
        var bar = document.getElementById('reading-progress');
        if (!bar) return;

        window.addEventListener('scroll', function () {
            var height = document.documentElement.scrollHeight - window.innerHeight;
            var pct = height > 0 ? (window.scrollY / height) * 100 : 0;
            bar.style.width = pct + '%';
        }, { passive: true });
    }

    /* ==================== انیمیشن ورود عناصر ==================== */
    function initScrollAnimations() {
        var els = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
        if (!els.length) return;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.classList.add('visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

        els.forEach(function (el) { observer.observe(el); });
    }

    /* ==================== شمارنده‌های متحرک ==================== */
    function initCounters() {
        var counters = document.querySelectorAll('[data-counter]');
        if (!counters.length) return;

        function format(value, suffix) {
            return value.toLocaleString(LOCALE, { useGrouping: false }) + (suffix || '');
        }

        function run(el) {
            var target = parseInt(el.dataset.target, 10) || 0;
            var suffix = el.dataset.suffix || '';

            if (prefersReducedMotion) {
                el.textContent = format(target, suffix);
                return;
            }

            var duration = 1600;
            var start = performance.now();

            function tick(now) {
                var p = Math.min((now - start) / duration, 1);
                var eased = 1 - Math.pow(1 - p, 3);
                el.textContent = format(Math.round(target * eased), p === 1 ? suffix : '');
                if (p < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        }

        if (!('IntersectionObserver' in window)) {
            counters.forEach(run);
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    run(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(function (el) { observer.observe(el); });
    }

    /* ==================== سوالات متداول ==================== */
    function initFaq() {
        var items = document.querySelectorAll('.faq-item');
        items.forEach(function (item) {
            var btn = item.querySelector('.faq-question');
            if (!btn) return;

            btn.addEventListener('click', function () {
                var isOpen = item.classList.contains('active');
                items.forEach(function (other) {
                    other.classList.remove('active');
                    var b = other.querySelector('.faq-question');
                    if (b) b.setAttribute('aria-expanded', 'false');
                });
                if (!isOpen) {
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    /* ==================== لایت‌باکس گالری ==================== */
    function initLightbox() {
        var triggers = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
        var overlay = document.getElementById('lightbox');
        var image = document.getElementById('lightbox-image');
        var caption = document.getElementById('lightbox-caption');
        var counter = document.getElementById('lightbox-counter');
        if (!triggers.length || !overlay || !image) return;

        var current = 0;
        var lastFocused = null;

        function render() {
            var t = triggers[current];
            var inner = t.querySelector('img');
            image.src = t.dataset.src || (inner ? inner.src : '');
            image.alt = t.dataset.caption || (inner ? inner.alt : '');
            if (caption) caption.textContent = t.dataset.caption || '';
            if (counter) {
                counter.textContent = (current + 1).toLocaleString(LOCALE) +
                    (isEnglish ? ' / ' : ' از ') +
                    triggers.length.toLocaleString(LOCALE);
            }
        }

        function open(index) {
            lastFocused = document.activeElement;
            current = index;
            render();
            overlay.classList.add('open');
            document.body.classList.add('lightbox-open');
            var close = document.getElementById('lightbox-close');
            if (close) close.focus();
        }

        function close() {
            overlay.classList.remove('open');
            document.body.classList.remove('lightbox-open');
            if (lastFocused) lastFocused.focus();
        }

        function step(delta) {
            current = (current + delta + triggers.length) % triggers.length;
            render();
        }

        triggers.forEach(function (t, i) {
            t.addEventListener('click', function () { open(i); });
        });

        var closeBtn = document.getElementById('lightbox-close');
        var prevBtn = document.getElementById('lightbox-prev');
        var nextBtn = document.getElementById('lightbox-next');
        if (closeBtn) closeBtn.addEventListener('click', close);
        if (prevBtn) prevBtn.addEventListener('click', function () { step(-1); });
        if (nextBtn) nextBtn.addEventListener('click', function () { step(1); });

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) close();
        });

        document.addEventListener('keydown', function (e) {
            if (!overlay.classList.contains('open')) return;
            if (e.key === 'Escape') close();
            // در چیدمان راست‌به‌چپ، جهت کلیدها معکوس است
            if (e.key === 'ArrowRight') step(isEnglish ? 1 : -1);
            if (e.key === 'ArrowLeft') step(isEnglish ? -1 : 1);
        });
    }

    /* ==================== نقشه تعاملی (Leaflet) ==================== */
    function initMap() {
        var el = document.getElementById('map');
        if (!el || typeof L === 'undefined') return;
        if (el.dataset.initialized === '1') return;
        el.dataset.initialized = '1';

        var points = isEnglish ? [
            {
                lat: 27.1919, lng: 55.7572,
                title: 'Latidan Bridge',
                text: 'The longest historical bridge in Iran — 233 arches, over 1000 m, Safavid era. National heritage no. 2005.'
            },
            {
                lat: 27.1428, lng: 55.7957,
                title: 'Latidan Village (Kolometli)',
                text: 'Gachin rural district, Bandar Abbas county, Hormozgan province.'
            },
            {
                lat: 27.1600, lng: 55.7957,
                title: 'Mount Latidan',
                text: 'Rocky heights north of the village overlooking the plain and nearby settlements.'
            },
            {
                lat: 27.1700, lng: 55.7700,
                title: 'Kol River',
                text: 'The seasonal river whose wide bed the historical bridge crosses.'
            }
        ] : [
            {
                lat: 27.1919, lng: 55.7572,
                title: 'پل تاریخی لاتیدان',
                text: 'طولانی‌ترین پل تاریخی ایران — ۲۳۳ دهانه، بیش از ۱۰۰۰ متر، دوره صفویه. ثبت ملی شماره ۲۰۰۵.'
            },
            {
                lat: 27.1428, lng: 55.7957,
                title: 'روستای لاتیدان (کلمتلی)',
                text: 'دهستان گچین، بخش مرکزی شهرستان بندرعباس، استان هرمزگان.'
            },
            {
                lat: 27.1600, lng: 55.7957,
                title: 'کوه لاتیدان',
                text: 'ارتفاعات صخره‌ای شمال روستا با چشم‌انداز دشت و روستاهای اطراف.'
            },
            {
                lat: 27.1700, lng: 55.7700,
                title: 'رودخانه کل',
                text: 'رودخانه سیلابی که پل تاریخی بر بستر عریض آن بنا شده است.'
            }
        ];

        // مسیر آیکون‌های پیش‌فرض Leaflet (نسخه self-host)
        if (L.Icon && L.Icon.Default) {
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: BASE + 'assets/vendor/leaflet/images/marker-icon-2x.png',
                iconUrl: BASE + 'assets/vendor/leaflet/images/marker-icon.png',
                shadowUrl: BASE + 'assets/vendor/leaflet/images/marker-shadow.png'
            });
        }

        var map = L.map(el, { scrollWheelZoom: false }).setView([27.168, 55.777], 12);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; مشارکت‌کنندگان <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
        }).addTo(map);

        var markers = {};
        points.forEach(function (p) {
            var marker = L.marker([p.lat, p.lng]).addTo(map);
            marker.bindPopup(
                '<div dir="' + (isEnglish ? 'ltr' : 'rtl') + '" style="text-align:' + (isEnglish ? 'left' : 'right') + '">' +
                '<strong style="color:#8B7355;font-size:15px">' + p.title + '</strong><br>' +
                '<span style="color:#444">' + p.text + '</span><br>' +
                '<a href="https://www.google.com/maps/dir/?api=1&destination=' + p.lat + ',' + p.lng +
                '" target="_blank" rel="noopener" style="color:#B8860B;font-weight:bold">' +
                (isEnglish ? 'Directions ↗' : 'مسیریابی ↗') + '</a></div>'
            );
            markers[p.lat + ',' + p.lng] = marker;
        });

        // دکمه‌های تمرکز روی نقطه خاص
        document.querySelectorAll('.map-focus').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var lat = parseFloat(btn.dataset.lat);
                var lng = parseFloat(btn.dataset.lng);
                var zoom = parseInt(btn.dataset.zoom, 10) || 14;
                if (isNaN(lat) || isNaN(lng)) return;

                document.getElementById('map-section').scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'center'
                });

                setTimeout(function () {
                    map.setView([lat, lng], zoom, { animate: !prefersReducedMotion });
                    var key = btn.dataset.lat + ',' + btn.dataset.lng;
                    var m = markers[key];
                    if (m) m.openPopup();
                }, prefersReducedMotion ? 0 : 500);
            });
        });
    }

    /* ==================== اسکرول نرم ==================== */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                var id = link.getAttribute('href');
                if (!id || id === '#') return;
                var target = document.querySelector(id);
                if (!target) return;

                e.preventDefault();
                var header = document.getElementById('header');
                var offset = header ? header.offsetHeight + 12 : 80;
                var top = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: top,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            });
        });
    }

    /* ==================== لینک فعال در منو ==================== */
    function initActiveNav() {
        var sections = document.querySelectorAll('section[id]');
        var links = document.querySelectorAll('.nav-link');
        if (!sections.length || !links.length) return;

        window.addEventListener('scroll', function () {
            var pos = window.scrollY + 140;
            var currentId = '';

            sections.forEach(function (section) {
                if (pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight) {
                    currentId = section.id;
                }
            });

            links.forEach(function (link) {
                var isActive = link.getAttribute('href') === '#' + currentId;
                link.classList.toggle('text-gold', isActive);
                link.classList.toggle('font-extrabold', isActive);
            });
        }, { passive: true });
    }

    /* ==================== بازگشت به بالا ==================== */
    function initScrollToTop() {
        var btn = document.getElementById('scroll-to-top');
        if (!btn) return;

        window.addEventListener('scroll', function () {
            btn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    /* ==================== اشتراک‌گذاری ==================== */
    function initShare() {
        var url = window.location.href.split('#')[0];
        var title = document.title;
        var enc = encodeURIComponent;

        var map = {
            'share-telegram': 'https://t.me/share/url?url=' + enc(url) + '&text=' + enc(title),
            'share-whatsapp': 'https://api.whatsapp.com/send?text=' + enc(title + ' ' + url),
            'share-twitter': 'https://twitter.com/intent/tweet?url=' + enc(url) + '&text=' + enc(title)
        };

        Object.keys(map).forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.href = map[id];
        });

        var copyBtn = document.getElementById('share-copy');
        var toast = document.getElementById('copy-toast');
        if (copyBtn) {
            copyBtn.addEventListener('click', function () {
                var done = function () {
                    if (!toast) return;
                    toast.style.opacity = '1';
                    setTimeout(function () { toast.style.opacity = '0'; }, 2200);
                };

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url).then(done).catch(done);
                } else {
                    var input = document.createElement('input');
                    input.value = url;
                    document.body.appendChild(input);
                    input.select();
                    try { document.execCommand('copy'); } catch (e) {}
                    document.body.removeChild(input);
                    done();
                }
            });
        }
    }

    /* ==================== سال شمسی جاری ==================== */
    function initYear() {
        var el = document.getElementById('current-year');
        if (!el) return;

        if (isEnglish) {
            el.textContent = new Date().getFullYear();
            return;
        }

        try {
            // سال هجری شمسی جاری
            el.textContent = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' })
                .format(new Date()).replace(/[^۰-۹0-9]/g, '');
        } catch (e) {
            el.textContent = new Date().getFullYear();
        }
    }

    /* ==================== سرویس‌ورکر (PWA) ==================== */
    function initServiceWorker() {
        if (!('serviceWorker' in navigator)) return;
        if (location.protocol !== 'https:' && location.hostname !== 'localhost') return;

        window.addEventListener('load', function () {
            navigator.serviceWorker.register(BASE + 'sw.js').catch(function () {});
        });
    }

    /* ==================== راه‌اندازی ==================== */
    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        initMobileMenu();
        initStickyHeader();
        initReadingProgress();
        initScrollAnimations();
        initCounters();
        initFaq();
        initLightbox();
        initMap();
        initSmoothScroll();
        initActiveNav();
        initScrollToTop();
        initShare();
        initYear();
        initServiceWorker();
    });
})();
