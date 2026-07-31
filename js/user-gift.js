const API = "https://memoryvault-backend-production.up.railway.app/api/gifts";

const token = localStorage.getItem("token");

const container = document.getElementById("giftContainer");

loadGifts();

async function loadGifts() {

    const response = await fetch(API, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    const gifts = await response.json();

    gifts.sort((a, b) => new Date(a.giftDate) - new Date(b.giftDate));

    container.innerHTML = "";

    gifts.forEach(gift => {

        container.innerHTML += `

<div class="card">

<div class="type">

${getEmoji(gift.giftType)} ${gift.giftType}

</div>

<div class="title">

${gift.title}

</div>

<div class="description">

${gift.description}

</div>

<div class="date">

❤️ ${formatDate(gift.giftDate)}

</div>

<button onclick='openGift(${JSON.stringify(gift)})'>

Open Gift

</button>

</div>

`;

    });

}

const viewer=document.getElementById("viewer");

const viewerImage=document.getElementById("viewerImage");

const viewerVideo=document.getElementById("viewerVideo");

const viewerPdf=document.getElementById("viewerPdf");

const viewerTitle=document.getElementById("viewerTitle");

const viewerDescription=document.getElementById("viewerDescription");

const viewerDate=document.getElementById("viewerDate");

function openGift(gift){

    const url=`https://memoryvault-backend-production.up.railway.app/api/gifts/file/${gift.id}`;

    viewer.style.display="flex";

    viewerImage.style.display="none";
    viewerVideo.style.display="none";
    viewerPdf.style.display="none";

    viewerTitle.innerText=gift.title;
    viewerDescription.innerText=gift.description;
    viewerDate.innerText=formatDate(gift.giftDate);

    if(gift.giftType==="IMAGE"){

        viewerImage.src=url;
        viewerImage.style.display="block";

    }

    else if(gift.giftType==="VIDEO"){

        viewerVideo.src=url;
        viewerVideo.style.display="block";

    }

    else{

        viewerPdf.src=url;
        viewerPdf.style.display="block";

    }

}

function getEmoji(type){

    switch(type){

        case "IMAGE":
            return "🖼️";

        case "VIDEO":
            return "🎥";

        case "PDF":
            return "📄";

        case "LETTER":
            return "💌";

        default:
            return "🎁";
    }

}

function formatDate(date){

    return new Date(date).toLocaleDateString("en-GB",{

        day:"numeric",
        month:"long",
        year:"numeric"

    });

}

document.getElementById("closeViewer").onclick = () => {

    viewer.style.display = "none";

    viewerVideo.pause();

}

viewer.onclick = (e) => {

    if (e.target === viewer) {

        viewer.style.display = "none";

        viewerVideo.pause();

    }

}

const backBtn = document.getElementById("backBtn");

if(backBtn){

    backBtn.onclick = () => {

        window.location.href = "dashboard.html";

    };

}