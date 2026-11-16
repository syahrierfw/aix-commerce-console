import './style.css';

const scenarios = {
  travel: {
    label: 'Thailand traveller bundle',
    eyebrow: 'LIVE JOURNEY · INDONESIA → THAILAND',
    title: 'AIX-TH-001',
    subtitle: 'Consented local eSIM + football experience bundle',
    status: 'Fulfilled',
    buyer: 'myIM3 / IM3 Travel',
    value: 'THB 699',
    unit: '1 governed travel transaction',
    outcome: 'AIS eSIM active · voucher issued',
    policy: 'ID-PDP-TRAVEL-1.0',
    contributors: [
      ['IOH', 'Travel-offer qualification', '1 authorised decision', 'THB 28'],
      ['AIS Thailand', '15GB eSIM fulfilment', '1 active eSIM', 'THB 525'],
      ['Bangkok Matchday', 'THB 300 digital credit', '1 voucher issued', 'THB 96'],
      ['AIX', 'Policy, order & receipt', '1 completed transaction', 'THB 50']
    ],
    events: [
      ['01', 'Consent verified', 'Purpose: Thailand travel personalisation', 'approved'],
      ['02', 'IOH local decision', '3 authorised offers returned; raw profile retained by IOH', 'approved'],
      ['03', 'AIS order accepted', 'AIX-TH-001 · eSIM profile provisioned', 'approved'],
      ['04', 'Native install confirmed', 'Device downloaded profile directly from AIS', 'approved'],
      ['05', 'Matchday credit issued', 'Voucher ID: BKK-FTB-7719', 'approved']
    ]
  },
  ato: {
    label: 'Account takeover prevention',
    eyebrow: 'LIVE DECISION · RISK BEFORE MONEY MOVES',
    title: 'AIX-RISK-084',
    subtitle: 'Governed account-recovery decision for a bank buyer',
    status: 'Step-up required',
    buyer: 'Bank / Fintech buyer',
    value: 'THB 12 per decision',
    unit: '1 governed risk decision',
    outcome: 'Step-up verification required before transfer',
    policy: 'ID-RISK-ATO-2.1',
    contributors: [
      ['IOH', 'Number verification', '1 verified session', 'THB 3'],
      ['Telkomsel', 'SIM-swap assurance', '1 assurance result', 'THB 3'],
      ['Bank', 'Local transaction risk model', '1 governed risk input', 'THB 2'],
      ['AIX', 'Policy, decision & receipt', '1 completed decision', 'THB 4']
    ],
    events: [
      ['01', 'Buyer intent received', 'Account recovery / high-value transfer', 'approved'],
      ['02', 'Consent and purpose verified', 'Risk prevention scope active', 'approved'],
      ['03', 'Sovereign signals invoked', 'Number Verify + SIM Swap; raw data stayed local', 'approved'],
      ['04', 'Decision issued', 'Step-up verification required', 'warning'],
      ['05', 'Decision receipt sealed', 'Evidence chain and attribution available', 'approved']
    ]
  }
};

let state = { scenario: 'travel', tab: 'overview', detail: false };
const icon = (name) => ({
  grid:'▦', exchange:'↔', trust:'✦', money:'◒', catalogue:'▤', activity:'◌', settings:'⚙', bell:'◔', search:'⌕', arrow:'→', check:'✓', lock:'⌾', download:'⇩', close:'×'
}[name] || '•');

function navItem(id, label, glyph) {
  return `<button class="nav-item ${state.tab === id ? 'active' : ''}" data-tab="${id}"><span>${icon(glyph)}</span>${label}</button>`;
}

function eventsHTML(s) {
  return s.events.map(([num, title, copy, tone]) => `<article class="event">
    <span class="event-number ${tone}">${num}</span><div><strong>${title}</strong><p>${copy}</p></div><span class="event-check ${tone}">${tone === 'warning' ? '!' : icon('check')}</span>
  </article>`).join('');
}

function contributorsHTML(s) {
  return s.contributors.map(([party, product, meter, amount]) => `<tr><td><b>${party}</b></td><td>${product}</td><td><span class="meter-pill">${meter}</span></td><td class="amount">${amount}</td></tr>`).join('');
}

