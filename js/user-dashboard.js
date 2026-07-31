const token = localStorage.getItem("token");

if(!token){

    location.href="../../index.html";

}

async function loadUser(){

    const response=await fetch("https://memoryvault-backend-production.up.railway.app/api/users/me",{

        headers:{
            Authorization:`Bearer ${token}`
        }

    });

    if(!response.ok){

        location.href="../../index.html";
        return;

    }

    const user=await response.json();

    document.getElementById("welcomeText").innerHTML=
        `Welcome ${user.username} ❤️`;

}

loadUser();


document.getElementById("memoryCard").onclick=()=>{

    location.href="diary.html";

}

document.getElementById("galleryCard").onclick = () => {

    location.href = "gallery.html";

}

document.getElementById("giftCard").onclick = () => {

    location.href = "gifts.html";

}

document.getElementById("musicCard").onclick = () => {

    location.href = "voices.html";

}

document.getElementById("logoutBtn").onclick = () => {

    localStorage.removeItem("token");

    window.location.href = "../../index.html"; // or your calculator page

}