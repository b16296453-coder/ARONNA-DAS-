/* ============================================================
   ১) তারিখ ঠিক করুন (এখানে বদলালেই হবে)
   ফরম্যাট: বছর-মাস-দিনTঘণ্টা:মিনিট  (আপনার ডিভাইসের সময় অনুযায়ী)
   ২০২৬ সালের জন্য ধরা হয়েছে: মহালয়া ১০ অক্টোবর, ষষ্ঠী ১৬ অক্টোবর
   পঞ্জিকা দেখে তারিখ মিলিয়ে নিন।
   ============================================================ */
const MAHALAYA_DATE = "2026-10-10T04:00:00";
const SHASHTHI_DATE = "2026-10-16T00:00:00";

/* ============================================================
   ২) অনলাইনে কতজন আছে — Firebase দরকার (README দেখুন)
   Firebase না বসালে শুধু "১" দেখাবে।
   ============================================================ */
const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  appId: ""
};

/* ---------- বাংলা সংখ্যা ---------- */
const bn = n => String(n).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);

/* ---------- কাউন্টডাউন ---------- */
function diffParts(target){
  let ms = new Date(target) - new Date();
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
}

function tick(){
  const box = document.getElementById("mahalayaCountdown");
  const p = diffParts(MAHALAYA_DATE);
  if (p){
    for (const k in p) box.querySelector(`[data-u="${k}"]`).textContent = bn(p[k]);
  } else {
    document.querySelector(".big").textContent = "শুভ মহালয়া";
    box.style.display = "none";
  }

  const t = document.getElementById("shashthiText");
  const q = diffParts(SHASHTHI_DATE);
  if (q) t.textContent = `আর মাত্র ${bn(q.d)} দিন ${bn(q.h)} ঘণ্টা ${bn(q.m)} মিনিট ${bn(q.s)} সেকেন্ড`;
  else { document.querySelector(".sub").textContent = "শুভ ষষ্ঠী"; t.textContent = ""; }
}
tick();
setInterval(tick, 1000);

/* ---------- ঢাক ---------- */
const dhakBtn = document.getElementById("dhakBtn");
const dhakAudio = new Audio("dhak(1).mp3");
dhakAudio.preload = "auto";
dhakBtn.addEventListener("click", () => {
  dhakAudio.currentTime = 0;
  dhakAudio.play().catch(() => {});
  dhakBtn.classList.remove("hit");
  void dhakBtn.offsetWidth;
  dhakBtn.classList.add("hit");
});

/* ---------- গানের তালিকা ---------- */
let currentAudio = null, currentLi = null;
document.querySelectorAll("#songList li").forEach(li => {
  const btn = li.querySelector(".play");
  btn.addEventListener("click", () => {
    if (currentLi === li && currentAudio && !currentAudio.paused){
      currentAudio.pause();
      btn.textContent = "▶";
      li.classList.remove("playing");
      return;
    }
    if (currentAudio){
      currentAudio.pause();
      currentLi.querySelector(".play").textContent = "▶";
      currentLi.classList.remove("playing");
    }
    currentLi = li;
    currentAudio = new Audio(li.dataset.src);
    currentAudio.play().catch(() => {});
    btn.textContent = "⏸";
    li.classList.add("playing");
    currentAudio.addEventListener("ended", () => {
      btn.textContent = "▶";
      li.classList.remove("playing");
    });
  });
});

/* ---------- অনলাইন সংখ্যা ---------- */
(function presence(){
  const el = document.getElementById("onlineCount");
  if (!FIREBASE_CONFIG.databaseURL || typeof firebase === "undefined") { el.textContent = bn(1); return; }
  firebase.initializeApp(FIREBASE_CONFIG);
  const db = firebase.database();
  const list = db.ref("online");
  db.ref(".info/connected").on("value", snap => {
    if (snap.val() !== true) return;
    const me = list.push();
    me.onDisconnect().remove();
    me.set(true);
  });
  list.on("value", snap => { el.textContent = bn(snap.numChildren()); });
})();
