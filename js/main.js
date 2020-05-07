$(function () {
    const input = $("input")[0]

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

    $(".equal").click(function () {
        let answer = eval(input.value.replace("^", "**")
            .replace("x", "*")
            .replace(",", "."));
        input.value = String(answer).replace(".", ",");
    });

    $(".delete").click(function () {
        let isEditable = !input.value.includes("Infinity") && !input.value.includes("NaN");
        if (isEditable) {
            input.value = input.value.slice(0, -1);
        }
    });

    $(".c").click(function () {
        input.value = "";
    });

    $(".ce").click(function (event) {
        let search = input.value.match(/\d+/gm);
        if (input.value[input.value.length - 1].search(/\d/) !== -1) {
            input.value = input.value.slice(0, -search[search.length - 1].length);
        }
    });

    $(".color").click(function (event) {
        for (let elem of $(`[data-color-scheme]`)) {
            elem.dataset.colorScheme = event.target.classList[0];
            elem.style.transition = "background-color 1s";
            elem.addEventListener("transitionend", () => elem.style.transition = "");
        }
        $(".color-active")[0].classList.toggle("color-active")
        event.target.classList.toggle("color-active")

    });
});