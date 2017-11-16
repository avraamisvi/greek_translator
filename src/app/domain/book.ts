import {Verse} from './verse';
import { Chapter } from './chapter';

export class Book {
    name: string;
    number: number;//codigo de id
    chapters: Chapter[];
}