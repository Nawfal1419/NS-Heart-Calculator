const API = "https://memoryvault-backend-production.up.railway.app/api/voices";

const token = localStorage.getItem("token");

const container = document.getElementById("voiceContainer");

const modal = document.getElementById("audioModal");

const player = document.getElementById("audioPlayer");

const modalTitle = document.getElementById("modalTitle");

const modalSpeaker = document.getElementById("modalSpeaker");

document.getElementById("backBtn").onclick = () => {

    window.location.href = "dashboard.html";

};

document.getElementById("closeModal").onclick = () => {

    player.pause();

    player.src = "";

    modal.style.display = "none";

};

window.onclick = e => {

    if(e.target===modal){

        player.pause();

        player.src="";

        modal.style.display="none";

    }

};

loadVoices();

async function loadVoices(){

    const response = await fetch(API,{

        headers:{

            Authorization:`Bearer ${token}`

        }

    });

    const voices = await response.json();

    voices.sort((a,b)=>

        new Date(a.voiceDate)-new Date(b.voiceDate)

    );

    container.innerHTML="";

    voices.forEach(voice=>{

        const side=voice.speaker==="NAWFAL"

        ?"left"

        :"right";

        const speaker=

        voice.speaker==="NAWFAL"

        ?"👦 Nawfal"

        :"👧 Jerry";

        container.innerHTML+=`

<div class="voice ${side}">

<div class="speaker">

${speaker}

</div>

<div class="title">

🎵 ${voice.title}

</div>

<div class="desc">

${voice.description}

</div>

<div class="date">

📅 ${voice.voiceDate}

</div>

<button

class="listen"

onclick="playVoice(${voice.id},

'${voice.title.replace(/'/g,"\\'")}',

'${speaker}')">

▶ Listen

</button>

</div>

`;

    });

}

function playVoice(id,title,speaker){

    modal.style.display="flex";

    modalTitle.innerText=title;

    modalSpeaker.innerText=speaker;

    player.src=`${API}/audio/${id}`;

    player.play();

}