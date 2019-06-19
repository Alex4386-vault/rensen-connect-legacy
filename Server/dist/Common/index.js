"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomDigitGenerator(howLong) {
    var digit = "";
    for (var i = 0; i < howLong; i++) {
        digit += Math.floor(Math.random() * 10).toString();
    }
    return digit;
}
exports.randomDigitGenerator = randomDigitGenerator;
