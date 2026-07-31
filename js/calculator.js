    let unlockMode = false;
    let enteredSecretCode = "";

    let display = document.getElementById('display');
    const calculator = document.querySelector('.calculator');
    const giftContainer = document.getElementById('gift-container');
    const giftBox = document.getElementById('gift-box');
    const videoFrame = document.getElementById('video-frame');
    const video = document.getElementById('surprise-video');

        function append(value) {

        // Normal calculator mode
        if (!unlockMode) {

            if (display.textContent === "0")
                display.textContent = "";

            display.textContent += value;
            return;
        }

        // Unlock Mode

        if (display.textContent === "Enter your DOB : ") {
            display.textContent = "";
        }

        display.textContent += value;
    }

    function clearDisplay() {
        display.textContent = '0';

        // Hide gift/video if visible
        if (giftContainer) giftContainer.style.display = 'none';
        videoFrame.style.display = 'none';
        calculator.style.display = 'block';
        calculator.classList.remove('bloom-out');
    }

    function deleteLast() {
        if (display.textContent.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
        } else {
            display.textContent = '0';
        }
    }

    function calculate() {
        const raw = display.textContent.trim();
        if (unlockMode) {

            unlockMemoryVault(raw);

            return;
        }
        // Hide any active gift/video
        if (giftContainer) giftContainer.style.display = 'none';
            calculator.style.display = 'block';

        // ❤️ Secret Codes
        if(raw === "1419"){

            unlockMode = true;
            enteredSecretCode = "1419";

            display.textContent = "Enter your DOB : ";

            return;
        } 
        else if (raw === '1082010' || raw === '1082011') {
            display.textContent = '𝙃𝙖𝙥𝙥𝙮 𝘽𝙞𝙧𝙩𝙝𝙙𝙖𝙮 𝙅𝙚𝙧𝙧𝙮👸🏻🫂';
        } 
        else if (raw === '1082010+13052006' || raw === '1082011+13052006') {
            display.textContent = 'ᴡɪʟʟ ʏᴏᴜ ᴍᴀʀʀʏ ᴍᴇ?💍🤌🏻';
        } 
        else if (raw === '13112022') {
            display.textContent = '';
            calculator.classList.add('bloom-out');

            setTimeout(() => {
                calculator.style.display = 'none';
                giftContainer.style.display = 'flex';
                giftBox.style.display = 'block';
                giftBox.classList.remove('blast');
                videoFrame.style.display = 'none';
                video.src = '';

                giftBox.onclick = () => {
                    giftBox.classList.add('blast');

                    setTimeout(() => {
                        giftBox.style.display = 'none';
                        window.open("https://drive.google.com/file/d/1lTMTr8jGWzRH9XpSSO8gHfA5BMSGpuVj/view?usp=sharing", "_blank");
                    }, 800);
                };

                setTimeout(() => {
                    video.src = '';
                    videoFrame.style.display = 'none';
                    giftContainer.style.display = 'none';
                    calculator.style.display = 'block';
                    calculator.classList.remove('bloom-out');
                    display.textContent = '0';
                }, 40000);
            }, 600);
        } 
        
        // ✅ Add this final else block to handle normal math calculations
        else {
            try {
                const expression = raw
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/−/g, '-')   // Unicode minus to normal minus
                    .replace(/%/g, '/100'); // Optional: Treat 50% as 0.5

                display.textContent = eval(expression);
            } catch {
                display.textContent = 'Error';
            }
        }
    }

    async function unlockMemoryVault(dob) {

        if (dob.length === 8) {
            dob = `${dob.substring(0,2)}-${dob.substring(2,4)}-${dob.substring(4,8)}`;
        }

        console.log({
            secretCode: enteredSecretCode,
            dob: dob
        });

        try {

            const response = await fetch(
                "https://memoryvault-backend-production.up.railway.app/api/auth/unlock",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        secretCode: enteredSecretCode,
                        dob: dob
                    })
                }
            );

            const data = await response.json();

            console.log("Unlock Response:", data);

            if (data.success) {

                console.log("Step 1");

                localStorage.setItem("token", data.token);

                console.log("Step 2");

                const userResponse = await fetch(
                    "https://memoryvault-backend-production.up.railway.app/api/users/me",
                    {
                        headers: {
                            Authorization: `Bearer ${data.token}`
                        }
                    }
                );

                console.log("Step 3");
                console.log("Status:", userResponse.status);

                const user = await userResponse.json();

                console.log("Step 4");
                console.log(user);

                if (user.role === "ADMIN") {
                    console.log("Admin");
                    window.location.href = "pages/admin/dashboard.html";
                } else {
                    console.log("User");
                    window.location.href = "pages/user/love.html";
                }

                return;
            }

        } catch (error) {

            console.error("Unlock Error:", error);

        }

        unlockMode = false;
        enteredSecretCode = "";
        display.textContent = "0";
    }

    // Service Worker
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js")
            .then(reg => console.log("Service worker registered 💖", reg))
            .catch(err => console.error("Service worker failed 😢", err));
    }
