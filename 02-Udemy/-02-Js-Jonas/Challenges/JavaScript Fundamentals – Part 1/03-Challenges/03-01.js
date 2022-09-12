const avrDol = (96 + 108 + 89) / 3;
const avrKol = (88 + 91 + 110) / 3;

console.log(avrDol, avrKol);
// Data one
if (avrDol > avrKol) {
  console.log("Dolphins win the trophy 🏆r");
} else if (avrDol < avrKol) {
  console.log("Koalas win the trophy 🏆");
} else if (avrDol === avrKol) {
  console.log("Both win the trophy!");
} else {
  console.log("no teams wins the trophy");
}

// Data two
const avrDolBonus = (97 + 112 + 101) / 3;
const avrKolBonus = (109 + 95 + 123) / 3;

console.log(avrDolBonus, avrKolBonus);
if (avrDolBonus > avrKolBonus && avrDolBonus >= 100) {
  console.log("Dolphins win the trophy 🏆");
} else if (avrDolBonus < avrKolBonus && avrKolBonus >= 100) {
  console.log("Koalas win the trophy 🏆");
} else if (
  avrDolBonus === avrKolBonus &&
  avrDolBonus >= 100 &&
  avrKolBonus >= 100
) {
  console.log("Both win the trophy!");
} else {
  console.log("No one wins the trophy 😭");
}

// Data three
const avrDolBonus_2 = (97 + 112 + 101) / 3;
const avrKolBonus_2 = (109 + 95 + 106) / 3;

console.log(avrDolBonus_2, avrKolBonus_2);

if (avrDolBonus_2 > avrKolBonus_2 && avrDolBonus_2 >= 100) {
  console.log("Dolphins win the trophy 🏆");
} else if (avrDolBonus_2 < avrKolBonus_2 && avrKolBonus_2 >= 100) {
  console.log("Koalas win the trophy 🏆");
} else if (
  avrDolBonus_2 === avrKolBonus_2 &&
  avrDolBonus_2 >= 100 &&
  avrKolBonus_2 >= 100
) {
  console.log("Both win the trophy!");
} else {
  console.log("No teams wins the trophy 😭");
}
