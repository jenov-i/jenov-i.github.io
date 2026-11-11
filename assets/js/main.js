/* =========================================================
   DANDOU Jenovi — Portfolio · main script
   Vanilla JS · no dependencies
   ========================================================= */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const state = {
    lang: "fr",
    filter: "all",
    projectId: null,
    lastFocus: null,
    typingToken: 0,
    toastTimer: null
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */

  function t(key) {
    const dict = I18N[state.lang] || I18N.fr;
    const value = dict[key] !== undefined ? dict[key] : I18N.fr[key];
    return value !== undefined ? value : key;
  }

  const esc = (value) =>
    String(value).replace(/[&<>"']/g, (c) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));

  function toast(message) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => el.classList.remove("is-visible"), 3200);
  }

  /* ---------- language ---------- */

  function storedLang() {
    try {
      const saved = localStorage.getItem("jd-lang");
      if (saved === "fr" || saved === "en") return saved;
    } catch (err) { /* storage unavailable */ }
    return "fr";
  }

  function applyI18n(lang, restartTyping = true) {
    state.lang = lang === "en" ? "en" : "fr";
    try { localStorage.setItem("jd-lang", state.lang); } catch (err) { /* ignore */ }

    document.documentElement.lang = state.lang;
    document.title = t("meta.title");

    const desc = $('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));
    const ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", t("meta.title"));
    const ogDesc = $('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", t("meta.description"));

    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = t(key);
      if (typeof value === "string") el.textContent = value;
    });

    $$("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const value = t(key);
      if (typeof value === "string") el.innerHTML = value;
    });

    $$("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });

    $$("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });

    const langBtn = $("#lang-toggle");
    if (langBtn) {
      const label = state.lang === "fr" ? "FR / EN — Switch to English" : "FR / EN — Passer en français";
      langBtn.setAttribute("aria-label", label);
      langBtn.setAttribute("title", label);
      $(".lang-fr", langBtn).classList.toggle("is-active", state.lang === "fr");
      $(".lang-en", langBtn).classList.toggle("is-active", state.lang === "en");
    }

    const menuBtn = $("#menu-toggle");
    if (menuBtn && !menuBtn.classList.contains("is-open")) {
      menuBtn.setAttribute("aria-label", t("a11y.menu"));
    }

    const modalClose = $(".modal-close");
    if (modalClose) modalClose.setAttribute("aria-label", t("a11y.close"));

    const toTop = $("#to-top");
    if (toTop) toTop.setAttribute("aria-label", state.lang === "fr" ? "Revenir en haut" : "Back to top");

    renderProjects(state.filter);
    if (state.projectId) renderModal(state.projectId, false);
    if (restartTyping) startTyping();
  }

  /* ---------- typing effect ---------- */

  let typeTimer = null;

  function startTyping() {
    const target = $("#typed");
    if (!target) return;

    clearTimeout(typeTimer);
    state.typingToken += 1;
    const token = state.typingToken;
    const roles = t("roles");
    const list = Array.isArray(roles) ? roles : [String(roles)];

    if (reduceMotion) {
      target.textContent = list[0];
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      if (token !== state.typingToken) return;
      const role = list[roleIndex % list.length];

      if (!deleting) {
        charIndex += 1;
        target.textContent = role.slice(0, charIndex);
        if (charIndex >= role.length) {
          deleting = true;
          typeTimer = setTimeout(tick, 1900);
          return;
        }
        typeTimer = setTimeout(tick, 52 + Math.random() * 34);
      } else {
        charIndex -= 1;
        target.textContent = role.slice(0, Math.max(charIndex, 0));
        if (charIndex <= 0) {
          deleting = false;
          roleIndex += 1;
          typeTimer = setTimeout(tick, 240);
          return;
        }
        typeTimer = setTimeout(tick, 24);
      }
    }

    target.textContent = "";
    typeTimer = setTimeout(tick, 320);
  }

  /* ---------- projects ---------- */

  function cardMarkup(project, index) {
    const title = esc(project.title[state.lang] || project.title.fr);
    const tagline = esc(project.tagline[state.lang] || project.tagline.fr);
    const tags = project.stack.slice(0, 4)
      .map((tag) => `<li>${esc(tag)}</li>`).join("");

    return `
      <article class="project-card${project.featured ? " is-featured" : ""}" style="--d:${index * 55}ms">
        <div class="project-window">
          <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="project-file mono">${esc(project.id)}.lab</span>
          <span class="project-cat mono">${esc(t("cat." + project.cat))}</span>
        </div>
        <div class="project-body">
          <p class="project-meta mono">
            <span>${esc(project.year)}</span>
            <span class="dim">·</span>
            <span>~/projects/${esc(project.id)}</span>
          </p>
          <h3>${title}</h3>
          <p class="project-tagline">${tagline}</p>
          <ul class="project-tags mono">${tags}</ul>
          <button class="project-open mono" type="button" data-project="${esc(project.id)}"
                  aria-label="${esc(t("projects.details"))} — ${title}">
            <span>${esc(t("projects.details"))}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m0 0-5-5m5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </article>`;
  }

  function renderProjects(filter = "all") {
    const grid = $("#projects-grid");
    if (!grid) return;

    state.filter = filter;
    const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

    $$("#filters .filter").forEach((btn) => {
      const active = btn.getAttribute("data-filter") === filter;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    if (!list.length) {
      grid.innerHTML = `<p class="projects-empty mono">${esc(t("projects.empty"))}</p>`;
      return;
    }

    grid.innerHTML = list.map(cardMarkup).join("");
    $$("[data-project]", grid).forEach((btn) => {
      btn.addEventListener("click", () => openProject(btn.getAttribute("data-project")));
    });
  }

  function renderModal(id, animate = true) {
    const project = PROJECTS.find((p) => p.id === id);
    const content = $("#modal-content");
    if (!project || !content) return;

    const lang = state.lang;
    const title = esc(project.title[lang] || project.title.fr);
    const tagline = esc(project.tagline[lang] || project.tagline.fr);
    const context = esc(project.context[lang] || project.context.fr);
    const result = esc(project.result[lang] || project.result.fr);

    content.innerHTML = `
      <div class="modal-head">
        <p class="modal-kicker mono">~/projects/${esc(project.id)} <span class="dim">·</span> ${esc(project.year)}</p>
        <h2 id="modal-title">${title}</h2>
        <p class="modal-tagline">${tagline}</p>
        <div class="modal-meta mono">
          <span class="pill">${esc(t("cat." + project.cat))}</span>
          <span class="pill">${esc(project.year)}</span>
        </div>
      </div>
      <div class="modal-body">
        <section>
          <h3 class="mono"><span class="bracket">[</span> ${esc(t("modal.context"))} <span class="bracket">]</span></h3>
          <p>${context}</p>
        </section>
        <section>
          <h3 class="mono"><span class="bracket">[</span> ${esc(t("modal.missions"))} <span class="bracket">]</span></h3>
          <ul class="bullets">
            ${(project.bullets[lang] || project.bullets.fr).map((b) => `<li>${esc(b)}</li>`).join("")}
          </ul>
        </section>
        <section>
          <h3 class="mono"><span class="bracket">[</span> ${esc(t("modal.result"))} <span class="bracket">]</span></h3>
          <p class="modal-result">${result}</p>
        </section>
        <section>
          <h3 class="mono"><span class="bracket">[</span> ${esc(t("modal.stack"))} <span class="bracket">]</span></h3>
          <ul class="chips">
            ${project.stack.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ul>
        </section>
      </div>`;

    if (animate) {
      const panel = $(".modal-panel");
      if (panel) panel.scrollTop = 0;
    }
  }

  function openProject(id) {
    const modal = $("#project-modal");
    if (!modal) return;

    state.projectId = id;
    state.lastFocus = document.activeElement;
    renderModal(id);

    modal.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => modal.classList.add("is-open"));

    const closeBtn = $(".modal-close");
    if (closeBtn) setTimeout(() => closeBtn.focus(), 60);
  }

  function closeModal() {
    const modal = $("#project-modal");
    if (!modal || modal.hidden) return;

    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    state.projectId = null;

    const finish = () => {
      modal.hidden = true;
      if (state.lastFocus && typeof state.lastFocus.focus === "function") {
        state.lastFocus.focus();
      }
      state.lastFocus = null;
    };

    if (reduceMotion) finish();
    else setTimeout(finish, 220);
  }

  /* ---------- counters ---------- */

  function initCounters() {
    const stats = $("#stats");
    if (!stats) return;

    const run = () => {
      $$("[data-count]", stats).forEach((el) => {
        const target = Number(el.getAttribute("data-count")) || 0;
        const duration = 1300;
        const start = performance.now();

        function frame(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = String(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(frame);
          else el.textContent = String(target);
        }

        if (reduceMotion) el.textContent = String(target);
        else requestAnimationFrame(frame);
      });
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      run();
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run();
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });

    observer.observe(stats);
  }

  /* ---------- reveal ---------- */

  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach((el, index) => {
      if (el.parentElement) {
        const siblings = $$(":scope > .reveal", el.parentElement);
        const rank = siblings.indexOf(el);
        el.style.transitionDelay = `${(rank > 0 ? rank : index % 3) * 70}ms`;
      }
      observer.observe(el);
    });
  }

  /* ---------- navigation ---------- */

  function initNav() {
    const header = $("#site-header");
    const bar = $("#scroll-bar");
    const nav = $("#nav");
    const toggle = $("#menu-toggle");

    const onScroll = () => {
      const top = window.scrollY || document.documentElement.scrollTop;
      if (header) header.classList.toggle("is-scrolled", top > 24);
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(top / max, 1) : 0})`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toggle && nav) {
      const closeMenu = () => {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", t("a11y.menu"));
        document.body.classList.remove("nav-open");
      };

      toggle.addEventListener("click", () => {
        const open = !nav.classList.contains("is-open");
        nav.classList.toggle("is-open", open);
        toggle.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? (state.lang === "fr" ? "Fermer le menu" : "Close menu") : t("a11y.menu"));
        document.body.classList.toggle("nav-open", open);
      });

      $$("a", nav).forEach((link) => {
        link.addEventListener("click", closeMenu);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("is-open")) closeMenu();
      });

      document.addEventListener("click", (event) => {
        if (!nav.classList.contains("is-open")) return;
        if (event.target.closest("#nav") || event.target.closest("#menu-toggle")) return;
        closeMenu();
      });
    }

    if ("IntersectionObserver" in window) {
      const links = $$(".nav-link");
      const sections = links
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

      const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

      sections.forEach((section) => spy.observe(section));
    }

    const toTop = $("#to-top");
    if (toTop) {
      toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }
  }

  /* ---------- contact / copy / toast ---------- */

  function initContact() {
    $$("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const value = btn.getAttribute("data-copy") || "";
        try {
          await navigator.clipboard.writeText(value);
          toast(t("toast.copied"));
          btn.textContent = state.lang === "fr" ? "copié ✓" : "copied ✓";
        } catch (err) {
          const area = document.createElement("textarea");
          area.value = value;
          area.setAttribute("readonly", "");
          area.style.position = "fixed";
          area.style.opacity = "0";
          document.body.appendChild(area);
          area.select();
          let ok = false;
          try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
          document.body.removeChild(area);
          toast(ok ? t("toast.copied") : t("toast.copyfail"));
        }
        setTimeout(() => { btn.textContent = t("contact.copy"); }, 2400);
      });
    });

    const form = $("#contact-form");
    if (!form) return;

    const error = $("#form-error");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = $("#f-name").value.trim();
      const email = $("#f-email").value.trim();
      const subjectField = $("#f-subject");
      const subject = subjectField.selectedOptions[0]
        ? subjectField.selectedOptions[0].textContent.trim()
        : subjectField.value;
      const message = $("#f-message").value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

      if (!name || !emailOk || !message) {
        if (error) error.hidden = false;
        (name ? (emailOk ? $("#f-message") : $("#f-email")) : $("#f-name")).focus();
        return;
      }

      if (error) error.hidden = true;

      const mailSubject = `[Portfolio] ${subject} — ${name}`;
      const body = [
        `Nom : ${name}`,
        `E-mail : ${email}`,
        "",
        message,
        "",
        "— Message envoyé depuis le portfolio de DANDOU Jenovi"
      ].join("\n");

      window.location.href = "mailto:dandoujenovi@gmail.com"
        + "?subject=" + encodeURIComponent(mailSubject)
        + "&body=" + encodeURIComponent(body);

      toast(t("toast.mail"));
    });

    ["#f-name", "#f-email", "#f-message"].forEach((sel) => {
      const field = $(sel);
      if (field) field.addEventListener("input", () => { if (error) error.hidden = true; });
    });
  }

  /* ---------- project modal events ---------- */

  function initModal() {
    const modal = $("#project-modal");
    if (!modal) return;

    $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));

    document.addEventListener("keydown", (event) => {
      if (modal.hidden) return;

      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key === "Tab") {
        const focusables = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', modal)
          .filter((el) => el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ---------- canvas network ---------- */

  function initCanvas() {
    const canvas = $("#net-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes = [];
    let pulses = [];
    let raf = null;
    let visible = true;
    let lastTime = 0;
    let pulseClock = 0;
    const pointer = { x: -9999, y: -9999 };

    const LINK_DIST = 140;

    function makeNodes() {
      const count = Math.max(22, Math.min(58, Math.floor((width * height) / 21000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.3 + 0.7,
        accent: Math.random() > 0.55 ? "56,217,255" : "62,242,160"
      }));
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeNodes();
      pulses = [];
      draw(performance.now(), 0);
    }

    function draw(now, delta) {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        if (!reduceMotion && visible) {
          a.x += a.vx * delta * 0.06;
          a.y += a.vy * delta * 0.06;
          if (a.x < -20) a.x = width + 20;
          if (a.x > width + 20) a.x = -20;
          if (a.y < -20) a.y = height + 20;
          if (a.y > height + 20) a.y = -20;
        }

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const base = (1 - dist / LINK_DIST) * 0.15;
            const near = Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y) < 190 ? 0.12 : 0;
            ctx.strokeStyle = `rgba(62,242,160,${(base + near).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        const glow = Math.hypot(node.x - pointer.x, node.y - pointer.y) < 160;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${node.accent},${glow ? 0.85 : 0.5})`;
        ctx.shadowColor = `rgba(${node.accent},0.8)`;
        ctx.shadowBlur = glow ? 10 : 5;
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // travelling packets
      if (!reduceMotion && visible) {
        pulseClock += delta;
        if (pulseClock > 1500 && nodes.length > 2) {
          pulseClock = 0;
          const a = nodes[Math.floor(Math.random() * nodes.length)];
          let b = nodes[Math.floor(Math.random() * nodes.length)];
          if (b === a) b = nodes[(nodes.indexOf(a) + 1) % nodes.length];
          pulses.push({ a, b, p: 0, speed: 0.00045 + Math.random() * 0.0005 });
        }

        pulses = pulses.filter((pulse) => {
          pulse.p += pulse.speed * delta;
          if (pulse.p >= 1) return false;
          const x = pulse.a.x + (pulse.b.x - pulse.a.x) * pulse.p;
          const y = pulse.a.y + (pulse.b.y - pulse.a.y) * pulse.p;
          ctx.beginPath();
          ctx.fillStyle = "rgba(56,217,255,0.95)";
          ctx.shadowColor = "rgba(56,217,255,0.9)";
          ctx.shadowBlur = 9;
          ctx.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          return true;
        });
      }
    }

    function loop(now) {
      const delta = Math.min(now - lastTime || 16, 48);
      lastTime = now;
      draw(now, delta);
      if (!reduceMotion && visible) raf = requestAnimationFrame(loop);
    }

    function start() {
      if (raf !== null) cancelAnimationFrame(raf);
      lastTime = performance.now();
      if (reduceMotion) draw(lastTime, 0);
      else raf = requestAnimationFrame(loop);
    }

    let resizeRaf = null;
    window.addEventListener("resize", () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resize();
        start();
      });
    }, { passive: true });

    canvas.addEventListener("pointermove", (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    }, { passive: true });

    canvas.addEventListener("pointerleave", () => {
      pointer.x = -9999;
      pointer.y = -9999;
    }, { passive: true });

    if ("IntersectionObserver" in window) {
      const visibility = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting;
          if (visible && !reduceMotion) start();
          else if (raf !== null) {
            cancelAnimationFrame(raf);
            raf = null;
          }
        });
      }, { threshold: 0 });
      visibility.observe(canvas);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
      } else if (visible && !reduceMotion) {
        start();
      }
    });

    resize();
    start();
  }

  /* ---------- boot ---------- */

  function boot() {
    state.lang = storedLang();

    const langBtn = $("#lang-toggle");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        applyI18n(state.lang === "fr" ? "en" : "fr");
        toast(t("toast.lang"));
      });
    }

    const filters = $("#filters");
    if (filters) {
      filters.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-filter]");
        if (btn) renderProjects(btn.getAttribute("data-filter"));
      });
    }

    applyI18n(state.lang, false);
    initNav();
    initReveal();
    initCounters();
    initContact();
    initModal();
    initCanvas();
    startTyping();

    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
