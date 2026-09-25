/* =====================================================
   BIRTHDAY GIFT — FINAL SCRIPT
   Updated with the 7 requested interactive upgrades
===================================================== */


/* =====================================================
   NAME
===================================================== */

const birthdayName = "PAGAL CHUA 🥰";


/* =====================================================
   ELEMENTS
===================================================== */

// Main scenes
const introScene = document.getElementById("introScene");
const wishScene = document.getElementById("wishScene");
const cakeScene = document.getElementById("cakeScene");
const songScene = document.getElementById("songScene");
const teddyScene = document.getElementById("teddyScene");
const memoryScene = document.getElementById("memoryScene");
const letterScene = document.getElementById("letterScene");
const finalThoughtScene = document.getElementById("finalThoughtScene");
const finalMessageScene = document.getElementById("finalMessageScene");
const endingScene = document.getElementById("endingScene");

// Buttons
const startButton = document.getElementById("startButton");
const cakeButton = document.getElementById("cakeButton");
const blowButton = document.getElementById("blowButton");
const manualBlowButton = document.getElementById("manualBlowButton");
const skipSongBtn = document.getElementById("skipSongBtn");
const teddyNextBtn = document.getElementById("teddyNextBtn");
const memoryNextBtn = document.getElementById("memoryNextBtn");
const letterNextBtn = document.getElementById("letterNextBtn");
const finalThoughtNextBtn =
    document.getElementById("finalThoughtNextBtn");
const endingNextBtn =
    document.getElementById("endingNextBtn");

// Birthday name
const birthdayNameElement =
    document.getElementById("birthdayName");

// Cake
const cakeArea =
    document.querySelector(".cake-area");

const blowInstruction =
    document.getElementById("blowInstruction");

// Song
const songNumber =
    document.getElementById("songNumber");

const songStatus =
    document.getElementById("songStatus");

const birthdayAudio =
    document.getElementById("birthdayAudio");

// Teddy
const teddyHint =
    document.getElementById("teddyHint");

// Memory
const memoryIntro =
    document.getElementById("memoryIntro");

const memoryTitle =
    document.getElementById("memoryTitle");

const memoryText =
    document.getElementById("memoryText");

// Letter
const letterLine1 =
    document.getElementById("letterLine1");

const letterLine2 =
    document.getElementById("letterLine2");

const letterLine3 =
    document.getElementById("letterLine3");

const letterLine4 =
    document.getElementById("letterLine4");

// Final Thought
const finalThoughtTitle =
    document.getElementById("finalThoughtTitle");

const finalThoughtText =
    document.getElementById("finalThoughtText");

// Final Message
const finalLine1 =
    document.getElementById("finalLine1");

const finalLine2 =
    document.getElementById("finalLine2");

const finalLine3 =
    document.getElementById("finalLine3");

const finalLine4 =
    document.getElementById("finalLine4");

const finalLine5 =
    document.getElementById("finalLine5");

const lifetimeLine =
    document.getElementById("lifetimeLine");

const birthdayEnding =
    document.getElementById("birthdayEnding");

// Ending
const endingLine1 =
    document.getElementById("endingLine1");

const endingLine2 =
    document.getElementById("endingLine2");

const endingBirthday =
    document.getElementById("endingBirthday");


/* =====================================================
   SET NAME
===================================================== */

if (birthdayNameElement) {
    birthdayNameElement.textContent = birthdayName;
}


/* =====================================================
   SCENE SYSTEM
===================================================== */

