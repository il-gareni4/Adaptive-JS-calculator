$(function () {
    const input = $("input")[0]

    function equal() {
        let answer = eval(input.value.replace("^", "**")
            .replace("x", "*")
            .replace(",", "."));
        input.value = String(answer).replace(".", ",");
    }
    function del() {
        let isEditable = !input.value.includes("Infinity") && !input.value.includes("NaN");
        if (isEditable) {
            input.value = input.value.slice(0, -1);
        }
    }

    $(".digit").click(function (event) {
        let isEditable = !input.value.includes("Infinity") && !input.value.includes("NaN");
        if (isEditable) {
            input.value += event.target.innerHTML;
        }
    });

    $(".operator").click(function (event) {
        let isEditable = !input.value.includes("Infinity") && !input.value.includes("NaN");
        if (isEditable) {
            input.value += event.target.innerHTML;
        }
    });

    $(".pow").click(function () {
        let isEditable = !input.value.includes("Infinity") && !input.value.includes("NaN");
        if (isEditable) {
            input.value += "^";
        }
    });

    $(".equal").click(equal);

    $(".delete").click(del);

    $(".c").click(function () {
        input.value = "";
    });

    $(".ce").click(function () {
        let search = input.value.match(/\d+/gm);
        if (input.value) {
            if (input.value[input.value.length - 1].search(/\d/) !== -1) {
                input.value = input.value.slice(0, -search[search.length - 1].length);
            }
        }
    });

    $(".color").click(function (event) {
        for (let elem of $(`[data-color-scheme]`)) {
            elem.dataset.colorScheme = event.target.classList[0];
            elem.style.transition = "background-color 1s, color 1s";
            elem.addEventListener("transitionend", () => elem.style.transition = "");
        }
        $(".color-active")[0].classList.toggle("color-active")
        event.target.classList.toggle("color-active")
    });

    document.addEventListener("keydown", function (event) {
        const operators = ["+", "*", "-", "/", ",", "^"];
        if (event.target.tagName !== "INPUT") {
            if (event.key.match(/\d/) || operators.includes(event.key)) {
                input.value += event.key;
            } else if (event.key === "Backspace") del();
            else if (event.key === "Enter") equal();
        }
    });

    input.addEventListener("keydown", function (event) {
        const operators = ["+", "*", "-", "/", ",", "^"];
        if (event.key.match(/\d/) || operators.includes(event.key)) {
            return true;
        }
        else if (event.key === "Enter") {
            let answer = eval(input.value.replace("^", "**")
                .replace("x", "*")
                .replace(",", "."));
            input.value = String(answer).replace(".", ",");
            return true;
        } else if (event.key === "Backspace") return true;
        event.preventDefault();
    });

    window.addEventListener("unload", function () {
        localStorage.setItem("colorScheme", document.body.dataset.colorScheme)
        sessionStorage.setItem("mathExp", input.value)
    });
});