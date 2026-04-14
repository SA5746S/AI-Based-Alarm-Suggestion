// // =========================
// // 🌙 THEME TOGGLE
// // =========================
// function toggleTheme() {
//     document.body.classList.toggle("light");
// }


// // =========================
// // ⏰ TIME CONVERSION (AM/PM → 24H)
// // =========================
// function getTime24() {
//     let h = parseInt(document.getElementById("hour").value);
//     let m = document.getElementById("minute").value.padStart(2, '0');
//     let ampm = document.getElementById("ampm").value;

//     if (ampm === "PM" && h !== 12) h += 12;
//     if (ampm === "AM" && h === 12) h = 0;

//     return `${h.toString().padStart(2, '0')}:${m}`;
// }


// // =========================
// // 🤖 FETCH AI SUGGESTION
// // =========================
// async function getSuggestion() {

//     const time = getTime24();
//     const date = document.getElementById("date").value;
//     const goal = document.getElementById("goal").value;

//     if (!time) {
//         alert("Please enter time!");
//         return;
//     }

//     const res = await fetch("/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             sleep_time: time,
//             date: date,
//             goal: goal
//         })
//     });

//     const data = await res.json();

//     if (data.status !== "success") {
//         alert(data.message);
//         return;
//     }

//     localStorage.setItem("results", JSON.stringify(data.data));
//     localStorage.setItem("best", JSON.stringify(data.best));

//     window.location.href = "/result";
// }


// // =========================
// // ⏰ SET ALARM
// // =========================
// function setAlarm(time) {
//     localStorage.setItem("alarmTime", time);
//     alert("⏰ Alarm set for " + time);
// }


// // =========================
// // 🔔 STOP ALARM
// // =========================
// function stopAlarm() {
//     const audio = document.getElementById("alarmSound");
//     audio.pause();
//     audio.currentTime = 0;

//     localStorage.removeItem("alarmTime");
//     alert("🔕 Alarm stopped");
// }


// // =========================
// // 🔥 TRIGGER ALARM
// // =========================
// function triggerAlarm() {
//     const audio = document.getElementById("alarmSound");

//     if (!audio) return;

//     audio.loop = true;

//     audio.play().catch(() => {
//         alert("⚠️ Click anywhere once to enable sound!");
//     });

//     alert("⏰ WAKE UP! ALARM RINGING!");
// }


// // =========================
// // ⏳ ALARM CHECKER (REAL-TIME)
// // =========================
// function startAlarmChecker() {
//     setInterval(() => {

//         const alarmTime = localStorage.getItem("alarmTime");
//         if (!alarmTime) return;

//         const now = new Date();
//         const currentTime =
//             now.getHours().toString().padStart(2, '0') + ":" +
//             now.getMinutes().toString().padStart(2, '0');

//         if (currentTime === alarmTime) {
//             triggerAlarm();
//         }

//     }, 1000);
// }


// // =========================
// // 📄 PAGE LOAD HANDLER
// // =========================
// document.addEventListener("DOMContentLoaded", () => {

//     startAlarmChecker(); // 🔥 always running

//     const path = window.location.pathname;

//     // =========================
//     // 📊 RESULT PAGE
//     // =========================
//     if (path === "/result") {

//         const results = JSON.parse(localStorage.getItem("results"));
//         const div = document.getElementById("results");

//         if (!results || results.length === 0) {
//             div.innerHTML = "<p>No data found!</p>";
//             return;
//         }

//         div.innerHTML = "";

//         results.forEach((item, i) => {

//             let cls = "good";
//             if (item.score >= 90) cls = "best";
//             else if (item.score >= 80) cls = "better";

//             setTimeout(() => {
//                 const card = document.createElement("div");
//                 card.className = `card ${cls}`;

//                 card.innerHTML = `
//                     <h2>${item.time}</h2>
//                     <p>${item.day} • ${item.tag}</p>
//                     <p>${item.cycles} Cycles</p>
//                     <p>Score: ${item.score}%</p>
//                     <b>${item.quality}</b>
//                 `;

//                 card.addEventListener("click", () => selectCard(item));
//                 div.appendChild(card);

//             }, i * 300);
//         });
//     }


//     // =========================
//     // 🎯 FINAL PAGE
//     // =========================
//     if (path === "/final") {

//         const data = JSON.parse(localStorage.getItem("selected"));
//         const box = document.getElementById("finalBox");

//         if (!data) {
//             box.innerHTML = "<p>No selection found!</p>";
//             return;
//         }

//         box.innerHTML = `
//             <div class="card best glow">
//                 <h1>${data.time}</h1>
//                 <p>${data.day} • ${data.tag}</p>
//                 <p>${data.cycles} Cycles</p>
//                 <p>Score: ${data.score}%</p>
//                 <h3>🔥 BEST WAKE-UP TIME</h3>

//                 <button onclick="setAlarm('${data.time}')">⏰ Set Alarm</button>
//                 <button onclick="stopAlarm()">🔕 Stop Alarm</button>
//             </div>
//         `;
//     }

// });


// // =========================
// // 🎯 SELECT CARD
// // =========================
// function selectCard(item) {
//     localStorage.setItem("selected", JSON.stringify(item));
//     window.location.href = "/final";
// }


