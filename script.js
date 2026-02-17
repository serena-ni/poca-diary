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

const energyDisplay = document.getElementById("energyDisplay");
const coinDisplay = document.getElementById("coinDisplay");

// ═══════════════════════════════════════════════════════════════
// GAME STATE
// ═══════════════════════════════════════════════════════════════
let collection = JSON.parse(localStorage.getItem("pocaCollection")) || [];
let currentPage = 0;
let pullCount = parseInt(localStorage.getItem("pullCount")) || 0;
let lastRarity = null;
let isPulling = false;

// Currency state
let energy = parseInt(localStorage.getItem("energy")) || 50;
let maxEnergy = 50;
let coins = parseInt(localStorage.getItem("coins")) || 0;
let lastEnergyTime = parseInt(localStorage.getItem("lastEnergyTime")) || Date.now();

// Achievements
let completedAchievements = JSON.parse(localStorage.getItem("completedAchievements")) || [];

const ENERGY_COST = 5;
const ENERGY_REGEN_TIME = 30000; // 30 seconds per point
const DIARY_PER_PAGE = 2;

const STAGE_NAME_ALIASES = {
  "tomorrow by together": "TXT",
  "soo-bin": "Soobin",
  "soobin": "Soobin",
  "hueningkai": "Huening Kai",
  "huening kai": "Huening Kai",
  "winwin": "Winwin"
};

// ═══════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════
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
// ═══════════════════════════════════════════════════════════════
// CURRENCY & ACHIEVEMENT SYSTEM
// ═══════════════════════════════════════════════════════════════

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
  
  // Check collection achievements
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
  
  // Award currency
  coins += quest.reward.coins || 0;
  saveCurrencyData();
  updateCurrencyDisplay();
  
  // Show notification
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

function renderShop() {
  shopContent.innerHTML = "";
  
  SHOP_ITEMS.forEach(item => {
    const shopItem = document.createElement("div");
    shopItem.className = "shop-item";
    
    let buyBtn = `<button class="shop-button" onclick="buyItem('${item.id}')">buy</button>`;
    let costDisplay = `<div class="shop-cost">${item.cost} ${item.currency}</div>`;
    
    // Disable if not enough currency or daily cooldown
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
  
  // Check currency
  if (item.currency === "coins" && coins < item.cost) {
    showNotification("not enough coins");
    return;
  }
  
  // Deduct cost
  if (item.currency === "coins") coins -= item.cost;
  
  // Apply effect
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
