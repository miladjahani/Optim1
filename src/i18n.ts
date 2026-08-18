export const translations = {
  fa: {
    app_title: 'CF-Optimizor — بهینه‌ساز پیشرفته کانفیگ و تزریق فرگمنت',
    app_subtitle: 'سیستم ۱۰۰٪ کلاینت‌ساید بهینه‌سازی کانفیگ‌های VLESS و Trojan با آی‌پی تمیز و TLS Fragment ضد فیلتر',

    // Tabs
    tab_quick_opt: '⚡ بهینه‌ساز سریع کانفیگ',
    tab_fragment_lab: '🧪 آزمایشگاه فرگمنت',
    tab_clean_ips: '🌐 بانک آی‌پی‌های تمیز',
    tab_converter: '🔄 مبدل جامع کلاینت‌ها',
    tab_batch_sub: '🧹 پاک‌سازی و ترکیب ساب',
    tab_toolkit: '🧰 جعبه ابزار و QR',
    tab_offline_hub: '📱 هاب آفلاین و ترموکس',

    // Global
    theme_toggle: 'تغییر تم رنگی',
    lang_toggle: 'English',
    pwa_install: 'نصب اپلیکیشن (PWA)',
    copy: 'کپی',
    copied: 'کپی شد!',
    clear: 'پاک‌سازی',
    apply: 'اعمال تنظیمات',
    export: 'دریافت خروجی',
    paste: 'جای‌گذاری',
    loading: 'در حال پردازش...',

    // Quick Optimizer Tab
    quick_title: 'بهینه‌سازی سریع و خودکار کانفیگ با فرگمنت و آی‌پی تمیز',
    quick_desc: 'کانفیگ خام یا سابسکریپشن خود را وارد کنید تا پارامترهای ضد فیلترینگ، فرگمنت و آی‌پی تمیز به صورت خودکار اعمال شوند.',
    input_placeholder: 'کانفیگ خام خود (vless://, trojan://, vmess://) یا لینک سابسکریپشن را اینجا وارد کنید...',
    preset_anti_dpi: 'ضد فیلتر قوی (Fragment + EarlyData)',
    preset_multi_operator: 'تولید چندمسیره برای همه اپراتورها',
    preset_gaming: 'کاهش پینگ و تاخیر گیمینگ',
    preset_balanced: 'پایداری متوازن (توصیه شده)',

    // Fragment Lab
    frag_title: 'آزمایشگاه تخصصی تنظیمات TLS Fragment و پارامترهای ضد DPI',
    frag_desc: 'تنظیم دقیق بسته‌های ClientHello و تکه‌تکه‌سازی پکت‌های رمزنگاری برای عبور بدون اختلال از فیلترینگ هوشمند',
    frag_length: 'طول پکت (Length):',
    frag_interval: 'بازه زمانی (Interval):',
    frag_packets: 'بسته‌های پکت (Packets):',
    frag_early_data: 'پارامتر EarlyData (ed):',
    frag_alpn: 'پروتکل ALPN:',
    frag_fp: 'اثر انگشت مرورگر (Fingerprint):',

    // Clean IPs
    ip_title: 'بانک جامع و سنجش پینگ زنده آی‌پی‌های تمیز کلودفلر',
    ip_desc: 'سنجش پینگ لحظه‌ای روی اپراتورهای همراه اول، ایرانسل، رایتل، مخابرات و جایگزینی خودکار روی کانفیگ',
    ip_test_start: 'شروع تست پینگ زنده',
    ip_test_testing: 'در حال سنجش تاخیر...',
    ip_replace_btn: 'تزریق سریع‌ترین آی‌پی به کانفیگ',
    ip_multi_gen_btn: 'تولید نسخه تفکیک‌شده برای هر اپراتور',

    // Converter
    conv_title: 'مبدل جامع سابسکریپشن به Sing-Box، Clash Meta و Xray',
    conv_desc: 'تبدیل کانفیگ‌های بهینه‌شده به پروفایل کامل Sing-Box (JSON 1.10+)، Clash Meta (YAML) و لینک‌های مستقیم',
    conv_singbox: 'خروجی Sing-Box 1.10+ (JSON)',
    conv_clash: 'خروجی Clash Meta / Mihomo (YAML)',
    conv_v2ray: 'لینک‌های مستقیم V2Ray / Xray',
    conv_base64: 'سابسکریپشن کدگذاری شده Base64',

    // Batch Sub
    batch_title: 'پاک‌سازی، فیلتر و ترکیب دسته‌ای سابسکریپشن‌ها',
    batch_desc: 'حذف نودهای تکراری، مرتب‌سازی، ایموجی‌گذاری اپراتورها و ترکیب چند سابسکریپشن در یک خروجی یکپارچه',
    batch_dedup: 'حذف موارد تکراری (Deduplicate)',
    batch_add_emojis: 'افزودن ایموجی و برچسب اپراتور',

    // Toolkit
    tool_title: 'جعبه ابزار کلاینت، استودیو بارکد QR و ابزارهای رمزنگاری',
    tool_desc: 'تولید بارکد QR با فرمت برداری SVG، مبدل دوطرفه Base64 با پشتیبانی کامل از حروف فارسی و ساخت UUID v4',

    // Offline Hub
    offline_title: 'نسخه تک‌فایلی مستقل، حالت PWA آفلاین و اسکریپت ترموکس',
    offline_desc: 'استفاده ۱۰۰٪ بدون اینترنت، مستقل از سرور با بالاترین سرعت و حریم خصوصی کامل'
  },
  en: {
    app_title: 'CF-Optimizor — Client-Side Config Optimizer & Fragment Studio',
    app_subtitle: '100% Client-side VLESS / Trojan optimizer with Clean IPs and Anti-DPI TLS Fragment',

    // Tabs
    tab_quick_opt: '⚡ Quick Optimizer',
    tab_fragment_lab: '🧪 Fragment Lab',
    tab_clean_ips: '🌐 Clean IP Matrix',
    tab_converter: '🔄 Universal Converter',
    tab_batch_sub: '🧹 Batch Sub Cleaner',
    tab_toolkit: '🧰 Toolkit & QR',
    tab_offline_hub: '📱 Offline & Termux Hub',

    // Global
    theme_toggle: 'Toggle Theme',
    lang_toggle: 'فارسی',
    pwa_install: 'Install PWA App',
    copy: 'Copy',
    copied: 'Copied!',
    clear: 'Clear',
    apply: 'Apply Settings',
    export: 'Export',
    paste: 'Paste',
    loading: 'Processing...',

    // Quick Optimizer Tab
    quick_title: 'Automated Config Optimization with Fragment & Clean IPs',
    quick_desc: 'Paste raw config or subscription to automatically inject anti-DPI Fragment, EarlyData, and Clean IPs.',
    input_placeholder: 'Paste your raw vless://, trojan://, vmess:// config or sub link here...',
    preset_anti_dpi: 'Anti-DPI Ultra (Fragment + EarlyData)',
    preset_multi_operator: 'Multi-Route All Operators',
    preset_gaming: 'Low-Latency Gaming',
    preset_balanced: 'Balanced & Resilient (Recommended)',

    // Fragment Lab
    frag_title: 'TLS Fragment & Anti-DPI Parameter Studio',
    frag_desc: 'Fine-tune TLS ClientHello packet chunking, timing, and EarlyData to bypass deep packet inspection.',
    frag_length: 'Chunk Length:',
    frag_interval: 'Interval Delay:',
    frag_packets: 'Packet Selection:',
    frag_early_data: 'EarlyData (ed):',
    frag_alpn: 'ALPN Protocol:',
    frag_fp: 'Browser Fingerprint:',

    // Clean IPs
    ip_title: 'Clean IP Matrix & Real-time HTTPS Latency Benchmark',
    ip_desc: 'Live latency benchmark for MCI, Irancell, Rightel, and automated IP injection into proxy configs.',
    ip_test_start: 'Run HTTPS Ping Test',
    ip_test_testing: 'Benchmarking...',
    ip_replace_btn: 'Inject Fastest IP to Config',
    ip_multi_gen_btn: 'Generate Operator Multi-Nodes',

    // Converter
    conv_title: 'Universal Subscription Converter for Sing-Box, Clash Meta & Xray',
    conv_desc: 'Convert optimized configs into Sing-Box 1.10+ JSON, Clash Meta YAML, or Base64 subscriptions.',
    conv_singbox: 'Sing-Box 1.10+ (JSON)',
    conv_clash: 'Clash Meta / Mihomo (YAML)',
    conv_v2ray: 'Raw V2Ray / Xray Links',
    conv_base64: 'Base64 Encoded Subscription',

    // Batch Sub
    batch_title: 'Batch Subscription Cleaner, Filter & Node Merger',
    batch_desc: 'Deduplicate identical nodes, batch-rename with operator emojis, and merge subscriptions.',
    batch_dedup: 'Deduplicate Identical Nodes',
    batch_add_emojis: 'Add Operator Emojis & Tags',

    // Toolkit
    tool_title: 'Client Toolkit, High-Res QR Studio & Utilities',
    tool_desc: 'Vector SVG QR Code generator, Unicode Base64 encoder/decoder, and RFC4122 UUID v4 generator.',

    // Offline Hub
    offline_title: 'Standalone Single-File HTML, Offline PWA & Termux Hub',
    offline_desc: '100% Offline client-side execution, zero external server dependency, privacy-first.'
  }
};
