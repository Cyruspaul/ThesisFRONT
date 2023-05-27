const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
const generateStringForCaptcha = function (length = 6) {
    let index = null;
    let captchaString = "";
    for (let i = 0; i < length; i++) {
        index = Math.floor(Math.random() * (letters.length - 1));

        captchaString += letters.charAt(index);
    }
    return captchaString;
}
export {generateStringForCaptcha}