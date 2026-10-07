শালিখা সার্বজনীন দুর্গা মন্দির - ওয়েবসাইট
============================================

ফোল্ডারে এই ফাইলগুলো একসাথে রাখুন:
  index.html, style.css, script.js
  dhak(1).mp3, 1.mp3, 2.mp3   <-- আপনার নিজের mp3 ফাইলগুলো এখানে রাখুন

GitHub Pages-এ দেওয়ার নিয়ম:
  1. GitHub-এ নতুন repository খুলুন
  2. সব ফাইল upload করুন
  3. Settings > Pages > Branch: main > Save
  4. কিছুক্ষণ পর লিংক পাবেন

তারিখ বদলাতে: script.js এর একদম উপরে MAHALAYA_DATE ও SHASHTHI_DATE

অনলাইনে কতজন আছে দেখানোর জন্য (বিনামূল্যে Firebase):
  1. console.firebase.google.com এ নতুন project খুলুন
  2. Build > Realtime Database > Create database (test mode)
  3. Project settings > Your apps > Web app (</>) যোগ করুন
  4. যে firebaseConfig দেখাবে তা script.js এর FIREBASE_CONFIG এ বসান
  5. Realtime Database > Rules এ এটি বসান:
     { "rules": { "online": { ".read": true, ".write": true } } }
