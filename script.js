const pullBtn = document.getElementById("pullBtn");
const card = document.getElementById("card");
const idolImage = document.getElementById("idolImage");
const idolName = document.getElementById("idolName");
const idolDesc = document.getElementById("idolDesc");
const rarityText = document.getElementById("rarity");
const newBadge = document.getElementById("newBadge");

const openDiaryBtn = document.getElementById("openDiaryBtn");
const diaryWindow = document.getElementById("diaryWindow");
const pageLeft = document.getElementById("pageLeft");
const pageRight = document.getElementById("pageRight");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const closeDiaryBtn = document.getElementById("closeDiaryBtn");
const collectionCount = document.getElementById("collectionCount");
const pageIndicator = document.getElementById("pageIndicator");

const openQuestsBtn = document.getElementById("openQuestsBtn");
const openShopBtn = document.getElementById("openShopBtn");
const questWindow = document.getElementById("questWindow");
const shopWindow = document.getElementById("shopWindow");
const closeQuestsBtn = document.getElementById("closeQuestsBtn");
const closeShopBtn = document.getElementById("closeShopBtn");
const questContent = document.getElementById("questContent");
const shopContent = document.getElementById("shopContent");
const questNotification = document.getElementById("questNotification");
const rarityStreakEl = document.getElementById("rarityStreak");

const openMinigamesBtn = document.getElementById("openMinigamesBtn");
const minigameWindow = document.getElementById("minigameWindow");
const closeMinigamesBtn = document.getElementById("closeMinigamesBtn");
const minigameList = document.getElementById("minigameList");
const minigamePlay = document.getElementById("minigamePlay");

const energyDisplay = document.getElementById("energyDisplay");
const coinDisplay = document.getElementById("coinDisplay");

let collection = JSON.parse(localStorage.getItem("pocaCollection")) || [];
let currentPage = 0;
let pullCount = parseInt(localStorage.getItem("pullCount")) || 0;
let lastRarity = null;
let isPulling = false;

let energy = parseInt(localStorage.getItem("energy")) || 50;
let maxEnergy = 50;
let coins = parseInt(localStorage.getItem("coins")) || 0;
let lastEnergyTime = parseInt(localStorage.getItem("lastEnergyTime")) || Date.now();

let completedAchievements = JSON.parse(localStorage.getItem("completedAchievements")) || [];

const ENERGY_COST = 5;
const ENERGY_REGEN_TIME = 30000;
const DIARY_PER_PAGE = 2;

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

pullBtn.addEventListener("click", pullCard);
openDiaryBtn.addEventListener("click", () => {
  diaryWindow.classList.remove("hidden");
  updateDiary();
});
closeDiaryBtn.addEventListener("click", () => diaryWindow.classList.add("hidden"));
prevPageBtn.addEventListener("click", () => flipPage(-1));
nextPageBtn.addEventListener("click", () => flipPage(1));

openQuestsBtn.addEventListener("click", () => {
  questWindow.classList.remove("hidden");
  renderQuests();
});
closeQuestsBtn.addEventListener("click", () => questWindow.classList.add("hidden"));

openShopBtn.addEventListener("click", () => {
  shopWindow.classList.remove("hidden");
  renderShop();
});
closeShopBtn.addEventListener("click", () => shopWindow.classList.add("hidden"));

openMinigamesBtn.addEventListener("click", () => {
  minigameWindow.classList.remove("hidden");
  renderMinigameList();
  selectMinigame(activeMinigameId || MINIGAMES[0].id);
});
closeMinigamesBtn.addEventListener("click", () => {
  cleanupMinigame();
  minigameWindow.classList.add("hidden");
});

updateCurrencyDisplay();
updateEnergyRegen();
setInterval(updateEnergyRegen, 1000);

