const display = document.getElementById("display");
display.innerText = "0";

const digits = document.querySelectorAll(".digit");


digits.forEach(btn => btn.addEventListener("click", () => {
    if (display.innerText === "0")
    {
        display.innerText = btn.value;
    } else {
        display.innerText += btn.value;
    }
}));

