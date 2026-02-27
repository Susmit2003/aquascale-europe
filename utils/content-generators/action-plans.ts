// utils/content-generators/action-plans.ts

export interface ActionPlan {
  renter: string;
  homeowner: string;
  commercial: string;
  hospitality: string;
}

// Simple seeded random function to ensure consistent content per city
const seededRandom = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  return () => {
    h = Math.imul(741103597, h);
    return ((h >>> 0) / 4294967296);
  };
};

export function generateCityActionPlan(cityName: string, hardness: number): ActionPlan {
  const random = seededRandom(cityName);
  const isHard = hardness > 120;
  
  // Content arrays to pick from to ensure uniqueness per city
  const renterIntros = [
    `As a tenant in ${cityName}, you might not be able to install a whole-house system.`,
    `Renting an apartment in ${cityName} means you need portable or temporary solutions for the ${hardness} mg/L water.`,
    `If you rent in ${cityName}, protecting your skin and appliances without altering the plumbing is key.`
  ];

  const homeownerIntros = [
    `Owning a home in ${cityName} makes a permanent water softening solution a smart investment.`,
    `For ${cityName} homeowners, the ${hardness} mg/L hardness level directly impacts your property's plumbing infrastructure.`,
    `Protecting your real estate investment in ${cityName} starts with addressing the local water quality.`
  ];

  const commercialIntros = [
    `Running a restaurant or cafe in ${cityName} requires strict water management.`,
    `Commercial kitchens in ${cityName} face unique challenges with ${hardness} mg/L water.`,
    `In the ${cityName} food service industry, water quality dictates equipment lifespan and beverage taste.`
  ];

  const hospitalityIntros = [
    `Airbnb hosts and hoteliers in ${cityName} must consider guest comfort and cleaning times.`,
    `Managing a hospitality business in ${cityName} means dealing with scale buildup in multiple bathrooms.`,
    `For ${cityName} hotels, ${hardness} mg/L water means higher laundry costs and faster linen wear.`
  ];

  // Pick random intro based on city seed
  const rIntro = renterIntros[Math.floor(random() * renterIntros.length)];
  const hIntro = homeownerIntros[Math.floor(random() * homeownerIntros.length)];
  const cIntro = commercialIntros[Math.floor(random() * commercialIntros.length)];
  const hostIntro = hospitalityIntros[Math.floor(random() * hospitalityIntros.length)];

  // Formulate paragraphs
  const renterAction = isHard 
    ? `${rIntro} We highly recommend investing in a high-quality shower filter to protect your hair and skin. For the kitchen, a countertop reverse osmosis system or a simple descaling routine using EU-compliant eco-friendly acids (like citric acid) for your kettle and coffee maker will save you from replacing small appliances yearly.`
    : `${rIntro} Fortunately, with a relatively soft ${hardness} mg/L, you don't need heavy filtration. A basic carbon filter pitcher will improve taste, and standard appliance maintenance is sufficient.`;

  const homeownerAction = isHard
    ? `${hIntro} With hardness levels hitting ${hardness} mg/L, installing a centralized ion-exchange water softener is highly recommended. This protects your boiler, dishwasher, and washing machine. In compliance with EU environmental guidelines, ensure you select a high-efficiency model that minimizes salt waste. Furthermore, upgrading to scale-resistant PEX piping during any renovations will prevent long-term pressure loss.`
    : `${hIntro} Since ${cityName}'s water sits at an agreeable ${hardness} mg/L, a full-scale water softener is unnecessary. Focus instead on point-of-use filtration if you prefer a different taste profile for drinking water.`;

  const commercialAction = isHard
    ? `${cIntro} Espresso machines and commercial dishwashers are highly vulnerable to ${hardness} mg/L water. You must install a commercial-grade calcium treatment unit (CTU) or reverse osmosis system specifically for your beverage stations to prevent costly breakdowns and maintain flavor consistency. Routine descaling schedules should be strictly enforced.`
    : `${cIntro} Equipment scaling is a low risk at ${hardness} mg/L. However, installing commercial carbon filters is still advised to ensure chlorine removal and perfectly consistent flavor profiles for your coffee and culinary preparations.`;

  const hospitalityAction = isHard
    ? `${hostIntro} Hard water spots on shower glass and fixtures can lead to poor guest reviews. Utilize professional-grade, eco-friendly descalers. For properties with more than 3 bathrooms, a commercial twin-tank water softener is a non-negotiable operational expense to reduce housekeeping labor and extend the life of your towels and linens.`
    : `${hostIntro} Your housekeeping staff will have an easier time maintaining fixtures due to the favorable ${hardness} mg/L levels. Standard EU-approved mild detergents are perfectly adequate for laundry and cleaning operations.`;

  return { renter: renterAction, homeowner: homeownerAction, commercial: commercialAction, hospitality: hospitalityAction };
}