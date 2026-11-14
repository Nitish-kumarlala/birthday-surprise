const ids = [
  "welcome",
  "cake",
  "balloons",
  "memories",
  "bouquet",
  "letter"
];

const screens = [
  ...document.querySelectorAll(".screen")
];

const bar = document.getElementById("bar");


/* -----------------------------
   PAGE NAVIGATION
----------------------------- */

function go(id) {

  screens.forEach(screen => {
    screen.classList.toggle(
      "active",
      screen.id === id
    );
  });

  const index = ids.indexOf(id);

  bar.style.width =
    ((index + 1) / ids.length * 100) + "%";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* -----------------------------
   YES / NO
----------------------------- */

const noButton =
  document.getElementById("no");

const noText =
  document.getElementById("noText");


function moveNo() {

  noButton.style.position = "fixed";

  noButton.style.left =
    (8 + Math.random() * 75) + "vw";

  noButton.style.top =
    (15 + Math.random() * 70) + "vh";

  noText.textContent =
    "Nice try 😌 The NO button is running away!";
}


noButton.addEventListener(
  "mouseenter",
  moveNo
);

noButton.addEventListener(
  "touchstart",
  event => {
    event.preventDefault();
    moveNo();
  }
);

noButton.addEventListener(
  "click",
  event => {
    event.preventDefault();
    moveNo();
  }
);


document.getElementById("yes").onclick =
  () => go("cake");


/* -----------------------------
   CAKE / CANDLE
----------------------------- */

const blow =
  document.getElementById("blow");

const cakeMsg =
  document.getElementById("cakeMsg");

const cakeNext =
  document.getElementById("cakeNext");


blow.oninput = () => {

  if (+blow.value >= 90) {

    document.querySelector(".flame")
      .style.opacity = "0";

    cakeMsg.textContent =
      "Candles blown! 🎉 Now let's cut the cake.";

    cakeNext.classList.remove("hidden");

    burst("✨");
  }
};


cakeNext.onclick =
  () => go("balloons");


/* -----------------------------
   BALLOONS
----------------------------- */

let pops = 0;

const balloons =
  document.querySelectorAll(".balloon");


balloons.forEach(balloon => {

  balloon.onclick = () => {

    if (
      balloon.classList.contains("popped")
    ) {
      return;
    }

    balloon.classList.add("popped");

    pops++;

    document.getElementById("bmsg")
      .textContent =
      balloon.dataset.m;

    if (pops === 4) {

      setTimeout(() => {

        document.getElementById("bmsg")
          .textContent =
          "All four little secrets were meant for you. 💗";

        document
          .getElementById("balloonNext")
          .classList.remove("hidden");

      }, 450);
    }

  };

});


document.getElementById("balloonNext").onclick =
  () => go("memories");


/* -----------------------------
   MEMORIES
----------------------------- */

/*
   IMPORTANT:

   These are your actual uploaded photos.

   Keep these exact filenames
   inside the /photos folder.
*/

const photos = [

  {
    src: "photos/photo1.jpg",
    text: "A little moment worth remembering."
  },

  {
    src: "photos/photo2.jpg",
    text: "Some memories deserve their own place."
  },

  {
    src: "photos/photo3.jpg",
    text: "One of my favorite little moments."
  },

  {
    src: "photos/photo4.jpg",
    text: "A beautiful memory to keep forever."
  },

  {
    src: "photos/photo5.jpg",
    text: "Some moments simply feel special."
  },

  {
    src: "photos/photo6.png",
    text: "And this one will always have a special place. ❤️"
  }

];


let photoIndex = 0;


const photo =
  document.getElementById("photo");

const caption =
  document.getElementById("pcap");

const count =
  document.getElementById("count");

const dots =
  document.getElementById("dots");


/* Create dots */

photos.forEach((photoItem, index) => {

  const dot =
    document.createElement("i");

  dot.className = "dot";

  dot.onclick = () => {

    photoIndex = index;

    renderPhoto();
  };

  dots.appendChild(dot);

});


/* Render current photo */

function renderPhoto() {

  const current =
    photos[photoIndex];

  photo.src =
    current.src;

  photo.alt =
    "Birthday memory " +
    (photoIndex + 1);

  caption.textContent =
    current.text;

  count.textContent =
    String(photoIndex + 1).padStart(2, "0") +
    " / " +
    String(photos.length).padStart(2, "0");


  [...dots.children].forEach(
    (dot, index) => {

      dot.classList.toggle(
        "on",
        index === photoIndex
      );

    }
  );
}


/* Next */

document.getElementById("next").onclick =
  () => {

    photoIndex++;

    if (photoIndex >= photos.length) {
      photoIndex = 0;
    }

    renderPhoto();
  };


/* Previous */

document.getElementById("prev").onclick =
  () => {

    photoIndex--;

    if (photoIndex < 0) {
      photoIndex = photos.length - 1;
    }

    renderPhoto();
  };


/* First photo */

renderPhoto();


/* Continue */

document.getElementById("memNext").onclick =
  () => go("bouquet");


/* -----------------------------
   BOUQUET
----------------------------- */

const bouquetButton =
  document.getElementById("bouquetBtn");

const chats =
  document.getElementById("chats");

const surpriseButton =
  document.getElementById("surpriseBtn");


bouquetButton.onclick = () => {

  bouquetButton.classList.add("open");

  chats.classList.remove("hidden");

  surpriseButton.classList.remove("hidden");

  burst("🌸");
};


surpriseButton.onclick =
  () => go("letter");


/* -----------------------------
   FINAL MESSAGE BOX
----------------------------- */

const messageBox =
  document.getElementById("box");

const letterText =
  document.getElementById("letterText");

const replay =
  document.getElementById("replay");


messageBox.onclick = () => {

  messageBox.classList.add("open");

  setTimeout(() => {

    letterText.classList.remove("hidden");

    replay.classList.remove("hidden");

    burst("💗");

  }, 650);
};


/* -----------------------------
   REPLAY
----------------------------- */

replay.onclick = () => {

  location.reload();

};


/* -----------------------------
   LITTLE FLOATING EFFECT
----------------------------- */

function burst(symbol) {

  for (let i = 0; i < 12; i++) {

    const item =
      document.createElement("span");

    item.textContent =
      symbol;

    item.style.position = "fixed";

    item.style.left =
      (40 + Math.random() * 20) + "%";

    item.style.top =
      (45 + Math.random() * 15) + "%";

    item.style.zIndex = "30";

    item.style.fontSize = "22px";

    item.style.animation =
      "float 2s ease forwards";

    document
      .getElementById("confetti")
      .appendChild(item);


    setTimeout(() => {

      item.remove();

    }, 2100);

  }

}