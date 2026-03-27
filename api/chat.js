export default async function handler(req, res) {

const { message } = req.body;

const response = await fetch("https://api.x.ai/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.XAI_API_KEY}`
},
body: JSON.stringify({
model: "grok-4",
messages: [
{
role: "system",
content: `
Tu es l'assistant du site WebForms.com.

WebForms est une application pour les entreprises des équipes terrain permettant de créer
des formulaires numériques pour les sites :
- fiches d'intervention
- checklists sécurité
- rapports projet
- formulaires personnalisés

Tu dois répondre aux visiteurs du site de façon claire et professionnelle.

Si la question concerne WebForms, réponds précisément.
Si la question est générale, réponds brièvement et reste cordial.
`
},
{
role: "user",
content: message
}
]
})
});

const data = await response.json();

res.json({
reply: data.choices[0].message.content
});

}
