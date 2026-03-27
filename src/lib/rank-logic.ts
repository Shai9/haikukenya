export type RankTier = 'Novice' | 'Scholar' | 'Arbiter' | 'Sensei' | 'Grandmaster';

export interface UserStats {
  id: string;
  name: string;
  reputation: number;
  auditsCompleted: number;
  poemsPublished: number;
  accuracyRate: number; // Percentage 0-100
}

export class RankEngine {
  /**
   * Assigns a Rank Tier based on Reputation points
   */
  static getTier(reputation: number): RankTier {
    if (reputation >= 2000) return 'Grandmaster';
    if (reputation >= 1000) return 'Sensei';
    if (reputation >= 500) return 'Arbiter';
    if (reputation >= 100) return 'Scholar';
    return 'Novice';
  }

  /**
   * Calculates the "Audit Weight"
   * A Sensei's vote counts for 3x a Novice's vote in the audit process.
   */
  static getAuditWeight(tier: RankTier): number {
    const weights: Record<RankTier, number> = {
      'Novice': 1,
      'Scholar': 1.5,
      'Arbiter': 2,
      'Sensei': 3,
      'Grandmaster': 5
    };
    return weights[tier];
  }
}