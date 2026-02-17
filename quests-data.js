// ═══════════════════════════════════════════════════════════════════
// 🎯 QUESTS & ACHIEVEMENTS SYSTEM
// ═══════════════════════════════════════════════════════════════════

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
    id: "rarity-fancam",
    title: "Golden Hour",
    description: "Get your first Fancam card",
    type: "rarity",
    rarity: "fancam",
    reward: { coins: 375 }
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
    title: "BTS Collector",
    description: "Collect all BTS members",
    type: "collection",
    group: "BTS",
    reward: { coins: 550 }
  },
  {
    id: "collection-nct",
    title: "NCT Dream Team",
    description: "Collect all NCT Dream members",
    type: "collection",
    group: "NCT Dream",
    reward: { coins: 550 }
  },
  {
    id: "collection-txt",
    title: "Tomorrow is Today",
    description: "Collect all TXT members",
    type: "collection",
    group: "TXT",
    reward: { coins: 550 }
  },
  {
    id: "lucky-7",
    title: "Lucky Number",
    description: "Pull exactly on pull #7",
    type: "special",
    reward: { coins: 350 }
  }
];

// Define achievement state
const ACHIEVEMENTS = {
  completed: [],
  unlockedAt: {}
};