function pullCard() {
  if (isPulling) return;
  if (energy < ENERGY_COST) {
    showNotification("not enough energy! " + Math.ceil((ENERGY_COST - energy) * 30) + "s");
    return;
  }
  
  isPulling = true;
  pullBtn.disabled = true;
  
  energy -= ENERGY_COST;
  lastEnergyTime = Date.now();
  saveCurrencyData();
  updateCurrencyDisplay();
  
  const randomIdol = idolDatabase[Math.floor(Math.random() * idolDatabase.length)];
  
  pullCount++;
  localStorage.setItem("pullCount", pullCount);
  
  card.classList.remove("hidden");
  card.classList.add("loading");
  idolName.textContent = "opening...";
  idolDesc.textContent = "";
  rarityText.textContent = "";
  idolImage.src = "";
  newBadge.classList.add("hidden");
  document.getElementById("spotifyLink").classList.add("hidden");
  
  setTimeout(() => displayCard(randomIdol), 800);
}

function rollRarity() {
  const roll = Math.random();
  if (roll <= 0.7) return "common";
  if (roll <= 0.9) return "rare";
  if (roll <= 0.97) return "holographic";
  return "legendary";
}

function displayCard(idol) {
  card.classList.remove("hidden");
  card.classList.remove("loading");
  card.classList.add("bounce");
  
  card.classList.remove("rarity-common", "rarity-rare", "rarity-holographic", "rarity-legendary");
  
  setTimeout(() => card.classList.remove("bounce"), 500);

  idolName.textContent = idol.stageName;
  
  const birthDate = new Date(idol.birthday);
  const formattedBirthday = birthDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  idolDesc.innerHTML = `<div style="line-height: 1.6;">${idol.realName}<br>group: ${idol.group}<br>born: ${formattedBirthday}</div>`;

  let rarity = rollRarity();
  rarityText.textContent = rarity;
  card.classList.add(`rarity-${rarity}`);
  
  if (rarity === 'legendary') {
    showRarityMessage(rarity);
  }
  
  lastRarity = rarity;

  const cardID = idol.stageName + "_" + rarity;

  if (!collection.includes(cardID)) {
    newBadge.classList.remove("hidden");
    collection.push(cardID);
    localStorage.setItem("pocaCollection", JSON.stringify(collection));
    createConfetti();
  } else {
    newBadge.classList.add("hidden");
  }

  const imageSection = card.querySelector('.card-image-section');
  idolImage.src = "";
  idolImage.alt = idol.stageName;
  idolImage.style.display = "none";

  imageSection.style.background = `linear-gradient(135deg, ${idol.color} 0%, ${idol.color}dd 100%)`;

  let fallbackName = imageSection.querySelector('.card-fallback-name');
  if (!fallbackName) {
    fallbackName = document.createElement('div');
    fallbackName.className = 'card-fallback-name';
    imageSection.appendChild(fallbackName);
  }

  fallbackName.textContent = idol.stageName;

  const spotifyLink = document.getElementById("spotifyLink");
  spotifyLink.href = `https://open.spotify.com/search/${encodeURIComponent(idol.stageName + " " + idol.group)}`;
  spotifyLink.classList.remove("hidden");

  checkAchievements(rarity, idol);
  
  updateDiary();
  
  isPulling = false;
  pullBtn.disabled = false;
}

