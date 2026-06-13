// ============================================================
// ARCHIVE_FAMILLE — Données du jeu ARG
// ============================================================
// IDs 001-044 : énigmes définies
// ============================================================

export type Category = 'Personnage' | 'Objet' | 'Lieu' | 'Sort';
export type Tier = 'Vert' | 'Bleu' | 'Or' | 'Jaune' | 'Rouge';

export interface ArchivePuzzle {
  contact: string;
  missionText: string;
  question: string;
  answers: string[];
  hint?: string;
}

export interface ArchiveItem {
  id: string;
  filename: string;
  displayName: string;
  category: Category;
  tier: Tier;
  requiredUnlocks: number;
  puzzle: ArchivePuzzle;
  cardDescription: string;
}

export const TIER_THRESHOLDS: Record<Tier, number> = {
  Vert: 0, Bleu: 0, Or: 0, Jaune: 0, Rouge: 0,
};

export const TIER_COLORS: Record<Tier, string> = {
  Vert: '#33ff33',
  Bleu: '#00aaff',
  Or: '#ffd700',
  Jaune: '#ffcc00',
  Rouge: '#ff4444',
};

const ORACLE_EMAIL = 'oraclecore01@gmail.com';

/** Génère des variantes de réponse (casse + sans accents courants) */
function ans(...codes: string[]): string[] {
  const out = new Set<string>();
  for (const code of codes) {
    out.add(code);
    out.add(code.toLowerCase());
    out.add(code.toUpperCase());
    out.add(code.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase());
  }
  return [...out];
}

function photoMission(
  oracleTag: string,
  description: string,
  codes: string | string[],
  hint?: string,
): ArchivePuzzle {
  const codeList = typeof codes === 'string' ? [codes] : codes;
  return {
    contact: ORACLE_EMAIL,
    missionText: `${description} Envoyez à ${ORACLE_EMAIL} avec la mention ORACLE_CORE_01 : ${oracleTag}.`,
    question: 'Une fois la photo envoyée, entrez le code de décryptage reçu.',
    answers: ans(...codeList),
    hint,
  };
}

function videoMission(
  oracleTag: string,
  description: string,
  codes: string | string[],
  hint?: string,
): ArchivePuzzle {
  const codeList = typeof codes === 'string' ? [codes] : codes;
  return {
    contact: ORACLE_EMAIL,
    missionText: `${description} Envoyez à ${ORACLE_EMAIL} avec la mention ORACLE_CORE_01 : ${oracleTag}.`,
    question: 'Une fois la vidéo envoyée, entrez le code de décryptage reçu.',
    answers: ans(...codeList),
    hint,
  };
}

function messenger(
  contact: string,
  missionText: string,
  question: string,
  codes: string | string[],
  hint?: string,
): ArchivePuzzle {
  const codeList = typeof codes === 'string' ? [codes] : codes;
  return {
    contact,
    missionText,
    question,
    answers: ans(...codeList),
    hint,
  };
}

