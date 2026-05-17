// ============================================================
// ARCHIVE_FAMILLE — Données du jeu ARG
// ============================================================
// Remplacez les valeurs "[ À DÉFINIR ]" par vos vraies données.
// Les "answers" sont les mots-clés à entrer (insensible à la casse).
// ============================================================

export type Category = 'Personnage' | 'Objet' | 'Lieu' | 'Sort';
export type Tier = 'Vert' | 'Bleu' | 'Or';

export interface ArchivePuzzle {
  contact: string;       // Qui contacter
  missionText: string;   // Description de la mission
  question: string;      // La question exacte à poser
  answers: string[];     // Réponses valides (insensible à la casse)
  hint?: string;         // Indice S.O.S. optionnel
}

export interface ArchiveItem {
  id: string;            // "001" à "150"
  filename: string;      // Ex: "FICHIER_VERT_LAURIANE.dat"
  displayName: string;   // Nom affiché dans l'interface
  category: Category;
  tier: Tier;
  requiredUnlocks: number; // 0=Vert, 15=Bleu, 40=Or
  puzzle: ArchivePuzzle;
  cardDescription: string; // Texte affiché quand la carte est débloquée
}

export const TIER_THRESHOLDS: Record<Tier, number> = {
  Vert: 0, Bleu: 15, Or: 40,
};

export const TIER_COLORS: Record<Tier, string> = {
  Vert: '#33ff33', Bleu: '#00aaff', Or: '#ffd700',
};

export const TOTAL_ITEMS = 150;

// Générateur de placeholders
function ext(tier: Tier, category: Category): string {
  if (category === 'Sort') return '.bin';
  return tier === 'Vert' ? '.dat' : tier === 'Bleu' ? '.dll' : '.exe';
}

function pfx(category: Category): string {
  const map: Record<Category, string> = {
    Personnage: 'FICHIER', Objet: 'OBJET', Lieu: 'SECTEUR', Sort: 'SORT',
  };
  return map[category];
}

function ph(id: number, category: Category, tier: Tier): ArchiveItem {
  const idStr = String(id).padStart(3, '0');
  const filename = `${pfx(category)}_${tier.toUpperCase()}_${category.toUpperCase()}_${idStr}${ext(tier, category)}`;
  return {
    id: idStr,
    filename,
    displayName: `${category.toUpperCase()}_${idStr}`,
    category,
    tier,
    requiredUnlocks: TIER_THRESHOLDS[tier],
    puzzle: {
      contact: '[ À DÉFINIR ]',
      missionText: '[ À DÉFINIR ] Décrivez ici la mission à accomplir.',
      question: '[ À DÉFINIR ] Quelle question doit-on poser à ce membre de la famille ?',
      answers: ['motcle'],
      hint: '[ À DÉFINIR ] Indice facultatif.',
    },
    cardDescription: '[ À DÉFINIR ] Décrivez ici la carte une fois débloquée.',
  };
}

function phRange(from: number, to: number, category: Category, tier: Tier): ArchiveItem[] {
  return Array.from({ length: to - from + 1 }, (_, i) => ph(from + i, category, tier));
}

