const markmass = 78;
const markheight = 1.69;

const johnmass = 92;
const johnheight = 1.95;

const BMIm = markmass / markheight ** 2;
const BMIj = johnmass / johnheight ** 2;

console.log(BMIm, BMIj);

if (BMIm > BMIj) {
  console.log(`Mark's BMI (${BMIm}) is higher than John's (${BMIj})!`);
} else {
  console.log(`John's BMI (${BMIj}) is higher than Mark's (${BMIm})!`);
}
