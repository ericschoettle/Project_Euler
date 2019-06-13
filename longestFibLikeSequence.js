// This one isn't from Project Euler - it's from https://leetcode.com/problems/length-of-longest-fibonacci-subsequence/

/* 
A sequence X_1, X_2, ..., X_n is fibonacci-like if:

n >= 3
X_i + X_{i+1} = X_{i+2} for all i + 2 <= n
Given a strictly increasing array A of positive integers forming a sequence, find the length of the longest fibonacci-like subsequence of A.  If one does not exist, return 0.

(Recall that a subsequence is derived from another sequence A by deleting any number of elements (including none) from A, without changing the order of the remaining elements.  For example, [3, 5, 8] is a subsequence of [3, 4, 5, 6, 7, 8].)

 

Example 1:

Input: [1,2,3,4,5,6,7,8]
Output: 5
Explanation:
The longest subsequence that is fibonacci-like: [1,2,3,5,8].
Example 2:

Input: [1,3,7,11,12,14,18]
Output: 3
Explanation:
The longest subsequence that is fibonacci-like:
[1,11,12], [3,11,14] or [7,11,18].
 

Note:

3 <= A.length <= 1000
1 <= A[0] < A[1] < ... < A[A.length - 1] <= 10^9
*/


/**
 * @param {number[]} sequence The sequence to search through.
 * @return {number}
 */
var lenLongestFibSubseq = function(sequence) {
  var longestSubSequence = [];
  
  /** Recursive funcrtion to build subsequences
   * @param {number[]} sequence sequence as currently built. Beginning is trimmedf down to valid-subsequences, end is yet-to-be-trimmed. IndexLast is the divider beteen the two. 
   * @param {number} indexLast eg [3, 5, 8, 9, 11, 13, 14]  - If index last is 2, that means that 2 and before are shown to be fib-like, and after remains to be searched. 
   * @return {number} 
   */
  const buildSubsequence = (sequence, indexLast) => { 
    // Search for the next number in sequence
    const indexOfNext = sequence.indexOf(sequence[indexLast] + sequence[indexLast-1]);
    
    if (indexOfNext > 0) { // If the sequence can can be continued, splice out numbers and search for next
      let newSequence = JSON.parse(JSON.stringify(sequence));
      newSequence.splice(indexLast + 1, indexOfNext - indexLast - 1);
      buildSubsequence(newSequence, indexLast + 1);
    } else { 
      // If sequence can't be continued, check if it's longer than any existing. If so, update longest. 
      if (indexLast > longestSubSequence.length && indexLast > 1) {
        let newSequence = JSON.parse(JSON.stringify(sequence));
        newSequence.splice(indexLast + 1, newSequence.length - indexLast);
        longestSubSequence = newSequence;
      }
    }
  }
  // Initialize with all possible first two numbers
  for (let i = 0; i < sequence.length; i++) {
  	let firstInitializedSeq=JSON.parse(JSON.stringify(sequence));
    firstInitializedSeq.splice(0, i);
    for (let j = 1; j < firstInitializedSeq.length; j++) {
      let secondInitializedSeq = JSON.parse(JSON.stringify(firstInitializedSeq));
      secondInitializedSeq.splice(1, j - 1);
      buildSubsequence(secondInitializedSeq, 1);
    }
  }
  // return value
  return longestSubSequence.length;
};

console.log(lenLongestFibSubseq([1,3,7,11,12,14,18]))