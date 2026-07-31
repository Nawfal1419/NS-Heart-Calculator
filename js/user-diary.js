const API="https://memoryvault-backend-production.up.railway.app/api/diary";

const token=localStorage.getItem("token");

const container=document.getElementById("memoryContainer");

load();

async function load(){

    const response=await fetch(API,{

        headers:{
            Authorization:`Bearer ${token}`
        }

    });

    const diaries=await response.json();

    container.innerHTML="";

    diaries.sort((a,b)=>new Date(a.memoryDate)-new Date(b.memoryDate));

    diaries.forEach(d=>{

        container.innerHTML+=`

        <div class="memory">

            <div class="date">
                ❤️ ${formatDate(d.memoryDate)}
            </div>

            <div class="title">

                ${d.title}

            </div>

            <div class="preview">

                ${d.content.substring(0,180)}...

            </div>

            <button
            class="read-btn"
            onclick="openMemory(${d.id})">

                Read Memory ❤️

            </button>

        </div>

        `;

    });

}

function formatDate(date){

    return new Date(date).toLocaleDateString("en-GB",{

        day:"numeric",
        month:"long",
        year:"numeric"

    });

}

function openMemory(id){

    window.location.href=`memory.html?id=${id}`;

}

const backBtn = document.getElementById("backBtn");

if(backBtn){

    backBtn.onclick = () => {

        window.location.href = "dashboard.html";

    };

}