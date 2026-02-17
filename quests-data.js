const QUESTS = [
  {
    id: "milestone-10",
    title: "First Steps",
    description: "Complete 10 pulls",
    type: "milestone",
    target: 10,
    stat: "pullCount",
    reward: { coins: 50 }
  },
  {
    id: "milestone-50",
    title: "Getting Serious",
    description: "Complete 50 pulls",
    type: "milestone",
    target: 50,
    stat: "pullCount",
    reward: { coins: 100 }
  },
  {
    id: "milestone-100",
    title: "Collector",
    description: "Complete 100 pulls",
    type: "milestone",
    target: 100,
    stat: "pullCount",
    reward: { coins: 200 }
  },
  {
    id: "rarity-rare",
    title: "Blue Spark",
    description: "Get your first Rare card",
    type: "rarity",
    rarity: "rare",
    reward: { coins: 130 }
  },
  {
    id: "rarity-holographic",
    title: "Shimmer",
    description: "Get your first Holographic card",
    type: "rarity",
    rarity: "holographic",
    reward: { coins: 250 }
  },
  {
    id: "rarity-legendary",
    title: "LEGENDARY!!!",
    description: "Get your first Legendary card",
    type: "rarity",
    rarity: "legendary",
    reward: { coins: 700 }
  },
  {
  id: "collection-bts",
  title: "Purple Era",
  description: "Collect all BTS members",
  type: "collection",
  group: "BTS",
  reward: { coins: 550 }
},
{
  id: "collection-nct",
  title: "Dream Core",
  description: "Collect all NCT Dream members",
  type: "collection",
  group: "NCT Dream",
  reward: { coins: 550 }
},
{
  id: "collection-txt",
  title: "Star Seeker",
  description: "Collect all TXT members",
  type: "collection",
  group: "TXT",
  reward: { coins: 550 }
},
{
  id: "collection-aespa",
  title: "Virtual Sync",
  description: "Collect all aespa members",
  type: "collection",
  group: "aespa",
  reward: { coins: 550 }
},
{
  id: "collection-tws",
  title: "Fresh Start",
  description: "Collect all TWS members",
  type: "collection",
  group: "TWS",
  reward: { coins: 550 }
},
{
  id: "collection-enhypen",
  title: "Crossing Lines",
  description: "Collect all ENHYPEN members",
  type: "collection",
  group: "ENHYPEN",
  reward: { coins: 550 }
},
{
  id: "collection-seventeen",
  title: "Stage Leaders",
  description: "Collect all SEVENTEEN members",
  type: "collection",
  group: "SEVENTEEN",
  reward: { coins: 550 }
},
{
  id: "collection-twice",
  title: "Top Tier",
  description: "Collect all TWICE members",
  type: "collection",
  group: "TWICE",
  reward: { coins: 550 }
},
{
  id: "collection-blackpink",
  title: "Global Stage",
  description: "Collect all BLACKPINK members",
  type: "collection",
  group: "BLACKPINK",
  reward: { coins: 550 }
},
{
  id: "collection-ive",
  title: "Center Focus",
  description: "Collect all IVE members",
  type: "collection",
  group: "IVE",
  reward: { coins: 550 }
},
{
  id: "collection-newjeans",
  title: "New Wave",
  description: "Collect all NewJeans members",
  type: "collection",
  group: "NewJeans",
  reward: { coins: 550 }
},
{
  id: "collection-illit",
  title: "Soft Debut",
  description: "Collect all ILLIT members",
  type: "collection",
  group: "ILLIT",
  reward: { coins: 550 }
},
{
  id: "collection-ateez",
  title: "World Tour Mode",
  description: "Collect all ATEEZ members",
  type: "collection",
  group: "ATEEZ",
  reward: { coins: 550 }
},
{
  id: "collection-straykids",
  title: "Self-Made",
  description: "Collect all Stray Kids members",
  type: "collection",
  group: "Stray Kids",
  reward: { coins: 550 }
},
{
  id: "collection-riize",
  title: "Rising Phase",
  description: "Collect all RIIZE members",
  type: "collection",
  group: "RIIZE",
  reward: { coins: 550 }
},
{
  id: "collection-lesserafim",
  title: "Next Level Presence",
  description: "Collect all LE SSERAFIM members",
  type: "collection",
  group: "LE SSERAFIM",
  reward: { coins: 550 }
},
{
  id: "collection-gidle",
  title: "Creative Control",
  description: "Collect all (G)I-DLE members",
  type: "collection",
  group: "(G)I-DLE",
  reward: { coins: 550 }
},
{
  id: "collection-zerobaseone",
  title: "Final Lineup",
  description: "Collect all ZEROBASEONE members",
  type: "collection",
  group: "ZEROBASEONE",
  reward: { coins: 550 }
},

];

const ACHIEVEMENTS = {
  completed: [],
  unlockedAt: {}
};
