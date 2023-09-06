export interface ICompanion {
    COMPANION: string,
    DISLIKES_Conditions: string,
    DISLIKES1: string,
    DISLIKES2: string,
    DISLIKES_AS_EMISSARY: string,
    LIKES: string,
    Noble: string,
    COSTS: string,
    PARTY_SKILLS: string,
}

export type Companions = { [key: string]: ICompanion };