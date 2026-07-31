const API_URL = "https://memoryvault-backend-production.up.railway.app/api/diary";

const token = localStorage.getItem("token");

const title = document.getElementById("title");
const memoryDate = document.getElementById("memoryDate");
const content = document.getElementById("content");
const saveBtn = document.getElementById("saveBtn");
const diaryId = document.getElementById("diaryId");
const diaryTableBody = document.getElementById("diaryTableBody");

document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "dashboard.html";
});

window.onload = () => {
    loadDiaries();
};

async function loadDiaries() {

    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const diaries = await response.json();

    diaryTableBody.innerHTML = "";

    diaries.forEach(diary => {

        diaryTableBody.innerHTML += `
            <tr>
                <td>${diary.id}</td>
                <td>${diary.memoryDate}</td>
                <td>${diary.title}</td>
                <td>${diary.createdAt.replace("T"," ")}</td>

                <td>

                    <button class="edit-btn"
                        onclick="editDiary(${diary.id})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteDiary(${diary.id})">
                        Delete
                    </button>

                </td>

            </tr>
        `;

    });

}

saveBtn.addEventListener("click", async () => {

    const diary = {

        title: title.value,
        content: content.value,
        memoryDate: memoryDate.value

    };

    if (diaryId.value == "") {

        await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(diary)

        });

    } else {

        await fetch(`${API_URL}/${diaryId.value}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(diary)

        });

    }

    clearForm();

    loadDiaries();

});

async function editDiary(id) {

    const response = await fetch(`${API_URL}/${id}`, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    const diary = await response.json();

    diaryId.value = diary.id;
    title.value = diary.title;
    content.value = diary.content;
    memoryDate.value = diary.memoryDate;

    saveBtn.innerText = "Update Memory";

}

async function deleteDiary(id) {

    if (!confirm("Delete this memory?"))
        return;

    await fetch(`${API_URL}/${id}`, {

        method: "DELETE",

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    loadDiaries();

}

function clearForm() {

    diaryId.value = "";
    title.value = "";
    content.value = "";
    memoryDate.value = "";

    saveBtn.innerText = "Save Memory";


}