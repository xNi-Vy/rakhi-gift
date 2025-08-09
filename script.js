const GIFT_CODE = "Code Redeemed.";

const codeEl = document.getElementById("giftCode");
const copyBtn = document.getElementById("copyBtn");
const tilesEl = document.getElementById("tiles");
const resetBtn = document.getElementById("resetTiles");

codeEl.textContent = "XXXX-XXXX-XXXX";  // show mask first

// Copy logic for both button & clicking the code
function copyGiftCode() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(GIFT_CODE).then(() => {
      copyBtn.textContent = "Code Redeemed. Nothing to Copy.";
      setTimeout(() => (copyBtn.textContent = "Copy code"), 1500);
    }).catch(() => alert("Code Redeemed. Nothing to Copy."));
  } else {
    const temp = document.createElement("textarea");
    temp.value = GIFT_CODE;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    alert("Code Redeemed. Nothing to Copy.");
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
        codeEl.textContent = GIFT_CODE;
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
