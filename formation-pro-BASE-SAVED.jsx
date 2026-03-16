import { useState, useRef, useEffect } from "react";

const KB = {
  organisme:`🏢 CRÉER TON ORGANISME\n\n1. Auto-entreprise (gratuit, 3-7 jours)\n   → autoentrepreneur.urssaf.fr · Code APE : 85.59A\n\n2. 1ère formation obligatoire avant DREETS\n   → 2h min · programme + émargement + attestation + facture\n\n3. Déclarer DREETS (gratuit, 30 jours)\n   → mon.formationprofessionnelle.fr · Cerfa n°10782\n\n4. NDA reçu automatiquement\n   → Format IDF : 11 75 XXXXX 75\n\n5. Qualiopi mois 3-4 (1500-3000€)\n   → Obligatoire pour CPF / OPCO\n\n💡 Coût total démarrage : 0€`,
  cpf:`🔍 FORMATIONS CPF EN IDF\n\n🧯 SST Sauveteur Secouriste — 2j — 250-400€ — ✅ CPF\n🚪 Incendie — 1j — 150-300€\n🏗️ Travail en Hauteur — 1j — 200-350€\n🤝 Gestion des Conflits — 1-2j — 400-800€ — ✅ CPF\n🎓 Formateur FPA — 2-5j — 800-1500€ — ✅ CPF\n🧘 Gestes PRAP — 2j — 300-500€ — ✅ CPF\n💬 CNV — 2j — 500-1500€ — ✅ CPF\n\n→ moncompteformation.gouv.fr\n\n💡 Avec 1500€ CPF :\nCNV (600€) + SST (300€) + Gestes PRAP (400€) = 1300€\nReste 200€ pour matériel pédagogique`,
  vente:`💬 EMAIL PROSPECTION\n\nObjet : Formation conflits — [Ville]\n\nBonjour [Prénom],\nFormateur en IDF · sensibilisation 3h :\n« Gestion des conflits en entreprise »\n\n• CNV/OSBD · Posture assertive\n• Outils applicables dès le lendemain\n\nPrésentiel · 8-12 pers. · 1200€ HT\n15 min cette semaine ?\n[Nom] — NDA : 11 75 XXXXX 75`,
  "5000":`🎯 ROADMAP 5000€/MOIS\n\nMois 1 → SIRET + DREETS + 1ère formation\nMois 2 → NDA + 30 emails + 1ère session\nMois 3-4 → 3-5 sessions/mois + OPCO\nMois 5-6 → Qualiopi + CPF + e-learning\n\n4 sessions × 1200€ = 4800€/mois`,
  documents:`📄 DOCUMENTS OBLIGATOIRES\n\nAVANT la formation :\n✅ Convention de formation\n✅ Programme remis au stagiaire\n\nPENDANT :\n✅ Feuille d'émargement (matin + après-midi)\n\nAPRÈS :\n✅ Attestation de fin de formation\n✅ Questionnaire de satisfaction\n✅ Facture mention TVA exonérée`,
  qualiopi:`✅ CERTIFICATION QUALIOPI\n\nObligatoire pour : CPF · OPCO · France Travail\nÀ viser : mois 3-4 après quelques formations\n\nProcessus :\n1. Choisir certificateur (Bureau Veritas, Afnor, ICPF)\n2. Audit blanc (auto-évaluation)\n3. Audit de certification (1 jour)\n4. Certificat valable 3 ans\n\nCoût : 1500-3000€ · Délai : 2-4 mois\n\n8 critères évalués : information, objectifs, adaptation,\naccompagnement, compétences, sous-traitance,\naccessibilité, amélioration`,
  sst:`🧯 SST — SAUVETEUR SECOURISTE DU TRAVAIL\n\n• Durée : 2 jours (14h) · ✅ CPF éligible\n• Prix : 250-400€\n• Certification : INRS / Croix-Rouge\n• Recyclage MAC SST : 7h tous les 24 mois\n\nContenu : Protéger · Alerter · Secourir\n→ RCP · PLS · Heimlich · DAE\n\nBusiness :\n→ Devenir formateur SST agréé\n→ Facturer 600-1200€/session entreprise\n→ Centres : FMS Saint-Denis · FIRE Sarcelles`,
  tarifs:`💰 GRILLE TARIFAIRE\n\nStandard :\nSensibilisation 3h (8-12 pers.) : 1200€ HT\nFormation 1 jour               : 2400€ HT\nFormation 2 jours              : 4200€ HT\nCoaching manager               :  250€/h\nE-learning                     : 79-149€/pers\n\nSport & Mental :\nMindset Champion (4h)          : 1800€ HT\nDépression Champion (3h)       : 2000€ HT\nVie Saine Après (3h)           : 1500€ HT\nELITE 360° (2 jours)           : 4500€ HT\nCoaching athlète               :  350-500€/h\n\n→ 4 sessions × 1200€ = 4800€/mois`,
  cnv:`💬 FORMATION CNV\n\nCommunication Non Violente — Marshall Rosenberg\n✅ CPF éligible · Certification disponible\n\nOù se former :\n→ La Coop CNV : lacoopcnv.com (⭐ 100% réussite)\n→ CNV Formations : cnvformations.fr (modules 1/2/3)\n→ M2I Formation : 1595€ · 2 jours\n\n4 étapes OSBD :\n1. Observation (sans jugement)\n2. Sentiment (ce que je ressens)\n3. Besoin (ce dont j'ai besoin)\n4. Demande (concrète et réalisable)\n\nCertification CPF : "Dialoguer avec la CNV pour mieux coopérer"`,
  dreets:`🏛️ DREETS — DÉCLARATION D'ACTIVITÉ\n\nDRRETS = Direction Régionale de l'Économie,\nde l'Emploi, du Travail et des Solidarités\n\n→ Déclarer APRÈS ta 1ère formation, AVANT de facturer\n→ Délai : 3 mois après ta 1ère convention signée\n→ Site : mon.formationprofessionnelle.fr\n→ Formulaire : Cerfa n°10782\n\nDocuments à joindre :\n• SIRET / Kbis\n• Programme de la 1ère formation\n• Feuille d'émargement signée\n• CV du formateur\n• Facture de la 1ère prestation\n\nDélai traitement : 30 jours · Coût : 0€`,
  nda:`📋 NDA — NUMÉRO DE DÉCLARATION D'ACTIVITÉ\n\nLe NDA est attribué automatiquement après validation\nde ta déclaration DREETS.\n\nFormat IDF : 11 75 XXXXX 75\n\nObligatoire sur :\n✅ Toutes tes factures\n✅ Conventions de formation\n✅ Supports pédagogiques\n✅ Programme remis aux stagiaires\n\nSans NDA → illégal de facturer des formations\n\nPas besoin de Qualiopi pour débuter,\nmais obligatoire pour CPF/OPCO`,
  opco:`💼 FINANCEMENT OPCO\n\nOPCO = Opérateur de Compétences\nChaque entreprise cotise selon son secteur\n\nComment ça marche :\n1. Ton client identifie son OPCO\n2. Tu envoies convention + programme AVANT\n3. L'OPCO valide et finance (souvent 100%)\n4. Tu factures l'OPCO directement\n\nOPCO principaux IDF :\n• Atlas — banque, finance, assurance\n• Akto — hôtellerie, propreté, services\n• Constructys — BTP\n• Opco2i — industrie\n• AFDAS — culture, sport, médias\n\n💡 AFDAS finance les formations pour le secteur sport\n→ Parfait pour ton projet athlète !`,
  faq_sst:`🧯 FAQ — FORMATION SST\n\nQ: Quelle différence SST et PSC1 ?\n→ SST : pour salariés en entreprise (INRS)\n   PSC1 : grand public (Croix-Rouge)\n\nQ: Combien de SST par entreprise ?\n→ INRS recommande : 1 SST pour 10 salariés minimum\n\nQ: Combien dure la certification ?\n→ 24 mois. Recyclage MAC SST obligatoire : 7h\n\nQ: Je peux devenir formateur SST ?\n→ Oui, après MAC SST + agrément organisme agréé INRS\n\nQ: Centres SST proches ?\n→ FMS Saint-Denis (01 48 20 10 00) ✅ CPF\n→ F.I.R.E. Sarcelles (fire-formations.com) ✅ CPF\n→ ALERTIS Saint-Denis (01 84 60 08 20) ✅ CPF\n→ Protectup 93/95 (01 48 35 12 00) ✅ CPF`,
  faq_incendie:`🔥 FAQ — FORMATION INCENDIE\n\nQ: Combien de temps dure la formation ?\n→ Sensibilisation : 2-4h\n   Formation complète : 1 jour\n\nQ: Qui peut dispenser cette formation ?\n→ Formateur. Pour extincteurs : agrément CNPP ou SDIS recommandé\n\nQ: Est-ce obligatoire en entreprise ?\n→ Oui. Code du travail Art. R4227-38 :\n   exercice d'évacuation annuel obligatoire\n\nQ: Combien facturer ?\n→ Sensibilisation 3h : 600-1000€\n   Journée complète : 1800-2400€\n\nQ: Centres proches ?\n→ FMS Saint-Denis (01 48 20 10 00)\n→ ALERTIS Saint-Denis (01 84 60 08 20)\n→ F.I.R.E. Sarcelles (fire-formations.com)`,
  faq_conflits:`🤝 FAQ — GESTION DES CONFLITS\n\nQ: Agrément nécessaire ?\n→ Non ! Pas d'agrément obligatoire.\n   Expertise en management/RH suffit.\n\nQ: Qui achète cette formation ?\n→ DRH, responsables formation, managers, collectivités\n\nQ: Financement CPF possible ?\n→ Oui avec certification RS (Répertoire Spécifique)\n   enregistrée à France Compétences\n\nQ: Combien de personnes par session ?\n→ 8-12 participants optimal · Max 15\n\nQ: Contenu incontournable ?\n→ CNV · Méthode OSBD · Jeux de rôle\n   Études de cas · Plan d'action`,
  faq_cpf:`💳 FAQ — COMPTE PERSONNEL DE FORMATION\n\nQ: Combien ai-je sur mon CPF ?\n→ Vérifie sur moncompteformation.gouv.fr\n   (connexion FranceConnect)\n\nQ: Comment accumuler des droits ?\n→ 500€/an (temps plein) · 800€/an (peu qualifiés)\n   Plafond 5000€ (ou 8000€)\n\nQ: Ma formation est-elle éligible CPF ?\n→ Elle doit avoir une certification inscrite\n   au RNCP ou RS (Répertoire Spécifique)\n\nQ: Qualiopi obligatoire pour le CPF ?\n→ Oui, depuis janvier 2022.\n\nQ: Délai entre inscription et formation CPF ?\n→ Minimum 11 jours ouvrés`,
  faq_qualiopi:`✅ FAQ — QUALIOPI\n\nQ: Qualiopi coûte combien ?\n→ Entre 1500€ et 3000€ selon le certificateur\n\nQ: Quels certificateurs ?\n→ Bureau Veritas, AFNOR, ICPF, Certifopac, SGS\n\nQ: Faut-il Qualiopi pour débuter ?\n→ Non ! Tu peux facturer sans Qualiopi.\n   Obligatoire seulement pour CPF/OPCO/France Travail\n\nQ: Durée de préparation ?\n→ 2-4 mois + 1 jour d'audit\n\nQ: Quand viser Qualiopi ?\n→ Mois 3-4, après quelques formations réalisées`,
  faq_postures:`🧘 FAQ — GESTES & POSTURES\n\nQ: Agrément nécessaire ?\n→ Non pour sensibilisation simple.\n   PRAP certifiante : certification INRS recommandée\n\nQ: Qui a besoin de cette formation ?\n→ Logistique, BTP, santé, aide à domicile,\n   bureaux avec travail prolongé\n\nQ: Combien facturer ?\n→ Sensibilisation 3h : 600-900€\n   Formation PRAP complète : 1500-2000€\n\nQ: Argument ROI pour les entreprises ?\n→ Étude INRS : 1€ investi = 2,20€ économisés\n   TMS = 1ère cause de maladie pro en France (87%)\n\nQ: Centres proches ?\n→ ALERTIS Saint-Denis ✅ CPF\n→ Protectup 93/95 ✅ CPF`,
};

function detect(t) {
  const s = t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  if (s.match(/organisme|siret|creer|urssaf|demarrer|auto.?entrepreneur/)) return "organisme";
  if (s.match(/faq.*cpf|question.*cpf|eligible|combien.*cpf/)) return "faq_cpf";
  if (s.match(/cpf|compte personnel|mon compte formation|solde/)) return "cpf";
  if (s.match(/vendre|vente|script|prospecter|email/)) return "vente";
  if (s.match(/5000|revenu|rentable|objectif.*mois/)) return "5000";
  if (s.match(/document|attestation|convention|emargement/)) return "documents";
  if (s.match(/faq.*qualiopi|question.*qualiopi/)) return "faq_qualiopi";
  if (s.match(/qualiopi|certifi|audit/)) return "qualiopi";
  if (s.match(/faq.*sst|question.*sst|question.*secours/)) return "faq_sst";
  if (s.match(/sst|secouriste|premiers secours/)) return "sst";
  if (s.match(/faq.*incendie|question.*incendie/)) return "faq_incendie";
  if (s.match(/incendie|feu|extincteur|evacuation/)) return "faq_incendie";
  if (s.match(/faq.*conflit|question.*conflit/)) return "faq_conflits";
  if (s.match(/faq.*posture|question.*posture|tms/)) return "faq_postures";
  if (s.match(/cnv|communication non.?violente/)) return "cnv";
  if (s.match(/conflit/)) return "faq_conflits";
  if (s.match(/dreets|declaration.?activite/)) return "dreets";
  if (s.match(/nda|numero.?declaration/)) return "nda";
  if (s.match(/opco|financement/)) return "opco";
  if (s.match(/tarif|prix|facturer|combien/)) return "tarifs";
  return null;
}

async function webSearch(q) {
  try {
    const r = await fetch("https://api.duckduckgo.com/?q="+encodeURIComponent(q+" formation professionnelle France")+"&format=json&no_html=1&skip_disambig=1");
    const d = await r.json();
    const p = [];
    if (d.Answer) p.push(d.Answer);
    if (d.AbstractText?.length>30) p.push(d.AbstractText.slice(0,350));
    (d.RelatedTopics||[]).slice(0,2).forEach(t=>{ if(t.Text?.length>10) p.push("• "+t.Text.slice(0,120)); });
    return p.length ? p.join("\n\n") : null;
  } catch { return null; }
}

const LIBRARY = [
  {id:"fms",name:"FMS — Formation Management Sécurité",zone:"Saint-Denis",dist:"0 km",adresse:"175 Bd Anatole France, 93200 Saint-Denis",tel:"01 48 20 10 00",web:"fms-formation.com",qualiopi:true,cpf:true,formations:["SST / MAC SST","Incendie / Évacuation","SSIAP 1/2/3","Gestes & Postures","Travail en Hauteur","TFP-APS"],note:"7 salles · 480m² · Face métro L13 Carrefour Pleyel.",color:"#C9A84C"},
  {id:"alertis",name:"ALERTIS",zone:"Saint-Denis",dist:"0 km",adresse:"Saint-Denis 93 (intra)",tel:"01 84 60 08 20",web:"alertis.fr",qualiopi:true,cpf:true,formations:["SST / MAC SST","Gestes & Postures","Incendie","PRAP IBC & 2S","Risques Psychosociaux","TMS Prévention"],note:"Pédagogie interactive. Intra-entreprise uniquement.",color:"#E05555"},
  {id:"dataos",name:"DATAOS",zone:"Saint-Denis",dist:"0 km",adresse:"Saint-Denis 93 (face Mairie)",tel:"01 83 62 52 49",web:"dataos.com",qualiopi:true,cpf:true,formations:["SST / MAC SST","SSIAP 1/2/3","TFP-APS Agent Sécurité","PSGE Grands Événements"],note:"CPF · France Travail · Région IDF. Avis Google excellents.",color:"#4A7CFF"},
  {id:"fiducial",name:"FIDUCIAL FPSG ⭐",zone:"Saint-Denis",dist:"1 km",adresse:"Près Stade de France, 93200 Saint-Denis",tel:"01 49 21 15 15",web:"fiducial-fpsg.fr",qualiopi:true,cpf:true,formations:["SST","Incendie / Évacuation","Gestes & Postures","Gestion des Conflits 7h","Travail en Hauteur","SSIAP 1/2/3"],note:"2700m² · Propose Gestion des conflits 7h · Proche de toi !",color:"#4CAF82",highlight:true},
  {id:"pointbleu",name:"Point Bleu Formation",zone:"Saint-Denis",dist:"1 km",adresse:"2 Allée de Seine, 93200 Saint-Denis",tel:"01 48 09 23 45",web:"pointbleu-formation.fr",qualiopi:true,cpf:true,formations:["SST / MAC SST","Incendie / Extincteurs","Évacuation Guide-File","Gestes & Postures","Travail en Hauteur","Habilitation Électrique"],note:"35 ans d'expérience · Agréments INRS, UFACS.",color:"#8B5CF6"},
  {id:"spformation",name:"Sécurité Premium Formation",zone:"Saint-Denis",dist:"0-10 km",adresse:"Interventions 93 intra-entreprise",tel:"05 49 01 61 23",web:"spformation.fr",qualiopi:true,cpf:false,formations:["SST / MAC SST","Gestes & Postures PRAP","Incendie","Hauteur","Gestion Conflits","Risques Psychosociaux"],note:"Formateurs anciens SDIS/BSPP · Intra uniquement.",color:"#F59E0B"},
  {id:"protectup",name:"Protectup Formation",zone:"Saint-Denis / 95",dist:"0-15 km",adresse:"93 & Val d'Oise (95)",tel:"01 48 35 12 00",web:"protectup.fr",qualiopi:true,cpf:true,formations:["SST / MAC SST","CACES R486 Nacelles","CACES R489 Chariots","Incendie","Gestes & Postures","Formation Formateurs SST"],note:"Académie des formateurs intégrée. Formation de formateurs.",color:"#06B6D4"},
  {id:"fire",name:"F.I.R.E. Formations ⭐",zone:"Sarcelles",dist:"8 km",adresse:"Sarcelles, 95200",tel:"Sur site web",web:"fire-formations.com",qualiopi:true,cpf:true,formations:["SST / Secourisme","Incendie & Évacuation","Gestion du Stress","Habilitation Électrique H0B0","Risques Psychosociaux"],note:"⭐ Très bien noté · Formateurs passionnés · Franprix partenaire.",color:"#EF4444",highlight:true},
  {id:"tvf95",name:"Trouvez Votre Formation 95",zone:"Sarcelles / Val d'Oise",dist:"8 km",adresse:"Sarcelles & Cergy-Pontoise (95)",tel:"01 60 06 08 10",web:"trouvezvotreformation.com",qualiopi:true,cpf:true,formations:["SST / MAC SST","CACES R489 Chariots","CACES R486 Nacelles","Gestes & Postures PRAP","Travail en Hauteur","Formation Formateurs"],note:"Multi-centres 95. CPF. CACES + sécurité + formateurs.",color:"#10B981"},
  {id:"afps",name:"AFPS — Prévention & Secourisme",zone:"Val d'Oise (Osny)",dist:"12 km",adresse:"Osny, Val d'Oise 95",tel:"01 30 31 68 00",web:"afpsecourisme.fr",qualiopi:true,cpf:true,formations:["SST / MAC SST","Gestes & Postures","Habilitation Électrique","Incendie / Extincteurs"],note:"Inter-entreprises en salle (Osny) + intra. Tarifs attractifs.",color:"#0EA5E9"},
  {id:"pc95",name:"Protection Civile Val d'Oise",zone:"Val d'Oise 95",dist:"10 km",adresse:"Val d'Oise, 95",tel:"01 34 20 10 20",web:"val-doise.protection-civile.org",qualiopi:false,cpf:true,formations:["PSC1 Premiers Secours","SST","PSE1 Secourisme"],note:"Associatif · CPF éligible · Formation citoyenne.",color:"#6366F1"},
  {id:"coopcnv",name:"La Coop CNV ⭐",zone:"Paris / Distanciel",dist:"En ligne",adresse:"Paris + interventions IDF",tel:"Sur site web",web:"lacoopcnv.com",qualiopi:true,cpf:true,formations:["CNV Communication Non Violente","Certification CPF CNV","Médiation CNV","Prévention Conflits"],note:"⭐ 100% réussite certification · 4.69/5 · 30 formateurs certifiés.",color:"#C9A84C",highlight:true},
  {id:"m2icnv",name:"M2I Formation — CNV",zone:"Paris / Distanciel",dist:"En ligne",adresse:"Paris La Défense + en ligne",tel:"01 84 16 00 26",web:"m2iformation.fr",qualiopi:true,cpf:true,formations:["CNV Communication Non Violente","Gestion des Conflits","Communication Interpersonnelle"],note:"2 jours · 1595€ HT · CPF · Classes à distance.",color:"#8B5CF6"},
  {id:"cnvformations",name:"CNV Formations (ACNV)",zone:"Paris / National",dist:"En ligne",adresse:"Paris + formateurs IDF",tel:"Sur site web",web:"cnvformations.fr",qualiopi:true,cpf:true,formations:["CNV Module 1 — Bases","CNV Module 2 — Approfondissement","CNV Module 3 — Expert","Certification CPF"],note:"Référence nationale CNV · Modules 1/2/3 · 100+ formateurs.",color:"#F59E0B"},
];

