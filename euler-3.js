/* 
The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?
*/

function largestPrime(number) {
  let factors = [];

  function isPrime(n) {
    const root = Math.pow(n,0.5)
    for (let i = 2; i <= root; i++) {
      if (isFactor(i,n)) {
        return false;
      }
    }
    return true;
  }

  function isFactor(small, big) {
    return big % small == 0;
  }
  // Find factors, put into array in order.
  for (let i = parseInt(Math.pow(number, 0.5)); i > 2; i--) {
    if (number % i == 0) {
      factors.push(i);
      factors.unshift(number/i);
    }
  }

  let counter = 0
  while (!isPrime(factors[counter]) && counter < factors.length) {
    counter++
  }

  return factors[counter];
}

console.log(largestPrime(600851475143));
