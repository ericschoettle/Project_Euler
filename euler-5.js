/*
2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
*/
function smallestDivisibleBy(number) {
  let counter = number;
  let belowNumArr = Array.from( {length: number}, (value, index) => index + 1);
  const meetsCriteria = (testNum) => {
    debugger;
    return belowNumArr.every(belowNum => {
      return (testNum % belowNum === 0)
    })
  }
  while (!meetsCriteria(counter)) {
    counter +=1
  }
  return counter;
}

console.log(smallestDivisibleBy(20))
//232792560