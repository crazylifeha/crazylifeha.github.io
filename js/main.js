/**
 * Academic Homepage Interactive Script
 * 包含：亮暗色主题切换、论文分类筛选、BibTeX展开与一键复制、新闻展开、导航高亮及平滑交互。
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTheme();
  initNavScroll();
  initPubFilters();
  initBibtexToggles();
  initNewsToggle();
  initBackToTop();
  initMobileMenu();
  initImageModal();
});

/* ==========================================================================
   0. 中英双语切换 (Language Toggle: EN / ZH)
   ========================================================================== */
function initLanguage() {
  const langToggleBtn = document.getElementById('lang-toggle');
  if (!langToggleBtn) return;

  // 优先读取本地存储，默认设为中文 zh 或 英文 en
  const savedLang = localStorage.getItem('site_lang') || 'zh';
  applyLanguage(savedLang);

  langToggleBtn.addEventListener('click', () => {
    const currentLang = document.body.getAttribute('data-lang') || 'zh';
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    applyLanguage(newLang);
    localStorage.setItem('site_lang', newLang);
    showToast(newLang === 'zh' ? '已切换至中文版' : 'Switched to English');
  });
}

function applyLanguage(lang) {
  document.body.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
  
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.innerHTML = lang === 'zh' 
      ? '<span>English</span>' 
      : '<span>中文版</span>';
    langToggleBtn.setAttribute('title', lang === 'zh' ? 'Switch to English' : '切换至中文版');
  }
}

/* ==========================================================================
   1. 主题切换 (Theme Toggle: Light / Dark)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // 读取本地存储或系统颜色偏好
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('🌙');
  } else {
    document.documentElement.removeAttribute('data-theme');
    updateThemeIcon('☀️');
  }
}

function updateThemeIcon(icon) {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('title', icon === '🌙' ? '切换为亮色模式' : '切换为暗色模式');
    themeToggleBtn.innerHTML = `<span>${icon}</span>`;
  }
}

/* ==========================================================================
   2. 论文筛选器 (Publications Filter)
   ========================================================================== */
function initPubFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubCards = document.querySelectorAll('.pub-card');

  if (!filterBtns.length || !pubCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 更新激活按钮样式
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      pubCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'grid';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3. BibTeX 展开与一键复制 (BibTeX Drawer & Copy)
   ========================================================================== */
function initBibtexToggles() {
  // 展开/折叠 BibTeX 按钮
  const bibtexBtns = document.querySelectorAll('.btn-bibtex-toggle');
  bibtexBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const box = document.getElementById(targetId);
      if (box) {
        box.classList.toggle('show');
        btn.classList.toggle('active');
      }
    });
  });

  // 一键复制 BibTeX 代码
  const copyBtns = document.querySelectorAll('.bibtex-copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const codeElement = btn.parentElement.querySelector('.bibtex-code');
      if (codeElement) {
        const textToCopy = codeElement.innerText.trim();
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('BibTeX 引用已复制到剪贴板！');
          const originalText = btn.innerText;
          btn.innerText = '已复制 ✓';
          setTimeout(() => {
            btn.innerText = originalText;
          }, 2000);
        }).catch(err => {
          console.error('复制失败:', err);
          showToast('复制失败，请手动选取复制');
        });
      }
    });
  });
}

/* ==========================================================================
   4. 新闻折叠与展开 (News Toggle)
   ========================================================================== */
function initNewsToggle() {
  const toggleBtn = document.getElementById('toggle-news-btn');
  const hiddenNewsItems = document.querySelectorAll('.news-item.news-hidden');

  if (!toggleBtn || !hiddenNewsItems.length) return;

  let isExpanded = false;

  toggleBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    hiddenNewsItems.forEach(item => {
      item.style.display = isExpanded ? 'block' : 'none';
    });
    toggleBtn.innerHTML = isExpanded 
      ? '收起历史动态 <span>▲</span>' 
      : `查看更多动态 (+${hiddenNewsItems.length}) <span>▼</span>`;
  });
}

/* ==========================================================================
   5. 平滑滚动与导航激活态 (Smooth Scroll & Nav Highlight)
   ========================================================================== */
function initNavScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  function onScroll() {
    let currentId = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (!currentId && sections.length > 0 && window.pageYOffset < sections[0].offsetTop) {
      currentId = sections[0].getAttribute('id');
    }

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   6. 移动端菜单开关 (Mobile Menu)
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  // 点击链接后自动收起菜单
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* ==========================================================================
   7. 回到顶部按钮 (Back to Top)
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   8. Toast 气泡通知 (Toast Notification)
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/* ==========================================================================
   9. 高清图片点击放大灯箱 (Lightbox Modal)
   ========================================================================== */
function initImageModal() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('image-modal-img');
  const closeBtn = document.querySelector('.image-modal-close');

  if (!modal || !modalImg) return;

  // 为所有论文预览图绑定放大查看事件
  const previewImgs = document.querySelectorAll('.pub-preview img');
  previewImgs.forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      modalImg.src = img.src;
      modalImg.alt = img.alt || '放大高清论文框架图';
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // 锁定背景滚动
    });
  });

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // 点击关闭按钮
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // 点击遮罩空白区域关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === closeBtn) {
      closeModal();
    }
  });

  // ESC 快捷键退出
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}