export const ITEMS: ArchiveItem[] = [
  // ============================================================
  // PERSONNAGES VERT — 001-020 (disponibles dès le départ)
  // ============================================================
  {
    id: '001', filename: 'FICHIER_VERT_GRAND_MAMAN.dat', displayName: 'GRAND_MAMAN',
    category: 'Personnage', tier: 'Vert', requiredUnlocks: 0,
    puzzle: {
      contact: 'Tante Sylvie',
      missionText: 'Pour restaurer cette archive, vous devez contacter TANTE SYLVIE sur Messenger Kids.',
      question: 'Dans quelle ville exacte grand-maman a-t-elle acheté sa toute première maison en 1998 ?',
      answers: ['placeholder_ville'],
      hint: 'La réponse est une ville au Québec.',
    },
    cardDescription: 'La matriarche de la famille. Ses secrets remontent à bien avant votre naissance...',
  },
  {
    id: '002', filename: 'FICHIER_VERT_LAURIANE.dat', displayName: 'LAURIANE',
    category: 'Personnage', tier: 'Vert', requiredUnlocks: 0,
    puzzle: {
      contact: 'Maman',
      missionText: 'Contactez MAMAN et posez-lui la question suivante.',
      question: '[ À DÉFINIR : Question sur Lauriane ]',
      answers: ['motcle'],
      hint: '[ À DÉFINIR ]',
    },
    cardDescription: '[ À DÉFINIR : Description de la carte Lauriane ]',
  },
  {
    id: '003', filename: 'FICHIER_VERT_DAVID.dat', displayName: 'DAVID',
    category: 'Personnage', tier: 'Vert', requiredUnlocks: 0,
    puzzle: {
      contact: 'Papa',
      missionText: 'Contactez PAPA et posez-lui la question suivante.',
      question: '[ À DÉFINIR : Question sur David ]',
      answers: ['motcle'],
      hint: '[ À DÉFINIR ]',
    },
    cardDescription: '[ À DÉFINIR : Description de la carte David ]',
  },
  {
    id: '004', filename: 'FICHIER_VERT_MARIO.dat', displayName: 'MARIO',
    category: 'Personnage', tier: 'Vert', requiredUnlocks: 0,
    puzzle: {
      contact: 'Grand-papa',
      missionText: 'Contactez GRAND-PAPA et posez-lui la question suivante.',
      question: '[ À DÉFINIR : Question sur Mario ]',
      answers: ['motcle'],
      hint: '[ À DÉFINIR ]',
    },
    cardDescription: '[ À DÉFINIR : Description de la carte Mario ]',
  },
  {
    id: '005', filename: 'FICHIER_VERT_TANTE_SYLVIE.dat', displayName: 'TANTE_SYLVIE',
    category: 'Personnage', tier: 'Vert', requiredUnlocks: 0,
    puzzle: {
      contact: 'Maman',
      missionText: 'Contactez MAMAN et posez-lui la question suivante.',
      question: '[ À DÉFINIR : Question sur Tante Sylvie ]',
      answers: ['motcle'],
      hint: '[ À DÉFINIR ]',
    },
    cardDescription: '[ À DÉFINIR : Description de la carte Tante Sylvie ]',
  },
  ...phRange(6, 20, 'Personnage', 'Vert'),

  // ============================================================
  // OBJETS VERT — 021-040
  // ============================================================
  {
    id: '021', filename: 'OBJET_VERT_CASSETTE_VHS.dat', displayName: 'CASSETTE_VHS',
    category: 'Objet', tier: 'Vert', requiredUnlocks: 0,
    puzzle: {
      contact: 'Grand-papa',
      missionText: 'Contactez GRAND-PAPA et posez-lui la question suivante.',
      question: '[ À DÉFINIR : Question sur la vieille cassette VHS familiale ]',
      answers: ['motcle'],
      hint: '[ À DÉFINIR ]',
    },
    cardDescription: '[ À DÉFINIR : Description de l\'objet cassette VHS ]',
  },
  ...phRange(22, 40, 'Objet', 'Vert'),

  // ============================================================
  // LIEUX VERT — 041-060
  // ============================================================
  {
    id: '041', filename: 'SECTEUR_VERT_LE_CHALET.dat', displayName: 'LE_CHALET',
    category: 'Lieu', tier: 'Vert', requiredUnlocks: 0,
    puzzle: {
      contact: 'Grand-papa',
      missionText: 'Contactez GRAND-PAPA et posez-lui la question suivante.',
      question: '[ À DÉFINIR : Question sur le chalet familial ]',
      answers: ['motcle'],
      hint: '[ À DÉFINIR ]',
    },
    cardDescription: '[ À DÉFINIR : Description du lieu chalet ]',
  },
  ...phRange(42, 60, 'Lieu', 'Vert'),

  // ============================================================
  // SORTS VERT — 061-075
  // ============================================================
  {
    id: '061', filename: 'SORT_VERT_SORT_DU_RIRE.bin', displayName: 'SORT_DU_RIRE',
    category: 'Sort', tier: 'Vert', requiredUnlocks: 0,
    puzzle: {
      contact: 'Tante Sylvie',
      missionText: 'Contactez TANTE SYLVIE et posez-lui la question suivante.',
      question: '[ À DÉFINIR : Question sur une anecdote drôle de la famille ]',
      answers: ['motcle'],
      hint: '[ À DÉFINIR ]',
    },
    cardDescription: '[ À DÉFINIR : Description du sort familial ]',
  },
  ...phRange(62, 75, 'Sort', 'Vert'),

  // ============================================================
  // NIVEAU 2 — BLEU (besoin: 15 archives restaurées)
  // ============================================================
  ...phRange(76, 95, 'Personnage', 'Bleu'),   // 20 Personnages Bleu
  ...phRange(96, 105, 'Objet', 'Bleu'),       // 10 Objets Bleu
  ...phRange(106, 118, 'Lieu', 'Bleu'),       // 13 Lieux Bleu
  ...phRange(119, 125, 'Sort', 'Bleu'),       //  7 Sorts Bleu

  // ============================================================
  // NIVEAU 3 — OR (besoin: 40 archives restaurées)
  // ============================================================
  ...phRange(126, 135, 'Personnage', 'Or'),   // 10 Personnages Or
  ...phRange(136, 140, 'Objet', 'Or'),        //  5 Objets Or
  ...phRange(141, 147, 'Lieu', 'Or'),         //  7 Lieux Or
  ...phRange(148, 150, 'Sort', 'Or'),         //  3 Sorts Or
];
