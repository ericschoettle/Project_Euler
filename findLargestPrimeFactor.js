/* 
The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?
*/

function largestPrime(number) {
  let primes = [];

  function isPrime(n) {
    const root = n^0.5
    return !primes.some(prime => {
      return (prime < root && isFactor(prime, n))
    });
  }

  function isFactor(small, big) {
    return big % small == 0;
  }

  for (let i = 2; i <= number^0.5; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  debugger;

  for (let index = primes.length; index > 0; index--) {
    const prime = primes[index];
    if (isFactor(prime, number)) {
      debugger;
      return prime;
    }   
  }
}

console.log(largestPrime(60085));
console.log(largestPrime(600851475143));