function overview(s) {
  const successful = s.status === 'Fulfilled';
  return `<section class="exec-header"><div><p class="eyebrow">AIX · EXECUTIVE COMMAND CENTER</p><h1>${successful ? 'Transaction complete.' : 'Decision protected.'}</h1><p>${s.label} · ${s.title}</p></div><div class="scenario-box"><small>VIEW A DEMO JOURNEY</small><button class="select-scenario" id="scenario-toggle">${s.label}<span>⌄</span></button><div class="scenario-menu" id="scenario-menu"><button data-scenario="travel">Thailand traveller bundle</button><button data-scenario="ato">Account takeover prevention</button></div></div></section>
  <section class="executive-kpis"><article class="hero-kpi"><span class="dot ok"></span><div><small>DECISION STATUS</small><b>${s.status}</b><p>${s.outcome}</p></div></article><article><small>GOVERNANCE</small><b>Passed</b><span>Consent + policy checked</span></article><article><small>RAW DATA EXPOSED</small><b>0</b><span>Only approved outcomes returned</span></article><article><small>SETTLEMENT</small><b>${s.value}</b><span>${s.contributors.length} billable business events</span></article></section>
  ${journeyCard(s)}
  <section class="two-col executive-bottom"><div class="panel evidence-summary"><div class="panel-head"><div><p class="eyebrow">COMPLIANCE AT A GLANCE</p><h2>Evidence is complete</h2></div><button class="text-button" data-tab="trust">View trace ${icon('arrow')}</button></div><div class="evidence-checks"><p><i>✓</i><span>Customer consent verified for this purpose</span></p><p><i>✓</i><span>Each supplier response passed policy checks</span></p><p><i>✓</i><span>Raw profile, usage and location never left providers</span></p><p><i>✓</i><span>Decision receipt sealed and ready for audit</span></p></div></div>
  <div class="panel meter-summary"><div class="panel-head"><div><p class="eyebrow">COMMERCIAL AT A GLANCE</p><h2>What gets charged</h2></div><button class="text-button" data-tab="money">Open ledger ${icon('arrow')}</button></div><p class="meter-explainer">We charge for an accepted business result—not every technical API call.</p><div class="meter-count"><b>${s.contributors.length}</b><span>billable events</span><i>vs</i><b>11</b><span>technical API calls</span></div></div></section>`;
}

function journeyCard(s) {
  return `<section class="journey-card decision-card"><div class="journey-top"><div><p class="eyebrow">ONE GOVERNED JOURNEY</p><h2>What AIX did</h2><p>Five verified steps. No supplier’s raw customer data is stored in AIX.</p></div><button class="primary-button" id="open-trace">Open audit receipt ${icon('arrow')}</button></div><div class="simple-journey"><article><i>1</i><b>Check permission</b><span>Consent is valid for this purpose</span><small>Evidence logged</small></article><article><i>2</i><b>Request approved products</b><span>Providers execute locally</span><small>Raw data stays local</small></article><article><i>3</i><b>Receive permitted result</b><span>${s.scenario === 'travel' ? 'Eligible offer IDs returned' : 'Time-bounded assurance returned'}</span><small>Output logged</small></article><article><i>4</i><b>Complete outcome</b><span>${s.outcome}</span><small>Fulfilment logged</small></article><article><i>5</i><b>Rate & settle</b><span>${s.contributors.length} accepted business events</span><small>Ledger ready</small></article></div></section>`;
}

function transactions(s) {
  return `<section class="page-header compact"><div><p class="eyebrow">EXCHANGE / ORDERS</p><h1>Orders with <span>proof attached.</span></h1><p class="lede">Each record links consent, policy, supplier responses, fulfilment and settlement.</p></div><button class="primary-button" id="open-trace">Open ${s.title} ${icon('arrow')}</button></section><section class="panel table-panel"><div class="filter-row"><b>Recent governed transactions</b><span class="filter active">All</span><span class="filter">Travel</span><span class="filter">Risk</span><span class="filter">Fulfilled</span></div><table><thead><tr><th>Transaction</th><th>Buyer</th><th>Outcome</th><th>Policy</th><th>Value</th><th>Status</th></tr></thead><tbody><tr class="selected-row" id="open-trace"><td><b>${s.title}</b><small>${s.label}</small></td><td>${s.buyer}</td><td>${s.outcome}</td><td>${s.policy}</td><td class="amount">${s.value}</td><td><span class="status okay">${icon('check')} recorded</span></td></tr><tr><td><b>AIX-TH-000</b><small>Thailand traveller bundle</small></td><td>myIM3 / IM3 Travel</td><td>eSIM active</td><td>ID-PDP-TRAVEL-1.0</td><td class="amount">THB 499</td><td><span class="status okay">${icon('check')} settled</span></td></tr><tr><td><b>AIX-RISK-077</b><small>ATO prevention</small></td><td>Bank / Fintech buyer</td><td>approved</td><td>ID-RISK-ATO-2.1</td><td class="amount">THB 12</td><td><span class="status okay">${icon('check')} settled</span></td></tr></tbody></table></section>`;
}

