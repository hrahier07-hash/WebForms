/* ══════════════════════════════════════════════
   BTPForms Chatbot Widget
   À intégrer sur toutes les pages du site
   ══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── BASE DE CONNAISSANCE ── */
  const KB = [
    {
      tags: ['prix', 'tarif', 'cout', 'coût', 'combien', 'abonnement', 'forfait', 'plan'],
      response: `Voici nos 3 plans :<br><br>
        <b>🟦 Starter — 19€ HT/mois</b><br>
        100 soumissions/mois · 1 workspace · 2 créateurs<br><br>
        <b>⭐ Avancé — 49€ HT/mois</b><br>
        500 soumissions/mois · Workspaces & créateurs illimités<br><br>
        <b>🏢 Entreprise — 99€ HT/mois</b><br>
        Soumissions illimitées · App connexions · API · Support prioritaire<br><br>
        En annuel : <b>-20%</b> sur tous les plans. Et 7 jours gratuits sans CB pour commencer.`
    },
    {
      tags: ['essai', 'gratuit', 'test', 'trial', 'demo', 'démo', 'cb', 'carte'],
      response: `L'essai gratuit dure <b>7 jours</b>, avec toutes les fonctionnalités débloquées jusqu'à 50 soumissions.<br><br>
        ✅ Aucune carte bancaire demandée<br>
        ✅ Accès complet immédiat<br>
        ✅ Si vous ne souscrivez pas, votre compte passe en lecture seule — vos données sont conservées.`
    },
    {
      tags: ['terrain', 'compte', 'inscription', 'ouvriers', 'equipe', 'équipe', 'remplir', 'lien', 'qr', 'téléphone', 'telephone'],
      response: `Vos équipes terrain <b>n'ont pas besoin de compte</b>.<br><br>
        Ils reçoivent un lien ou scannent un QR code, ouvrent ça dans leur navigateur, et c'est parti.<br><br>
        ✅ Aucune inscription<br>
        ✅ Aucune appli à télécharger<br>
        ✅ Fonctionne sur n'importe quel smartphone`
    },
    {
      tags: ['données', 'donnees', 'stockage', 'hébergement', 'securite', 'sécurité', 'rgpd', 'france', 'serveur'],
      response: `Vos données sont <b>hébergées en France</b> via Supabase.<br><br>
        📁 Chaque PDF est accessible depuis votre tableau de bord<br>
        📦 Export en masse (ZIP) disponible à tout moment<br>
        🔒 Vos données vous appartiennent et ne disparaissent jamais`
    },
    {
      tags: ['champs', 'type', 'signature', 'photo', 'date', 'texte', 'liste', 'checkbox', 'case'],
      response: `BTPForms propose <b>7 types de champs</b> :<br><br>
        📝 Texte libre<br>
        📄 Zone de texte longue<br>
        📅 Date<br>
        ☑️ Case à cocher<br>
        🔽 Liste déroulante<br>
        📷 Photo<br>
        ✍️ Signature<br><br>
        Avec une <b>App connexion</b> (Plan Entreprise), des champs auto remplis apparaissent : client, adresse, référence chantier…`
    },
    {
      tags: ['membres', 'utilisateurs', 'roles', 'rôles', 'inviter', 'invitation', 'equipe', 'équipe', 'workspace', 'espace'],
      response: `Vous gérez vos accès depuis la section <b>Membres</b>.<br><br>
        👤 <b>Propriétaire</b> : accès complet<br>
        🎨 <b>Créateur</b> : peut créer des formulaires<br>
        👁️ <b>Lecteur</b> : consultation uniquement<br><br>
        Vous pouvez aussi créer plusieurs <b>espaces de travail</b> pour séparer vos activités (chantiers, sécurité, admin…).`
    },
    {
      tags: ['connexion', 'integration', 'api', 'logiciel', 'connecter', 'synchroniser', 'externe'],
      response: `Les <b>App connexions</b> permettent de relier BTPForms à vos outils internes.<br><br>
        🔗 Récupération auto : client, adresse, référence chantier<br>
        📤 Envoi automatique du PDF vers votre logiciel<br>
        🔌 API disponible sur le <b>Pack Entreprise</b><br><br>
        La plupart des utilisateurs démarrent sans connexion et l'ajoutent plus tard selon les besoins.`
    },
    {
      tags: ['pdf', 'template', 'modèle', 'modele', 'upload', 'importer', 'builder', 'construire'],
      response: `Vous pouvez partir de <b>votre PDF existant</b> ou créer de zéro dans le builder.<br><br>
        📤 Upload votre PDF actuel (bon de livraison, PV de réception, rapport…)<br>
        🎨 Posez les champs en glisser-déposer directement sur le PDF<br>
        🌐 Publiez le formulaire en quelques secondes<br><br>
        Vos équipes terrain reçoivent un lien ou un QR code et peuvent remplir depuis leur téléphone.`
    },
    {
      tags: ['soumissions', 'formulaires', 'recupérer', 'récupérer', 'exporter', 'export', 'filtre', 'archiver'],
      response: `Chaque soumission génère un <b>PDF conforme à votre modèle</b>.<br><br>
        🔍 Filtrez par date ou recherchez par mot-clé<br>
        ✏️ Éditez une soumission après coup si besoin<br>
        📦 Export en masse en ZIP<br>
        📥 Accès depuis votre tableau de bord à tout moment`
    },
    {
      tags: ['sans', 'seul', 'indépendant', 'independant', 'logiciel', 'branchement', 'brancher', 'standalone'],
      response: `Oui, BTPForms fonctionne <b>complètement en autonome</b>.<br><br>
        Les App connexions sont optionnelles — la plupart des utilisateurs démarrent sans et les ajoutent plus tard si besoin.<br><br>
        Pas besoin de logiciel existant pour commencer.`
    },
    {
      tags: ['contact', 'parler', 'humain', 'aide', 'support', 'question', 'joindre', 'rappel'],
      response: `Notre équipe répond sous <b>24h</b>.<br><br>
        📧 Formulaire de contact sur <a href="contact.html" style="color:#3282DE;text-decoration:underline">cette page</a><br>
        📞 Vous pouvez aussi demander un rappel directement depuis le site<br><br>
        Pour une démo ou un devis Entreprise, écrivez-nous directement !`
    },
    {
      tags: ['usages', 'cas', 'exemple', 'rapport', 'reception', 'chantier', 'securite', 'sécurité', 'logistique', 'presence', 'présence'],
      response: `BTPForms est utilisé pour :<br><br>
        🏗️ <b>Suivi de chantier</b><br>
        ✅ <b>PV de réception</b><br>
        📋 <b>Rapport d'intervention</b><br>
        🚧 <b>Fiche sécurité / inspection</b><br>
        📦 <b>Suivi logistique</b><br>
        🕐 <b>Feuille de présence</b><br><br>
        Vous avez un cas spécifique ? Contactez-nous, on vous aide à le mettre en place.`
    },
    {
      tags: ['annuel', 'mensuel', 'reduction', 'réduction', 'remise', 'économie', 'économiser'],
      response: `En choisissant la <b>facturation annuelle</b>, vous économisez <b>20%</b> sur tous les plans :<br><br>
        🟦 Starter : 15€/mois (au lieu de 19€)<br>
        ⭐ Avancé : 39€/mois (au lieu de 49€)<br>
        🏢 Entreprise : 79€/mois (au lieu de 99€)<br><br>
        Vous pouvez choisir votre mode de facturation directement sur la page tarifs.`
    },
  ];

  /* ── QUICK REPLIES ── */
  const QUICK = [
    { label: '💰 Voir les tarifs', text: 'Quels sont les prix ?' },
    { label: '🎁 Essai gratuit', text: 'Comment fonctionne l\'essai gratuit ?' },
    { label: '📱 Équipes terrain', text: 'Mes équipes terrain ont besoin d\'un compte ?' },
    { label: '📄 Types de champs', text: 'Quels champs peut-on ajouter ?' },
    { label: '🔗 Intégrations', text: 'Peut-on connecter des logiciels ?' },
    { label: '💬 Parler à l\'équipe', text: 'Comment vous contacter ?' },
  ];

  /* ── MATCHING ── */
  function findAnswer(input) {
    const q = input.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ');

    let best = null, bestScore = 0;
    for (const item of KB) {
      const score = item.tags.reduce((s, tag) => s + (q.includes(tag) ? 1 : 0), 0);
      if (score > bestScore) { bestScore = score; best = item; }
    }
    if (bestScore === 0) return null;
    return best.response;
  }

  /* ── CSS ── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');

    #btpbot-btn {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      width: 60px; height: 60px; border-radius: 50%;
      background: #3282DE; border: none; cursor: pointer;
      box-shadow: 0 4px 20px rgba(50,130,222,.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform .2s, box-shadow .2s, background .15s;
      font-size: 26px;
    }
    #btpbot-btn:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(50,130,222,.55); background: #2268C0; }
    #btpbot-btn.open { background: #111827; }
    #btpbot-btn .ico-chat { transition: opacity .15s, transform .15s; }
    #btpbot-btn .ico-close { position: absolute; opacity: 0; transform: scale(.6); transition: opacity .15s, transform .15s; }
    #btpbot-btn.open .ico-chat { opacity: 0; transform: scale(.6); }
    #btpbot-btn.open .ico-close { opacity: 1; transform: scale(1); }

    #btpbot-notif {
      position: fixed; bottom: 96px; right: 28px; z-index: 9998;
      background: #fff; border: 1px solid #E4E4E7;
      border-radius: 14px; padding: 10px 14px;
      font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; color: #374151;
      box-shadow: 0 4px 20px rgba(0,0,0,.1);
      display: flex; align-items: center; gap: 8px;
      animation: btpbot-pop .4s cubic-bezier(.22,1,.36,1);
      cursor: pointer;
      max-width: 220px;
    }
    #btpbot-notif::after {
      content: ''; position: absolute; bottom: -7px; right: 24px;
      width: 14px; height: 14px; background: #fff;
      border-right: 1px solid #E4E4E7; border-bottom: 1px solid #E4E4E7;
      transform: rotate(45deg);
    }

    #btpbot-wrap {
      position: fixed; bottom: 100px; right: 28px; z-index: 9998;
      width: 360px; max-height: 540px;
      background: #fff; border: 1px solid #E4E4E7;
      border-radius: 20px;
      box-shadow: 0 16px 48px rgba(0,0,0,.14);
      display: flex; flex-direction: column;
      font-family: 'IBM Plex Sans', sans-serif;
      overflow: hidden;
      opacity: 0; transform: translateY(16px) scale(.96);
      pointer-events: none;
      transition: opacity .25s cubic-bezier(.22,1,.36,1), transform .25s cubic-bezier(.22,1,.36,1);
    }
    #btpbot-wrap.show { opacity: 1; transform: none; pointer-events: all; }

    .btpbot-head {
      background: linear-gradient(135deg, #3282DE 0%, #2268C0 100%);
      padding: 16px 18px;
      display: flex; align-items: center; gap: 12px;
    }
    .btpbot-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: rgba(255,255,255,.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
      border: 2px solid rgba(255,255,255,.35);
    }
    .btpbot-head-info { flex: 1; }
    .btpbot-head-name { font-size: 14px; font-weight: 700; color: #fff; }
    .btpbot-head-status {
      display: flex; align-items: center; gap: 5px;
      font-size: 11.5px; color: rgba(255,255,255,.75); margin-top: 2px;
    }
    .btpbot-status-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 0 2px rgba(74,222,128,.3);
      animation: btpbot-pulse 2s infinite;
    }

    .btpbot-msgs {
      flex: 1; overflow-y: auto; padding: 16px 14px;
      display: flex; flex-direction: column; gap: 10px;
      scroll-behavior: smooth;
    }
    .btpbot-msgs::-webkit-scrollbar { width: 4px; }
    .btpbot-msgs::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 2px; }

    .btpbot-msg { display: flex; gap: 8px; max-width: 100%; }
    .btpbot-msg.user { flex-direction: row-reverse; }
    .btpbot-bubble {
      padding: 10px 13px; border-radius: 16px;
      font-size: 13.5px; line-height: 1.55;
      max-width: 82%;
    }
    .btpbot-msg.bot .btpbot-bubble {
      background: #F7F7FA; color: #111827;
      border-radius: 4px 16px 16px 16px;
      border: 1px solid #E4E4E7;
    }
    .btpbot-msg.user .btpbot-bubble {
      background: #3282DE; color: #fff;
      border-radius: 16px 4px 16px 16px;
    }
    .btpbot-mini-avatar {
      width: 28px; height: 28px; border-radius: 50%;
      background: #EEF4FD; display: flex; align-items: center; justify-content: center;
      font-size: 14px; flex-shrink: 0; margin-top: 2px;
    }

    .btpbot-typing {
      display: flex; align-items: center; gap: 4px;
      padding: 12px 14px; background: #F7F7FA;
      border: 1px solid #E4E4E7; border-radius: 4px 16px 16px 16px;
      width: fit-content;
    }
    .btpbot-typing span {
      width: 6px; height: 6px; background: #9ca3af; border-radius: 50%;
      animation: btpbot-bounce .9s infinite;
    }
    .btpbot-typing span:nth-child(2) { animation-delay: .15s; }
    .btpbot-typing span:nth-child(3) { animation-delay: .3s; }

    .btpbot-quick-wrap {
      padding: 0 14px 10px;
      display: flex; flex-wrap: wrap; gap: 6px;
    }
    .btpbot-quick {
      background: #fff; border: 1.5px solid #E4E4E7;
      border-radius: 20px; padding: 5px 12px;
      font-size: 12px; font-weight: 500; color: #374151;
      cursor: pointer; transition: border-color .15s, color .15s, background .15s;
      font-family: 'IBM Plex Sans', sans-serif;
    }
    .btpbot-quick:hover { border-color: #3282DE; color: #3282DE; background: #EEF4FD; }

    .btpbot-footer {
      border-top: 1px solid #E4E4E7;
      padding: 10px 12px;
      display: flex; gap: 8px; align-items: flex-end;
    }
    .btpbot-input {
      flex: 1; border: 1.5px solid #E4E4E7; border-radius: 10px;
      padding: 9px 12px; font-size: 13.5px;
      font-family: 'IBM Plex Sans', sans-serif; color: #111827;
      outline: none; resize: none; max-height: 90px; min-height: 38px;
      transition: border-color .15s; background: #fff; line-height: 1.4;
      overflow-y: auto;
    }
    .btpbot-input:focus { border-color: #3282DE; }
    .btpbot-input::placeholder { color: #9ca3af; }
    .btpbot-send {
      width: 38px; height: 38px; border-radius: 10px;
      background: #3282DE; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: background .15s, transform .1s;
      color: #fff;
    }
    .btpbot-send:hover { background: #2268C0; }
    .btpbot-send:active { transform: scale(.92); }

    @keyframes btpbot-pop {
      from { opacity: 0; transform: translateY(8px) scale(.95); }
      to   { opacity: 1; transform: none; }
    }
    @keyframes btpbot-pulse {
      0%,100% { box-shadow: 0 0 0 2px rgba(74,222,128,.3); }
      50% { box-shadow: 0 0 0 5px rgba(74,222,128,.1); }
    }
    @keyframes btpbot-bounce {
      0%,60%,100% { transform: translateY(0); }
      30% { transform: translateY(-5px); }
    }

    @media (max-width: 420px) {
      #btpbot-wrap { width: calc(100vw - 32px); right: 16px; }
      #btpbot-btn  { right: 16px; bottom: 16px; }
      #btpbot-notif { right: 16px; }
    }
  `;

  /* ── DOM ── */
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Notification bulle
  const notif = document.createElement('div');
  notif.id = 'btpbot-notif';
  notif.innerHTML = `<span style="font-size:18px">👋</span><span>Une question ? Je suis là !</span>`;
  document.body.appendChild(notif);

  // Bouton flottant
  const btn = document.createElement('button');
  btn.id = 'btpbot-btn';
  btn.setAttribute('aria-label', 'Ouvrir le chat');
  btn.innerHTML = `
    <svg class="ico-chat" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
    <svg class="ico-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>`;
  document.body.appendChild(btn);

  // Fenêtre chat
  const wrap = document.createElement('div');
  wrap.id = 'btpbot-wrap';
  wrap.setAttribute('role', 'dialog');
  wrap.setAttribute('aria-label', 'Assistant BTPForms');
  wrap.innerHTML = `
    <div class="btpbot-head">
      <div class="btpbot-avatar">🤖</div>
      <div class="btpbot-head-info">
        <div class="btpbot-head-name">Assistant BTPForms</div>
        <div class="btpbot-head-status">
          <div class="btpbot-status-dot"></div>
          En ligne · Répond en quelques secondes
        </div>
      </div>
    </div>
    <div class="btpbot-msgs" id="btpbot-msgs"></div>
    <div class="btpbot-quick-wrap" id="btpbot-quick"></div>
    <div class="btpbot-footer">
      <textarea class="btpbot-input" id="btpbot-input" placeholder="Posez votre question…" rows="1"></textarea>
      <button class="btpbot-send" id="btpbot-send" aria-label="Envoyer">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>`;
  document.body.appendChild(wrap);

  /* ── REFS ── */
  const msgs = document.getElementById('btpbot-msgs');
  const input = document.getElementById('btpbot-input');
  const sendBtn = document.getElementById('btpbot-send');
  const quickWrap = document.getElementById('btpbot-quick');

  /* ── STATE ── */
  let isOpen = false;
  let firstOpen = true;

  /* ── HELPERS ── */
  function addMsg(text, from) {
    const el = document.createElement('div');
    el.className = `btpbot-msg ${from}`;
    if (from === 'bot') {
      el.innerHTML = `<div class="btpbot-mini-avatar">🤖</div><div class="btpbot-bubble">${text}</div>`;
    } else {
      el.innerHTML = `<div class="btpbot-bubble">${text}</div>`;
    }
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'btpbot-msg bot';
    el.id = 'btpbot-typing-row';
    el.innerHTML = `<div class="btpbot-mini-avatar">🤖</div>
      <div class="btpbot-typing"><span></span><span></span><span></span></div>`;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  function removeTyping() {
    const t = document.getElementById('btpbot-typing-row');
    if (t) t.remove();
  }

  function buildQuickReplies() {
    quickWrap.innerHTML = '';
    QUICK.forEach(q => {
      const b = document.createElement('button');
      b.className = 'btpbot-quick';
      b.textContent = q.label;
      b.onclick = () => { send(q.text); };
      quickWrap.appendChild(b);
    });
  }

  function clearQuickReplies() {
    quickWrap.innerHTML = '';
  }

  function botReply(text) {
    return new Promise(resolve => {
      const t = showTyping();
      const delay = 700 + Math.random() * 400;
      setTimeout(() => {
        removeTyping();
        addMsg(text, 'bot');
        resolve();
      }, delay);
    });
  }

  async function send(text) {
    const q = (text || input.value).trim();
    if (!q) return;
    input.value = '';
    input.style.height = '';
    clearQuickReplies();

    addMsg(q, 'user');

    const answer = findAnswer(q);
    if (answer) {
      await botReply(answer);
    } else {
      await botReply(`Je n'ai pas la réponse exacte à cette question. 😅<br><br>
        Vous pouvez :<br>
        📧 <a href="contact.html" style="color:#3282DE;text-decoration:underline">Nous contacter</a> — on répond sous 24h<br>
        📞 Demander un rappel depuis le site<br><br>
        Vous pouvez aussi reformuler votre question, je ferai de mon mieux !`);
    }

    // Relancer les quick replies après chaque réponse
    setTimeout(() => buildQuickReplies(), 400);
  }

  /* ── INIT DU CHAT ── */
  async function initChat() {
    if (!firstOpen) return;
    firstOpen = false;
    await botReply(`Bonjour 👋 Je suis l'assistant BTPForms.<br><br>
      Je peux vous renseigner sur nos <b>tarifs</b>, nos <b>fonctionnalités</b>, l'<b>essai gratuit</b>… Que souhaitez-vous savoir ?`);
    buildQuickReplies();
  }

  /* ── TOGGLE ── */
  function toggle() {
    isOpen = !isOpen;
    btn.classList.toggle('open', isOpen);
    wrap.classList.toggle('show', isOpen);

    // Cacher la notif
    if (notif.parentNode) notif.remove();

    if (isOpen) {
      initChat();
      setTimeout(() => input.focus(), 300);
    }
  }

  btn.addEventListener('click', toggle);
  notif.addEventListener('click', toggle);

  /* ── INPUT ── */
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 90) + 'px';
  });
  sendBtn.addEventListener('click', () => send());

  /* ── NOTIF AUTO (3s après chargement) ── */
  setTimeout(() => {
    if (!isOpen && notif.parentNode) {
      // déjà visible, OK
    }
  }, 3000);

  // Auto-disparition de la notif après 8s
  setTimeout(() => {
    if (!isOpen && notif.parentNode) {
      notif.style.transition = 'opacity .5s';
      notif.style.opacity = '0';
      setTimeout(() => notif.parentNode && notif.remove(), 500);
    }
  }, 8000);

})();
