const idolPages = [
  "Yeonjun",
  "Soobin",
  "Beomgyu",
  "Taehyun_(TXT)",
  "Huening_Kai",
  "Mark_Lee_(rapper)",
  "Haechan",
  "Jeno",
  "Jaemin",
  "Chenle",
  "Jisung_(singer,_born_2002)"
];

const pullBtn = document.getElementById("pullBtn");
const card = document.getElementById("card");
const idolImage = document.getElementById("idolImage");
const idolName = document.getElementById("idolName");
const idolDesc = document.getElementById("idolDesc");
const rarityText = document.getElementById("rarity");
const newBadge = document.getElementById("newBadge");

let collection = JSON.parse(localStorage.getItem("pocaCollection")) || [];

pullBtn.addEventListener("click", pullCard);

function pullCard() {
  const randomPage = idolPages[Math.floor(Math.random() * idolPages.length)];
  fetchIdol(randomPage);
}

async function fetchIdol(pageName) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${pageName}`
    );
    const data = await response.json();
    displayCard(data);
  } catch (error) {
    console.error(error);
  }
}

function rollRarity() {
  const roll = Math.random();
  if (roll <= 0.7) return "standard";
  if (roll <= 0.9) return "concept";
  if (roll <= 0.97) return "holo";
  if (roll <= 0.995) return "broadcast";
  return "limited";
}

function displayCard(data) {
  card.classList.remove("hidden");

  idolName.textContent = data.title;
  idolDesc.textContent = data.description || "kpop artist";

  const rarity = rollRarity();
  rarityText.textContent = rarity;

  const cardID = data.title + "_" + rarity;

  if (collection.includes(cardID)) {
    newBadge.classList.add("hidden");
  } else {
    newBadge.classList.remove("hidden");
    collection.push(cardID);
    localStorage.setItem("pocaCollection", JSON.stringify(collection));
  }

  if (data.thumbnail && data.thumbnail.source) {
    idolImage.src = data.thumbnail.source;
  } else {
    idolImage.src = "";
  }
}