const CATS = ["Tous","✅ CPF","Saint-Denis","Sarcelles","SST / Secours","Incendie","Gestes & Postures","Conflits / CNV","⭐ Top","Sauvegardés"];
function matchCat(f,cat,saved) {
  if (cat==="Tous") return true;
  if (cat==="✅ CPF") return f.cpf;
  if (cat==="Sauvegardés") return !!saved[f.id];
  if (cat==="⭐ Top") return !!f.highlight;
  if (cat==="Sarcelles") return f.zone.includes("Sarcelles")||f.zone.includes("95")||f.zone.includes("Val d'Oise");
  if (cat==="Saint-Denis") return f.zone==="Saint-Denis"||f.zone.includes("93");
  const all = f.formations.join(" ").toLowerCase();
  if (cat==="SST / Secours") return all.includes("sst")||all.includes("secours");
  if (cat==="Incendie") return all.includes("incendie")||all.includes("évacuation");
  if (cat==="Gestes & Postures") return all.includes("geste")||all.includes("posture")||all.includes("prap");
  if (cat==="Conflits / CNV") return all.includes("conflit")||all.includes("cnv")||all.includes("stress");
  return true;
}

const ALL_FORMATIONS = [
  {id:"conflits",icon:"🤝",title:"Gestion des Conflits",subtitle:"Sensibilisation 3h",price:"1 200€ HT",color:"#C9A84C",cat:"standard",
   tagline:"Transformer les tensions en leviers de performance collective",
   public:"Managers, équipes RH, collaborateurs — tout secteur",
   legal:"Aucun agrément obligatoire. Certification RS possible pour CPF.",
   objectifs:["Identifier les 3 types de conflits en entreprise","Comprendre les 4 stades d'escalade d'un conflit","Maîtriser la méthode OSBD de la CNV","Adopter une posture assertive face aux tensions","Construire un plan d'action préventif personnel"],
   modules:[
     {num:"01",title:"Introduction — Le Conflit",duree:"20 min",contenu:"Tour de table · Définition : conflit ≠ désaccord · Les 3 types : personnes, rôles, intérêts · Impact : jusqu'à 30% de perte de productivité · Auto-évaluation profil",methode:"Brise-glace · Discussion guidée"},
     {num:"02",title:"Comprendre les Mécanismes",duree:"50 min",contenu:"Les 4 stades d'escalade · Les déclencheurs : stress, rôles flous · La CNV (Marshall Rosenberg) : OSBD · 3 postures : Fuite / Attaque / Assertivité",methode:"Apport théorique · Exemples concrets"},
     {num:"03",title:"Pratique — Outils Concrets",duree:"50 min",contenu:"Reformulation active en binôme avec OSBD · Jeu de rôle A : manager/collaborateur sous pression · Jeu de rôle B : conflit entre collègues · Carte des émotions · Débriefing",methode:"Jeux de rôle · Feedback croisé"},
     {num:"04",title:"Études de Cas Réels",duree:"30 min",contenu:"Cas 1 : conflit silencieux — collègues qui ne se parlent plus · Cas 2 : collaborateur agressif · Questions : stade, erreurs, actions · Restitution en sous-groupes",methode:"Travail en sous-groupes · Discussion"},
     {num:"05",title:"Évaluation & Plan d'Action",duree:"30 min",contenu:"Quiz QCM 10 questions (≥ 7/10) · Fiche plan d'action : 3 changements dès demain · Tour de table · Attestations",methode:"QCM · Fiche individuelle · Attestation"},
   ],
   materiel:["Vidéoprojecteur","Paperboard","Fiches OSBD plastifiées","Roue des émotions","Scénarios jeux de rôle"],
   livrables:["Programme","Feuille d'émargement","Attestation","Questionnaire satisfaction","Fiche plan d'action"],
   tarifs:{"Groupe 8-12 pers.":"1 200€ HT","Journée complète":"2 400€ HT","Coaching individuel":"250€/h"},
   arguments:["Tous les managers en ont besoin — marché énorme","Aucun agrément → démarrer immédiatement","Facile à vendre aux DRH","Upsell : module 2 jours à 2400€"],
  },
  {id:"incendie",icon:"🔥",title:"Évacuation & Incendie",subtitle:"Sensibilisation 3h",price:"900€ HT",color:"#E05555",cat:"standard",
   tagline:"Préparer chaque salarié à agir vite et bien face au feu",
   public:"Tout salarié — obligatoire légalement dans toutes les entreprises",
   legal:"Art. R4227-38 Code du travail : exercice évacuation annuel obligatoire. Agrément CNPP ou SDIS recommandé pour manipulation extincteurs.",
   objectifs:["Connaître la réglementation incendie applicable","Comprendre les rôles de guide-file et serre-file","Coordonner une évacuation rapide et sécurisée","Utiliser correctement un extincteur","Identifier et signaler les risques incendie"],
   modules:[
     {num:"01",title:"Réglementation & Obligations",duree:"25 min",contenu:"Code du travail : obligations employeur · Catégories ERP · Plan de prévention incendie · L'exercice annuel obligatoire · Sanctions en cas de manquement",methode:"Présentation · Support visuel"},
     {num:"02",title:"Rôles & Responsabilités",duree:"40 min",contenu:"Guide-file : ouvrir les issues, diriger vers la sortie · Serre-file : fermer les portes, vérifier les présences · Équipier première intervention · La chaîne d'alerte · Point de rassemblement",methode:"Présentation · Mise en situation verbale"},
     {num:"03",title:"Procédures d'Évacuation",duree:"35 min",contenu:"Lecture du plan d'évacuation · Issues de secours · Déclenchement alarme · Gestion PMR · Conduite en cas de fumée : rester bas · Interdits : ascenseur, revenir en arrière",methode:"Exercice pratique sur plan · Simulation partielle"},
     {num:"04",title:"Manipulation des Extincteurs",duree:"30 min",contenu:"Classes de feu : A (solides), B (liquides), C (gaz) · Types extincteurs : eau, CO2, poudre · Technique PASS : Pointer, Actionner, Balayer, Stopper · Distances de sécurité",methode:"Démonstration · Manipulation si extincteur dispo"},
     {num:"05",title:"Bilan & Plan d'Action",duree:"10 min",contenu:"Quiz de validation · Points d'amélioration dans leurs locaux · Plan d'action collectif · Attestations",methode:"QCM · Débriefing · Attestation"},
   ],
   materiel:["Extincteur de démonstration","Plans d'évacuation du site","Vidéoprojecteur","Signalétique de sécurité"],
   livrables:["Programme","Feuille d'émargement","Attestation","Questionnaire satisfaction","Fiche réflexe évacuation"],
   tarifs:{"Groupe 8-15 pers.":"900€ HT","Journée + extincteurs réels":"1 800€ HT","Renouvellement annuel":"600€ HT"},
   arguments:["Toutes les entreprises sont légalement obligées","Très facile à vendre : mise en conformité immédiate","Package possible : Incendie + SST = journée 2500€","Renouvellement annuel = client récurrent garanti"],
  },
  {id:"postures",icon:"🧘",title:"Gestes & Postures",subtitle:"Sensibilisation 3h",price:"900€ HT",color:"#4CAF82",cat:"standard",
   tagline:"Prévenir les TMS et réduire l'absentéisme dès aujourd'hui",
   public:"Logistique, BTP, santé, aide à domicile, bureaux — tout secteur avec effort physique",
   legal:"PRAP : certification INRS recommandée. Aucun agrément obligatoire pour sensibilisation.",
   objectifs:["Comprendre les mécanismes des TMS (Troubles Musculo-Squelettiques)","Identifier les postures et gestes à risque","Appliquer les principes d'économie articulaire","Maîtriser les techniques de manutention manuelle sécurisée","Proposer des améliorations ergonomiques concrètes"],
   modules:[
     {num:"01",title:"Introduction aux TMS",duree:"25 min",contenu:"TMS = 1ère cause de maladie professionnelle en France (87% des MP) · Zones touchées : dos, épaules, poignets · Facteurs de risque physiques, organisationnels, psychosociaux · Coût : absentéisme et turnover",methode:"Présentation · Auto-évaluation posture"},
     {num:"02",title:"Anatomie & Biomécanique",duree:"35 min",contenu:"La colonne vertébrale : 3 courbures à préserver · Pression selon postures : debout 100 / assis droit 140 / penché 180+ · Articulations sensibles : épaules, poignets, genoux · Comprendre la fatigue musculaire",methode:"Schémas anatomiques illustrés"},
     {num:"03",title:"Techniques de Manutention",duree:"50 min",contenu:"Principes d'économie articulaire : dos droit, charges proches du corps, genoux fléchis · Lever de charge en 5 étapes · Manutention en équipe · Aides techniques : transpalette, chariot · Exercices pratiques",methode:"Démonstration · Pratique en binôme · Corrections"},
     {num:"04",title:"Ergonomie du Poste",duree:"30 min",contenu:"Bureau : réglage siège, écran à hauteur des yeux, clavier-souris · Poste debout : antifatigue, hauteur plan de travail · Pauses actives : 3 min toutes les heures · Check-list auto-évaluation poste",methode:"Audit express · Fiche d'amélioration individuelle"},
     {num:"05",title:"Engagement & Suivi",duree:"10 min",contenu:"Quiz de validation · 3 changements dès demain · Guide étirements offert · Attestations",methode:"QCM · Fiche d'engagement · Guide offert · Attestation"},
   ],
   materiel:["Cartons de différents poids (5-15kg)","Espace dégagé pour pratique","Vidéoprojecteur","Fiches anatomiques","Bureau et chaise pour démo ergonomie"],
   livrables:["Programme","Feuille d'émargement","Attestation","Questionnaire satisfaction","Fiche auto-évaluation poste","Guide étirements A4"],
   tarifs:{"Groupe 8-15 pers.":"900€ HT","Formation PRAP complète":"2 000€ HT","Audit poste de travail":"600€"},
   arguments:["ROI prouvé : 1€ investi en prévention TMS = 2,20€ économisés (INRS)","TMS = 1ère cause de maladie pro → argument fort pour DRH","Upsell : formation PRAP certifiante à 2000€","Secteurs obligés : logistique, BTP, santé"],
  },
  {id:"sst",icon:"🧯",title:"SST — Premiers Secours",subtitle:"Formation initiale 14h (2 jours)",price:"1 500€ HT",color:"#4A7CFF",cat:"standard",
   tagline:"Former les acteurs de sécurité qui protègent vraiment leur équipe",
   public:"Tout salarié. 1 SST pour 10 salariés recommandé (INRS). Certification 24 mois.",
   legal:"Formation certifiante INRS/Croix-Rouge. Pour devenir formateur SST : agrément INRS obligatoire.",
   objectifs:["Maîtriser la conduite à tenir face à un accident du travail","Effectuer un bilan et alerter efficacement","Pratiquer les gestes de secours sur mannequin","Utiliser un défibrillateur automatisé (DAE)","Contribuer à la prévention des risques en entreprise"],
   modules:[
     {num:"01",title:"Le Sauveteur Secouriste",duree:"20 min",contenu:"Rôle et cadre juridique du SST · La chaîne des secours · 3 missions : Protéger, Alerter, Secourir · Accidents du travail les plus fréquents · Responsabilité du SST",methode:"Présentation · Vidéos"},
     {num:"02",title:"Protéger & Alerter",duree:"40 min",contenu:"Examiner la situation : dangers (électricité, feu, gaz) · Supprimer ou isoler · Baliser · Alerte : 15 (SAMU), 18 (Pompiers), 112 · Informations à transmettre : lieu, nature, nombre, état",methode:"Exercice d'alerte téléphonique en binôme"},
     {num:"03",title:"Secourir — Gestes Essentiels",duree:"90 min",contenu:"Bilan : conscience → respiration → circulation · Victime inconsciente respire : PLS · Ne respire pas : RCP (30 compressions + 2 insufflations, 100-120/min) · Saignement : compression directe 10 min · Obstruction : Heimlich adulte / 5 claques + 5 compressions enfant · Brûlures : eau froide 15 min",methode:"Démonstration · Entraînement mannequin adulte + enfant · Rotation binômes"},
     {num:"04",title:"Défibrillateur (DAE)",duree:"30 min",contenu:"Fibrillation ventriculaire : pourquoi le cœur s'emballe · Localiser les DAE · Séquence : RCP → DAE → continuer jusqu'à secours · Utilisation pas à pas : mise en marche, électrodes, analyse, choc · Cas particuliers : enfant, grossesse, implant",methode:"Démonstration · Pratique DAE formation · Chaque participant s'entraîne"},
     {num:"05",title:"Prévention & Certification",duree:"20 min",contenu:"Accidents évitables dans le secteur · Signalement situations dangereuses · Document Unique (DUERP) · Quiz de validation · Remise certificats SST (24 mois)",methode:"Discussion · QCM · Certificat INRS/Croix-Rouge"},
   ],
   materiel:["Mannequin RCP adulte + enfant","DAE de formation","Trousse premiers secours","Matériel de balisage","Vidéoprojecteur"],
   livrables:["Programme","Feuille d'émargement","Certificat SST valable 24 mois","Questionnaire satisfaction","Fiche mémo gestes d'urgence"],
   tarifs:{"Groupe 8-12 pers. (2j)":"1 500€ HT","MAC SST recyclage (7h)":"700€ HT","Package Incendie + SST":"2 200€ HT"},
   arguments:["Obligation légale — toutes les entreprises","Recyclage obligatoire tous les 24 mois = client récurrent","Possible de devenir formateur SST agréé ensuite","Forte demande : BTP, logistique, santé, industrie"],
  },
  {id:"mindset",icon:"🧠",title:"Mindset de Champion",subtitle:"Performance mentale · 4h",price:"1 800€ HT groupe · 350€/h individuel",color:"#C9A84C",cat:"sport",
   tagline:"De la pensée limitante à la performance de haut niveau",
   public:"Sportifs haut niveau, équipes pro, académies, clubs Ligue 1 / Pro A",
   science:"Sources : Carol Dweck (Growth Mindset, Stanford 2006) · Csikszentmihalyi (Flow Theory) · NCAA Mental Health Study 2021 · Protocole USOC",
   objectifs:["Reprogrammer les croyances limitantes (neuroscience cognitivo-comportementale)","Maîtriser les outils de préparation mentale des équipes olympiques","Construire une routine pré-compétition individualisée","Gérer la pression, les échecs et les blessures avec résilience","Développer une identité d'athlète solide et durable"],
   modules:[
     {num:"01",title:"Le Cerveau de l'Athlète",duree:"45 min",contenu:"Neurosciences du sport : cortisol vs dopamine sous pression · Cerveau limbique vs cortex préfrontal · Théorie de l'éveil de Yerkes-Dodson · Auto-évaluation : profil mental (questionnaire AMS-3) · État de flow de Csikszentmihalyi",methode:"Présentation · Test profil mental",exemples:"Kobe Bryant (Mamba Mentality) · Steph Curry (routines) · Usain Bolt (visualisation)"},
     {num:"02",title:"Reprogrammer ses Croyances",duree:"60 min",contenu:"Growth Mindset (Carol Dweck, Stanford) : talent fixe vs capacité évolutive · Identifier tes croyances limitantes · Technique du reframing cognitif (TCC) · Affirmations d'identité : 'je SUIS' pas 'je veux' · Exercice : réécrire son histoire · Journal des victoires : 3 réussites/jour",methode:"Exercice individuel · Partage · Coaching collectif",exemples:"LeBron James — travail sur ses croyances depuis lycée · Simone Biles — reconstruction après trauma"},
     {num:"03",title:"Préparation Mentale Pratique",duree:"60 min",contenu:"Visualisation sportive : protocole Lang 2000 (activation cérébrale identique à la réalité) · Mindfulness en sport : étude JAMA 2014 (-43% anxiété compétitive) · Respiration 4-7-8 (Dr Andrew Weil) pour réduire le cortisol · Créer sa routine pré-match · Ancrage émotionnel positif",methode:"Pratique guidée · Visualisation collective · Création de sa routine perso",exemples:"Warriors (méditation collective) · Djokovic (breathing) · Nadal (rituels)"},
     {num:"04",title:"Résilience & Gestion de l'Échec",duree:"45 min",contenu:"Études : les athlètes qui réussissent échouent plus et apprennent plus vite · Reframer l'échec comme feedback · 3 réponses à l'adversité (Seligman) : permanence, généralisation, personnalisation · Technique après-match sans auto-destruction · Courbe psychologique de la blessure",methode:"Études de cas · Plan de résilience personnel",exemples:"Kevin Durant (3 Finals perdus) · Curry (draft pick 35 → MVP) · Derrick Rose (comeback)"},
     {num:"05",title:"Plan Mental Personnalisé",duree:"30 min",contenu:"Mental Performance Plan individuel (format NBA) · 3 habitudes à implémenter cette semaine · Bibliothèque de ressources recommandées · Journal de performance template · Questions-réponses · Attestations",methode:"Coaching express · Fiche MPP · Attestation",exemples:"Template inspiré des protocoles USOC · Warriors · Équipe de France Basketball"},
   ],
   materiel:["Vidéoprojecteur","Fiches 'Mental Performance Plan'","Tableau mind mapping","Musique de fond"],
   livrables:["Programme","Feuille d'émargement","Attestation","Fiche 'Mon Plan Mental'","Bibliothèque de ressources"],
   tarifs:{"Groupe 8-15 pers.":"1 800€ HT","Coaching individuel":"350€/h","Package saison (mensuel)":"800€/mois"},
   arguments:["35% des athlètes élites ont vécu anxiété/dépression (NCAA 2021)","Clubs NBA investissent 500K$/an en préparation mentale","AFDAS finance pour clubs pro du secteur sport — 0€ pour eux","Marché : clubs pro, académies, lycées sportifs, fédérations"],
  },
  {id:"depression",icon:"🌱",title:"La Dépression du Champion",subtitle:"Santé mentale athlète · 3h",price:"2 000€ HT groupe · 450€/h individuel",color:"#4CAF82",cat:"sport",
   tagline:"Sortir de l'ombre quand on a toujours été sous les projecteurs",
   public:"Athlètes pro, anciens sportifs en reconversion, staffs médicaux sportifs",
   science:"Sources : NCAA Study 2021 · British J Sports Med 2019 (Reardon & Factor) · IOC Consensus Statement 2019 · Protocoles NBA Mind Matters · Programme FIFPRO Player Care",
   objectifs:["Comprendre la dépression chez l'athlète : mécanismes spécifiques","Briser la culture du silence dans le sport de haut niveau","Identifier les signaux d'alerte en soi et chez ses coéquipiers","Connaître les ressources et outils de soutien disponibles","Construire un filet de sécurité émotionnel dans son équipe"],
   modules:[
     {num:"01",title:"La Face Cachée du Champion",duree:"40 min",contenu:"35% des athlètes élites ont vécu dépression ou anxiété (NCAA 2021) · La culture du 'sois fort' : origine et dégâts · Identité unique 'je suis mon sport' : fragilité · Différence tristesse / burn-out / dépression clinique · Les témoignages qui ont changé le sport mondial",methode:"Vidéos témoignages · Espace de parole sécurisé",exemples:"Kevin Love (lettre Players Tribune 2018) · DeMar DeRozan · Naomi Osaka · Simone Biles (JO 2021)"},
     {num:"02",title:"Neurobiologie & Facteurs de Risque",duree:"45 min",contenu:"Impact de la blessure sur l'identité (Br J Sports Med 2019) · 35% des retraités sportifs présentent des signes dépressifs dans les 2 ans · Corps qui arrête vs tête qui continue · Cycles saison/hors-saison et santé mentale · Surentraînement et dépression : le lien neurobiologique (cortisol chronique)",methode:"Apport théorique illustré · Auto-évaluation bienveillante",exemples:"André Agassi (Open autobiography) · Ricky Williams (NFL) · Metta World Peace"},
     {num:"03",title:"Sortir de l'Ombre — Outils",duree:"50 min",contenu:"Déconstruire la honte de demander de l'aide · Thérapies prouvées pour athlètes : TCC, EMDR (trauma sportif), ACT · Routine comme ancre émotionnelle · Alimentation, sommeil et santé mentale (Maughan 2020) · Méditation : méta-analyse 2014 JAMA (-38% anxiété) · À qui parler : psychologue du sport, INSEP",methode:"Atelier pratique · Exercice respiration · Carte du soutien",exemples:"Protocoles NBA Mind Matters · Équipes olympiques françaises"},
     {num:"04",title:"Aider Sans Remplacer le Spécialiste",duree:"30 min",contenu:"Reconnaître un coéquipier en détresse · Mots qui aident vs mots qui blessent · Règle des 3 présences : 'je suis là, j'écoute, je ne juge pas' · Culture du soutien dans l'équipe · Quand orienter vers un professionnel · Ressources : INSEP psy sport, MGEN sport",methode:"Jeux de rôle · Guide du bon soutien",exemples:"Programme NBA Mind Matters · Culture Équipe de France Basketball"},
     {num:"05",title:"Ma Boussole de Vie",duree:"15 min",contenu:"Identité plurielle : athlète ET être humain complet · Les 5 piliers : relations, santé, projets, valeurs, plaisir · Premier pas cette semaine · Ressources et contacts · Attestations",methode:"Fiche 'Ma Boussole de Vie' · Coaching collectif"},
   ],
   materiel:["Salle confidentielle et confortable","Fiches 'Ma Boussole de Vie'","Liste ressources santé mentale sportifs","Post-its"],
   livrables:["Programme","Feuille d'émargement","Attestation","Guide ressources santé mentale","Fiche 'Mon Plan de Vie'"],
   tarifs:{"Groupe 8-15 pers.":"2 000€ HT","Coaching individuel":"450€/h","Package staff médical":"1 200€/session"},
   arguments:["Aucun concurrent sur ce créneau ultra-spécifique","Fédérations ont obligation légale de suivi santé mentale","AFDAS finance pour clubs pro","Marché : INSEP, clubs Pro A/Ligue 1, staffs médicaux"],
  },
  {id:"vitalism",icon:"⚡",title:"Vie Saine Après la Performance",subtitle:"Reconversion & équilibre · 3h",price:"1 500€ HT groupe · 300€/h individuel",color:"#4A7CFF",cat:"sport",
   tagline:"Reconstruire une vie épanouissante après le sport d'élite",
   public:"Sportifs en reconversion, fin de carrière, clubs accompagnant leurs joueurs",
   science:"Sources : Lavallee (2005) sur la retraite sportive · Schlossberg Transition Model · Programme NFL Legends · NBA Alumni Transition Program",
   objectifs:["Réussir la transition identitaire : de l'athlète à l'être humain complet","Construire des routines saines sans le cadre du sport pro","Gérer nutrition, sommeil et activité physique hors compétition","Explorer ses compétences transférables et nouvelles voies","Créer un projet de vie concret et motivant post-carrière"],
   modules:[
     {num:"01",title:"Qui Suis-Je Sans le Sport ?",duree:"35 min",contenu:"Modèle de Schlossberg : 4S de la transition · Les 5 deuils de l'arrêt (identité, routine, statut, communauté, corps performant) · Exercice de la roue de la vie · Tes compétences cachées : discipline, résilience, leadership",methode:"Exercice de la roue de la vie · Mind mapping",exemples:"Tony Parker → entrepreneur · Teddy Riner → coach · Grant Hill → businessman"},
     {num:"02",title:"Le Corps Après la Performance",duree:"40 min",contenu:"Changements physiologiques après arrêt · Nutrition : de 4000 kcal/j à un régime équilibré · Gérer le poids sans se punir · Sport plaisir vs performance · Sommeil : reconstruction du rythme circadien · Vigilance : addictions post-sport",methode:"Apport expert · Plan d'activité plaisir · Autotest sommeil",exemples:"Protocoles NFL Legends · NBA Alumni Program"},
     {num:"03",title:"Reconstruire son Quotidien",duree:"45 min",contenu:"Structurer son temps : remplacer les entraînements · Nouvelle routine matinale · Réseau social : aller au-delà du vestiaire · Gestion financière (problème fréquent post-sport) · Les premières 90 jours : mode d'emploi",methode:"Construction de sa routine · Tableau de bord de vie"},
     {num:"04",title:"Explorer ses Nouvelles Voies",duree:"30 min",contenu:"Transfert de compétences vers les métiers · Formations courtes : formateur, coach, agent sportif, kiné · Entrepreneuriat sportif · Milieu associatif et transmission · Construire son personal branding post-sport",methode:"Bilan compétences express · Brainstorming orientations"},
     {num:"05",title:"Mon Plan 90 Jours",duree:"30 min",contenu:"Plan d'action 90 jours individualisé · 3 actions cette semaine · 3 objectifs à 30 jours · Vision à 1 an · Ressources et contacts · Attestations",methode:"Fiche 'Plan 90 jours' · Coaching express · Attestation",exemples:"Framework inspiré NBA/NFL Career Transition Programs"},
   ],
   materiel:["Fiches 'Roue de la Vie'","Fiches 'Plan 90 jours'","Post-its","Tableau blanc"],
   livrables:["Programme","Feuille d'émargement","Attestation","Fiche Plan 90 jours","Guide ressources reconversion"],
   tarifs:{"Groupe 8-15 pers.":"1 500€ HT","Coaching individuel":"300€/h","Programme reconversion complet":"3 500€"},
   arguments:["FIFPRO oblige les clubs à accompagner leurs joueurs","AFDAS finance pour le secteur sport","Créneau unique : formation + coaching + santé mentale","Possibilité de créer un programme certifiant complet"],
  },
  {id:"elite360",icon:"🏆",title:"ELITE 360° — Performance Totale",subtitle:"Formation complète · 2 jours (14h)",price:"4 500€ HT groupe · 500€/h coaching",color:"#FFD700",cat:"sport",
   tagline:"Le programme tout-en-un pour performer au plus haut niveau et durer",
   public:"Équipes professionnelles, sélections nationales, académies élites, athlètes olympiques",
   science:"Sources : IOC Consensus Statement on Mental Health 2019 · Nixdorf et al. 2013 (15% athlètes élites → dépression) · USOC Mental Health Protocol · Meta-analyse Gardner & Moore 2006 (mindfulness en sport) · APA Guidelines for Sport Psychology",
   objectifs:["Construire une identité d'athlète robuste et multidimensionnelle","Maîtriser l'ensemble des outils de performance mentale des équipes olympiques","Prévenir la dépression sportive et les crises de santé mentale","Développer des capacités de résilience extraordinaires","Créer une culture d'équipe orientée bien-être ET performance","Préparer sa reconversion avec sérénité"],
   modules:[
     {num:"J1A",title:"JOUR 1 Matin — Fondations Mentales",duree:"3h",contenu:"Neurosciences du sport · Profil mental (questionnaire AMS-3) · Growth Mindset (Dweck) · Croyances limitantes → reframing cognitif · Visualisation (protocole Lang 2000) · Mindfulness sportive (JAMA 2014 : -43% anxiété) · Respiration box breathing (Navy SEALs adapté) · Ancrage émotionnel · Construction de la routine pré-compétition individualisée",methode:"Diagnostic individuel · Pratique guidée · Construction de sa routine",exemples:"Protocoles USOC · Warriors · Équipe de France Basketball"},
     {num:"J1B",title:"JOUR 1 Après-midi — Santé Mentale",duree:"1h",contenu:"35% des athlètes élites touchés (NCAA 2021) · Témoignages qui ont changé le sport · Signaux d'alerte en soi et chez ses coéquipiers · Différence burn-out / dépression clinique · Ressources disponibles · Culture de soutien dans l'équipe",methode:"Vidéos · Espace de parole sécurisé · Plan de soutien",exemples:"Kevin Love · Naomi Osaka · Simone Biles"},
     {num:"J2A",title:"JOUR 2 Matin — Résilience & Adversité",duree:"3h",contenu:"Gestion de la pression compétitive · Technique après-match sans auto-destruction · Courbe psychologique de la blessure · Plan de retour blessure en 5 étapes · Gestion des médias et réseaux sociaux · Communication au sein de l'équipe · Plan de résilience individuel",methode:"Études de cas · Jeux de rôle · Plan individuel · Coaching collectif",exemples:"Kevin Durant · Curry · Derrick Rose · Pau Gasol"},
     {num:"J2B",title:"JOUR 2 Après-midi — Après le Sport",duree:"1h30",contenu:"Corps après la performance : nutrition, sommeil, activité plaisir · Identité plurielle · Roue de la vie · Plan 90 jours post-carrière · Compétences transférables · Ressources reconversion · Transition sereine",methode:"Roue de la vie · Mind mapping · Plan 90 jours",exemples:"NFL Legends · NBA Alumni · FIFPRO Player Care"},
     {num:"J2C",title:"JOUR 2 — Certification & Plan Final",duree:"1h30",contenu:"Mental Performance Plan individualisé (4 pages) · Routine d'équipe collective · Charte de bien-être d'équipe · Ressources recommandées · Q&R · Remise attestations et certificats de participation",methode:"Coaching express · Document MPP · Attestation",exemples:"Format utilisé par les staffs psy NBA/Équipes nationales"},
   ],
   materiel:["Salle confortable (pas style conférence)","Vidéoprojecteur + système sonore","Fiches MPP individuelles 4 pages","Questionnaires AMS-3 imprimés","Musique et ambiance travaillée"],
   livrables:["Programme 2 jours","Feuilles d'émargement","Attestation","Mental Performance Plan (4p/athlète)","Charte de bien-être d'équipe","Bibliothèque de ressources complète"],
   tarifs:{"Groupe 8-15 pers.":"4 500€ HT","Groupe 16-25 pers.":"7 000€ HT","Coaching individuel":"500€/h","Package saison mensuel":"1 500€/mois"},
   arguments:["IOC Consensus 2019 : santé mentale = pilier de la performance","120 clubs pro en France + fédérations + académies INSEP","AFDAS finance 100% pour clubs pro du secteur sport","Prix premium justifié : 2 jours + documents + suivi","1 club → 10 recommandations dans le milieu sportif"],
  },
  {id:"menage",icon:"🧹",title:"Agent d'Entretien Professionnel",subtitle:"Formation complète 2 jours (14h)",price:"1 200€ HT groupe · 180€/h individuel",color:"#06B6D4",cat:"menage",
   tagline:"Les bons gestes, les bons produits, la bonne attitude — pour un service irréprochable",
   public:"Agents d'entretien, employés de ménage, conciergerie, hôtels, commerces, particuliers — tout niveau · Format TERRAIN : appartement, hôtel, gymnase ou commerce partenaire",
   legal:"Aucun agrément obligatoire. Certification RS possible. Financement : OPCO Akto, Constructys, Atlas selon secteur.",
   objectifs:["Maîtriser les techniques professionnelles de nettoyage par surface","Choisir et utiliser correctement les produits d'entretien et le matériel","Appliquer les règles d'hygiène, sécurité et prévention des TMS","Gérer son temps et organiser ses interventions efficacement","Adopter le comportement professionnel attendu en clientèle (hôtel, commerce, particulier)"],
   modules:[
     {num:"01",title:"Fondamentaux du Métier",duree:"90 min",contenu:"Présentation du métier : débouchés, secteurs, réglementation · Les différents types de locaux : bureau, hôtel, commerce, particulier, sanitaires · Hygiène de base : lavage des mains, tenue professionnelle, EPI · Code de déontologie : discrétion, respect, ponctualité · Vocabulaire professionnel du secteur · Introduction aux normes HACCP pour les secteurs alimentaires",methode:"Présentation · Échanges d'expériences · Quiz vocabulaire"},
     {num:"02",title:"Produits, Matériel & Sécurité",duree:"90 min",contenu:"Lecture des étiquettes et fiches de données de sécurité (FDS) · Familles de produits : détergents, désinfectants, détartrants, décapants · Risques chimiques : ne jamais mélanger certains produits · Règle des 5 familles de surfaces : verre, plastique, inox, bois, textile · Dosages corrects : économique et écologique · Entretien du matériel : chariot, monobrosse, aspirateur · Equipements de Protection Individuelle (EPI) obligatoires",methode:"Démonstration produits · Lecture étiquettes en groupe · Exercice dosage"},
     {num:"03",title:"Techniques de Nettoyage par Zone",duree:"120 min",contenu:"BUREAUX : dépoussiérage humide (de haut en bas, de propre à sale) · écrans, claviers, téléphones · SANITAIRES : protocole désinfection WC, lavabos, robinetterie · SOLS : balayage humide, lavage à plat vs rotation · technique serpentin · VITRES : méthode professionnelle au racloir · CUISINE/RÉFECTOIRE : respect des zones propre/sale · CHAMBRES HÔTEL : méthode de refaire un lit (bounce test) · gestion du linge · check-list sortie de chambre",methode:"Démonstration par le formateur · Pratique en binôme · Correction posture"},
     {num:"04",title:"Organisation & Productivité",duree:"60 min",contenu:"Préparer son chariot avant intervention · Lire et suivre un planning · Estimation des temps par type de local · Priorités quand le temps manque · Communication avec le responsable et le client · Gérer les imprévus (tache difficile, client présent, produit manquant) · Fiche de passage et traçabilité · Retour client : gérer une réclamation",methode:"Mise en situation · Jeu de rôle client mécontent · Fiche de passage"},
     {num:"05",title:"Gestes & Postures — Prévenir les TMS",duree:"60 min",contenu:"Les TMS spécifiques au métier d'agent d'entretien : dos, épaules, genoux · Techniques ergonomiques : posture pour passer la serpillère, frotter, soulever un seau · Manche à longueur adaptée · Alterner les tâches pour réduire les gestes répétitifs · Pauses actives : 3 min de mobilisation toutes les heures · Chaussures de sécurité antidérapantes · Check-list équipement idéal",methode:"Pratique avec matériel réel · Corrections posturales individuelles"},
     {num:"06",title:"Spécialités & Évaluation",duree:"60 min",contenu:"NETTOYAGE HAUTE PRESSION : protocoles et sécurité · DÉTACHAGE TEXTILE : selon fibre et type de tache · VITRERIE HAUTEUR : perche télescopique, nacelle (notions) · CONCIERGERIE HÔTEL : service au client, discrétion, extras · Check-list finale par type de local · Quiz QCM de validation (≥ 7/10) · Remise attestations de formation",methode:"Démonstration spécialités · QCM · Attestation"},
   ],
   materiel:["Chariot de ménage professionnel","Gamme de produits d'entretien professionnels","Chiffons micro-fibre (couleurs différentes par zone)","Moppes et balais professionnels","Racloir vitres + mouilleur","EPI : gants, tablier, lunettes","Seau double compartiment","Fiches de passage vierges"],
   livrables:["Programme","Feuille d'émargement","Attestation de formation","Fiche produits + dosages","Check-list par type de local","Guide gestes & postures agent d'entretien"],
   tarifs:{"Groupe 8-14 pers. (2j)":"1 200€ HT","Groupe 4-7 pers. (2j)":"800€ HT","Module recyclage 1j":"500€ HT","Audit et conseil (1j)":"900€ HT"},
   arguments:["4 ans d'activité · 1000+ sessions réalisées = expertise terrain incontestable","Clients potentiels : sociétés de ménage, hôtels, conciergeries en IDF","Financement : OPCO Akto (hôtellerie-propreté) finance jusqu'à 100%","Marché : 500 000 agents d'entretien en France, turnover élevé = formation constante","Upsell : audit des pratiques en entreprise + programme de formation sur-mesure","Certification possible : Titre Pro Agent de Propreté et d'Hygiène (TPAH)"],
  },
  {id:"bestformateur",icon:"🎤",title:"Devenir le Meilleur Formateur",subtitle:"Masterclass Formateur · 1 jour (7h)",price:"1 400€ HT groupe · 300€/h coaching",color:"#F59E0B",cat:"skills",
   tagline:"Maîtriser l'art de former — posture, voix, engagement, impact mémorable",
   public:"Formateurs débutants ou en activité qui veulent passer au niveau supérieur · Coachs · Speakers",
   legal:"Aucun agrément obligatoire. Peut mener vers la certification Formateur FPA (RNCP niveau 5).",
   objectifs:["Maîtriser la posture physique et l'autorité naturelle du formateur","Développer une voix engageante et un débit adapté à chaque module","Concevoir des programmes mémorables avec la méthode 70/20/10","Gérer un groupe difficile, les silences et les conflits","Créer l'expérience apprenante qui donne envie de revenir"],
   modules:[
     {num:"01",title:"La Posture du Formateur d'Exception",duree:"90 min",contenu:"Les 7 postures physiques qui inspirent confiance · Où se positionner dans la salle · Mouvement et énergie : comment se déplacer pour maintenir l'attention · Le regard : balayer le groupe, accrocher sans intimider · Les gestes ouverts vs fermés · Tenue vestimentaire et image professionnelle · Exercice miroir en binôme",methode:"Démonstration · Exercice miroir · Feedback croisé",exemples:"Techniques de TED Talks · Steve Jobs Keynote · Professeurs les mieux notés en France"},
     {num:"02",title:"La Voix comme Outil Pédagogique",duree:"80 min",contenu:"Les 4 dimensions de la voix : volume, débit, ton, articulation · Quand monter la voix (énergie), baisser (importance) · Les silences stratégiques : technique des 5 secondes · Intonation pour poser des questions engageantes · Éliminer les tics verbaux ('euh', 'donc', 'voilà') · Exercices de diction et projection · Enregistrement et auto-écoute",methode:"Enregistrement audio · Exercices de projection · Analyse collective"},
     {num:"03",title:"Concevoir des Sessions Mémorables",duree:"90 min",contenu:"La méthode 70/20/10 : 70% pratique, 20% échanges, 10% théorie · L'arc narratif d'une formation : accroche → développement → ancrage · Les 5 premières minutes : comment capturer l'attention immédiatement · Varier les modalités : exercice solo, binôme, groupe, plénière · Supports visuels efficaces : règle des 6 mots par slide · Clore une session : les 3 techniques d'ancrage mémoriel",methode:"Atelier conception · Présentation croisée · Feedback structuré",exemples:"Méthode Feynman · Design thinking pédagogique"},
     {num:"04",title:"Gérer un Groupe & les Situations Difficiles",duree:"60 min",contenu:"Typologies de participants : le dominant, le muet, le sceptique, le perturbateur · Techniques de recadrage sans conflit · Comment relancer quelqu'un qui ne participe pas · Gérer une question à laquelle tu n'as pas la réponse (sans perdre la face) · Le conflit entre participants · Les digressions : technique du 'parking' · Adapter son rythme en temps réel",methode:"Jeux de rôle · Mises en situation · Débriefing"},
     {num:"05",title:"L'Après-Formation — Fidéliser et Recommander",duree:"60 min",contenu:"Questionnaire de satisfaction : le rendre utile, pas cosmétique · Recueillir des témoignages vidéo puissants · Le suivi post-formation qui crée la fidélité · Comment transformer un client en ambassadeur · Construire sa réputation de formateur · Personal branding formateur sur LinkedIn · Le portfolio formateur : ce qu'il faut montrer",methode:"Atelier portfolio · Templates témoignages · Plan de suivi"},
   ],
   materiel:["Salle avec espace pour se déplacer","Vidéoprojecteur + système son","Enregistreur audio ou téléphone","Post-its","Paperboard","Miroir si possible"],
   livrables:["Programme","Feuille d'émargement","Attestation","Checklist 'Formateur d'Exception'","Guide voix et posture","Template portfolio formateur"],
   tarifs:{"Groupe 6-12 pers.":"1 400€ HT","Coaching individuel 2h":"300€/h","Package 3 séances coaching":"750€"},
   arguments:["Toi = formateur unique qui a joué pro à l'international → double légitimité terrain + business","Marché : tous les formateurs débutants veulent progresser vite","Peut être vendu comme prérequis à tes autres formations","Upsell naturel : après cette formation, les gens veulent suivre tes autres programmes"],
  },
  {id:"coachpro",icon:"🏀",title:"Coach Amateur → Coach Professionnel",subtitle:"Montée en compétence · 2 jours (14h)",price:"1 600€ HT groupe · 280€/h individuel",color:"#E05555",cat:"skills",
   tagline:"Élever son niveau de coaching pour avoir des joueurs qui progressent vraiment",
   public:"Coachs amateurs, éducateurs sportifs, bénévoles souhaitant se professionnaliser",
   legal:"Aucun agrément obligatoire. Complémentaire au BPJEPS Basket. Financement AFDAS pour clubs.",
   objectifs:["Structurer une séance d'entraînement efficace et progressive","Développer le mindset et la culture d'équipe gagnante","Créer des exercices techniques et des jeux de cohésion mémorables","Communiquer avec autorité et bienveillance avec ses joueurs","Gérer les parents, les conflits de vestiaire et les baisses de motivation"],
   modules:[
     {num:"01",title:"L'ADN du Coach Professionnel",duree:"90 min",contenu:"La différence entre un coach amateur et un pro : posture, préparation, communication · Les 5 piliers d'un coaching de qualité (Phil Jackson, Gregg Popovich, Tony Parker) · Auto-évaluation : ton style de coaching actuel · Comprendre la psychologie du joueur selon son âge (U10 à senior) · Fixer des objectifs SMART pour l'équipe et chaque joueur · La charte d'équipe : construire ensemble les règles",methode:"Auto-évaluation · Discussion · Charte d'équipe collective",exemples:"Phil Jackson (Triangle Offense + Mindfulness) · Popovich (culture Warriors)"},
     {num:"02",title:"Structurer des Séances Efficaces",duree:"120 min",contenu:"La structure en 4 temps : échauffement spécifique + technique individuelle + exercice collectif + match situation · Progression pédagogique : du simple au complexe · Ratio ballons/joueurs optimal · Adapter la séance selon le niveau observé en temps réel · 10 exercices fondamentaux pour chaque poste · Créer des concurrences saines pendant l'entraînement · La séquence vidéo : comment analyser et corriger",methode:"Démonstration terrain · Pratique guidée · Debrief collectif",exemples:"Méthodes FIBA · Académies NBA G-League"},
     {num:"03",title:"Élever le Mindset de ses Joueurs",duree:"90 min",contenu:"Growth Mindset appliqué au basketball amateur · Comment challenger sans décourager · La technique du sandwich (positif-correctif-positif) · Gestion des erreurs : transformer les ratés en apprentissage · Développer la confiance des joueurs timides · L'importance du rôle de chaque joueur · Les rituels d'équipe qui créent l'identité collective",methode:"Jeux de rôle coach/joueur · Exercice feedback · Plan de développement joueur"},
     {num:"04",title:"Cohésion d'Équipe — Jeux & Situations",duree:"90 min",contenu:"10 jeux de cohésion utilisés par les équipes pro · Challenge de confiance (sans le ballon) · Exercice communication forcée · Competition en équipes mixtes pour briser les clans · La sortie de vestiaire : rituels pré-match · Comment gérer un match perdu d'avance · La gestion du groupe sur la durée d'une saison",methode:"Pratique des jeux · Mise en situation · Débriefing émotionnel"},
     {num:"05",title:"Gérer l'Environnement — Parents, Conflits, Motivation",duree:"60 min",contenu:"Les parents toxiques : comment les cadrer sans conflit · Réunion parents en début de saison (template) · Conflit entre joueurs : méthode de médiation en 4 étapes · Le joueur qui veut partir : comment le retenir ou lâcher · Gérer une série de défaites · Fin de saison : bilan collectif constructif · Préparer la saison suivante",methode:"Études de cas · Jeux de rôle · Plans d'action"},
     {num:"06",title:"Évaluation & Plan de Développement",duree:"30 min",contenu:"Quiz de validation · Construction de son plan de développement coach sur 6 mois · Ressources recommandées (livres, podcasts, YouTube, formations) · Fiche de suivi joueur template · Attestation de formation",methode:"QCM · Fiche plan · Attestation"},
   ],
   materiel:["Terrain de basket ou gymnase (idéal)","Ballons","Vidéoprojecteur + laptop","Fiches exercices imprimées","Tableau blanc ou paperboard"],
   livrables:["Programme","Feuille d'émargement","Attestation","10 exercices fondamentaux A4","Template réunion parents","Fiche suivi joueur","Plan développement coach 6 mois"],
   tarifs:{"Groupe 6-15 pers. (2j)":"1 600€ HT","Module 1j intensif":"900€ HT","Coaching terrain 2h":"280€/h","Package saison (accompagnement mensuel)":"400€/mois"},
   arguments:["500 000 licenciés basket en France dont 80% encadrés par des bénévoles","AFDAS finance pour les clubs sportifs affiliés","Toi = ex-pro qui a joué avec les meilleurs = argument inattaquable","Marché : clubs FFBB amateurs, comités régionaux, académies de jeunes","Upsell : formation ELITE 360° pour les joueurs du même club"],
  },
  {id:"clubpro",icon:"🏟️",title:"Club Amateur → Structure Professionnelle",subtitle:"Développement de club · 2 jours (14h)",price:"2 000€ HT groupe dirigeants · 350€/h conseil",color:"#8B5CF6",cat:"skills",
   tagline:"Transformer un club amateur en structure qui génère des revenus et fait progresser ses joueurs",
   public:"Présidents de club, dirigeants, trésoriers, coordinateurs sportifs de clubs amateurs basket",
   legal:"Formation déductible fiscalement pour les associations. Financement AFDAS possible. Aucun agrément requis.",
   objectifs:["Professionnaliser la structure administrative et sportive du club","Créer des sources de revenus passifs tout au long de l'année","Sélectionner et recruter des coachs avec le mindset professionnel","Nouer des partenariats fournisseurs (maillots, équipements) avantageux","Organiser des événements générateurs de revenus (camps, tournois, buvettes)"],
   modules:[
     {num:"01",title:"Diagnostiquer sa Structure",duree:"90 min",contenu:"Audit express du club : gouvernance, finances, sportif, communication · La différence club amateur bien géré vs club pro · Les 5 piliers d'un club qui dure et grandit · Structurer son bureau : rôles clairs, délégation · Assemblée générale efficace : 3 étapes clés · Digitaliser son club : outils gratuits (HelloAsso, Footclubs, Spond) · Plan de développement sur 3 ans",methode:"Audit collectif · Carte mentale de la structure · Priorisation"},
     {num:"02",title:"Recruter des Coachs avec le Mindset Pro",duree:"90 min",contenu:"Profil idéal du coach amateur à recruter · Les questions à poser en entretien · Détecter le mindset pro : signaux et red flags · Processus d'intégration d'un nouveau coach · Charte du coach (valeurs, obligations, droits) · Comment évaluer ses coachs en cours de saison · Gestion d'un coach qui ne performe pas",methode:"Exercice de recrutement simulé · Jeux de rôle entretien · Charte collective"},
     {num:"03",title:"Générer des Revenus Passifs",duree:"120 min",contenu:"Les 7 sources de revenus d'un club amateur rentable · Buvette : organisation, tarifs, rentabilité moyenne · Tournois homologués FFBB : comment les organiser et les monétiser · Camps de basket jeunes : 3 jours = 200-500€/participant · Location du gymnase (créneaux libres) · Vente de produits club : maillots, sweats, accessoires (POD) · Partenariats locaux : comment approcher une entreprise locale",methode:"Business plan revenus · Exercice chiffrage · Cas réels de clubs"},
     {num:"04",title:"Partenariats Fournisseurs & Équipements",duree:"60 min",contenu:"Comment contacter les marques (Nike, Adidas, New Balance, Errea, Joma) · Négocier des tarifs préférentiels pour les clubs · Le programme Nike Team Sports et équivalents · Fournisseurs alternatifs : tarifs imbattables (Ali Sport, Sport2000 Pro) · Créer son propre maillot sur mesure à bas coût · Kit de communication pour approcher les sponsors locaux",methode:"Templates emails fournisseurs · Calcul ROI équipements · Négociation simulée"},
     {num:"05",title:"Développement des Jeunes — Mini-Pousin à Senior",duree:"90 min",contenu:"Le parcours du joueur en club : de U7 à Senior · Curriculum technique par catégorie d'âge (FIBA) · Comment garder ses meilleurs joueurs dans le club · Relation avec les familles : intégrer les parents dans le projet · Partenariat école/collège pour recruter · Programme de détection locale · La fierté de porter le maillot : créer l'identité du club",methode:"Parcours joueur visuel · Ateliers catégorie par catégorie · Plan de rétention"},
     {num:"06",title:"Plan d'Action 12 Mois",duree:"30 min",contenu:"Chaque dirigeant repart avec son plan d'action 12 mois · Budget prévisionnel simplifié · Calendrier des événements générateurs de revenus · 3 actions à mettre en place cette semaine · Ressources et réseaux · Attestations",methode:"Plan d'action individuel · Template budget · Attestation"},
   ],
   materiel:["Salle de réunion","Vidéoprojecteur","Paperboard","Fiches business plan vierges","Exemples de chartes et statuts"],
   livrables:["Programme","Feuille d'émargement","Attestation","Plan d'action 12 mois","Template budget club","Charte du coach","Kit approche fournisseurs","Guide organisation tournoi"],
   tarifs:{"Groupe 5-12 dirigeants (2j)":"2 000€ HT","Coaching dirigeant individuel":"350€/h","Accompagnement mensuel club":"500€/mois","Audit complet du club (1j)":"1 200€ HT"},
   arguments:["4 000 clubs basket licenciés en France = marché énorme","Pratiquement aucun formateur ne propose ce type de formation aux dirigeants","AFDAS finance pour les salariés de clubs professionnels","Toi = ex-pro + entrepreneur = tu parles leur langue","Upsell : formation Coach Pro pour leurs entraîneurs + ELITE 360° pour leurs joueurs"],
  },
];

