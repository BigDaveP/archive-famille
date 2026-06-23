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
      'Épreuve Physique (Photo) — L\'illusion d\'optique géante. Prends une photo en perspective forcée où un tout petit objet de la maison a l\'air d\'un monstre géant à côté de toi (ex. : place un petit dinosaure ou un toutou tout près de la caméra pour qu\'il ait l\'air plus gros que toi qui te tiens au fond de la pièce).',
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
      'Épreuve Physique (Photo) — Pour débloquer l\'accès au fichier du géant de la famille, trouvez l\'objet le plus lourd de la maison que vous pouvez soulever ensemble. Prenez une photo de vous deux en train de le porter.',
      'THE_BALD_GIANT',
      'Code remis automatiquement après réception de la photo.',
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
    id: '007', filename: 'FICHIER_BLEU_MÉRÉDITH.dat', displayName: 'MÉRÉDITH',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: photoMission(
      'HELMET_UPGRADE',
      'Épreuve Physique (Photo) — Personnalise ton casque avec ton propre style (collants, brillants, etc.). Envoie une photo du résultat en gros plan.',
      'GEAR_CUSTOMIZED',
    ),
    cardDescription: 'Carte Personnage — Mérédith.',
  },
  {
    id: '008', filename: 'FICHIER_BLEU_ELERINA.dat', displayName: 'ELERINA',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: videoMission(
      'QUEEN_DANCE',
      'Épreuve Physique (Vidéo) — Ce fichier est réservé à la « Princess » du groupe, reconnue pour ses talents et son amour de la danse. Sa Majesté ne doit pas danser elle-même : elle doit convaincre une personne de son entourage, reconnue pour être un peu moins gracieuse ou moins habituée aux pistes de danse, de livrer sa meilleure performance. Échangez un moment de complicité et envoyez une vidéo de 30 secondes de cette danse.',
      'GRACE',
    ),
    cardDescription: 'Carte Personnage — Elerina.',
  },
  {
    id: '009', filename: 'FICHIER_BLEU_ELYSE.dat', displayName: 'ELYSE',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: photoMission(
      'LIVING_ROOM_GLITCH',
      'Épreuve Physique (Photo) — L\'Agent Elyse a piqué du nez dans le salon pendant un film ? C\'est le moment d\'infiltrer la zone. Empilez délicatement 4 à 5 objets légers du salon sur sa tête sans la réveiller ni faire de bruit. Prenez une photo de la tour en équilibre.',
      'NINJA_SNOOZE',
    ),
    cardDescription: 'Carte Personnage — Elyse.',
  },
  {
    id: '010', filename: 'FICHIER_BLEU_MALCOM.dat', displayName: 'MALCOM',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: photoMission(
      'HIDE_SEEK',
      'Épreuve Physique (Photo) — Le système exige une preuve de camouflage. Prenez une photo du plus jeune caché dans un endroit improbable de la maison (sous un tas de coussins, dans une boîte, etc.).',
      'CHIPMUNK',
    ),
    cardDescription: 'Carte Personnage — Malcom.',
  },
  {
    id: '011', filename: 'FICHIER_BLEU_MATHILDE.dat', displayName: 'MATHILDE',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: photoMission(
      'BREAD_HACK',
      'Épreuve Physique (Photo) — Active le mode cuisine moléculaire. Tu dois préparer un pain maison et réussir à écrire le mot « ORACLE » dessus avant ou après la cuisson (avec de la pâte, gravé au couteau, ou écrit avec un ingrédient). Envoie une photo de ton pain prêt à être dégusté.',
      'BAKERY_DECODE',
    ),
    cardDescription: 'Carte Personnage — Mathilde.',
  },
  {
    id: '012', filename: 'FICHIER_BLEU_AUDREY.dat', displayName: 'AUDREY',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: messenger(
      'La marraine d\'Audrey',
      'Mission Messenger — Étape 1 : trouve qui est la marraine d\'Audrey. Étape 2 : pose-lui cette question.',
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
      'Épreuve Physique (Photo) — Mission camouflage d\'objets. Choisis un petit objet (comme une fourchette ou une petite figurine) et cache-le en plein milieu du salon, de façon à ce qu\'il se confonde parfaitement avec le décor (ex. : une fourchette cachée le long du pied d\'une chaise en bois). Prends une photo d\'un peu plus loin pour voir si l\'ARCHIVISTE arrive à la repérer.',
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
      'Mission Messenger : Nadine est une grande voyageuse qui planifie déjà une retraite remplie d\'aventure. Une destination en particulier l\'a marquée.',
      'Quel est le voyage ou l\'endroit dans le monde qui t\'a le plus marquée ?',
      'PARIS',
    ),
    cardDescription: 'Carte Personnage — Nadine.',
  },
  {
    id: '016', filename: 'FICHIER_BLEU_GENVIÈVE.dat', displayName: 'GENEVIÈVE',
    category: 'Personnage', tier: 'Bleu', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger : nous aimons tous d\'amour la belle maison de Geneviève, achetée conjointement en 2003.',
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
      ['STEREO_PLUS', 'STEREO PLUS', 'STÉRÉO PLUS'],
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
      'Épreuve Physique (Photo) — Ce fichier rend hommage à un personnage haut en couleur qui savait tester la patience de tout le monde, mais qui avait des passions bien précises : le sucre (malgré son diabète), les huîtres et, par-dessus tout, dépenser les économies familiales sur un rutilant tracteur John Deere. Recréez un de ses contrastes légendaires : prenez une photo de l\'aliment le plus sucré ou de la gâterie la plus décadente de votre cuisine, placé juste à côté d\'un objet vert flash.',
      ['HÉRITAGE', 'HERITAGE'],
    ),
    cardDescription: 'Carte Personnage — Papi Michel.',
  },
  {
    id: '019', filename: 'FICHIER_GOLD_EDITH.exe', displayName: 'EDITH',
    category: 'Personnage', tier: 'Or', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger — Ce pilier de la famille laisse derrière elle une image forte de dame propre et fière. Une faille linguistique unique a été identifiée dans son système de communication : un juron bien à elle, agissant comme une décharge d\'énergie brute.',
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
      'Mission Messenger — Adrienne détenait un secret culinaire légendaire : la formule magique pour cuisiner les meilleurs beignes de toute la famille. Avant de nous quitter, elle a transmis tout son savoir-faire à une personne en particulier pour s\'assurer que la tradition continue.',
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
      'Mission Messenger — Albertine partage un lien unique avec la toute nouvelle génération de notre grande famille. Même si plusieurs années les séparent, elle a exactement la même date de fête que le petit dernier qui vient d\'arriver parmi nous.',
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
      'Mission Messenger — Rose avait un talent fou pour rassembler tout le monde autour de la table, surtout lorsqu\'elle cuisinait son plat signature. Elle faisait incontestablement le meilleur ragoût de boulettes de la famille, une tradition gourmande reprise et honorée par la suite.',
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
      'Épreuve Physique (Photo) — Cette adorable boule de poil qui a saisi le cœur de tous en une vie si courte a fait une énorme gaffe un jour pendant que sa famille cuisinait, ce qui lui a valu le surnom de « Mario Farine ». Votre mission : couvrir le visage de trois personnes ou plus avec de la farine et prendre une photo d\'équipe en l\'honneur de ce moment.',
      'CANAILLE',
    ),
    cardDescription: 'Carte Animal — Mario Farine.',
  },
  {
    id: '024', filename: 'FICHIER_GOLD_MOLDU.exe', displayName: 'MOLDU',
    category: 'Sort', tier: 'Jaune', requiredUnlocks: 0,
    puzzle: photoMission(
      'GROSSE_PATATE',
      'Épreuve Physique (Photo) — Ce fichier rend hommage à Moldu, le chien géant. Malgré sa taille impressionnante, c\'était la plus belle et la plus douce des patates. Recréez l\'effet « gros toutou lourd » : trouvez une personne (ou un immense toutou / un gros paquet d\'oreillers) et faites-lui un câlin style « gros pot de colle » en vous laissant tomber de tout votre long, comme si vous pesiez 150 livres.',
      ['GÉANT_DOUX', 'GEANT_DOUX'],
    ),
    cardDescription: 'Carte Animal — Moldu le doux géant.',
  },
  {
    id: '025', filename: 'FICHIER_JAUNE_BABOOSHKA.exe', displayName: 'BABOOSHKA',
    category: 'Sort', tier: 'Jaune', requiredUnlocks: 0,
    puzzle: messenger(
      'David',
      'Mission Messenger — Ce dossier crypté est dédié à Babooshka. Si son nom fait directement référence à la célèbre chanson de Kate Bush, il cache également une origine beaucoup plus concrète liée à une particularité bien familière. Menez votre enquête auprès de David.',
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
      missionText: 'Épreuve Physique (Photo/Vidéo) — Ce fichier contient une surcharge d\'énergie féline et débloque le trio légendaire : Brindille, Rondoudou et Sushi. Pour prouver que vous êtes digne de contrôler ces trois félins, accomplissez la sainte trinité des comportements de chat : (1) L\'effet Brindille — entrer dans une boîte beaucoup trop petite ; (2) L\'effet Rondoudou — face de chat fâché ou regard d\'hypnotiseur ; (3) L\'effet Sushi — s\'étirer de tout votre long en feignant une paresse extrême. Envoyez à oraclecore01@gmail.com avec ORACLE_CORE_01 : TRIO_CHATS.',
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
      'Mission Messenger — Muki, ce magnifique grand chien noir du refuge. Autrefois véritable boule d\'énergie qui ne pouvait s\'empêcher d\'aboyer, il a appris à devenir le plus calme des protecteurs. Un jour, Muki a soudainement adopté une attitude complètement différente envers sa mère, devenant collant et ultra-attentif.',
      'Qu\'est-ce qu\'Ève a découvert qui se cachait derrière ce soudain changement de comportement ?',
      'GROSSESSE',
    ),
    cardDescription: 'Carte Animal — Muki le Protecteur.',
  },
  {
    id: '028', filename: 'FICHIER_JAUNE_RUBY_OPALE.exe', displayName: 'RUBY_O_PALE',
    category: 'Sort', tier: 'Jaune', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger — Ce double secteur sécurise l\'accès aux cartes de Ruby et Opale. À la mort d\'une figure mythique du cinéma d\'action international, Daniel a voulu honorer sa mémoire en donnant son nom (divisé en deux) à ses deux petits chiens.',
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
      'Mission Messenger — Ce dossier archive les données de Longue-Rive, petite ville de la Côte-Nord où les résidents gardent mystérieusement leurs lumières de Noël allumées à l\'année longue, et où un sculpteur de bois douteux bloque la rue pour faire traverser ses statues géantes. Une personne en particulier dans l\'entourage était un très grand fan de cette ville.',
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
      'Mission Messenger — Secteur géographique verrouillé. Les données indiquent un village perdu avec vue sur le fleuve. Pour cartographier cette zone, interrogez l\'entité Nadine.',
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
      'Mission Messenger — Restauration de la zone d\'ancrage principal. Les archives indiquent que c\'est ici, sur ces terres côtières, qu\'une grande partie de la famille s\'est établie. Localisez le point de synchronisation : un lieu où le temps se lit à l\'ombre d\'une horloge solaire et où la terre vibre au rythme d\'une immense usine d\'aluminium.',
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
      'Mission Messenger — Alerte : flux de données perturbé par un grondement hydraulique. Cette zone côtière cache en son plein centre une force de la nature haute de 33 mètres qui alimentait autrefois le village.',
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
      'Mission Messenger — Ce secteur est dédié à La Pocatière. Une ville où a habité le singulier Papi Michel, laissant derrière lui des souvenirs très mal vécus par plusieurs membres de la famille. Heureusement, cet endroit possède tout de même de petites lumières dans l\'obscurité.',
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
      'Mission Messenger — Secteur géographique majeur.',
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
      'Mission Messenger — Ce dossier concerne Sherbrooke. Plusieurs membres de la famille y ont habité à des moments complètement différents de leur vie, mais ils s\'y sont tous installés pour la même et unique raison.',
      'Quelle est cette raison ?',
      ['UNIVERSITÉ', 'UNIVERSITE'],
    ),
    cardDescription: 'Carte Lieu — Sherbrooke.',
  },
  {
    id: '036', filename: 'FICHIER_VERT_IGA.dll', displayName: 'IGA',
    category: 'Lieu', tier: 'Vert', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger — Ce dossier est dédié au IGA. Ce lieu est marquant pour la famille puisque quelques personnes y ont travaillé pendant une grande partie de leur vie.',
      'Quel est le nom de la petite mascotte animée au chandail rouge qui représentait fièrement cette chaîne d\'épiceries ?',
      ['TI-GA', 'TIGA', 'TI GA'],
    ),
    cardDescription: 'Carte Lieu — IGA.',
  },
  {
    id: '037', filename: 'FICHIER_VERT_HAVRE_ST_PIERRE.dll', displayName: 'HAVRE_ST_PIERRE',
    category: 'Lieu', tier: 'Vert', requiredUnlocks: 0,
    puzzle: messenger(
      'Les 4 joueuses',
      'Mission Messenger — Ce dossier archive les données d\'un lieu d\'origine crucial. C\'est le cœur même de toute cette opération, puisque les 4 joueuses de cet ARG partagent la même ville natale.',
      'Entrez le nom complet de cette municipalité de la Côte-Nord d\'où vous venez toutes les quatre.',
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
      'Hugo',
      'Mission Messenger — Quel membre de la famille dominait au Headbanz ?',
      'Quelle personne de la famille était la meilleure au Headbanz ?',
      ['PAPI_MICHEL', 'PAPI MICHEL'],
      'Demander à Hugo.',
    ),
    cardDescription: 'Carte Objet — Headbanz.',
  },
  {
    id: '039', filename: 'FICHIER_ROUGE_URNE.sh', displayName: 'URNE',
    category: 'Objet', tier: 'Rouge', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger — Ce dossier sécurise les données de l\'urne de Papi Michel. Après son décès, l\'urne s\'est retrouvée temporairement installée dans une cachette bien spéciale, parce qu\'une personne ultra-sensible voulait absolument s\'assurer du bien-être et de la sécurité du défunt.',
      'Dans le garde-robe de quelle personne de la famille l\'urne a-t-elle déménagé ?',
      'HUGO',
    ),
    cardDescription: 'Carte Objet — L\'Urne.',
  },
  {
    id: '040', filename: 'FICHIER_ROUGE_CREME_SOLAIRE.sh', displayName: 'CREME_SOLAIRE',
    category: 'Objet', tier: 'Rouge', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger — La crème solaire, bouclier indispensable qui a pourtant cruellement manqué à trois personnes de la famille l\'été passé, leur valant d\'énormes coups de soleil par pur manque de réflexion.',
      'Parmi ce trio de homards, qui a réussi l\'exploit d\'attraper son coup de soleil directement sur le dessus du pied ?',
      'DAVID',
    ),
    cardDescription: 'Carte Objet — La Crème Solaire.',
  },
  {
    id: '041', filename: 'FICHIER_ROUGE_ORIGAMI.sh', displayName: 'ORIGAMI',
    category: 'Objet', tier: 'Rouge', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger — Hugo est un artiste accompli dans plusieurs domaines, et l\'art du pliage de papier en fait définitivement partie. Il a déjà offert en cadeau certaines de ses œuvres touchantes. (Indice : elle a pleuré !)',
      'Qui est la toute première personne de la famille à avoir reçu ce cadeau unique ?',
      'ELYSE',
    ),
    cardDescription: 'Carte Objet — L\'Origami.',
  },
  {
    id: '042', filename: 'FICHIER_ROUGE_LAINE.sh', displayName: 'LAINE',
    category: 'Objet', tier: 'Rouge', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger — Dans la famille, vous êtes plusieurs à transformer la laine en œuvre d\'art, mais pas tous de la même manière. L\'experte incontestée ici est Nadine, tricoteuse depuis des années, alors que sa fille Lauriane s\'est plutôt tournée vers le crochet.',
      'Vrai ou faux : Nadine a montré à Lauriane l\'art du crochet ?',
      'FAUX',
    ),
    cardDescription: 'Carte Objet — Balle de laine.',
  },
  {
    id: '043', filename: 'FICHIER_ROUGE_JOHN_DEERE.sh', displayName: 'JOHN_DEERE',
    category: 'Objet', tier: 'Rouge', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger — À sa mort, Michel a laissé derrière lui un immense tracteur John Deere acheté par pur excès (il n\'a même jamais été capable de monter dessus, c\'était seulement pour dépenser). Plusieurs ont dû s\'impliquer.',
      'Qui a dû prendre en charge toutes les démarches, s\'obstiner avec les vendeurs initiaux et se battre pour obtenir le remboursement de cette machine ?',
      'NADINE',
    ),
    cardDescription: 'Carte Objet — Tracteur John Deere.',
  },
  {
    id: '044', filename: 'FICHIER_ROUGE_DANNY.sh', displayName: 'DANNY',
    category: 'Objet', tier: 'Rouge', requiredUnlocks: 0,
    puzzle: messenger(
      'Famille',
      'Mission Messenger — Ce dossier archive les données de Danny le marin et son poêle à bois mémorable. Durant le séjour de l\'an passé, Danny s\'est démarqué en permettant d\'explorer le rivage de Havre-Saint-Pierre à bord de son bateau. Équipé d\'un lit, d\'une salle de bain et d\'un magnifique poêle à bois, ce navire a fourni tout l\'essentiel pour une excursion réussie. Danny a même cuisiné directement sur ce poêle pour le groupe.',
      'Quel repas réconfortant a-t-il préparé ?',
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
