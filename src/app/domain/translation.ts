export class TranslationProject {
    id: number;
    name: string;
}

export class GrammarTag {
    name: string;
    description: string;
}

export class Translation {
    id: number;
    value: string;
    wordOrder: number;
    note: string;
    verse: number;
    chapter: number;
    book: number;
    grammarTags: GrammarTag[];
}