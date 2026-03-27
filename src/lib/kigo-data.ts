export type Season = 'Long Rains' | 'Short Rains' | 'Dry Season' | 'Cold Season';

export interface KigoEntry {
  term: string;
  category: 'Flora' | 'Fauna' | 'Weather' | 'Atmosphere' | 'Human';
  description: string;
}

export const KIGO_DICTIONARY: Record<Season, KigoEntry[]> = {
  'Long Rains': [
    { term: 'Petrichor', category: 'Weather', description: 'The scent of first rain hitting dry dust.' },
    { term: 'Alates', category: 'Fauna', description: 'Flying termites emerging after heavy downpours.' },
    { term: 'Red Mud', category: 'Weather', description: 'The slick, staining earth of the highlands.' },
    { term: 'Bullfrog', category: 'Fauna', description: 'Deep evening croaks from rising puddles.' },
  ],
  'Dry Season': [
    { term: 'Dust Devil', category: 'Weather', description: 'Swirling pillars of heat and earth.' },
    { term: 'Wilting Maize', category: 'Flora', description: 'Curled leaves signaling the need for rain.' },
    { term: 'Hazy Horizon', category: 'Atmosphere', description: 'Heat shimmer blurring the distant hills.' },
    { term: 'Yellow Grass', category: 'Flora', description: 'The savanna turning to gold and brittle straw.' },
  ],
  'Short Rains': [
    { term: 'Jacaranda', category: 'Flora', description: 'Purple carpets appearing before the storms.' },
    { term: 'Nandi Flame', category: 'Flora', description: 'Brilliant orange blossoms against grey skies.' },
    { term: 'Sudden Flood', category: 'Weather', description: 'Brief, intense afternoon deluges.' },
  ],
  'Cold Season': [
    { term: 'Ngong Fog', category: 'Weather', description: 'Dense mist rolling over the ridges.' },
    { term: 'Charcoal Smoke', category: 'Atmosphere', description: 'The heavy scent of evening warming fires.' },
    { term: 'Pale Sun', category: 'Weather', description: 'The weak light of a July afternoon.' },
  ],
};