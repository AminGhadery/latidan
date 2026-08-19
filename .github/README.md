# فعال‌سازی بررسی خودکار (GitHub Actions)

فایل `ci-workflow.yml` در همین پوشه، گردش‌کار آماده‌ای برای بررسی خودکار کیفیت وب‌سایت است.

به دلیل محدودیت مجوز، این فایل نتوانست مستقیماً در مسیر نهایی خود قرار بگیرد.
برای فعال‌سازی، کافی است یک‌بار این دو دستور را اجرا کنید:

```bash
mkdir -p .github/workflows
git mv .github/ci-workflow.yml .github/workflows/ci.yml
git commit -m "فعال‌سازی بررسی خودکار در GitHub Actions"
git push
```

یا از طریق وب‌سایت گیت‌هاب: دکمه **Add file → Create new file**، نام مسیر را
`.github/workflows/ci.yml` بگذارید و محتوای `ci-workflow.yml` را در آن کپی کنید.

## این گردش‌کار چه چیزی را بررسی می‌کند؟

در هر Push و Pull Request روی شاخه `main`:

| بررسی | توضیح |
|---|---|
| بیلد CSS | اجرای `npm run build` |
| هم‌خوانی CSS | مطمئن می‌شود `assets/css/main.css` با `src/input.css` هماهنگ است |
| ارجاع‌های محلی | هیچ `src` یا `href` محلی به فایل ناموجود اشاره نکند |
| لنگرهای داخلی | هر `href="#..."` مقصد واقعی داشته باشد |
| اعتبار JSON-LD | بلوک‌های Schema.org معتبر باشند |
| اعتبار XML/manifest | `sitemap.xml` و `manifest.webmanifest` سالم باشند |
| حجم تصاویر | هشدار برای تصاویر بزرگ‌تر از ۴۰۰ کیلوبایت |
