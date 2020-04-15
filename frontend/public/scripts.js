var form = document.getElementById("form");
var selectDatabaseOptions = document.getElementById("database");
var inputs = document.getElementsByTagName("input");
var submitButton = document.getElementById("submitButton");
var queryRuntime = document.getElementById("queryRuntime");
var results = document.getElementById("results");

var beachball = document.createElement("div");
beachball.setAttribute("class", "beachball");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    // get original form data entries
    var formData = new FormData(form);
    var formDataEntries = Object.fromEntries(formData.entries())

    // disable all select, radio and buttons
    selectDatabaseOptions.disabled = true;
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "radio") {
            inputs[i].disabled = true;
        }
    }
    submitButton.disabled = true;

    // insert loading beachball
    results.innerHTML = "";
    results.appendChild(beachball);

    var startTime = new Date().getTime();
    fetch(event.target.action, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataEntries)
    }).then(function (res) {
        return res.text();
    }).then(function (resultHTML) {
        results.innerHTML = resultHTML;
        var stopTime = new Date().getTime();
        var runtime = stopTime - startTime;
        queryRuntime.innerHTML = (runtime / 1000) + " seconds";
        // re-enable all select, radio and buttons
        selectDatabaseOptions.disabled = false;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type === "radio") {
                inputs[i].disabled = false;
            }
        }
        submitButton.disabled = false;
    }).catch(function (err) {
        console.log(err);
    });
});
