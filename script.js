// --- config your gift code here ---
const GIFT_CODE = "RKHI-2K25-ABCD-9876"; // put your real code

const codeEl = document.getElementById("giftCode");
const tilesEl = document.getElementById("tiles");
const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetTiles");
const howto = document.getElementById("howto");
const about = document.getElementById("about");
const closeAbout = document.getElementById("closeAbout");

codeEl.textContent = GIFT_CODE;

// build scratch-ish tiles (no canvas)
const COLS = 8, ROWS = 5;
for (let i = 0; i < COLS * ROWS; i++) {
  const t = document.createElement("div");
  t.className = "tile";
  // reveal on hover/drag/click
  const reveal = () => t.classList.add("revealed");
  t.addEventListener("pointerenter", (e) => { if (e.buttons) reveal(); });
  t.addEventListener("pointerdown", reveal);
  tilesEl.appendChild(t);
}

copyBtn.addEventListener("click", () => {
  const text = GIFT_CODE;
  
  // Fallback for older browsers
  if (!navigator.clipboard) {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    alert("Code copied!");
    return;
  }

  // Modern method
  navigator.clipboard.writeText(text)
    .then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => copyBtn.textContent = "Copy code", 1500);
    })
    .catch(() => {
      alert("Copy failed. Please copy manually: " + text);
    });
});


resetBtn.addEventListener("click", () => {
  tilesEl.querySelectorAll(".tile").forEach(t => t.classList.remove("revealed"));
});

howto.addEventListener("click", (e) => {
  e.preventDefault();
  about.showModal();
});
closeAbout.addEventListener("click", () => about.close());
