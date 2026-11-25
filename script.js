/* Tevico website — interactions */
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById("navBurger");
  const menu = document.getElementById("navMenu");
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Dropdowns (click for touch + mobile) ---------- */
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dd) => {
    const btn = dd.querySelector(".dropdown__toggle");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = !dd.classList.contains("is-open");
      dropdowns.forEach((d) => {
        d.classList.remove("is-open");
        d.querySelector(".dropdown__toggle").setAttribute("aria-expanded", "false");
      });
      dd.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("click", () => dropdowns.forEach((d) => d.classList.remove("is-open")));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") dropdowns.forEach((d) => d.classList.remove("is-open"));
  });

  /* ---------- Logo marquee: duplicate for seamless loop ---------- */
  const track = document.getElementById("logoTrack");
  track.innerHTML += track.innerHTML;
  [...track.children].slice(track.children.length / 2).forEach((c) => c.setAttribute("aria-hidden", "true"));

  /* ---------- Platform tabs ---------- */
  const TABS = {
    cost: {
      label: "Cost Management",
      title: "",
      bullets: [
        "Idle and oversized resources found every day",
        "Rightsizing and commitment plans applied for you",
        "Budget and anomaly alerts per team and project",
        "Monthly savings report, ready to share",
      ],
      status: { tag: "Savings", text: "4 savings recommendations are ready to apply" },
      window: "Tevico — Cost",
      windowRight: "Spend tracked across 6 regions",
      kpis: [
        ["Monthly spend", "$48.2k", "↓ 18% vs last month"],
        ["Savings found", "$9.1k", "this month"],
        ["Waste removed", "31", "idle resources cleaned up"],
      ],
      barsTitle: "By service",
      bars: [["Compute", 14], ["Database", 10], ["Storage", 7], ["Network", 5], ["Other", 3]],
      stagesTitle: "Savings pipeline",
      stages: [["38", "Found"], ["31", "Approved"], ["27", "Applied"], ["4", "Pending"], ["$9.1k", "Saved"], ["7", "Skipped"]],
      timeline: [
        ["SAVE", "Rightsized 6 instances · prod-api · −$1.2k/mo", "10:12"],
        ["IDLE", "Unattached volumes removed · staging", "09:44"],
        ["ALRT", "Spend anomaly flagged · data-pipeline", "08:30"],
      ],
    },
    security: {
      label: "Security Management",
      title: "",
      bullets: [
        "Misconfigurations and exposures found continuously",
        "Low-risk fixes applied on their own",
        "Mapped to the frameworks you report on",
        "Audit-ready evidence, kept up to date",
      ],
      status: { tag: "Action needed", text: "2 high-risk findings are waiting for approval" },
      window: "Tevico — Security",
      windowRight: "12 open · 58 closed this month",
      kpis: [
        ["Open findings", "12", "2 high · 10 medium"],
        ["Mean time to remediate", "6 h", "↓ 35% this quarter"],
        ["Auto-remediated", "58", "this month, no ticket needed"],
      ],
      barsTitle: "By category",
      bars: [["IAM", 14], ["Network", 11], ["Data", 8], ["Logging", 6], ["Compute", 4]],
      stagesTitle: "By stage · last 30 days",
      stages: [["70", "Detected"], ["70", "Triaged"], ["58", "Auto-fixed"], ["9", "Escalated"], ["58", "Closed"], ["12", "Open"]],
      timeline: [
        ["HIGH", "Public bucket detected · assets-prod · access blocked", "10:21"],
        ["FIX", "MFA enforced · 3 console users", "09:50"],
        ["AUD", "Compliance report generated · Q4", "09:02"],
      ],
    },
    incidents: {
      label: "Incident Management",
      title: "",
      bullets: [
        "Incidents detected, triaged and routed in minutes",
        "Common failures fixed on their own",
        "Root-cause analysis after every major incident",
        "Alerts in Slack and Jira, with a full timeline",
      ],
      status: { tag: "Open", text: "1 critical incident is being worked on now" },
      window: "Tevico — Incidents",
      windowRight: "3 open · 41 resolved this month",
      kpis: [
        ["Open incidents", "3", "1 critical · 2 minor"],
        ["Mean time to resolve", "18 min", "↓ 42% this quarter"],
        ["Auto-resolved", "27", "this month, no ticket needed"],
      ],
      barsTitle: "By source",
      bars: [["Compute", 14], ["Database", 9], ["Network", 7], ["Storage", 6], ["Access", 5]],
      stagesTitle: "By stage · last 30 days",
      stages: [["44", "Detected"], ["44", "Triaged"], ["27", "Auto-fixed"], ["14", "Escalated"], ["41", "Resolved"], ["3", "Open"]],
      timeline: [
        ["SEV1", "API latency spike · prod-core · auto-scaled", "10:32"],
        ["FIX", "Disk 92% full · db-primary · volume expanded", "09:58"],
        ["RCA", "Root cause filed · Nov 10 outage · payments", "09:41"],
      ],
    },
  };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function renderPanel(key) {
    const d = TABS[key];
    const max = Math.max(...d.bars.map((b) => b[1]));
    return `
      <div class="panel__copy">
        <p class="panel__label">${esc(d.label)}</p>
        ${d.title ? `<h3 class="panel__title">${esc(d.title)}</h3>` : ""}
        <ul class="panel__list">${d.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
        <div class="status">
          <span class="eyebrow">${esc(d.status.tag)}</span>
          <p>${esc(d.status.text)}</p>
          <a href="#">Review →</a>
        </div>
        <a href="#contact" class="panel__more">Know more →</a>
      </div>
      <div class="dash" aria-label="${esc(d.window)} dashboard preview">
        <div class="dash__bar"><span class="dots"><i></i><i></i><i></i></span><span>${esc(d.window)}</span><span>${esc(d.windowRight)}</span></div>
        <div class="dash__kpis">${d.kpis.map(([l, v, s]) => `<div><small>${esc(l)}</small><b>${esc(v)}</b><em>${esc(s)}</em></div>`).join("")}</div>
        <div class="dash__mid">
          <div>
            <div class="dash__h">${esc(d.barsTitle)}<span>Last 30 days</span></div>
            <div class="bars">${d.bars.map(([l, v]) => `<div><span>${esc(l)}</span><i data-w="${(v / max) * 100}"></i><b>${v}</b></div>`).join("")}</div>
          </div>
          <div>
            <div class="dash__h">${esc(d.stagesTitle)}</div>
            <div class="stages">${d.stages.map(([v, l]) => `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join("")}</div>
          </div>
        </div>
        <div class="timeline">
          <div class="dash__h">Live timeline<span>Last 24 h</span></div>
          <ul>${d.timeline.map(([t, txt, time]) => `<li><code>${esc(t)}</code><span>${esc(txt)}</span><time>${esc(time)}</time></li>`).join("")}</ul>
        </div>
      </div>`;
  }

  const panel = document.getElementById("tabPanel");
  const tabs = document.querySelectorAll(".tab");

  function growBars(scope) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        scope.querySelectorAll("[data-w]").forEach((el) => (el.style.width = el.dataset.w + "%"))
      )
    );
  }

  function showTab(key, animate) {
    tabs.forEach((t) => {
      const on = t.dataset.tab === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
    });
    const swap = () => {
      panel.innerHTML = renderPanel(key);
      panel.classList.remove("is-swapping");
      growBars(panel);
    };
    if (animate) {
      panel.classList.add("is-swapping");
      setTimeout(swap, 200);
    } else swap();
  }
  tabs.forEach((t) => t.addEventListener("click", () => showTab(t.dataset.tab, true)));
  showTab("incidents", false);

  /* ---------- FAQ: one open at a time ---------- */
  const faqs = document.querySelectorAll(".faq details");
  faqs.forEach((d) =>
    d.addEventListener("toggle", () => {
      if (d.open) faqs.forEach((o) => o !== d && (o.open = false));
    })
  );

  /* ---------- Reveal + progress bars on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    ".h2, .lead, .hexwrap, .pcard, .tabs, .step, .stat, .outcomes__hero, .testi, .faq__list, .cta__box"
  );
  if ("IntersectionObserver" in window) {
    revealTargets.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-in");
          growBars(en.target);
          io.unobserve(en.target);
        }),
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    growBars(document);
  }

  /* ---------- Newsletter ---------- */
  document.getElementById("newsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("newsMsg").hidden = false;
    e.target.reset();
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
