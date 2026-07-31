const API = "https://memoryvault-backend-production.up.railway.app/api/gallery";

const token = localStorage.getItem("token");

const title = document.getElementById("title");
const imageUrl = document.getElementById("imageUrl"); // Input box (can keep this ID)
const memoryDate = document.getElementById("memoryDate");
const galleryId = document.getElementById("galleryId");

const saveBtn = document.getElementById("saveBtn");

const table = document.getElementById("galleryTableBody");

document.getElementById("backBtn").onclick = () => {

    window.location.href = "dashboard.html";

}

loadGallery();

async function loadGallery() {

    const response = await fetch(API, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    const images = await response.json();

    table.innerHTML = "";

    images.forEach(img => {

        table.innerHTML += `

<tr>

<td>${img.id}</td>

<td>

<img src="https://memoryvault-backend-production.up.railway.app/api/gallery/image/${img.id}"
     width="120">

</td>

<td>${img.title}</td>

<td>${img.memoryDate}</td>

<td>

<button
class="edit"
onclick="editImage(${img.id})">

Edit

</button>

<button
class="delete"
onclick="deleteImage(${img.id})">

Delete

</button>

</td>

</tr>

`;

    });

}

saveBtn.onclick = async () => {

    const image = {

        title: title.value,

        driveUrl: imageUrl.value,

        memoryDate: memoryDate.value

    };

    if (galleryId.value == "") {

        await fetch(API, {

            method: "POST",

            headers: {

                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"

            },

            body: JSON.stringify(image)

        });

    } else {

        await fetch(`${API}/${galleryId.value}`, {

            method: "PUT",

            headers: {

                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"

            },

            body: JSON.stringify(image)

        });

    }

    clearForm();

    loadGallery();

}

async function editImage(id) {

    const response = await fetch(`${API}/${id}`, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const image = await response.json();

    galleryId.value = image.id;

    title.value = image.title;

    imageUrl.value = image.driveUrl;

    memoryDate.value = image.memoryDate;

    saveBtn.innerText = "Update Image";

}

async function deleteImage(id) {

    if (!confirm("Delete Image?"))
        return;

    await fetch(`${API}/${id}`, {

        method: "DELETE",

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    loadGallery();

}

function clearForm() {

    galleryId.value = "";

    title.value = "";

    imageUrl.value = "";

    memoryDate.value = "";

    saveBtn.innerText = "Save Image";

}