export const ITEMS: ArchiveItem[] = [
  // ============================================================
  // BLOC BLEU — PERSONNAGES 001-017
  // ============================================================
  {
    id: '001', filename: 'FICHIER_BLEU_DAVID.dat', displayName: 'DAVID',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: photoMission(
      'SIZE_BUG',
      'Épreuve photo — illusion d\'optique géante : prenez une photo en perspective forcée où un tout petit objet de la maison a l\'air d\'un monstre géant à côté de vous (ex. : placez un petit dinosaure ou un toutou tout près de la caméra pour qu\'il ait l\'air plus gros que vous au fond de la pièce).',
      'BIG_DAVE',
    ),
    cardDescription: 'Carte Personnage — David.',
  },
  {
    id: '002', filename: 'FICHIER_BLEU_LAURIANE.dat', displayName: 'LAURIANE',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: messenger(
      'David',
      'Mission Messenger : envoyez un message à David.',
      'Quel dessert Lauriane adore-t-elle mais ne peut strictement pas consommer ?',
      'CHOCOLAT',
    ),
    cardDescription: 'Carte Personnage — Lauriane.',
  },
  {
    id: '003', filename: 'FICHIER_BLEU_OLIVIER.dat', displayName: 'OLIVIER',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: photoMission(
      'UNIT_OLIVIER',
      'Épreuve photo : pour débloquer l\'accès au fichier du géant de la famille, trouvez l\'objet le plus lourd de la maison que vous pouvez soulever ensemble. Prenez une photo de vous deux en train de le porter.',
      'THE_BALD_GIANT',
      'Le code est remis automatiquement après réception de la photo.',
    ),
    cardDescription: 'Carte Personnage — Bald Olivier.',
  },
  {
    id: '004', filename: 'FICHIER_BLEU_HUGO.dat', displayName: 'HUGO',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: messenger(
      'Ève',
      'Mission Messenger : demandez à Ève.',
      'Quel est le premier instrument qui a commencé la passion musicale de Hugo ?',
      'BATTERIE',
    ),
    cardDescription: 'Carte Personnage — Hugo.',
  },
  {
    id: '005', filename: 'FICHIER_BLEU_EVE.dat', displayName: 'EVE',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: messenger(
      'Krysto',
      'Mission Messenger : demandez à Krysto.',
      'Dans quel endroit Ève a-t-elle rencontré son mari ?',
      'IGA',
    ),
    cardDescription: 'Carte Personnage — Ève.',
  },
  {
    id: '006', filename: 'FICHIER_BLEU_KRYSTO.dat', displayName: 'KRYSTO',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: messenger(
      'Ève',
      'Mission Messenger : demandez à Ève.',
      'Krystopher est un boucher hors pair qui a travaillé sur plusieurs pièces de viande de qualité pendant son parcours. Quelle est sa grande spécialité de coupe ?',
      'PICANHA',
    ),
    cardDescription: 'Carte Personnage — Krysto.',
  },
  {
    id: '007', filename: 'FICHIER_BLEU_MEREDITH.dat', displayName: 'MEREDITH',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: photoMission(
      'HELMET_UPGRADE',
      'Épreuve photo : personnalise ton casque avec ton propre style (collants, brillants, etc.). Envoie une photo du résultat en gros plan.',
      'GEAR_CUSTOMIZED',
    ),
    cardDescription: 'Carte Personnage — Mérédith.',
  },
  {
    id: '008', filename: 'FICHIER_BLEU_ELERINA.dat', displayName: 'ELERINA',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: videoMission(
      'QUEEN_DANCE',
      'Épreuve vidéo — réservée à la « Princess » du groupe. Sa Majesté ne danse pas elle-même : elle convainc une personne de son entourage, un peu moins gracieuse, de livrer sa meilleure performance. Envoyez une vidéo de 30 secondes de cette danse.',
      'GRACE',
      'La cour doit danser, pas la princesse !',
    ),
    cardDescription: 'Carte Personnage — Elerina.',
  },
  {
    id: '009', filename: 'FICHIER_BLEU_ELYSE.dat', displayName: 'ELYSE',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: photoMission(
      'LIVING_ROOM_GLITCH',
      'Épreuve photo : l\'Agent Elyse a piqué du nez dans le salon ? Empilez délicatement 4 à 5 objets légers du salon sur sa tête sans la réveiller. Prenez une photo de la tour en équilibre.',
      'NINJA_SNOOZE',
    ),
    cardDescription: 'Carte Personnage — Elyse.',
  },
  {
    id: '010', filename: 'FICHIER_BLEU_MALCOM.dat', displayName: 'MALCOM',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: photoMission(
      'HIDE_SEEK',
      'Épreuve photo : prenez une photo du plus jeune caché dans un endroit improbable de la maison (sous un tas de coussins, dans une boîte, etc.).',
      'CHIPMUNK',
    ),
    cardDescription: 'Carte Personnage — Malcom.',
  },
  {
    id: '011', filename: 'FICHIER_BLEU_MATHILDE.dat', displayName: 'MATHILDE',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: photoMission(
      'BREAD_HACK',
      'Épreuve photo : préparez un pain maison et écrivez le mot « ORACLE » dessus (pâte, gravure au couteau ou ingrédient). Photographiez votre pain prêt à être dégusté.',
      'BAKERY_DECODE',
    ),
    cardDescription: 'Carte Personnage — Mathilde.',
  },
  {
    id: '012', filename: 'FICHIER_BLEU_AUDREY.dat', displayName: 'AUDREY',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: messenger(
      'La marraine d\'Audrey',
      'Étape 1 : trouvez qui est la marraine d\'Audrey. Étape 2 : posez-lui la question ci-dessous.',
      'Dans quoi Audrey a-t-elle dormi la toute première nuit où sa marraine l\'a gardée ?',
      'TIROIR',
    ),
    cardDescription: 'Carte Personnage — Audrey.',
  },
  {
    id: '013', filename: 'FICHIER_BLEU_MALORY.dat', displayName: 'MALORY',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: photoMission(
      'CAMO_OBJECT',
      'Mission camouflage : cachez un petit objet (fourchette, figurine) en plein milieu du salon pour qu\'il se confonde avec le décor. Photographiez de loin pour voir si l\'ARCHIVISTE le repère.',
      'GHOST_GEAR',
    ),
    cardDescription: 'Carte Personnage — Malory.',
  },
  {
    id: '014', filename: 'FICHIER_BLEU_DANIEL.dat', displayName: 'DANIEL',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: messenger(
      'Daniel',
      'Mission Messenger : demandez à Daniel.',
      'Dans quelle ville as-tu déjà habité à l\'extérieur du Québec ?',
      'DAKAR',
    ),
    cardDescription: 'Carte Personnage — Daniel l\'Aventurier.',
  },
  {
    id: '015', filename: 'FICHIER_BLEU_NADINE.dat', displayName: 'NADINE',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: messenger(
      'Nadine',
      'Mission Messenger : Nadine est une grande voyageuse qui planifie déjà une retraite remplie d\'aventure. Demandez-lui :',
      'Quel est le voyage ou l\'endroit dans le monde qui t\'a le plus marquée ?',
      'PARIS',
    ),
    cardDescription: 'Carte Personnage — Nadine.',
  },
  {
    id: '016', filename: 'FICHIER_BLEU_GENEVIEVE.dat', displayName: 'GENEVIEVE',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : la belle maison de Geneviève a été achetée conjointement en 2003.',
      'En quelle année l\'a-t-elle rachetée entièrement, toute seule ?',
      '2011',
    ),
    cardDescription: 'Carte Personnage — Geneviève.',
  },
  {
    id: '017', filename: 'FICHIER_BLEU_MARTIN.dat', displayName: 'MARTIN',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: messenger(
      'Hugo',
      'Mission Messenger : demandez à Hugo.',
      'Quel était le tout premier employeur en ventes de Martin ?',
      ['STEREO_PLUS', 'STEREO PLUS', 'STÉRÉO PLUS', 'STERE O PLUS'],
    ),
    cardDescription: 'Carte Personnage — Martin.',
  },

  // ============================================================
  // BLOC OR — PERSONNAGES 018-022
  // ============================================================
  {
    id: '018', filename: 'FICHIER_GOLD_PAPI_MICHEL.exe', displayName: 'PAPI_MICHEL',
    category: 'Personnage', tier: 'Or', requiredUnlocks: 0,
    puzzle: photoMission(
      'VERT_DEERE',
      'Hommage à Papi Michel : prenez une photo de l\'aliment le plus sucré ou de la gâterie la plus décadente de votre cuisine, placé juste à côté d\'un objet vert flash (pour le fameux tracteur John Deere).',
      ['HÉRITAGE', 'HERITAGE'],
    ),
    cardDescription: 'Carte Personnage — Papi Michel.',
  },
  {
    id: '019', filename: 'FICHIER_GOLD_EDITH.exe', displayName: 'EDITH',
    category: 'Personnage', tier: 'Or', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : ce pilier de la famille laisse une image forte de dame propre et fière. Une faille linguistique unique a été identifiée : un juron bien à elle.',
      'Quel était ce mot de puissance, ce juron légendaire d\'Edith ?',
      'CYCLONE',
    ),
    cardDescription: 'Carte Personnage — Nanny Edith.',
  },
  {
    id: '020', filename: 'FICHIER_GOLD_ADRIENNE.exe', displayName: 'ADRIENNE',
    category: 'Personnage', tier: 'Or', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : Adrienne détenait la formule magique pour cuisiner les meilleurs beignes de toute la famille. Elle a transmis tout son savoir-faire à une personne en particulier.',
      'Qui a eu la chance d\'apprendre à faire les fameux beignes d\'Adrienne ?',
      'AUDREY',
    ),
    cardDescription: 'Carte Personnage — Adrienne.',
  },
  {
    id: '021', filename: 'FICHIER_GOLD_ALBERTINE.exe', displayName: 'ALBERTINE',
    category: 'Personnage', tier: 'Or', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : Albertine partage exactement la même date de fête que le petit dernier de la grande famille.',
      'Quel est le prénom de ce nouveau venu avec qui Albertine partage son anniversaire ?',
      'ARNAUD',
    ),
    cardDescription: 'Carte Personnage — Albertine.',
  },
  {
    id: '022', filename: 'FICHIER_GOLD_ROSE.exe', displayName: 'ROSE',
    category: 'Personnage', tier: 'Or', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : Rose faisait incontestablement le meilleur ragoût de boulettes de la famille. La tradition a ensuite été reprise et honorée.',
      'Qui a fièrement repris le flambeau du fameux ragoût de boulettes après Rose ?',
      'NADINE',
    ),
    cardDescription: 'Carte Personnage — Rose.',
  },

  // ============================================================
  // BLOC JAUNE — ANIMAUX 023-028
  // (décalés de 019-024 pour éviter les doublons avec le bloc Or)
  // ============================================================
  {
    id: '023', filename: 'FICHIER_GOLD_MARIO.exe', displayName: 'MARIO_FARINE',
    category: 'Sort', tier: 'Jaune', requiredUnlocks: 0,
    puzzle: photoMission(
      'FARINE',
      'En l\'honneur de Mario Farine : couvrez le visage de trois personnes ou plus avec de la farine et prenez une photo d\'équipe.',
      'CANAILLE',
      'Minimum 3 personnes farinées sur la photo.',
    ),
    cardDescription: 'Carte Animal — Mario Farine.',
  },
  {
    id: '024', filename: 'FICHIER_GOLD_MOLDU.exe', displayName: 'MOLDU',
    category: 'Sort', tier: 'Jaune', requiredUnlocks: 0,
    puzzle: photoMission(
      'GROSSE_PATATE',
      'Hommage à Moldu, le chien géant et doux : trouvez une personne (ou un immense toutou) et faites-lui un câlin style « gros pot de colle » en vous laissant tomber de tout votre long, comme si vous pesiez 150 livres.',
      ['GÉANT_DOUX', 'GEANT_DOUX'],
    ),
    cardDescription: 'Carte Animal — Moldu le doux géant.',
  },
  {
    id: '025', filename: 'FICHIER_JAUNE_BABOOSHKA.exe', displayName: 'BABOOSHKA',
    category: 'Sort', tier: 'Jaune', requiredUnlocks: 0,
    puzzle: messenger(
      'David',
      'Mission Messenger : ce dossier est dédié à Babooshka. Son nom évoque Kate Bush, mais cache une particularité bien familière. Menez l\'enquête auprès de David.',
      'Quelle est cette fameuse particularité de Babooshka ?',
      'MIAULEMENT',
    ),
    cardDescription: 'Carte Animal — Babooshka.',
  },
  {
    id: '026', filename: 'FICHIER_JAUNE_TRIFORCE_FELINE.exe', displayName: 'TRIFORCE_FELINE',
    category: 'Sort', tier: 'Jaune', requiredUnlocks: 0,
    puzzle: {
      contact: ORACLE_EMAIL,
      missionText: 'Épreuve photo/vidéo — prouvez que vous méritez de contrôler Brindille, Rondoudou et Sushi. Prenez une photo ou courte vidéo de vous accomplissant la sainte trinité des comportements de chat : (1) L\'effet Brindille — entrer dans une boîte beaucoup trop petite ; (2) L\'effet Rondoudou — face de chat fâché ou regard d\'hypnotiseur ; (3) L\'effet Sushi — s\'étirer de tout votre long en feignant une paresse extrême. Envoyez à oraclecore01@gmail.com avec ORACLE_CORE_01 : TRIO_CHATS.',
      question: 'Une fois la preuve envoyée, entrez le code de décryptage reçu.',
      answers: ans('MIAOU3'),
    },
    cardDescription: 'Cartes Animaux — Brindille, Rondoudou et Sushi.',
  },
  {
    id: '027', filename: 'FICHIER_JAUNE_MUKI.exe', displayName: 'MUKI',
    category: 'Sort', tier: 'Jaune', requiredUnlocks: 0,
    puzzle: messenger(
      'Ève',
      'Mission Messenger : Muki, le grand chien noir du refuge, est devenu soudainement collant et ultra-attentif envers sa mère.',
      'Qu\'est-ce qu\'Ève a découvert qui se cachait derrière ce changement de comportement ?',
      'GROSSESSE',
    ),
    cardDescription: 'Carte Animal — Muki le Protecteur.',
  },
  {
    id: '028', filename: 'FICHIER_JAUNE_RUBY_OPALE.exe', displayName: 'RUBY_O_PALE',
    category: 'Sort', tier: 'Jaune', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : à la mort d\'une figure mythique du cinéma d\'action, Daniel a donné son nom (divisé en deux) à ses deux petits chiens Ruby et Opale.',
      'Quel est ce nom célèbre ?',
      ['CHUCK_NORRIS', 'CHUCK NORRIS'],
    ),
    cardDescription: 'Cartes Animaux — Ruby et Opale.',
  },

  // ============================================================
  // BLOC VERT — LIEUX 029-037
  // ============================================================
  {
    id: '029', filename: 'FICHIER_VERT_LONGUE_RIVE.dll', displayName: 'LONGUE_RIVE',
    category: 'Lieu', tier: 'Vert', requiredUnlocks: 0,
    puzzle: messenger(
      'Nadine',
      'Mission Messenger : Longue-Rive, petite ville de la Côte-Nord aux lumières de Noël permanentes et aux statues géantes dans la rue. Un fan légendaire de cette ville existe dans l\'entourage.',
      'Qui est ce fan légendaire de Longue-Rive ?',
      'MARTIN',
    ),
    cardDescription: 'Carte Lieu — Longue-Rive.',
  },
  {
    id: '030', filename: 'FICHIER_VERT_RIVIERE_AU_TONNERRE.dll', displayName: 'RIVIERE_AU_TONNERRE',
    category: 'Lieu', tier: 'Vert', requiredUnlocks: 0,
    puzzle: messenger(
      'Nadine',
      'Mission Messenger : village perdu avec vue sur le fleuve. Interrogez Nadine.',
      'Quelle femme, qui arrivait toujours comme une brise vivifiante, est née à Rivière-au-Tonnerre ?',
      'EDITH',
    ),
    cardDescription: 'Carte Lieu — Rivière-au-Tonnerre.',
  },
  {
    id: '031', filename: 'FICHIER_VERT_SEPT_ILES.dll', displayName: 'SEPT_ILES',
    category: 'Lieu', tier: 'Vert', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : c\'est ici qu\'une grande partie de la famille s\'est établie. Un lieu où le temps se lit à l\'ombre d\'une horloge solaire et où la terre vibre au rythme d\'une immense usine d\'aluminium.',
      'Quelle est cette ville côtière ?',
      ['SEPT_ILES', 'SEPT-ILES', 'SEPT ÎLES'],
    ),
    cardDescription: 'Carte Lieu — Sept-Îles.',
  },
  {
    id: '032', filename: 'FICHIER_VERT_RIVIERE_DU_LOUP.dll', displayName: 'RIVIERE_DU_LOUP',
    category: 'Lieu', tier: 'Vert', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : zone côtière avec une force de la nature haute de 33 mètres au centre du village.',
      'Qu\'est-ce qui tombe sans jamais se blesser au cœur de Rivière-du-Loup ?',
      'CHUTE',
    ),
    cardDescription: 'Carte Lieu — Rivière-du-Loup.',
  },
  {
    id: '033', filename: 'FICHIER_VERT_LAPOCATIERE.dll', displayName: 'LA_POCATIERE',
    category: 'Lieu', tier: 'Vert', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : La Pocatière, où a habité le singulier Papi Michel. Cet endroit possède tout de même de petites lumières dans l\'obscurité.',
      'Quel animal de la famille est né à La Pocatière ?',
      'BABOOSHKA',
    ),
    cardDescription: 'Carte Lieu — La Pocatière.',
  },
  {
    id: '034', filename: 'FICHIER_VERT_QUEBEC.dll', displayName: 'QUEBEC',
    category: 'Lieu', tier: 'Vert', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : secteur géographique majeur.',
      'Quel grand fleuve passe tout juste au pied de la ville de Québec ?',
      ['ST_LAURENT', 'ST-LAURENT', 'SAINT-LAURENT', 'SAINT LAURENT'],
    ),
    cardDescription: 'Carte Lieu — Québec.',
  },
  {
    id: '035', filename: 'FICHIER_VERT_SHERBROOKE.dll', displayName: 'SHERBROOKE',
    category: 'Lieu', tier: 'Vert', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : plusieurs membres de la famille y ont habité à des moments différents, mais pour la même raison unique.',
      'Pour quelle raison tous se sont-ils installés à Sherbrooke ?',
      ['UNIVERSITÉ', 'UNIVERSITE'],
    ),
    cardDescription: 'Carte Lieu — Sherbrooke.',
  },
  {
    id: '036', filename: 'FICHIER_VERT_IGA.dll', displayName: 'IGA',
    category: 'Lieu', tier: 'Vert', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : le IGA, lieu marquant où plusieurs personnes de la famille ont travaillé longtemps.',
      'Quel est le nom de la petite mascotte animée au chandail rouge de cette chaîne d\'épiceries ?',
      ['TI-GA', 'TIGA', 'TI GA'],
    ),
    cardDescription: 'Carte Lieu — IGA.',
  },
  {
    id: '037', filename: 'FICHIER_VERT_HAVRE_ST_PIERRE.dll', displayName: 'HAVRE_ST_PIERRE',
    category: 'Lieu', tier: 'Vert', requiredUnlocks: 0,
    puzzle: messenger(
      'Les 4 joueuses',
      'Mission Messenger : c\'est le cœur de cette opération — la ville natale partagée par les 4 joueuses de cet ARG.',
      'Entrez le nom complet de cette municipalité de la Côte-Nord.',
      ['HAVRE_ST_PIERRE', 'HAVRE-SAINT-PIERRE', 'HAVRE SAINT PIERRE'],
    ),
    cardDescription: 'Carte Lieu — Havre-Saint-Pierre.',
  },

  // ============================================================
  // BLOC ROUGE — OBJETS 038-044
  // ============================================================
  {
    id: '038', filename: 'FICHIER_ROUGE_HEADBANZ.sh', displayName: 'HEADBANZ',
    category: 'Objet', tier: 'Rouge', requiredUnlocks: 0,
    puzzle: messenger(
      '[ À DÉFINIR ]',
      'Mission Messenger : en attente de vos détails pour ce fichier.',
      '[ À DÉFINIR : Question Headbanz ]',
      ['A_DÉTERMINER', 'A DÉTERMINER', 'A_DETERMINER'],
    ),
    cardDescription: 'Carte Objet — Headbanz.',
  },
  {
    id: '039', filename: 'FICHIER_ROUGE_URNE.sh', displayName: 'URNE',
    category: 'Objet', tier: 'Rouge', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : après son décès, l\'urne de Papi Michel s\'est retrouvée temporairement dans le garde-robe de quelle personne ultra-sensible de la famille ?',
      'Dans le garde-robe de qui l\'urne a-t-elle déménagé ?',
      'HUGO',
    ),
    cardDescription: 'Carte Objet — L\'Urne.',
  },
  {
    id: '040', filename: 'FICHIER_ROUGE_CREME_SOLAIRE.sh', displayName: 'CREME_SOLAIRE',
    category: 'Objet', tier: 'Rouge', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : la crème solaire a cruellement manqué à trois personnes l\'été passé. Parmi ce trio de homards, qui a attrapé son coup de soleil directement sur le dessus du pied ?',
      'Qui a eu le coup de soleil sur le dessus du pied ?',
      'DAVID',
    ),
    cardDescription: 'Carte Objet — La Crème Solaire.',
  },
  {
    id: '041', filename: 'FICHIER_ROUGE_ORIGAMI.sh', displayName: 'ORIGAMI',
    category: 'Objet', tier: 'Rouge', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : Hugo est un artiste de l\'origami. Il a offert ses œuvres en cadeau. Qui est la toute première personne de la famille à avoir reçu ce cadeau unique ? (Indice : elle a pleuré !)',
      'Qui a reçu le tout premier origami de Hugo ?',
      'ELYSE',
    ),
    cardDescription: 'Carte Objet — L\'Origami.',
  },
  {
    id: '042', filename: 'FICHIER_ROUGE_LAINE.sh', displayName: 'LAINE',
    category: 'Objet', tier: 'Rouge', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : Nadine est l\'experte tricoteuse, Lauriane s\'est tournée vers le crochet. Vrai ou faux : Nadine a montré à Lauriane l\'art du crochet ?',
      'Entrez VRAI ou FAUX.',
      'FAUX',
    ),
    cardDescription: 'Carte Objet — Balle de laine.',
  },
  {
    id: '043', filename: 'FICHIER_ROUGE_JOHN_DEERE.sh', displayName: 'JOHN_DEERE',
    category: 'Objet', tier: 'Rouge', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : le tracteur John Deere de Michel a causé bien des problèmes. Qui a pris en charge toutes les démarches pour obtenir le remboursement ?',
      'Qui s\'est battue pour obtenir le remboursement du tracteur ?',
      'NADINE',
    ),
    cardDescription: 'Carte Objet — Tracteur John Deere.',
  },
  {
    id: '044', filename: 'FICHIER_ROUGE_DANNY.sh', displayName: 'DANNY',
    category: 'Objet', tier: 'Rouge', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : Danny le marin a permis d\'explorer le rivage de Havre-Saint-Pierre. Équipé d\'un poêle à bois, il a même cuisiné pour le groupe.',
      'Quel repas réconfortant Danny a-t-il préparé sur son poêle à bois ?',
      'SPAGHETTI',
    ),
    cardDescription: 'Carte Objet — Danny le marin.',
  },
];

export const TOTAL_ITEMS = ITEMS.length;

/** Dernière archive — débloquer celle-ci complète le système */
export const LAST_ITEM_ID = ITEMS[ITEMS.length - 1]!.id;

export function isFinalArchive(id: string): boolean {
  return id === LAST_ITEM_ID;
}

export function isSystemComplete(unlockCount: number): boolean {
  return unlockCount >= TOTAL_ITEMS;
}

const TIER_ORDER: Tier[] = ['Vert', 'Bleu', 'Or', 'Jaune', 'Rouge'];

/** Prochain niveau verrouillé selon le nombre d'archives restaurées, ou null si tout est ouvert */
export function nextLockedTier(unlockCount: number): Tier | null {
  for (const tier of TIER_ORDER) {
    if (unlockCount < TIER_THRESHOLDS[tier]) return tier;
  }
  return null;
}
