#!/usr/bin/env node

//Async function to make http request/fetch up to x times, then give a timeout. 

async function makeRequestsThenTimeout(numRequests) {
  const url = "https://jsonplaceholder.typicode.com/posts/1";
  try {
    let response = await fetch(url);
    let counter = 1;
    debugger;
    while (response.status === 200 && counter < numRequests) {
      response = await fetch(url);
      counter ++
    }
    if (counter === numRequests && response.status !== 300) {
      throw new Error(`Timed out - exceeded maximum of ${numRequests} requests. Recieved error ${response.error}`)
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}
// makeRequestsThenTimeout(3)
//   .then(response => response.json())
//   .then(json => console.log(json))
//   .catch(error => console.log('error: ', error))