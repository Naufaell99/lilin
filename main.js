$(document).ready(function () {
  const flame = $("#flame");
  const txt = $("h1");
  const backBtn = $("#backBtn");
  const music = $("#bgMusic")[0];

  // === 🔊 AUTOPLAY FIX: mulai musik saat user interaksi pertama kali ===
  let musicStarted = false;

  const startMusic = () => {
    if (musicStarted) return;
    musicStarted = true;
    music.volume = 0;

    music.play().then(() => {
      console.log("Musik mulai 🎶");
      // Efek fade-in biar halus
      let volume = 0;
      const fade = setInterval(() => {
        if (volume < 1) {
          volume += 0.05;
          music.volume = volume;
        } else {
          clearInterval(fade);
        }
      }, 200);
    }).catch(err => {
      console.warn("Autoplay musik diblokir browser:", err);
    });
  };

  // Mulai musik ketika user pertama kali klik di halaman
  $(document).one("click", startMusic);

  // === 🔥 Event klik lilin ===
  flame.on("click", function () {
    startMusic(); // pastikan musik juga mulai kalau klik lilin

    flame.removeClass("burn").addClass("puff");
    $(".smoke").each(function () {
      $(this).addClass("puff-bubble");
    });
    $("#glow").remove();

    txt.hide()
      .html("Hihihihi... Selamat ulang tahun ya sayang 💕 udah berapa kali ucap ini wkwkwk 😚")
      .delay(750)
      .fadeIn(500);

    $("#candle").animate({ opacity: ".5" }, 1000);

    // Tampilkan tombol kembali setelah 2 detik
    setTimeout(() => backBtn.addClass("fade-in"), 2000);
  });
});

// 💫 Fungsi berhentiin musik & balik ke halaman awal
function stopMusicAndBack() {
  const music = document.getElementById("bgMusic");
  if (music && !music.paused) {
    const fadeOut = setInterval(() => {
      if (music.volume > 0.05) {
        music.volume -= 0.05;
      } else {
        clearInterval(fadeOut);
        music.pause();
        music.currentTime = 0;
        window.location.href = "https://naufaell99.github.io/hbdd-sayang-ku/";
      }
    }, 100);
  } else {
    window.location.href = "index.html";
  }
}
