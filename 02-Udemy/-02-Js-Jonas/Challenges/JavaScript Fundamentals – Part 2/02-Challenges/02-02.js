// const calcTip = function (bill) {
//   if (bill >= 50 && bill <= 300) {
//     bill = 0.15 * bill;
//     return Number(bill) + Number(bill);
//   } else {
//     bill = 0.2 * bill;
//     return Number(bill) + Number(bill);
//   }
// };

const calcTip = (bill) =>
  bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

const bills = [125, 55, 44];

const tips = new Array(calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2]));
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills, tips, totals);