const ROADMAP_SECTIONS = [
  {id:"phase1",title:"Phase 1 — Structurer",subtitle:"Semaines 1-3 · Coût : 0€",color:"#C9A84C",icon:"🏗️",steps:[["r1","Créer l'auto-entreprise → autoentrepreneur.urssaf.fr"],["r2","Code APE : 85.59A (Formation continue adultes)"],["r3","Recevoir le SIRET (3-7 jours)"],["r4","Préparer le programme de ta 1ère formation (2h min.)"],["r5","Réaliser la 1ère formation : émargement + attestation + facture"],["r6","Déposer le Cerfa n°10782 sur mon.formationprofessionnelle.fr"]]},
  {id:"phase2",title:"Phase 2 — Lancer",subtitle:"Mois 2 · Objectif : 500-1500€",color:"#4A7CFF",icon:"🚀",steps:[["r7","Recevoir le NDA (Numéro de Déclaration d'Activité)"],["r8","Créer son profil LinkedIn formateur professionnel"],["r9","S'inscrire CNV → lacoopcnv.com (priorité CPF n°1)"],["r10","S'inscrire SST → FMS ou FIRE Sarcelles (priorité CPF n°2)"],["r11","Préparer les 4 documents officiels"],["r12","Envoyer 30 emails de prospection aux DRH IDF"],["r13","Vendre et dispenser sa 1ère session payante"]]},
  {id:"phase3",title:"Phase 3 — Accélérer",subtitle:"Mois 3-4 · Objectif : 2500-4000€",color:"#4CAF82",icon:"📈",steps:[["r14","Atteindre 3 sessions vendues au prix plein (1200€)"],["r15","Collecter 3 témoignages clients (vidéo ou écrit)"],["r16","Contacter un OPCO pour ses premiers dossiers"],["r17","Lancer la démarche Qualiopi (choisir un certificateur)"],["r18","Créer une 2ème formation catalogue"],["r19","Proposer la formation sport à 1 club ou académie"]]},
  {id:"phase4",title:"Phase 4 — Scaler",subtitle:"Mois 5-6 · Objectif : 5000€+",color:"#8B5CF6",icon:"🎯",steps:[["r20","Certification Qualiopi obtenue"],["r21","1er dossier OPCO financé et clôturé"],["r22","5+ sessions régulières par mois"],["r23","Module e-learning en ligne (revenu passif)"],["r24","Formation sport ELITE 360° vendue à un club"],["r25","5 000€/mois atteints 🎉"]]},
  {id:"cpf_plan",title:"💳 Maximise tes 1500€ CPF",subtitle:"Formations prioritaires — dans l'ordre",color:"#FFD700",icon:"💳",steps:[["cpf1","✅ PRIORITÉ 1 : CNV — La Coop CNV · ~600€ · Certification CPF directement vendable"],["cpf2","✅ PRIORITÉ 2 : SST Sauveteur Secouriste · ~300€ · INRS · Dispenser en entreprise"],["cpf3","✅ PRIORITÉ 3 : Gestes & Postures PRAP · ~400€ · Très demandé BTP/logistique"],["cpf4","🔄 SI RESTE : Formateur FPA · 800-1500€ · RNCP (nécessite abondement)"],["cpf5","💡 Budget CNV+SST+PRAP ≈ 1300€ → Reste 200€ pour matériel pédagogique"]]},
  {id:"legal",title:"⚖️ Obligations Légales",subtitle:"Documents à avoir à jour en permanence",color:"#E05555",icon:"📋",steps:[["l1","Convention de formation — signée AVANT chaque formation"],["l2","Programme détaillé — remis au stagiaire AVANT"],["l3","Feuille d'émargement — signée PENDANT (matin + AM)"],["l4","Attestation de formation — remise APRÈS"],["l5","Questionnaire de satisfaction — APRÈS (obligatoire Qualiopi)"],["l6","Facture avec mention TVA exonérée Art. 261-4-4° CGI"]]},
];

