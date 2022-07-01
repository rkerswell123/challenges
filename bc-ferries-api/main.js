// Imports
import { clock, watch, person, car, lorry } from './icons.js';

// const url = array;
const url = 'https://www.bcferriesapi.ca/api/';

const departure = {
  TSA: 'Tsawwassen',
  SWB: 'Swartz Bay',
  SGI: 'Southern Gulf Islands',
  DUK: 'Duke Point (Nanaimo)',
  FUL: 'Fulford Harbour (Salt Spring Island)',
  HSB: 'Horseshoe Bay',
  NAN: 'Departure Bay (Nanaimo)',
  LNG: 'Langford',
  BOW: 'Bowen Island',
};

// Awaait Function
function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}









// jQuery Version

// const leaveHTML = `<option selected disabled>Leave from where?</option>`;
// const arriveHTML = `<option selected disabled>Arrive where?</option>`;

// const leave = $('.leave');
// const arrive = $('.arrive');
// leave.append(leaveHTML);

// $.ajax(url)
// .done((data) => engine(data))
// .fail((err) => {
//   console.log(err);
//   alert('API Error - Check for syntax error or enable CORS plugin.');
// });

// // Engine
// async function engine(data) {

//   await wait(500);

//   // Remove loader once data has loaded
//   $('.initLoading').fadeOut();
//   $('.leave, .arrive').fadeIn();

//   $.each(data.schedule, (key, val) => {
//     $(`<option value="${key}">${departure[key]}</option>`).appendTo('.leave');
//   });

//   // On change of leave select
//   $('.leave').on('change', function() {
//     onChangeRemoveHandler('.arrive', 'option');
//     onChangeRemoveHandler('.results', '.ferry');
//     arrive.append(arriveHTML).removeAttr('disabled');

//     $.each(data.schedule[$(this).val()], (key, val) => {
      // $(`<option value="${key}">${departure[key]}</option>`).appendTo('.arrive');
//     });
//   });

//   // On change of arrive select
//   $('.arrive').on('change', async function() {
//     $('.resultsLoading').fadeIn();
//     onChangeRemoveHandler('.results', '.ferry');

//     await wait(500);

//     $('.resultsLoading').fadeOut();

//     const arriveValue = $('.leave').val();
//     const leaveValue = $(this).val();
//     const sailingData = data.schedule[arriveValue][leaveValue];

//     $.each(sailingData.sailings, (key, val) => {
//       results(val, sailingData.sailingDuration);
//     });

//   });
// }

// // Populate body with results
// function results(val, duration) {

//   // Ferry Tile
//     const tile = `
//     <div class="ferry col-12 col-lg-6" style="display: none;">
//       <div class="ferry-block">

//         <div class="ferry-info">
//           <div class="ferry-data">
//             <h2 class="data title">${val.vesselName}</h2>
//           </div>
//           <div class="ferry-data">
//             <p class="data">${clock} ${duration}</p>
//             <p class="data">${person} ${val.fill}</p>
//             <p class="data">${car} ${val.carFill}</p>
//             <p class="data">${lorry} ${val.oversizeFill}</p>
//           </div>
//         </div>
//         <h3 class="data time">${watch} ${val.time}</h3>

//       </div>
//     </div>
//   `;

//   $('.results').append(tile).fadeIn();
//   $('.ferry').fadeIn();
// }

// // On change, fade in then remove handler

// function onChangeRemoveHandler(a, b) {
//   $(a).fadeIn().find(b).remove();
// }









// Vanilla JS Version

function leaveOptionSetter() {
  const leaveOption = document.createElement('option');
  leaveOption.innerHTML = 'Leave from where?';
  leaveOption.setAttribute('disabled', '');
  leaveOption.setAttribute('selected', '');
  return leaveOption;
}

function arriveOptionSetter() {
  const arriveOption = document.createElement('option');
  arriveOption.innerHTML = 'Arrive where?';
  arriveOption.setAttribute('disabled', '');
  arriveOption.setAttribute('selected', '');
  return arriveOption;
}

