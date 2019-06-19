export function randomDigitGenerator(howLong: number): string {
    let digit = "";
    for (let i = 0 ; i < howLong; i++) {
        digit += Math.floor(Math.random() * 10).toString();
    }
    return digit;
}