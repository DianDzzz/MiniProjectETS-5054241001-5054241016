// screens-checkout-auth.js — checkout, login, confirmation
'use strict';

(function() {
const { formatRupiah: fmt3 } = window.TumBAS_DATA;
const { h: h3, icon: icon3 } = window.TumBAS_HELPERS;

function field(label, attrs = {}, hint = null) {
  return h3('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
    h3('label', { class: 'field-label' }, label),
    h3('div', { class: 'field', style: { padding: '10px 12px' } },
      h3('input', { style: { fontSize: '13px', width: '100%' }, ...attrs })),
    hint ? h3('div', { style: { fontSize: '11px', color: 'var(--text-faint)' } }, hint) : null
  );
}

function renderCheckout(state) {
  const isMobile = state.frame === 'mobile';
  if (!state.checkout) state.checkout = { step: 1, shipping: { name: 'Andi Pratama', email: 'andi@example.com', phone: '+62 812-3456-7890', address: 'Jl. Sudirman No. 42, Apt 5B', city: 'Jakarta Selatan', postal: '12190', method: 'reg' }, payment: { method: 'card', card: '4242 4242 4242 4242', exp: '12/28', cvv: '•••', name: 'ANDI PRATAMA' } };
  const co = state.checkout;
  const cart = state.cart;
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipMethod = co.shipping.method;
  const shipping = subtotal === 0 ? 0 : (shipMethod === 'express' ? 75000 : (subtotal > 5000000 ? 0 : 35000));
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + shipping + tax;

  const stepper = h3('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', justifyContent: 'center', flexWrap: 'wrap' } },
    ...['Pengiriman', 'Pembayaran', 'Tinjauan'].map((s, i) => {
      const n = i + 1;
      const done = co.step > n;
      const active = co.step === n;
      return h3('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
        h3('div', {
          style: {
            width: '24px', height: '24px', borderRadius: '50%',
            border: '1px solid', borderColor: active || done ? 'var(--text)' : 'var(--line-strong)',
            background: done ? 'var(--text)' : 'transparent',
            color: done ? 'var(--bg)' : (active ? 'var(--text)' : 'var(--text-faint)'),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: '600', fontFamily: 'JetBrains Mono, monospace',
          }
        }, done ? icon3('check', 12) : String(n)),
        h3('span', { style: { fontSize: '12px', color: active ? 'var(--text)' : 'var(--text-muted)', fontWeight: active ? '500' : '400' } }, s),
        i < 2 ? h3('div', { style: { width: isMobile ? '20px' : '40px', height: '1px', background: 'var(--line-strong)', margin: '0 4px' } }) : null
      );
    })
  );

  const shipStep = h3('div', { style: { display: 'flex', flexDirection: 'column', gap: '20px' } },
    h3('div', { style: { fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' } }, 'Informasi Kontak'),
    h3('div', { style: { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' } },
      field('Nama lengkap', { value: co.shipping.name, oninput: (e) => co.shipping.name = e.target.value }),
      field('Nomor telepon', { value: co.shipping.phone, oninput: (e) => co.shipping.phone = e.target.value }),
    ),
    field('Email', { value: co.shipping.email, type: 'email', oninput: (e) => co.shipping.email = e.target.value }),
    h3('div', { style: { fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginTop: '8px' } }, 'Alamat Pengiriman'),
    field('Alamat', { value: co.shipping.address, oninput: (e) => co.shipping.address = e.target.value }),
    h3('div', { style: { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '12px' } },
      field('Kota', { value: co.shipping.city, oninput: (e) => co.shipping.city = e.target.value }),
      field('Kode Pos', { value: co.shipping.postal, oninput: (e) => co.shipping.postal = e.target.value }),
    ),
    h3('div', { style: { fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginTop: '8px' } }, 'Metode Pengiriman'),
    h3('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
      ...[
        { id: 'reg', l: 'Reguler (3-5 hari)', p: subtotal > 5000000 ? 'Gratis' : fmt3(35000) },
        { id: 'express', l: 'Express (1-2 hari)', p: fmt3(75000) },
      ].map(o => h3('label', {
        style: {
          padding: '14px 16px', border: '1px solid',
          borderColor: shipMethod === o.id ? 'var(--text)' : 'var(--line-strong)',
          borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
        },
        onclick: () => { co.shipping.method = o.id; state.rerender(); }
      },
        h3('span', { class: `radio ${shipMethod === o.id ? 'on' : ''}` }),
        h3('div', { style: { flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          h3('span', { style: { fontSize: '13px' } }, o.l),
          h3('span', { class: 'mono', style: { fontSize: '12px', fontWeight: '500' } }, o.p)
        )
      ))
    )
  );

  const payStep = h3('div', { style: { display: 'flex', flexDirection: 'column', gap: '20px' } },
    h3('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' } },
      ...[
        { id: 'card', l: 'Kartu' },
        { id: 'va', l: 'Virtual Account' },
        { id: 'qris', l: 'QRIS' },
      ].map(o => h3('button', {
        onclick: () => { co.payment.method = o.id; state.rerender(); },
        style: {
          padding: '14px', border: '1px solid',
          borderColor: co.payment.method === o.id ? 'var(--text)' : 'var(--line-strong)',
          borderRadius: '4px', fontSize: '12px', fontWeight: co.payment.method === o.id ? '500' : '400',
        }
      }, o.l))
    ),
    co.payment.method === 'card' ? h3('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
      field('Nomor Kartu', { value: co.payment.card, oninput: (e) => co.payment.card = e.target.value }),
      h3('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } },
        field('Kadaluarsa', { value: co.payment.exp, placeholder: 'MM/YY', oninput: (e) => co.payment.exp = e.target.value }),
        field('CVV', { value: co.payment.cvv, oninput: (e) => co.payment.cvv = e.target.value }),
      ),
      field('Nama di Kartu', { value: co.payment.name, oninput: (e) => co.payment.name = e.target.value }),
    ) : null,
    co.payment.method === 'va' ? h3('div', { class: 'card', style: { padding: '20px' } },
      h3('div', { style: { fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' } }, 'Pilih Bank'),
      h3('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' } },
        ...['BCA', 'Mandiri', 'BNI', 'BRI'].map(b => h3('button', { class: 'btn btn-secondary btn-sm', style: { justifyContent: 'flex-start' } }, b))
      )
    ) : null,
    co.payment.method === 'qris' ? h3('div', { class: 'card', style: { padding: '24px', textAlign: 'center' } },
      h3('div', { style: { width: '160px', height: '160px', margin: '0 auto', background: 'repeating-conic-gradient(var(--text) 0% 25%, transparent 0% 50%) 50% / 12px 12px', border: '1px solid var(--line-strong)' } }),
      h3('div', { class: 'mono', style: { fontSize: '11px', marginTop: '12px', color: 'var(--text-muted)' } }, 'Scan dengan aplikasi e-wallet Anda')
    ) : null,
  );

  const reviewStep = h3('div', { style: { display: 'flex', flexDirection: 'column', gap: '20px' } },
    h3('div', { class: 'card', style: { padding: '16px 20px' } },
      h3('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' } },
        h3('span', { style: { fontSize: '13px', fontWeight: '600' } }, 'Pengiriman'),
        h3('button', { onclick: () => { co.step = 1; state.rerender(); }, style: { fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'underline' } }, 'Ubah')
      ),
      h3('div', { style: { fontSize: '13px', lineHeight: '1.6', color: 'var(--text-muted)' } },
        h3('div', {}, co.shipping.name),
        h3('div', {}, co.shipping.address),
        h3('div', {}, `${co.shipping.city} ${co.shipping.postal}`),
        h3('div', { class: 'mono', style: { fontSize: '11px', marginTop: '4px' } }, `${co.shipping.email} · ${co.shipping.phone}`)
      )
    ),
    h3('div', { class: 'card', style: { padding: '16px 20px' } },
      h3('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' } },
        h3('span', { style: { fontSize: '13px', fontWeight: '600' } }, 'Pembayaran'),
        h3('button', { onclick: () => { co.step = 2; state.rerender(); }, style: { fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'underline' } }, 'Ubah')
      ),
      h3('div', { class: 'mono', style: { fontSize: '12px', color: 'var(--text-muted)' } },
        co.payment.method === 'card' ? `Kartu •••• ${co.payment.card.slice(-4)}` :
        co.payment.method === 'va' ? 'Virtual Account' : 'QRIS')
    ),
    h3('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px', color: 'var(--text-muted)', padding: '12px', background: 'var(--bg-sunken)', borderRadius: '4px' } },
      h3('span', { style: { flexShrink: '0', marginTop: '1px' } }, icon3('shield', 14)),
      h3('span', {}, 'Dengan menyelesaikan pesanan, Anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi TumBAS.')
    )
  );

  const summary = h3('div', { class: 'card', style: { padding: '20px', position: isMobile ? 'static' : 'sticky', top: '80px' } },
    h3('div', { style: { fontSize: '13px', fontWeight: '600', marginBottom: '16px' } }, 'Pesanan Anda'),
    h3('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px', maxHeight: '180px', overflowY: 'auto' } },
      ...cart.map(it => h3('div', { style: { display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12px' } },
        h3('div', { style: { width: '36px', height: '36px', background: 'var(--bg-sunken)', borderRadius: '3px', position: 'relative', flexShrink: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          h3('span', { class: 'mono', style: { fontSize: '10px', color: 'var(--text-faint)' } }, `×${it.qty}`)),
        h3('div', { style: { flex: '1', minWidth: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, it.name),
        h3('div', { class: 'mono', style: { fontSize: '11px', whiteSpace: 'nowrap' } }, fmt3(it.price * it.qty))
      ))
    ),
    h3('hr', { class: 'hr' }),
    h3('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', margin: '12px 0' } },
      h3('div', { style: { display: 'flex', justifyContent: 'space-between' } }, h3('span', { style: { color: 'var(--text-muted)' } }, 'Subtotal'), h3('span', { class: 'mono' }, fmt3(subtotal))),
      h3('div', { style: { display: 'flex', justifyContent: 'space-between' } }, h3('span', { style: { color: 'var(--text-muted)' } }, 'Pengiriman'), h3('span', { class: 'mono' }, shipping === 0 ? 'Gratis' : fmt3(shipping))),
      h3('div', { style: { display: 'flex', justifyContent: 'space-between' } }, h3('span', { style: { color: 'var(--text-muted)' } }, 'PPN'), h3('span', { class: 'mono' }, fmt3(tax))),
    ),
    h3('hr', { class: 'hr' }),
    h3('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '12px', marginBottom: '16px' } },
      h3('span', { style: { fontSize: '13px', fontWeight: '600' } }, 'Total'),
      h3('span', { style: { fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em' } }, fmt3(total))
    ),
    h3('div', { style: { display: 'flex', gap: '8px' } },
      co.step > 1 ? h3('button', { class: 'btn btn-secondary', onclick: () => { co.step--; state.rerender(); } }, icon3('chevronLeft', 12)) : null,
      h3('button', {
        class: 'btn btn-primary',
        style: { flex: '1' },
        onclick: () => {
          if (co.step < 3) { co.step++; state.rerender(); return; }
          state.lastOrder = { id: 'NMB-' + Math.floor(Math.random() * 900000 + 100000), total, items: [...cart], shipping: { ...co.shipping }, payment: { method: co.payment.method } };
          state.cart = []; state.persistCart();
          state.checkout = null;
          state.nav('confirm');
        }
      }, co.step < 3 ? 'Lanjutkan' : 'Bayar Sekarang ' , co.step < 3 ? icon3('arrow', 12) : null)
    )
  );

  return h3('div', { style: { padding: isMobile ? '16px' : '32px 32px 60px', maxWidth: '1100px', margin: '0 auto' } },
    h3('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px' } },
      h3('h1', { style: { fontSize: isMobile ? '22px' : '28px', fontWeight: '600', letterSpacing: '-0.02em', margin: '0' } }, 'Checkout'),
      h3('button', { onclick: () => state.nav('cart'), class: 'btn btn-ghost btn-sm' }, icon3('chevronLeft', 12), ' Kembali')
    ),
    stepper,
    h3('div', { style: { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: isMobile ? '24px' : '32px' } },
      h3('div', {}, co.step === 1 ? shipStep : (co.step === 2 ? payStep : reviewStep)),
      h3('aside', {}, summary)
    )
  );
}

function renderLogin(state) {
  const isMobile = state.frame === 'mobile';
  if (!state.auth) state.auth = { mode: 'login', email: '', password: '', name: '' };
  const a = state.auth;
  const isSignup = a.mode === 'signup';

  const card = h3('div', {
    class: 'card',
    style: { padding: isMobile ? '24px' : '36px', width: '100%', maxWidth: '420px' }
  },
    h3('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' } },
      h3('div', { style: { width: '20px', height: '20px', background: 'var(--text)', borderRadius: '2px', position: 'relative' } },
        h3('div', { style: { position: 'absolute', inset: '5px', background: 'var(--bg)', borderRadius: '1px' } })),
      h3('span', { style: { fontWeight: '600', letterSpacing: '-0.02em' } }, 'TumBAS')
    ),
    h3('h1', { style: { fontSize: '24px', fontWeight: '600', letterSpacing: '-0.02em', margin: '0 0 6px' } },
      isSignup ? 'Buat akun' : 'Masuk ke akun'),
    h3('div', { style: { fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' } },
      isSignup ? 'Bergabunglah dengan TumBAS dan akses penawaran eksklusif.' : 'Selamat datang kembali. Masukkan kredensial Anda.'),
    h3('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' } },
      isSignup ? field('Nama lengkap', { value: a.name, oninput: (e) => a.name = e.target.value }) : null,
      field('Email', { value: a.email, type: 'email', placeholder: 'anda@email.com', oninput: (e) => a.email = e.target.value }),
      field('Kata sandi', { value: a.password, type: 'password', placeholder: '••••••••', oninput: (e) => a.password = e.target.value }),
    ),
    !isSignup ? h3('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '12px' } },
      h3('label', { style: { display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' } },
        h3('span', { class: 'check' }), 'Ingat saya'),
      h3('button', { style: { color: 'var(--text-muted)', textDecoration: 'underline' } }, 'Lupa kata sandi?')
    ) : null,
    h3('button', {
      class: 'btn btn-primary btn-block btn-lg',
      onclick: () => { state.user = { name: a.name || 'Andi P.', email: a.email || 'andi@example.com' }; state.nav('catalog'); }
    }, isSignup ? 'Daftar' : 'Masuk'),
    h3('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' } },
      h3('hr', { class: 'hr', style: { flex: '1' } }),
      h3('span', { class: 'mono', style: { fontSize: '10px', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' } }, 'atau'),
      h3('hr', { class: 'hr', style: { flex: '1' } }),
    ),
    h3('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
      h3('button', { class: 'btn btn-secondary btn-block' }, 'Lanjutkan dengan Google'),
      h3('button', { class: 'btn btn-secondary btn-block' }, 'Lanjutkan dengan Apple'),
    ),
    h3('div', { style: { fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '24px' } },
      isSignup ? 'Sudah punya akun? ' : 'Belum punya akun? ',
      h3('button', { onclick: () => { a.mode = isSignup ? 'login' : 'signup'; state.rerender(); }, style: { color: 'var(--text)', fontWeight: '500', textDecoration: 'underline' } },
        isSignup ? 'Masuk' : 'Daftar')
    )
  );

  return h3('div', {
    style: {
      minHeight: 'calc(100% - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '24px 16px' : '60px 32px', background: 'var(--bg-sunken)',
    }
  }, card);
}

function renderConfirm(state) {
  const isMobile = state.frame === 'mobile';
  const o = state.lastOrder;
  if (!o) {
    return h3('div', { style: { padding: '60px 20px', textAlign: 'center' } },
      h3('div', { style: { fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' } }, 'Tidak ada pesanan untuk ditampilkan.'),
      h3('button', { class: 'btn btn-primary', onclick: () => state.nav('catalog') }, 'Ke Katalog'));
  }

  return h3('div', { style: { padding: isMobile ? '24px 16px 60px' : '40px 32px 80px', maxWidth: '720px', margin: '0 auto' } },
    h3('div', { style: { textAlign: 'center', marginBottom: '32px' } },
      h3('div', {
        style: {
          width: '64px', height: '64px', borderRadius: '50%', background: 'var(--positive)',
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }
      }, icon3('check', 28, 2.5)),
      h3('h1', { style: { fontSize: isMobile ? '24px' : '32px', fontWeight: '600', letterSpacing: '-0.02em', margin: '0 0 8px' } }, 'Pesanan diterima'),
      h3('div', { style: { fontSize: '13px', color: 'var(--text-muted)' } }, `Konfirmasi telah dikirim ke ${o.shipping.email}`),
      h3('div', { class: 'mono', style: { fontSize: '11px', color: 'var(--text-faint)', marginTop: '8px', letterSpacing: '0.1em' } }, `ORDER #${o.id}`)
    ),
    h3('div', { class: 'card', style: { padding: isMobile ? '20px' : '24px', marginBottom: '20px' } },
      h3('div', { style: { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' } },
        ...[
          ['Estimasi Tiba', '28 Apr — 30 Apr 2026'],
          ['Metode', o.payment.method === 'card' ? 'Kartu Kredit' : (o.payment.method === 'va' ? 'Virtual Account' : 'QRIS')],
          ['Tujuan', o.shipping.city],
        ].map(([k, v]) => h3('div', {},
          h3('div', { class: 'mono', style: { fontSize: '10px', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' } }, k),
          h3('div', { style: { fontSize: '13px', fontWeight: '500' } }, v)
        ))
      ),
      h3('hr', { class: 'hr', style: { marginBottom: '16px' } }),
      h3('div', { style: { fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '12px' } }, 'Item'),
      h3('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' } },
        ...o.items.map(it => h3('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '13px' } },
          h3('span', {}, `${it.name} ×${it.qty}`),
          h3('span', { class: 'mono' }, fmt3(it.price * it.qty))
        ))
      ),
      h3('hr', { class: 'hr', style: { marginBottom: '12px' } }),
      h3('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600' } },
        h3('span', {}, 'Total'),
        h3('span', { class: 'mono' }, fmt3(o.total))
      )
    ),
    h3('div', { style: { display: 'flex', gap: '10px', flexDirection: isMobile ? 'column' : 'row' } },
      h3('button', { class: 'btn btn-primary', style: { flex: '1' }, onclick: () => state.nav('catalog') }, 'Lanjutkan Belanja'),
      h3('button', { class: 'btn btn-secondary', style: { flex: '1' } }, icon3('truck', 14), ' Lacak Pesanan'),
    )
  );
}

window.TumBAS_SCREENS_3 = { renderCheckout, renderLogin, renderConfirm };
})();