const QUICK=[
  ["🏢 Organisme","Comment créer mon organisme de formation ?"],
  ["🔍 CPF","Quelles formations CPF passer avec 1500€ ?"],
  ["💬 CNV","Formation CNV communication non violente CPF ?"],
  ["❓ FAQ SST","FAQ formation SST — questions fréquentes"],
  ["❓ FAQ CPF","FAQ compte personnel de formation"],
  ["❓ FAQ Incendie","FAQ formation incendie et évacuation"],
  ["❓ FAQ Conflits","FAQ formation gestion des conflits"],
  ["❓ FAQ Postures","FAQ gestes et postures TMS"],
  ["📋 DREETS","Comment faire la déclaration DREETS ?"],
  ["💼 OPCO","Comment faire financer par les OPCO ?"],
];

export default function App() {
  const [page,setPage]             = useState("dashboard");
  const [msgs,setMsgs]             = useState([{role:"ai",text:"Bonjour ! Assistant Formation Pro 🎓\n\nBase experte complète + FAQ détaillée + recherche web 🌐\n\nPose n'importe quelle question sur la formation pro en France.\nInclus : SST, Incendie, CNV, Conflits, Postures, Qualiopi, CPF..."}]);
  const [inputVal,setInputVal]     = useState("");
  const [busy,setBusy]             = useState(false);
  const [checked,setChecked]       = useState({});
  const [saved,setSaved]           = useState({});
  const [libCat,setLibCat]         = useState("Tous");
  const [libSearch,setLibSearch]   = useState("");
  const [expandedOrg,setExpandedOrg] = useState(null);
  const [formSub,setFormSub]       = useState("standard");
  const [selectedForm,setSelectedForm] = useState(null);
  const [activeModule,setActiveModule] = useState(null);
  const [openSec,setOpenSec]       = useState({phase1:true,cpf_plan:true});
  const [docTab,setDocTab]         = useState("att");
  const [venteTab,setVenteTab]     = useState("email");
  const [roadTab,setRoadTab]       = useState("roadmap"); // roadmap | documents
  const [org,setOrg]               = useState("");
  const [trainer,setTrainer]       = useState("");
  const [ftitle,setFtitle]         = useState("");
  const [fdate,setFdate]           = useState("");
  const bottomRef = useRef(null);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,busy]);

  const totalSteps = ROADMAP_SECTIONS.reduce((a,s)=>a+s.steps.length,0);
  const done  = Object.values(checked).filter(Boolean).length;
  const pct   = Math.round((done/totalSteps)*100);
  const chk   = (id)=>setChecked(p=>({...p,[id]:!p[id]}));
  const toggleSave = (id)=>setSaved(p=>({...p,[id]:!p[id]}));
  const savedCount = Object.values(saved).filter(Boolean).length;
  const toggleSec  = (id)=>setOpenSec(p=>({...p,[id]:!p[id]}));

  const send = async (override)=>{
    const q=(override??inputVal).trim();
    if(!q||busy) return;
    setInputVal("");
    if(override) setPage("assistant");
    setMsgs(p=>[...p,{role:"user",text:q}]);
    setBusy(true);
    const intent=detect(q);
    let text="",tag="";
    if(intent&&KB[intent]){ text=KB[intent]; tag="✅ Base experte"; }
    else {
      const w=await webSearch(q);
      if(w){ text="🌐 Résultat web\n\n"+w; tag="🌐 Web"; }
      else { text="Je n'ai pas de réponse précise.\n\nEssaie des mots-clés :\norganisme · CPF · NDA · DREETS · qualiopi · SST · CNV · incendie · OPCO · tarifs\n\nOu demande une FAQ :\n'FAQ SST' · 'FAQ incendie' · 'FAQ CPF' · 'FAQ conflits' · 'FAQ postures' · 'FAQ Qualiopi'"; }
    }
    setMsgs(p=>[...p,{role:"ai",text,tag}]);
    setBusy(false);
  };

  const O=org||"[Organisme]",N=trainer||"[Formateur]",TI=ftitle||"[Formation]",DA=fdate||"[Date]";
  const docContent={
    att:`ATTESTATION DE FORMATION\n${O}\nNDA : 11 75 XXXXX 75\n\nJe soussigné(e) ${N} atteste que :\nM./Mme _____________________\na suivi et validé la formation :\n\nIntitulé : ${TI}\nDate     : ${DA}\nDurée    : ___ heures\n\nRÉSULTAT :\n☐ ACQUIS    ☐ EN COURS    ☐ NON ACQUIS\n\nFait à ________ le ________\n\n________________________\n${N} — Formateur`,
    em:`FEUILLE D'ÉMARGEMENT\n${O} — NDA : 11 75 XXXXX 75\n\nFormation : ${TI}\nDate : ${DA}   Formateur : ${N}\n\n──────────────────────────────────\n N°  Nom & Prénom         Matin  AM\n──────────────────────────────────\n  1  _________________    ____  ____\n  2  _________________    ____  ____\n  3  _________________    ____  ____\n  4  _________________    ____  ____\n  5  _________________    ____  ____\n  6  _________________    ____  ____\n  7  _________________    ____  ____\n  8  _________________    ____  ____\n──────────────────────────────────`,
    conv:`CONVENTION DE FORMATION PROFESSIONNELLE\n(Art. L6353-1 et suivants du Code du travail)\n\nENTRE :\n${O}\nNDA : 11 75 XXXXX 75   SIRET : _______________\nReprésenté par : ${N}\n\nET :\nEntreprise : ___________________________\nSIRET : ________________________________\n\nOBJET : « ${TI} »\nDate : ${DA}   Durée : ___ h\nPrix HT : ____________________________\nTVA : ☐ Exonérée (Art. 261-4-4° CGI)   ☐ 20%\n\nAnnulation < 15 jours : 50% facturé\nAnnulation < 48 heures : 100% facturé\n\nFait le ____________\n${N}                    L'Entreprise`,
    sat:`QUESTIONNAIRE DE SATISFACTION\n${O}   ${TI}   ${DA}\n\nNotez de 1 (insuffisant) à 5 (excellent)\n\nCONTENU\n  Pertinence du programme       1  2  3  4  5\n  Adéquation avec vos besoins   1  2  3  4  5\n  Qualité des supports          1  2  3  4  5\n\nFORMATEUR\n  Clarté des explications       1  2  3  4  5\n  Maîtrise du sujet             1  2  3  4  5\n  Qualité de l'animation        1  2  3  4  5\n\nGLOBAL                          1  2  3  4  5\n\nRecommanderiez-vous ?   ☐ OUI   ☐ NON\n\nCommentaire : ___________________________`,
  };
  const venteContent={
    email:`Objet : Formation « Gestion des conflits » — [Ville]\n\nBonjour [Prénom],\n\nFormateur professionnel en IDF, je vous contacte au sujet d'un besoin récurrent : la gestion des tensions au travail.\n\nJe propose une sensibilisation de 3h :\n« Gestion des conflits en entreprise »\n\nVos collaborateurs repartent avec :\n• Méthode CNV/OSBD pour désamorcer les tensions\n• Posture assertive face aux situations difficiles\n• Outils applicables dès le lendemain\n\nFormat : présentiel dans vos locaux\n8-12 personnes · 1 200€ HT\nConvention de formation fournie.\n\n15 minutes cette semaine ?\n\n[Votre nom]\n[Organisme] — NDA : 11 75 XXXXX 75`,
    linkedin:`1er CONTACT :\n"Bonjour [Prénom], formateur conflits en IDF. J'ai une session de 3h disponible en [mois]. Sujet d'actualité dans votre équipe ?"\n\nRELANCE J+5 :\n"Bonjour [Prénom], je reviens sur mon message. Pas de pression — si ce n'est pas le bon moment, pas de souci."`,
    tel:`ACCROCHE (15s) :\n"Bonjour, formateur en IDF. Je travaille avec des entreprises de votre secteur sur la gestion des conflits. 2 minutes ?"\n\nDIAGNOSTIC :\n"Est-ce que la gestion des tensions dans vos équipes est quelque chose que vous ressentez en ce moment ?"\n\nCLOSING :\n"On se cale 15 min en visio cette semaine ?"\n\nOBJECTION budget :\n"Vous utilisez votre budget OPCO ? Les formations courtes passent généralement très bien."`,
    tarifs:`GRILLE TARIFAIRE COMPLÈTE\n\nStandard :\n  Sensibilisation 3h (8-12 pers.)  : 1 200€ HT\n  Formation 1 jour                 : 2 400€ HT\n  Formation 2 jours                : 4 200€ HT\n  Coaching manager                 :   250€/h\n  E-learning                       : 79-149€/pers\n\nSport & Mental :\n  Mindset de Champion (4h)         : 1 800€ HT\n  Dépression du Champion (3h)      : 2 000€ HT\n  Vie Saine Après (3h)             : 1 500€ HT\n  ELITE 360° (2 jours)             : 4 500€ HT\n  Coaching athlète individuel      : 350-500€/h\n\n──────────────────────────────────\n🎯 POUR 5 000€/MOIS :\n→ 4 sessions std × 1200€ = 4 800€\n→ 1 ELITE 360° + 1 std = 5 700€`,
  };

  const g="#C9A84C",gl="#E8C97A",gd="rgba(201,168,76,0.12)";
  const d="#0A0A0A",d2="#111",d3="#1A1A1A",d4="#222",d5="#2A2A2A";
  const t="#E8E0D0",tm="#B0A898",td="#8A8070";
  const ok="#4CAF82",ac="#4A7CFF";
  const card={background:d3,border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:16,marginBottom:12};
  const btnG={background:g,color:d,border:"none",borderRadius:7,padding:"9px 16px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"};
  const btnO={background:"transparent",color:tm,border:"1px solid rgba(255,255,255,.12)",borderRadius:7,padding:"9px 16px",fontSize:12,cursor:"pointer",fontFamily:"inherit"};
  const tabB=(a)=>({padding:"8px 11px",background:"transparent",border:"none",borderBottom:`2px solid ${a?g:"transparent"}`,color:a?g:td,cursor:"pointer",fontSize:10,fontWeight:a?600:400,letterSpacing:".04em",textTransform:"uppercase",marginBottom:-1,fontFamily:"inherit",whiteSpace:"nowrap"});
  const inp={width:"100%",background:d4,border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"9px 12px",color:t,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"inherit"};
  const chkB=(on)=>({width:15,height:15,borderRadius:3,border:`1.5px solid ${on?g:"rgba(201,168,76,.3)"}`,background:on?g:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:d,flexShrink:0,marginTop:2,cursor:"pointer"});
  const NAV=[{id:"dashboard",icon:"⚡",label:"Dashboard"},{id:"formations",icon:"📚",label:"Formations"},{id:"library",icon:"🗂️",label:"Centres"},{id:"assistant",icon:"🤖",label:"Assistant"},{id:"roadmap",icon:"🎯",label:"Roadmap"},{id:"profile",icon:"🏀",label:"Profil"}];

  if(selectedForm){
    const f=ALL_FORMATIONS.find(x=>x.id===selectedForm);
    if(!f){setSelectedForm(null);return null;}
    return (
      <>
        <style>{`*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;background:#0A0A0A;color:#E8E0D0;font-family:-apple-system,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(201,168,76,.2);border-radius:2px}@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fi .2s ease}a{text-decoration:none}`}</style>
        <div style={{height:"100vh",display:"flex",flexDirection:"column"}}>
          <div style={{background:d2,borderBottom:"1px solid rgba(201,168,76,.12)",padding:"12px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
            <button onClick={()=>{setSelectedForm(null);setActiveModule(null);}} style={{width:34,height:34,borderRadius:8,background:d3,border:"1px solid rgba(255,255,255,.08)",color:t,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:700,color:t}}>{f.icon} {f.title}</div>
              <div style={{fontSize:11,color:td,marginTop:1}}>{f.subtitle} · <span style={{color:f.color,fontWeight:600}}>{f.price.split("·")[0].split("groupe")[0].trim()}</span></div>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"14px 16px"}}>
            <div style={{background:`linear-gradient(135deg,${f.color}15,${d3})`,border:`1px solid ${f.color}30`,borderRadius:12,padding:"13px 15px",marginBottom:12}}>
              <div style={{fontSize:13,color:f.color,fontStyle:"italic",marginBottom:5}}>"{f.tagline}"</div>
              <div style={{fontSize:11,color:td,marginBottom:f.science?4:0}}>👥 {f.public}</div>
              {f.legal&&<div style={{fontSize:11,color:tm,marginBottom:f.science?4:0}}>⚖️ {f.legal}</div>}
              {f.science&&<div style={{fontSize:11,color:ac}}>🔬 {f.science}</div>}
            </div>
            {f.arguments&&<div style={{...card,borderLeft:`3px solid ${g}`}}>
              <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".07em",marginBottom:7}}>💰 Pourquoi c'est vendable</div>
              {f.arguments.map((a,i)=><div key={i} style={{fontSize:12,color:tm,padding:"3px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>→ {a}</div>)}
            </div>}
            {f.tarifs&&<div style={{...card,borderLeft:`3px solid ${f.color}`}}>
              <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".07em",marginBottom:7}}>💶 Tarification</div>
              {Object.entries(f.tarifs).map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                  <span style={{fontSize:12,color:tm}}>{k}</span>
                  <span style={{fontSize:12,color:g,fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>}
            <div style={card}>
              <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>🎯 Objectifs pédagogiques</div>
              {f.objectifs.map((o,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:6,alignItems:"flex-start"}}>
                  <span style={{color:f.color,flexShrink:0,fontSize:11,marginTop:2}}>✦</span>
                  <span style={{fontSize:12,color:tm,lineHeight:1.55}}>{o}</span>
                </div>
              ))}
            </div>
            <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>📋 Programme détaillé</div>
            {f.modules.map((m,i)=>(
              <div key={i} style={{...card,marginBottom:7,cursor:"pointer",borderLeft:`3px solid ${activeModule===i?f.color:"transparent"}`}} onClick={()=>setActiveModule(activeModule===i?null:i)}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",gap:9,alignItems:"center"}}>
                    <div style={{width:28,height:28,borderRadius:6,background:`${f.color}15`,border:`1px solid ${f.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:f.color,fontSize:11,flexShrink:0}}>{m.num}</div>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:t}}>{m.title}</div>
                      <div style={{fontSize:10,color:g,fontFamily:"monospace"}}>⏱ {m.duree}</div>
                    </div>
                  </div>
                  <span style={{color:td,fontSize:13,transform:activeModule===i?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
                </div>
                {activeModule===i&&(
                  <div className="fi" style={{marginTop:10,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.06)"}}>
                    <div style={{fontSize:10,color:td,textTransform:"uppercase",marginBottom:4}}>Contenu</div>
                    <div style={{fontSize:12,color:tm,lineHeight:1.65,marginBottom:8}}>{m.contenu}</div>
                    <div style={{fontSize:10,color:td,textTransform:"uppercase",marginBottom:4}}>Méthode</div>
                    <div style={{fontSize:12,color:ok,marginBottom:m.exemples?8:0}}>{m.methode}</div>
                    {m.exemples&&<><div style={{fontSize:10,color:td,textTransform:"uppercase",marginBottom:4}}>Exemples réels</div><div style={{fontSize:12,color:g,fontStyle:"italic"}}>{m.exemples}</div></>}
                  </div>
                )}
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              <div style={card}><div style={{fontSize:11,color:td,textTransform:"uppercase",marginBottom:6}}>🛠 Matériel</div>{f.materiel.map((m,i)=><div key={i} style={{fontSize:11,color:tm,padding:"2px 0"}}>• {m}</div>)}</div>
              <div style={card}><div style={{fontSize:11,color:td,textTransform:"uppercase",marginBottom:6}}>📄 Livrables</div>{f.livrables.map((l,i)=><div key={i} style={{fontSize:11,color:tm,padding:"2px 0"}}>• {l}</div>)}</div>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
              <button style={{...btnG,flex:1}} onClick={()=>{
                const txt=`PROGRAMME — ${f.title}\n${f.subtitle} · ${f.price}\n\n"${f.tagline}"\nPublic : ${f.public}\n\nOBJECTIFS :\n${f.objectifs.map(o=>"• "+o).join("\n")}\n\nPROGRAMME :\n${f.modules.map(m=>`\nMODULE ${m.num} — ${m.title} (${m.duree})\n${m.contenu}\nMéthode : ${m.methode}`).join("\n")}\n\nMATÉRIEL :\n${f.materiel.map(m=>"• "+m).join("\n")}\n\nLIVRABLES :\n${f.livrables.map(l=>"• "+l).join("\n")}`;
                navigator.clipboard?.writeText(txt);
              }}>📋 Copier le programme complet</button>
              <button style={btnO} onClick={()=>window.print()}>🖨️</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const filteredLib=LIBRARY.filter(f=>{
    const ms=libSearch===""||f.name.toLowerCase().includes(libSearch.toLowerCase())||f.formations.some(fm=>fm.toLowerCase().includes(libSearch.toLowerCase()));
    return matchCat(f,libCat,saved)&&ms;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{height:100%;overflow:hidden;background:#0A0A0A}
        body{color:#E8E0D0;font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(201,168,76,.2);border-radius:2px}
        @keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.25;transform:scale(.7)}50%{opacity:1;transform:scale(1)}}
        .fi{animation:fi .2s ease}
        .nb{display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;padding:8px 4px;background:transparent;border:none;cursor:pointer;font-family:inherit}
        .chip{padding:5px 10px;background:#1A1A1A;border:1px solid rgba(255,255,255,.07);border-radius:20px;font-size:10px;color:#8A8070;cursor:pointer;font-family:inherit;white-space:nowrap}
        .chip:hover{border-color:#C9A84C;color:#C9A84C}
        a{text-decoration:none}
        button{transition:all .15s}
        input:focus,textarea:focus{border-color:rgba(201,168,76,.45)!important;outline:none}
      `}</style>

      <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
        <div style={{background:d2,borderBottom:"1px solid rgba(201,168,76,.12)",padding:"0 16px",height:48,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:900,color:g}}>Formation<span style={{color:t,fontWeight:700}}>Pro</span></div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {savedCount>0&&<span style={{background:gd,color:g,border:"1px solid rgba(201,168,76,.3)",borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:600}}>⭐ {savedCount}</span>}
            <span style={{fontSize:10,color:td,fontFamily:"'DM Mono',monospace"}}>{pct}%</span>
          </div>
        </div>

        <div style={{flex:1,overflow:"hidden",minHeight:0}}>

          {page==="dashboard"&&(
            <div className="fi" style={{height:"100%",overflowY:"auto",padding:"14px 16px"}}>

              {/* HERO */}
              <div style={{background:`linear-gradient(135deg,${d3},${d2})`,border:"1px solid rgba(201,168,76,.2)",borderRadius:14,padding:"18px",marginBottom:12,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",right:-8,top:-15,fontFamily:"serif",fontSize:80,fontWeight:900,color:"rgba(201,168,76,.04)",lineHeight:1}}>€</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,marginBottom:4}}>Tiegbe Bamba <span style={{color:g}}>— Plan 10 000€</span></div>
                <div style={{fontSize:12,color:td,lineHeight:1.6,marginBottom:14}}>Ex-joueur pro · 5 continents · Master Communication · 5 business · <strong style={{color:g}}>0€ à investir grâce au CPF</strong></div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button style={btnG} onClick={()=>setPage("profile")}>🏀 Mon Profil complet</button>
                  <button style={btnO} onClick={()=>setPage("assistant")}>🤖 Assistant</button>
                </div>
              </div>

              {/* PLAN PREMIER 10 000€ */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:g,marginBottom:10}}>🎯 Plan Premier 10 000€ — Voie Recommandée</div>

              {/* Voie 1 — Immédiate */}
              <div style={{...card,borderLeft:"4px solid #C9A84C",background:"rgba(201,168,76,.04)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:700,color:t}}>🚀 VOIE 1 — Revenus immédiats</div>
                  <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:"rgba(201,168,76,.15)",color:g,border:"1px solid rgba(201,168,76,.3)"}}>Dès maintenant</span>
                </div>
                <div style={{fontSize:12,color:td,marginBottom:10}}>Utilise tes compétences existantes — 0€ à dépenser, tu peux facturer dès cette semaine</div>
                {[
                  ["🧹","Formation Agent d'Entretien","Ton expertise 4 ans + 1000 sessions · Cibler hôtels, résidences, conciergeries IDF","1 200€/groupe · 2j","Rentable immédiatement"],
                  ["🏀","Camps basket + Module Mindset 1h","Intègre 1h mental dans chaque camp → valeur perçue × 2","+ 100-200€/participant","Dès prochain camp"],
                  ["🧠","Sensibilisation Mindset (3h)","Clubs amateurs, académies, lycées sportifs · Ton parcours = crédibilité immédiate","1 800€/groupe","Sans diplôme supplémentaire"],
                ].map(([icon,titre,desc,prix,timing])=>(
                  <div key={titre} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.05)",alignItems:"flex-start"}}>
                    <span style={{fontSize:18,flexShrink:0,width:24,textAlign:"center"}}>{icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:1}}>{titre}</div>
                      <div style={{fontSize:11,color:td}}>{desc}</div>
                      <div style={{fontSize:10,color:ok,marginTop:2}}>{timing}</div>
                    </div>
                    <div style={{fontSize:11,color:g,fontWeight:700,fontFamily:"monospace",flexShrink:0,textAlign:"right"}}>{prix}</div>
                  </div>
                ))}
                <div style={{marginTop:8,padding:"8px 10px",background:"rgba(201,168,76,.08)",borderRadius:8}}>
                  <div style={{fontSize:11,color:g,fontWeight:600}}>💰 Calcul mois 1 possible :</div>
                  <div style={{fontSize:11,color:tm,marginTop:3}}>2 formations ménage (1200€) + 1 camp basket 10 jeunes (500€) + 1 sensibilisation mindset (1800€) = <strong style={{color:g}}>3 500€ mois 1</strong></div>
                </div>
              </div>

              {/* CPF PLAN */}
              <div style={{...card,borderLeft:"4px solid #FFD700",background:"rgba(255,215,0,.03)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#FFD700"}}>💳 Tes 1 500€ CPF — Plan optimal</div>
                  <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:"rgba(255,215,0,.12)",color:"#FFD700",border:"1px solid rgba(255,215,0,.3)"}}>0€ de ta poche</span>
                </div>
                <div style={{fontSize:12,color:td,marginBottom:10}}>Ces 3 formations en parallèle de ton activité → multiplient ta valeur × 3</div>
                {[
                  ["1","🎓 CNV — La Coop CNV","~600€","2 jours · En ligne · ✅ CPF","Boost ton Master Communication → vendre la formation Conflits à 1200€","PRIORITÉ MAX · Commence cette semaine","#4CAF82"],
                  ["2","🧯 SST Sauveteur Secouriste","~300€","2 jours · FMS Saint-Denis 01 48 20 10 00","Certification INRS → dispenser SST en entreprise → 600-1200€/session","2ème priorité · Appel lundi","#4A7CFF"],
                  ["3","🧘 Gestes & Postures PRAP","~400€","2 jours · ALERTIS ou Protectup","Obligatoire logistique/BTP/santé · Se vend tout seul","3ème priorité","#C9A84C"],
                ].map(([n,nom,cout,duree,gain,timing,col])=>(
                  <div key={n} style={{display:"flex",gap:10,padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.04)",alignItems:"flex-start"}}>
                    <div style={{width:22,height:22,borderRadius:5,background:`${col}25`,border:`1px solid ${col}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:col,flexShrink:0}}>{n}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:1}}>{nom}</div>
                      <div style={{fontSize:11,color:td,marginBottom:2}}>{duree}</div>
                      <div style={{fontSize:11,color:ok}}>→ {gain}</div>
                      <div style={{fontSize:10,color:col,marginTop:2,fontWeight:600}}>{timing}</div>
                    </div>
                    <div style={{fontSize:11,color:"#FFD700",fontWeight:700,fontFamily:"monospace",flexShrink:0}}>{cout}</div>
                  </div>
                ))}
                <div style={{marginTop:8,padding:"8px 10px",background:"rgba(255,215,0,.06)",borderRadius:8}}>
                  <div style={{fontSize:11,color:"#FFD700",fontWeight:600}}>Total : ~1 300€ sur 1 500€ CPF</div>
                  <div style={{fontSize:11,color:tm,marginTop:2}}>Reste ~200€ → matériel pédagogique (extincteur démo, mannequin RCP, fiches)</div>
                </div>
              </div>

              {/* VOIE 2 — Moyen terme */}
              <div style={{...card,borderLeft:"4px solid #4A7CFF",background:"rgba(74,124,255,.03)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:700,color:ac}}>📈 VOIE 2 — Accélérateur mois 2-4</div>
                  <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:"rgba(74,124,255,.12)",color:ac,border:"1px solid rgba(74,124,255,.3)"}}>Après CPF</span>
                </div>
                <div style={{fontSize:12,color:td,marginBottom:10}}>Une fois CNV + SST obtenus → ces formations décuplent tes revenus</div>
                {[
                  ["🤝","Gestion des Conflits (CNV boost)","Avec ta certification CNV → formation complète légitimée · Master Communication = expertise unique","1 200€/session · OPCO finance"],
                  ["🔥","Évacuation Incendie","Obligation légale → toutes les entreprises en ont besoin · Zéro concurrence locale","900€/session · Renouvellement annuel"],
                  ["🎤","Formation : Devenir Meilleur Formateur","Vendre cette formation à d'autres formateurs débutants · Tu es l'expert multi-domaines","1 400€/groupe"],
                ].map(([icon,titre,desc,prix])=>(
                  <div key={titre} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.04)",alignItems:"flex-start"}}>
                    <span style={{fontSize:16,flexShrink:0,width:22,textAlign:"center"}}>{icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:1}}>{titre}</div>
                      <div style={{fontSize:11,color:td}}>{desc}</div>
                    </div>
                    <div style={{fontSize:11,color:ac,fontWeight:700,fontFamily:"monospace",flexShrink:0,textAlign:"right"}}>{prix}</div>
                  </div>
                ))}
              </div>

              {/* VOIE 3 — Scaling sport */}
              <div style={{...card,borderLeft:"4px solid #4CAF82",background:"rgba(76,175,130,.03)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:700,color:ok}}>🏆 VOIE 3 — Scaling Sport (mois 3-6)</div>
                  <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:"rgba(76,175,130,.12)",color:ok,border:"1px solid rgba(76,175,130,.3)"}}>Premium</span>
                </div>
                <div style={{fontSize:12,color:td,marginBottom:10}}>Ton avantage concurrentiel UNIQUE : ex-pro 5 continents + formateur certifié + entrepreneur</div>
                {[
                  ["🏟️","ELITE 360° (2j clubs pro)","AFDAS finance 100% · Clubs Pro A/B · 1 club = 10 recommandations dans le milieu","4 500€ HT"],
                  ["🏀","Formation Coach Pro","500 000 licenciés basket · 80% encadrés par bénévoles · Marché immense","1 600€/groupe"],
                  ["🏟️","Formation Club Pro","4 000 clubs basket en France · Aucun formateur ne propose ça aujourd'hui","2 000€/groupe"],
                ].map(([icon,titre,desc,prix])=>(
                  <div key={titre} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.04)",alignItems:"flex-start"}}>
                    <span style={{fontSize:16,flexShrink:0,width:22,textAlign:"center"}}>{icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:1}}>{titre}</div>
                      <div style={{fontSize:11,color:td}}>{desc}</div>
                    </div>
                    <div style={{fontSize:11,color:ok,fontWeight:700,fontFamily:"monospace",flexShrink:0,textAlign:"right"}}>{prix}</div>
                  </div>
                ))}
              </div>

              {/* CALCUL 10K */}
              <div style={{...card,border:"1px solid rgba(201,168,76,.3)",background:"linear-gradient(135deg,rgba(201,168,76,.08),transparent)"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:g,marginBottom:10}}>📊 Comment atteindre 10 000€/mois</div>
                {[
                  ["Mois 1","Ménage × 2 + Camp basket + Mindset sensib.","3 500€"],
                  ["Mois 2","Mois 1 + Conflits CNV × 2 + SST × 1","6 000€"],
                  ["Mois 3","Mois 2 + Incendie × 2 + Postures × 1","8 400€"],
                  ["Mois 4-5","+ ELITE 360° (1 club) + Coach Pro × 1","10 000€+ 🎉"],
                ].map(([mois,desc,total])=>(
                  <div key={mois} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.05)",alignItems:"flex-start"}}>
                    <div style={{width:52,flexShrink:0,fontSize:10,color:g,fontWeight:700,fontFamily:"monospace",paddingTop:2}}>{mois}</div>
                    <div style={{flex:1,fontSize:11,color:tm,lineHeight:1.5}}>{desc}</div>
                    <div style={{fontSize:13,color:g,fontWeight:900,fontFamily:"'Playfair Display',serif",flexShrink:0}}>{total}</div>
                  </div>
                ))}
                <div style={{marginTop:10,padding:"9px 12px",background:"rgba(201,168,76,.1)",borderRadius:8,border:"1px solid rgba(201,168,76,.2)"}}>
                  <div style={{fontSize:12,color:g,fontWeight:700,marginBottom:2}}>🔑 La clé : commencer maintenant sans attendre</div>
                  <div style={{fontSize:11,color:tm,lineHeight:1.6}}>Tu as DÉJÀ tout ce qu'il faut pour démarrer cette semaine. La CNV avec ton Master Communication est ta super-arme — aucun autre formateur en France n'a ton profil complet.</div>
                </div>
              </div>

              {/* ACTIONS URGENTES */}
              <div style={card}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,marginBottom:8}}>✅ Actions cette semaine — dans l'ordre</div>
                {[
                  ["a1","Vérifier solde CPF → moncompteformation.gouv.fr"],
                  ["a2","S'inscrire CNV → lacoopcnv.com (1ère priorité — CPF)"],
                  ["a3","Appeler FMS 01 48 20 10 00 pour SST (CPF)"],
                  ["a4","Créer auto-entreprise → autoentrepreneur.urssaf.fr (Code APE 85.59A)"],
                  ["a5","Contacter 3 hôtels IDF pour formation ménage (appel direct)"],
                  ["a6","Poster sur LinkedIn : 'Ex-joueur pro + formateur — disponible'"],
                  ["a7","Préparer 4 documents officiels (Convention, Émargement, Attestation, Satisfaction)"],
                  ["a8","Appeler FIDUCIAL FPSG 01 49 21 15 15 → partenariat Conflits"],
                ].map(([id,txt])=>(
                  <div key={id} onClick={()=>chk(id)} style={{display:"flex",gap:9,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.04)",cursor:"pointer",alignItems:"flex-start"}}>
                    <div style={chkB(checked[id])}>{checked[id]?"✓":""}</div>
                    <span style={{fontSize:12,color:checked[id]?td:tm,textDecoration:checked[id]?"line-through":"none",lineHeight:1.5}}>{txt}</span>
                  </div>
                ))}
              </div>

            </div>
          )}

          {page==="formations"&&(
            <div className="fi" style={{height:"100%",display:"flex",flexDirection:"column",minHeight:0}}>
              <div style={{background:d2,borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",flexShrink:0,overflowX:"auto"}}>
                <button style={tabB(formSub==="standard")} onClick={()=>setFormSub("standard")}>📋 Standards</button>
                <button style={tabB(formSub==="menage")} onClick={()=>setFormSub("menage")}>🧹 Ménage</button>
                <button style={tabB(formSub==="sport")} onClick={()=>setFormSub("sport")}>🏆 Sport Mental</button>
                <button style={tabB(formSub==="skills")} onClick={()=>setFormSub("skills")}>⚡ Skills</button>
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"12px 16px",minHeight:0}}>
                {formSub==="standard"&&(
                  <div>
                    <div style={{fontSize:10,color:td,letterSpacing:"2px",textTransform:"uppercase",marginBottom:12,fontFamily:"'DM Mono',monospace"}}>Tap pour voir le programme complet</div>
                    {ALL_FORMATIONS.filter(f=>f.cat==="standard").map(f=>(
                      <div key={f.id} onClick={()=>setSelectedForm(f.id)} style={{...card,cursor:"pointer",borderLeft:`3px solid ${f.color}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
                          <div><span style={{fontSize:18}}>{f.icon}</span> <span style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:t}}>{f.title}</span></div>
                          <span style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:f.color}}>{f.price}</span>
                        </div>
                        <div style={{fontSize:11,color:td,marginBottom:8}}>{f.subtitle} · {f.public.split("—")[0].split(",")[0]}</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:6}}>
                          {f.modules.map((m,i)=><span key={i} style={{padding:"2px 7px",background:`${f.color}10`,border:`1px solid ${f.color}20`,borderRadius:20,fontSize:10,color:f.color}}>{m.num} · {m.title}</span>)}
                        </div>
                        <div style={{fontSize:11,color:td}}>Voir programme complet + tarifs →</div>
                      </div>
                    ))}
                  </div>
                )}
                {formSub==="sport"&&(
                  <div>
                    <div style={{...card,background:"linear-gradient(135deg,rgba(201,168,76,.07),transparent)",border:"1px solid rgba(201,168,76,.2)"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:900,color:g,marginBottom:5}}>🏆 Sport & Santé Mentale</div>
                      <div style={{fontSize:12,color:tm,lineHeight:1.6,marginBottom:7}}>4 formations originales basées sur des études scientifiques. Créneau unique sur le marché français. AFDAS finance pour les clubs pro.</div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:gd,color:g,border:"1px solid rgba(201,168,76,.3)"}}>NBA · Football · Rugby · Athlétisme</span>
                        <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(76,175,130,.1)",color:ok,border:"1px solid rgba(76,175,130,.3)"}}>AFDAS finance</span>
                      </div>
                    </div>
                    {ALL_FORMATIONS.filter(f=>f.cat==="sport").map(f=>(
                      <div key={f.id} onClick={()=>setSelectedForm(f.id)} style={{...card,cursor:"pointer",borderLeft:`3px solid ${f.color}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                          <span style={{fontSize:22}}>{f.icon}</span>
                          {f.id==="elite360"&&<span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(255,215,0,.1)",color:"#FFD700",border:"1px solid rgba(255,215,0,.3)"}}>⭐ Flagship</span>}
                        </div>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:t,marginBottom:2}}>{f.title}</div>
                        <div style={{fontSize:11,color:td,marginBottom:4}}>{f.subtitle}</div>
                        <div style={{fontSize:12,color:f.color,fontWeight:600,marginBottom:6}}>{f.price.split("·")[0].trim()}</div>
                        <div style={{fontSize:12,color:tm,fontStyle:"italic",marginBottom:7}}>"{f.tagline}"</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:6}}>
                          {f.modules.map((m,i)=><span key={i} style={{padding:"2px 6px",background:`${f.color}10`,border:`1px solid ${f.color}20`,borderRadius:20,fontSize:10,color:f.color}}>{m.num} · {m.title}</span>)}
                        </div>
                        <div style={{fontSize:11,color:td}}>Voir programme + études scientifiques →</div>
                      </div>
                    ))}
                  </div>
                )}
                {formSub==="menage"&&(
                  <div>
                    <div style={{...card,background:"linear-gradient(135deg,rgba(6,182,212,.07),transparent)",border:"1px solid rgba(6,182,212,.2)"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:900,color:"#06B6D4",marginBottom:5}}>🧹 Ménage & Entretien Professionnel</div>
                      <div style={{fontSize:12,color:tm,lineHeight:1.6,marginBottom:7}}>Basé sur 2 ans d'activité et <strong style={{color:"#06B6D4"}}>400+ sessions réalisées</strong> en commerces, hôtels, conciergeries et particuliers. Une expertise terrain unique pour former les agents d'entretien aux standards professionnels.</div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(6,182,212,.1)",color:"#06B6D4",border:"1px solid rgba(6,182,212,.3)"}}>Hôtellerie · Commerce · Conciergerie</span>
                        <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(76,175,130,.1)",color:ok,border:"1px solid rgba(76,175,130,.3)"}}>OPCO Akto finance</span>
                      </div>
                    </div>
                    {ALL_FORMATIONS.filter(f=>f.cat==="menage").map(f=>(
                      <div key={f.id} onClick={()=>setSelectedForm(f.id)} style={{...card,cursor:"pointer",borderLeft:`3px solid ${f.color}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                          <span style={{fontSize:22}}>{f.icon}</span>
                          <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(6,182,212,.1)",color:"#06B6D4",border:"1px solid rgba(6,182,212,.3)"}}>400+ sessions</span>
                        </div>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:t,marginBottom:2}}>{f.title}</div>
                        <div style={{fontSize:11,color:td,marginBottom:4}}>{f.subtitle}</div>
                        <div style={{fontSize:12,color:f.color,fontWeight:600,marginBottom:6}}>{f.price.split("·")[0].trim()}</div>
                        <div style={{fontSize:12,color:tm,fontStyle:"italic",marginBottom:7}}>"{f.tagline}"</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:6}}>
                          {f.modules.map((m,i)=><span key={i} style={{padding:"2px 6px",background:`${f.color}10`,border:`1px solid ${f.color}20`,borderRadius:20,fontSize:10,color:f.color}}>{m.num} · {m.title}</span>)}
                        </div>
                        <div style={{fontSize:11,color:td}}>Voir programme complet + tarifs →</div>
                      </div>
                    ))}
                  </div>
                )}
                {formSub==="skills"&&(
                  <div>
                    <div style={{...card,background:"linear-gradient(135deg,rgba(245,158,11,.07),transparent)",border:"1px solid rgba(245,158,11,.2)"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:900,color:"#F59E0B",marginBottom:5}}>⚡ Formations SKILLS — Unique en France</div>
                      <div style={{fontSize:12,color:tm,lineHeight:1.6,marginBottom:7}}>3 formations basées sur ton expérience unique : ex-joueur pro 5 continents + entrepreneur + formateur. <strong style={{color:"#F59E0B"}}>Aucun concurrent en France ne propose cette combinaison.</strong></div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(245,158,11,.1)",color:"#F59E0B",border:"1px solid rgba(245,158,11,.3)"}}>Formateurs · Coachs · Dirigeants</span>
                        <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(76,175,130,.1)",color:ok,border:"1px solid rgba(76,175,130,.3)"}}>AFDAS finance</span>
                      </div>
                    </div>
                    {ALL_FORMATIONS.filter(f=>f.cat==="skills").map(f=>(
                      <div key={f.id} onClick={()=>setSelectedForm(f.id)} style={{...card,cursor:"pointer",borderLeft:`3px solid ${f.color}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                          <span style={{fontSize:22}}>{f.icon}</span>
                          <span style={{fontSize:12,color:f.color,fontWeight:700}}>{f.price.split("·")[0].trim()}</span>
                        </div>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:t,marginBottom:2}}>{f.title}</div>
                        <div style={{fontSize:11,color:td,marginBottom:4}}>{f.subtitle}</div>
                        <div style={{fontSize:12,color:tm,fontStyle:"italic",marginBottom:7}}>"{f.tagline}"</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:6}}>
                          {f.modules.map((m,i)=><span key={i} style={{padding:"2px 6px",background:`${f.color}10`,border:`1px solid ${f.color}20`,borderRadius:20,fontSize:10,color:f.color}}>{m.num} · {m.title}</span>)}
                        </div>
                        <div style={{fontSize:11,color:td}}>Voir programme complet →</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {page==="library"&&(
            <div className="fi" style={{height:"100%",display:"flex",flexDirection:"column",minHeight:0}}>
              <div style={{padding:"10px 16px",background:d2,borderBottom:"1px solid rgba(255,255,255,.06)",flexShrink:0}}>
                <input value={libSearch} onChange={e=>setLibSearch(e.target.value)} placeholder="🔍 Rechercher..." style={{...inp,marginBottom:7,background:d3}}/>
                <div style={{display:"flex",gap:4,overflowX:"auto",paddingBottom:2}}>
                  {CATS.map(c=>(
                    <button key={c} onClick={()=>setLibCat(c)} style={{padding:"4px 8px",borderRadius:20,fontSize:10,fontWeight:libCat===c?600:400,cursor:"pointer",border:`1px solid ${libCat===c?g:"rgba(255,255,255,.1)"}`,background:libCat===c?gd:"transparent",color:libCat===c?g:td,fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0}}>{c}</button>
                  ))}
                </div>
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"10px 16px",minHeight:0}}>
                <div style={{fontSize:10,color:td,marginBottom:8,fontFamily:"'DM Mono',monospace"}}>{filteredLib.length} centre{filteredLib.length>1?"s":""} {savedCount>0&&<span style={{color:g}}>· ⭐ {savedCount} sauvegardé{savedCount>1?"s":""}</span>}</div>
                {filteredLib.map(f=>(
                  <div key={f.id} style={{background:saved[f.id]?"rgba(201,168,76,.04)":d3,border:`1px solid ${saved[f.id]?"rgba(201,168,76,.35)":"rgba(255,255,255,.07)"}`,borderRadius:12,padding:"12px 14px",marginBottom:8,borderLeft:`3px solid ${f.highlight?"#FFD700":f.color}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:700,color:t,marginBottom:2}}>{f.name}</div>
                        <div style={{fontSize:11,color:td}}>📍 {f.adresse}</div>
                        <div style={{fontSize:11,color:g,marginTop:1}}>📞 {f.tel}</div>
                      </div>
                      <button onClick={()=>toggleSave(f.id)} style={{padding:"4px 8px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",border:`1px solid ${saved[f.id]?g:"rgba(255,255,255,.12)"}`,background:saved[f.id]?g:"transparent",color:saved[f.id]?d:td,marginLeft:8,flexShrink:0}}>{saved[f.id]?"⭐":"☆"}</button>
                    </div>
                    <div style={{display:"flex",gap:4,marginBottom:7,flexWrap:"wrap"}}>
                      <span style={{padding:"2px 6px",borderRadius:20,fontSize:9,fontWeight:600,background:"rgba(201,168,76,.1)",color:g,border:"1px solid rgba(201,168,76,.25)"}}>{f.dist}</span>
                      {f.qualiopi&&<span style={{padding:"2px 6px",borderRadius:20,fontSize:9,fontWeight:600,background:"rgba(76,175,130,.1)",color:ok,border:"1px solid rgba(76,175,130,.25)"}}>✅ Qualiopi</span>}
                      {f.cpf&&<span style={{padding:"2px 6px",borderRadius:20,fontSize:9,fontWeight:600,background:"rgba(74,124,255,.1)",color:ac,border:"1px solid rgba(74,124,255,.25)"}}>💳 CPF</span>}
                      {f.highlight&&<span style={{padding:"2px 6px",borderRadius:20,fontSize:9,fontWeight:600,background:"rgba(255,215,0,.1)",color:"#FFD700",border:"1px solid rgba(255,215,0,.3)"}}>⭐ Top</span>}
                    </div>
                    <div style={{cursor:"pointer"}} onClick={()=>setExpandedOrg(expandedOrg===f.id?null:f.id)}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{fontSize:11,color:td}}>{f.formations.slice(0,2).join(" · ")}{f.formations.length>2?` +${f.formations.length-2}`:""}</div>
                        <span style={{color:td,fontSize:12,transform:expandedOrg===f.id?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
                      </div>
                      {expandedOrg===f.id&&(
                        <div className="fi" style={{marginTop:9,paddingTop:9,borderTop:"1px solid rgba(255,255,255,.06)"}}>
                          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:7}}>
                            {f.formations.map((fm,i)=><span key={i} style={{padding:"2px 7px",background:`${f.color}10`,border:`1px solid ${f.color}20`,borderRadius:20,fontSize:10,color:f.color}}>{fm}</span>)}
                          </div>
                          <div style={{fontSize:11,color:tm,fontStyle:"italic",marginBottom:8}}>💡 {f.note}</div>
                          <div style={{display:"flex",gap:7}}>
                            <a href={`tel:${f.tel}`}><button style={{...btnG,padding:"6px 12px",fontSize:11}}>📞 Appeler</button></a>
                            <a href={`https://${f.web}`} target="_blank" rel="noreferrer"><button style={{...btnO,padding:"6px 12px",fontSize:11}}>🌐 Site</button></a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {filteredLib.length===0&&<div style={{textAlign:"center",padding:"40px 20px",color:td}}><div style={{fontSize:32,marginBottom:10}}>🔍</div><div>Aucun centre trouvé.</div></div>}
              </div>
            </div>
          )}

          {page==="assistant"&&(
            <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
              <div style={{padding:"8px 14px",background:d2,borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",flexWrap:"wrap",gap:5,flexShrink:0}}>
                {QUICK.map(([l,q])=><button key={l} className="chip" onClick={()=>send(q)}>{l}</button>)}
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"12px 16px",display:"flex",flexDirection:"column",gap:12,minHeight:0}}>
                {msgs.map((m,i)=>(
                  <div key={i} className="fi" style={{display:"flex",gap:9,flexDirection:m.role==="user"?"row-reverse":"row",alignItems:"flex-start"}}>
                    <div style={{width:27,height:27,borderRadius:7,background:m.role==="ai"?gd:d4,border:`1px solid ${m.role==="ai"?"rgba(201,168,76,.25)":"rgba(255,255,255,.08)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{m.role==="ai"?"🎓":"👤"}</div>
                    <div style={{maxWidth:"80%",padding:"10px 12px",borderRadius:10,background:m.role==="ai"?d3:gd,border:`1px solid ${m.role==="ai"?"rgba(255,255,255,.06)":"rgba(201,168,76,.2)"}`,fontSize:13,lineHeight:1.68,color:m.role==="ai"?tm:t,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>
                      {m.tag&&<div style={{fontSize:10,color:m.tag.includes("Web")?ac:ok,marginBottom:4,fontFamily:"'DM Mono',monospace"}}>{m.tag}</div>}
                      {m.text}
                    </div>
                  </div>
                ))}
                {busy&&(
                  <div style={{display:"flex",gap:9}}>
                    <div style={{width:27,height:27,borderRadius:7,background:gd,border:"1px solid rgba(201,168,76,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🎓</div>
                    <div style={{padding:"10px 12px",borderRadius:10,background:d3,border:"1px solid rgba(255,255,255,.06)",display:"flex",gap:6,alignItems:"center"}}>
                      {[0,150,300].map((dd,i)=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:g,animation:`pulse 1.1s ${dd}ms infinite`}}/>)}
                      <span style={{fontSize:10,color:td,fontFamily:"'DM Mono',monospace",marginLeft:3}}>Recherche...</span>
                    </div>
                  </div>
                )}
                <div ref={bottomRef}/>
              </div>
              <div style={{padding:"10px 14px",borderTop:"1px solid rgba(255,255,255,.06)",background:d2,display:"flex",gap:8,alignItems:"flex-end",flexShrink:0}}>
                <textarea value={inputVal} onChange={e=>setInputVal(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Pose ta question... (Entrée pour envoyer)" rows={2} style={{flex:1,background:d3,border:"1px solid rgba(255,255,255,.09)",borderRadius:10,padding:"10px 12px",color:t,fontSize:14,resize:"none",outline:"none",fontFamily:"inherit",lineHeight:1.5}}/>
                <button onClick={()=>send()} disabled={busy||!inputVal.trim()} style={{width:42,height:42,background:g,border:"none",borderRadius:10,cursor:"pointer",fontSize:17,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",opacity:busy||!inputVal.trim()?0.38:1}}>➤</button>
              </div>
            </div>
          )}

          {page==="roadmap"&&(
            <div className="fi" style={{height:"100%",display:"flex",flexDirection:"column",minHeight:0}}>
              {/* Sub tabs */}
              <div style={{background:d2,borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",flexShrink:0}}>
                <button style={tabB(roadTab==="roadmap")} onClick={()=>setRoadTab("roadmap")}>🎯 Roadmap</button>
                <button style={tabB(roadTab==="documents")} onClick={()=>setRoadTab("documents")}>📄 Documents</button>
                <button style={tabB(roadTab==="vente")} onClick={()=>setRoadTab("vente")}>💬 Scripts vente</button>
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"12px 16px",minHeight:0}}>
              <div style={{...card,background:"linear-gradient(135deg,rgba(201,168,76,.06),transparent)",border:"1px solid rgba(201,168,76,.2)",marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g}}>🎯 Progression globale</div>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:g,fontWeight:600}}>{done}/{totalSteps} · {pct}%</span>
                </div>
                <div style={{height:5,background:d5,borderRadius:3,overflow:"hidden",marginBottom:10}}>
                  <div style={{height:"100%",width:pct+"%",background:`linear-gradient(90deg,${g},${gl})`,borderRadius:3,transition:"width .5s"}}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[["0€","Mois 1"],["1500€","Mois 3"],["5000€","Mois 6"]].map(([v,l])=>(
                    <div key={l} style={{background:d4,borderRadius:8,padding:"7px 9px",textAlign:"center"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:900,color:g}}>{v}</div>
                      <div style={{fontSize:10,color:td,marginTop:1}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {ROADMAP_SECTIONS.map(section=>(
                <div key={section.id} style={{marginBottom:8}}>
                  <div onClick={()=>toggleSec(section.id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:d3,border:`1px solid ${openSec[section.id]?section.color+"35":"rgba(255,255,255,.07)"}`,borderRadius:openSec[section.id]?"10px 10px 0 0":10,padding:"11px 13px",cursor:"pointer",borderLeft:`4px solid ${section.color}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:9}}>
                      <span style={{fontSize:16}}>{section.icon}</span>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:t}}>{section.title}</div>
                        <div style={{fontSize:10,color:td,marginTop:1}}>{section.subtitle}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:7}}>
                      <span style={{fontSize:11,color:section.color,fontFamily:"'DM Mono',monospace"}}>{section.steps.filter(([id])=>checked[id]).length}/{section.steps.length}</span>
                      <span style={{color:td,fontSize:12,transform:openSec[section.id]?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
                    </div>
                  </div>
                  {openSec[section.id]&&(
                    <div style={{background:d4,border:`1px solid ${section.color}25`,borderTop:"none",borderRadius:"0 0 10px 10px",padding:"7px 11px 9px"}}>
                      {section.steps.map(([id,txt])=>(
                        <div key={id} onClick={()=>chk(id)} style={{display:"flex",gap:9,padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,.04)",cursor:"pointer",alignItems:"flex-start"}}>
                          <div style={chkB(checked[id])}>{checked[id]?"✓":""}</div>
                          <span style={{fontSize:11,color:checked[id]?td:tm,textDecoration:checked[id]?"line-through":"none",lineHeight:1.5}}>{txt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {roadTab==="roadmap"&&(<div>
                <div style={{...card,background:"linear-gradient(135deg,rgba(201,168,76,.06),transparent)",border:"1px solid rgba(201,168,76,.2)",marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g}}>🎯 Progression globale</div>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:g,fontWeight:600}}>{done}/{totalSteps} · {pct}%</span>
                  </div>
                  <div style={{height:5,background:d5,borderRadius:3,overflow:"hidden",marginBottom:10}}>
                    <div style={{height:"100%",width:pct+"%",background:`linear-gradient(90deg,${g},${gl})`,borderRadius:3,transition:"width .5s"}}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                    {[["0€","Mois 1"],["1500€","Mois 3"],["5000€","Mois 6"]].map(([v,l])=>(
                      <div key={l} style={{background:d4,borderRadius:8,padding:"7px 9px",textAlign:"center"}}>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:900,color:g}}>{v}</div>
                        <div style={{fontSize:10,color:td,marginTop:1}}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {ROADMAP_SECTIONS.map(section=>(
                  <div key={section.id} style={{marginBottom:8}}>
                    <div onClick={()=>toggleSec(section.id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:d3,border:`1px solid ${openSec[section.id]?section.color+"35":"rgba(255,255,255,.07)"}`,borderRadius:openSec[section.id]?"10px 10px 0 0":10,padding:"11px 13px",cursor:"pointer",borderLeft:`4px solid ${section.color}`}}>
                      <div style={{display:"flex",alignItems:"center",gap:9}}>
                        <span style={{fontSize:16}}>{section.icon}</span>
                        <div>
                          <div style={{fontSize:13,fontWeight:700,color:t}}>{section.title}</div>
                          <div style={{fontSize:10,color:td,marginTop:1}}>{section.subtitle}</div>
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:7}}>
                        <span style={{fontSize:11,color:section.color,fontFamily:"'DM Mono',monospace"}}>{section.steps.filter(([id])=>checked[id]).length}/{section.steps.length}</span>
                        <span style={{color:td,fontSize:12,transform:openSec[section.id]?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
                      </div>
                    </div>
                    {openSec[section.id]&&(
                      <div style={{background:d4,border:`1px solid ${section.color}25`,borderTop:"none",borderRadius:"0 0 10px 10px",padding:"7px 11px 9px"}}>
                        {section.steps.map(([id,txt])=>(
                          <div key={id} onClick={()=>chk(id)} style={{display:"flex",gap:9,padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,.04)",cursor:"pointer",alignItems:"flex-start"}}>
                            <div style={chkB(checked[id])}>{checked[id]?"✓":""}</div>
                            <span style={{fontSize:11,color:checked[id]?td:tm,textDecoration:checked[id]?"line-through":"none",lineHeight:1.5}}>{txt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>)}

              {roadTab==="documents"&&(<div>
                <div style={{...card,border:"1px solid rgba(201,168,76,.2)",background:"rgba(201,168,76,.03)"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:3}}>📄 Documents officiels de formation</div>
                  <div style={{fontSize:11,color:td,marginBottom:14}}>Remplis les infos une fois — tous les documents se mettent à jour automatiquement.</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                    {[["Organisme",org,setOrg,"Ex: Pro Formation IDF"],["Formateur",trainer,setTrainer,"Ex: Tiegbe Bamba"],["Formation",ftitle,setFtitle,"Ex: Gestion des conflits"],["Date",fdate,setFdate,""]].map(([l,v,sv,ph],ki)=>(
                      <div key={ki}><label style={{fontSize:9,color:td,marginBottom:3,display:"block",textTransform:"uppercase",letterSpacing:"1px"}}>{l}</label><input type={l==="Date"?"date":"text"} value={v} onChange={e=>sv(e.target.value)} placeholder={ph} style={inp}/></div>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,.07)",marginBottom:12}}>
                  {[["att","📜 Attestation"],["em","✍️ Émargement"],["conv","📋 Convention"],["sat","⭐ Satisfaction"]].map(([id,l])=>(
                    <button key={id} style={tabB(docTab===id)} onClick={()=>setDocTab(id)}>{l}</button>
                  ))}
                </div>
                {/* Doc label */}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{fontSize:12,fontWeight:600,color:t}}>
                    {docTab==="att"&&"📜 Attestation de formation"}
                    {docTab==="em"&&"✍️ Feuille d'émargement"}
                    {docTab==="conv"&&"📋 Convention de formation"}
                    {docTab==="sat"&&"⭐ Questionnaire de satisfaction"}
                  </div>
                  <div style={{fontSize:10,color:ok}}>Obligatoire ✓</div>
                </div>
                <div style={{background:d3,border:"1px solid rgba(201,168,76,.12)",borderRadius:8,padding:"13px 15px",fontFamily:"'DM Mono',monospace",fontSize:11,lineHeight:1.9,color:tm,whiteSpace:"pre-wrap",maxHeight:320,overflowY:"auto",marginBottom:12}}>{docContent[docTab]}</div>
                <div style={{display:"flex",gap:8,marginBottom:16}}>
                  <button style={{...btnG,flex:1,fontSize:12}} onClick={()=>navigator.clipboard?.writeText(docContent[docTab])}>📋 Copier le document</button>
                  <button style={{...btnO,fontSize:12}} onClick={()=>window.print()}>🖨️ Imprimer</button>
                </div>
                {/* Legal reminder */}
                <div style={{...card,borderLeft:"3px solid #E05555",background:"rgba(224,85,85,.04)"}}>
                  <div style={{fontSize:11,color:"#E05555",fontWeight:600,marginBottom:8}}>⚖️ Rappel légal — Ordre des documents</div>
                  {[["AVANT la formation","Convention signée · Programme remis au stagiaire"],["PENDANT la formation","Feuille d'émargement signée (matin + après-midi)"],["APRÈS la formation","Attestation remise · Questionnaire satisfaction · Facture TVA exonérée"]].map(([q,a])=>(
                    <div key={q} style={{marginBottom:8,paddingBottom:8,borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                      <div style={{fontSize:11,fontWeight:600,color:t,marginBottom:2}}>{q}</div>
                      <div style={{fontSize:11,color:td}}>{a}</div>
                    </div>
                  ))}
                  <div style={{fontSize:11,color:td}}>💡 Mention facture : <span style={{color:tm,fontFamily:"monospace"}}>Exonération TVA - Art. 261-4-4° du CGI</span></div>
                </div>
              </div>)}

              {roadTab==="vente"&&(<div>
                <div style={{...card,border:"1px solid rgba(201,168,76,.2)",background:"rgba(201,168,76,.03)"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:3}}>💬 Scripts de prospection</div>
                  <div style={{fontSize:11,color:td,marginBottom:0}}>Outils prêts à l'emploi pour décrocher tes clients.</div>
                </div>
                <div style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,.07)",marginBottom:12}}>
                  {[["email","📧 Email"],["linkedin","💼 LinkedIn"],["tel","📞 Tél."],["tarifs","💰 Tarifs"]].map(([id,l])=>(
                    <button key={id} style={tabB(venteTab===id)} onClick={()=>setVenteTab(id)}>{l}</button>
                  ))}
                </div>
                <div style={{background:d3,border:"1px solid rgba(255,255,255,.07)",borderRadius:8,padding:"13px 15px",fontFamily:"'DM Mono',monospace",fontSize:11,lineHeight:1.85,color:tm,whiteSpace:"pre-wrap",maxHeight:340,overflowY:"auto",marginBottom:10}}>{venteContent[venteTab]}</div>
                <button style={{...btnG,fontSize:12,width:"100%",justifyContent:"center",display:"flex"}} onClick={()=>navigator.clipboard?.writeText(venteContent[venteTab])}>📋 Copier le script</button>
              </div>)}

            </div>
            </div>
          )}

          {page==="profile"&&(
            <div className="fi" style={{height:"100%",overflowY:"auto",padding:"14px 16px"}}>
              {/* Hero profile */}
              <div style={{background:"linear-gradient(135deg,#1A1A1A,#111)",border:"1px solid rgba(201,168,76,.25)",borderRadius:16,padding:"22px",marginBottom:14,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${g},#FFD700,${g})`}}/>
                <div style={{display:"flex",gap:16,alignItems:"flex-start",marginBottom:14}}>
                  <div style={{width:64,height:64,borderRadius:14,background:"linear-gradient(135deg,rgba(201,168,76,.3),rgba(201,168,76,.1))",border:"2px solid rgba(201,168,76,.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>🏀</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:900,color:g,lineHeight:1}}>Tiegbe Bamba</div>
                    <div style={{fontSize:12,color:t,marginTop:4,fontWeight:500}}>Pro Basketball Player · Formateur Expert</div>
                    <div style={{fontSize:11,color:td,marginTop:2}}>Côte d'Ivoire 🇨🇮 · Né à Sarcelles · 1m96 · Ailier</div>
                  </div>
                </div>
                <div style={{fontSize:13,color:tm,lineHeight:1.7,marginBottom:12}}>Joueur professionnel de basket ayant évolué sur <strong style={{color:g}}>5 continents</strong> en 1ère et 2ème division, Sélection Nationale Côte d'Ivoire 🇨🇮, diplômé de <strong style={{color:g}}>Portland State University</strong> (USA) · Master Communication & Marketing · Entrepreneur série avec <strong style={{color:g}}>5 business créés</strong> · Formateur terrain · Bilingue FR/EN.</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button style={btnG} onClick={()=>setPage("formations")}>🎓 Mes formations</button>
                  <button style={btnO}>📲 LinkedIn</button>
                </div>
              </div>

              {/* Stats carrière */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10}}>📊 Carrière Professionnelle</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                {[["5","Continents","France · USA · Grèce · Roumanie · Islande"],["15+","Années pro","Limoges · Châlons-Reims · Portland State · Rouen"],["11.6","Points/match","Saison senior Portland State (NCAA)"],["6.8","Rebonds/match","Leader rebounds Portland State 2014-15"],["24","Record points","Islande · Grindavik vs Stjarnan (2018)"],["30","Record efficacité","Meilleur match en carrière internationale"]].map(([v,l,s])=>(
                  <div key={l} style={{background:d3,border:"1px solid rgba(255,255,255,.07)",borderRadius:10,padding:"12px",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${g},transparent)`}}/>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:g}}>{v}</div>
                    <div style={{fontSize:10,color:t,fontWeight:600,marginTop:2,textTransform:"uppercase",letterSpacing:".05em"}}>{l}</div>
                    <div style={{fontSize:10,color:td,marginTop:3,lineHeight:1.4}}>{s}</div>
                  </div>
                ))}
              </div>

              {/* Parcours */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10}}>🗺️ Parcours International</div>
              <div style={card}>
                {[["🇺🇸","USA — NCAA","Portland State University · Big Sky Conference · 2015","Diplômé + Big Sky Player of the Week"],["🇫🇷","France — Pro A/ProB","Limoges U21 · Châlons-Reims Jeep Elite · Rouen NM1","Élite française — premier et deuxième division"],["🇬🇷","Grèce","Psyhiko (2016)","Division professionnelle grecque"],["🇮🇸","Islande","Grindavik · Express League (2018-2019)","Record : 24 pts / 10 reb / Efficiency 30"],["🇷🇴","Roumanie","Division professionnelle","Expérience est-européenne"],["🌍","Côte d'Ivoire","Équipe Nationale","Coupe du Monde FIBA · Représentation internationale"]].map(([flag,pays,equipe,note])=>(
                  <div key={pays} style={{display:"flex",gap:12,padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.05)",alignItems:"flex-start"}}>
                    <span style={{fontSize:20,flexShrink:0,width:28,textAlign:"center"}}>{flag}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600,color:t}}>{pays}</div>
                      <div style={{fontSize:11,color:td,marginTop:1}}>{equipe}</div>
                      <div style={{fontSize:11,color:g,marginTop:2,fontStyle:"italic"}}>{note}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Compétences */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10,marginTop:4}}>💎 Compétences à Monétiser</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                {[
                  ["🏀","Expert Basketball","Formation technique, mental, management. 15 ans d'expérience pro.","#C9A84C"],
                  ["🧠","Préparation Mentale","Vécu de haut niveau. Dépression, pression, résilience. Authentique.","#4CAF82"],
                  ["🎓","Formateur Certifié","Master Communication & Marketing · Portland State USA","#4A7CFF"],
                  ["🌍","Profil International","5 continents · Bilingue FR/EN · Réseau mondial","#8B5CF6"],
                  ["🧹","Entrepreneur Série","5 business créés : location voiture, restaurant, import/export, consulting marketing, société de ménage","#06B6D4"],
                  ["📣","Speaker & Coach","Camps basket · Interventions clubs · Formation mentale","#E05555"],
                ].map(([icon,titre,desc,color])=>(
                  <div key={titre} style={{background:d3,border:`1px solid ${color}25`,borderRadius:10,padding:"13px",borderLeft:`3px solid ${color}`}}>
                    <div style={{fontSize:20,marginBottom:6}}>{icon}</div>
                    <div style={{fontSize:12,fontWeight:700,color:t,marginBottom:4}}>{titre}</div>
                    <div style={{fontSize:11,color:td,lineHeight:1.5}}>{desc}</div>
                  </div>
                ))}
              </div>

              {/* Argument de vente */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10}}>🚀 Comment Vendre Tes Formations ELITE</div>
              <div style={card}>
                <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>Ton pitch — 30 secondes</div>
                <div style={{background:d4,borderRadius:8,padding:"12px 14px",fontFamily:"'DM Mono',monospace",fontSize:12,lineHeight:1.8,color:tm,marginBottom:12}}>
                  "J'ai joué pro pendant 15 ans sur 5 continents. J'ai vécu la pression, les blessures, la dépression du champion et la reconversion. Ce que je vous enseigne, ce n'est pas théorique — c'est du vécu. Mes formations ELITE sont utilisées par les clubs et académies qui veulent performer autrement."
                </div>
                <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>Canaux de vente prioritaires</div>
                {[["🏀","Camps de basket organisés","Intégrer 1h de formation mentale dans chaque camp → 200-500€ de plus par participant"],["🤝","Clubs Pro A / Pro B IDF","Proposition ELITE 360° à 4500€ — AFDAS finance pour les clubs"],["📲","LinkedIn + Instagram","Profil ex-joueur pro = crédibilité immédiate · Storytelling de ton parcours"],["🏫","Académies & lycées sportifs","INSEP · CREPS · Pôles espoirs · Format 1 journée possible"],["🌍","Marchés internationaux","Réseau joueurs pro contacts dans 5 pays → interventions online en anglais"]].map(([icon,titre,desc])=>(
                  <div key={titre} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.04)",alignItems:"flex-start"}}>
                    <span style={{fontSize:16,flexShrink:0}}>{icon}</span>
                    <div>
                      <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:2}}>{titre}</div>
                      <div style={{fontSize:11,color:td,lineHeight:1.5}}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Camps basket */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10}}>⛹️ Camps de Basket — Valeur Ajoutée</div>
              <div style={{...card,border:"1px solid rgba(201,168,76,.2)",background:"rgba(201,168,76,.03)"}}>
                <div style={{fontSize:12,color:tm,lineHeight:1.7,marginBottom:10}}>Ajoute un module mental de 1h à chaque camp de basket pour augmenter le prix et la valeur perçue :</div>
                {[["🧠 Module Mindset 1h","'Penser comme un champion' — visualisation, routine, confiance","+ 100-200€/participant"],["🌱 Module Résilience 1h","'Comment les pros gèrent la pression et les défaites'","+ 80-150€/participant"],["⚡ Module Performance 1h","'Sommeil, nutrition mentale, récupération des élites'","+ 80-150€/participant"],["🎓 Formation 2j ELITE 360°","Programme complet pour équipe ou académie","4 500€ HT le groupe"]].map(([titre,desc,prix])=>(
                  <div key={titre} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.04)",alignItems:"flex-start",gap:8}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:1}}>{titre}</div>
                      <div style={{fontSize:11,color:td}}>{desc}</div>
                    </div>
                    <div style={{fontSize:11,color:g,fontWeight:600,fontFamily:"monospace",flexShrink:0,textAlign:"right"}}>{prix}</div>
                  </div>
                ))}
              </div>

              {/* 5 Business */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10,marginTop:4}}>🏗️ Mes 5 Business — Parcours Entrepreneur</div>
              <div style={card}>
                {[
                  ["🚗","Location de voiture","Service de location pour particuliers et entreprises. Gestion de flotte, contrats, assurances.","Fermé"],
                  ["🍽️","Restaurant","Restauration — gestion d'équipe, fournisseurs, service client, hygiène HACCP.","Fermé"],
                  ["📦","Import / Export de marchandises","Commerce international. Sourcing, logistique, douanes, relations fournisseurs.","Fermé"],
                  ["📣","Consultant Marketing","SIRET : 892 943 689 · Auto-entrepreneur · Conseil communication & stratégie marketing pour PME et entrepreneurs.","✅ Actif"],
                  ["🧹","Société de Ménage","SIRET : 928 738 954 · 4 ans d'activité · 1000+ sessions · Hôtels, commerces, particuliers. Formation terrain.","✅ Actif"],
                ].map(([icon,nom,desc,statut])=>(
                  <div key={nom} style={{display:"flex",gap:12,padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.05)",alignItems:"flex-start"}}>
                    <span style={{fontSize:20,flexShrink:0,width:28,textAlign:"center"}}>{icon}</span>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
                        <div style={{fontSize:13,fontWeight:600,color:t}}>{nom}</div>
                        <span style={{fontSize:9,padding:"2px 7px",borderRadius:20,background:statut.includes("Actif")?"rgba(76,175,130,.12)":"rgba(255,255,255,.07)",color:statut.includes("Actif")?ok:td,border:`1px solid ${statut.includes("Actif")?"rgba(76,175,130,.25)":"rgba(255,255,255,.1)"}`}}>{statut}</span>
                      </div>
                      <div style={{fontSize:11,color:td,lineHeight:1.5}}>{desc}</div>
                    </div>
                  </div>
                ))}
                <div style={{marginTop:10,padding:"9px 12px",background:gd,borderRadius:8,fontSize:11,color:g}}>💡 5 business = 5 secteurs maîtrisés = crédibilité unique comme formateur pluridisciplinaire</div>
              </div>

              {/* Légitimité */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10,marginTop:4}}>⚖️ Suis-je légitime ? Certifications & Démarches</div>
              <div style={{...card,border:"1px solid rgba(201,168,76,.2)",background:"rgba(201,168,76,.03)"}}>
                <div style={{fontSize:12,color:ok,fontWeight:600,marginBottom:8}}>✅ OUI — Tu peux vendre tes formations MAINTENANT</div>
                <div style={{fontSize:12,color:tm,lineHeight:1.7,marginBottom:12}}>Avec ton SIRET actif, tu peux légalement vendre des formations en préparation mentale et coaching sportif directement aux entreprises et clubs, sans certification supplémentaire. Ton expérience pro de 15 ans est ta légitimité principale.</div>
                <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>Pour apparaître sur les bases de données officielles</div>
                {[
                  ["🎓","Certification RS6785 — Préparation Mentale","Inscrite à France Compétences (Répertoire Spécifique). Organisme : Devenir Meilleur (preparation-mentale.com) · 100% en ligne · ✅ CPF éligible · Reconnue officiellement","Recommandé en priorité"],
                  ["📋","Déclaration DREETS","Après ta 1ère convention de formation signée → tu obtiens ton NDA → tu apparais dans le registre des organismes de formation","Obligatoire pour facturer"],
                  ["✅","Certification Qualiopi","Après 3-4 mois d'activité → donne accès au CPF, OPCO, France Travail → apparition sur moncompteformation.gouv.fr","Mois 3-4"],
                  ["🏆","Titre Formateur Professionnel Adultes (FPA RNCP)","Titre RNCP niveau 5 → reconnaissance maximale comme formateur. Finançable CPF. Ouvre tous les OPCO","Recommandé mois 6+"],
                ].map(([icon,titre,desc,timing])=>(
                  <div key={titre} style={{display:"flex",gap:10,padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.04)",alignItems:"flex-start"}}>
                    <span style={{fontSize:18,flexShrink:0,width:24,textAlign:"center"}}>{icon}</span>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                        <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:2}}>{titre}</div>
                        <span style={{fontSize:9,padding:"2px 6px",borderRadius:10,background:gd,color:g,border:"1px solid rgba(201,168,76,.25)",flexShrink:0,whiteSpace:"nowrap"}}>{timing}</span>
                      </div>
                      <div style={{fontSize:11,color:td,lineHeight:1.5}}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{...card,borderLeft:"3px solid #4A7CFF",background:"rgba(74,124,255,.04)"}}>
                <div style={{fontSize:11,color:ac,fontWeight:600,marginBottom:6}}>💡 Stratégie recommandée pour Tiegbe</div>
                <div style={{fontSize:12,color:tm,lineHeight:1.7}}>
                  <strong style={{color:t}}>Maintenant :</strong> Vendre directement aux clubs et entreprises avec ton SIRET. Tes clients utilisent leur budget interne ou leur OPCO (notamment AFDAS pour le sport).<br/><br/>
                  <strong style={{color:t}}>Mois 1-2 :</strong> Passer la certification RS6785 Préparation Mentale (CPF éligible — 0€ de ta poche) → tu apparais sur France Compétences.<br/><br/>
                  <strong style={{color:t}}>Mois 2-3 :</strong> Déclarer à la DREETS → obtenir ton NDA → convention + facturation légale.<br/><br/>
                  <strong style={{color:t}}>Mois 4 :</strong> Qualiopi → accès moncompteformation.gouv.fr → clients paient avec leur CPF directement.
                </div>
              </div>

            </div>
          )}

        </div>

        <div style={{background:d2,borderTop:"1px solid rgba(201,168,76,.12)",display:"flex",flexShrink:0,paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
          {NAV.map(({id,icon,label})=>(
            <button key={id} className="nb" onClick={()=>setPage(id)} style={{borderTop:`2px solid ${page===id?g:"transparent"}`}}>
              <span style={{fontSize:20}}>{icon}</span>
              <span style={{fontSize:9,letterSpacing:".03em",fontWeight:page===id?600:400,color:page===id?g:td,textTransform:"uppercase"}}>{label}{id==="library"&&savedCount>0?` (${savedCount})`:""}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
