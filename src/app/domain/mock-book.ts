import {Book} from './book';
import {Verse} from './verse';
import {Word} from './word';
import {Chapter} from './chapter';

const words_str = 'ὁ<S>3588</S> <m>T-NSM</m> δὲ<S>1161</S> <m>CONJ</m> ἐπιχορηγῶν<S>2023</S> <m>V-PAP-NSM</m> σπέρμα<S>4690</S> <m>N-ASN</m> τῷ<S>3588</S> <m>T-DSM</m> σπείροντι<S>4687</S> <m>V-PAP-DSM</m> καὶ<S>2532</S> <m>CONJ</m> ἄρτον<S>740</S> <m>N-ASM</m> εἰς<S>1519</S> <m>PREP</m> βρῶσιν<S>1035</S> <m>N-ASF</m> χορηγήσαι<S>5524</S> <m>V-AAO-3S</m> καὶ<S>2532</S> <m>CONJ</m> πληθυναῖ<S>4129</S> <m>V-AAO-3S</m> τὸν<S>3588</S> <m>T-ASM</m> σπόρον<S>4703</S> <m>N-ASM</m> ὑμῶν<S>5216</S> <m>P-2GP</m> καὶ<S>2532</S> <m>CONJ</m> αὐξήσαι<S>837</S> <m>V-AAO-3S</m> τὰ<S>3588</S> <m>T-APN</m> γεννήματα<S>1081</S> <m>N-APN</m> τῆς<S>3588</S> <m>T-GSF</m> δικαιοσύνης<S>1343</S> <m>N-GSF</m> ὑμῶν<S>5216</S> <m>P-2GP</m>·'.split(' ');

let words: Word[] = [];

const VERSES: Verse[] = [
    {
        book_number: 540,
        chapter: 1,
        verse: 1,
        text: words
    }
]

words_str.forEach((word, index) => {
    
    let idx = word.indexOf("<S>");
    
    if(idx > -1) {
        word = word.substring(0, idx);
    }

    if(word.indexOf("<m>") <= -1)
        words.push({id:index, 
                    value: word, 
                    classes: "word", 
                    translation: null,
                    verse: VERSES[0]
                });
});

VERSES[0].text = words;

export const BOOK: Book = {
    name: 'Προς Κορινθίους Β\'',
    number: 540,
    chapters: [
        {number: 1, verses: VERSES},
        {number: 2, verses: VERSES}
    ]
}
  /**
   * bnumber chap verse
   * "540"	"9"	"10"
   * ὁ<S>3588</S> <m>T-NSM</m> δὲ<S>1161</S> <m>CONJ</m> ἐπιχορηγῶν<S>2023</S> <m>V-PAP-NSM</m> σπέρμα<S>4690</S> <m>N-ASN</m> τῷ<S>3588</S> <m>T-DSM</m> σπείροντι<S>4687</S> <m>V-PAP-DSM</m> καὶ<S>2532</S> <m>CONJ</m> ἄρτον<S>740</S> <m>N-ASM</m> εἰς<S>1519</S> <m>PREP</m> βρῶσιν<S>1035</S> <m>N-ASF</m> χορηγήσαι<S>5524</S> <m>V-AAO-3S</m> καὶ<S>2532</S> <m>CONJ</m> πληθυναῖ<S>4129</S> <m>V-AAO-3S</m> τὸν<S>3588</S> <m>T-ASM</m> σπόρον<S>4703</S> <m>N-ASM</m> ὑμῶν<S>5216</S> <m>P-2GP</m> καὶ<S>2532</S> <m>CONJ</m> αὐξήσαι<S>837</S> <m>V-AAO-3S</m> τὰ<S>3588</S> <m>T-APN</m> γεννήματα<S>1081</S> <m>N-APN</m> τῆς<S>3588</S> <m>T-GSF</m> δικαιοσύνης<S>1343</S> <m>N-GSF</m> ὑμῶν<S>5216</S> <m>P-2GP</m>·
   */