function showScene(scene) {

    if (!scene) {
        return;
    }

    const allScenes =
        document.querySelectorAll(".scene");

    allScenes.forEach(function (item) {
        item.classList.remove("active");
    });

    scene.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   INTRO → WISH
===================================================== */

if (startButton) {

    startButton.addEventListener(
        "click",
        function () {

            showScene(wishScene);

        }
    );
}


/* =====================================================
   WISH → CAKE
===================================================== */

if (cakeButton) {

    cakeButton.addEventListener(
        "click",
        function () {

            showScene(cakeScene);

        }
    );
}


/* =====================================================
   MICROPHONE VARIABLES
===================================================== */

let audioContext = null;
let microphone = null;
let analyser = null;
let microphoneStream = null;

let blowDetected = false;
let microphoneStarted = false;


/* =====================================================
   START MICROPHONE
===================================================== */

async function startMicrophone() {

    if (microphoneStarted || blowDetected) {
        return;
    }

    try {

        microphoneStarted = true;

        microphoneStream =
            await navigator.mediaDevices.getUserMedia({
                audio: true
            });

        audioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

        microphone =
            audioContext.createMediaStreamSource(
                microphoneStream
            );

        analyser =
            audioContext.createAnalyser();

        analyser.fftSize = 512;

        microphone.connect(analyser);


        if (blowButton) {

            blowButton.classList.add("listening");

            blowButton.innerHTML = `
                <span class="mic-button-icon">
                    🎤
                </span>

                <span>
                    Blow now...
                </span>
            `;
        }


        if (blowInstruction) {

            blowInstruction.innerHTML = `
                <div class="mic-icon">
                    💨
                </div>

                <p>
                    Blow toward the microphone
                </p>

                <span>
                    Your candle will go out when
                    the blow is detected
                </span>
            `;
        }


        detectBlow();

    }
    catch (error) {

        console.log(
            "Microphone error:",
            error
        );

        microphoneStarted = false;

        if (blowButton) {

            blowButton.innerHTML = `
                <span>
                    🎤
                </span>

                <span>
                    Microphone unavailable
                </span>
            `;
        }

        if (blowInstruction) {

            blowInstruction.innerHTML = `
                <div class="mic-icon">
                    🕯️
                </div>

                <p>
                    Tap the button below instead
                </p>

                <span>
                    You can continue without microphone
                </span>
            `;
        }
    }
}


/* =====================================================
   DETECT BLOW
===================================================== */

function detectBlow() {

    if (!analyser || blowDetected) {
        return;
    }

    const bufferLength =
        analyser.fftSize;

    const dataArray =
        new Uint8Array(bufferLength);


    function checkVolume() {

        if (blowDetected || !analyser) {
            return;
        }

        analyser.getByteTimeDomainData(
            dataArray
        );

        let sum = 0;


        for (
            let i = 0;
            i < bufferLength;
            i++
        ) {

            const value =
                (dataArray[i] - 128) / 128;

            sum += value * value;
        }


        const volume =
            Math.sqrt(
                sum / bufferLength
            );


        if (volume > 0.12) {

            candlesBlown();

            return;
        }


        requestAnimationFrame(
            checkVolume
        );
    }


    checkVolume();
}


/* =====================================================
   BLOW BUTTON
===================================================== */

if (blowButton) {

    blowButton.addEventListener(
        "click",
        function () {

            if (blowDetected) {
                return;
            }

            startMicrophone();

        }
    );
}


/* =====================================================
   MANUAL BLOW
===================================================== */

if (manualBlowButton) {

    manualBlowButton.addEventListener(
        "click",
        function () {

            if (blowDetected) {
                return;
            }

            candlesBlown();

        }
    );
}


/* =====================================================
   CANDLE EFFECT
   Upgrade #4
===================================================== */

function createCandleSmoke() {

    if (!cakeArea) {
        return;
    }

    const candles =
        cakeArea.querySelectorAll(".candle");

    candles.forEach(function (candle) {

        candle.classList.add("extinguishing");

        setTimeout(function () {

            candle.classList.add("blown");

        }, 450);

    });
}


function candlesBlown() {

    if (blowDetected) {
        return;
    }

    blowDetected = true;


    stopMicrophone();


    /* Candle extinguishing effect */

    if (cakeArea) {

        cakeArea.classList.add("blown");

        createCandleSmoke();

    }


    if (blowInstruction) {

        blowInstruction.innerHTML = `
            <div class="mic-icon">
                ✨
            </div>

            <p>
                Wish made. 🕯️
            </p>

            <span>
                Happy Birthday...
            </span>
        `;
    }


    if (blowButton) {

        blowButton.disabled = true;

        blowButton.style.opacity = "0.4";
    }


    if (manualBlowButton) {

        manualBlowButton.style.display =
            "none";
    }


    setTimeout(function () {

        showBirthdaySong();

    }, 1500);
}


/* =====================================================
   STOP MICROPHONE
===================================================== */

function stopMicrophone() {

    if (microphoneStream) {

        microphoneStream
            .getTracks()
            .forEach(function (track) {

                track.stop();

            });
    }


    if (audioContext) {

        audioContext
            .close()
            .catch(function () {});

    }


    microphoneStream = null;
    audioContext = null;
    microphone = null;
    analyser = null;

    microphoneStarted = false;
}


/* =====================================================
   MUSIC VARIABLES
   Upgrade #6
===================================================== */

let musicFadeStarted = false;
let musicFadeTimer = null;


/* =====================================================
   SMOOTH MUSIC FADE
===================================================== */

function fadeBirthdayMusic() {

    if (!birthdayAudio) {
        return;
    }

    if (musicFadeStarted) {
        return;
    }

    musicFadeStarted = true;

    const fadeDuration = 1800;
    const startVolume =
        birthdayAudio.volume;

    const steps = 30;

    let currentStep = 0;

    musicFadeTimer =
        setInterval(function () {

            currentStep++;

            const progress =
                currentStep / steps;

            birthdayAudio.volume =
                Math.max(
                    0,
                    startVolume * (1 - progress)
                );

            if (currentStep >= steps) {

                clearInterval(
                    musicFadeTimer
                );

                birthdayAudio.volume = 0;

            }

        }, fadeDuration / steps);
}


/* =====================================================
   WATCH SONG END
===================================================== */

if (birthdayAudio) {

    birthdayAudio.addEventListener(
        "timeupdate",
        function () {

            if (
                birthdayAudio.duration &&
                birthdayAudio.currentTime >=
                birthdayAudio.duration - 2.0
            ) {

                fadeBirthdayMusic();

            }

        }
    );
}


/* =====================================================
   SHOW BIRTHDAY SONG
===================================================== */

function showBirthdaySong() {

    showScene(songScene);


    songStatus.textContent =
        "A little birthday song for you...";


    musicFadeStarted = false;


    if (musicFadeTimer) {

        clearInterval(
            musicFadeTimer
        );

        musicFadeTimer = null;
    }


    birthdayAudio.volume = 1;

    birthdayAudio.currentTime = 0;


    skipSongBtn.style.display =
        "none";


    birthdayAudio
        .play()
        .then(function () {

            console.log(
                "Birthday song started."
            );

        })
        .catch(function (error) {

            console.log(
                "Audio could not autoplay:",
                error
            );

            songStatus.textContent =
                "Tap anywhere to play your birthday song 🎵";
        });


    setTimeout(function () {

        if (
            songScene &&
            songScene.classList.contains("active")
        ) {

            skipSongBtn.style.display =
                "inline-block";

        }

    }, 10000);
}


/* =====================================================
   SKIP BIRTHDAY SONG
===================================================== */

function skipBirthdaySong() {

    birthdayAudio.pause();

    birthdayAudio.currentTime = 0;

    birthdayAudio.volume = 1;

    musicFadeStarted = false;

    if (musicFadeTimer) {

        clearInterval(
            musicFadeTimer
        );

        musicFadeTimer = null;
    }

    showAfterBirthday();
}


if (skipSongBtn) {

    skipSongBtn.addEventListener(
        "click",
        function () {

            skipBirthdaySong();

        }
    );
}


/* =====================================================
   AUDIO ENDED
===================================================== */

if (birthdayAudio) {

    birthdayAudio.addEventListener(
        "ended",
        function () {

            birthdayAudio.volume = 1;

            musicFadeStarted = false;

            if (musicFadeTimer) {

                clearInterval(
                    musicFadeTimer
                );

                musicFadeTimer = null;
            }


            setTimeout(function () {

                showAfterBirthday();

            }, 1800);

        }
    );
}


/* =====================================================
   SONG → TEDDY
===================================================== */

function showAfterBirthday() {

    showScene(teddyScene);

    initializeTeddyInteraction();

}


/* =====================================================
   TEDDY INTERACTION
   Upgrade #1 + #5
===================================================== */

let teddyInteractionReady = false;


function createHeartParticle() {

    const effectLayer =
        document.getElementById(
            "effectLayer"
        );

    if (!effectLayer) {
        return;
    }


    const heart =
        document.createElement("span");

    heart.className =
        "teddy-heart-particle";

    heart.textContent = "♥";


    const x =
        40 + Math.random() * 20;

    const y =
        35 + Math.random() * 20;


    heart.style.left =
        x + "%";

    heart.style.top =
        y + "%";


    heart.style.setProperty(
        "--heart-x",
        ((Math.random() - 0.5) * 100) + "px"
    );


    heart.style.setProperty(
        "--heart-y",
        (-80 - Math.random() * 100) + "px"
    );


    effectLayer.appendChild(heart);


    setTimeout(function () {

        heart.remove();

    }, 1800);
}


function teddyReaction() {

    const teddyCard =
        document.querySelector(
            ".teddy-card"
        );

    if (!teddyCard) {
        return;
    }


    teddyCard.classList.remove(
        "teddy-reacting"
    );


    void teddyCard.offsetWidth;


    teddyCard.classList.add(
        "teddy-reacting"
    );


    if (teddyHint) {

        teddyHint.textContent =
            "A little hug for you... 🤍";

        teddyHint.style.opacity =
            "1";
    }


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        setTimeout(function () {

            createHeartParticle();

        }, i * 100);

    }


    setTimeout(function () {

        teddyCard.classList.remove(
            "teddy-reacting"
        );

    }, 1800);
}


