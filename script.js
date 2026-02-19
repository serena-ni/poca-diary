// ============================================
// UI ELEMENTS - Initialize on DOM ready
// ============================================
let UI = {};

function initializeUI() {
  UI = {
    pullBtn: document.getElementById("pullBtn"),
    card: document.getElementById("card"),
    idolImage: document.getElementById("idolImage"),
    idolName: document.getElementById("idolName"),
    idolDesc: document.getElementById("idolDesc"),
    rarityText: document.getElementById("rarity"),
    newBadge: document.getElementById("newBadge"),
    
    openDiaryBtn: document.getElementById("openDiaryBtn"),
    diaryWindow: document.getElementById("diaryWindow"),
    pageLeft: document.getElementById("pageLeft"),
    pageRight: document.getElementById("pageRight"),
    prevPageBtn: document.getElementById("prevPageBtn"),
    nextPageBtn: document.getElementById("nextPageBtn"),
    closeDiaryBtn: document.getElementById("closeDiaryBtn"),
    collectionCount: document.getElementById("collectionCount"),
    pageIndicator: document.getElementById("pageIndicator"),
    
    openQuestsBtn: document.getElementById("openQuestsBtn"),
    openShopBtn: document.getElementById("openShopBtn"),
    questWindow: document.getElementById("questWindow"),
    shopWindow: document.getElementById("shopWindow"),
    closeQuestsBtn: document.getElementById("closeQuestsBtn"),
    closeShopBtn: document.getElementById("closeShopBtn"),
    questContent: document.getElementById("questContent"),
    shopContent: document.getElementById("shopContent"),
    questNotification: document.getElementById("questNotification"),
    rarityStreakEl: document.getElementById("rarityStreak"),
    
    openMinigamesBtn: document.getElementById("openMinigamesBtn"),
    minigameWindow: document.getElementById("minigameWindow"),
    closeMinigamesBtn: document.getElementById("closeMinigamesBtn"),
    minigameList: document.getElementById("minigameList"),
    minigamePlay: document.getElementById("minigamePlay"),
    
    energyDisplay: document.getElementById("energyDisplay"),
    coinDisplay: document.getElementById("coinDisplay")
  };
}

// ============================================
// GAME CONFIG
// ============================================
const CONFIG = {
  ENERGY_COST: 5,
  ENERGY_REGEN_TIME: 30000,
  ENERGY_REGEN_AMOUNT: 1,
  MAX_ENERGY: 50,
  DIARY_PER_PAGE: 2,
  PITY_THRESHOLD: 50  // legendary guaranteed after this many pulls
};

// Rarity thresholds
const RARITY_RATES = {
  COMMON: 0.70,
  RARE: 0.90,
  HOLOGRAPHIC: 0.97,
  LEGENDARY: 1.0
};

// ============================================
// GAME STATE
// ============================================
const gameState = {
  collection: JSON.parse(localStorage.getItem("pocaCollection")) || [],
  pullCount: parseInt(localStorage.getItem("pullCount")) || 0,
  pityCounter: parseInt(localStorage.getItem("pityCounter")) || 0,
  lastRarity: null,
  isPulling: false,
  currentPage: 0,
  
  energy: parseInt(localStorage.getItem("energy")) || CONFIG.MAX_ENERGY,
  coins: parseInt(localStorage.getItem("coins")) || 0,
  lastEnergyTime: parseInt(localStorage.getItem("lastEnergyTime")) || Date.now(),
  energyDirty: false,
  
  completedAchievements: JSON.parse(localStorage.getItem("completedAchievements")) || [],
  lastDailyBonus: parseInt(localStorage.getItem("lastDailyBonus")) || 0
};

// ============================================
// UTILITY FUNCTIONS FOR STORAGE
// ============================================
function saveCurrencyData() {
  localStorage.setItem("energy", gameState.energy);
  localStorage.setItem("coins", gameState.coins);
  localStorage.setItem("lastEnergyTime", gameState.lastEnergyTime);
  gameState.energyDirty = false;
}

function savePullData() {
  localStorage.setItem("pullCount", gameState.pullCount);
  localStorage.setItem("pityCounter", gameState.pityCounter);
  localStorage.setItem("pocaCollection", JSON.stringify(gameState.collection));
}

function saveAchievementData() {
  localStorage.setItem("completedAchievements", JSON.stringify(gameState.completedAchievements));
}

function updateCurrencyDisplay() {
  UI.energyDisplay.textContent = `energy: ${gameState.energy}/${CONFIG.MAX_ENERGY}`;
  UI.coinDisplay.textContent = `coins: ${gameState.coins}`;
}

