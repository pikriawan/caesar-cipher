const cipher = document.getElementById("cipher");
const submit = document.getElementById("submit");
const output = document.getElementById("output");

cipher.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const plaintext = formData.get("plaintext");
    const shift = formData.get("shift");

    submit.disabled = true;

    const response = await fetch(`/encrypt?plaintext=${plaintext}&shift=${shift}`);
    const data = await response.text();

    submit.disabled = false;
    output.textContent = `Hasil: "${data}"`;
});
