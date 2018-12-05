/*
Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.

How many such routes are there through a 20×20 grid?
*/
function routesThroughGrid(number) {
  let cache = {[number]: {[number]: 1}}; // Initiate cache with 1 for endpoint
  const step = (x,y) => {
    if (cache[x] && cache[x][y]) {
      return cache[x][y]
    } else {
      // count routes
      let routeCount = 0;
      if (x < number) {
        routeCount += step(x + 1, y);
      }
      if (y < number) {
        routeCount += step(x, y + 1);
      }

      // cache results
      if (cache[x]) {
        cache[x][y] = routeCount;
      } else {
        cache[x] = {[y]: routeCount}
      }

      // return count
      return routeCount
    }
  }
  return step(0,0);
}

console.log(routesThroughGrid(20));

