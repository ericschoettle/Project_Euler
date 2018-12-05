/*
2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

What is the sum of the digits of the digitArray 2^1000?
*/
function powerDigitSum(power) {
  let digitArray = [2];

  const doubleNumber = () => {
    let extras = new Array(digitArray.length + 1).fill(0);
    digitArray.forEach((digit, index) => {
      if (digit >= 5) {
        extras[index + 1] = 1;
        digitArray[index] = ((digit * 2) % 10) + extras[index];
      } else {
        digitArray[index] = digit * 2 + extras[index];
      }
    });
    if (extras[extras.length - 1]) {
      digitArray.push(1);
    }
  }
  for (let i = 1; i < power; i++) {
    doubleNumber();;
  }
  return digitArray.reduce((prev, curr) => prev + curr);
}

console.log(powerDigitSum(1000));