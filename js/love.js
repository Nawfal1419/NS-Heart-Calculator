const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const emoji = document.getElementById("emoji");
const message = document.getElementById("message");

const hearts = document.querySelectorAll(".heart");

let attempt = 0;

const stages = [

    {
        emoji:"😒",
        message:"Really...?",
        width:"50%",
        height:"90px",
        font:"38px"
    },

    {
        emoji:"🙄",
        message:"Nice try...",
        width:"58%",
        height:"110px",
        font:"42px"
    },

    {
        emoji:"😑",
        message:"Hmm... Still thinking?",
        width:"66%",
        height:"140px",
        font:"46px"
    },

    {
        emoji:"😏",
        message:"You're making this difficult.",
        width:"74%",
        height:"170px",
        font:"52px"
    },

    {
        emoji:"😤",
        message:"I'm not giving up!",
        width:"82%",
        height:"210px",
        font:"58px"
    },

    {
        emoji:"🥺",
        message:"Please...? ❤️",
        width:"90%",
        height:"250px",
        font:"66px"
    },

    {
        emoji:"❤️",
        message:"I Love You Too❤️ Let's relive our memories together.",
        width:"100%",
        height:"100%",
        font:"82px"
    }

];

function heartbeat(){

    yesBtn.classList.remove("heartbeat");

    void yesBtn.offsetWidth;

    yesBtn.classList.add("heartbeat");

}

function createHeart(){

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.className = "floating-heart";

    heart.style.left = (Math.random() * 80 + 10) + "%";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 2000);

}

function updateStage(){

    const stage = stages[attempt];

    emoji.textContent = stage.emoji;
    message.textContent = stage.message;

    yesBtn.style.width = stage.width;
    yesBtn.style.height = stage.height;
    yesBtn.style.fontSize = stage.font;

    heartbeat();
    const noWidths = [

        "50%",
        "42%",
        "34%",
        "26%",
        "18%",
        "10%",
        "0%"

    ];

    noBtn.style.transform = `
        translateY(${attempt * 4}px)
        scale(${1 - attempt * 0.06})
        `;

    if(attempt < hearts.length){

        hearts[attempt].textContent = "❤️";
        hearts[attempt].classList.add("active");

    }

}

noBtn.addEventListener("click",()=>{

    if(attempt >= 6)
        return;

    attempt++;

    updateStage();

    createHeart();

    if(attempt >= 5){

        yesBtn.classList.add("big-love");

    }

    if(attempt === 6){

        noBtn.style.opacity = "0";

        noBtn.style.pointerEvents = "none";

        setTimeout(()=>{

            noBtn.style.display = "none";

        },500);

        yesBtn.style.left = "0";
        yesBtn.style.top = "0";

        yesBtn.style.width = "100%";
        yesBtn.style.height = "100%";

        yesBtn.style.borderRadius = "0";

        emoji.textContent="❤️";
        message.textContent="I Love You Too❤️ Let's relive our memories together.";

    }

});

yesBtn.addEventListener("click",()=>{

    yesBtn.classList.add("heartbeat");

    emoji.textContent="❤️";

    message.textContent="Opening MemoryVault...";

    playArea.innerHTML=`

    <div class="loader"></div>

    `;

    setTimeout(()=>{

    window.location.href="transition.html";

    },1800);

});