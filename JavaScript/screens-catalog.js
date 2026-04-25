// screens.js — all screens as render functions returning DOM nodes
'use strict';

(function () {
  const { CATEGORIES, BRANDS, PRODUCTS, SORT_OPTIONS, formatRupiah } = window.TumBAS_DATA;
  const { h, icon, stars, productVis } = window.TumBAS_HELPERS;

  // ─── Header ─────────────────────────────────────────────
  function renderHeader(state) {
    const isMobile = state.frame === 'mobile';
    const cartCount = state.cart.reduce((s, i) => s + i.qty, 0);

    const navBtn = (label, onClick, active = false) =>
      h('button', {
        onclick: onClick,
        style: {
          padding: '6px 12px', fontSize: '13px',
          color: active ? 'var(--text)' : 'var(--text-muted)',
          fontWeight: active ? '500' : '400',
        }
      }, label);

    const iconBtn = (name, onClick, badge = null, title = '') =>
      h('button', { onclick: onClick, title, style: { padding: '8px', display: 'flex', position: 'relative' } },
        icon(name, 16),
        badge ? h('span', {
          style: {
            position: 'absolute', top: '0', right: '0', minWidth: '16px', height: '16px',
            padding: '0 4px', background: 'var(--text)', color: 'var(--bg)',
            borderRadius: '8px', fontSize: '9px', fontWeight: '600',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'JetBrains Mono, monospace',
          }
        }, String(badge)) : null
      );

    const logo = h('button', {
      onclick: () => state.nav('catalog'),
      style: { display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '16px', letterSpacing: '-0.02em' }
    },
      h('img', { 
        src: 'Assets/tumBAS_bw.png', 
        style: { 
          height: '32px', width: 'auto', borderRadius: '4px',
          filter: state.theme === 'dark' ? 'invert(1)' : 'none' 
        },
        alt: 'tumBAS Logo'
      }),
      'TumBAS'
    );

    const searchField = h('div', {
      class: 'field',
      style: { display: 'flex', alignItems: 'center', gap: '8px', width: '240px', padding: '8px 12px' }
    },
      icon('search', 14),
      h('input', { placeholder: 'Cari produk...', style: { fontSize: '13px' } }),
      h('span', {
        class: 'mono',
        style: { fontSize: '10px', color: 'var(--text-faint)', border: '1px solid var(--line)', padding: '1px 4px', borderRadius: '2px' }
      }, '⌘K')
    );

    return h('header', {
      style: {
        position: 'sticky', top: '0', zIndex: '50',
        background: 'var(--bg)', borderBottom: '1px solid var(--line)',
      }
    },
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '16px',
          padding: isMobile ? '14px 16px' : '16px 32px',
          height: isMobile ? '56px' : '64px',
        }
      },
        logo,
        !isMobile ? h('nav', { style: { display: 'flex', gap: '4px', marginLeft: '16px' } },
          navBtn('Katalog', () => state.nav('catalog'), state.route.name === 'catalog'),
          navBtn('Brand', () => { }),
          navBtn('Penawaran', () => { }),
          navBtn('Dukungan', () => { }),
        ) : null,
        h('div', { style: { flex: '1' } }),
        !isMobile ? searchField : null,
        iconBtn(state.theme === 'dark' ? 'sun' : 'moon', state.toggleTheme, null, 'Toggle tema'),
        iconBtn('user', () => state.nav('login')),
        iconBtn('cart', () => state.nav('cart'), cartCount > 0 ? cartCount : null),
      )
    );
  }

  // ─── Footer ─────────────────────────────────────────────
  function renderFooter(state) {
    const isMobile = state.frame === 'mobile';
    if (isMobile) {
      return h('footer', {
        style: {
          borderTop: '1px solid var(--line)', padding: '20px 16px 32px', marginTop: '24px',
          fontSize: '11px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between',
        }
      }, h('span', {}, '© 2026 TumBAS'), h('span', { class: 'mono' }, 'v1.0.0'));
    }
    const col = (title, items) => h('div', {},
      h('div', { style: { fontSize: '13px', fontWeight: '600', color: 'var(--text)', marginBottom: '10px' } }, title),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } }, ...items.map(t => h('span', {}, t)))
    );
    return h('footer', {
      style: {
        borderTop: '1px solid var(--line)', padding: '32px', marginTop: '32px',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px',
        fontSize: '12px', color: 'var(--text-muted)',
      }
    },
      h('div', {},
        h('div', { style: { fontSize: '14px', fontWeight: '600', color: 'var(--text)', marginBottom: '10px' } }, 'TumBAS'),
        h('div', {}, 'Perangkat untuk kerja yang presisi. Sejak 2018.'),
        h('div', { style: { marginTop: '12px', fontSize: '11px', opacity: '0.6' } }, '© 2026 TumBAS')
      ),
      col('Belanja', ['Katalog', 'Brand', 'Penawaran']),
      col('Bantuan', ['Kontak', 'Pengiriman', 'Pengembalian']),
      col('Perusahaan', ['Tentang', 'Karir', 'Privasi']),
    );
  }

  // ─── Product Card ───────────────────────────────────────
  function productCard(p, state, compact = false) {
    return h('div', {
      class: 'pcard',
      onclick: () => state.nav('product', p.id),
    },
      h('div', {
        class: 'imgph',
        style: { aspectRatio: '1', position: 'relative', borderBottom: '1px solid var(--line)' }
      },
        productVis(p.shape, 'var(--text)'),
        p.badge ? h('span', { class: 'badge', style: { position: 'absolute', top: '10px', left: '10px' } }, p.badge) : null,
        p.stock === 0 ? h('span', { class: 'badge', style: { position: 'absolute', top: '10px', left: '10px', background: 'var(--text-faint)' } }, 'HABIS') : null,
        h('span', {
          class: 'mono',
          style: { position: 'absolute', bottom: '8px', right: '10px', fontSize: '9px', color: 'var(--text-faint)', letterSpacing: '0.05em' }
        }, p.sku)
      ),
      h('div', { style: { padding: compact ? '12px' : '14px', display: 'flex', flexDirection: 'column', gap: '6px' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' } },
          h('span', { class: 'mono', style: { fontSize: '10px', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' } }, p.brand),
          stars(p.rating, 10)
        ),
        h('div', { style: { fontSize: compact ? '13px' : '14px', fontWeight: '500', lineHeight: '1.3' } }, p.name),
        h('div', { style: { display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' } },
          h('span', { style: { fontWeight: '600', fontSize: compact ? '13px' : '14px' } }, formatRupiah(p.price)),
          p.oldPrice ? h('span', { style: { fontSize: '11px', color: 'var(--text-faint)', textDecoration: 'line-through' } }, formatRupiah(p.oldPrice)) : null,
        )
      )
    );
  }

  // ─── Catalog Screen ─────────────────────────────────────
  function renderCatalog(state) {
    const isMobile = state.frame === 'mobile';
    if (!state.filters) state.filters = { category: 'all', brands: [], colors: [], sizes: [], rating: 0, inStock: false, priceMin: 0, priceMax: 30000000 };
    if (!state.sort) state.sort = 'featured';
    const f = state.filters;

    let list = PRODUCTS.filter(p => {
      if (f.category !== 'all' && p.category !== f.category) return false;
      if (f.brands.length && !f.brands.includes(p.brand)) return false;
      if (f.rating && p.rating < f.rating) return false;
      if (f.inStock && p.stock === 0) return false;
      if (p.price < f.priceMin || p.price > f.priceMax) return false;
      if (f.colors.length && !f.colors.some(c => p.colors.map(x => x.hex).includes(c))) return false;
      if (f.sizes.length && (!p.sizes || !p.sizes.some(s => f.sizes.includes(s)))) return false;
      return true;
    });
    switch (state.sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'newest': list = [...list].reverse(); break;
    }

    const allColors = Array.from(new Set(PRODUCTS.flatMap(p => p.colors.map(c => c.hex))));
    const allSizes = Array.from(new Set(PRODUCTS.flatMap(p => p.sizes || [])));

    const filterGroup = (title, content) => h('div', {},
      h('div', { style: { fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px', color: 'var(--text-muted)' } }, title),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } }, content)
    );

    const filtersPanel = () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '13px' } },
      filterGroup('Kategori', CATEGORIES.map(c =>
        h('button', {
          onclick: () => { f.category = c.id; state.rerender(); },
          style: {
            display: 'flex', justifyContent: 'space-between', padding: '6px 0',
            color: f.category === c.id ? 'var(--text)' : 'var(--text-muted)',
            fontWeight: f.category === c.id ? '500' : '400',
          }
        },
          h('span', {}, c.label),
          h('span', { class: 'mono', style: { fontSize: '11px', color: 'var(--text-faint)' } },
            String(c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === c.id).length))
        )
      )),
      filterGroup('Harga', [
        h('div', { style: { display: 'flex', gap: '6px', marginBottom: '8px' } },
          h('div', { class: 'field mono', style: { padding: '6px 8px', fontSize: '11px' } },
            h('input', { value: f.priceMin.toLocaleString('id-ID'), oninput: (e) => { f.priceMin = Number(e.target.value.replace(/\D/g, '')) || 0; state.rerender(); } })),
          h('div', { class: 'field mono', style: { padding: '6px 8px', fontSize: '11px' } },
            h('input', { value: f.priceMax.toLocaleString('id-ID'), oninput: (e) => { f.priceMax = Number(e.target.value.replace(/\D/g, '')) || 0; state.rerender(); } })),
        ),
        h('input', {
          type: 'range', min: '0', max: '30000000', step: '100000', value: String(f.priceMax),
          oninput: (e) => { f.priceMax = Number(e.target.value); state.rerender(); }, style: { width: '100%' }
        }),
      ]),
      filterGroup('Brand', BRANDS.map(b =>
        h('label', { style: { display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', cursor: 'pointer' } },
          h('span', {
            class: `check ${f.brands.includes(b) ? 'on' : ''}`,
            onclick: () => { f.brands = f.brands.includes(b) ? f.brands.filter(x => x !== b) : [...f.brands, b]; state.rerender(); }
          }),
          h('span', {}, b)
        )
      )),
      filterGroup('Warna', [
        h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } }, allColors.map(c =>
          h('button', {
            class: `swatch ${f.colors.includes(c) ? 'on' : ''}`,
            style: { background: c },
            onclick: () => { f.colors = f.colors.includes(c) ? f.colors.filter(x => x !== c) : [...f.colors, c]; state.rerender(); }
          })
        ))
      ]),
      filterGroup('Ukuran', [
        h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px' } }, allSizes.map(s =>
          h('button', {
            class: `size-btn ${f.sizes.includes(s) ? 'on' : ''}`,
            onclick: () => { f.sizes = f.sizes.includes(s) ? f.sizes.filter(x => x !== s) : [...f.sizes, s]; state.rerender(); }
          }, s)
        ))
      ]),
      filterGroup('Rating', [4, 3, 2, 1].map(r =>
        h('button', {
          onclick: () => { f.rating = f.rating === r ? 0 : r; state.rerender(); },
          style: { display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }
        },
          h('span', { class: `radio ${f.rating === r ? 'on' : ''}` }),
          stars(r, 11),
          h('span', { style: { color: 'var(--text-muted)' } }, '& ke atas')
        )
      )),
      filterGroup('Stok', [
        h('label', { style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' } },
          h('span', {
            class: `check ${f.inStock ? 'on' : ''}`,
            onclick: () => { f.inStock = !f.inStock; state.rerender(); }
          }),
          'Hanya yang tersedia'
        )
      ]),
      h('button', {
        class: 'btn btn-secondary btn-sm',
        style: { alignSelf: 'flex-start' },
        onclick: () => { state.filters = { category: 'all', brands: [], colors: [], sizes: [], rating: 0, inStock: false, priceMin: 0, priceMax: 30000000 }; state.rerender(); }
      }, 'Atur ulang filter')
    );

    const sortDropdown = () => {
      const cur = SORT_OPTIONS.find(o => o.id === state.sort);
      const wrap = h('div', { style: { position: 'relative' } });
      let open = false;
      const btn = h('button', { class: 'btn btn-secondary btn-sm' }, `Urutkan: ${cur.label}`, icon('chevronDown', 12));
      let menu;
      const render = () => {
        if (menu) menu.remove();
        if (!open) return;
        menu = h('div', {
          class: 'card',
          style: { position: 'absolute', top: '100%', right: '0', marginTop: '4px', minWidth: '200px', padding: '4px', zIndex: '20', boxShadow: 'var(--shadow-md)' }
        }, ...SORT_OPTIONS.map(o => h('button', {
          onclick: () => { state.sort = o.id; open = false; state.rerender(); },
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 10px', fontSize: '13px', width: '100%', borderRadius: '3px',
            background: state.sort === o.id ? 'var(--bg-sunken)' : 'transparent',
          }
        }, h('span', {}, o.label), state.sort === o.id ? icon('check', 12) : null)));
        wrap.appendChild(menu);
      };
      btn.onclick = (e) => { e.stopPropagation(); open = !open; render(); };
      document.addEventListener('click', () => { if (open) { open = false; render(); } });
      wrap.appendChild(btn);
      return wrap;
    };

    return h('div', {},
      h('section', { style: { borderBottom: '1px solid var(--line)', padding: isMobile ? '24px 16px 20px' : '40px 32px 32px' } },
        h('div', { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' } },
          h('div', {},
            h('div', { class: 'mono', style: { fontSize: '10px', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' } }, 'CATALOG / 2026.04'),
            h('h1', { style: { fontSize: isMobile ? '28px' : '44px', fontWeight: '600', letterSpacing: '-0.03em', lineHeight: '1.05', margin: '0' }, html: 'Perangkat untuk<br/>kerja yang presisi.' }),
          ),
          h('div', { class: 'mono', style: { fontSize: '11px', color: 'var(--text-muted)', maxWidth: '280px' } },
            h('span', { style: { color: 'var(--text)' } }, String(list.length)),
            ` dari ${PRODUCTS.length} produk · diperbarui setiap minggu`)
        )
      ),
      h('section', {
        style: {
          borderBottom: '1px solid var(--line)',
          padding: isMobile ? '12px 16px' : '14px 32px',
          display: 'flex', alignItems: 'center', gap: '12px',
          position: 'sticky', top: isMobile ? '56px' : '64px', background: 'var(--bg)', zIndex: '10',
        }
      },
        isMobile
          ? [
            h('button', {
              class: 'btn btn-secondary btn-sm', style: { flex: '1' },
              onclick: () => { state.showFilters = true; state.rerender(); }
            }, icon('filter', 14), ' Filter'),
            h('button', {
              class: 'btn btn-secondary btn-sm', style: { flex: '1' },
              onclick: () => { state.showSort = true; state.rerender(); }
            }, icon('sort', 14), ' Urutkan'),
          ]
          : [
            h('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } },
              ...CATEGORIES.slice(0, 6).map(c => h('button', {
                class: 'chip',
                style: {
                  background: f.category === c.id ? 'var(--text)' : 'var(--tag-bg)',
                  color: f.category === c.id ? 'var(--bg-elev)' : 'var(--text)',
                  cursor: 'pointer', padding: '6px 12px', fontSize: '12px',
                },
                onclick: () => { f.category = c.id; state.rerender(); }
              }, c.label))
            ),
            h('div', { style: { flex: '1' } }),
            h('span', { class: 'mono', style: { fontSize: '11px', color: 'var(--text-muted)' } }, `${list.length} hasil`),
            sortDropdown(),
          ]
      ),
      h('div', { style: { display: 'flex', gap: '0' } },
        !isMobile ? h('aside', { style: { width: '240px', padding: '24px 24px 40px 32px', borderRight: '1px solid var(--line)', flexShrink: '0' } }, filtersPanel()) : null,
        h('main', { style: { flex: '1', padding: isMobile ? '16px' : '24px 32px 40px' } },
          list.length === 0
            ? h('div', { style: { textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' } },
              h('div', { style: { fontSize: '16px', marginBottom: '8px' } }, 'Tidak ada produk yang cocok'),
              h('div', { style: { fontSize: '13px' } }, 'Coba sesuaikan filter Anda'))
            : h('div', {
              style: {
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: isMobile ? '12px' : '20px',
              }
            }, ...list.map(p => productCard(p, state, isMobile)))
        )
      ),
      isMobile && state.showFilters ? sheet('Filter', filtersPanel(), () => { state.showFilters = false; state.rerender(); }) : null,
      isMobile && state.showSort ? sheet('Urutkan',
        h('div', {}, ...SORT_OPTIONS.map(o => h('button', {
          onclick: () => { state.sort = o.id; state.showSort = false; state.rerender(); },
          style: { padding: '14px 0', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', width: '100%' }
        }, h('span', {}, o.label), state.sort === o.id ? icon('check', 16) : null))),
        () => { state.showSort = false; state.rerender(); }) : null,
    );
  }

  function sheet(title, content, onClose) {
    const overlay = h('div', {
      style: { position: 'absolute', inset: '0', background: 'rgba(0,0,0,0.4)', zIndex: '100', display: 'flex', alignItems: 'flex-end' },
      onclick: onClose,
    });
    const inner = h('div', {
      onclick: (e) => e.stopPropagation(),
      style: {
        background: 'var(--bg)', width: '100%', maxHeight: '80%', overflowY: 'auto',
        borderRadius: '12px 12px 0 0', padding: '20px', animation: 'slideUp .25s ease',
      }
    },
      h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' } },
        h('div', { style: { fontSize: '16px', fontWeight: '600' } }, title),
        h('button', { onclick: onClose }, icon('x', 18))
      ),
      content
    );
    overlay.appendChild(inner);
    return overlay;
  }

  window.TumBAS_SCREENS_1 = { renderHeader, renderFooter, renderCatalog };
})();