const leave = document.querySelector('.leave');
const arrive = document.querySelector('.arrive');
const result = document.querySelector('.results');
const ferry = document.querySelector('.ferry');

leave.appendChild(leaveOptionSetter());

fetch(url)
.then((res) => res.json())
.then((data) => engine(data))
.catch((err) => {
  console.log(err);
  alert('API Error - Check for syntax error or enable CORS plugin.');
});

// Engine
async function engine(data) {

  await wait(500);

  // Remove loader once data has loaded
  fadeOutVanilla(document.querySelector('.initLoading'));
  fadeInVanilla(leave);
  fadeInVanilla(arrive);

  Object.entries(data.schedule).forEach(([a, b]) => {
    const option = document.createElement('option');
    option.innerHTML = departure[a];
    option.setAttribute('value', a);
    leave.appendChild(option);
  });













  // On change of leave select
  leave.addEventListener('change', function() {
    arrive.appendChild(arriveOptionSetter());
    onChangeRemoveHandler('.arrive', 'option');
    // onChangeRemoveHandler('.results', '.ferry');
    // arrive.appendChild(arriveOptionSetter()).removeAttr('disabled');
    arrive.removeAttribute('disabled');

    // $.each(data.schedule[$(this).val()], (key, val) => {
    //   $(`<option value="${key}">${departure[key]}</option>`).appendTo('.arrive');
    // });

    console.log(data.schedule[this.value]);
    Object.entries(data.schedule[this.value]).forEach(([a, b]) => {
      const option = document.createElement('option');
      option.innerHTML = departure[a];
      option.setAttribute('value', a);
      arrive.appendChild(option);
    });
  });

  // On change of arrive select
  $('.arrive').on('change', async function() {
    $('.resultsLoading').fadeIn();
    // onChangeRemoveHandler(result, ferry);

    $('.resultsLoading').fadeOut();

    const arriveValue = $('.leave').val();
    const leaveValue = $(this).val();
    const sailingData = data.schedule[arriveValue][leaveValue];

    $.each(sailingData.sailings, (key, val) => {
      results(val, sailingData.sailingDuration);
    });

  });
}

// Populate body with results
function results(val, duration) {

  // Ferry Tile
    const tile = `
    <div class="ferry col-12 col-lg-6" style="display: none;">
      <div class="ferry-block">

        <div class="ferry-info">
          <div class="ferry-data">
            <h2 class="data title">${val.vesselName}</h2>
          </div>
          <div class="ferry-data">
            <p class="data">${clock} ${duration}</p>
            <p class="data">${person} ${val.fill}</p>
            <p class="data">${car} ${val.carFill}</p>
            <p class="data">${lorry} ${val.oversizeFill}</p>
          </div>
        </div>
        <h3 class="data time">${watch} ${val.time}</h3>

      </div>
    </div>
  `;

  $('.results').append(tile).fadeIn();
  $(ferry).fadeIn();
}

// On change, fade in then remove handler

function onChangeRemoveHandler(a, b) {
  console.log(document.querySelector(a));
  console.log(document.querySelector(b));
  fadeInVanilla(document.querySelector(a));
  document.querySelector(b).querySelector(b).remove();
}






// FadeIn Vanilla

function fadeInVanilla(el, display = 'block', time = 400) {
  el.style.opacity = 0;
  el.style.display = display;
  function fade() {
    let val = parseFloat(el.style.opacity);
    if (!(val > 1)) {
      val += 0.1;
      el.style.opacity = val;
      setTimeout(() => { requestAnimationFrame(fade); }, time / 10);
    }
  };
  fade();
};

// FadeOut Vanilla

function fadeOutVanilla(el, time = 400) {
  el.style.opacity = 1;
  function fade() {
    el.style.opacity -= 0.1;
    if (el.style.opacity < 0) el.style.display = 'none';
    else setTimeout(() => { requestAnimationFrame(fade); }, time / 10);
  };
  fade();
};