function initializeTeddyInteraction() {

    if (teddyInteractionReady) {
        return;
    }

    teddyInteractionReady = true;


    const teddyCard =
        document.querySelector(
            ".teddy-card"
        );


    const teddyWrapper =
        document.querySelector(
            ".teddy-wrapper"
        );


    if (teddyWrapper) {

        teddyWrapper.setAttribute(
            "role",
            "button"
        );

        teddyWrapper.setAttribute(
            "tabindex",
            "0"
        );


        teddyWrapper.addEventListener(
            "click",
            function () {

                teddyReaction();

            }
        );


        teddyWrapper.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    teddyReaction();

                }

            }
        );
    }


    // Extra floating animation class
    if (teddyCard) {

        teddyCard.classList.add(
            "teddy-floating"
        );

    }
}


/* =====================================================
   TEDDY → MEMORY
===================================================== */

if (teddyNextBtn) {

    teddyNextBtn.addEventListener(
        "click",
        function () {

            const teddyCard =
                document.querySelector(
                    ".teddy-card"
                );


            if (teddyCard) {

                teddyCard.classList.add(
                    "teddy-reacting"
                );

            }


            if (teddyHint) {

                teddyHint.style.opacity =
                    "1";

            }


            /*
               Upgrade #7
               Emotional transition
            */

            showEmotionalTransition(
                function () {

                    showScene(
                        memoryScene
                    );

                    showMemoryMessage();

                }
            );

        }
    );
}


