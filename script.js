(async () => {
    await tsParticles.load({
        id: "tsparticles",
        options: {
            fullScreen: { enable: false },
            background: { color: "transparent" },
            particles: {
                number: { value: 30 },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 2 } },
                opacity: {
                    value: { min: 0.2, max: 0.8 },
                    animation: { enable: true, speed: 0.3 }
                },
                move: { enable: true, speed: 0.05 }
            }
        }
    });
})();

const container = document.getElementById("shooting-stars");

function createMeteor() {
    const meteor = document.createElement("div");
    meteor.className = "shooting-star";

    const angle = 40;
    meteor.style.setProperty("--angle", angle + "deg");
    meteor.style.setProperty("--moveX", "-1000px");
    meteor.style.setProperty("--moveY", "800px");

    meteor.style.left = window.innerWidth + Math.random() * 150 + "px";
    meteor.style.top = Math.random() * (window.innerHeight * 0.4) + "px";
    meteor.style.height = "120px";

    container.appendChild(meteor);

    const duration = 3000;
    meteor.style.setProperty("--duration", duration / 1000 + "s");

    setTimeout(() => {
        meteor.remove();
    }, duration);
}

function meteorLoop() {
    const count = Math.floor(Math.random() * 2) + 2; 
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createMeteor();
        }, i * 200);
    }

    const randomDelay = Math.random() * 1300 + 1200; 
    setTimeout(meteorLoop, randomDelay);
}

meteorLoop();

// --- SISTEM NAVIGASI SEKSI ---
const sections = document.querySelectorAll("section");

function showSection(targetId = "") {
    const currentActive = document.querySelector("section.active");
    const targetSection = document.getElementById(targetId);

    if (currentActive && currentActive !== targetSection) {
        currentActive.classList.add("exit");
        currentActive.classList.remove("active");

        setTimeout(() => {
            currentActive.classList.remove("exit");
        }, 500);
    }

    if (targetSection) {
        setTimeout(() => {
            targetSection.classList.add("active");
        }, 150);
    }
}

// Tombol Buka Hadiah di Hero (Memutar Musik & Pindah ke Seksi Birthday)
const button = document.getElementById("openGift");
const music = document.getElementById("bgMusic");

if (button) {
    button.addEventListener("click", () => {
        music.volume = 0.5;
        music.play().catch((error) => {
            console.log("Audio play blocked or failed:", error);
        });
        showSection("birthday");
    });
}

// Pengaturan Tombol Navigasi Antar Seksi
const setupNavButton = (id = "", targetId = "") => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener("click", () => {
            showSection(targetId);
        });
    }
};

setupNavButton("toLetter", "letter");
setupNavButton("toSpecial", "special");
setupNavButton("toMemory", "memory");
setupNavButton("toMap", "treasure-map");
setupNavButton("toClosing", "closing");

// Secret Vault Logic
const unlockBtn = document.getElementById("unlockVault");
const vaultCodeInput = document.getElementById("vaultCode");
const vaultLocked = document.getElementById("vaultLocked");
const vaultUnlocked = document.getElementById("vaultUnlocked");
const vaultError = document.getElementById("vaultError");
const toClosingBtn = document.getElementById("toClosing");

if (unlockBtn) {
    unlockBtn.addEventListener("click", () => {
        const secretCode = "1910";

        if (vaultCodeInput.value.trim() === secretCode) {
            vaultLocked.style.display = "none";
            vaultUnlocked.classList.remove("hidden");
            toClosingBtn.classList.remove("hidden");

            if (typeof confetti === "function") {
                confetti({
                    particleCount: 60,
                    spread: 60,
                    origin: { y: 0.6 }
                });
            }
        } else {
            vaultError.textContent = "Ups, kodenya salah! Coba masukkan tanggal 1910 ya. 😉";
            vaultCodeInput.style.borderColor = "#ff4fa3";
        }
    });
}
