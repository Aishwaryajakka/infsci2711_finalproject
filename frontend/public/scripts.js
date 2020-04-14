var form = document.getElementById("form");
var results = document.getElementById("results");

var beachball = document.createElement("div");
beachball.setAttribute("class", "beachball");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    results.innerHTML = "";
    results.appendChild(beachball);

    var formData = new FormData(form);
    fetch(event.target.action, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    }).then(function (res) {
        return res.text();
    }).then(function (resultHTML) {
        results.innerHTML = resultHTML;
    }).catch(function (err) {
        console.log(err);
    });
});
