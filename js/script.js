"use strict";

/* ==========================================================================
   CARDÁPIO DIGITAL (somente consulta) — script.js
   Para cada cliente novo, normalmente você só edita as 3 primeiras seções:
     1) CONFIG      → dados da empresa (WhatsApp, Instagram, endereço, horários, promoção)
     2) categories  → categorias do cardápio
     3) products    → produtos, preços, ingredientes e fotos
   O restante do arquivo (lógica) não precisa ser alterado.
   ========================================================================== */

document.documentElement.classList.add("js");

/* ==========================================================================
   1) CONFIGURAÇÕES DA EMPRESA  ← EDITE AQUI
   ========================================================================== */
const CONFIG = {
  // Nome que aparece no topo, rodapé e título da aba.
  // Dica: a ÚLTIMA palavra sai em amarelo (ex.: "Smash Fire" → "Fire" amarelo).
  restaurantName: "Smash Fire",
  tagline: "Burgers feitos na hora",

  // ➜ WHATSAPP (apenas contato): só números, com 55 + DDD + número.
  whatsapp: "5537999999999",
  whatsappMessage: "Olá! Vim pelo cardápio digital e gostaria de tirar uma dúvida.",

  // ➜ INSTAGRAM: link do perfil da empresa (troque o placeholder).
  instagram: "https://instagram.com/nomedaempresa",

  // ➜ GOOGLE MAPS: cole o link do "Compartilhar" do Google Maps.
  googleMaps: "https://maps.google.com/?q=Rua+Exemplo,+123,+Centro",

  // ➜ ENDEREÇO: cada item da lista é uma linha.
  address: ["Rua Exemplo, 123", "Centro", "Cidade - MG"],

  // ➜ DESENVOLVEDOR (link do "Desenvolvido por Oreia Tech" no rodapé).
  developer: "https://instagram.com/oreia_tech",

  // Fuso horário usado para calcular "Aberto agora / Fechado agora".
  timezone: "America/Sao_Paulo",

  // ➜ HORÁRIOS: 0 = Domingo, 1 = Segunda ... 6 = Sábado.
  //    Use null para dia fechado. Fechamento depois da meia-noite (ex.: "02:00") funciona.
  //    "00:00" como fechamento = meia-noite.
  schedule: {
    0: { open: "18:00", close: "23:00" }, // Domingo
    1: null,                              // Segunda (fechado)
    2: { open: "18:00", close: "23:00" }, // Terça
    3: { open: "18:00", close: "23:00" }, // Quarta
    4: { open: "18:00", close: "23:00" }, // Quinta
    5: { open: "18:00", close: "00:00" }, // Sexta
    6: { open: "18:00", close: "00:00" }, // Sábado
  },

  // ➜ PROMOÇÃO (faixa amarela com foto). Para esconder a seção, use  promo: null
  promo: {
    tag: "Oferta da semana",
    title: "Double Smash + Batata + Refrigerante",
    description: "Dois smash de 80g, cheddar em dobro, batata frita crocante e refrigerante lata.",
    price: 39.90,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=70",
  },
};

/* ==========================================================================
   2) CATEGORIAS  ← EDITE AQUI
   A ordem da lista é a ordem no site. O "id" deve ser igual ao campo
   "category" dos produtos. Categoria sem produtos não aparece.
   ========================================================================== */
const categories = [
  { id: "burgers", label: "Burgers", icon: "🍔" },
  { id: "porcoes", label: "Porções", icon: "🍟" },
  { id: "pizzas", label: "Pizzas", icon: "🍕" },
  { id: "combos", label: "Combos", icon: "🌭" },
  { id: "bebidas", label: "Bebidas", icon: "🥤" },
  { id: "sobremesas", label: "Sobremesas", icon: "🍰" },
];

/* ==========================================================================
   3) PRODUTOS  ← EDITE AQUI
   • Adicionar produto: copie uma linha { ... } e mude os dados (id único!).
   • Excluir produto:   apague a linha inteira { ... },
   • Trocar preço:      mude "price" (use ponto: 28.90).
   • Trocar foto:       mude "image". Aceita link completo ("https://...")
                        ou arquivo local ("assets/images/bacon-smash.jpg").
   • ingredients:       lista opcional de ingredientes (pode apagar o campo).
   • featured: true     → aparece também em "Mais pedidos".
   • badge: "..."       → selo opcional no produto (ex.: "⭐ Favorito da casa").
                          Em "Mais pedidos", se não houver badge, mostra "🔥 Mais pedido".
   • available: false   → mostra "Indisponível no momento" e escurece o card.
   ========================================================================== */

