import { syllable } from 'syllable';
import { KIGO_DICTIONARY, Season } from './kigo-data';

export type KigoSeason = Season;

export interface HaikuLines {
  one: string;
  two: string;
  three: string;
}

export class HaikuEngine {
  private static readonly OVERRIDES: Record<string, number> = {
    'nairobi': 3,
    'm-pesa': 3,
    'matatu': 3,
    'ugali': 3,
    'petrichor': 3,
    'jacaranda': 4,
  };

  static getWordSyllables(word: string): number {
    const cleanWord = word.toLowerCase().replace(/[^a-z-]/g, '');
    if (this.OVERRIDES[cleanWord]) return this.OVERRIDES[cleanWord];
    return syllable(cleanWord);
  }

  static getLineSyllables(line: string): number {
    if (!line.trim()) return 0;
    return line
      .split(/\s+/)
      .filter(Boolean)
      .reduce((acc, word) => acc + this.getWordSyllables(word), 0);
  }

  static validateStructure(lines: HaikuLines): { one: number; two: number; three: number; isValid: boolean } {
    const counts = {
      one: this.getLineSyllables(lines.one),
      two: this.getLineSyllables(lines.two),
      three: this.getLineSyllables(lines.three),
    };
    const isValid = counts.one === 5 && counts.two === 7 && counts.three === 5;
    return { ...counts, isValid };
  }

  static hasValidKireji(lineText: string): boolean {
    const kirejiMarkers = /[—:;]$/;
    return kirejiMarkers.test(lineText.trim());
  }

  static hasObjectiveTone(lines: HaikuLines): boolean {
    const banned = /\b(i|me|my|mine|myself)\b/i;
    return !Object.values(lines).some(line => banned.test(line));
  }

  /**
   * THE LAW OF THE KIGO: Verification
   * Scans the haiku for official terms from the dictionary
   */
  static findKigo(lines: HaikuLines, season: Season): string | null {
    const fullText = `${lines.one} ${lines.two} ${lines.three}`.toLowerCase();
    const dictionary = KIGO_DICTIONARY[season];
    
    const found = dictionary.find(entry => 
      fullText.includes(entry.term.toLowerCase())
    );
    
    return found ? found.term : null;
  }

  /**
   * KIREJI VOLTAGE (Astariqa Metric)
   * Measures the "spark" based on word length contrast around the cut.
   * High voltage = short, punchy words meeting a complex image.
   */
  static calculateVoltage(lines: HaikuLines, cutIndex: 1 | 2): number {
    const cutLine = cutIndex === 1 ? lines.one : lines.two;
    const nextLine = cutIndex === 1 ? lines.two : lines.three;
    
    const cutLineWords = cutLine.split(' ').length;
    const nextLineWords = nextLine.split(' ').length;
    
    // Logic: Higher contrast in word density creates a stronger "spark"
    return Math.min(Math.abs(cutLineWords - nextLineWords) * 2, 10);
  }
}