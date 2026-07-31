const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

fetch(`https://memoryvault-backend-production.up.railway.app/api/diary/${id}`,{

    headers:{
        Authorization:`Bearer ${token}`
    }

})

.then(r=>r.json())

.then(memory=>{

    document.getElementById("title").innerHTML=memory.title;

    document.getElementById("date").innerHTML=
        "❤️ "+formatDate(memory.memoryDate);

    document.getElementById("content").innerHTML=
        memory.content;

});

document.getElementById("backBtn").onclick=()=>{

    history.back();

};

function formatDate(date){

    return new Date(date).toLocaleDateString("en-GB",{

        day:"numeric",
        month:"long",
        year:"numeric"

    });

}

setTimeout(()=>{

    const music=document.getElementById("bgMusic");

    music.volume=.50;

    music.play().catch(()=>{

        console.log("Autoplay blocked by browser.");

    });

},1000);