const API = "https://memoryvault-backend-production.up.railway.app/api/gifts";

const token = localStorage.getItem("token");

const title = document.getElementById("title");
const description = document.getElementById("description");
const driveUrl = document.getElementById("driveUrl");
const giftDate = document.getElementById("giftDate");
const giftType = document.getElementById("giftType");
const giftId = document.getElementById("giftId");

const saveBtn = document.getElementById("saveBtn");

const table = document.getElementById("giftTableBody");

document.getElementById("backBtn").onclick = () => {

    window.location.href = "dashboard.html";

}

loadGifts();

async function loadGifts() {

    const response = await fetch(API, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const gifts = await response.json();

    table.innerHTML = "";

    gifts.forEach(gift => {

        table.innerHTML += `

<tr>

<td>${gift.id}</td>

<td>${gift.title}</td>

<td>${gift.giftType}</td>

<td>${gift.giftDate}</td>

<td>

<button
class="edit"
onclick="editGift(${gift.id})">

Edit

</button>

<button
class="delete"
onclick="deleteGift(${gift.id})">

Delete

</button>

</td>

</tr>

`;

    });

}

saveBtn.onclick = async () => {

    const gift = {

        title: title.value,

        description: description.value,

        driveUrl: driveUrl.value,

        giftDate: giftDate.value,

        giftType: giftType.value

    };

    if (giftId.value == "") {

        await fetch(API, {

            method: "POST",

            headers: {

                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"

            },

            body: JSON.stringify(gift)

        });

    }

    else {

        await fetch(`${API}/${giftId.value}`, {

            method: "PUT",

            headers: {

                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"

            },

            body: JSON.stringify(gift)

        });

    }

    clearForm();

    loadGifts();

}

async function editGift(id) {

    const response = await fetch(`${API}/${id}`, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const gift = await response.json();

    giftId.value = gift.id;

    title.value = gift.title;

    description.value = gift.description;

    driveUrl.value = gift.driveUrl;

    giftDate.value = gift.giftDate;

    giftType.value = gift.giftType;

    saveBtn.innerText = "Update Gift";

}

async function deleteGift(id) {

    if (!confirm("Delete Gift?"))
        return;

    await fetch(`${API}/${id}`, {

        method: "DELETE",

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    loadGifts();

}

function clearForm() {

    giftId.value = "";

    title.value = "";

    description.value = "";

    driveUrl.value = "";

    giftDate.value = "";

    giftType.value = "";

    saveBtn.innerText = "Save Gift";

}