// Atalho para as fotos de demonstração (Unsplash). Pode ser removido quando
// todas as imagens forem substituídas pelas fotos reais do cliente.
const photo = (id, width = 400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`;

const products = [
  // ----- BURGERS -----
  { id: 1, name: "Classic Smash", category: "burgers", price: 22.90,
    description: "O clássico da casa: smash suculento na chapa bem quente.",
    ingredients: ["Pão brioche", "Smash 100g", "Queijo prato", "Alface", "Tomate", "Molho da casa"],
    image: photo("photo-1550547660-d9450f859349") },
  { id: 2, name: "Cheese Smash", category: "burgers", price: 25.90,
    description: "Para quem ama queijo: cheddar derretido por toda a carne.",
    ingredients: ["Pão brioche", "Smash 100g", "Cheddar em dobro", "Picles", "Molho especial"],
    image: photo("photo-1553979459-d2229ba7433b") },
  { id: 3, name: "Bacon Smash", category: "burgers", featured: true, price: 28.90,
    description: "Nosso campeão de pedidos: cheddar, bacon bem crocante e cebola caramelizada.",
    ingredients: ["Pão brioche", "Smash 150g", "Cheddar", "Bacon crocante", "Cebola caramelizada", "Molho especial"],
    image: photo("photo-1568901346375-23c9450c58cd") },
  { id: 4, name: "Double Smash", category: "burgers", featured: true, badge: "⭐ Favorito da casa", price: 34.90,
    description: "Dois smash na chapa, camadas de queijo e muito sabor.",
    ingredients: ["Pão brioche", "2 smash de 80g", "Cheddar em dobro", "Cebola roxa", "Picles", "Molho da casa"],
    image: photo("photo-1571091718767-18b5b1457add") },
  { id: 5, name: "Chicken Burger", category: "burgers", price: 27.90,
    description: "Frango empanado super crocante, com maionese temperada.",
    ingredients: ["Pão brioche", "Frango empanado", "Queijo prato", "Alface", "Maionese temperada"],
    image: photo("photo-1562967914-608f82629710") },
  { id: 6, name: "Burger da Casa", category: "burgers", featured: true, badge: "⭐ Favorito da casa", price: 31.90,
    description: "A receita especial do chef, com tudo que tem de melhor.",
    ingredients: ["Pão brioche", "Smash 150g", "Queijo pepper jack", "Jalapeño", "Cebola crispy", "Molho picante"],
    image: photo("photo-1594212699903-ec8a3eca50f5") },

  // ----- PORÇÕES -----
  { id: 7, name: "Batata Frita", category: "porcoes", price: 16.90,
    description: "Porção crocante, sequinha e bem temperada.",
    ingredients: ["Batata", "Sal temperado"],
    image: photo("photo-1573080496219-bb080dd4f877") },
  { id: 8, name: "Batata com Cheddar", category: "porcoes", price: 21.90,
    description: "Batata frita coberta com cheddar cremoso.",
    ingredients: ["Batata", "Cheddar cremoso"],
    image: photo("photo-1585109649139-366815a0d713") },
  { id: 9, name: "Batata Cheddar e Bacon", category: "porcoes", featured: true, price: 24.90,
    description: "A favorita para dividir: cheddar cremoso e bacon crocante.",
    ingredients: ["Batata", "Cheddar cremoso", "Bacon crocante", "Cebolinha"],
    image: photo("photo-1630384060421-cb20d0e0649d") },
  { id: 10, name: "Onion Rings", category: "porcoes", price: 19.90,
    description: "Anéis de cebola empanados e fritos na hora.",
    ingredients: ["Cebola", "Empanado crocante", "Molho especial"],
    image: photo("photo-1639024471283-03518883512d") },
  { id: 11, name: "Chicken Fingers", category: "porcoes", available: false, price: 26.90,
    description: "Tiras de frango empanadas e crocantes.",
    ingredients: ["Peito de frango", "Empanado crocante", "Molho barbecue"],
    image: photo("photo-1626082927389-6cd097cdc6ec") },

  // ----- PIZZAS -----
  { id: 12, name: "Pizza Calabresa", category: "pizzas", price: 42.90,
    description: "Pizza média (6 fatias) com calabresa fatiada e cebola.",
    ingredients: ["Molho de tomate", "Mussarela", "Calabresa", "Cebola", "Orégano"],
    image: photo("photo-1513104890138-7c749659a591") },
  { id: 13, name: "Pizza Marguerita", category: "pizzas", price: 39.90,
    description: "Pizza média (6 fatias), simples e saborosa.",
    ingredients: ["Molho de tomate", "Mussarela", "Tomate", "Manjericão"],
    image: photo("photo-1565299624946-b28f40a0ae38") },
  { id: 14, name: "Pizza Frango com Catupiry", category: "pizzas", price: 44.90,
    description: "Pizza média (6 fatias) cremosa e bem recheada.",
    ingredients: ["Molho de tomate", "Mussarela", "Frango desfiado", "Catupiry"],
    image: photo("photo-1574071318508-1cdbab80d002") },

  // ----- COMBOS -----
  { id: 15, name: "Combo Classic", category: "combos", price: 38.90,
    description: "Classic Smash + Batata + Refrigerante.",
    ingredients: ["1 Classic Smash", "1 Batata P", "1 Refrigerante lata"],
    image: photo("photo-1572802419224-296b0aeee0d9") },
  { id: 16, name: "Combo Bacon", category: "combos", featured: true, price: 42.90,
    description: "Bacon Smash + Batata + Refrigerante.",
    ingredients: ["1 Bacon Smash", "1 Batata P", "1 Refrigerante lata"],
    image: photo("photo-1561758033-d89a9ad46330") },
  { id: 17, name: "Combo Casal", category: "combos", price: 69.90,
    description: "Dois burgers, batata grande e dois refrigerantes.",
    ingredients: ["2 Classic Smash", "1 Batata G", "2 Refrigerantes lata"],
    image: photo("photo-1607013251379-e6eecfffe234") },

  // ----- BEBIDAS -----
  { id: 18, name: "Coca-Cola", category: "bebidas", price: 7.00,
    description: "Lata 350ml, bem gelada.",
    image: photo("photo-1622483767028-3f66f32aef97") },
  { id: 19, name: "Coca-Cola Zero", category: "bebidas", price: 7.00,
    description: "Lata 350ml, sem açúcar.",
    image: photo("photo-1554866585-cd94860890b7") },
  { id: 20, name: "Guaraná", category: "bebidas", price: 7.00,
    description: "Lata 350ml, bem gelada.",
    image: photo("photo-1581636625402-29b2a704ef13") },
  { id: 21, name: "Sprite", category: "bebidas", price: 7.00,
    description: "Lata 350ml, bem gelada.",
    image: photo("photo-1625772299848-391b6a87d7b3") },
  { id: 22, name: "Água Mineral", category: "bebidas", price: 4.00,
    description: "Garrafa 500ml, sem gás.",
    image: photo("photo-1548839140-29a749e1cf4d") },
  { id: 23, name: "Suco Natural", category: "bebidas", price: 9.90,
    description: "Laranja, limão ou maracujá. Copo de 400ml.",
    image: photo("photo-1600271886742-f049cd451bba") },

  // ----- SOBREMESAS -----
  { id: 24, name: "Brownie", category: "sobremesas", price: 14.90,
    description: "Brownie de chocolate macio, servido quentinho.",
    ingredients: ["Chocolate", "Nozes", "Calda de chocolate"],
    image: photo("photo-1606313564200-e75d5e30476c") },
  { id: 25, name: "Milkshake", category: "sobremesas", price: 21.90,
    description: "Cremoso, com calda e chantilly. 400ml. Chocolate, morango ou ovomaltine.",
    ingredients: ["Sorvete", "Leite", "Calda", "Chantilly"],
    image: photo("photo-1572490122747-3968b75cc699") },
  { id: 26, name: "Sorvete Sundae", category: "sobremesas", price: 12.90,
    description: "Sorvete de creme com calda de morango ou chocolate.",
    ingredients: ["Sorvete de creme", "Calda à escolha"],
    image: photo("photo-1563805042-7684c019e1cb") },
  { id: 27, name: "Petit Gateau", category: "sobremesas", price: 19.90,
    description: "Bolinho de chocolate com centro cremoso e sorvete.",
    ingredients: ["Chocolate", "Sorvete de creme"],
    image: photo("photo-1624353365286-3f8d62daad51") },
];

/* ==========================================================================
   A PARTIR DAQUI É A LÓGICA DO SITE — normalmente não precisa mexer.
   ========================================================================== */

const FALLBACK_IMAGE = "assets/images/placeholder.svg";
const DAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]; // exibe de segunda a domingo

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const categoryById = new Map(categories.map((c) => [c.id, c]));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Utilidades ---------- */

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const formatPrice = (value) => brl.format(value).replace(/ /g, " ");

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const isAvailable = (product) => product.available !== false;

/* ---------- WhatsApp (apenas contato) ---------- */

function whatsappUrl() {
  const number = String(CONFIG.whatsapp).replace(/\D/g, "");
  const text = CONFIG.whatsappMessage ? `?text=${encodeURIComponent(CONFIG.whatsappMessage)}` : "";
  return `https://wa.me/${number}${text}`;
}

