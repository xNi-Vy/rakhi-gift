const GIFT_CODE = "Connection not secure! Please contact Vy.";

const codeEl = document.getElementById("giftCode");
const copyBtn = document.getElementById("copyBtn");
const tilesEl = document.getElementById("tiles");
const resetBtn = document.getElementById("resetTiles");

codeEl.textContent = GIFT_CODE;

// Copy logic for both button & clicking the code
function copyGiftCode() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(GIFT_CODE).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy code"), 1500);
    }).catch(() => alert("Copy failed. Please copy manually."));
  } else {
    const temp = document.createElement("textarea");
    temp.value = GIFT_CODE;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    alert("Code copied!");
  }
}
copyBtn.addEventListener("click", copyGiftCode);
codeEl.addEventListener("click", copyGiftCode);

// Scratch tiles
const COLS = 8, ROWS = 5;
let revealedCount = 0;
const totalTiles = COLS * ROWS;

for (let i = 0; i < totalTiles; i++) {
  const t = document.createElement("div");
  t.className = "tile";
  const reveal = () => {
    if (!t.classList.contains("revealed")) {
      t.classList.add("revealed");
      revealedCount++;
      // When 60% revealed, hide the grid completely
      if (revealedCount >= totalTiles * 0.6) {
        tilesEl.classList.add("hidden-all");
      }
    }
  };
  t.addEventListener("pointerenter", e => { if (e.buttons) reveal(); });
  t.addEventListener("pointerdown", reveal);
  tilesEl.appendChild(t);
}

// Reset button
resetBtn.addEventListener("click", () => {
  tilesEl.querySelectorAll(".tile").forEach(t => t.classList.remove("revealed"));
  tilesEl.classList.remove("hidden-all");
  revealedCount = 0;
});
