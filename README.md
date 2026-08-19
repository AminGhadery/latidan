<div align="center">

<img src="assets/img/icon-192.png" width="110" alt="نشان پل لاتیدان">

# روستای لاتیدان (کلمتلی)

### وب‌سایت معرفی روستای لاتیدان و پل تاریخی لاتیدان — طولانی‌ترین پل تاریخی ایران

[![مشاهده وب‌سایت](https://img.shields.io/badge/🌐_مشاهده_وب‌سایت-D4AF37?style=for-the-badge)](https://aminghadery.github.io/latidan/)
[![English](https://img.shields.io/badge/🇬🇧_English_version-8B7355?style=for-the-badge)](https://aminghadery.github.io/latidan/en/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222?style=flat-square&logo=githubpages&logoColor=white)

</div>

---

## 📖 درباره پروژه

این پروژه یک وب‌سایت تک‌صفحه‌ای، سبک و کاملاً استاتیک است که به معرفی **روستای لاتیدان (کلمتلی)** در استان هرمزگان و مهم‌ترین اثر تاریخی آن، **پل لاتیدان**، می‌پردازد.

پل لاتیدان که در میان مردم محلی به **«پل کول»** شناخته می‌شود، سازه‌ای از **دوره صفویه** با بیش از **۵۰۰ سال قدمت**، **۲۳۳ دهانه** و طولی **بیش از ۱۰۰۰ متر** است — حدود سه برابر سی‌وسه‌پل اصفهان. این پل در تاریخ **۱ اردیبهشت ۱۳۷۷** با شماره ثبت **۲۰۰۵** در فهرست آثار ملی ایران به ثبت رسیده است.

> 🎯 **هدف پروژه:** معرفی این میراث کمترشناخته‌شده به گردشگران داخلی و خارجی، پژوهشگران تاریخ معماری و علاقه‌مندان به میراث فرهنگی ایران.

---

## ✨ امکانات

| قابلیت | توضیح |
|---|---|
| 🌍 **دوزبانه** | نسخه کامل فارسی (RTL) و انگلیسی (LTR) با تگ‌های `hreflang` |
| 🗺 **نقشه تعاملی** | Leaflet + OpenStreetMap با ۴ نشانگر و مسیریابی مستقیم — بدون نیاز به کلید API |
| 🌙 **حالت تاریک** | تشخیص خودکار تنظیمات سیستم + سوییچ دستی با ذخیره‌سازی در مرورگر |
| 📱 **PWA** | قابل نصب روی گوشی و کارکرد آفلاین با Service Worker — مناسب مناطق کم‌سیگنال |
| 🖼 **گالری لایت‌باکس** | نمایش تمام‌صفحه با پیمایش کیبورد و لمسی |
| 📊 **شمارنده متحرک** | نمایش آمار پل با انیمیشن و اعداد فارسی |
| 🕰 **خط زمانی** | تاریخچه پنج‌قرنی پل از دوره صفویه تا طرح مرمت امروز |
| ❓ **سوالات متداول** | آکاردئون تعاملی همراه با اسکیمای `FAQPage` برای نمایش در نتایج گوگل |
| 🧭 **راهنمای سفر** | مسیر دسترسی، بهترین فصل، وسایل موردنیاز و نکات ایمنی |
| 📤 **اشتراک‌گذاری** | دکمه‌های تلگرام، واتس‌اپ، ایکس و کپی لینک |
| 🔍 **سئوی کامل** | Open Graph، Twitter Card، Schema.org، sitemap و canonical |
| ♿ **دسترس‌پذیری** | ناوبری کامل با کیبورد، ARIA، حلقه فوکوس و پشتیبانی از `prefers-reduced-motion` |

---

## ⚡ عملکرد

تمام دارایی‌ها **self-host** شده‌اند — هیچ وابستگی به CDN خارجی وجود ندارد. این تصمیم برای کاربران داخل ایران که ممکن است به jsDelivr یا سایر CDNها دسترسی نداشته باشند، حیاتی است.

| مورد | قبل | بعد |
|---|---|---|
| CSS | ~۱۰۰KB جاوااسکریپت Tailwind CDN (بیلد در مرورگر) | **۳۲KB** CSS آماده |
| فونت | Vazir v30 از jsDelivr | **Vazirmatn v33** متغیر، self-host |
| تصاویر | ۱.۲MB فقط JPEG | **۶۲۴KB** WebP + fallback |
| نقشه | لینک ساده به گوگل‌مپ | Leaflet self-host (۱۹۲KB) |

---

## 🗂 ساختار پروژه

```
latidan/
├── index.html                  # صفحه اصلی (فارسی)
├── en/index.html               # نسخه انگلیسی
├── 404.html                    # صفحه خطای اختصاصی
├── manifest.webmanifest        # تنظیمات PWA
├── sw.js                       # سرویس‌ورکر (کش آفلاین)
├── sitemap.xml • robots.txt    # فایل‌های سئو
├── src/input.css               # منبع Tailwind ← ویرایش اینجا
├── tailwind.config.js
├── package.json
├── assets/
│   ├── css/main.css            # خروجی بیلد ← ویرایش نکنید
│   ├── js/main.js              # منطق سایت
│   ├── fonts/                  # وزیرمتن (self-host)
│   ├── img/                    # تصاویر JPEG + WebP + آیکون‌ها
│   └── vendor/leaflet/         # کتابخانه نقشه (self-host)
└── .github/workflows/ci.yml    # بررسی خودکار در هر PR
```

---

## 🚀 اجرای محلی

```bash
git clone https://github.com/AminGhadery/latidan.git
cd latidan

# فقط برای مشاهده سایت — نیازی به نصب چیزی نیست
python3 -m http.server 8080
# سپس مرورگر: http://localhost:8080
```

### ویرایش استایل‌ها

فایل `assets/css/main.css` **به‌صورت خودکار تولید می‌شود** و نباید مستقیماً ویرایش شود. تغییرات را در `src/input.css` اعمال کنید:

```bash
npm install

npm run dev     # حالت watch حین توسعه
npm run build   # ساخت نسخه فشرده نهایی (قبل از کامیت)
```

> ⚠️ پس از هر تغییر در `src/input.css` یا `tailwind.config.js`، حتماً `npm run build` را اجرا و خروجی را کامیت کنید. GitHub Actions این هم‌خوانی را در هر PR بررسی می‌کند.

---

## 🌐 انتشار

سایت روی **GitHub Pages** از شاخه `main` منتشر می‌شود. هر تغییری که به `main` مرج شود، ظرف چند دقیقه روی آدرس زیر زنده می‌شود:

**https://aminghadery.github.io/latidan/**

---

## 📚 منابع

اطلاعات تاریخی این وب‌سایت از منابع زیر گردآوری شده است:

- [ویکی‌پدیای فارسی — پل لاتیدان](https://fa.wikipedia.org/wiki/پل_لاتیدان)
- [ویکی‌پدیای فارسی — لاتیدان (بندرعباس)](https://fa.wikipedia.org/wiki/لاتیدان_(بندرعباس))
- [ویکی‌داده — Latidan Bridge (Q5942848)](https://www.wikidata.org/wiki/Q5942848)
- پایگاه اطلاعات معماری ایران (iranarchpedia)
- گزارش‌های خبرگزاری‌های داخلی درباره طرح مرمت پل

---

## 🤝 مشارکت

اگر عکس بهتری از پل دارید، اطلاعات تاریخی دقیق‌تری می‌دانید یا غلطی در متن دیدید، خوشحال می‌شویم Issue یا Pull Request باز کنید. به‌ویژه از این موارد استقبال می‌شود:

- 📷 تصاویر باکیفیت از پل، روستا و مناظر اطراف
- 📝 اصلاح یا تکمیل اطلاعات تاریخی همراه با منبع
- 🌐 بهبود ترجمه انگلیسی
- 🐛 گزارش باگ یا مشکل نمایشی در مرورگرها

---

## 📄 مجوز

شرایط استفاده از محتوای این پروژه در فایل [LICENSE](LICENSE) آمده است.

کتابخانه‌های استفاده‌شده مجوز مستقل خود را دارند:
[Vazirmatn](assets/fonts/OFL.txt) (SIL OFL 1.1) • [Leaflet](assets/vendor/leaflet/LICENSE) (BSD-2-Clause) • [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE) (MIT)

داده‌های نقشه © مشارکت‌کنندگان [OpenStreetMap](https://www.openstreetmap.org/copyright)

---

<div align="center">

**ساخته شده با ♥ برای معرفی میراث فرهنگی جنوب ایران**

</div>