/* ---------- Horário de funcionamento ---------- */

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// Dia da semana e minutos atuais no fuso configurado.
function getNow() {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: CONFIG.timezone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type).value;
    return {
      day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")),
      minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")),
    };
  } catch (error) {
    const now = new Date(); // fuso inválido: usa o relógio do aparelho
    return { day: now.getDay(), minutes: now.getHours() * 60 + now.getMinutes() };
  }
}

// Janela de funcionamento em minutos. Se fecha "antes" de abrir, passa da meia-noite.
function getWindow(day) {
  const entry = CONFIG.schedule[day];
  if (!entry) return null;
  const start = toMinutes(entry.open);
  let end = toMinutes(entry.close);
  if (end <= start) end += 1440;
  return { start, end, entry };
}

function getOpenStatus() {
  const { day, minutes } = getNow();
  const today = getWindow(day);
  const yesterday = getWindow((day + 6) % 7);

  if (today && minutes >= today.start && minutes < today.end) {
    return { isOpen: true, day, entry: today.entry };
  }
  // Ainda aberto após a meia-noite pelo expediente de ontem?
  if (yesterday && yesterday.end > 1440 && minutes < yesterday.end - 1440) {
    return { isOpen: true, day, entry: yesterday.entry };
  }
  return { isOpen: false, day, entry: today ? today.entry : null };
}

