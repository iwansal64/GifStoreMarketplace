import GI from "../assets/products/GI.jpg";
import HSR from "../assets/products/HSR.jpg";
import MLBB from "../assets/products/MLBB.png";
import HOK from "../assets/products/HOK.png";

import GI_HERO from "../assets/products/HeroImage/GI.png";
import HSR_HERO from "../assets/products/HeroImage/HSR.jpg";
import MLBB_HERO from "../assets/products/HeroImage/MLBB.jpg";
import HOK_HERO from "../assets/products/HeroImage/HOK.jpg";

type Product = {
    image: ImageMetadata,
    image_hero: ImageMetadata,
    title: string,
    id: string;
};

export const product: { [index: string]: Product; } = {
    "Genshin Impact": {
        image: GI,
        image_hero: GI_HERO,
        title: "Genshin Impact",
        id: "Genshin Impact"
    },
    "Honkai Starrail": {
        image: HSR,
        image_hero: HSR_HERO,
        title: "Honkai Starrail",
        id: "Honkai Star Rail"
    },
    "Mobile Legends": {
        image: MLBB,
        image_hero: MLBB_HERO,
        title: "Mobile Legends",
        id: "MOBILE LEGENDS"
    },
    "Honor of Kings": {
        image: HOK,
        image_hero: HOK_HERO,
        title: "Honor of Kings",
        id: "Honor of Kings"
    },
};
