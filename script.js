(async () => {

    await tsParticles.load({

        id: "tsparticles",

        options: {

            fullScreen: {
                enable: false
            },

            background: {
                color: "transparent"
            },

            particles: {

                number: {
                    value: 200
                },

                color: {
                    value: "#ffffff"
                },

                shape: {
                    type: "circle"
                },

                size: {
                    value: {
                        min: 1,
                        max: 2.5
                    }
                },

                opacity: {

                    value: {
                        min: 0.2,
                        max: 1
                    },

                    animation: {
                        enable: true,
                        speed: 0.4
                    }

                },

                move: {

                    enable: true,

                    speed: 0.08

                }

            }

        }

    });

})();


const container = document.getElementById("shooting-stars");

function createMeteor(){
  

    const meteor = document.createElement("div");

    meteor.className = "shooting-star";

  const angle = 35 + Math.random() * 25;

meteor.style.setProperty("--angle", angle + "deg");

meteor.style.setProperty(
    "--moveX",
    -(1200 + Math.random() * 800) + "px"
);

meteor.style.setProperty(
    "--moveY",
    (900 + Math.random() * 700) + "px"
);

  

    // Mulai dari luar kanan
    meteor.style.left =
    window.innerWidth + Math.random() * 200 + "px";

    // Mulai dari luar atas
    meteor.style.top =
    Math.random() * (window.innerHeight * 0.35) - 180 + "px";
  
    // Panjang meteor
    meteor.style.height =
        (120 + Math.random()*120) + "px";

    // Kecepatan
    
    container.appendChild(meteor);
  
  const duration = (3 + Math.random() * 2) * 1000;

meteor.style.setProperty("--duration", duration / 1000 + "s");

const trail = setInterval(() => {

    const rect = meteor.getBoundingClientRect();

    const rad = angle * Math.PI / 180;

    const x = rect.left + Math.cos(rad) * 6;
    const y = rect.top + rect.height - Math.sin(rad) * 6;

    const amount = Math.floor(Math.random() * 2) + 1;

    for(let i = 0; i < amount; i++){

        createSpark(
            x + (Math.random()-0.5) * 4,
            y + (Math.random()-0.5) * 4
        );

    }

},25);

// Spark hanya aktif selama 70% perjalanan meteor
setTimeout(() => {
    clearInterval(trail);
}, duration * 0.7);

// Meteor dihapus saat animasi selesai
setTimeout(() => {
    meteor.remove();
}, duration);
    setTimeout(()=>{

    clearInterval(trail);

    meteor.remove();

},5000);

}

let giftOpened = false;

function createSpark(x,y){

    const spark=document.createElement("div");

    spark.className="spark";

    spark.style.left=x+"px";
    spark.style.top=y+"px";

    spark.style.setProperty(
        "--dx",
        (Math.random()-0.5)*40
    );

    spark.style.setProperty(
        "--dy",
        (Math.random()-0.5)*40
    );

    spark.style.animationDuration=
        (0.6+Math.random()*0.5)+"s";

    spark.style.transform=
        `rotate(${Math.random()*360}deg)`;

    container.appendChild(spark);

    setTimeout(()=>{
        spark.remove();
    },1200);

}

function meteorWave(){
  
const jumlah = giftOpened
    ? 2
    : Math.floor(Math.random() * 3) + 1;

    for(let i = 0; i < jumlah; i++){
        createMeteor();
    }

    setTimeout(
    meteorWave,
    5000 + Math.random() * 3000
);

}

function smallMeteor(){

    if(giftOpened){
        createMeteor();
    }

    setTimeout(
        smallMeteor,
        300 + Math.random() * 500
    );

}

meteorWave();
smallMeteor();





const button = document.getElementById("openGift");

const music = document.getElementById("bgMusic");

button.addEventListener("click", () => {

    // Musik
    music.volume = 0.4;
    music.play();

    // Aktifkan meteor setelah tombol ditekan
    giftOpened = true;

    // Hero menghilang
    document.querySelector(".hero").classList.add("fadeOut");

    // Scroll ke Happy Birthday
    setTimeout(() => {

        document.getElementById("birthday").scrollIntoView({
            behavior: "smooth"
        });

    }, 700);

});

const toLetter = document.getElementById("toLetter");

toLetter.addEventListener("click", () => {

    document.getElementById("letter").scrollIntoView({
        behavior: "smooth"
    });

});

const toSpecial = document.getElementById("toSpecial");

toSpecial.addEventListener("click", () => {

    document.getElementById("special").scrollIntoView({
        behavior: "smooth"
    });

});

/* =========================
   SCROLL REVEAL
========================= */

const sections = document.querySelectorAll(
    "#birthday, #letter, #special, #memory, #treasure-map, #closing"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.2
    }
);

sections.forEach((section) => {

    revealObserver.observe(section);

});

const toMap = document.getElementById("toMap");

toMap.addEventListener("click", () => {

    document.getElementById("treasure-map").scrollIntoView({
        behavior: "smooth"
    });

});


const toClosing = document.getElementById("toClosing");

toClosing.addEventListener("click", () => {

    document.getElementById("closing").scrollIntoView({
        behavior: "smooth"
    });

});

const toMemory = document.getElementById("toMemory");

toMemory.addEventListener("click", () => {

    document.getElementById("memory").scrollIntoView({
        behavior:"smooth"
    });

});