function updateStatus() {
  const { isOpen, day, entry } = getOpenStatus();
  const todayText = entry ? `Hoje: ${entry.open} às ${entry.close}` : "Hoje: Fechado";
  const statusEl = $("#status");
  statusEl.classList.toggle("is-open", isOpen);
  statusEl.classList.toggle("is-closed", !isOpen);
  $("#status-text").textContent = isOpen ? "Aberto agora" : "Fechado agora";
  $("#status-hours").textContent = todayText;
  $$("[data-today-hours]").forEach((el) => (el.textContent = todayText));
  $$("#hours-list li").forEach((li) => li.classList.toggle("is-today", Number(li.dataset.day) === day));
}

function renderHours() {
  $("#hours-list").innerHTML = WEEK_ORDER.map((day) => {
    const entry = CONFIG.schedule[day];
    const time = entry ? `${entry.open} - ${entry.close}` : "Fechado";
    return `<li data-day="${day}" class="${entry ? "" : "is-closed"}"><span class="hours__day">${DAY_NAMES[day]}</span><span class="hours__time">${time}</span></li>`;
  }).join("");
}

/* ---------- Configuração → página ---------- */

function renderBrandName(el) {
  const words = CONFIG.restaurantName.trim().split(/\s+/);
  el.replaceChildren();
  if (words.length === 1) {
    el.textContent = words[0];
    return;
  }
  const last = document.createElement("em");
  last.textContent = words.pop();
  el.append(`${words.join(" ")} `, last);
}

function applyConfig() {
  document.title = `${CONFIG.restaurantName} | Cardápio Digital`;
  $$("[data-brand-name]").forEach(renderBrandName);
  $$("[data-restaurant-name]").forEach((el) => (el.textContent = CONFIG.restaurantName));
  $$("[data-tagline]").forEach((el) => (el.textContent = CONFIG.tagline));
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  $$("[data-address]").forEach((el) => {
    el.replaceChildren();
    CONFIG.address.forEach((line, i) => {
      if (i) el.appendChild(document.createElement("br"));
      el.appendChild(document.createTextNode(line));
    });
  });
  $$("[data-whatsapp]").forEach((a) => (a.href = whatsappUrl()));
  $$("[data-instagram]").forEach((a) => (a.href = CONFIG.instagram));
  $$("[data-maps]").forEach((a) => (a.href = CONFIG.googleMaps));
  $$("[data-developer]").forEach((a) => (a.href = CONFIG.developer));
}

