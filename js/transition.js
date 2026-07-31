const progressBar = document.getElementById("progressBar");

const percentage = document.getElementById("percentage");

const loadingText = document.getElementById("loadingText");

const welcome = document.getElementById("welcome");

/*
--------------------------------------------------

Later replace this entire section with

GET /api/users/me

using JWT.

--------------------------------------------------
*/

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "../index.html";

}

loadUser();

async function loadUser() {

    try {

        const response = await fetch(

            "https://memoryvault-backend-production.up.railway.app/api/users/me",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        if (!response.ok) {

            throw new Error("Unauthorized");

        }

        const user = await response.json();

        welcome.innerHTML =
            `Welcome Back,<br>${user.username} ❤️`;

    }

    catch (error) {

        localStorage.removeItem("token");

        window.location.href = "../index.html";

    }

}

const loadingMessages = [

    "Verifying your identity...",
    "Opening MemoryVault...",
    "Loading your memories...",
    "Almost there...",
    "Ready ❤️"

];

let progress = 0;

let messageIndex = 0;

const timer = setInterval(() => {

    progress++;

    progressBar.style.width = progress + "%";

    percentage.textContent = progress + "%";

    if(progress===15){

        loadingText.textContent=loadingMessages[0];

    }

    if(progress===35){

        loadingText.textContent=loadingMessages[1];

    }

    if(progress===60){

        loadingText.textContent=loadingMessages[2];

    }

    if(progress===85){

        loadingText.textContent=loadingMessages[3];

    }

    if(progress===100){

        loadingText.textContent=loadingMessages[4];

        clearInterval(timer);

        setTimeout(()=>{

            window.location.href="dashboard.html";

        },700);

    }

},30);