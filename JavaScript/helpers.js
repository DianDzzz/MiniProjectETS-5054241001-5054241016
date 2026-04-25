// helpers.js — DOM helpers, icons, product visualization
'use strict';

// Tiny hyperscript-style element creator
function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  if (attrs) {
    for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'style' && typeof v === 'object') {
        Object.assign(el.style, v);
      } else if (k === 'class' || k === 'className') {
        el.className = v;
      } else if (k === 'dataset') {
        Object.assign(el.dataset, v);
      } else if (k.startsWith('on') && typeof v === 'function') {
        el.addEventListener(k.slice(2).toLowerCase(), v);
      } else if (k === 'html') {
        el.innerHTML = v;
      } else if (typeof v === 'boolean') {
        if (v) el.setAttribute(k, '');
      } else {
        el.setAttribute(k, v);
      }
    }
  }
  for (const c of children.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(c) : c);
  }
  return el;
}

const ICONS = {
  search: '<circle cx="7" cy="7" r="5"/><path d="M11 11l4 4"/>',
  cart: '<path d="M2 3h2.5l1.5 9h8l1.5-6H5"/><circle cx="7" cy="15" r="1"/><circle cx="13" cy="15" r="1"/>',
  user: '<circle cx="8" cy="6" r="3"/><path d="M2 15c0-3.3 2.7-6 6-6s6 2.7 6 6"/>',
  heart: '<path d="M8 14s-5-3.2-5-7a3 3 0 0 1 5-2.2A3 3 0 0 1 13 7c0 3.8-5 7-5 7z"/>',
  chevronRight: '<path d="M6 3l5 5-5 5"/>',
  chevronLeft: '<path d="M10 3L5 8l5 5"/>',
  chevronDown: '<path d="M3 6l5 5 5-5"/>',
  plus: '<path d="M8 3v10M3 8h10"/>',
  minus: '<path d="M3 8h10"/>',
  x: '<path d="M3 3l10 10M13 3L3 13"/>',
  check: '<path d="M3 8.5l3 3 7-7"/>',
  star: '<path d="M8 1.5l2 4.5 5 .5-3.7 3.4 1 5L8 12.5 3.7 14.9l1-5L1 6.5l5-.5z"/>',
  starFilled: '<path fill="currentColor" stroke="currentColor" d="M8 1.5l2 4.5 5 .5-3.7 3.4 1 5L8 12.5 3.7 14.9l1-5L1 6.5l5-.5z"/>',
  filter: '<path d="M2 4h12M4 8h8M6 12h4"/>',
  sort: '<path d="M4 3v10M4 13l-2-2M4 13l2-2"/><path d="M11 13V3M11 3L9 5M11 3l2 2"/>',
  arrow: '<path d="M3 8h10M9 4l4 4-4 4"/>',
  truck: '<path d="M1 4h9v7H1zM10 6h3l2 2v3h-5"/><circle cx="4" cy="13" r="1"/><circle cx="12" cy="13" r="1"/>',
  shield: '<path d="M8 1l6 2v5c0 4-3 7-6 7s-6-3-6-7V3z"/>',
  refresh: '<path d="M2 8a6 6 0 0 1 11-3.5M14 8a6 6 0 0 1-11 3.5M13 2v3h-3M3 14v-3h3"/>',
  package: '<path d="M8 1.5L2 4.5v7L8 14.5 14 11.5v-7zM2 4.5L8 7.5l6-3M8 7.5v7"/>',
  lock: '<rect x="3" y="7" width="10" height="7"/><path d="M5 7V5a3 3 0 0 1 6 0v2"/>',
  sun: '<circle cx="8" cy="8" r="3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3"/>',
  moon: '<path d="M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5z"/>',
};

function icon(name, size = 16, stroke = 1.5) {
  if (!ICONS[name]) return document.createTextNode('');
  const wrap = document.createElement('span');
  wrap.style.display = 'inline-flex';
  wrap.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
  return wrap;
}

function stars(rating, size = 12, showNum = false, reviews = null) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const wrap = h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: '2px' } });
  for (let i = 0; i < 5; i++) {
    const filled = i < full || (i === full && half);
    const ic = icon(filled ? 'starFilled' : 'star', size, 1.2);
    if (!filled) ic.style.opacity = '0.3';
    wrap.appendChild(ic);
  }
  if (showNum) {
    wrap.appendChild(h('span', {
      class: 'mono',
      style: { marginLeft: '4px', fontSize: '11px', color: 'var(--text-muted)' }
    }, `${rating.toFixed(1)}${reviews != null ? ` · ${reviews}` : ''}`));
  }
  return wrap;
}