/* ---------- Renderização do cardápio ---------- */

function imageTag(product, className, width, height) {
  return `<img class="${className}" src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" width="${width}" height="${height}" loading="lazy" decoding="async" data-fallback>`;
}

function ingredientsHTML(product) {
  const list = Array.isArray(product.ingredients) ? product.ingredients.join(", ") : product.ingredients;
  return list ? `<p class="ingredients"><strong>Ingredientes:</strong> ${escapeHTML(list)}</p>` : "";
}

const unavailableHTML = (product) =>
  isAvailable(product) ? "" : `<span class="unavailable"><span>Indisponível no momento</span></span>`;

function renderCategories(visible) {
  $("#cats-list").innerHTML = visible.map((c, i) =>
    `<li><button class="chip${i === 0 ? " is-active" : ""}" type="button" data-cat="${escapeHTML(c.id)}" aria-current="${i === 0}"><span aria-hidden="true">${c.icon}</span>${escapeHTML(c.label)}</button></li>`
  ).join("");
}

function featuredCard(product) {
  const badge = product.badge || "🔥 Mais pedido";
  return `
    <article class="feat-card${isAvailable(product) ? "" : " is-unavailable"}">
      <div class="feat-card__media">
        ${imageTag(product, "feat-card__img", 400, 300)}
        <span class="badge">${escapeHTML(badge)}</span>
      </div>
      <div class="feat-card__body">
        <h3 class="feat-card__name">${escapeHTML(product.name)}</h3>
        <p class="feat-card__desc">${escapeHTML(product.description)}</p>
        ${ingredientsHTML(product)}
        <p class="price">${formatPrice(product.price)}</p>
      </div>
      ${unavailableHTML(product)}
    </article>`;
}

function renderFeatured() {
  const featured = products.filter((p) => p.featured);
  if (!featured.length) {
    $(".featured").hidden = true;
    return;
  }
  const track = $("#featured-list");
  track.innerHTML = featured.map(featuredCard).join("");
  track.classList.add("reveal");
}

function productCard(product, index) {
  const tag = product.badge ? `<span class="tag">${escapeHTML(product.badge)}</span>` : "";
  return `
    <article class="product reveal${isAvailable(product) ? "" : " is-unavailable"}" style="--i:${index % 4}">
      ${imageTag(product, "product__img", 104, 104)}
      <div class="product__info">
        ${tag}
        <h3 class="product__name">${escapeHTML(product.name)}</h3>
        <p class="product__desc">${escapeHTML(product.description)}</p>
        ${ingredientsHTML(product)}
        <p class="price">${formatPrice(product.price)}</p>
      </div>
      ${unavailableHTML(product)}
    </article>`;
}

// Retorna as categorias que têm pelo menos 1 produto.
function renderMenu() {
  const visible = categories.filter((c) => products.some((p) => p.category === c.id));
  const html = visible.map((category) => {
    const items = products.filter((p) => p.category === category.id);
    return `
      <section class="menu-cat" id="cat-${escapeHTML(category.id)}" aria-labelledby="title-${escapeHTML(category.id)}">
        <h2 class="menu-cat__title reveal" id="title-${escapeHTML(category.id)}"><span aria-hidden="true">${category.icon}</span>${escapeHTML(category.label)}</h2>
        <div class="menu-grid">${items.map(productCard).join("")}</div>
      </section>`;
  }).join("");
  $("#menu-list").insertAdjacentHTML("beforeend", html);
  return visible;
}

function renderPromo() {
  const promo = CONFIG.promo;
  if (!promo) {
    $("#promocoes").hidden = true;
    $$('a[href="#promocoes"]').forEach((a) => (a.hidden = true));
    return;
  }
  $("#promo-tag").textContent = `🔥 ${promo.tag}`;
  $("#promo-title").textContent = promo.title;
  $("#promo-desc").textContent = promo.description || "";
  $("#promo-price").textContent = formatPrice(promo.price);
  const img = $("#promo-img");
  img.src = promo.image;
  img.alt = promo.title;
}