// // =========================
// // 🔙 BACK
// // =========================
// function goBack() {
//     window.location.href = "/home";
// }



// =========================
// 🌙 THEME TOGGLE
// =========================
function toggleTheme() {
    document.body.classList.toggle("light");
}


// =========================
// ⏰ TIME CONVERSION (AM/PM → 24H)
// =========================
function getTime24() {
    let h = parseInt(document.getElementById("hour").value);
    let m = document.getElementById("minute").value.padStart(2, '0');
    let ampm = document.getElementById("ampm").value;

    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;

    return `${h.toString().padStart(2, '0')}:${m}`;
}


// =========================
// 🤖 FETCH AI SUGGESTION
// =========================
async function getSuggestion() {

    const time = getTime24();
    const date = document.getElementById("date").value;
    const goal = document.getElementById("goal").value;

    if (!time) {
        alert("Please enter time!");
        return;
    }

    const res = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            sleep_time: time,
            date: date,
            goal: goal
        })
    });

    const data = await res.json();

    if (data.status !== "success") {
        alert(data.message);
        return;
    }

    localStorage.setItem("results", JSON.stringify(data.data));
    localStorage.setItem("best", JSON.stringify(data.best));

    window.location.href = "/result";
}


// =========================
// 🎯 SELECT CARD
// =========================
function selectCard(item) {
    localStorage.setItem("selected", JSON.stringify(item));
    window.location.href = "/final";
}


// =========================
// 🔙 BACK
// =========================
function goBack() {
    window.location.href = "/home";
}


// =========================
// ⏰ ALARM STORAGE
// =========================
function setAlarm(time) {
    localStorage.setItem("alarmTime", time);
    alert("⏰ Alarm set for " + time);
}


// =========================
// 🔕 STOP ALARM
// =========================
function stopAlarm() {
    const audio = document.getElementById("alarmSound");

    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.loop = false;
    }

    localStorage.removeItem("alarmTime");

    alert("🔕 Alarm stopped");
}


// =========================
// 🔊 TRIGGER ALARM
// =========================
function triggerAlarm() {
    const audio = document.getElementById("alarmSound");

    if (audio) {
        audio.loop = true;

        audio.play().catch(() => {
            alert("⚠️ Click once anywhere to enable sound!");
        });
    }

    alert("⏰ WAKE UP! ALARM RINGING!");
}


// =========================
// ⏳ AUTO ALARM CHECKER
// =========================
let alarmInterval = null;

function startAlarmChecker() {

    if (alarmInterval) clearInterval(alarmInterval);

    alarmInterval = setInterval(() => {

        const alarmTime = localStorage.getItem("alarmTime");
        if (!alarmTime) return;

        const now = new Date();

        const currentTime =
            now.getHours().toString().padStart(2, '0') + ":" +
            now.getMinutes().toString().padStart(2, '0');

        if (currentTime === alarmTime) {
            triggerAlarm();
            localStorage.removeItem("alarmTime");
        }

    }, 1000);
}


// =========================
// ▶️ START ALARM FROM FINAL PAGE
// =========================
function startAlarmFromFinal() {

    const data = JSON.parse(localStorage.getItem("selected"));

    if (!data || !data.time) {
        alert("No alarm time found!");
        return;
    }

    localStorage.setItem("alarmTime", data.time);

    alert("⏰ Alarm Started for " + data.time);
}


// =========================
// 📄 PAGE LOAD HANDLER
// =========================
document.addEventListener("DOMContentLoaded", () => {

    startAlarmChecker();

    const path = window.location.pathname;


    // =========================
    // 📊 RESULT PAGE
    // =========================
    if (path === "/result") {

        const results = JSON.parse(localStorage.getItem("results"));
        const div = document.getElementById("results");

        if (!results || results.length === 0) {
            div.innerHTML = "<p>No data found!</p>";
            return;
        }

        div.innerHTML = "";

        results.forEach((item, i) => {

            let cls = "good";
            if (item.score >= 90) cls = "best";
            else if (item.score >= 80) cls = "better";

            setTimeout(() => {
                const card = document.createElement("div");
                card.className = `card ${cls}`;

                card.innerHTML = `
                    <h2>${item.time}</h2>
                    <p>${item.day} • ${item.tag}</p>
                    <p>${item.cycles} Cycles</p>
                    <p>Score: ${item.score}%</p>
                    <b>${item.quality}</b>
                `;

                card.addEventListener("click", () => selectCard(item));
                div.appendChild(card);

            }, i * 300);
        });
    }


    // =========================
    // 🎯 FINAL PAGE
    // =========================
    if (path === "/final") {

        const data = JSON.parse(localStorage.getItem("selected"));
        const box = document.getElementById("finalBox");

        if (!data) {
            box.innerHTML = "<p>No selection found!</p>";
            return;
        }

        box.innerHTML = `
            <div class="card best glow">
                <h1>${data.time}</h1>
                <p>${data.day} • ${data.tag}</p>
                <p>${data.cycles} Cycles</p>
                <p>Score: ${data.score}%</p>

                <h3>🔥 BEST WAKE-UP TIME</h3>

                <button onclick="startAlarmFromFinal()">▶️ Start Alarm</button>
                <button onclick="stopAlarm()">🔕 Stop Alarm</button>
            </div>
        `;
    }

});