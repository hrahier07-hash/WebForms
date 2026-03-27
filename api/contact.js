module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prenom, nom, email, entreprise, sujet, message } = req.body || {};

  if (!prenom || !nom || !email || !entreprise) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' });
  }

  const apiKey = process.env.RESEND_API_KEY;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'WebForms <hello@webforms.com>',
        to: ['hugo@astrova.fr', 'thibaud@astrova.fr'],
        subject: `✉️ Nouveau message — ${sujet} · ${prenom} ${nom}`,
        html: `
          <div style="font-family: 'IBM Plex Sans', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #f7f7fa; border-radius: 16px;">
            <div style="background: #fff; border-radius: 12px; padding: 32px; border: 1px solid #e4e4e7;">
              <div style="margin-bottom: 24px;">
                <span style="display: inline-block; background: #3282DE; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.05em; text-transform: uppercase;">Nouveau message contact</span>
              </div>
              <h2 style="font-size: 22px; font-weight: 800; color: #111827; margin: 0 0 24px; letter-spacing: -0.02em;">
                ${prenom} ${nom} — ${sujet}
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; font-size: 13px; color: #6b7280; font-weight: 500; width: 120px;">Prénom</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; font-size: 14px; color: #111827; font-weight: 600;">${prenom}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; font-size: 13px; color: #6b7280; font-weight: 500;">Nom</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; font-size: 14px; color: #111827; font-weight: 600;">${nom}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; font-size: 13px; color: #6b7280; font-weight: 500;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; font-size: 14px; color: #111827; font-weight: 600;">
                    <a href="mailto:${email}" style="color: #3282DE; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; font-size: 13px; color: #6b7280; font-weight: 500;">Entreprise</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; font-size: 14px; color: #111827; font-weight: 600;">${entreprise}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; ${message ? 'border-bottom: 1px solid #e4e4e7;' : ''} font-size: 13px; color: #6b7280; font-weight: 500;">Sujet</td>
                  <td style="padding: 12px 0; ${message ? 'border-bottom: 1px solid #e4e4e7;' : ''} font-size: 14px; color: #111827; font-weight: 600;">${sujet}</td>
                </tr>
                ${message ? `
                <tr>
                  <td style="padding: 12px 0; font-size: 13px; color: #6b7280; font-weight: 500; vertical-align: top;">Message</td>
                  <td style="padding: 12px 0; font-size: 14px; color: #374151; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
                </tr>` : ''}
              </table>
            </div>
            <p style="text-align: center; font-size: 11.5px; color: #9ca3af; margin-top: 20px;">
              Envoyé depuis webforms.com/contact
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Erreur envoi email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