function money(s) {
  return `<section class="page-header compact"><div><p class="eyebrow">METERING & SETTLEMENT</p><h1>Charge for the result.<br/><span>Not every API call.</span></h1><p class="lede">AIX creates a meter record only when an agreed business event is accepted.</p></div><div class="settlement-chip"><span>${icon('check')}</span><div><small>NETTING STATUS</small><b>Ready for review</b></div></div></section><section class="billing-rule"><div><b>11</b><span>technical API calls made</span><i>→</i><b>${s.contributors.length}</b><span>accepted billable events</span><i>→</i><b>${s.value}</b><span>customer / buyer charge</span></div><p>Retries, health checks and rejected calls are logged for operations but do not create a charge.</p></section><section class="two-col wide-first"><div class="panel table-panel"><div class="panel-head"><div><p class="eyebrow">RATED BUSINESS EVENTS</p><h2>${s.title}</h2></div><span class="status okay">${icon('check')} complete</span></div><table><thead><tr><th>Provider</th><th>What was delivered</th><th>Billing trigger</th><th>Value</th></tr></thead><tbody>${contributorsHTML(s)}</tbody></table><div class="ledger-total"><span>Total price for this journey</span><b>${s.value}</b></div></div><div class="panel split-panel"><p class="eyebrow">SETTLEMENT RULE</p><h2>Every line is explainable.</h2><p>Each provider sees only its own usage, price and settlement statement. AIX retains the signed receipt needed to reconcile the transaction.</p><div class="legend"><span><i class="c1"></i> eSIM / fulfilment</span><span><i class="c2"></i> Intelligence result</span><span><i class="c3"></i> AIX transaction fee</span></div><button class="secondary-button">${icon('download')} Download statement</button></div></section>`;
}

function trust(s) {
  const travel = s.scenario === 'travel';
  return `<section class="page-header compact"><div><p class="eyebrow">EVIDENCE & COMPLIANCE</p><h1>Every action is traceable.<br/><span>No raw data is collected.</span></h1><p class="lede">This is the audit trail for ${s.title}. It records who requested what, under which policy, and only the permitted result.</p></div><span class="seal">${icon('lock')} audit-ready</span></section><section class="audit-strip"><div><b>Consent</b><span>Valid</span></div><div><b>Policy</b><span>${s.policy}</span></div><div><b>Raw data stored in AIX</b><span>None</span></div><div><b>Evidence record</b><span>Sealed</span></div></section><section class="two-col trace-layout"><div class="panel trace-panel"><div class="panel-head"><div><p class="eyebrow">AGENT ACTION LOG</p><h2>What the agents did</h2></div><small>UTC+7 · immutable receipt</small></div><div class="trace-list"><article><time>10:42:08</time><div><b>Policy agent</b><p>Verified consent for <em>${travel ? 'Thailand travel personalisation' : 'account takeover prevention'}</em>.</p><small>Stored: consent reference + policy version. Not stored: identity document, profile history.</small></div><span class="pass">Passed</span></article><article><time>10:42:09</time><div><b>Orchestration agent</b><p>Called ${travel ? 'IOH travel-offer qualification' : 'MNO number verification and SIM-swap assurance'}.</p><small>Sent: scoped token. Not sent: raw MSISDN history, usage, location or customer profile.</small></div><span class="pass">Passed</span></article><article><time>10:42:10</time><div><b>Supplier gateway</b><p>Returned ${travel ? 'eligible offer IDs only' : 'time-bounded assurance results only'}.</p><small>Stored: signed response hash + outcome. Not stored: source data or supplier model inputs.</small></div><span class="pass">Passed</span></article><article><time>10:42:12</time><div><b>Fulfilment agent</b><p>${s.outcome}.</p><small>Stored: order / activation / voucher result required for customer support and settlement.</small></div><span class="pass">Recorded</span></article></div></div><div class="panel policy-card"><p class="eyebrow">DECISION RECEIPT</p><h2>${s.title}</h2><div class="policy-list"><p><span>Customer reference</span><b>Pseudonymous token</b></p><p><span>Purpose</span><b>${travel ? 'Thailand travel' : 'ATO prevention'}</b></p><p><span>Retention</span><b>Evidence period only</b></p><p><span>Raw data in AIX</span><b>Never</b></p><p><span>Verification</span><b>Signed provider response</b></p></div><button class="secondary-button" id="open-trace">Open receipt ${icon('arrow')}</button></div></section>`;
}

