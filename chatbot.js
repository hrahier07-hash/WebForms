// ===============================
// NORMALISATION TEXTE
// ===============================

function normalizeText(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ===============================
// BASE DE CONNAISSANCE
// ===============================

const KB = [

{
q:["btpforms","c est quoi btpforms","application btp"],
a:"BTPForms est une application pour les entreprises du BTP qui permet de créer et remplir des formulaires chantier directement sur smartphone ou tablette."
},

{
q:["tarif","prix","abonnement","combien"],
a:"Les tarifs de BTPForms dépendent du nombre d'utilisateurs. Vous pouvez demander une démo ou un essai directement sur le site."
},

{
q:["essai","test","demo","gratuit"],
a:"Oui 👍 vous pouvez tester BTPForms pour voir comment créer et remplir des formulaires sur chantier."
},

{
q:["telephone","mobile","smartphone"],
a:"BTPForms fonctionne parfaitement sur téléphone pour les équipes terrain."
},

{
q:["contact","support","email"],
a:"Vous pouvez contacter l'équipe via le formulaire de contact sur le site."
}

]

// ===============================
// TROUVER REPONSE
// ===============================

function findAnswer(question){

const q = normalizeText(question)

for(let item of KB){

for(let keyword of item.q){

if(q.includes(normalizeText(keyword))){
return item.a
}

}

}

return null

}

// ===============================
// APPEL IA
// ===============================

async function askAI(question){

try{

const res = await fetch("/api/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:question
})
})

const data = await res.json()

return data.reply

}catch(err){

return "Je ne suis pas sûr d'avoir compris. Pouvez-vous reformuler ?"

}

}

// ===============================
// CHATBOT
// ===============================

async function askBot(question){

const answer = findAnswer(question)

if(answer){
return answer
}

// fallback IA
const aiReply = await askAI(question)

return aiReply

}

// ===============================
// INTERFACE
// ===============================

const input = document.getElementById("chat-input")
const sendBtn = document.getElementById("chat-send")
const messages = document.getElementById("chat-messages")

function addMessage(text, sender){

const div = document.createElement("div")

div.className = sender === "user" ? "msg-user" : "msg-bot"

div.innerText = text

messages.appendChild(div)

messages.scrollTop = messages.scrollHeight

}

async function sendMessage(){

const text = input.value.trim()

if(!text) return

addMessage(text,"user")

input.value = ""

const reply = await askBot(text)

addMessage(reply,"bot")

}

sendBtn.addEventListener("click",sendMessage)

input.addEventListener("keypress",function(e){

if(e.key==="Enter"){
sendMessage()
}

})