/* ---------- Menu mobile ---------- */

function setupMenu() {
  const header = $(".site-header");
  const toggle = $("#menu-toggle");
  const setMenu = (open) => {
    header.classList.toggle("is-menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  toggle.addEventListener("click", () => setMenu(!header.classList.contains("is-menu-open")));
  $$("#main-menu a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("click", (event) => {
    if (header.classList.contains("is-menu-open") && !header.contains(event.target)) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
}

/* ---------- Navegação por categorias (rola até a seção e acompanha o scroll) ---------- */

function setupCategoryNav(visible) {
  const list = $("#cats-list");
  const chips = $$(".chip", list);
  const sections = visible.map((c) => document.getElementById(`cat-${c.id}`)).filter(Boolean);
  let activeId = chips.length ? chips[0].dataset.cat : null;
  let lockUntil = 0; // evita o "pisca" do destaque durante o scroll suave após um clique

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    chips.forEach((chip) => {
      const active = chip.dataset.cat === id;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-current", String(active));
      if (active) {
        // Centraliza o chip na barra horizontal (sem mexer no scroll vertical da página).
        const delta = chip.getBoundingClientRect().left - list.getBoundingClientRect().left - (list.clientWidth - chip.offsetWidth) / 2;
        list.scrollBy({ left: delta, behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  }

  list.addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    if (!chip) return;
    const section = document.getElementById(`cat-${chip.dataset.cat}`);
    if (!section) return;
    lockUntil = Date.now() + 900;
    setActive(chip.dataset.cat);
    section.scrollIntoView({ block: "start" }); // o espaçamento do cabeçalho vem do CSS (scroll-margin-top)
  });

  let ticking = false;
  const update = () => {
    ticking = false;
    if (Date.now() < lockUntil || !sections.length) return;
    const line = $(".site-header").offsetHeight + $(".cats").offsetHeight + 24;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= line) current = section;
    });
    setActive(current.id.replace("cat-", ""));
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
}

/* ---------- Imagens: se uma foto falhar, usa o placeholder local ---------- */

function setupImageFallback() {
  const useFallback = (img) => {
    if (img.dataset.failed) return;
    img.dataset.failed = "1";
    // Foto do topo (data-fallback="hide"): se falhar, some e fica o fundo preto com brilho.
    if (img.dataset.fallback === "hide") img.style.visibility = "hidden";
    else img.src = FALLBACK_IMAGE;
  };
  // "error" não borbulha, por isso o listener usa a fase de captura.
  document.addEventListener("error", (event) => {
    const img = event.target;
    if (img.tagName === "IMG" && img.hasAttribute("data-fallback")) useFallback(img);
  }, true);
  // Imagens que já falharam antes do script rodar (ex.: foto do topo).
  window.addEventListener("load", () => {
    $$("img[data-fallback]").forEach((img) => {
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) useFallback(img);
    });
  });
}

/* ---------- Animação de entrada no scroll ---------- */

function setupReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
  items.forEach((el) => observer.observe(el));
}

/* ---------- Verificação de dados (avisos no console) ---------- */

function validateData() {
  const seen = new Set();
  products.forEach((p) => {
    if (seen.has(String(p.id))) console.warn(`[Cardápio] id repetido: ${p.id} (${p.name})`);
    seen.add(String(p.id));
    if (!categoryById.has(p.category)) console.warn(`[Cardápio] categoria inexistente em "${p.name}": ${p.category}`);
    if (typeof p.price !== "number" || Number.isNaN(p.price)) console.warn(`[Cardápio] preço inválido em "${p.name}"`);
  });
}

/* ---------- Inicialização ---------- */

function init() {
  validateData();
  setupImageFallback();
  applyConfig();
  const visible = renderMenu();
  renderCategories(visible);
  renderFeatured();
  renderHours();
  renderPromo();
  setupMenu();
  setupCategoryNav(visible);
  updateStatus();
  setupReveal();

  setInterval(updateStatus, 60 * 1000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateStatus();
  });
}

try {
  init();
} catch (error) {
  // Se algo falhar, garante que o conteúdo estático continue visível.
  document.documentElement.classList.remove("js");
  console.error("[Cardápio] erro ao iniciar:", error);
}
