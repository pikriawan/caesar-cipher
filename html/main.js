const cipher = document.getElementById("cipher");
const submit = document.getElementById("submit");
const output = document.getElementById("output");

cipher.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const plaintext = formData.get("plaintext");
    const shift = formData.get("shift");

    const result = encrypt(plaintext, shift);

    output.textContent = `Hasil: "${result}"`;
});

function encrypt(plaintext = "", shift = "0") {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const shiftInt = parseInt(shift) || 0;

    const normalizedShift = shiftInt < 0
        ? alphabet.length - (Math.abs(shiftInt) % alphabet.length)
        : shiftInt % alphabet.length;

    let result = "";

    for (const letter of plaintext) {
        let index = alphabet.indexOf(letter.toLowerCase());

        if (index === -1) {
            result += letter;
        } else {
            const shiftedIndex = (index + normalizedShift) % alphabet.length;
            result += alphabet.charAt(shiftedIndex);
        }
    }

    return result;
}
