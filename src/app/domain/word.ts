import { Translation } from "./translation";
import { Verse } from "./verse";


export class Word {
    id: number;
    value: string;
    classes: string;
    translation: Translation;
    verse: Verse;
    order: number;
}