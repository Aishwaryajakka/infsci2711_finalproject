var form = document.getElementById("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
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
        var results = document.getElementById("results");
        results.innerHTML = resultHTML;
    }).catch(function (err) {
        console.log(err);
    });
});
