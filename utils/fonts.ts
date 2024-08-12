import { 
    Barlow_Condensed, Montserrat, Oswald, Source_Sans_3,
    Nunito_Sans, Hind, Nunito, PT_Sans, Stint_Ultra_Expanded,
    Pontano_Sans, Playfair_Display, Lato, Quicksand, Rubik,
    Roboto_Mono, Poiret_One, Orelega_One
} from "next/font/google";


// ========================= Read this ===================================
// Font pairs uncomment your font pair and update exported font in line 65 

// 1. Barlow Condensed & Montserrat
// export const head1 = Barlow_Condensed({ subsets: ['latin'], weight: ['400'] });
// export const body1 = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

// 2. Oswald & Source Sans Pro
// export const head2 = Oswald({ subsets: ['latin'], weight: ['400'] });
// export const body2 = Source_Sans_3({ subsets: ['latin'], weight: ['400', '700'] });

// 3. Nunito Sans (Bold & Regular)
// export const head3 = Nunito_Sans({ subsets: ['latin'], weight: ['400', '700'] });
// export const body3 = Nunito_Sans({ subsets: ['latin'], weight: ['400', '700'] });

// 4. Montserrat & Hind
// export const head4 = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });
// export const body4 = Hind({ subsets: ['latin'], weight: ['400'] });

// 5. Nunito & PT Sans
// export const head5 = Nunito({ subsets: ['latin'], weight: ['400', '700'] });
// export const body5 = PT_Sans({ subsets: ['latin'], weight: ['400'] });

// 6. Stint Ultra Expanded & Pontano Sans
// export const head6 = Stint_Ultra_Expanded({ subsets: ['latin'], weight: ['400'] });
// export const body6 = Pontano_Sans({ subsets: ['latin'], weight: ['400'] });

// 7. Playfair Display & Lato
// export const head7 = Playfair_Display({ subsets: ['latin'], weight: ['400'] });
// export const body7 = Lato({ subsets: ['latin'], weight: ['400', '700'] });

// 8. Quicksand (Bold & Regular)
export const head8 = Quicksand({ subsets: ['latin'], weight: ['400', '700'] });
export const body8 = Quicksand({ subsets: ['latin'], weight: ['400', '700'] });

// 9. Rubik & Roboto Mono
// export const head9 = Rubik({ subsets: ['latin'], weight: ['400', '700'] });
// export const body9 = Roboto_Mono({ subsets: ['latin'], weight: ['400'] });

// 10. Poiret One & Montserrat
// export const head10 = Poiret_One({ subsets: ['latin'], weight: ['400'] });
// export const body10 = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

// 11. Oswald & Quicksand
// export const head11 = Oswald({ subsets: ['latin'], weight: ['400'] });
// export const body11 = Quicksand({ subsets: ['latin'], weight: ['400', '700'] });

// 12. Nunito & Nunito Sans
// export const head12 = Nunito({ subsets: ['latin'], weight: ['400', '700'] });
// export const body12 = Nunito_Sans({ subsets: ['latin'], weight: ['400', '700'] });

// 13. Orelega One & Montserrat
// export const head13 = Orelega_One({ subsets: ['latin'], weight: ['400'] });
// export const body13 = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });


// Export your font

export const font = {
    head: head8,
    body: body8
}