function catalogue() {
  return `<section class="page-header compact"><div><p class="eyebrow">CATALOGUE / INTELLIGENCE PRODUCTS</p><h1>Discoverable products.<br/><span>Declared policy boundaries.</span></h1><p class="lede">Suppliers publish only approved products, with purpose, pricing, country and fulfilment conditions.</p></div><button class="primary-button">Publish product ${icon('arrow')}</button></section><section class="catalogue-grid"><article class="product-card"><span class="badge purple">IOH</span><h3>Travel Offer Qualification</h3><p>Returns authorised offer IDs for a consented journey. Profile remains at IOH.</p><div><span>Indonesia</span><span>Per decision</span></div></article><article class="product-card"><span class="badge green">AIS</span><h3>Thailand eSIM Fulfilment</h3><p>Checks availability, provisions the local profile and returns activation status.</p><div><span>Thailand</span><span>Per activation</span></div></article><article class="product-card"><span class="badge pink">MNO network API</span><h3>SIM Swap Assurance</h3><p>Returns a time-bounded assurance result for approved risk-prevention requests.</p><div><span>Multi-market</span><span>Per decision</span></div></article><article class="product-card"><span class="badge blue">Bank</span><h3>Risk Decision Input</h3><p>Provider-owned transaction-risk contribution for governed ATO prevention.</p><div><span>Indonesia</span><span>Per decision</span></div></article></section>`;
}

function render() {
  const s = scenarios[state.scenario];
  const pages = { overview: overview(s), exchange: transactions(s), money: money(s), trust: trust(s), catalogue: catalogue() };
  document.querySelector('#app').innerHTML = `<div class="shell"><aside><a class="brand"><span class="brand-mark">AIX</span><span><b>Commerce</b><small>Control Plane</small></span></a><div class="environment"><i></i><span>Production demo</span><b>⌄</b></div><nav><p>EXCHANGE</p>${navItem('overview','Overview','grid')}${navItem('exchange','Orders & fulfilment','exchange')}${navItem('catalogue','Intelligence catalogue','catalogue')}<p>TRUST & VALUE</p>${navItem('trust','Consent & evidence','trust')}${navItem('money','Metering & settlement','money')}<p>ADMIN</p>${navItem('settings','Partners & access','settings')}</nav><div class="side-foot"><div class="avatar">SW</div><div><b>Syahrier Wakid</b><small>Telin · AIX Lead</small></div><span>⌄</span></div></aside><main><header><div class="breadcrumb">AIX / <b>${state.tab === 'overview' ? 'Overview' : state.tab}</b></div><div class="header-actions"><button>${icon('search')}</button><button class="notification">${icon('bell')}<i></i></button><span class="header-divider"></span><button class="help">?</button></div></header><div class="content">${pages[state.tab] || pages.overview}</div></main></div>${state.detail ? modal(s) : ''}`;
  bind();
}

function modal(s) {
  return `<div class="modal-backdrop"><section class="receipt"><button class="modal-close" id="close-modal">${icon('close')}</button><p class="eyebrow">TRUSTED DECISION RECEIPT</p><h2>${s.title}</h2><p class="receipt-copy">${s.outcome}</p><div class="receipt-grid"><div><small>BUYER</small><b>${s.buyer}</b></div><div><small>POLICY</small><b>${s.policy}</b></div><div><small>CONSENT</small><b>Verified & active</b></div><div><small>EVIDENCE</small><b>Hash chain sealed</b></div></div><div class="receipt-events">${eventsHTML(s)}</div><div class="receipt-footer"><span>${icon('lock')} Raw data retained by each provider</span><button class="primary-button">${icon('download')} Export receipt</button></div></section></div>`;
}

function bind() {
  document.querySelectorAll('[data-tab]').forEach(el => el.onclick = () => { state.tab = el.dataset.tab; render(); });
  document.querySelectorAll('[data-scenario]').forEach(el => el.onclick = () => { state.scenario = el.dataset.scenario; state.detail = false; render(); });
  const toggle = document.querySelector('#scenario-toggle'); const menu = document.querySelector('#scenario-menu');
  if (toggle) toggle.onclick = () => menu.classList.toggle('show');
  document.querySelectorAll('#open-trace').forEach(el => el.onclick = () => { state.detail = true; render(); });
  const close = document.querySelector('#close-modal'); if (close) close.onclick = () => { state.detail = false; render(); };
}

render();
