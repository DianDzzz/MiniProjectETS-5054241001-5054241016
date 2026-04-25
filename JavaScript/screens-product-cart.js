// screens-product-cart.js — product detail and cart
'use strict';

(function() {
const { PRODUCTS: PRODS2, CATEGORIES: CATS2, formatRupiah: fmt2 } = window.NIMBUS_DATA;
const { h: h2, icon: icon2, stars: stars2, productVis: pvis2 } = window.NIMBUS_HELPERS;

function renderProduct(state) {
  const isMobile = state.frame === 'mobile';
  const p = PRODS2.find(x => x.id === state.route.param) || PRODS2[0];
  if (!state.pview || state.pview.id !== p.id) {
    state.pview = { id: p.id, color: p.colors[0].hex, size: p.sizes ? p.sizes[0] : null, qty: 1, tab: 'desc' };
  }
  const v = state.pview;

  const handleAdd = () => {
    state.addToCart({
      id: p.id, productId: p.id, name: p.name, brand: p.brand,
      price: p.price, color: v.color, size: v.size, qty: v.qty, shape: p.shape,
    });
    state.nav('cart');
  };

  const breadcrumb = h2('div', { class: 'mono', style: { fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', gap: '6px' } },
    h2('button', { onclick: () => state.nav('catalog'), style: { color: 'var(--text-muted)' } }, 'Katalog'),
    h2('span', {}, '/'),
    h2('span', {}, CATS2.find(c => c.id === p.category)?.label),
    h2('span', {}, '/'),
    h2('span', { style: { color: 'var(--text)' } }, p.name)
  );

  const imageBlock = h2('div', {},
    h2('div', { class: 'imgph card', style: { aspectRatio: '1', position: 'relative', overflow: 'hidden' } },
      pvis2(p.shape, v.color),
      h2('span', { class: 'mono', style: { position: 'absolute', top: '12px', left: '12px', fontSize: '10px', color: 'var(--text-faint)' } }, `${p.sku} · 01/04`)
    ),
    !isMobile ? h2('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '12px' } },
      ...[0,1,2,3].map(i => h2('div', {
        class: 'imgph card',
        style: { aspectRatio: '1', position: 'relative', borderColor: i === 0 ? 'var(--text)' : 'var(--line)', cursor: 'pointer' }
      }, pvis2(p.shape, v.color)))
    ) : null
  );

  const colorGroup = h2('div', {},
    h2('div', { class: 'field-label', style: { display: 'flex', justifyContent: 'space-between' } },
      h2('span', {}, 'Warna'),
      h2('span', { style: { color: 'var(--text)', textTransform: 'none', letterSpacing: '0', fontWeight: '400' } },
        p.colors.find(c => c.hex === v.color)?.name)
    ),
    h2('div', { style: { display: 'flex', gap: '10px' } },
      ...p.colors.map(c => h2('button', {
        class: `swatch ${v.color === c.hex ? 'on' : ''}`,
        style: { background: c.hex, width: '28px', height: '28px' },
        title: c.name,
        onclick: () => { v.color = c.hex; state.rerender(); }
      }))
    )
  );

  const sizeGroup = p.sizes ? h2('div', {},
    h2('div', { class: 'field-label' }, 'Konfigurasi'),
    h2('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
      ...p.sizes.map(s => h2('button', {
        onclick: () => { v.size = s; state.rerender(); },
        style: {
          padding: '10px 12px', border: '1px solid',
          borderColor: v.size === s ? 'var(--text)' : 'var(--line-strong)',
          borderRadius: '4px', fontSize: '13px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }
      }, h2('span', { class: `radio ${v.size === s ? 'on' : ''}` }), h2('span', {}, s)))
    )
  ) : null;

  const qtyGroup = h2('div', {},
    h2('div', { class: 'field-label' }, 'Kuantitas'),
    h2('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
      h2('div', { class: 'qty-box' },
        h2('button', { onclick: () => { v.qty = Math.max(1, v.qty - 1); state.rerender(); } }, icon2('minus', 12)),
        h2('span', { class: 'v' }, String(v.qty)),
        h2('button', { onclick: () => { v.qty = Math.min(p.stock || 99, v.qty + 1); state.rerender(); } }, icon2('plus', 12)),
      ),
      h2('span', { class: 'mono', style: { fontSize: '11px', color: 'var(--text-muted)' } }, `maks. ${p.stock || '—'}`)
    )
  );

  const trustRow = h2('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '4px' } },
    ...[
      ['truck', 'Pengiriman gratis'],
      ['shield', 'Garansi 2 tahun'],
      ['refresh', 'Retur 30 hari'],
    ].map(([i, l]) => h2('div', {
      style: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', border: '1px solid var(--line)', borderRadius: '4px', fontSize: '11px' }
    }, icon2(i, 14), h2('span', {}, l)))
  );

  const infoBlock = h2('div', { style: { display: 'flex', flexDirection: 'column', gap: '18px' } },
    h2('div', {},
      h2('div', { class: 'mono', style: { fontSize: '10px', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' } },
        `${p.brand} · ${p.sku}`),
      h2('h1', { style: { fontSize: isMobile ? '24px' : '32px', fontWeight: '600', letterSpacing: '-0.02em', margin: '0', lineHeight: '1.1' } }, p.name),
      h2('div', { style: { marginTop: '8px', display: 'flex', alignItems: 'center', gap: '12px' } },
        stars2(p.rating, 13, true, p.reviews),
        h2('span', { style: { fontSize: '12px', color: 'var(--text-muted)' } }, '·'),
        h2('span', { style: { fontSize: '12px', color: p.stock > 5 ? 'var(--positive)' : (p.stock > 0 ? 'var(--warn)' : 'var(--danger)') } },
          p.stock > 0 ? `${p.stock} stok tersedia` : 'Stok habis')
      )
    ),
    h2('div', { style: { display: 'flex', alignItems: 'baseline', gap: '12px' } },
      h2('span', { style: { fontSize: '28px', fontWeight: '600', letterSpacing: '-0.02em' } }, fmt2(p.price)),
      ...(p.oldPrice ? [
        h2('span', { style: { fontSize: '14px', color: 'var(--text-faint)', textDecoration: 'line-through' } }, fmt2(p.oldPrice)),
        h2('span', { class: 'chip', style: { background: 'var(--positive)', color: 'white' } },
          `-${Math.round((1 - p.price / p.oldPrice) * 100)}%`)
      ] : [])
    ),
    h2('div', { style: { fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.55' } }, p.summary),
    h2('hr', { class: 'hr' }),
    colorGroup,
    sizeGroup,
    qtyGroup,
    h2('div', { style: { display: 'flex', gap: '10px', marginTop: '4px' } },
      h2('button', {
        onclick: handleAdd,
        disabled: p.stock === 0,
        class: 'btn btn-primary btn-lg',
        style: { flex: '1', opacity: p.stock === 0 ? '0.5' : '1' }
      }, icon2('cart', 14), ` ${p.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}`),
      h2('button', { class: 'btn btn-secondary btn-lg', style: { padding: '14px' } }, icon2('heart', 16))
    ),
    trustRow
  );

  const tabs = h2('div', { style: { marginTop: '48px', borderTop: '1px solid var(--line)', paddingTop: '24px' } },
    h2('div', { style: { display: 'flex', gap: '24px', borderBottom: '1px solid var(--line)', marginBottom: '24px' } },
      ...[
        { id: 'desc', l: 'Deskripsi' },
        { id: 'specs', l: 'Spesifikasi' },
        { id: 'reviews', l: `Ulasan (${p.reviews})` },
      ].map(t => h2('button', {
        class: `tab ${v.tab === t.id ? 'active' : ''}`,
        onclick: () => { v.tab = t.id; state.rerender(); }
      }, t.l))
    ),
    v.tab === 'desc' ? h2('div', { style: { maxWidth: '720px', fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' } }, p.desc) : null,
    v.tab === 'specs' ? h2('div', { style: { maxWidth: '600px' } },
      ...p.specs.map(([k, val]) => h2('div', {
        style: { display: 'grid', gridTemplateColumns: '180px 1fr', padding: '12px 0', borderBottom: '1px solid var(--line)', fontSize: '13px' }
      }, h2('span', { style: { color: 'var(--text-muted)' } }, k), h2('span', { class: 'mono', style: { fontSize: '12px' } }, val)))
    ) : null,
    v.tab === 'reviews' ? h2('div', { style: { maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '16px' } },
      ...[
        { name: 'Andi P.', rating: 5, date: '12 Apr 2026', text: 'Build quality luar biasa. Worth setiap rupiah.' },
        { name: 'Sari W.', rating: 4, date: '8 Apr 2026', text: 'Bagus, tapi pengiriman agak lambat.' },
        { name: 'Budi T.', rating: 5, date: '2 Apr 2026', text: 'Sudah pakai 3 minggu, tidak ada keluhan.' },
      ].map(r => h2('div', { style: { paddingBottom: '16px', borderBottom: '1px solid var(--line)' } },
        h2('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' } },
          h2('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            h2('span', { style: { fontWeight: '500', fontSize: '13px' } }, r.name),
            stars2(r.rating, 11)
          ),
          h2('span', { class: 'mono', style: { fontSize: '11px', color: 'var(--text-faint)' } }, r.date)
        ),
        h2('div', { style: { fontSize: '13px', color: 'var(--text-muted)' } }, r.text)
      ))
    ) : null
  );

  return h2('div', { style: { padding: isMobile ? '16px' : '32px 32px 60px' } },
    breadcrumb,
    h2('div', { style: { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? '24px' : '48px' } },
      imageBlock, infoBlock
    ),
    tabs
  );
}

function rowKV(k, v) {
  return h2('div', { style: { display: 'flex', justifyContent: 'space-between' } },
    h2('span', { style: { color: 'var(--text-muted)' } }, k),
    h2('span', { class: 'mono' }, v)
  );
}

function renderCart(state) {
  const isMobile = state.frame === 'mobile';
  const cart = state.cart;
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? (subtotal > 5000000 ? 0 : 35000) : 0;
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return h2('div', { style: { padding: '60px 20px', textAlign: 'center' } },
      h2('div', { class: 'imgph', style: { width: '80px', height: '80px', margin: '0 auto 24px', borderRadius: '8px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        icon2('cart', 32, 1.2)),
      h2('h2', { style: { fontSize: '22px', fontWeight: '600', margin: '0 0 8px', letterSpacing: '-0.02em' } }, 'Keranjang Anda kosong'),
      h2('div', { style: { fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' } }, 'Mulai jelajahi produk dan tambahkan ke keranjang.'),
      h2('button', { class: 'btn btn-primary', onclick: () => state.nav('catalog') }, 'Jelajahi Katalog ', icon2('arrow', 14))
    );
  }

  const items = h2('div', { class: 'card', style: { overflow: 'hidden' } },
    ...cart.map((it, idx) => h2('div', {
      style: {
        display: 'flex', gap: isMobile ? '10px' : '16px', padding: '16px',
        borderBottom: idx < cart.length - 1 ? '1px solid var(--line)' : 'none',
      }
    },
      h2('div', { class: 'imgph', style: { width: isMobile ? '70px' : '90px', height: isMobile ? '70px' : '90px', borderRadius: '4px', position: 'relative', flexShrink: '0' } },
        pvis2(it.shape, it.color)),
      h2('div', { style: { flex: '1', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' } },
        h2('div', { class: 'mono', style: { fontSize: '10px', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' } }, it.brand),
        h2('div', { style: { fontSize: '14px', fontWeight: '500' } }, it.name),
        h2('div', { style: { fontSize: '11px', color: 'var(--text-muted)', display: 'flex', gap: '10px', alignItems: 'center' } },
          h2('span', { style: { display: 'inline-flex', alignItems: 'center', gap: '4px' } },
            'Warna:',
            h2('span', { style: { display: 'inline-block', width: '10px', height: '10px', background: it.color, border: '1px solid var(--line)', borderRadius: '50%' } })),
          it.size ? h2('span', {}, `· ${it.size}`) : null
        ),
        h2('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', gap: '10px', flexWrap: 'wrap' } },
          h2('div', { class: 'qty-box' },
            h2('button', { style: { padding: '4px 8px' }, onclick: () => { state.cart[idx].qty = Math.max(1, it.qty - 1); state.persistCart(); state.rerender(); } }, icon2('minus', 10)),
            h2('span', { class: 'v', style: { padding: '4px 10px', fontSize: '12px' } }, String(it.qty)),
            h2('button', { style: { padding: '4px 8px' }, onclick: () => { state.cart[idx].qty = it.qty + 1; state.persistCart(); state.rerender(); } }, icon2('plus', 10))
          ),
          h2('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
            h2('span', { style: { fontSize: '14px', fontWeight: '600' } }, fmt2(it.price * it.qty)),
            h2('button', { onclick: () => { state.cart.splice(idx, 1); state.persistCart(); state.rerender(); }, style: { color: 'var(--text-muted)', padding: '4px' }, title: 'Hapus' }, icon2('x', 14))
          )
        )
      )
    ))
  );

  const summary = h2('div', { class: 'card', style: { padding: '20px', position: isMobile ? 'static' : 'sticky', top: '80px' } },
    h2('div', { style: { fontSize: '14px', fontWeight: '600', marginBottom: '16px' } }, 'Ringkasan Pesanan'),
    h2('div', { style: { display: 'flex', gap: '8px', marginBottom: '16px' } },
      h2('div', { class: 'field', style: { padding: '8px 10px', fontSize: '12px' } }, h2('input', { placeholder: 'Kode promo' })),
      h2('button', { class: 'btn btn-secondary btn-sm' }, 'Pakai')
    ),
    h2('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', marginBottom: '12px' } },
      rowKV('Subtotal', fmt2(subtotal)),
      rowKV('Pengiriman', shipping === 0 ? 'Gratis' : fmt2(shipping)),
      rowKV('PPN (11%)', fmt2(tax))
    ),
    h2('hr', { class: 'hr', style: { marginBottom: '12px' } }),
    h2('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' } },
      h2('span', { style: { fontSize: '14px', fontWeight: '600' } }, 'Total'),
      h2('span', { style: { fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em' } }, fmt2(total))
    ),
    h2('button', { class: 'btn btn-primary btn-block btn-lg', onclick: () => state.nav('checkout') },
      'Lanjut ke Checkout ', icon2('arrow', 14)),
    h2('div', { style: { fontSize: '11px', color: 'var(--text-faint)', textAlign: 'center', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' } },
      icon2('lock', 11), ' Pembayaran aman dengan enkripsi SSL')
  );

  return h2('div', { style: { padding: isMobile ? '16px' : '32px 32px 60px' } },
    h2('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '24px' } },
      h2('h1', { style: { fontSize: isMobile ? '24px' : '32px', fontWeight: '600', letterSpacing: '-0.02em', margin: '0' } }, 'Keranjang'),
      h2('span', { class: 'mono', style: { fontSize: '12px', color: 'var(--text-muted)' } },
        `${cart.reduce((s, i) => s + i.qty, 0)} item`)
    ),
    h2('div', { style: { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: isMobile ? '24px' : '32px' } },
      h2('div', {}, items,
        h2('button', { class: 'btn btn-ghost btn-sm', style: { marginTop: '16px', paddingLeft: '0' }, onclick: () => state.nav('catalog') },
          icon2('chevronLeft', 12), ' Lanjutkan belanja')
      ),
      h2('aside', {}, summary)
    )
  );
}

window.NIMBUS_SCREENS_2 = { renderProduct, renderCart, rowKV };
})();
