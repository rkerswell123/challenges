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

// https://www.microverse.org/blog/how-to-loop-through-the-array-of-json-objects-in-javascript

function engine(data) {

  // For Loop
  for (let i = 0; i < data.length; i++) {
    for (let ii = 0; ii < user.length; ii++) {
      populateData(data[i][user[ii]]);
    }
    for (let ii = 0; ii < address.length; ii++) {
      populateData(data[i].address[address[ii]]);
    }
    for (let ii = 0; ii < geo.length; ii++) {
      populateData(data[i].address.geo[geo[ii]]);
    }
    for (let ii = 0; ii < company.length; ii++) {
      populateData(data[i].company[company[ii]]);
    }
  }

  // For In Loop
  // While Loop
  // ForEach Loop + Objects

  // Loop over JSON (Example below)
//   var json = {
//     jsonData:  [
//         {one: [11, 12, 13, 14, 15]},
//         {two: [21, 22, 23]},
//         {three: [31, 32]}
//     ]
//  }; 
//  for (var i=0; i<json.jsonData.length; i++) {
//     for (var key in json.jsonData[i]) {
//         for (var j= 0; j<json.jsonData[i][key].length; j++) {
//             console.log(json.jsonData[i][key][j])
//         }
//     }
//  }
}