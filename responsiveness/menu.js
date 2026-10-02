/* ==========================================================================
   Aken Tech Solution — Mobile Menu Navigation Controller
   Handles click, tap, close button, outside clicks, and Escape key
   ========================================================================== */

(function () {
  function getMobileElements() {
    return {
      menu: document.getElementById("mobileMenu"),
      toggleBtn: document.querySelector(".mobile-toggle")
    };
  }

  function openMenu() {
    const { menu, toggleBtn } = getMobileElements();
    if (!menu) return;

    menu.classList.add("open");
    document.body.classList.add("menu-open");

    if (toggleBtn) {
      toggleBtn.innerHTML = "✕";
      toggleBtn.setAttribute("aria-expanded", "true");
      toggleBtn.setAttribute("aria-label", "Close navigation menu");
    }
  }

  function closeMenu() {
    const { menu, toggleBtn } = getMobileElements();
    if (!menu) return;

    menu.classList.remove("open");
    document.body.classList.remove("menu-open");

    if (toggleBtn) {
      toggleBtn.innerHTML = "☰";
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.setAttribute("aria-label", "Open navigation menu");
    }
  }

  function toggleMenu(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const { menu } = getMobileElements();
    if (!menu) return;

    if (menu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Expose globally so onclick="toggleMenu(event)" or onclick="toggleMenu()" works
  window.toggleMenu = toggleMenu;
  window.openMenu = openMenu;
  window.closeMenu = closeMenu;

  function setupMobileMenu() {
    const { menu, toggleBtn } = getMobileElements();
    if (!menu) return;

    // Ensure toggle button has accessible attributes and clean click handler
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.setAttribute("aria-label", "Open navigation menu");
      toggleBtn.onclick = function (e) {
        toggleMenu(e);
      };
    }

    // Ensure drawer header with close button exists inside drawer
    let headerRow = menu.querySelector(".menu-drawer-header");
    if (!headerRow) {
      headerRow = document.createElement("div");
      headerRow.className =
        "menu-drawer-header flex items-center justify-between pb-2 mb-2 border-b border-slate-200";
      headerRow.innerHTML = `
        <span class="font-bold text-xs uppercase tracking-wider text-slate-500">Navigation</span>
        <button type="button" class="close-menu-btn text-slate-500 hover:text-red-600 hover:bg-slate-100 p-1.5 rounded-lg text-lg font-bold leading-none cursor-pointer transition-colors" aria-label="Close menu">✕</button>
      `;
      menu.prepend(headerRow);
    }

    const closeBtn = menu.querySelector(".close-menu-btn");
    if (closeBtn) {
      closeBtn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      };
    }

    // Close when clicking any nav link inside mobile menu
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });
  }

  // Close when clicking outside of menu and toggle button
  document.addEventListener("click", function (e) {
    const { menu, toggleBtn } = getMobileElements();
    if (!menu || !menu.classList.contains("open")) return;

    const clickedInsideMenu = menu.contains(e.target);
    const clickedToggle =
      toggleBtn && (toggleBtn === e.target || toggleBtn.contains(e.target));

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  // Close when pressing Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  // Auto-close on resize if screen becomes tablet/desktop width
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });

  // Initialize as soon as DOM is interactive
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupMobileMenu);
  } else {
    setupMobileMenu();
  }
})();
