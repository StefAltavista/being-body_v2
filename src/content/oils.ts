export type OilBlend = {
  slug: string;
  name: string;
  intention: string;
  ingredients: string;
  character: string;
  benefit: string;
  images: string[];
  poem: string[];
  description: string;
  backgroundHue: number;
};

export const oils: OilBlend[] = [
  {
    slug: "cleansing-clary",
    name: "Cleansing Clary",
    intention: "Restoring",
    ingredients: "Lavender, Clary Sage, Mint",
    character: "Clearing and calming, powerful in intuition",
    benefit: "Can promote clarity of thought, ease tension, and enhance vision",
    images: [
      "/img/oils/cc-foto.png",
      "/img/oils/cc-logo.png",
      "/img/oils/cc-logo.png",
    ],
    poem: [
      "This blend is inspired by trickling tranquility",
      "Winding through mossy stones",
      "Rolling over, rocking rhythm, continuous movement",
      "Shaping, transporting, supporting",
      "Washing away, bringing anew",
    ],
    description:
      "Mint for spring freshness, lavender for midsummer calm, and clary sage for late-summer rituals of wisdom and reflection. Potent in work with clarity, communication, dreams, intuition, emotional balance, and adaptability. A spell for shapeshifting into a dewy daydream ✨",
    backgroundHue: 305,
  },
  {
    slug: "sensitive-seed",
    name: "Sensitive Seed",
    intention: "Connecting",
    ingredients: "Cardamom, Myrtle, Jasmine",
    character: "Stimulating and meditative, powerful in sensitivity",
    benefit: "Can soothe, enhance mood, and embolden love",
    images: [
      "/img/oils/ss-foto.png",
      "/img/oils/ss-logo.png",
      "/img/oils/ss-design.jpg",
    ],
    poem: [
      "This blend is inspired by the in-between",
      "The threads of connection",
      "Soft screen of unseen",
      "Tapestries of divine juxtaposition",
    ],
    description:
      "Cardamom, warming spice to kindle passion; myrtle, woody and warding off negativity; and jasmine, sweet moon flower, bridge to the otherworldly. A spell to find balance in ambiguity, opening the heart and connecting 🍂💫",
    backgroundHue: 20,
  },
  {
    slug: "resonating-root",
    name: "Resonating Root",
    intention: "Grounding",
    ingredients: "Vetiver, Cypress, Cinnamon",
    character: "Warm and centering, powerful in generosity of spirit",
    benefit: "Can alleviate stress and aid in moments of transition",
    images: [
      "/img/oils/rr-foto.png",
      "/img/oils/rr-logo.png",
      "/img/oils/rr-design.jpg",
    ],
    poem: [
      "This blend is inspired by the scattering of leaves",
      "Embers of a fire that warm the earth from the inside",
      "Network of roots running deep, grounding, grabbing hold",
      "As the first frosts fall, a quiet blanket suspending time",
    ],
    description:
      "Earthy vetiver, moving cypress, and igniting cinnamon—a spell for grounding when the soil itself seems nowhere to be found. The warm hug of earth, the spirit to carry on 🍁🔥",
    backgroundHue: 95,
  },
  {
    slug: "feeling-fir",
    name: "Feeling Fir",
    intention: "Revealing",
    ingredients: "Silver Fir, Fennel, Frankincense",
    character: "Mysterious and full of wonder, powerful in perception",
    benefit: "Can promote peace of mind and enhance meditation",
    images: [
      "/img/oils/ff-foto.png",
      "/img/oils/ff-logo.png",
      "/img/oils/ff-design.jpg",
    ],
    poem: [
      "This blend is inspired by a gentle mist in a lost forest",
      "Sweet chills along ridges",
      "Branches billowing, breath",
      "Guiding passage of soft secrets",
    ],
    description:
      "Gentle silver fir, focusing fennel, and sacred frankincense—a spell to hear the harmony of voices that echo in our internal mountain ranges. 🌬️🍃",
    backgroundHue: 175,
  },
  {
    slug: "zephyrous-zest",
    name: "Zephyrous Zest",
    intention: "Elevating",
    ingredients: "Cedarwood, Bergamot, Ylang-Ylang",
    character: "Buoyant and effervescent, powerful in inspiration",
    benefit: "Can boost mood, self-esteem, and ease anxiety",
    images: [
      "/img/oils/zz-foto.png",
      "/img/oils/zz-logo.png",
      "/img/oils/zz-design.jpg",
    ],
    poem: [
      "This blend is inspired by the sweet breeze of spring",
      "Soft licks lapping against limbs",
      "Floating footsteps, rustle of leaves",
      "Dulcet harmonies carrying, calling",
    ],
    description:
      "Anchoring cedar, uplifting bergamot, and stimulating ylang-ylang. A spell for navigating swirling gusts, motivating withering winds, soothing inner conflict, and finding balance. Light and bright, encouraging us with the calls of a sweet, soft breeze of serenity 🌬️✨",
    backgroundHue: 245,
  },
];

export function getOilBySlug(slug: string) {
  return oils.find((oil) => oil.slug === slug);
}
