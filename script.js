/* ===== ENTEBOR - interacoes ===== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav: scroll state + progress ---------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("scrollProgress");
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle("scrolled", y > 40);
    var h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var d = parseInt(e.target.getAttribute("data-delay") || "0", 10);
          setTimeout(function () { e.target.classList.add("is-in"); }, d);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var start = null, dur = 1500;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Materials data ---------- */
  var T_MIN = -70, T_MAX = 260, RANGE = T_MAX - T_MIN;
  var materials = [
    { abbr: "EPDM", name: "EPDM", astm: "EPDM", tmin: -60, tmax: 130,
      desc: "Excelente resistência ao tempo, ozônio e intempéries. Padrão para vedação externa e contato com vapor e água quente.",
      r: { abrasion: 4, chemical: 5, heat: 5, electrical: 4.5 } },
    { abbr: "NBR", name: "Nitrílica", astm: "NBR", tmin: -30, tmax: 120,
      desc: "Referência em resistência a óleos, combustíveis e graxas, com boa resistência à abrasão. Muito usada em vedações de fluidos.",
      r: { abrasion: 5, chemical: 5, heat: 4, electrical: 2.5 } },
    { abbr: "MQ", name: "Silicone", astm: "MQ", tmin: -60, tmax: 200,
      desc: "Ampla faixa térmica e ótimo isolamento elétrico. Indicado para alta temperatura, contato alimentício e aplicações elétricas.",
      r: { abrasion: 2.5, chemical: 2.5, heat: 5, electrical: 5 } },
    { abbr: "CR", name: "Neoprene", astm: "CR", tmin: -40, tmax: 120,
      desc: "Bom equilíbrio entre resistência química, intempéries e chama. Versátil para vedação e revestimento geral.",
      r: { abrasion: 4, chemical: 4, heat: 4, electrical: 3.5 } },
    { abbr: "FPM", name: "Viton", astm: "FPM", tmin: -70, tmax: 260,
      desc: "Desempenho extremo em alta temperatura e ataque químico agressivo. Solução para as condições mais severas.",
      r: { abrasion: 4, chemical: 5, heat: 5, electrical: 4 } },
    { abbr: "AU", name: "Poliuretano", astm: "AU", tmin: -65, tmax: 90,
      desc: "Resistência mecânica e à abrasão excepcionais. Ideal para peças de desgaste, rolos e revestimentos antiabrasão.",
      r: { abrasion: 5, chemical: 5, heat: 2.5, electrical: 2.5 } },
    { abbr: "NR", name: "Borracha natural", astm: "NR", tmin: -20, tmax: 90,
      desc: "Alta elasticidade e excelente resistência à abrasão e ao rasgo. Boa escolha para amortecimento e impacto.",
      r: { abrasion: 5, chemical: 3, heat: 2, electrical: 4 } },
    { abbr: "SBR", name: "SBR", astm: "SBR", tmin: -20, tmax: 100,
      desc: "Custo competitivo com bom desempenho geral. Aplicada em peças técnicas de uso moderado.",
      r: { abrasion: 3, chemical: 4, heat: 2, electrical: 4 } },
    { abbr: "IIR", name: "Butyl", astm: "IIR", tmin: -40, tmax: 120,
      desc: "Baixíssima permeabilidade a gases e ótima resiliência. Indicado para câmaras, vedação e isolamento de vibração.",
      r: { abrasion: 4, chemical: 5, heat: 4.5, electrical: 5 } },
    { abbr: "CSM", name: "Hypalon", astm: "CSM", tmin: -40, tmax: 140,
      desc: "Forte resistência a intempéries, ozônio e produtos químicos, com boa estabilidade de cor.",
      r: { abrasion: 4, chemical: 4, heat: 5, electrical: 4 } }
  ];

  var props = [
    { key: "abrasion", label: "Resistência à abrasão" },
    { key: "chemical", label: "Resistência química" },
    { key: "heat", label: "Calor / UV" },
    { key: "electrical", label: "Isolamento elétrico" }
  ];

  function pct(t) { return ((t - T_MIN) / RANGE) * 100; }

  /* ---------- Explore view ---------- */
  var matList = document.getElementById("matList");
  var matDetail = document.getElementById("matDetail");
  var current = 0;

  function renderList() {
    matList.innerHTML = "";
    materials.forEach(function (m, i) {
      var b = document.createElement("button");
      b.className = "mat-chip" + (i === current ? " is-active" : "");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", i === current ? "true" : "false");
      b.innerHTML =
        '<span class="mat-chip__abbr">' + m.abbr + '</span>' +
        '<span><span class="mat-chip__name">' + m.name + '</span>' +
        '<span class="mat-chip__sub">' + m.tmin + " a " + m.tmax + " °C</span></span>";
      b.addEventListener("click", function () { current = i; renderList(); renderDetail(); });
      matList.appendChild(b);
    });
  }

  function renderDetail() {
    var m = materials[current];
    var width = pct(m.tmax);
    var bars = props.map(function (p) {
      var v = m.r[p.key];
      return '<div class="mat-bar"><div class="mat-bar__top"><b>' + p.label +
        '</b><span class="mat-bar__val">' + v.toFixed(1).replace(".0", "") + "/5</span></div>" +
        '<div class="mat-bar__track"><span class="mat-bar__fill" style="width:' + (v / 5 * 100) + '%"></span></div></div>';
    }).join("");

    matDetail.innerHTML =
      '<div class="mat-detail__head"><span class="mat-detail__abbr">' + m.abbr + '</span>' +
      '<div class="mat-detail__title"><h3>' + m.name + '</h3><span>Norma ASTM: ' + m.astm + '</span></div></div>' +
      '<p class="mat-detail__desc">' + m.desc + '</p>' +
      '<div class="thermal"><div class="thermal__label"><span>Faixa de operação</span><span>°C</span></div>' +
      '<div class="thermal__track"><span class="thermal__fill" style="left:0;width:' + width + '%"></span></div>' +
      '<div class="thermal__scale"><span>-70</span><span>0</span><span>120</span><span>260</span></div>' +
      '<div class="thermal__range"><span>mín <b>' + m.tmin + ' °C</b></span><span>máx <b>' + m.tmax + ' °C</b></span></div></div>' +
      '<div class="mat-bars">' + bars + '</div>';

    // trigger bar animation
    if (!reduceMotion) {
      var fills = matDetail.querySelectorAll(".mat-bar__fill");
      fills.forEach(function (f) { var w = f.style.width; f.style.width = "0"; requestAnimationFrame(function () { f.style.width = w; }); });
    }
  }

  /* ---------- Matrix view ---------- */
  var matrixBody = document.getElementById("matrixBody");
  function dots(v) {
    var full = Math.round(v);
    var out = '<span class="dots" aria-label="' + v + ' de 5">';
    for (var i = 1; i <= 5; i++) out += '<i class="' + (i <= full ? "on" : "") + '"></i>';
    return out + "</span>";
  }
  function renderMatrix() {
    matrixBody.innerHTML = "";
    materials.forEach(function (m) {
      var width = pct(m.tmax);
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td class="matrix__name"><span class="cell-abbr">' + m.abbr + '</span><strong>' + m.name +
        '</strong><small>ASTM ' + m.astm + '</small></td>' +
        '<td><div class="thermbar"><i style="left:0;width:' + width + '%"></i></div>' +
        '<small>' + m.tmin + " a " + m.tmax + ' °C</small></td>' +
        "<td>" + dots(m.r.abrasion) + "</td>" +
        "<td>" + dots(m.r.chemical) + "</td>" +
        "<td>" + dots(m.r.heat) + "</td>" +
        "<td>" + dots(m.r.electrical) + "</td>";
      matrixBody.appendChild(tr);
    });
  }

  /* ---------- Sorting ---------- */
  var defaultOrder = materials.slice();
  document.getElementById("sortSelect").addEventListener("change", function (e) {
    var v = e.target.value;
    if (v === "default") materials = defaultOrder.slice();
    else materials.sort(function (a, b) {
      if (v === "tmax") return b.tmax - a.tmax;
      if (v === "tmin") return a.tmin - b.tmin;
      if (v === "abrasion") return b.r.abrasion - a.r.abrasion;
      if (v === "chemical") return b.r.chemical - a.r.chemical;
      return 0;
    });
    current = 0;
    renderList(); renderDetail(); renderMatrix();
  });

  /* ---------- View segmented control ---------- */
  var viewExplore = document.getElementById("viewExplore");
  var viewMatrix = document.getElementById("viewMatrix");
  document.querySelectorAll("#viewSeg .seg__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("#viewSeg .seg__btn").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var matrix = btn.getAttribute("data-view") === "matrix";
      viewMatrix.hidden = !matrix;
      viewExplore.hidden = matrix;
    });
  });

  renderList();
  renderDetail();
  renderMatrix();

  /* ---------- Hero parallax ---------- */
  var heroPhoto = document.querySelector(".hero__photo");
  if (heroPhoto && !reduceMotion) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y < window.innerHeight) heroPhoto.style.transform = "scale(1.08) translateY(" + y * 0.18 + "px)";
    }, { passive: true });
  }

  /* ---------- Form ---------- */
  var form = document.getElementById("quoteForm");
  var msg = document.getElementById("formMsg");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var nome = encodeURIComponent(document.getElementById("nome").value);
    var empresa = encodeURIComponent(document.getElementById("empresa").value);
    var tel = encodeURIComponent(document.getElementById("telefone").value);
    var mensagem = encodeURIComponent(document.getElementById("mensagem").value);
    var body = "Nome: " + nome + "%0D%0AEmpresa: " + empresa + "%0D%0ATelefone: " + tel + "%0D%0A%0D%0A" + mensagem;
    window.location.href = "mailto:vendas1@entebor.com.br?subject=" +
      encodeURIComponent("Pedido de orçamento pelo site") + "&body=" + body;
    msg.hidden = false;
    msg.textContent = "Obrigado. Abrimos o seu e-mail para concluir o envio do pedido.";
    form.reset();
  });

  /* ---------- Year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
