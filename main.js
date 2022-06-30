
// Learn about vanilla JS each types and for loops to understand each one and what each one can do.

// import { array } from "./api.js";
import { clock, watch, person, car, lorry } from './icons.js';

// Awaait Function
function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

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


// jQuery Version

const leaveHTML = `<option selected disabled>Leave from where?</option>`;
const arriveHTML = `<option selected disabled>Arrive where?</option>`;

const leave = $('.leave');
const arrive = $('.arrive');
leave.append(leaveHTML);

$.getJSON(url, (data) => {
  engine(data);
});

// Engine

async function engine(data) {

  await wait(500);

  // Remove loader once data has loaded
  $('.initLoading').fadeOut();
  $('.leave, .arrive').fadeIn();

  $.each(data.schedule, (key, val) => {
    $(`<option value="${key}">${departure[key]}</option>`).appendTo('.leave');
  });

  // On change of leave select
  $('.leave').on('change', function() {
    showElementRemoveResults('.arrive', 'option');
    showElementRemoveResults('.results', '.ferry');
    arrive.append(arriveHTML).removeAttr('disabled');

    $.each(data.schedule[$(this).val()], (key, val) => {
      $(`<option value="${key}">${departure[key]}</option>`).appendTo('.arrive');
    });
  });

  // On change of arrive select
  $('.arrive').on('change', async function() {
    $('.resultsLoading').fadeIn();
    showElementRemoveResults('.results', '.ferry');

    await wait(500);

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
  $('.ferry').fadeIn();
}

// Fade In Object

function showElementRemoveResults(a, b) {
  $(a).fadeIn().find(b).remove();
}




// Vanilla JS Version

// function leaveOptionSetter() {
//   const leaveOption = document.createElement('option');
//   leaveOption.innerHTML = 'Leave from where?';
//   leaveOption.setAttribute('disabled', '');
//   leaveOption.setAttribute('selected', '');
//   return leaveOption;
// }

// function arriveOptionSetter() {
//   const arriveOption = document.createElement('option');
//   arriveOption.innerHTML = 'Arrive where?';
//   arriveOption.setAttribute('disabled', '');
//   arriveOption.setAttribute('selected', '');
//   return arriveOption;
// }