// ষষ্ঠী: ১৬ অক্টোবর ২০২৬, বাংলাদেশ সময়
const target = new Date("2026-10-16T00:00:00+06:00");

const bn = n => String(n).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);

function updateCountdown() {
  const now = new Date();
  let diff = target - now;
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor(diff / 1000) % 60;

  document.getElementById("days").textContent = bn(days);
  document.getElementById("hours").textContent = bn(hours);
  document.getElementById("minutes").textContent = bn(minutes);
  document.getElementById("seconds").textContent = bn(seconds);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ঢাক: একই বোতামে play/pause
const dhakBtn = document.getElementById("dhakBtn");
const dhakAudio = document.getElementById("dhakAudio");
dhakBtn.addEventListener("click", async () => {
  if (dhakAudio.paused) {
    try { await dhakAudio.play(); dhakBtn.lastElementChild.textContent = "ঢাক বন্ধ করুন"; }
    catch (e) { alert("ঢাকের অডিও চালু করা যাচ্ছে না। audio ফোল্ডারে dhak(1).mp3 আছে কি না দেখুন।"); }
  } else {
    dhakAudio.pause();
    dhakAudio.currentTime = 0;
    dhakBtn.lastElementChild.textContent = "ঢাক বাজান";
  }
});
dhakAudio.addEventListener("ended", () => {
  dhakBtn.lastElementChild.textContent = "ঢাক বাজান";
});

// গানগুলোর জন্য একবারে একটি গান বাজবে
document.querySelectorAll(".play-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const current = document.getElementById(btn.dataset.audio);
    document.querySelectorAll(".song-card audio").forEach(a => {
      if (a !== current) { a.pause(); a.currentTime = 0; }
    });
    document.querySelectorAll(".play-btn").forEach(b => b.textContent = "▶");

    if (current.paused) {
      try { await current.play(); btn.textContent = "⏸"; }
      catch (e) { alert("গানটি চালু করা যাচ্ছে না। audio ফোল্ডারের ফাইলগুলো ঠিক আছে কি না দেখুন।"); }
    } else {
      current.pause();
      btn.textContent = "▶";
    }
  });
});
document.querySelectorAll(".song-card audio").forEach(audio => {
  audio.addEventListener("ended", () => {
    const b = document.querySelector(`[data-audio="${audio.id}"]`);
    if (b) b.textContent = "▶";
  });
});

// GitHub Pages-এ কোনো backend না থাকায় এটি local/browser visitor counter.
// একই ব্রাউজারে reload করলেও সংখ্যা ধরে রাখে।
const key = "mahalaya_site_visitors";
let count = Number(localStorage.getItem(key) || 0);
if (!sessionStorage.getItem("counted")) {
  count += 1;
  localStorage.setItem(key, count);
  sessionStorage.setItem("counted", "1");
}
document.getElementById("visitorCount").textContent = bn(count);