/* =====================================================
   EMOTIONAL TRANSITION
   Upgrade #7
===================================================== */

function showEmotionalTransition(callback) {

    let overlay =
        document.getElementById(
            "emotionalTransition"
        );


    if (!overlay) {

        overlay =
            document.createElement(
                "div"
            );

        overlay.id =
            "emotionalTransition";

        overlay.innerHTML = `
            <div class="emotional-transition-text">
                Some feelings don't need a reason to remain.
            </div>
        `;

        document.body.appendChild(
            overlay
        );
    }


    overlay.classList.remove(
        "show"
    );


    void overlay.offsetWidth;


    overlay.classList.add(
        "show"
    );


    setTimeout(function () {

        if (callback) {
            callback();
        }

    }, 1700);


    setTimeout(function () {

        overlay.classList.remove(
            "show"
        );

    }, 2600);
}


/* =====================================================
   MEMORY MESSAGE
===================================================== */

function showMemoryMessage() {

    memoryTitle.textContent = "";
    memoryText.textContent = "";


    memoryIntro.style.opacity = "0";
    memoryTitle.style.opacity = "0";
    memoryText.style.opacity = "0";

    memoryNextBtn.style.opacity = "0";
    memoryNextBtn.style.pointerEvents =
        "none";


    setTimeout(function () {

        memoryIntro.style.opacity =
            "1";

    }, 500);


    setTimeout(function () {

        memoryTitle.textContent =
            "Some people may leave our lives, but they don't always leave our hearts.";

        memoryTitle.style.opacity =
            "1";

    }, 1800);


    setTimeout(function () {

        memoryText.textContent =
            "Maybe today I am no longer a part of your life. Maybe I don't have the same place in your world anymore. And that's okay.";

        memoryText.style.opacity =
            "1";

    }, 4200);


    setTimeout(function () {

        memoryNextBtn.style.opacity =
            "1";

        memoryNextBtn.style.pointerEvents =
            "auto";

    }, 6500);
}


/* =====================================================
   SECRET HEART
   Upgrade #3
===================================================== */

function initializeSecretHeart() {

    const secretHeart =
        document.getElementById(
            "secretHeart"
        );

    const secretMessage =
        document.getElementById(
            "secretMessage"
        );


    if (!secretHeart || !secretMessage) {
        return;
    }


    secretHeart.addEventListener(
        "click",
        function () {

            secretHeart.classList.add(
                "secret-heart-open"
            );


            secretMessage.classList.add(
                "show"
            );


            for (
                let i = 0;
                i < 5;
                i++
            ) {

                setTimeout(function () {

                    createHeartParticle();

                }, i * 120);

            }

        }
    );
}