const MINIGAMES = [
  {
    id: "beat-drop",
    name: "beat drop",
    description: "stop the beat in the spotlight zone",
    cost: 3
  },
  {
    id: "lyric-scramble",
    name: "lyric scramble",
    description: "build the line from shuffled words",
    cost: 2
  },
  {
    id: "memory-stage",
    name: "memory stage",
    description: "match the stage cards to win coins",
    cost: 4
  }
];

const SCRAMBLE_LINES = [
  "neon glow over the stage",
  "heartbeat rides the bassline",
  "hands up under moonlight",
  "we dance past the skyline",
  "spotlight paints our silhouettes",
  "echoes chase the midnight"
];

const MEMORY_WORDS = [
  "beat",
  "glow",
  "stage",
  "vibe",
  "pulse",
  "shine",
  "crowd",
  "echo",
  "spark",
  "tempo"
];

const STAGE_NAME_ALIASES = {
  "tomorrow by together": "TXT",
  "soo-bin": "Soobin",
  "soobin": "Soobin",
  "hueningkai": "Huening Kai",
  "huening kai": "Huening Kai",
  "winwin": "Winwin"
};

// ============================================
// EVENT LISTENERS & INITIALIZATION
// ============================================
function setupEventListeners() {
  UI.pullBtn.addEventListener("click", pullCard);
  UI.openDiaryBtn.addEventListener("click", () => {
    UI.diaryWindow.classList.remove("hidden");
    updateDiary();
  });
  UI.closeDiaryBtn.addEventListener("click", () => UI.diaryWindow.classList.add("hidden"));
  UI.prevPageBtn.addEventListener("click", () => flipPage(-1));
  UI.nextPageBtn.addEventListener("click", () => flipPage(1));

  UI.openQuestsBtn.addEventListener("click", () => {
    UI.questWindow.classList.remove("hidden");
    renderQuests();
  });
  UI.closeQuestsBtn.addEventListener("click", () => UI.questWindow.classList.add("hidden"));

  UI.openShopBtn.addEventListener("click", () => {
    UI.shopWindow.classList.remove("hidden");
    renderShop();
  });
  UI.closeShopBtn.addEventListener("click", () => UI.shopWindow.classList.add("hidden"));

  UI.openMinigamesBtn.addEventListener("click", () => {
    UI.minigameWindow.classList.remove("hidden");
    renderMinigameList();
    selectMinigame(activeMinigameId || MINIGAMES[0].id);
  });
  UI.closeMinigamesBtn.addEventListener("click", () => {
    cleanupMinigame();
    UI.minigameWindow.classList.add("hidden");
  });
}