// Product visualization — geometric placeholders per shape
const SHAPES = {
  circles: (c, bg) => `<div style="position:absolute;inset:15%;display:flex;align-items:center;justify-content:center"><div style="width:100%;height:100%;border-radius:50%;border:2px solid ${c};position:relative"><div style="position:absolute;inset:18%;border-radius:50%;background:${c};opacity:0.12"></div><div style="position:absolute;inset:38%;border-radius:50%;border:1.5px solid ${c}"></div></div></div>`,
  pills: (c) => `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:8%"><div style="width:20%;height:40%;border-radius:50% / 30%;background:${c}"></div><div style="width:20%;height:40%;border-radius:50% / 30%;background:${c}"></div></div>`,
  square: (c, bg) => `<div style="position:absolute;inset:20%;display:flex;align-items:center;justify-content:center"><div style="width:100%;height:100%;background:${c};border-radius:20%;position:relative"><div style="position:absolute;inset:8%;background:${bg};border-radius:15%"></div></div></div>`,
  laptop: (c, bg) => `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2%"><div style="width:70%;height:35%;background:${c};border-radius:4% 4% 0 0;display:flex;align-items:center;justify-content:center"><div style="width:94%;height:88%;background:${bg}"></div></div><div style="width:78%;height:4%;background:${c};border-radius:0 0 8% 8%"></div></div>`,
  camera: (c, bg) => `<div style="position:absolute;inset:20%;display:flex;align-items:center;justify-content:center"><div style="width:100%;height:70%;background:${c};border-radius:8%;position:relative"><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:50%;aspect-ratio:1;border-radius:50%;border:3px solid ${bg};background:${c}"></div><div style="position:absolute;top:15%;right:15%;width:8%;height:8%;border-radius:50%;background:${bg}"></div></div></div>`,
  mouse: (c, bg) => `<div style="position:absolute;inset:20%;display:flex;align-items:center;justify-content:center"><div style="width:60%;height:100%;background:${c};border-radius:50% 50% 45% 45% / 60% 60% 40% 40%;position:relative"><div style="position:absolute;top:15%;left:50%;transform:translateX(-50%);width:8%;height:20%;background:${bg};border-radius:20%"></div></div></div>`,
  lamp: (c) => `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><div style="position:relative;height:70%;width:40%"><div style="position:absolute;top:0;left:15%;width:70%;height:20%;background:${c};border-radius:30% 30% 0 0"></div><div style="position:absolute;top:18%;left:48%;width:4%;height:60%;background:${c}"></div><div style="position:absolute;bottom:0;left:20%;width:60%;height:6%;background:${c};border-radius:20%"></div></div></div>`,
  keyboard: (c, bg) => `<div style="position:absolute;inset:25%;display:flex;align-items:center;justify-content:center"><div style="width:100%;height:60%;background:${c};border-radius:4%;padding:6%;display:grid;grid-template-columns:repeat(8,1fr);gap:2.5%">${Array.from({length:24}).map(() => `<div style="aspect-ratio:1;background:${bg};border-radius:20%"></div>`).join('')}</div></div>`,
  hub: (c, bg) => `<div style="position:absolute;inset:25%;display:flex;align-items:center;justify-content:center"><div style="width:100%;height:40%;background:${c};border-radius:8%;display:flex;align-items:center;justify-content:space-around;padding:0 6%">${Array.from({length:4}).map(() => `<div style="width:14%;height:40%;background:${bg};border-radius:15%"></div>`).join('')}</div></div>`,
  lens: (c, bg) => `<div style="position:absolute;inset:15%;display:flex;align-items:center;justify-content:center"><div style="width:70%;height:70%;border-radius:50%;background:${c};position:relative"><div style="position:absolute;inset:15%;border-radius:50%;background:${bg}"></div><div style="position:absolute;inset:28%;border-radius:50%;background:${c}"></div><div style="position:absolute;inset:40%;border-radius:50%;background:${bg};opacity:0.5"></div></div></div>`,
  pad: (c) => `<div style="position:absolute;inset:15%;display:flex;align-items:center;justify-content:center"><div style="width:100%;height:60%;background:${c};border-radius:3%"></div></div>`,
  ring: (c) => `<div style="position:absolute;inset:20%;display:flex;align-items:center;justify-content:center"><div style="width:100%;height:100%;border-radius:50%;border:8px solid ${c}"></div></div>`,
};

function productVis(shape, color) {
  const c = color || 'var(--text)';
  const bg = 'var(--bg-sunken)';
  const html = (SHAPES[shape] || SHAPES.square)(c, bg);
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:absolute;inset:0';
  wrap.innerHTML = html;
  return wrap;
}

window.NIMBUS_HELPERS = { h, icon, stars, productVis };
