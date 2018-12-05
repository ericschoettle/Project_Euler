/* 
A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.
*/

function largestPalindrome(numDigits) {
  let palindromes = [];
  function isPalindrome(number) {
    return number.toString().split('').reverse().join('') === number.toString()
  }

  for (let i = 1; i <= Math.pow(10,numDigits); i++) {
    for (let j = 1; j <= Math.pow(10,numDigits); j++) {
      if (isPalindrome(i*j)) {
        palindromes.push(i*j);
      }
    }
  }
  palindromes = palindromes.sort((a,b)=>{return a-b});
  return palindromes[palindromes.length - 1];
}

console.log(largestPalindrome(3))