function initializeGame() {
  // Wait for external data to be loaded (with timeout)
  if (typeof idolDatabase === 'undefined' || typeof QUESTS === 'undefined') {
    console.log('Waiting for data files... idolDatabase:', typeof idolDatabase, 'QUESTS:', typeof QUESTS);
    setTimeout(initializeGame, 100);
    return;
  }
  
  console.log('Initializing game with', idolDatabase.length, 'idols and', QUESTS.length, 'quests');
  
  initializeUI();
  setupEventListeners();
  updateCurrencyDisplay();
  updateEnergyRegen();
  setInterval(updateEnergyRegen, 1000);
  
  console.log('Game initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGame);
} else {
  initializeGame();
}

function pullCard() {
  try {
    // Guard against missing data
    if (!idolDatabase || !idolDatabase.length) {
      showNotification("loading data... please wait");
      return;
    }
    
    if (gameState.isPulling) return;
    if (gameState.energy < CONFIG.ENERGY_COST) {
      showNotification("not enough energy! " + Math.ceil((CONFIG.ENERGY_COST - gameState.energy) * 30) + "s");
      return;
    }
    
    gameState.isPulling = true;
    UI.pullBtn.disabled = true;
    
    gameState.energy -= CONFIG.ENERGY_COST;
    gameState.lastEnergyTime = Date.now();
    gameState.energyDirty = true;
    updateCurrencyDisplay();
    
    const randomIdol = idolDatabase[Math.floor(Math.random() * idolDatabase.length)];
    
    gameState.pullCount++;
    gameState.pityCounter++;
    
    UI.card.classList.remove("hidden");
    UI.card.classList.add("loading");
    UI.idolName.textContent = "opening...";
    UI.idolDesc.textContent = "";
    UI.rarityText.textContent = "";
    UI.idolImage.src = "";
    UI.newBadge.classList.add("hidden");
    document.getElementById("spotifyLink").classList.add("hidden");
    
    console.log('Pull started for idol:', randomIdol?.stageName);
    setTimeout(() => displayCard(randomIdol), 800);
  } catch (error) {
    console.error('Error in pullCard:', error);
    showNotification('An error occurred. Check console.');
    gameState.isPulling = false;
    UI.pullBtn.disabled = false;
  }
}

function rollRarity() {
  if (gameState.pityCounter >= CONFIG.PITY_THRESHOLD) {
    gameState.pityCounter = 0;
    return "legendary";
  }
  
  const roll = Math.random();
  if (roll <= RARITY_RATES.COMMON) return "common";
  if (roll <= RARITY_RATES.RARE) return "rare";
  if (roll <= RARITY_RATES.HOLOGRAPHIC) return "holographic";
  return "legendary";
}

function displayCard(idol) {
  try {
    UI.card.classList.remove("hidden");
    UI.card.classList.remove("loading");
    UI.card.classList.add("bounce");
    
    UI.card.classList.remove("rarity-common", "rarity-rare", "rarity-holographic", "rarity-legendary");
    
    setTimeout(() => UI.card.classList.remove("bounce"), 500);

    // error handling
    const stageName = idol?.stageName || "Unknown";
    const realName = idol?.realName || "Unknown";
    const group = idol?.group || "Unknown";
    const birthday = idol?.birthday || "2000-01-01";
    const color = idol?.color || "#9e9e9e";
    const image = idol?.image || "";

    UI.idolName.textContent = stageName;
    
    const birthDate = new Date(birthday);
    const formattedBirthday = !Number.isNaN(birthDate.getTime())
      ? birthDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : birthday;
    
    UI.idolDesc.innerHTML = `<div style="line-height: 1.6;">${realName}<br>group: ${group}<br>born: ${formattedBirthday}</div>`;

    let rarity = rollRarity();
    
    if (rarity === 'legendary') {
      gameState.pityCounter = 0;
    }
    
    UI.rarityText.textContent = rarity;
    UI.card.classList.add(`rarity-${rarity}`);
    
    if (rarity === 'legendary') {
      showRarityMessage(rarity);
    }
    
    gameState.lastRarity = rarity;

    const cardID = stageName + "_" + rarity;

    if (!gameState.collection.includes(cardID)) {
      UI.newBadge.classList.remove("hidden");
      gameState.collection.push(cardID);
      createConfetti();
    } else {
      UI.newBadge.classList.add("hidden");
    }

    const imageSection = UI.card.querySelector('.card-image-section');
    UI.idolImage.src = "";
    UI.idolImage.alt = stageName;
    UI.idolImage.style.display = "none";

    imageSection.style.background = `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`;

    let fallbackName = imageSection.querySelector('.card-fallback-name');
    if (!fallbackName) {
      fallbackName = document.createElement('div');
      fallbackName.className = 'card-fallback-name';
      imageSection.appendChild(fallbackName);
    }

    fallbackName.textContent = stageName;

    const spotifyLink = document.getElementById("spotifyLink");
    spotifyLink.href = `https://open.spotify.com/search/${encodeURIComponent(stageName + " " + group)}`;
    spotifyLink.classList.remove("hidden");

    checkAchievements(rarity, idol);
    
    savePullData();
    saveCurrencyData();
    
    updateDiary();
    
    console.log('Card displayed for:', stageName, 'Rarity:', rarity);
    
    gameState.isPulling = false;
    UI.pullBtn.disabled = false;
  } catch (error) {
    console.error('Error in displayCard:', error);
    showNotification('An error occurred. Check console.');
    gameState.isPulling = false;
    UI.pullBtn.disabled = false;
  }
}

function createConfetti() {
  const colors = ['#ff4d6d', '#5aa9ff', '#ffd6f5', '#ffb347', '#1DB954'];
  for (let i = 0; i < 12; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.3 + 's';
    confetti.style.animationDuration = (2 + Math.random()) + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

function showRarityMessage(rarity) {
  const messages = {
    'legendary': '★★★ legendary pull! ★★★'
  };

  if (!UI.rarityStreakEl) {
    return;
  }

  UI.rarityStreakEl.textContent = messages[rarity] || '';
  UI.rarityStreakEl.classList.remove('hidden');

  setTimeout(() => {
    UI.rarityStreakEl.classList.add('hidden');
  }, 3000);
}

function normalizeStageName(rawName) {
  if (!rawName) return rawName;
  const key = rawName.trim().toLowerCase();
  return STAGE_NAME_ALIASES[key] || rawName.trim();
}

function updateDiary() {
  // Guard against missing data
  if (!idolDatabase || !Array.isArray(idolDatabase)) {
    UI.pageLeft.innerHTML = '<div class="empty-diary">loading your collection...</div>';
    return;
  }
  
  const uniqueIdols = new Map();
  const rarityOrder = ['legendary', 'holographic', 'rare', 'common'];

  gameState.collection.forEach(item => {
    const [rawTitle, rawRarity] = item.split("_");
    const rarity = rawRarity === "fancam" ? "legendary" : rawRarity;
    const title = normalizeStageName(rawTitle);
    if (!uniqueIdols.has(title)) {
      uniqueIdols.set(title, { title, rarity });
    } else {
      const current = uniqueIdols.get(title);
      if (rarityOrder.indexOf(rarity) < rarityOrder.indexOf(current.rarity)) {
        uniqueIdols.set(title, { title, rarity });
      }
    }
  });
  
  const uniqueCards = Array.from(uniqueIdols.values()).filter(item =>
    idolDatabase.some(idol => idol.stageName.toLowerCase() === item.title.toLowerCase())
  );
  const totalPages = Math.ceil(uniqueCards.length / CONFIG.DIARY_PER_PAGE) || 1;
  
  if (gameState.currentPage >= totalPages) {
    gameState.currentPage = totalPages - 1;
  }
  
  const start = gameState.currentPage * CONFIG.DIARY_PER_PAGE;
  const end = start + CONFIG.DIARY_PER_PAGE;
  const pageItems = uniqueCards.slice(start, end);

  UI.pageLeft.innerHTML = "";
  UI.pageRight.innerHTML = "";

  UI.collectionCount.textContent = `collection: ${uniqueCards.length}/${idolDatabase.length}`;
  UI.pageIndicator.textContent = `page ${gameState.currentPage + 1}/${totalPages}`;

  pageItems.forEach((item, i) => {
    const { title, rarity } = item;
    const idol = idolDatabase.find(idol => idol.stageName === title)
      || idolDatabase.find(idol => idol.stageName.toLowerCase() === title.toLowerCase());
    const idolData = idol || {
      stageName: title,
      realName: "Unknown",
      group: "Unknown",
      birthday: "2000-01-01",
      image: "",
      color: "#9e9e9e"
    };
    
    const cardSlot = document.createElement("div");
    cardSlot.className = `poca-slot poca-slot-full slot-${rarity}`;
    
    const img = document.createElement("img");
    img.alt = title;
    
    if (idolData.image) {
      img.src = idolData.image;
      img.onerror = function() {
        this.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.style.cssText = `width: 100%; height: 200px; background: linear-gradient(135deg, ${idolData.color} 0%, ${idolData.color}dd 100%); display: flex; align-items: center; justify-content: center; font-size: 24px; color: white; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);`;
        fallback.textContent = idolData.stageName;
        this.parentNode.insertBefore(fallback, this);
      };
    }
    
    const info = document.createElement("div");
    info.className = "poca-info";
    
    const birthDate = new Date(idolData.birthday);
    const formattedBirthday = Number.isNaN(birthDate.getTime())
      ? "Unknown"
      : birthDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    info.innerHTML = `<strong>${idolData.stageName}</strong><br><span class="idol-real-name">${idolData.realName}</span><br><span class="mini-rarity">${rarity}</span><br><span class="idol-details">${idolData.group} • ${formattedBirthday}</span>`;
    
    cardSlot.appendChild(img);
    cardSlot.appendChild(info);
    
    const container = i === 0 ? UI.pageLeft : UI.pageRight;
    container.appendChild(cardSlot);
  });

  if (uniqueCards.length === 0) {
    UI.pageLeft.innerHTML = '<div class="empty-diary">pull some cards<br>to fill your diary!</div>';
  }
}

function flipPage(direction) {
  const uniqueIdols = new Set(gameState.collection.map(item => item.split("_")[0]));
  const totalPages = Math.ceil(uniqueIdols.size / CONFIG.DIARY_PER_PAGE) || 1;
  
  gameState.currentPage = (gameState.currentPage + direction + totalPages) % totalPages;
  
  const pages = document.querySelector('.pages');
  pages.classList.add('flipping');
  setTimeout(() => pages.classList.remove('flipping'), 400);
  
  updateDiary();
}

function updateEnergyRegen() {
  const currentTime = Date.now();
  const timeDelta = currentTime - gameState.lastEnergyTime;
  const energyGain = Math.floor(timeDelta / CONFIG.ENERGY_REGEN_TIME);
  
  if (energyGain > 0 && gameState.energy < CONFIG.MAX_ENERGY) {
    gameState.energy = Math.min(gameState.energy + energyGain, CONFIG.MAX_ENERGY);
    gameState.lastEnergyTime = currentTime;
    gameState.energyDirty = true;
    updateCurrencyDisplay();
  }
  
  // Only save if dirty flag is set (reduces localStorage writes)
  if (gameState.energyDirty && (energyGain > 0 || timeoutCounter % 10 === 0)) {
    saveCurrencyData();
  }
}

let timeoutCounter = 0;
setInterval(() => { timeoutCounter++; }, 1000);

function showRarityMessage(rarity) {
  const messages = {
    'legendary': '★★★ legendary pull! ★★★'
  };

  if (!UI.rarityStreakEl) {
    return;
  }

  UI.rarityStreakEl.textContent = messages[rarity] || '';
  UI.rarityStreakEl.classList.remove('hidden');

  setTimeout(() => {
    UI.rarityStreakEl.classList.add('hidden');
  }, 3000);
}

function isIdolInQuestGroup(member, quest) {
  if (quest.subunit) {
    const subunits = Array.isArray(member.subunit) ? member.subunit : [member.subunit];
    return subunits.includes(quest.subunit);
  }
  return member.group === quest.group;
}

function checkAchievements(rarity, idol) {
  const completedMilestones = QUESTS.filter(q => 
    q.type === "milestone" && !gameState.completedAchievements.includes(q.id)
  );
  
  completedMilestones.forEach(quest => {
    if (gameState.pullCount >= quest.target) {
      completeAchievement(quest);
    }
  });
  
  const completedRarities = QUESTS.filter(q => 
    q.type === "rarity" && !gameState.completedAchievements.includes(q.id)
  );
  
  completedRarities.forEach(quest => {
    if (rarity === quest.rarity) {
      completeAchievement(quest);
    }
  });
  
  const completedCollections = QUESTS.filter(q => 
    q.type === "collection" && !gameState.completedAchievements.includes(q.id)
  );
  
  completedCollections.forEach(quest => {
    const groupMembers = idolDatabase.filter(member => isIdolInQuestGroup(member, quest));
    const collectedMembers = groupMembers.filter(member => 
      gameState.collection.some(card => card.startsWith(member.stageName))
    );
    if (collectedMembers.length === groupMembers.length) {
      completeAchievement(quest);
    }
  });
  
  const luckyQuest = QUESTS.find(q => q.id === "lucky-7" && !gameState.completedAchievements.includes(q.id));
  if (luckyQuest && gameState.pullCount === 7) {
    completeAchievement(luckyQuest);
  }
}

function completeAchievement(quest) {
  gameState.completedAchievements.push(quest.id);
  saveAchievementData();
  
  gameState.coins += quest.reward.coins || 0;
  saveCurrencyData();
  updateCurrencyDisplay();
  
  showNotification(`${quest.title}! +${quest.reward.coins || 0} coins`);
}

function showNotification(message) {
  UI.questNotification.textContent = message;
  UI.questNotification.style.opacity = "1";
  
  setTimeout(() => {
    UI.questNotification.style.opacity = "0";
  }, 4000);
}

function renderQuests() {
  if (!QUESTS || !Array.isArray(QUESTS)) {
    UI.questContent.innerHTML = '<div style="padding: 20px;">Loading quests...</div>';
    return;
  }
  
  UI.questContent.innerHTML = "";
  
  QUESTS.forEach(quest => {
    const isCompleted = gameState.completedAchievements.includes(quest.id);
    const questEl = document.createElement("div");
    questEl.className = `quest-item ${isCompleted ? "completed" : ""}`;
    
    let progress = "";
    if (quest.type === "milestone") {
      const current = Math.min(gameState.pullCount, quest.target);
      const percent = Math.floor((current / quest.target) * 100);
      progress = `<div class="progress-bar"><div class="progress-fill" style="width: ${percent}%"></div></div><div class="progress-text">${current}/${quest.target}</div>`;
    }
    
    questEl.innerHTML = `
      <div class="quest-info">
        <div class="quest-title">${quest.title}</div>
        <div class="quest-desc">${quest.description}</div>
        ${progress}
        <div class="quest-reward">
          ${quest.reward.coins ? `${quest.reward.coins} coins` : ""}
        </div>
      </div>
    `;
    
    UI.questContent.appendChild(questEl);
  });
}

const SHOP_ITEMS = [
  {
    id: "buy-1-pull",
    name: "Buy 1 Pull",
    description: "Add 5 energy for 1 pull",
    cost: 30,
    currency: "coins",
    effect: "buy_energy",
    amount: 5
  },
  {
    id: "buy-5-pulls",
    name: "Buy 5 Pulls",
    description: "Add 25 energy (10% off)",
    cost: 140,
    currency: "coins",
    effect: "buy_energy",
    amount: 25
  },
  {
    id: "bonus-coins",
    name: "Daily Reward",
    description: "Get 100 coins (1x/day)",
    cost: 0,
    currency: "free",
    effect: "daily_bonus"
  }
];



let activeMinigameId = null;
let beatIntervalId = null;
let beatPosition = 0;
let beatDirection = 1;
let scrambleState = null;
let memoryState = null;
let memoryTimeoutId = null;

function renderShop() {
  UI.shopContent.innerHTML = "";
  
  SHOP_ITEMS.forEach(item => {
    const shopItem = document.createElement("div");
    shopItem.className = "shop-item";
    
    let buyBtn = `<button class="shop-button" onclick="buyItem('${item.id}')">buy</button>`;
    let costDisplay = `<div class="shop-cost">${item.cost} ${item.currency}</div>`;
    
    if (item.id === "bonus-coins") {
      const now = Date.now();
      const today = Math.floor(now / (24 * 60 * 60 * 1000));
      const lastDay = Math.floor(gameState.lastDailyBonus / (24 * 60 * 60 * 1000));
      
      if (today === lastDay) {
        buyBtn = '<button class="shop-button" disabled>claimed</button>';
        costDisplay = '<div class="shop-cost">back tomorrow</div>';
      }
    } else if (item.effect === "buy_energy" && gameState.energy >= CONFIG.MAX_ENERGY) {
      buyBtn = '<button class="shop-button" disabled>full</button>';
      costDisplay = '<div class="shop-cost">energy maxed</div>';
    } else {
      const hasEnough = gameState.coins >= item.cost;
      if (!hasEnough) {
        buyBtn = '<button class="shop-button" disabled>cant buy</button>';
      }
    }
    
    shopItem.innerHTML = `
      <div class="shop-name">${item.name}</div>
      <div class="shop-desc">${item.description}</div>
      ${costDisplay}
      ${buyBtn}
    `;
    
    UI.shopContent.appendChild(shopItem);
  });
}

function buyItem(itemId) {
  const item = SHOP_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  if (item.effect === "buy_energy" && gameState.energy >= CONFIG.MAX_ENERGY) {
    showNotification("energy already full");
    return;
  }
  
  if (item.currency === "coins" && gameState.coins < item.cost) {
    showNotification("not enough coins");
    return;
  }
  
  if (item.currency === "coins") gameState.coins -= item.cost;
  
  switch(item.effect) {
    case "buy_energy":
      gameState.energy = Math.min(gameState.energy + item.amount, CONFIG.MAX_ENERGY);
      showNotification(`bought ${item.amount} energy`);
      break;
    case "daily_bonus":
      gameState.coins += 100;
      gameState.lastDailyBonus = Date.now();
      showNotification("claimed 100 coins");
      break;
  }
  
  saveCurrencyData();
  updateCurrencyDisplay();
  renderShop();
}

function renderMinigameList() {
  UI.minigameList.innerHTML = "";

  MINIGAMES.forEach(game => {
    const btn = document.createElement("button");
    btn.className = `minigame-card ${activeMinigameId === game.id ? "active" : ""}`;
    btn.innerHTML = `
      <div class="minigame-name">${game.name}</div>
      <div class="minigame-desc">${game.description}</div>
      <div class="minigame-cost">cost: ${game.cost} energy</div>
    `;
    btn.addEventListener("click", () => selectMinigame(game.id));
    UI.minigameList.appendChild(btn);
  });
}

function selectMinigame(gameId) {
  cleanupMinigame();
  activeMinigameId = gameId;
  renderMinigameList();

  if (gameId === "beat-drop") {
    renderBeatDrop();
    return;
  }

  if (gameId === "lyric-scramble") {
    renderLyricScramble();
    return;
  }

  if (gameId === "memory-stage") {
    renderMemoryStage();
  }
}

function cleanupMinigame() {
  if (beatIntervalId) {
    clearInterval(beatIntervalId);
    beatIntervalId = null;
  }
  if (memoryTimeoutId) {
    clearTimeout(memoryTimeoutId);
    memoryTimeoutId = null;
  }
  scrambleState = null;
  memoryState = null;
}

function renderBeatDrop() {
  UI.minigamePlay.innerHTML = `
    <div class="minigame-title">beat drop</div>
    <div class="minigame-subtitle">stop the marker inside the spotlight zone to earn coins.</div>
    <div class="beat-meter">
      <div class="beat-target"></div>
      <div class="beat-indicator" id="beatIndicator"></div>
    </div>
    <div class="beat-actions">
      <button id="beatStartBtn">start</button>
      <button id="beatStopBtn" disabled>stop</button>
    </div>
    <div class="beat-result" id="beatResult">cost: 3 energy per round</div>
  `;

  const beatIndicator = document.getElementById("beatIndicator");
  const beatStartBtn = document.getElementById("beatStartBtn");
  const beatStopBtn = document.getElementById("beatStopBtn");
  const beatResult = document.getElementById("beatResult");

  beatPosition = 0;
  beatDirection = 1;
  beatIndicator.style.left = "0%";

  beatStartBtn.addEventListener("click", () => {
    if (beatIntervalId) return;
    const cost = MINIGAMES.find(game => game.id === "beat-drop").cost;
    if (gameState.energy < cost) {
      showNotification("not enough energy");
      return;
    }

    gameState.energy -= cost;
    gameState.energyDirty = true;
    saveCurrencyData();
    updateCurrencyDisplay();

    beatResult.textContent = "focus...";
    beatStartBtn.disabled = true;
    beatStopBtn.disabled = false;

    beatIntervalId = setInterval(() => {
      beatPosition += beatDirection * 1.6;
      if (beatPosition >= 100) {
        beatPosition = 100;
        beatDirection = -1;
      }
      if (beatPosition <= 0) {
        beatPosition = 0;
        beatDirection = 1;
      }
      beatIndicator.style.left = `${beatPosition}%`;
    }, 18);
  });

  beatStopBtn.addEventListener("click", () => {
    if (!beatIntervalId) return;
    clearInterval(beatIntervalId);
    beatIntervalId = null;
    beatStartBtn.disabled = false;
    beatStopBtn.disabled = true;

    const distance = Math.abs(beatPosition - 50);
    const reward = getBeatReward(distance);
    beatResult.textContent = `${reward.label} (+${reward.coins} coins)`;

    if (reward.coins > 0) {
      gameState.coins += reward.coins;
      saveCurrencyData();
      updateCurrencyDisplay();
    }
  });
}

function getBeatReward(distance) {
  if (distance <= 4) return { label: "perfect", coins: 30 };
  if (distance <= 10) return { label: "clean", coins: 18 };
  if (distance <= 18) return { label: "ok", coins: 8 };
  return { label: "miss", coins: 0 };
}

function renderLyricScramble() {
  UI.minigamePlay.innerHTML = `
    <div class="minigame-title">lyric scramble</div>
    <div class="minigame-subtitle">tap words to rebuild the line.</div>
    <div class="scramble-actions">
      <button id="scrambleStartBtn">start round</button>
      <button id="scrambleCheckBtn" disabled>check</button>
      <button id="scrambleResetBtn" disabled>reset</button>
      <button id="scrambleNewBtn" disabled>new line</button>
    </div>
    <div class="scramble-target" id="scrambleTarget">cost: 2 energy per round</div>
    <div class="scramble-word-bank" id="scrambleBank"></div>
    <div class="scramble-result" id="scrambleResult"></div>
  `;

  const scrambleStartBtn = document.getElementById("scrambleStartBtn");
  const scrambleCheckBtn = document.getElementById("scrambleCheckBtn");
  const scrambleResetBtn = document.getElementById("scrambleResetBtn");
  const scrambleNewBtn = document.getElementById("scrambleNewBtn");

  scrambleStartBtn.addEventListener("click", () => {
    startScrambleRound();
    scrambleCheckBtn.disabled = false;
    scrambleResetBtn.disabled = false;
    scrambleNewBtn.disabled = false;
  });

  scrambleCheckBtn.addEventListener("click", () => checkScrambleAnswer());
  scrambleResetBtn.addEventListener("click", () => resetScrambleAnswer());
  scrambleNewBtn.addEventListener("click", () => startScrambleRound());
}

function startScrambleRound() {
  const cost = MINIGAMES.find(game => game.id === "lyric-scramble").cost;
  if (gameState.energy < cost) {
    showNotification("not enough energy");
    return;
  }

  gameState.energy -= cost;
  gameState.energyDirty = true;
  saveCurrencyData();
  updateCurrencyDisplay();

  const phrase = SCRAMBLE_LINES[Math.floor(Math.random() * SCRAMBLE_LINES.length)];
  const words = phrase.split(" ");
  const shuffled = shuffleArray([...words]);

  scrambleState = {
    phrase,
    words,
    bank: shuffled,
    answer: [],
    solved: false
  };

  renderScrambleUI();
}

function renderScrambleUI() {
  const scrambleTarget = document.getElementById("scrambleTarget");
  const scrambleBank = document.getElementById("scrambleBank");
  const scrambleResult = document.getElementById("scrambleResult");

  scrambleTarget.innerHTML = "";
  scrambleBank.innerHTML = "";
  scrambleResult.textContent = "";

  scrambleState.answer.forEach((word, index) => {
    const wordBtn = document.createElement("button");
    wordBtn.className = "scramble-word";
    wordBtn.textContent = word;
    wordBtn.addEventListener("click", () => {
      scrambleState.answer.splice(index, 1);
      scrambleState.bank.push(word);
      renderScrambleUI();
    });
    scrambleTarget.appendChild(wordBtn);
  });

  if (scrambleState.answer.length === 0) {
    scrambleTarget.textContent = "build the line here";
  }

  scrambleState.bank.forEach((word, index) => {
    const wordBtn = document.createElement("button");
    wordBtn.className = "scramble-word bank";
    wordBtn.textContent = word;
    wordBtn.addEventListener("click", () => {
      scrambleState.bank.splice(index, 1);
      scrambleState.answer.push(word);
      renderScrambleUI();
    });
    scrambleBank.appendChild(wordBtn);
  });
}

function resetScrambleAnswer() {
  if (!scrambleState) return;
  scrambleState.bank = scrambleState.bank.concat(scrambleState.answer);
  scrambleState.answer = [];
  renderScrambleUI();
}

function checkScrambleAnswer() {
  if (!scrambleState || scrambleState.solved) return;

  const scrambleResult = document.getElementById("scrambleResult");
  const answerText = scrambleState.answer.join(" ");

  if (answerText === scrambleState.phrase) {
    scrambleState.solved = true;
    gameState.coins += 20;
    saveCurrencyData();
    updateCurrencyDisplay();
    scrambleResult.textContent = "clean line! +20 coins";
  } else {
    scrambleResult.textContent = "not quite. shuffle and try again";
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderMemoryStage() {
  UI.minigamePlay.innerHTML = `
    <div class="minigame-title">memory stage</div>
    <div class="minigame-subtitle">match all pairs.</div>
    <div class="memory-actions">
      <button id="memoryStartBtn">start round</button>
    </div>
    <div class="memory-status" id="memoryStatus">cost: 4 energy per round</div>
    <div class="memory-grid" id="memoryGrid"></div>
  `;

  const memoryStartBtn = document.getElementById("memoryStartBtn");
  memoryStartBtn.addEventListener("click", () => startMemoryRound());
}

function startMemoryRound() {
  const cost = MINIGAMES.find(game => game.id === "memory-stage").cost;
  if (gameState.energy < cost) {
    showNotification("not enough energy");
    return;
  }

  gameState.energy -= cost;
  gameState.energyDirty = true;
  saveCurrencyData();
  updateCurrencyDisplay();

  const selected = shuffleArray([...MEMORY_WORDS]).slice(0, 4);
  const deck = shuffleArray([...selected, ...selected]).map(value => ({
    value,
    matched: false
  }));

  memoryState = {
    deck,
    revealed: [],
    attempts: 0,
    locked: false
  };

  updateMemoryStatus("find all pairs");
  renderMemoryGrid();
}

function renderMemoryGrid() {
  const memoryGrid = document.getElementById("memoryGrid");
  if (!memoryGrid || !memoryState) return;

  memoryGrid.innerHTML = "";

  memoryState.deck.forEach((card, index) => {
    const button = document.createElement("button");
    button.className = "memory-card";

    const isRevealed = memoryState.revealed.includes(index) || card.matched;
    button.textContent = isRevealed ? card.value : "??";
    button.dataset.index = index;
    button.disabled = card.matched || memoryState.locked;

    if (card.matched) {
      button.classList.add("matched");
    }
    if (memoryState.revealed.includes(index)) {
      button.classList.add("revealed");
    }

    button.addEventListener("click", () => handleMemoryFlip(index));
    memoryGrid.appendChild(button);
  });
}

function handleMemoryFlip(index) {
  if (!memoryState || memoryState.locked) return;
  if (memoryState.revealed.includes(index)) return;
  if (memoryState.deck[index].matched) return;

  memoryState.revealed.push(index);
  renderMemoryGrid();

  if (memoryState.revealed.length < 2) return;

  const [first, second] = memoryState.revealed;
  const firstCard = memoryState.deck[first];
  const secondCard = memoryState.deck[second];
  memoryState.attempts += 1;

  if (firstCard.value === secondCard.value) {
    firstCard.matched = true;
    secondCard.matched = true;
    memoryState.revealed = [];
    updateMemoryStatus("pair found!");
    renderMemoryGrid();

    if (memoryState.deck.every(card => card.matched)) {
      const reward = Math.max(8, 30 - memoryState.attempts * 2);
      gameState.coins += reward;
      saveCurrencyData();
      updateCurrencyDisplay();
      updateMemoryStatus(`stage cleared! +${reward} coins`);
    }
    return;
  }

  memoryState.locked = true;
  updateMemoryStatus("no match, try again");
  renderMemoryGrid();

  memoryTimeoutId = setTimeout(() => {
    memoryState.revealed = [];
    memoryState.locked = false;
    renderMemoryGrid();
  }, 650);
}

function updateMemoryStatus(message) {
  const memoryStatus = document.getElementById("memoryStatus");
  if (!memoryStatus) return;
  memoryStatus.textContent = message;
}
