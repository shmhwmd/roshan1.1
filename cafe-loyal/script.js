// ==========================================
// مدیریت منوی موبایل (Hamburger Menu)
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

// ==========================================
// افکت Spotlight: آیتم وسط بزرگ‌تر، اطراف کوچک‌تر و محو (نسخه نهایی)
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    var scrollItems = document.querySelectorAll('.food-card, .section-head, .category-tile');

    function updateScrollEffect() {
        var viewportHeight = window.innerHeight;
        var viewportCenter = viewportHeight / 2;

        // بازه وسیع‌تر: عنصر تا فاصله 90% از مرکز، بزرگ و واضح می‌ماند
        // و فقط در لبه‌های خیلی بالا و پایین کمی کوچک و محو می‌شود
        var range = 0.9; 

        scrollItems.forEach(function (item) {
            var rect = item.getBoundingClientRect();
            var itemCenter = rect.top + rect.height / 2;
            
            var distance = Math.abs(itemCenter - viewportCenter) / viewportCenter;
            
            // محدود کردن فاصله به بازه 0 تا 1
            var normalizedDistance = Math.min(distance / range, 1);

            // شدت تغییرات بسیار ملایم‌تر (برای حفظ وضوح در بخش بزرگی از صفحه)
            // حداکثر کوچک‌شدن فقط 0.85 و حداکثر محوشدگی فقط 0.7
            var scale = 1 - (normalizedDistance * 0.15); 
            var opacity = 1 - (normalizedDistance * 0.3); 

            item.style.transform = 'scale(' + scale + ')';
            item.style.opacity = opacity;
        });
    }

    // اجرای اولیه
    updateScrollEffect();

    // اجرا هنگام اسکرول با نرمی کامل
    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateScrollEffect();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    window.addEventListener('resize', updateScrollEffect);
});