initializeSecretHeart();


/* =====================================================
   MEMORY → LETTER
===================================================== */

if (memoryNextBtn) {

    memoryNextBtn.addEventListener(
        "click",
        function () {

            showScene(letterScene);

            showLetterMessage();

        }
    );
}


/* =====================================================
   LETTER MESSAGE
===================================================== */

function showLetterMessage() {

    letterLine1.classList.remove(
        "show"
    );

    letterLine2.classList.remove(
        "show"
    );

    letterLine3.classList.remove(
        "show"
    );

    letterLine4.classList.remove(
        "show"
    );

    letterNextBtn.classList.remove(
        "show"
    );


    setTimeout(function () {

        letterLine1.classList.add(
            "show"
        );

    }, 700);


    setTimeout(function () {

        letterLine2.classList.add(
            "show"
        );

    }, 2200);


    setTimeout(function () {

        letterLine3.classList.add(
            "show"
        );

    }, 3700);


    setTimeout(function () {

        letterLine4.classList.add(
            "show"
        );

    }, 5500);


    setTimeout(function () {

        letterNextBtn.classList.add(
            "show"
        );

    }, 7500);
}


/* =====================================================
   LETTER → FINAL THOUGHT
===================================================== */

if (letterNextBtn) {

    letterNextBtn.addEventListener(
        "click",
        function () {

            showScene(
                finalThoughtScene
            );

            showFinalThought();

        }
    );
}


/* =====================================================
   FINAL THOUGHT
===================================================== */

function showFinalThought() {

    finalThoughtTitle.style.opacity =
        "0";

    finalThoughtText.style.opacity =
        "0";

    finalThoughtNextBtn.style.opacity =
        "0";


    finalThoughtTitle.style.transform =
        "translateY(15px)";

    finalThoughtText.style.transform =
        "translateY(15px)";

    finalThoughtNextBtn.style.transform =
        "translateY(10px)";


    setTimeout(function () {

        finalThoughtTitle.style.opacity =
            "1";

        finalThoughtTitle.style.transform =
            "translateY(0)";

    }, 700);


    setTimeout(function () {

        finalThoughtText.style.opacity =
            "1";

        finalThoughtText.style.transform =
            "translateY(0)";

    }, 2400);


    setTimeout(function () {

        finalThoughtNextBtn.style.opacity =
            "1";

        finalThoughtNextBtn.style.transform =
            "translateY(0)";

    }, 5000);
}


/* =====================================================
   FINAL THOUGHT → FINAL MESSAGE
===================================================== */

if (finalThoughtNextBtn) {

    finalThoughtNextBtn.addEventListener(
        "click",
        function () {

            showScene(
                finalMessageScene
            );

            showFinalMessage();

        }
    );
}


/* =====================================================
   FINAL MESSAGE
===================================================== */

function showFinalMessage() {

    const lines = [

        finalLine1,
        finalLine2,
        finalLine3,
        finalLine4,
        finalLine5,
        lifetimeLine,
        birthdayEnding

    ];


    lines.forEach(function (line) {

        if (line) {

            line.classList.remove(
                "show"
            );

        }

    });


    setTimeout(function () {

        finalLine1.classList.add(
            "show"
        );

    }, 800);


    setTimeout(function () {

        finalLine2.classList.add(
            "show"
        );

    }, 2600);


    setTimeout(function () {

        finalLine3.classList.add(
            "show"
        );

    }, 4500);


    setTimeout(function () {

        finalLine4.classList.add(
            "show"
        );

    }, 6000);


    setTimeout(function () {

        finalLine5.classList.add(
            "show"
        );

    }, 8000);


    setTimeout(function () {

        lifetimeLine.classList.add(
            "show"
        );

    }, 10500);


    setTimeout(function () {

        birthdayEnding.classList.add(
            "show"
        );

    }, 13000);


    setTimeout(function () {

        if (endingNextBtn) {

            endingNextBtn.classList.add(
                "show"
            );

        }

    }, 15500);
}


/* =====================================================
   FINAL MESSAGE → ENDING
===================================================== */

if (endingNextBtn) {

    endingNextBtn.addEventListener("click", () => {

    showScene(questionScene);

    });
}


/* =====================================================
   ENDING
===================================================== */

