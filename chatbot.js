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
  /* ── Q&R ÉTENDUES ── */
    /* ── 100 Q&R ADDITIONNELLES ── */
    { tags: ['bonjour', 'salut', 'hello', 'bonsoir', 'hey'], response: `Bonjour 👋 Je suis l'assistant BTPForms. Comment puis-je vous aider ?` },
    { tags: ['ca va', 'comment vas', 'vous allez'], response: `Très bien merci ! Je suis là pour répondre à vos questions sur BTPForms.` },
    { tags: ['appelles', 'nom', 'qui es', 'qui etes'], response: `Je suis l'assistant BTPForms, ici pour répondre à toutes vos questions.` },
    { tags: ['humain', 'robot', 'bot', 'automatise', 'automatisé'], response: `Non, je suis un assistant automatisé qui aide à répondre aux questions sur BTPForms.` },
    { tags: ['cree', 'créé', 'fondé', 'fonde', 'startup', 'saas', 'quoi exactement'], response: `BTPForms est une solution SaaS créée pour digitaliser les formulaires terrain des entreprises du BTP.` },
    { tags: ['sert', 'utilite', 'utilité', 'objectif', 'but', 'application'], response: `BTPForms permet aux équipes terrain de remplir des formulaires depuis leur téléphone et de générer automatiquement des PDF.` },
    { tags: ['mobile', 'appli', 'iphone', 'android', 'smartphone'], response: `Les formulaires fonctionnent dans le navigateur du smartphone — aucune appli à installer.` },
    { tags: ['disponible', 'france', 'pays', 'region', 'région'], response: `Oui, BTPForms est disponible pour les entreprises en France.` },
    { tags: ['parler', 'joindre', 'equipe', 'équipe'], response: `Notre équipe répond sous 24h. Consultez la <a href="contact.html" style="color:#3282DE;text-decoration:underline">page contact</a> ou demandez un rappel depuis le site.` },
    { tags: ['tester', 'essayer', 'decouvrir', 'découvrir', 'commencer'], response: `Oui ! L'essai gratuit dure 7 jours avec toutes les fonctionnalités. <b>Aucune carte bancaire requise.</b>` },
    { tags: ['complique', 'compliqué', 'difficile', 'facile', 'simple', 'prise en main', 'apprendre'], response: `L'application est conçue pour être simple. La plupart des utilisateurs prennent en main l'outil en quelques minutes.` },
    { tags: ['securise', 'sécurisé', 'confidentiel', 'safe', 'protege', 'protégé', 'rgpd'], response: `Oui, la sécurité des données est une priorité. Données hébergées en Europe, conformes au RGPD.` },
    { tags: ['stocker', 'stockage', 'conservation', 'conserver'], response: `Les données sont stockées de manière sécurisée et restent accessibles dans votre espace.` },
    { tags: ['serveur', 'hebergement', 'hébergement', 'europe', 'ue'], response: `Les données sont hébergées sur des serveurs en Europe via Supabase, conformément au RGPD.` },
    { tags: ['personnaliser', 'personnalise', 'custom', 'mesure', 'adapter'], response: `Oui, vous pouvez personnaliser vos formulaires : champs, mise en page, logo…` },
    { tags: ['importer', 'import', 'upload', 'pdf existant', 'mon pdf'], response: `Oui, importez vos formulaires PDF existants. Le builder s'ouvre pour y poser vos champs en glisser-déposer.` },
    { tags: ['photo', 'image', 'photos', 'camera', 'caméra', 'appareil photo'], response: `Oui, les utilisateurs peuvent ajouter des photos directement depuis leur smartphone lors du remplissage.` },
    { tags: ['commentaire', 'note', 'annotation', 'remarque'], response: `Oui, des champs texte libre et zones de commentaire sont disponibles dans le builder.` },
    { tags: ['date', 'calendrier', 'horodatage'], response: `Oui, des champs date sont disponibles. L'horodatage peut aussi être ajouté automatiquement.` },
    { tags: ['case', 'checkbox', 'cocher', 'coche', 'oui non'], response: `Oui, des cases à cocher font partie des types de champs disponibles.` },
    { tags: ['generer', 'générer', 'automatique', 'generation', 'génération'], response: `Oui, un PDF est généré automatiquement à chaque soumission, conforme à votre modèle.` },
    { tags: ['envoyer mail', 'envoyer email', 'partager mail'], response: `Oui, vous pouvez partager les PDF par email depuis votre tableau de bord.` },
    { tags: ['lien', 'url', 'lien public', 'acces public'], response: `Chaque formulaire dispose d'un lien public ou privé que vous pouvez partager facilement.` },
    { tags: ['flasher', 'scanner qr', 'qr code formulaire'], response: `Un QR code est généré automatiquement. Imprimez-le, collez-le sur site — vos équipes scannent et remplissent depuis leur téléphone.` },
    { tags: ['hors ligne', 'offline', 'sans connexion', 'sans internet'], response: `Certaines fonctionnalités peuvent fonctionner hors ligne selon la configuration. Contactez-nous pour plus d'infos.` },
    { tags: ['plusieurs chantier', 'multi chantier', 'projets multiples'], response: `Oui, vous pouvez gérer plusieurs projets depuis votre espace de travail.` },
    { tags: ['modifier formulaire', 'editer formulaire', 'changer formulaire'], response: `Oui, vous pouvez modifier vos formulaires à tout moment depuis votre tableau de bord.` },
    { tags: ['supprimer formulaire', 'effacer formulaire'], response: `Oui, les formulaires et soumissions peuvent être supprimés depuis votre espace.` },
    { tags: ['dupliquer', 'clone', 'copier formulaire', 'reproduire'], response: `Oui, vous pouvez cloner un formulaire existant pour le réutiliser rapidement.` },
    { tags: ['suivre reponses', 'suivi réponses', 'voir reponses', 'historique reponses'], response: `Toutes les réponses sont enregistrées dans votre tableau de bord avec horodatage.` },
    { tags: ['zip', 'export masse', 'export en masse', 'tout telecharger'], response: `Oui, vous pouvez exporter toutes vos soumissions en masse via un fichier ZIP.` },
    { tags: ['19', 'starter', 'petit plan', 'debutant', 'débutant'], response: `Le plan <b>Starter à 19€ HT/mois</b> inclut 100 soumissions/mois, 1 workspace et 2 créateurs.` },
    { tags: ['49', 'avancé', 'avance', 'intermediaire', 'intermédiaire'], response: `Le plan <b>Avancé à 49€ HT/mois</b> offre 500 soumissions/mois, workspaces et créateurs illimités.` },
    { tags: ['99', 'illimite', 'illimité', 'prioritaire', 'api plan'], response: `Le plan <b>Entreprise à 99€ HT/mois</b> inclut soumissions illimitées, App connexions, API et support prioritaire.` },
    { tags: ['mensuel', 'payer mois', 'mois par mois'], response: `Oui, le paiement mensuel est disponible sur tous les plans.` },
    { tags: ['engagement', 'sans engagement', 'resilier', 'résilier'], response: `Le plan mensuel est sans engagement. Résiliez à tout moment depuis vos paramètres.` },
    { tags: ['carte bancaire', 'cb', 'visa', 'paiement essai'], response: `Aucune carte bancaire n'est requise pour l'essai gratuit.` },
    { tags: ['annuler abonnement', 'annulation abonnement', 'arreter abonnement', 'arrêter abonnement'], response: `Oui, vous pouvez annuler votre abonnement à tout moment depuis les paramètres de facturation.` },
    { tags: ['changer offre', 'changer plan', 'upgrader', 'downgrader'], response: `Oui, vous pouvez modifier votre abonnement à tout moment depuis les paramètres.` },
    { tags: ['limite utilisateur', 'limite membres', 'combien utilisateurs', 'nb utilisateurs'], response: `Starter : 2 créateurs. Avancé et Entreprise : créateurs illimités.` },
    { tags: ['limite formulaires', 'nb formulaires', 'combien formulaires'], response: `Pas de limite sur le nombre de formulaires. Les limites portent sur les soumissions mensuelles selon votre plan.` },
    { tags: ['inviter membre', 'invitation membre', 'ajouter utilisateur'], response: `Invitez des membres depuis la section Membres de votre espace de travail.` },
    { tags: ['frais cache', 'frais cachés', 'transparent', 'tout compris'], response: `Non, nos tarifs sont transparents. Aucun frais caché.` },
    { tags: ['devis', 'tarif personnalise', 'tarif personnalisé', 'negociation', 'négociation'], response: `Oui, contactez notre équipe pour un devis adapté à votre structure.` },
    { tags: ['grande entreprise', 'grand compte', 'ETI', 'groupe'], response: `Oui, nous proposons des solutions adaptées aux grandes entreprises avec tarifs personnalisés.` },
    { tags: ['creer compte', 'créer compte', 'inscrire', 'inscription', 'nouveau compte'], response: `Cliquez sur "Essai gratuit" en haut du site pour créer votre compte en moins de 2 minutes.` },
    { tags: ['connecter', 'login', 'connexion', 'se connecter', 'acceder', 'accéder'], response: `Cliquez sur "Se connecter" en haut du site et entrez votre email et mot de passe.` },
    { tags: ['mot de passe', 'oublie', 'oublié', 'reinitialiser', 'réinitialiser', 'reset'], response: `Utilisez "Mot de passe oublié" sur la page de connexion pour recevoir un lien de réinitialisation par email.` },
    { tags: ['bug', 'erreur', 'plantage', 'ne fonctionne pas'], response: `Essayez de rafraîchir la page. Si le problème persiste, signalez-le via la <a href="contact.html" style="color:#3282DE;text-decoration:underline">page contact</a>.` },
    { tags: ['email non recu', 'pas recu email', 'spam', 'confirmation email'], response: `Vérifiez votre dossier spam ou indésirables. Si vous ne trouvez pas l'email, contactez notre support.` },
    { tags: ['ajouter champ', 'nouveau champ', 'champ builder'], response: `Dans le builder, faites glisser le type de champ depuis le panneau de droite vers votre PDF.` },
    { tags: ['supprimer champ', 'enlever champ', 'retirer champ'], response: `Cliquez sur le champ dans le builder puis utilisez le bouton supprimer pour le retirer.` },
    { tags: ['ajouter signature', 'champ signature'], response: `Dans le builder, ajoutez un champ de type "Signature" à l'emplacement souhaité sur votre PDF.` },
    { tags: ['telecharger pdf soumission', 'télécharger pdf soumission', 'acceder pdf soumission'], response: `Les PDF sont disponibles dans la section Soumissions de votre tableau de bord.` },
    { tags: ['envoyer formulaire', 'partager formulaire', 'distribuer'], response: `Partagez le lien ou le QR code du formulaire publié avec vos équipes.` },
    { tags: ['ajouter membre', 'nouveau membre', 'inviter equipe'], response: `Depuis Paramètres > Membres, cliquez sur "Inviter un membre" et entrez l'email.` },
    { tags: ['modifier abonnement', 'changer facturation', 'parametres facturation'], response: `Rendez-vous dans Paramètres > Facturation pour modifier votre abonnement.` },
    { tags: ['supprimer compte', 'fermer compte', 'cloturer compte'], response: `Pour supprimer votre compte, contactez notre support via la <a href="contact.html" style="color:#3282DE;text-decoration:underline">page contact</a>.` },
    { tags: ['quitter service', 'partir service', 'quitter btpforms'], response: `Vous pouvez exporter toutes vos données avant de quitter. Elles restent en lecture seule 12 mois après résiliation.` },
    { tags: ['formation', 'tutoriel', 'guide', 'documentation', 'aide apprendre'], response: `Des ressources sont disponibles dans notre <a href="aide.html" style="color:#3282DE;text-decoration:underline">Centre d'aide</a>.` },
    { tags: ['support client', 'assistance', 'service client'], response: `Notre équipe support est disponible par email et via le formulaire de contact. Réponse sous 24h.` },
    { tags: ['delai reponse', 'délai réponse', 'combien temps reponse'], response: `Nous répondons généralement sous 24h ouvrées.` },
    { tags: ['signaler bug', 'reporter bug', 'anomalie'], response: `Signalez le problème via la <a href="contact.html" style="color:#3282DE;text-decoration:underline">page contact</a> avec une description et une capture si possible.` },
    { tags: ['suggestion', 'idee', 'idée', 'amélioration', 'amelioration', 'feedback'], response: `Nous sommes ouverts aux suggestions ! Envoyez-nous vos idées via la <a href="contact.html" style="color:#3282DE;text-decoration:underline">page contact</a>.` },
    { tags: ['mise jour', 'mise à jour', 'version', 'changelog', 'nouveautes', 'nouveautés'], response: `Nous améliorons régulièrement le produit. Consultez le <a href="changelog.html" style="color:#3282DE;text-decoration:underline">Changelog</a> pour les nouveautés.` },
    { tags: ['ios', 'apple', 'safari iphone'], response: `Oui, BTPForms fonctionne sur iPhone via Safari ou tout autre navigateur iOS.` },
    { tags: ['partout', 'deplacement', 'déplacement', 'nomade', 'itinerant', 'itinérant'], response: `Oui, tant que vous avez accès à Internet, vous pouvez utiliser BTPForms depuis n'importe où.` },
    { tags: ['ordinateur', 'pc', 'mac', 'bureau', 'desktop', 'laptop'], response: `Oui, BTPForms fonctionne aussi bien sur ordinateur que sur mobile ou tablette.` },
    { tags: ['navigateur', 'chrome', 'firefox', 'edge', 'navigateurs'], response: `BTPForms est compatible avec tous les navigateurs modernes : Chrome, Firefox, Edge, Safari.` },
    { tags: ['internet', 'connexion internet', 'wifi', '4g', '5g'], response: `Une connexion internet est nécessaire pour soumettre les formulaires. Une connexion mobile 4G/5G suffit.` },
    { tags: ['pv reception', 'réception travaux', 'reception travaux'], response: `Oui, BTPForms est parfaitement adapté aux PV de réception. Uploadez votre modèle et publiez en quelques clics.` },
    { tags: ['rapport intervention', 'fiche intervention'], response: `Les rapports d'intervention font partie des usages les plus courants sur BTPForms.` },
    { tags: ['feuille presence', 'pointage', 'heures travail', 'présence terrain'], response: `Oui, BTPForms permet de dématérialiser vos feuilles de présence et de pointage.` },
    { tags: ['permis feu', 'epi', 'securite chantier', 'sécurité chantier', 'inspection securite'], response: `Oui, BTPForms est utilisé pour fiches sécurité, permis de feu, inspections EPI et documents de conformité.` },
    { tags: ['bon livraison', 'livraison', 'transport', 'reception marchandise'], response: `Oui, les bons de livraison sont l'un des formulaires les plus utilisés sur BTPForms.` },
    { tags: ['controle qualite', 'contrôle qualité', 'qualité', 'inspection qualite'], response: `Oui, BTPForms est adapté aux formulaires de contrôle qualité et d'inspection chantier.` },
    { tags: ['cerfa', 'officiel', 'document officiel', 'administratif'], response: `Vous pouvez importer n'importe quel PDF, y compris des documents officiels ou CERFA, et y ajouter des champs numériques.` },
    /* ── QUESTIONS HUGO ── */
    { tags: ['hugo beau', 'est beau', 'hugo est beau'], response: `D'après certaines sources totalement objectives… oui.` },
    { tags: ['hugo tres beau', 'hugo très beau', 'très beau hugo', 'tres beau hugo'], response: `Disons qu'il ne passe pas inaperçu.` },
    { tags: ['plus beau', 'le plus beau', 'hugo plus beau'], response: `Je ne veux pas créer de débat international, mais il est bien placé.` },
    { tags: ['gigachad', 'giga chad', 'hugo gigachad'], response: `Je laisse internet juger… mais certains indices vont dans ce sens.` },
    { tags: ['hugo génie', 'hugo genie', 'genie hugo', 'génie hugo'], response: `Génie ou simplement très motivé ? Le débat reste ouvert.` },
    { tags: ['hugo boss', 'le boss', 'hugo le boss'], response: `Officiellement non… officieusement peut-être un peu.` },
    { tags: ['hugo riche', 'riche hugo', 'millionnaire hugo'], response: `Pas encore milliardaire, mais il y travaille.` },
    { tags: ['hugo legende', 'hugo légende', 'légende hugo'], response: `Certaines personnes commencent déjà à le dire.` },
    { tags: ['hugo goat', 'goat hugo', 'le goat'], response: `Je ne peux ni confirmer ni infirmer cette théorie.` },
    { tags: ['hugo trop fort', 'trop fort hugo', 'fort hugo'], response: `Il se défend plutôt bien.` },
    { tags: ['hugo sigma', 'sigma hugo'], response: `Certains diraient qu'il a un petit côté indépendant.` },
    { tags: ['hugo dort', 'dort hugo', 'hugo dormir'], response: `Apparemment oui… mais rarement.` },
    { tags: ['hugo travaille', 'travaille hugo', 'hugo tout le temps'], response: `Disons qu'il aime bien construire des projets.` },
    { tags: ['hugo machine', 'machine hugo', 'hugo cyborg'], response: `Je confirme qu'il est humain… normalement.` },
    { tags: ['hugo conquérir', 'conquérir monde hugo', 'hugo monde'], response: `Peut-être pas aujourd'hui… mais il a des idées.` },
    { tags: ['hugo stylé', 'trop stylé hugo', 'hugo style'], response: `Je dirais qu'il a son style.` },
    { tags: ['hugo héros', 'hugo heros', 'héros hugo'], response: `Chaque projet a ses héros… Hugo en fait peut-être partie.` },
    { tags: ['hugo super pouvoir', 'super pouvoirs hugo', 'pouvoir hugo'], response: `Peut-être celui de transformer des idées en projets.` },
    { tags: ['hugo dangereux', 'dangereux hugo'], response: `Seulement pour la concurrence.` },
    { tags: ['hugo personnage principal', 'personnage principal hugo', 'hugo protagoniste'], response: `Dans certaines histoires… oui.` },

  /* ── BLOC Q&R ÉTENDU — PRÉSENTATION & IDENTITÉ ── */
  { tags: ['btpforms quoi','c est quoi btpforms','btpforms kesako','presentation btpforms','qu est ce que btpforms','btpforms presentation','btpforms definition','btpforms outil','btpforms plateforme','btpforms solution'], response: `BTPForms est une application qui permet aux entreprises du BTP de créer des formulaires numériques pour le terrain : rapports de chantier, checklists sécurité, fiches d'intervention, contrôles qualité, etc.` },
  { tags: ['sert a quoi btpforms','utilite btpforms','utilité btpforms','a quoi sert','pourquoi btpforms','interet btpforms','avantage btpforms','besoin btpforms'], response: `BTPForms sert à remplacer les formulaires papier sur les chantiers par des formulaires numériques remplis sur smartphone ou tablette.` },
  { tags: ['pour qui btpforms','qui utilise btpforms','cible btpforms','profil utilisateur btpforms','entreprise btpforms','artisan btpforms','conducteur travaux btpforms','chef chantier btpforms'], response: `BTPForms est conçu pour les entreprises du BTP : artisans, PME, conducteurs de travaux, chefs de chantier et équipes terrain.` },
  { tags: ['btpforms btp','pour btp','secteur btp','btp application','batiment travaux publics','construction formulaire'], response: `Oui, BTPForms est spécialement conçu pour les entreprises du bâtiment et des travaux publics.` },
  { tags: ['btpforms chantier','application chantier','outil chantier numerique','solution chantier','app terrain','appli terrain'], response: `Oui, BTPForms est une application utilisée directement sur chantier pour remplir des formulaires et des rapports.` },
  { tags: ['btpforms entreprise','digitalisation btp','numerique btp','transformation numerique btp','digital terrain'], response: `BTPForms aide les entreprises du BTP à digitaliser leurs processus terrain.` },
  { tags: ['logiciel chantier','outil chantier','logiciel btp','outil btp','logiciel terrain','outil terrain','software btp'], response: `BTPForms est un outil numérique qui simplifie la gestion des formulaires et rapports sur chantier.` },
  { tags: ['remplacer papier','supprimer papier','fin papier','papier numerique','dematérialiser papier','dematerialiser papier','zero papier chantier'], response: `BTPForms permet de remplacer les documents papier par des formulaires numériques remplis directement sur téléphone.` },
  { tags: ['gestion formulaires','gérer formulaires','administrer formulaires','organiser formulaires','formulaires chantier gestion'], response: `BTPForms permet de créer, remplir et gérer des formulaires chantier en quelques minutes.` },

  /* ── TYPES DE FORMULAIRES ── */
  { tags: ['formulaire chantier','rapport chantier','compte rendu chantier','rapport terrain','fiche chantier','document chantier'], response: `Avec BTPForms vous pouvez créer des rapports de chantier numériques remplis directement par les équipes terrain.` },
  { tags: ['checklist chantier','liste controle','check list','liste verification','inspection checklist','audit list'], response: `BTPForms permet de créer des checklists de sécurité, de contrôle ou de vérification sur chantier.` },
  { tags: ['rapport intervention','cr intervention','compte rendu intervention','fiche cr intervention'], response: `Les équipes peuvent remplir un rapport d'intervention directement depuis leur téléphone.` },
  { tags: ['fiche intervention','fiche mission','fiche travaux','intervention terrain'], response: `BTPForms permet de générer des fiches d'intervention complètes avec photos et signatures.` },
  { tags: ['rapport quotidien','rapport journalier','daily report','rapport du jour','bilan journalier chantier'], response: `Vous pouvez créer des rapports journaliers de chantier avec BTPForms.` },
  { tags: ['formulaire securite','formulaire hse','hse chantier','securite travail formulaire','document securite'], response: `BTPForms permet de créer des formulaires sécurité et contrôle HSE.` },
  { tags: ['audit chantier','inspection chantier','visite chantier','audit terrain','inspection site'], response: `BTPForms peut être utilisé pour réaliser des audits et inspections de chantier.` },
  { tags: ['controle qualite','contrôle qualité','qualite formulaire','fiche qualite','inspection qualite','autocontrole'], response: `Vous pouvez créer des formulaires de contrôle qualité pour vos chantiers.` },

  /* ── FONCTIONNALITÉS SPÉCIFIQUES ── */
  { tags: ['photos formulaire','ajouter photo','photo chantier','photo terrain','image formulaire','prendre photo'], response: `Les formulaires BTPForms permettent d'ajouter des photos directement depuis le téléphone.` },
  { tags: ['signature formulaire','signer document','signature numerique','signer electroniquement','esignature','e signature'], response: `Vous pouvez ajouter une signature directement dans un formulaire.` },
  { tags: ['gps chantier','geolocalisation','localisation formulaire','position gps','coords gps'], response: `BTPForms peut enregistrer la position GPS lors du remplissage d'un formulaire.` },
  { tags: ['horodatage','horodater','timestamp','date heure automatique','heure remplissage'], response: `Chaque formulaire peut être horodaté automatiquement.` },
  { tags: ['export pdf','formulaire pdf','generer pdf','pdf automatique','telecharger pdf','pdf soumission'], response: `Les formulaires remplis peuvent être exportés en PDF.` },
  { tags: ['creer formulaire','creation formulaire','faire formulaire','nouveau formulaire','construire formulaire','builder formulaire'], response: `Vous pouvez créer des formulaires personnalisés très facilement.` },
  { tags: ['modifier formulaire','editer formulaire','changer formulaire','mettre jour formulaire','update formulaire'], response: `Les formulaires peuvent être modifiés à tout moment.` },
  { tags: ['mode hors ligne','sans internet formulaire','offline mode','remplir sans connexion','hors connexion'], response: `Les formulaires peuvent être remplis même sans connexion internet.` },
  { tags: ['historique formulaires','archive formulaires','anciens formulaires','voir formulaires passes','retrouver formulaires'], response: `Tous les formulaires remplis sont enregistrés dans l'historique.` },

  /* ── COMPATIBILITÉ MOBILE / APPAREILS ── */
  { tags: ['application mobile','appli mobile','app mobile','mobile btpforms','version mobile'], response: `BTPForms fonctionne parfaitement sur smartphone et tablette.` },
  { tags: ['telephone chantier','utiliser telephone','remplir telephone','mobile chantier','smartphone chantier'], response: `Les équipes peuvent utiliser BTPForms directement sur leur téléphone.` },
  { tags: ['android iphone','android ou iphone','ios android','compatible android','compatible iphone','apple android'], response: `BTPForms fonctionne sur Android et iPhone.` },
  { tags: ['tablette chantier','ipad chantier','tablette formulaire','remplir tablette'], response: `Les tablettes peuvent être utilisées pour remplir les formulaires.` },
  { tags: ['connexion requise','besoin connexion','internet obligatoire','sans connexion formulaire'], response: `Même sans connexion internet, les formulaires peuvent être remplis.` },

  /* ── TARIFS & ABONNEMENTS ── */
  { tags: ['tarif btpforms','prix btpforms','cout btpforms','combien coute btpforms','tarification btpforms','grille tarifaire'], response: `Les tarifs BTPForms commencent à 19€/mois (Starter), 49€/mois (Avancé) ou 99€/mois (Entreprise). 7 jours d'essai gratuit sans CB.` },
  { tags: ['essai gratuit btpforms','tester gratuitement','period essai','free trial','tester btpforms','accès gratuit'], response: `Oui, un essai gratuit de 7 jours est disponible pour tester l'application, sans carte bancaire.` },
  { tags: ['abonnement btpforms','souscrire btpforms','payer btpforms','facturation btpforms','souscription'], response: `BTPForms fonctionne avec un abonnement mensuel ou annuel (−20%) adapté à la taille de votre entreprise.` },
  { tags: ['nombre utilisateurs','combien utilisateurs','limite membres','ajouter equipe','utilisateurs illimites'], response: `Vous pouvez ajouter plusieurs utilisateurs. Le plan Avancé et Entreprise offrent des créateurs illimités.` },

  /* ── SUPPORT & CONTACT ── */
  { tags: ['support btpforms','aide btpforms','hotline btpforms','contacter support','service client btpforms'], response: `Vous pouvez contacter le support via le <a href="contact.html" style="color:#3282DE;text-decoration:underline">formulaire de contact</a> du site. Réponse sous 24h.` },
  { tags: ['comment contacter btpforms','joindre equipe','contacter equipe','envoyer message btpforms','email btpforms'], response: `Vous pouvez nous contacter via le formulaire de contact du site ou demander un rappel téléphonique.` },
  { tags: ['probleme application','bug app','erreur app','app ne fonctionne pas','site probleme','probleme site'], response: `Si vous avez un problème, contactez le support via la page contact. Nous répondons sous 24h.` },

  /* ── SALUTATIONS & SOCIAL ── */
  { tags: ['ça va bien','ca va bien','vous allez bien','vous allez comment','comment tu vas'], response: `Oui merci 🙂 Comment puis-je vous aider concernant BTPForms ?` },
  { tags: ['quoi de neuf','news btpforms','actualite btpforms','quoi de nouveau','quoi ca'], response: `Je suis là pour vous aider à découvrir BTPForms. Que voulez-vous savoir ?` },
  { tags: ['bonsoir','bonjour equipe','salutation','bjr','bsr'], response: `Bonjour 👋 Comment puis-je vous aider aujourd'hui ?` },
  { tags: ['yo','wesh','cc','coucou','hi btpforms'], response: `Salut ! Vous voulez en savoir plus sur BTPForms ?` },
  { tags: ['hey','good morning','good day','hiya'], response: `Hello ! Comment puis-je vous aider ?` },
  { tags: ['merci beaucoup','merci bien','thanks','thank you','grand merci'], response: `Avec plaisir 🙂` },
  { tags: ['bonne journee','bonne soiree','à bientot','a bientot','bonne continuation'], response: `Bonne journée à vous aussi !` },
  { tags: ['tu es qui toi','qui es-tu','presentation toi','qui tu es','c est qui le bot'], response: `Je suis l'assistant du site BTPForms.` },
  { tags: ['tu es robot','etes vous robot','es tu un bot','chatbot btpforms','bot ou humain'], response: `Oui, je suis un assistant virtuel pour répondre aux questions sur BTPForms.` },
  { tags: ['tu es ia','es tu ia','ai chatbot','intelligence artificielle chatbot','bot ia'], response: `Je suis un chatbot conçu pour aider les visiteurs du site.` },

  /* ── QUESTIONS FUN ── */
  { tags: ['tu es beau','beau chatbot','sympa le bot','joli assistant'], response: `Merci 😄 Mais je suis surtout là pour vous aider avec BTPForms.` },
  { tags: ['tu es intelligent','bot intelligent','chatbot malin','super bot'], response: `J'essaie surtout d'être utile !` },
  { tags: ['tu es humain','es tu humain','vrai humain','personne reelle'], response: `Non, je suis un assistant virtuel.` },
  { tags: ['tu dors','bot dort','il dort','pas dispo'], response: `Non, je suis disponible 24h/24.` },
  { tags: ['tu es vivant','bot vivant','ia consciente','tu penses'], response: `Je suis un programme conçu pour aider les visiteurs du site.` },

  /* ── SYNONYMES SUPPLÉMENTAIRES POUR GONFLER LA COUVERTURE ── */
  { tags: ['digitaliser chantier','numeriser chantier','dématérialisation chantier','dematerialisation chantier','sans papier'], response: `BTPForms vous aide à digitaliser vos processus terrain et à supprimer le papier sur vos chantiers.` },
  { tags: ['temps reel','notification temps reel','recu instantanement','pdf instantane','soumission instantanee'], response: `Oui, chaque soumission génère un PDF en temps réel, accessible immédiatement dans votre tableau de bord.` },
  { tags: ['tableau de bord','dashboard','espace admin','interface admin','back office'], response: `Votre tableau de bord centralise tous vos formulaires, soumissions et statistiques en un seul endroit.` },
  { tags: ['qr code imprimer','imprimer qr','plastifier qr','coller qr','afficher qr','qr code chantier'], response: `Chaque formulaire génère un QR code téléchargeable. Imprimez-le, plastifiez-le et collez-le sur site.` },
  { tags: ['pas besoin compte terrain','compte ouvriers','ouvriers sans compte','equipe sans inscription'], response: `Vos équipes terrain n'ont pas besoin de compte BTPForms. Un lien ou QR code suffit.` },
  { tags: ['soumissions illimitees','soumissions illimitées','formulaires illimites','illimité soumissions'], response: `Le plan Entreprise propose des soumissions illimitées chaque mois.` },
  { tags: ['workspace multiple','plusieurs espaces','multi workspace','espace de travail multiple'], response: `Vous pouvez créer plusieurs espaces de travail pour séparer vos projets, chantiers ou activités.` },
  { tags: ['integration logiciel','connecter logiciel','api logiciel','webhook btpforms','synchronisation'], response: `Les App connexions permettent de synchroniser BTPForms avec vos outils existants via API ou webhook.` },
  { tags: ['cerfa btpforms','formulaire officiel','document reglementaire','conformite doc'], response: `Importez n'importe quel PDF officiel ou CERFA et ajoutez-y des champs numériques interactifs.` },
  { tags: ['prise en main rapide','onboarding rapide','demarrer vite','operationnel rapidement','15 minutes'], response: `La prise en main prend moins de 15 minutes. Upload votre PDF, posez vos champs, publiez — c'est tout.` },
  { tags: ['artisan btpforms','artisan numerique','artisan tablette','petit chantier btpforms'], response: `BTPForms est idéal pour les artisans qui veulent un outil simple, rapide et sans infrastructure complexe.` },
  { tags: ['grand chantier','gros chantier','chantier important','grand projet btp'], response: `BTPForms s'adapte aussi bien aux petits chantiers qu'aux grands projets multi-équipes.` },
  { tags: ['sous traitant','sous-traitant','prestataire chantier','co-traitant'], response: `Vos sous-traitants peuvent remplir vos formulaires via lien ou QR code, sans créer de compte.` },
  { tags: ['mot de passe formulaire','formulaire prive','acces restreint','formulaire protege'], response: `Vous pouvez protéger un formulaire par mot de passe pour en restreindre l'accès.` },
  { tags: ['sauvegarder automatiquement','sauvegarde auto','auto save','brouillon formulaire'], response: `Les soumissions sont sauvegardées automatiquement dès leur envoi.` },
  { tags: ['relancer','rappel remplissage','notifier equipe','alerte soumission'], response: `Vous pouvez partager de nouveau le lien ou QR code pour relancer vos équipes.` },
  { tags: ['nombre formulaires','combien formulaires possibles','limite formulaires','max formulaires'], response: `Il n'y a pas de limite sur le nombre de formulaires créés. Les limites portent uniquement sur les soumissions mensuelles.` },
  { tags: ['export csv','export excel','exporter donnees','extraction donnees','data export'], response: `Les données de soumissions sont exportables en PDF. Un export CSV/Excel est prévu dans les prochaines versions.` },
  { tags: ['multi langue','anglais btpforms','langue formulaire','traduction formulaire'], response: `Les formulaires peuvent être rédigés dans la langue de votre choix selon vos besoins.` },
  { tags: ['logo entreprise','personnalisation logo','branding formulaire','couleur formulaire','identite visuelle'], response: `Vous pouvez personnaliser vos formulaires avec votre logo et vos couleurs d'entreprise.` },
  { tags: ['notification email','alerte email','email soumission','notif soumission'], response: `Vous pouvez être notifié par email à chaque nouvelle soumission.` },
  { tags: ['archiver formulaire','archivage formulaire','garder historique','conservation formulaires'], response: `Toutes les soumissions sont archivées indéfiniment dans votre espace, filtrables par date.` },
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
