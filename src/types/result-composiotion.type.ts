import {CompanionList} from "./companion-id.type";

export type ResultComposition = { [key: string]: CompanionList | number }

export interface IResultComposition extends ResultComposition {
  lords: CompanionList,
  persistent: CompanionList,
  phase2: CompanionList,
  score: number,
}

export type ResultCompositions = IResultComposition[];
