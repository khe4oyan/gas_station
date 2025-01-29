console.clear();

function test(test, awaitResult) {  
  let result = "";

  if (test === awaitResult) {
    result += "💎 test passed";
  } else {
    result += "🧨 test failed";
  }

  result += ` | ${awaitResult}, ${test}`;

  console.log(result);
}

function GasStation(strArr) {
  const stationCount = +strArr[0];
  const stations = [];

  // divided at stations
  for (let i = 1; i < strArr.length; ++i) {
    const [g, c] = strArr[i].split(":");
    stations.push([+g, +c]);
  }

  strArr = null; // this variable is not use then

  // console.log("- Stations:", stations);

  // calculate for every station scenar 
  for (let i = 0; i < stations.length; ++i) {
    const res = isGasStationCircular(stations, i, stationCount);
    // console.log("isCircular:", res);
    if (res) {
      return i + 1;
    }
  }

  return -1;
}

function isGasStationCircular(stations, startPoint, stationCount) {
  let gallons = 0; 
  let i = startPoint;
  // console.log("- Calculating circular gas station:", startPoint, stationCount, gallons);

  while(stationCount > 0) {
    const [getGallons, requireForNext] = stations[i++];
    // console.log(`Station data[${i}]: ${getGallons} ${requireForNext}, gallons: ${gallons}`);

    // take gallons
    gallons += getGallons;

    // check is can go next
    if (gallons >= requireForNext) {
      --stationCount;
      gallons -= requireForNext;
      if (i === stations.length) {
        i = 0;
      }
    } else {
      return false;
    }
  }

  return true;
}


// console.log(`\n============= Test: 1 =============`);
test(GasStation(["4", "3:1", "2:2", "1:2", "0:1"]), 1);
// console.log(`-----------------------------------`);

// console.log(`\n============= Test: 2 =============`);
test(GasStation(["4", "0:1", "2:2", "1:2", "3:1"]), 4);
// console.log(`-----------------------------------`);

// console.log("\n\n\n");
