import {CompanionSubsets} from "./companion-id.type";

export type NobleLordBasedComposition = { [key: string]: CompanionSubsets }

export interface INobleLordBasedComposition extends NobleLordBasedComposition {
  lords: CompanionSubsets,
  withLord: CompanionSubsets,
  noLord: CompanionSubsets,
}

export type NobleLordBasedCompositions = INobleLordBasedComposition[];
