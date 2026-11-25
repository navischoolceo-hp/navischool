/*! NAVISCHOOL menu e415bd09 */
/* =========================================================================
   NAVISCHOOL 상단 메뉴 — 첨부 TP 통합 스크립트의 메뉴 부분 그대로
   - #menu_navi 요소에 상단 네비게이션을 자동 마운트
   - 메뉴 데이터: 관리자 > 메뉴 구성 → ./data/site-menu.json (발행 시 자동 생성)
   - 파일을 읽지 못하면 아래 기본 메뉴(발행 시점의 메뉴)로 표시
   ========================================================================= */
(function () {

  var TP_DEFAULT_MENU = {"version":1,"updatedAt":"e415bd09","groups":[{"id":"g-1","label":"나비스쿨은","href":"./about.html","header":true,"footer":true,"items":[{"id":"m-1-1","label":"나비스쿨은","href":"./about.html","newTab":false,"header":true,"footer":true},{"id":"m-1-2","label":"비전 & 철학","href":"./vision.html","newTab":false,"header":true,"footer":true},{"id":"m-1-3","label":"인사말","href":"./greeting.html","newTab":false,"header":true,"footer":true},{"id":"m-1-4","label":"연혁","href":"./history.html","newTab":false,"header":true,"footer":true}]},{"id":"g-2","label":"관점변화","href":"./perspective.html","header":true,"footer":true,"items":[{"id":"m-2-1","label":"관점변화 칼럼","href":"./perspective.html","newTab":false,"header":true,"footer":true},{"id":"m-2-2","label":"관점변화 프로그램","href":"./perspective-program.html","newTab":false,"header":true,"footer":true},{"id":"m-2-3","label":"추천 도서 & 영상","href":"./perspective-media.html","newTab":false,"header":true,"footer":true},{"id":"m-2-4","label":"프로그램 후기","href":"./perspective-review.html","newTab":false,"header":true,"footer":true}]},{"id":"g-3","label":"선택변화","href":"./choice.html","header":true,"footer":true,"items":[{"id":"m-3-1","label":"선택변화 칼럼","href":"./choice.html","newTab":false,"header":true,"footer":true},{"id":"m-3-2","label":"선택변화 프로그램","href":"./choice-program.html","newTab":false,"header":true,"footer":true},{"id":"m-3-3","label":"추천 도서 & 영상","href":"./choice-media.html","newTab":false,"header":true,"footer":true},{"id":"m-3-4","label":"프로그램 후기","href":"./choice-review.html","newTab":false,"header":true,"footer":true}]},{"id":"g-4","label":"나다움변화","href":"./self.html","header":true,"footer":true,"items":[{"id":"m-4-1","label":"나다움변화 칼럼","href":"./self.html","newTab":false,"header":true,"footer":true},{"id":"m-4-2","label":"나다움변화 프로그램","href":"./self-program.html","newTab":false,"header":true,"footer":true},{"id":"m-4-3","label":"추천 도서 & 영상","href":"./self-media.html","newTab":false,"header":true,"footer":true},{"id":"m-4-4","label":"프로그램 후기","href":"./self-review.html","newTab":false,"header":true,"footer":true}]},{"id":"g-5","label":"패밀리 사이트","href":"https://www.youtube.com/booktuber","header":true,"footer":true,"items":[{"id":"m-5-1","label":"책추남TV","href":"https://www.youtube.com/booktuber","newTab":true,"header":true,"footer":true},{"id":"m-5-2","label":"네이버 카페","href":"https://cafe.naver.com/booktuber","newTab":true,"header":true,"footer":true}]},{"id":"g-6","label":"프로그램 & 소식","href":"./programs.html","header":true,"footer":true,"items":[{"id":"m-6-1","label":"공지사항","href":"./notice.html","newTab":false,"header":true,"footer":true},{"id":"m-6-2","label":"이벤트","href":"./event.html","newTab":false,"header":true,"footer":true},{"id":"m-6-3","label":"진행 중인 프로그램","href":"./programs.html","newTab":false,"header":true,"footer":true},{"id":"m-6-4","label":"세부 프로그램","href":"./program-detail.html","newTab":false,"header":true,"footer":true},{"id":"m-6-5","label":"연간 프로그램","href":"./annual.html","newTab":false,"header":true,"footer":true}]},{"id":"g-7","label":"오시는 길","href":"./location.html","header":true,"footer":true,"items":[{"id":"m-7-1","label":"오시는 길","href":"./location.html","newTab":false,"header":true,"footer":true}]}]};

  function nnrSiteMenu() {
    if (window.__nnrSiteMenu) return window.__nnrSiteMenu;
    var KEY = 'navi.siteMenu.v1';
    function valid(d) { return !!(d && Array.isArray(d.groups) && d.groups.length); }
    var cached = null;
    try { cached = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
    if (!valid(cached)) cached = null;
    var fresh = (window.fetch
      ? fetch('./data/site-menu.json?v=' + Math.floor(Date.now() / 60000), { cache: 'no-store' })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (d) {
            if (!valid(d)) return null;
            try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
            return d;
          })
          .catch(function () { return null; })
      : Promise.resolve(null));
    window.__nnrSiteMenu = { cached: cached, fresh: fresh, fallback: TP_DEFAULT_MENU };
    return window.__nnrSiteMenu;
  }

  function tpEsc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function tpHref(v) {
    var h = String(v || '').trim();
    return /^(\.\/|\/(?!\/)|https?:\/\/|tel:|mailto:|#)[^\s"'<>`\\]*$/i.test(h) ? h : '#';
  }
  function tpTarget(m) { return m && m.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''; }

  var TP_ARROW = '<svg class="tp-mobile-nav__arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /** 메뉴 데이터 → 상단 · 드롭다운 · 모바일 마크업 */
  function buildMenuParts(menu) {
    var groups = (menu && menu.groups ? menu.groups : TP_DEFAULT_MENU.groups).filter(function (g) { return g && g.header !== false; });
    var nav = '', drop = '', mobile = '';
    groups.forEach(function (g, i) {
      var items = (g.items || []).filter(function (m) { return m && m.header !== false; });
      nav += '  <div class="tp-nav__item" data-menu="' + i + '"><a href="' + tpEsc(tpHref(g.href)) + '" class="tp-nav__link">' + tpEsc(g.label) + '</a></div>\n';
      drop += '      <div class="tp-dropdown__col" data-col="' + i + '">\n' + items.map(function (m) {
        return '        <a href="' + tpEsc(tpHref(m.href)) + '" class="tp-dropdown__link"' + tpTarget(m) + '>' + tpEsc(m.label) + '</a>\n';
      }).join('') + '      </div>\n';
      var subs = items.length ? items : [{ label: g.label, href: g.href }];
      mobile += '<div class="tp-mobile-nav__item">\n'
        + '  <button class="tp-mobile-nav__link" data-mobile="' + i + '" type="button"><span>' + tpEsc(g.label) + '</span>' + TP_ARROW + '</button>\n'
        + '  <div class="tp-mobile-sub" data-mobile-sub="' + i + '">\n' + subs.map(function (m) {
          return '    <a href="' + tpEsc(tpHref(m.href)) + '" class="tp-mobile-sub__link"' + tpTarget(m) + '>' + tpEsc(m.label) + '</a>\n';
        }).join('') + '  </div>\n</div>\n';
    });
    return { nav: nav, drop: drop, mobile: mobile };
  }

  function buildMenuTemplate(menu) {
    var p = buildMenuParts(menu);
    return MENU_TEMPLATE.replace('__TP_NAV__', function () { return p.nav; })
      .replace('__TP_DROP__', function () { return p.drop; })
      .replace('__TP_MOBILE__', function () { return p.mobile; });
  }

  /* =======================================================================
     1. 상단 메뉴 템플릿
     ======================================================================= */
  const MENU_TEMPLATE = `

<section id="nav-section">
<style>
/* ===== NAVISCHOOL 확정 메뉴 · TP 헤더 (첨부 TP 통합 스크립트 구조) — #nav-section 단일 스코프 ===== */
#nav-section{--tp-h:80px;--tp-bg:#3d593b;--tp-line:rgba(255,255,255,.1);position:relative;z-index:20000;font-family:Pretendard,"Pretendard Variable","Noto Sans KR",system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
#nav-section *{box-sizing:border-box}
#nav-section a{text-decoration:none}
#nav-section .tp-header{position:fixed;top:0;left:0;right:0;z-index:20000;background:var(--tp-bg);border-bottom:1px solid var(--tp-line);transition:background .3s ease,border-color .3s ease,transform .35s ease}
#nav-section .tp-header.top-transparent{background:transparent;border-color:transparent}
#menu_navi[data-theme="solid"] #nav-section .tp-header.top-transparent{background:var(--tp-bg);border-color:var(--tp-line)}
#nav-section .tp-header.hide-on-scroll{transform:translateY(-100%)}
#nav-section .tp-header__inner{position:relative;display:flex;align-items:center;justify-content:space-between;gap:20px;max-width:1820px;height:var(--tp-h);margin:0 auto;padding:0 28px}
#nav-section .tp-logo{display:flex;align-items:center;flex:none}
#nav-section .tp-logo img{display:block;height:34px;width:auto;max-width:260px;object-fit:contain}
#nav-section .tp-nav{display:flex;align-items:center;justify-content:center;gap:clamp(24px,4.6vw,88px);flex:1;height:100%}
#nav-section .tp-nav__item{position:relative;height:100%;display:flex;align-items:center}
#nav-section .tp-nav__link{position:relative;display:flex;align-items:center;height:100%;padding:0 4px;color:#fff;font-size:16px;font-weight:700;letter-spacing:-.2px;white-space:nowrap;transition:opacity .2s ease}
#nav-section .tp-nav.has-active .tp-nav__item:not(.active) .tp-nav__link{opacity:.55}
#nav-section .tp-nav__link::after{content:"";position:absolute;left:50%;bottom:0;width:0;height:3px;background:#dfe8d0;transform:translateX(-50%);transition:width .25s ease}
#nav-section .tp-nav__item.active .tp-nav__link::after{width:100%}
#nav-section .tp-lang{flex:none;width:44px}
#nav-section .tp-hamburger{display:none;flex:none;width:44px;height:40px;border:1px solid rgba(255,255,255,.28);border-radius:10px;background:transparent;cursor:pointer;padding:0 11px;flex-direction:column;justify-content:center;gap:5px}
#nav-section .tp-hamburger__line{display:block;height:2px;background:#fff;border-radius:2px;transition:transform .25s ease,opacity .25s ease}
#nav-section .tp-hamburger.open .tp-hamburger__line:nth-child(1){transform:translateY(7px) rotate(45deg)}
#nav-section .tp-hamburger.open .tp-hamburger__line:nth-child(2){opacity:0}
#nav-section .tp-hamburger.open .tp-hamburger__line:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
/* 드롭다운: 모든 상위 메뉴의 하위 메뉴를 각 메뉴 아래에 정렬 (첨부 메뉴표 구성) */
#nav-section .tp-dropdown{position:absolute;left:0;right:0;top:100%;background:var(--tp-bg);border-top:1px solid var(--tp-line);box-shadow:0 24px 40px -20px rgba(0,0,0,.45);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .28s ease,visibility .28s ease}
#nav-section .tp-dropdown.visible{opacity:1;visibility:visible;pointer-events:auto}
#nav-section .tp-dropdown__inner{position:relative;max-width:1820px;margin:0 auto;padding:0 28px;min-height:200px}
#nav-section .tp-dropdown__col{position:absolute;top:26px;display:flex;flex-direction:column;align-items:center;gap:2px;min-width:110px}
#nav-section .tp-dropdown__link{display:block;padding:8px 6px;color:rgba(255,255,255,.72);font-size:14.5px;font-weight:500;white-space:nowrap;text-align:center;border-radius:8px;transition:color .2s ease,background .2s ease}
#nav-section .tp-dropdown__link:hover{color:#fff;background:rgba(255,255,255,.08)}
#nav-section .tp-overlay{position:fixed;inset:0;z-index:19990;background:rgba(0,0,0,.45);opacity:0;visibility:hidden;transition:opacity .28s ease,visibility .28s ease}
#nav-section .tp-overlay.visible{opacity:1;visibility:visible}
/* 모바일 메뉴 */
#nav-section .tp-mobile-menu{position:fixed;top:0;right:0;bottom:0;z-index:20010;width:min(88vw,420px);background:var(--tp-bg);color:#fff;transform:translateX(102%);transition:transform .4s cubic-bezier(.2,.8,.2,1);display:flex;flex-direction:column;overflow-y:auto;overscroll-behavior:contain}
#nav-section .tp-mobile-menu.open{transform:none;box-shadow:-20px 0 40px rgba(0,0,0,.3)}
#nav-section .tp-mobile-header{display:flex;align-items:center;justify-content:space-between;height:var(--tp-h);padding:0 22px;border-bottom:1px solid var(--tp-line)}
#nav-section .tp-mobile-header__logo img{display:block;height:28px;width:auto;max-width:200px}
#nav-section .tp-mobile-close{width:44px;height:44px;border:0;background:none;cursor:pointer;display:grid;place-items:center}
#nav-section .tp-mobile-close svg{width:24px;height:24px}
#nav-section .tp-mobile-nav{padding:8px 22px 28px}
#nav-section .tp-mobile-nav__item{border-bottom:1px solid var(--tp-line)}
#nav-section .tp-mobile-nav__link{display:flex;width:100%;align-items:center;justify-content:space-between;padding:18px 2px;border:0;background:none;color:#fff;font:inherit;font-size:17px;font-weight:700;cursor:pointer;text-align:left}
#nav-section .tp-mobile-nav__arrow{width:20px;height:20px;transition:transform .25s ease}
#nav-section .tp-mobile-nav__link.active .tp-mobile-nav__arrow{transform:rotate(180deg)}
#nav-section .tp-mobile-sub{max-height:0;overflow:hidden;transition:max-height .35s ease}
#nav-section .tp-mobile-sub.open{max-height:600px}
#nav-section .tp-mobile-sub__link{display:block;padding:10px 14px;color:rgba(255,255,255,.72);font-size:15px}
#nav-section .tp-mobile-sub__link:last-child{margin-bottom:12px}
#nav-section .tp-mobile-sub__link:hover{color:#fff}
#nav-section .tp-mobile-lang{display:none}
@media (max-width:1439px){#nav-section .tp-nav__link{font-size:15px}#nav-section .tp-dropdown__link{font-size:13.5px;padding:8px 2px}}
@media (max-width:1180px){
  #nav-section .tp-nav,#nav-section .tp-dropdown,#nav-section .tp-lang{display:none}
  #nav-section .tp-hamburger{display:flex}
}
@media (max-width:560px){#nav-section{--tp-h:64px}#nav-section .tp-header__inner{padding:0 18px}#nav-section .tp-logo img{height:28px}}
</style>



<header class="tp-header" id="tpHeader">
  <div class="tp-header__inner">
    <a href="./index.html" class="tp-logo" aria-label="나비스쿨 홈">
      <img src="./img/navi/logo-w.svg" alt="나비스쿨 NAVI SCHOOL">
    </a>

<nav class="tp-nav" id="tpNav">
__TP_NAV__
</nav>

<div class="tp-lang">
  <!-- <button class="tp-lang__btn active" type="button">KOR</button>
  <button class="tp-lang__btn" type="button">ENG</button> -->
</div>

<button class="tp-hamburger" id="tpHamburger" type="button" aria-label="메뉴 열기">
  <span class="tp-hamburger__line"></span>
  <span class="tp-hamburger__line"></span>
  <span class="tp-hamburger__line"></span>
</button>

  </div>

  <div class="tp-dropdown" id="tpDropdown">
    <div class="tp-dropdown__inner" id="tpDropdownInner">
__TP_DROP__
    </div>
  </div>
</header>

<div class="tp-overlay" id="tpOverlay"></div>

<div class="tp-mobile-menu" id="tpMobileMenu">
  <div class="tp-mobile-header">
    <a href="./index.html" class="tp-mobile-header__logo" aria-label="나비스쿨 홈">
      <img src="./img/navi/logo-w.svg" alt="나비스쿨 NAVI SCHOOL">
    </a>

<button class="tp-mobile-close" id="tpMobileClose" type="button" aria-label="메뉴 닫기">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M6 6L18 18" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
  </svg>
</button>

  </div>

  <div class="tp-mobile-nav">
__TP_MOBILE__
  </div>

  <div class="tp-mobile-lang">
    <button class="tp-mobile-lang__btn active" type="button">KOR</button>
    <button class="tp-mobile-lang__btn" type="button">ENG</button>
  </div>
</div>
</section>
`;


  /* =======================================================================
     4. 상단 메뉴 초기화 (원본 로직 그대로)
     ======================================================================= */
  function initTpMenu(root) {if (!root) return;

var header = root.querySelector('#tpHeader');var nav = root.querySelector('#tpNav');var dropdown = root.querySelector('#tpDropdown');var dropdownInner = root.querySelector('#tpDropdownInner');var overlay = root.querySelector('#tpOverlay');var hamburger = root.querySelector('#tpHamburger');var mobileMenu = root.querySelector('#tpMobileMenu');var mobileClose = root.querySelector('#tpMobileClose');var navItems = [];var dropdownCols = [];var mobileNav = root.querySelector('.tp-mobile-nav');

var activeMenu = null;var closeTimeout = null;var isDesktop = window.innerWidth > 768;var mobileOpen = false;var alignRAF = null;var ticking = false;var lastScrollY = window.scrollY || 0;var scrollDelta = 8;var headerRevealPoint = 10;

function updateHeaderTopState() {var atTop = (window.scrollY || window.pageYOffset || 0) <= 10;

if (atTop && !dropdown.classList.contains('visible') && !mobileOpen) {header.classList.add('top-transparent');header.classList.remove('scrolled');} else {header.classList.remove('top-transparent');}

if (!atTop) {header.classList.add('scrolled');}}

function alignDropdownColumns() {if (!isDesktop || !dropdownInner || !navItems.length) return;

var innerRect = dropdownInner.getBoundingClientRect();

navItems.forEach(function(item, i) {var col = dropdownCols[i];if (!col) return;

var linkEl = item.querySelector('.tp-nav__link');
if (!linkEl) return;

var linkRect = linkEl.getBoundingClientRect();
var linkCenterX = linkRect.left + linkRect.width / 2;

var colWidth = col.scrollWidth;
var leftPos = linkCenterX - innerRect.left - colWidth / 2;

var maxLeft = innerRect.width - colWidth - 10;
if (leftPos < 0) leftPos = 0;
if (leftPos > maxLeft) leftPos = maxLeft;

col.style.left = leftPos + 'px';

});

var maxH = 0;dropdownCols.forEach(function(col) {var h = col.scrollHeight;if (h > maxH) maxH = h;});dropdownInner.style.minHeight = (maxH + 56) + 'px';}

function startContinuousAlign() {var startTime = performance.now();var duration = 480;

function tick() {alignDropdownColumns();if (performance.now() - startTime < duration) {alignRAF = requestAnimationFrame(tick);} else {alignRAF = null;}}

if (alignRAF) cancelAnimationFrame(alignRAF);alignRAF = requestAnimationFrame(tick);}

function forceHeaderShow() {header.classList.remove('hide-on-scroll');}

function openDropdown(index) {if (closeTimeout) {clearTimeout(closeTimeout);closeTimeout = null;}

activeMenu = index;nav.classList.add('has-active');

navItems.forEach(function(item, i) {item.classList.toggle('active', i === index);});

dropdown.classList.add('visible');overlay.classList.add('visible');header.classList.add('menu-open');header.classList.remove('top-transparent');header.classList.add('scrolled');forceHeaderShow();

startContinuousAlign();}

function closeDropdown() {closeTimeout = setTimeout(function() {activeMenu = null;nav.classList.remove('has-active');navItems.forEach(function(item) { item.classList.remove('active'); });dropdown.classList.remove('visible');overlay.classList.remove('visible');header.classList.remove('menu-open');

if (alignRAF) {
  cancelAnimationFrame(alignRAF);
  alignRAF = null;
}

updateHeaderTopState();

}, 120);}

/* 메뉴 항목(상단 · 드롭다운 · 모바일) 바인딩 — 관리자 메뉴 데이터로 다시 그린 뒤에도 호출합니다 */
function bindMenuItems() {navItems = nav ? nav.querySelectorAll('.tp-nav__item') : [];dropdownCols = dropdownInner ? dropdownInner.querySelectorAll('.tp-dropdown__col') : [];

if (navItems.length) {navItems.forEach(function(item, index) {item.addEventListener('mouseenter', function() {if (isDesktop) openDropdown(index);});

item.addEventListener('mouseleave', function() {
  if (isDesktop) closeDropdown();
});

});}

root.querySelectorAll('#tpNav .tp-nav__link, #tpDropdownInner .tp-dropdown__link').forEach(function(link) {link.addEventListener('click', function(e) {var href = link.getAttribute('href');

if (!href || href.trim() === '' || href === '#') {
  e.preventDefault();
}

});});

mobileNav.querySelectorAll('.tp-mobile-nav__link').forEach(function(link) {link.addEventListener('click', function() {var idx = link.getAttribute('data-mobile');var sub = root.querySelector('[data-mobile-sub="' + idx + '"]');var wasActive = link.classList.contains('active');

root.querySelectorAll('.tp-mobile-nav__link').forEach(function(l) {
  l.classList.remove('active');
});

root.querySelectorAll('.tp-mobile-sub').forEach(function(s) {
  s.classList.remove('open');
});

if (!wasActive && sub) {
  link.classList.add('active');
  sub.classList.add('open');
}

});});

mobileNav.querySelectorAll('.tp-mobile-sub__link').forEach(function(link) {link.addEventListener('click', function(e) {var href = link.getAttribute('href');

if (!href || href.trim() === '' || href === '#') {
  e.preventDefault();
  return;
}

closeMobileMenu();

});});
}

bindMenuItems();

/* 메뉴 데이터가 바뀌면 header 는 그대로 두고 안쪽 항목만 교체합니다 */
root._tpRebuild = function(parts) {if (!parts) return;
  if (dropdown && dropdown.classList.contains('visible')) {activeMenu = null;nav.classList.remove('has-active');dropdown.classList.remove('visible');overlay.classList.remove('visible');header.classList.remove('menu-open');}
  if (nav) nav.innerHTML = parts.nav;
  if (dropdownInner) dropdownInner.innerHTML = parts.drop;
  if (mobileNav) mobileNav.innerHTML = parts.mobile;
  bindMenuItems();
  if (dropdown) {dropdown.style.opacity = '0';dropdown.style.pointerEvents = 'none';dropdown.classList.add('visible');alignDropdownColumns();dropdown.classList.remove('visible');requestAnimationFrame(function() {dropdown.style.opacity = '';dropdown.style.pointerEvents = '';updateHeaderTopState();});}
};

if (dropdown) {dropdown.addEventListener('mouseenter', function() {if (closeTimeout) {clearTimeout(closeTimeout);closeTimeout = null;}});

dropdown.addEventListener('mouseleave', function() {closeDropdown();});}

if (overlay) {overlay.addEventListener('click', function() {if (closeTimeout) clearTimeout(closeTimeout);activeMenu = null;nav.classList.remove('has-active');navItems.forEach(function(item) { item.classList.remove('active'); });dropdown.classList.remove('visible');overlay.classList.remove('visible');header.classList.remove('menu-open');forceHeaderShow();updateHeaderTopState();});}

function handleHeaderScroll() {var currentScrollY = window.scrollY || 0;var diff = currentScrollY - lastScrollY;

updateHeaderTopState();

if (currentScrollY <= headerRevealPoint) {header.classList.remove('hide-on-scroll');lastScrollY = currentScrollY;return;}

if (mobileOpen || dropdown.classList.contains('visible')) {header.classList.remove('hide-on-scroll');lastScrollY = currentScrollY;return;}

if (Math.abs(diff) < scrollDelta) {return;}

if (diff > 0) {header.classList.add('hide-on-scroll');} else {header.classList.remove('hide-on-scroll');}

lastScrollY = currentScrollY;}

window.addEventListener('scroll', function() {if (!ticking) {requestAnimationFrame(function() {handleHeaderScroll();ticking = false;});ticking = true;}}, { passive: true });

function closeMobileMenu() {mobileOpen = false;hamburger.classList.remove('open');mobileMenu.classList.remove('open');document.body.style.overflow = '';forceHeaderShow();updateHeaderTopState();}

function openMobileMenu() {mobileOpen = true;hamburger.classList.add('open');mobileMenu.classList.add('open');document.body.style.overflow = 'hidden';header.classList.remove('top-transparent');header.classList.add('scrolled');forceHeaderShow();}

if (hamburger) {hamburger.addEventListener('click', function() {if (mobileOpen) {closeMobileMenu();} else {openMobileMenu();}});}

if (mobileClose) {mobileClose.addEventListener('click', function() {closeMobileMenu();});}

root.querySelectorAll('.tp-lang__btn, .tp-mobile-lang__btn').forEach(function(btn) {btn.addEventListener('click', function() {var group = btn.closest('.tp-lang') || btn.closest('.tp-mobile-lang');if (!group) return;group.querySelectorAll('button').forEach(function(b) {b.classList.remove('active');});btn.classList.add('active');});});

window.addEventListener('resize', function() {isDesktop = window.innerWidth > 768;

if (isDesktop && mobileOpen) {closeMobileMenu();}

if (isDesktop && dropdown.classList.contains('visible')) {alignDropdownColumns();}

forceHeaderShow();lastScrollY = window.scrollY || 0;updateHeaderTopState();});

if (dropdown) {var origTransition = dropdown.style.transition;dropdown.style.transition = 'none';dropdown.style.opacity = '0';dropdown.style.pointerEvents = 'none';dropdown.classList.add('visible');

requestAnimationFrame(function() {alignDropdownColumns();dropdown.classList.remove('visible');requestAnimationFrame(function() {dropdown.style.transition = origTransition || '';dropdown.style.opacity = '';dropdown.style.pointerEvents = '';updateHeaderTopState();});});} else {updateHeaderTopState();}

}


  /* =======================================================================
     6. 마운트 (메뉴만 — 간편신청 플로팅은 사용하지 않음)
     ======================================================================= */
  function mountTpMenu() {
    var mount = document.getElementById('menu_navi');
    if (!mount) return;
    if (mount._tpMenuMounted) return;

    mount._tpMenuMounted = true;

    /* 저장된 메뉴(없으면 기본 메뉴)로 바로 그리고, 최신 메뉴가 다르면 안쪽 항목만 교체 */
    var src = nnrSiteMenu();
    var first = src.cached || src.fallback;
    mount.innerHTML = buildMenuTemplate(first);

    var root = mount.querySelector('#nav-section');
    initTpMenu(root);

    src.fresh.then(function (d) {
      if (!d || !root || typeof root._tpRebuild !== 'function') return;
      if (JSON.stringify(d.groups) === JSON.stringify(first.groups)) return;
      root._tpRebuild(buildMenuParts(d));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountTpMenu);
  } else {
    mountTpMenu();
  }
})();