function showEnding() {

    endingLine1.classList.remove(
        "show"
    );

    endingLine2.classList.remove(
        "show"
    );

    endingBirthday.classList.remove(
        "show"
    );


    setTimeout(function () {

        endingLine1.classList.add(
            "show"
        );

    }, 1000);


    setTimeout(function () {

        endingLine2.classList.add(
            "show"
        );

    }, 3500);


    setTimeout(function () {

        endingBirthday.classList.add(
            "show"
        );

    }, 6000);
}


/* =====================================================
   FALLING STARS
   Upgrade #2
===================================================== */

function createFallingStars() {

    const starContainer =
        document.getElementById(
            "ambientStars"
        );


    if (!starContainer) {
        return;
    }


    starContainer.innerHTML = "";


    const numberOfStars = 35;


    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        const star =
            document.createElement(
                "span"
            );


        star.className =
            "falling-star";


        star.textContent =
            Math.random() > 0.5
                ? "✦"
                : "·";


        star.style.left =
            Math.random() * 100 + "%";


        star.style.animationDuration =
            (5 + Math.random() * 8) + "s";


        star.style.animationDelay =
            (-Math.random() * 10) + "s";


        star.style.fontSize =
            (5 + Math.random() * 8) + "px";


        starContainer.appendChild(
            star
        );
    }
}


createFallingStars();


/* =====================================================
   MOBILE AUDIO FALLBACK
===================================================== */

document.addEventListener(
    "click",
    function () {

        if (
            songScene &&
            songScene.classList.contains("active") &&
            birthdayAudio &&
            birthdayAudio.paused &&
            !birthdayAudio.ended
        ) {

            birthdayAudio
                .play()
                .catch(function () {
                    // Ignore autoplay errors.
                });
        }

    }
);


/* =====================================================
   END
===================================================== */


// ================================
// SECRET HEART MESSAGE
// ================================

const memoryIcon = document.getElementById("memoryIcon");
const secretMessage = document.getElementById("secretMessage");

if (memoryIcon && secretMessage) {

    memoryIcon.addEventListener("click", () => {
        secretMessage.classList.toggle("show");
    });

}


// =====================================
// FINAL QUESTION / MULTIPLE SELECTION
// =====================================

const questionScene = document.getElementById("questionScene");
const questionOptions = document.querySelectorAll(".question-option");
const questionThankYou = document.getElementById("questionThankYou");
const questionContinueBtn = document.getElementById("questionContinueBtn");

let selectedAnswers = [];

questionOptions.forEach(option => {
    const checkbox = option.querySelector('input[type="checkbox"]');

    checkbox.addEventListener("change", () => {
        const answer = checkbox.value;

        if (checkbox.checked) {
            if (!selectedAnswers.includes(answer)) {
                selectedAnswers.push(answer);
            }
            option.classList.add("selected");
        } else {
            selectedAnswers = selectedAnswers.filter(item => item !== answer);
            option.classList.remove("selected");
        }

        if (selectedAnswers.length > 0) {
            questionThankYou.classList.add("show");
            questionContinueBtn.classList.add("show");
        } else {
            questionThankYou.classList.remove("show");
            questionContinueBtn.classList.remove("show");
        }
    });
});

// =====================================
// SAVE FEEDBACK TO GOOGLE SHEET
// =====================================

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwH5oe5Jnr7nXzWukflNy67F7-lGRgHTVzTW0AX5n1g4LUZdP8Tp4_ocJiA83RdRQxj/exec";

questionContinueBtn.addEventListener("click", () => {

    if (selectedAnswers.length === 0) {
        return;
    }

    fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body: JSON.stringify({
            answers: selectedAnswers
        })
    })
    .then(() => {
        console.log("Feedback saved successfully.");
    })
    .catch(error => {
        console.log("Feedback save error:", error);
    })
    .finally(() => {

        showScene(giftScene);

    });

});



// =====================================
// GIFT BOX SURPRISE
// =====================================

const giftScene = document.getElementById("giftScene");
const giftCard = document.querySelector(".gift-card");
const giftBox = document.getElementById("giftBox");
const openGiftBtn = document.getElementById("openGiftBtn");
const giftNextBtn = document.getElementById("giftNextBtn");

openGiftBtn.addEventListener("click", () => {

    giftBox.classList.add("opened");

    giftCard.classList.add("revealed");

    openGiftBtn.style.opacity = "0";
    openGiftBtn.style.pointerEvents = "none";

});

giftNextBtn.addEventListener("click", () => {

    showScene(endingScene);
    showEnding();

});