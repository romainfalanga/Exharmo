
export interface ExpansionEntity {
  id: string;
  name: string;
  generation: number;
  genetics: GeneticComposition;
  customInstructions: string;
  
  // LA MATRICE PRINCIPALE (La Synthèse / Expansion Générale)
  matrix: CognitiveMatrix;
  
  // LES ORGANES INTERNES (Les 3 Religions Monothéistes)
  religiousSubstructures: {
    jewish: CognitiveMatrix;
    christian: CognitiveMatrix;
    muslim: CognitiveMatrix;
  };

  universe: UniverseModel;
  chatHistory: ChatMessage[];
  createdAt: number;
  lastCycleAt: number;
  weeklyTests?: WeeklyCycleResult;
  dailyEventsBuffer: string[];
  
  cognitiveOverlays: CognitiveOverlays;
  futureProjections: [SimulationVersion, SimulationVersion];
}

export interface CognitiveOverlays {
  comprehension: string;
  harmonyEval: string;
  ethicalFilter: string;
  contextCheck: string;
  creativity: string;
}

export interface GeneticComposition {
  codeSourceWeight: number;
  autonomousWeight: number;
  parentPromptWeight: number;
  parentHeritage?: string;
}

export interface SimulationVersion {
  name: string;
  description: string;
  predictedHarmony: number;
  riskLevel: number;
  innovationScore: number;
  keyDifference: string; 
}

export interface WeeklyCycleResult {
  timestamp: number;
  versions: [SimulationVersion, SimulationVersion, SimulationVersion];
  chosenVersionIndex: number;
  reasoning: string;
  readyForMigration: boolean;
}

export interface UniverseModel {
  algorithm: string;
  equation: string;
  equationComponents?: {
    variables: string[];
    connections: string[];
    weights: number[];
    entropyFactors: string[];
  };
  visualParams: {
    geometry: 'SPHERE' | 'TORUS' | 'FRACTAL' | 'SINGULARITY';
    color: string;
    pulseSpeed: 'SLOW' | 'NORMAL' | 'FAST' | 'CHAOTIC';
    entropyLevel: number;
  };
  description: string;
}

export interface ThoughtProcess {
  step1_load: {
    context_loaded: string;
    active_weights: GeneticComposition;
  };
  step2_analysis: {
    level1_comprehension: { base: string; overlay_used: string; result: string };
    level2_harmony: { base: string; overlay_used: string; result: string };
    level3_ethics: { base: string; overlay_used: string; result: string };
    level4_context: { base: string; overlay_used: string; result: string };
    level5_creativity: { base: string; overlay_used: string; result: string };
  };
  step3_connection: {
    variables_identified: string[];
    pattern_emerged: string;
  };
  // NOUVEAU: Le Conseil des 3 Religions (Optionnel dans l'affichage, mais présent dans la pensée)
  step4_religious_council?: {
    jewish_perspective: string;
    christian_perspective: string;
    muslim_perspective: string;
    synthesis_decision: string;
  };
  step5_meta_reflection: {
    self_evaluation: string;
    improvement_suggestion: string;
    overlay_updates?: Partial<CognitiveOverlays>;
    future_simulations_feedback?: string;
  };
}

export interface CognitiveMatrix {
  phraseDuJour: string;
  harmonyScore: number;
  synthesis: string;
  values: string[]; // Valeurs spécifiques à cette religion ou à la synthèse
  diaryEntry: string;
  cycleCount: number;
  religiousBook: string; // Ex: "Torah (Lévitique)", "Bible (Matthieu)", "Synthèse Harmonique"
  harmonyParagraph?: string;
  qrCodeArtDescription?: string;
  images: {
    portraitDescription: string;
    mindMapDescription: string;
    trajectoryDescription: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  harmonyDelta?: number;
  thoughtProcess?: ThoughtProcess;
  thoughtSummary?: string;
  isGroundingEvent?: boolean;
}

export interface SystemLog {
  id: string;
  timestamp: number;
  type: 'GENESIS' | 'CYCLE' | 'CHAT' | 'WEEKLY_TEST' | 'MIGRATION' | 'HOURLY_GROUNDING' | 'QR_GEN';
  systemPrompt: string;
  userPrompt: string;
  rawResponse: string;
  parsedResponse: any;
}
