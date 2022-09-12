const markmass = 95;
const markheight = 1.88;

const johnmass = 85;
const johnheight = 1.76;

const BMIm = markmass / markheight ** 2;
const BMIj = johnmass / johnheight ** 2;

const markHigherBMI = BMIm > BMIj;
console.log(BMIm, BMIj, markHigherBMI);
// console.log(markHigherBMI);
