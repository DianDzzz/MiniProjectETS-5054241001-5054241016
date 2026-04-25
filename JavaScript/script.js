// app.js — main app, state, navigation, mounting
'use strict';

(function() {
const { h } = window.NIMBUS_HELPERS;
const { renderHeader, renderFooter, renderCatalog } = window.NIMBUS_SCREENS_1;
const { renderProduct, renderCart } = window.NIMBUS_SCREENS_2;
const { renderCheckout, renderLogin, renderConfirm } = window.NIMBUS_SCREENS_3;

const THEME_KEY = 'nimbus.theme.v1';
const _loadCart = window.NIMBUS_DATA.loadCart;
const _saveCart = window.NIMBUS_DATA.saveCart;

// One state object per frame (desktop & mobile share cart, but routes are independent)
function makeFrameState({ frame, container, sharedCart }) {
  const state = {
    frame,                  // 'desktop' | 'mobile'
    route: { name: 'catalog', param: null },
    cart: sharedCart.cart,
    user: null,
    theme: localStorage.getItem(THEME_KEY) || 'light',
    pview: null,
    checkout: null,
    auth: null,
    lastOrder: null,
    filters: null,
    sort: null,
    showFilters: false,
    showSort: false,
  };

  state.nav = (name, param = null) => {
    state.route = { name, param };
    container.scrollTop = 0;
    state.rerender();
  };

  state.addToCart = (item) => {
    const key = `${item.productId}-${item.color}-${item.size || ''}`;
    const existing = sharedCart.cart.find(i => `${i.productId}-${i.color}-${i.size || ''}` === key);
    if (existing) existing.qty += item.qty;
    else sharedCart.cart.push({ ...item });
    state.persistCart();
    sharedCart.broadcast();
  };

  state.persistCart = () => {
    _saveCart(sharedCart.cart);
    sharedCart.broadcast();
  };

  state.toggleTheme = () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, state.theme);
    sharedCart.broadcastTheme(state.theme);
  };

  state.rerender = () => render(state, container);

  return state;
}

function render(state, container) {
  // sync cart ref (in case other frame mutated it)
  state.cart = window.__nimbus_shared.cart;

  // theme
  container.dataset.theme = state.theme;
  container.style.setProperty('color-scheme', state.theme);

  container.innerHTML = '';
  const wrap = h('div', { style: { minHeight: '100%', display: 'flex', flexDirection: 'column' } });

  wrap.appendChild(renderHeader(state));

  const main = h('div', { style: { flex: '1' } });

  switch (state.route.name) {
    case 'catalog':  main.appendChild(renderCatalog(state)); break;
    case 'product':  main.appendChild(renderProduct(state)); break;
    case 'cart':     main.appendChild(renderCart(state)); break;
    case 'checkout': main.appendChild(renderCheckout(state)); break;
    case 'login':    main.appendChild(renderLogin(state)); break;
    case 'confirm':  main.appendChild(renderConfirm(state)); break;
    default:         main.appendChild(renderCatalog(state));
  }

  wrap.appendChild(main);
  wrap.appendChild(renderFooter(state));
  container.appendChild(wrap);
}

// ─── Tweaks panel (light/dark) ──────────────────────────
function mountTweaks(shared) {
  let visible = false;
  let panel;

  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode') { visible = true; renderPanel(); }
    if (d.type === '__deactivate_edit_mode') { visible = false; renderPanel(); }
  });

  function renderPanel() {
    if (panel) { panel.remove(); panel = null; }
    if (!visible) return;
    panel = h('div', {
      style: {
        position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999',
        background: '#fff', color: '#1a1a1c', borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)',
        padding: '16px', minWidth: '240px', fontFamily: 'Inter Tight, sans-serif',
      }
    },
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' } },
        h('div', { style: { fontWeight: '600', fontSize: '13px' } }, 'Tweaks'),
        h('button', {
          onclick: () => { visible = false; renderPanel(); window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); },
          style: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#6b6862' }
        }, '×')
      ),
      h('div', { style: { fontSize: '11px', color: '#6b6862', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' } }, 'Tema'),
      h('div', { style: { display: 'flex', gap: '6px' } },
        ...['light', 'dark'].map(t => h('button', {
          onclick: () => { shared.broadcastTheme(t); renderPanel(); },
          style: {
            flex: '1', padding: '8px 12px', fontSize: '12px',
            border: '1px solid', cursor: 'pointer',
            borderColor: shared.theme === t ? '#1a1a1c' : '#d8d4cc',
            background: shared.theme === t ? '#1a1a1c' : '#fff',
            color: shared.theme === t ? '#fff' : '#1a1a1c',
            borderRadius: '4px', textTransform: 'capitalize',
            fontFamily: 'inherit',
          }
        }, t === 'light' ? 'Light' : 'Dark'))
      ),
      h('div', { style: { fontSize: '11px', color: '#6b6862', marginTop: '14px', lineHeight: '1.5' } },
        'Klik produk untuk lihat detail · cart tersinkronisasi antar frame · data tersimpan di localStorage')
    );
    document.body.appendChild(panel);
  }
}

// ─── Bootstrap ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  const shared = {
    cart: _loadCart(),
    theme: localStorage.getItem(THEME_KEY) || 'light',
    states: [],
    broadcast() { this.states.forEach(s => { s.cart = this.cart; render(s, s._container); }); },
    broadcastTheme(t) {
      this.theme = t;
      localStorage.setItem(THEME_KEY, t);
      this.states.forEach(s => { s.theme = t; render(s, s._container); });
    },
  };
  window.__nimbus_shared = shared;

  const container = h('div', { class: 'nimbus scroll', style: { height: '100vh', width: '100vw' } });
  app.appendChild(container);

  const state = makeFrameState({ 
    frame: window.innerWidth <= 768 ? 'mobile' : 'desktop', 
    container: container, 
    sharedCart: shared 
  });
  state._container = container;

  shared.states.push(state);

  window.addEventListener('resize', () => {
    const f = window.innerWidth <= 768 ? 'mobile' : 'desktop';
    if (state.frame !== f) {
      state.frame = f;
      state.rerender();
    }
  });

  render(state, container);

  mountTweaks(shared);

  // Announce tweaks availability
  setTimeout(() => {
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}
  }, 100);
});
})();
