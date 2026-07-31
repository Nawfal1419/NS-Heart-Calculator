const API = "https://memoryvault-backend-production.up.railway.app/api/voices";

const token = localStorage.getItem("token");

const title = document.getElementById("title");
const description = document.getElementById("description");
const driveUrl = document.getElementById("driveUrl");
const voiceDate = document.getElementById("voiceDate");
const speaker = document.getElementById("speaker");
const voiceId = document.getElementById("voiceId");

const saveBtn = document.getElementById("saveBtn");

const table = document.getElementById("voiceTableBody");

document.getElementById("backBtn").onclick = () => {

    window.location.href = "dashboard.html";

}

loadVoices();

async function loadVoices() {

    const response = await fetch(API, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const voices = await response.json();

    table.innerHTML = "";

    voices.forEach(voice => {

        table.innerHTML += `

<tr>

<td>${voice.id}</td>

<td>${voice.title}</td>

<td>${voice.speaker}</td>

<td>${voice.voiceDate}</td>

<td>

<button
class="edit"
onclick="editVoice(${voice.id})">

Edit

</button>

<button
class="delete"
onclick="deleteVoice(${voice.id})">

Delete

</button>

</td>

</tr>

`;

    });

}

saveBtn.onclick = async () => {

    const voice = {

        title: title.value,

        description: description.value,

        driveUrl: driveUrl.value,

        voiceDate: voiceDate.value,

        speaker: speaker.value

    };

    if (voiceId.value == "") {

        await fetch(API, {

            method: "POST",

            headers: {

                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"

            },

            body: JSON.stringify(voice)

        });

    }

    else {

        await fetch(`${API}/${voiceId.value}`, {

            method: "PUT",

            headers: {

                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"

            },

            body: JSON.stringify(voice)

        });

    }

    clearForm();

    loadVoices();

}

async function editVoice(id) {

    const response = await fetch(`${API}/${id}`, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const voice = await response.json();

    voiceId.value = voice.id;

    title.value = voice.title;

    description.value = voice.description;

    driveUrl.value = voice.driveUrl;

    voiceDate.value = voice.voiceDate;

    speaker.value = voice.speaker;

    saveBtn.innerText = "Update Voice";

}

async function deleteVoice(id) {

    if (!confirm("Delete Voice?"))
        return;

    await fetch(`${API}/${id}`, {

        method: "DELETE",

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    loadVoices();

}

function clearForm() {

    voiceId.value = "";

    title.value = "";

    description.value = "";

    driveUrl.value = "";

    voiceDate.value = "";

    speaker.value = "NAWFAL";

    saveBtn.innerText = "Save Voice";

}