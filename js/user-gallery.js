const API="https://memoryvault-backend-production.up.railway.app/api/gallery";

const token=localStorage.getItem("token");

const container=document.getElementById("galleryContainer");

const viewer=document.getElementById("viewer");

const viewerImage=document.getElementById("viewerImage");

const viewerTitle=document.getElementById("viewerTitle");

const viewerDate=document.getElementById("viewerDate");

loadGallery();

async function loadGallery(){

const response=await fetch(API,{

headers:{
Authorization:`Bearer ${token}`
}

});

const images=await response.json();

images.sort((a,b)=>new Date(a.memoryDate)-new Date(b.memoryDate));

container.innerHTML="";

images.forEach(img=>{

const imageEndpoint =
    `https://memoryvault-backend-production.up.railway.app/api/gallery/image/${img.id}`;

container.innerHTML += `

<div class="card"
onclick='openViewer(
"${imageEndpoint}",
"${img.title}",
"${formatDate(img.memoryDate)}"
)'>

<img src="${imageEndpoint}">

<div class="info">

<div class="date">
❤️ ${formatDate(img.memoryDate)}
</div>

<div class="title">
${img.title}
</div>

</div>

</div>

`;

});

}

function openViewer(image,title,date){

viewer.style.display="flex";

viewerImage.src=image;

viewerTitle.innerText=title;

viewerDate.innerText=date;

}

document.getElementById("closeViewer").onclick=()=>{

viewer.style.display="none";

}

viewer.onclick=(e)=>{

if(e.target===viewer)

viewer.style.display="none";

}

function formatDate(date){

return new Date(date).toLocaleDateString("en-GB",{

day:"numeric",
month:"long",
year:"numeric"

});

}

const backBtn = document.getElementById("backBtn");

if(backBtn){

    backBtn.onclick = () => {

        window.location.href = "dashboard.html";

    };

}