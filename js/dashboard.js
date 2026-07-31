const token = localStorage.getItem("token");

if(!token){

    window.location.href="../../index.html";

}

loadAdmin();

async function loadAdmin(){

    const response = await fetch(

        "https://memoryvault-backend-production.up.railway.app/api/users/me",

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    const user=await response.json();

    document.getElementById("adminName").textContent=user.username;

}

function openDiary(){

    window.location.href="diary.html";

}

function openGallery(){

    window.location.href="gallery.html";

}

function openGifts(){

    window.location.href="gifts.html";

}

function openVoices(){

    window.location.href="voices.html";

}

function openUsers(){

    window.location.href="users.html";

}

function logout(){

    localStorage.clear();

    sessionStorage.clear();

    window.location.href="../../index.html";

}