function createConfetti() {
  const colors = ['#ff4d6d', '#5aa9ff', '#ffd6f5', '#ffb347', '#1DB954'];
  for (let i = 0; i < 20; i++) {
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

  if (!rarityStreakEl) {
    return;
  }

  rarityStreakEl.textContent = messages[rarity] || '';
  rarityStreakEl.classList.remove('hidden');

  setTimeout(() => {
    rarityStreakEl.classList.add('hidden');
  }, 3000);
}

function normalizeStageName(rawName) {
  if (!rawName) return rawName;
  const key = rawName.trim().toLowerCase();
  return STAGE_NAME_ALIASES[key] || rawName.trim();
}

function updateDiary() {
  const uniqueIdols = new Map();
  const rarityOrder = ['legendary', 'holographic', 'rare', 'common'];

  collection.forEach(item => {
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
  const totalPages = Math.ceil(uniqueCards.length / DIARY_PER_PAGE) || 1;
  
  if (currentPage >= totalPages) {
    currentPage = totalPages - 1;
  }
  
  const start = currentPage * DIARY_PER_PAGE;
  const end = start + DIARY_PER_PAGE;
  const pageItems = uniqueCards.slice(start, end);

  pageLeft.innerHTML = "";
  pageRight.innerHTML = "";

  collectionCount.textContent = `collection: ${uniqueCards.length}/${idolDatabase.length}`;
  pageIndicator.textContent = `page ${currentPage + 1}/${totalPages}`;

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
    
    const container = i === 0 ? pageLeft : pageRight;
    container.appendChild(cardSlot);
  });

  if (uniqueCards.length === 0) {
    pageLeft.innerHTML = '<div class="empty-diary">pull some cards<br>to fill your diary!</div>';
  }
}

function flipPage(direction) {
  const uniqueIdols = new Set(collection.map(item => item.split("_")[0]));
  const totalPages = Math.ceil(uniqueIdols.size / DIARY_PER_PAGE) || 1;
  
  currentPage = (currentPage + direction + totalPages) % totalPages;
  
  const pages = document.querySelector('.pages');
  pages.classList.add('flipping');
  setTimeout(() => pages.classList.remove('flipping'), 400);
  
  updateDiary();
}

function updateCurrencyDisplay() {
  energyDisplay.textContent = `energy: ${energy}/${maxEnergy}`;
  coinDisplay.textContent = `coins: ${coins}`;
}

function saveCurrencyData() {
  localStorage.setItem("energy", energy);
  localStorage.setItem("coins", coins);
  localStorage.setItem("lastEnergyTime", lastEnergyTime);
}

function updateEnergyRegen() {
  const currentTime = Date.now();
  const timeDelta = currentTime - lastEnergyTime;
  const energyGain = Math.floor(timeDelta / ENERGY_REGEN_TIME);
  
  if (energyGain > 0 && energy < maxEnergy) {
    energy = Math.min(energy + energyGain, maxEnergy);
    lastEnergyTime = currentTime;
    saveCurrencyData();
    updateCurrencyDisplay();
  }
}

function isIdolInQuestGroup(member, quest) {
  if (quest.subunit) {
    const subunits = Array.isArray(member.subunit) ? member.subunit : [member.subunit];
    return subunits.includes(quest.subunit);
  }
  return member.group === quest.group;
}

function checkAchievements(rarity, idol) {
  // Check milestone achievements
  const completedMilestones = QUESTS.filter(q => 
    q.type === "milestone" && !completedAchievements.includes(q.id)
  );
  
  completedMilestones.forEach(quest => {
    if (pullCount >= quest.target) {
      completeAchievement(quest);
    }
  });
  
  // Check rarity achievements
  const completedRarities = QUESTS.filter(q => 
    q.type === "rarity" && !completedAchievements.includes(q.id)
  );
  
  completedRarities.forEach(quest => {
    if (rarity === quest.rarity) {
      completeAchievement(quest);
    }
  });
  
  const completedCollections = QUESTS.filter(q => 
    q.type === "collection" && !completedAchievements.includes(q.id)
  );
  
  completedCollections.forEach(quest => {
    const groupMembers = idolDatabase.filter(member => isIdolInQuestGroup(member, quest));
    const collectedMembers = groupMembers.filter(member => 
      collection.some(card => card.startsWith(member.stageName))
    );
    if (collectedMembers.length === groupMembers.length) {
      completeAchievement(quest);
    }
  });
  
  // Check special achievements
  const luckyQuest = QUESTS.find(q => q.id === "lucky-7" && !completedAchievements.includes(q.id));
  if (luckyQuest && pullCount === 7) {
    completeAchievement(luckyQuest);
  }
}

function completeAchievement(quest) {
  completedAchievements.push(quest.id);
  localStorage.setItem("completedAchievements", JSON.stringify(completedAchievements));
  
  coins += quest.reward.coins || 0;
  saveCurrencyData();
  updateCurrencyDisplay();
  
  showNotification(`${quest.title}! +${quest.reward.coins || 0} coins`);
}

function showNotification(message) {
  questNotification.textContent = message;
  questNotification.style.opacity = "1";
  
  setTimeout(() => {
    questNotification.style.opacity = "0";
  }, 4000);
}

function renderQuests() {
  questContent.innerHTML = "";
  
  QUESTS.forEach(quest => {
    const isCompleted = completedAchievements.includes(quest.id);
    const questEl = document.createElement("div");
    questEl.className = `quest-item ${isCompleted ? "completed" : ""}`;
    
    let progress = "";
    if (quest.type === "milestone") {
      const current = Math.min(pullCount, quest.target);
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
    
    questContent.appendChild(questEl);
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

let lastDailyBonus = localStorage.getItem("lastDailyBonus") || 0;

let activeMinigameId = null;
let beatIntervalId = null;
let beatPosition = 0;
let beatDirection = 1;
let scrambleState = null;
let memoryState = null;
let memoryTimeoutId = null;

function renderShop() {
  shopContent.innerHTML = "";
  
  SHOP_ITEMS.forEach(item => {
    const shopItem = document.createElement("div");
    shopItem.className = "shop-item";
    
    let buyBtn = `<button class="shop-button" onclick="buyItem('${item.id}')">buy</button>`;
    let costDisplay = `<div class="shop-cost">${item.cost} ${item.currency}</div>`;
    
    if (item.id === "bonus-coins") {
      const now = Date.now();
      const today = Math.floor(now / (24 * 60 * 60 * 1000));
      const lastDay = Math.floor(lastDailyBonus / (24 * 60 * 60 * 1000));
      
      if (today === lastDay) {
        buyBtn = '<button class="shop-button" disabled>claimed</button>';
        costDisplay = '<div class="shop-cost">back tomorrow</div>';
      }
    } else if (item.effect === "buy_energy" && energy >= maxEnergy) {
      buyBtn = '<button class="shop-button" disabled>full</button>';
      costDisplay = '<div class="shop-cost">energy maxed</div>';
    } else {
      const hasEnough = coins >= item.cost;
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
    
    shopContent.appendChild(shopItem);
  });
}

function buyItem(itemId) {
  const item = SHOP_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  if (item.effect === "buy_energy" && energy >= maxEnergy) {
    showNotification("energy already full");
    return;
  }
  
  if (item.currency === "coins" && coins < item.cost) {
    showNotification("not enough coins");
    return;
  }
  
  if (item.currency === "coins") coins -= item.cost;
  
  switch(item.effect) {
    case "buy_energy":
      energy = Math.min(energy + item.amount, maxEnergy);
      showNotification(`bought ${item.amount} energy`);
      break;
    case "daily_bonus":
      coins += 100;
      lastDailyBonus = Date.now();
      localStorage.setItem("lastDailyBonus", lastDailyBonus);
      showNotification("claimed 100 coins");
      break;
  }
  
  saveCurrencyData();
  updateCurrencyDisplay();
  renderShop();
}

function renderMinigameList() {
  minigameList.innerHTML = "";

  MINIGAMES.forEach(game => {
    const btn = document.createElement("button");
    btn.className = `minigame-card ${activeMinigameId === game.id ? "active" : ""}`;
    btn.innerHTML = `
      <div class="minigame-name">${game.name}</div>
      <div class="minigame-desc">${game.description}</div>
      <div class="minigame-cost">cost: ${game.cost} energy</div>
    `;
    btn.addEventListener("click", () => selectMinigame(game.id));
    minigameList.appendChild(btn);
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
  minigamePlay.innerHTML = `
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
    if (energy < cost) {
      showNotification("not enough energy");
      return;
    }

    energy -= cost;
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
      coins += reward.coins;
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
  minigamePlay.innerHTML = `
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
  if (energy < cost) {
    showNotification("not enough energy");
    return;
  }

  energy -= cost;
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
    coins += 20;
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
  minigamePlay.innerHTML = `
    <div class="minigame-title">memory stage</div>
    <div class="minigame-subtitle">match all pairs before the crowd fades.</div>
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
  if (energy < cost) {
    showNotification("not enough energy");
    return;
  }

  energy -= cost;
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
      coins += reward;
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
