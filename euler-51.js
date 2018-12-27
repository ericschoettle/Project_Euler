/*
By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.

By replacing the 3rd and 4th digits of 56**3 with the same digit, this 5-digit number is the first example having seven primes among the ten generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993. Consequently 56003, being the first member of this family, is the smallest prime with this property.

Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with the same digit, is part of an eight prime value family.
*/
function smallestPrimeOfFamilySize(targetFamilySize) {
  let primes = [];
  let primesString = '';
  let maxFamilyLength = 1;
  let resultPrime = '';
  let resultRegex = '';

  const isPrime = (n)=>{
    const root = Math.pow(n,0.5)
    for (let i = 2; i <= root; i++) {
        if (n % i == 0) {
          return false;
        }
    }
    return true;
  }

  // Implement seive of er Eratosthenes?
  const findAllPrimes = (length) => {
    for (let i = Math.pow(10, length - 1); i < Math.pow(10, length); i++) {
      if (isPrime(i)) {
        primes.push(i)
      }   
    }
    primesString = primes.join(',');
  }

  // strategy - I can relatively easily find primes for a given length. For each number, deconstruct it into it's digits and positions, so 2334 => {2:[0], 3:[1,2], 4:[3]}
  // For each digit, make an expression that searches for things that have that same digit in the same place. Count matches in my list of primes. (regex?)
  const findFamiliesFromPrimes = (length) => {
    maxFamilyLength = 1;
    primes.forEach(prime => {
      findFamilySizeForPrime(prime);
    });
  }

  const findFamilySizeForPrime = (prime) => {
    let digitsArray = prime.toString().split('');
    for (let i = 0; i < digitsArray.length; i++) {
      const regex = buildRegex(digitsArray, digitsArray[i]);
      const familyLength = primesString.match(regex).length;
      if (familyLength > maxFamilyLength) {
        maxFamilyLength = familyLength;
        resultPrime = prime;
        resultRegex = regex;
      }
      if (familyLength >= targetFamilySize) {
        break
      }
    }
  }

  const buildRegex = (digitsArray, keyDigit) => {
    let repeatDigit = false;
    let regexString = ''
    digitsArray.forEach(digit => {
      if (digit === keyDigit && repeatDigit) { // second, etc. time through, look for captured digit
        regexString += '\\1{1}'
      } else if (digit === keyDigit) { //first time through capture the digit in that position
        regexString += '(\\d)';
        repeatDigit = true;
      } else { // Carry all other digits through
        regexString += digit;
      }
    })
    return new RegExp(regexString, 'g');
  }
 
  let numberDigits = 2;
  while (maxFamilyLength < targetFamilySize) {
    primes = [];
    primesString = '';
    findAllPrimes(numberDigits);
    findFamiliesFromPrimes(numberDigits);
    numberDigits += 1
  }
  return {resultPrime: resultPrime, resultRegex: resultRegex, familyLength: maxFamilyLength}

}

console.log(smallestPrimeOfFamilySize(8));