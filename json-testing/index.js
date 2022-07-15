// Loops Types

// objectJSON(); // Object JSON
arrayJSON();  // Array JSON





function objectJSON() {

  // Fetch Data
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => engine(data));

  const user = ['id', 'name', 'username', 'email',  'phone', 'website'];
  const address = ['street', 'suite', 'city', 'zipcode'];
  const geo = ['lat', 'lng'];
  const company = ['name', 'catchPhrase', 'bs'];

  function populateData(html) {
    const el = document.createElement('p');
    el.innerHTML = html;
    document.body.appendChild(el);
  }

  function engine(data) {

    // For Loop - Standard loop
    for (let a = 0; a < data.length; a++) {
      for (let b = 0; b < user.length; b++) populateData(data[a][user[b]]);
      for (let b = 0; b < address.length; b++) populateData(data[a].address[address[b]]);
      for (let b = 0; b < geo.length; b++) populateData(data[a].address.geo[geo[b]]);
      for (let b = 0; b < company.length; b++) populateData(data[a].company[company[b]]);
    }

    // For Of Loop - Doesn't give you an index
    for (const times of data) {
      for (const users of user) populateData(times[users]);
      for (const addresses of address) populateData(times.address[addresses]);
      for (const geos of geo) populateData(times.address.geo[geos]);
      for (const companys of company) populateData(times.company[companys]);
    }

    // For In Loop - Loops over index on data
    for (const times in data) {
      for (const users in user) populateData(data[times][user[users]]);
      for (const addresses in address) populateData(data[times].address[address[addresses]]);
      for (const geos in geo) populateData(data[times].address.geo[geo[geos]]);
      for (const companys in company) populateData(data[times].company[company[companys]]);
    }

    // While & Do While Loop - Not popular so don't use

    // ForEach Loop - Best option to use
    data.forEach((a) => {
      user.forEach((b) => populateData(a[b]));
      address.forEach((b) => populateData(a.address[b]));
      geo.forEach((b) => populateData(a.address.geo[b]));
      company.forEach((b) => populateData(a.company[b]));
    });

  }
}









function arrayJSON() {

  // Fetch Data
  fetch('https://www.bcferriesapi.ca/api/')
    .then((res) => res.json())
    .then((data) => engine(data));

  const departure = ['TSA', 'SWB', 'DUK', 'HSB', 'NAN', 'LNG'];
  const arrive = ['TSA', 'SWB', 'SGI', 'DUK', 'FUL', 'HSB', 'NAN', 'LNG', 'BOW'];

  function populateData(html) {
    const el = document.createElement('p');
    el.innerHTML = html;
    document.body.appendChild(el);
  }

  function engine(data) {
    const DATA = Object.entries(data.schedule);

    // For Loop - Standard loop
    for (let a = 0; a < DATA.length; a++) {
      for (let b = 0; b < departure.length; b++) {
        if (departure[b] === DATA[a][0]) {
          for (let c = 0; c < arrive.length; c++) {
            const result = DATA[a][1][arrive[c]];
            if (result) {
              for (let d = 0; d < result.sailings.length; d++) {
                populateData(result.sailingDuration);
                populateData(Object.values(result.sailings[d]));
              }
            }
          }
        }
      }
    }

    // For Of Loop - Doesn't give you an index
    for (const array of DATA) {
      for (const depart of departure) {
        if (depart === array[0]) {
          for (const arrival of arrive) {
            if (array[1][arrival]) {
              for (const result of array[1][arrival].sailings) {
                populateData(array[1][arrival].sailingDuration);
                populateData(Object.values(result));
              }
            }
          }
        }
      }
    }

    // For In Loop - Loops over index on data (Not popular so don't use)
    // While & Do While Loop - Not popular so don't use

    // ForEach Loop - Best option to use
    Object.entries(DATA).forEach((a) => {
      departure.forEach((b) => {
        if (b === a[1][0]) {
          arrive.forEach((c) => {
            const result = a[1][1][c];
            if (result) {
              result.sailings.forEach((d) => {
                populateData(result.sailingDuration);
                populateData(Object.values(d));
              });
            }
          });
        }
      });
    });
  }
}