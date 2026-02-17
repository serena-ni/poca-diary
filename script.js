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
const pullCountEl = document.getElementById("pullCount");
const rarityStreakEl = document.getElementById("rarityStreak");

let collection = JSON.parse(localStorage.getItem("pocaCollection")) || [];
let currentPage = 0;
let pullCount = parseInt(localStorage.getItem("pullCount")) || 0;
let lastRarity = null;
let isPulling = false;

pullBtn.addEventListener("click", pullCard);
openDiaryBtn.addEventListener("click", () => {
  diaryWindow.classList.remove("hidden");
  updateDiary();
});
closeDiaryBtn.addEventListener("click", () => diaryWindow.classList.add("hidden"));
prevPageBtn.addEventListener("click", () => flipPage(-1));
nextPageBtn.addEventListener("click", () => flipPage(1));

pullCountEl.textContent = `pulls: ${pullCount}`;

function pullCard() {
  if (isPulling) return; // prevent spam clicking
  isPulling = true;
  pullBtn.disabled = true;
  
  const randomIdol = idolDatabase[Math.floor(Math.random() * idolDatabase.length)];
  
  pullCount++;
  localStorage.setItem("pullCount", pullCount);
  pullCountEl.textContent = `pulls: ${pullCount}`;
  
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
  if (roll <= 0.995) return "fancam";
  return "legendary";
}

function displayCard(idol) {
  card.classList.remove("hidden");
  card.classList.remove("loading");
  card.classList.add("bounce");
  
  // Remove any existing rarity classes
  card.classList.remove("rarity-common", "rarity-rare", "rarity-holographic", "rarity-fancam", "rarity-legendary");
  
  setTimeout(() => card.classList.remove("bounce"), 500);

  // Display stage name on top, real name below
  idolName.textContent = idol.stageName;
  
  // Format birthday nicely
  const birthDate = new Date(idol.birthday);
  const formattedBirthday = birthDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  idolDesc.innerHTML = `<div style="line-height: 1.6;">${idol.realName}<br>group: ${idol.group}<br>born: ${formattedBirthday}</div>`;

  const rarity = rollRarity();
  rarityText.textContent = rarity;
  
  card.classList.add(`rarity-${rarity}`);
  
  if (rarity === 'legendary' || rarity === 'fancam') {
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
  idolImage.src = idol.image;
  idolImage.alt = idol.stageName;
  
  idolImage.onerror = function() {
    imageSection.style.background = `linear-gradient(135deg, ${idol.color} 0%, ${idol.color}dd 100%)`;
    imageSection.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; font-size: 48px; color: white; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); padding: 20px; text-align: center;">${idol.stageName}</div>`;
  };
  
  idolImage.onload = function() {
    if (imageSection.style.background) {
      imageSection.style.background = '';
      imageSection.innerHTML = `<img id="idolImage" alt="${idol.stageName}" src="${idol.image}">`;
    }
  };

  const spotifyLink = document.getElementById("spotifyLink");
  spotifyLink.href = `https://open.spotify.com/search/${encodeURIComponent(idol.stageName + " " + idol.group)}`;
  spotifyLink.classList.remove("hidden");

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
    'legendary': '★★★ legendary pull! ★★★',
    'fancam': '☆ fancam! super rare! ☆'
  };
  
  rarityStreakEl.textContent = messages[rarity] || '';
  rarityStreakEl.classList.remove('hidden');
  
  setTimeout(() => {
    rarityStreakEl.classList.add('hidden');
  }, 3000);
}

function updateDiary() {
  const perPage = 2; 
  const uniqueIdols = new Map();
  const rarityOrder = ['legendary', 'fancam', 'holographic', 'rare', 'common'];
  
  collection.forEach(item => {
    const [title, rarity] = item.split("_");
    if (!uniqueIdols.has(title)) {
      uniqueIdols.set(title, { title, rarity });
    } else {
      const current = uniqueIdols.get(title);
      if (rarityOrder.indexOf(rarity) < rarityOrder.indexOf(current.rarity)) {
        uniqueIdols.set(title, { title, rarity });
      }
    }
  });
  
  const uniqueCards = Array.from(uniqueIdols.values());
  const totalPages = Math.ceil(uniqueCards.length / perPage) || 1;
  
  if (currentPage >= totalPages) {
    currentPage = totalPages - 1;
  }
  
  const start = currentPage * perPage;
  const end = start + perPage;
  const pageItems = uniqueCards.slice(start, end);

  pageLeft.innerHTML = "";
  pageRight.innerHTML = "";

  collectionCount.textContent = `collection: ${uniqueCards.length}/${idolDatabase.length}`;
  pageIndicator.textContent = `page ${currentPage + 1}/${totalPages}`;

  pageItems.forEach((item, i) => {
    const { title, rarity } = item;
    const idol = idolDatabase.find(idol => idol.stageName === title);
    
    const cardSlot = document.createElement("div");
    cardSlot.className = `poca-slot poca-slot-full slot-${rarity}`;
    
    const img = document.createElement("img");
    img.alt = title;
    
    if (idol && idol.image) {
      img.src = idol.image;
      img.onerror = function() {
        this.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.style.cssText = `width: 100%; height: 200px; background: linear-gradient(135deg, ${idol.color} 0%, ${idol.color}dd 100%); display: flex; align-items: center; justify-content: center; font-size: 24px; color: white; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);`;
        fallback.textContent = idol.stageName;
        this.parentNode.insertBefore(fallback, this);
      };
    }
    
    const info = document.createElement("div");
    info.className = "poca-info";
    
    const birthDate = new Date(idol.birthday);
    const formattedBirthday = birthDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    info.innerHTML = `<strong>${title}</strong><br><span class="idol-real-name">${idol.realName}</span><br><span class="mini-rarity">${rarity}</span><br><span class="idol-details">${idol.group} • ${formattedBirthday}</span>`;
    
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
  const totalPages = Math.ceil(uniqueIdols.size / 4) || 1;
  
  currentPage = (currentPage + direction + totalPages) % totalPages;
  
  const pages = document.querySelector('.pages');
  pages.classList.add('flipping');
  setTimeout(() => pages.classList.remove('flipping'), 400);
  
  updateDiary();
}
