const scriptURL =
    "https://script.google.com/macros/s/AKfycbzt4WwXnNjz8KrVgqMU-5Q1nMCUnnZ05XHZPSuU1--0qWKAO1tggd6VnegPgL1lc4TsiA/exec";
const form = document.getElementById("myForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById("message-psuedo-name"),
        message: document.getElementById("message-text")
    };

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    })
    //need to implement this afterwardss :popup message
        .then((res) => res.json())
        .then((res) => {
            msg.innerText = "✅ Data saved to Google Sheets!";
            form.reset();
        })
        .catch((err) => {
            msg.innerText = "❌ Error: " + err;
        });

});
