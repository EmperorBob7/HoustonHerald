let submit = document.getElementById("submit");
let n = document.getElementById("name");
let email = document.getElementById("email");
let question = document.getElementById("question");
let suggestion = document.getElementById("suggestion");

submit.addEventListener("click", async () => {
    if (n.value && email.value && question.value) {
        let obj = {
            "name": n.value,
            "email": email.value,
            "question": question.value,
            "suggestion": suggestion.value
        };
        let data = await fetch("/request", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });
        if (data.status == 429)
            data = { message: "Try again in 1 Minute, Too many requests!" };
        else
            data = await data.json();
        alert(data.message);
    } else {
        alert("Fill out required fields.");
    }
});