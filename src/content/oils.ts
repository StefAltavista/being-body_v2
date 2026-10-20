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
    slug: "helios",
    name: "Helios",
    intention: "Renewing",
    ingredients: "Helichrysum, Linden, Neroli, Jasmin, Sweet Orange",
    character: "Gentle and warm, powerful in restoration",
    benefit:
      "Can sooth skin, ease tension and cradle emotions, Nurturing inner & outer radience",
    images: [
      "/img/oils/helios-foto.jpg",
      "/img/oils/helios-logo.png",
      "/img/oils/helios-design.png",
    ],
    poem: [
      "This blend is inspired by the last light of summer",
      "warm earth holding sky, scattered moments softly glowing",
      "nostalgic waves of honeyed tranquility",
      "relaxed, open",
      "sensuous surrender to settling in",
    ],

    description:
      "This blend contains Helichrysum Italicum from Isola di Elba. Also known as “immortelle”, preserved drops of sun both radiant and resilient. This Mediterranean flower is a very powerful topical ally and soothing compagnion: helping calm reactive, irritated skin and supporting regeneration and elasticity. This oil sooths both physically and emotionally. Helichrysum, golden herbaceous, Linden, honeyed tender - weaving a soft, sunbaked memory. Neroli, luminous citrus - conjuring the golden air. Jasmine, hypnotic floral - shifting, welcoming nocturnal. Sweet Orange, sparkling zest - shimmering, lifting. A spell to summon the sun that remains after summer has passed, wrap you in the warmth of nostolgia and cultivate a deep glow both inside and out 🌞",
    backgroundHue: 305,
  },
  {
    slug: "zefiros",
    name: "Zefiros",
    intention: "Elevating",
    ingredients: "Bergamot, Ylang-Ylang, Cedarwood",
    character: "Buoyant and effervescent, powerful in inspiration",
    benefit: "Can boost mood, ease anxiety, refocus energies",
    images: [
      "/img/oils/zefiros-foto.jpg",
      "/img/oils/zefiros-logo.png",
      "/img/oils/zefiros-design.png",
    ],
    poem: [
      "This blend is inspired by a breeze of new beginnings",
      "soft lapping against limbs",
      "floating footsteps, rustling of leaves",
      "dulcept harmonies carrying, calling",
    ],
    description:
      "Bergamot, airy and uplifting, Ylang-Ylang sensual and floating, Cedar, grounding and woody. A spell for navigating swirling gusts, motivating withering winds, soothing inner conflict, and finding balance. Light and bright, encouraging us with the calls of a sweet, soft breeze 🌼✨",
    backgroundHue: 305,
  },
  {
    slug: "cleansing-clary",
    name: "Cleansing Clary",
    intention: "Restoring",
    ingredients: "Lavender, Clary Sage, Mint",
    character: "Clearing and calming, powerful in intuition",
    benefit: "Can promote clarity of thought, ease tension, and enhance vision",
    images: [
      "/img/oils/cc-foto.webp",
      "/img/oils/cc-logo.webp",
      "/img/oils/cc-design.png",
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
      "/img/oils/ss-foto.webp",
      "/img/oils/ss-logo.webp",
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
      "/img/oils/rr-foto.webp",
      "/img/oils/rr-logo.webp",
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
      "/img/oils/ff-foto.webp",
      "/img/oils/ff-logo.webp",
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
  // {
  //   slug: "zephyrous-zest",
  //   name: "Zephyrous Zest",
  //   intention: "Elevating",
  //   ingredients: "Cedarwood, Bergamot, Ylang-Ylang",
  //   character: "Buoyant and effervescent, powerful in inspiration",
  //   benefit: "Can boost mood, self-esteem, and ease anxiety",
  //   images: [
  //     "/img/oils/zz-foto.webp",
  //     "/img/oils/zz-logo.webp",
  //     "/img/oils/zz-design.jpg",
  //   ],
  //   poem: [
  //     "This blend is inspired by the sweet breeze of spring",
  //     "Soft licks lapping against limbs",
  //     "Floating footsteps, rustle of leaves",
  //     "Dulcet harmonies carrying, calling",
  //   ],
  //   description:
  //     "Anchoring cedar, uplifting bergamot, and stimulating ylang-ylang. A spell for navigating swirling gusts, motivating withering winds, soothing inner conflict, and finding balance. Light and bright, encouraging us with the calls of a sweet, soft breeze of serenity 🌬️✨",
  //   backgroundHue: 245,
  // },
];

export function getOilBySlug(slug: string) {
  return oils.find((oil) => oil.slug === slug);
}
