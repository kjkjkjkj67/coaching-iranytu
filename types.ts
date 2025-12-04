import { LucideIcon } from 'lucide-react';

export enum ModelId {
  SOCRATIC = 'SOCRATIC',
  GROW = 'GROW',
  SOLUTION = 'SOLUTION',
  MI = 'MI'
}

export interface CoachingModelData {
  id: ModelId;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string; // Tailwind color class prefix (e.g., 'blue')
  essence: string;
  coachState: string[];
  utility: string[];
  clientExperience: string[];
  typicalQuote: string;
  bestUsedWhen: string;
  sequenceStep: number;
  sequenceDescription: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}