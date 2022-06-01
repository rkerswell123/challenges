
// Learn about vanilla JS each types and for loops to understand each one and what each one can do.

// import { array } from "./api.js";
import { clock, watch, person, car, lorry, pin } from './icons.js';

// const url = array;
const url = 'https://www.bcferriesapi.ca/api/';

// fetch(url)
// .then((res) => res.json())
// .then((data) => console.log(data));

// const leave = 'HSB';
// const arrive = 'NAN';

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

const leaveHTML = '<option selected disabled>Leave from where?</option>';
const arriveHTML = '<option selected disabled>Arrive where?</option>';

// jQuery Version

$(leaveHTML).appendTo('.leave');

$.getJSON(url, (data) => {

  // Remove loader once data has loaded
  $('.loading').delay(250).fadeOut();
  $('.leave').delay(500).fadeIn();

  $.each(data.schedule, (key, val) => {
    $(`<option value="${key}">${departure[key]}</option>`).appendTo('.leave');
  });

  // On change of leave select
  $('.leave').on('change', function() {
    $('.arrive').fadeIn().find('option').remove();
    $(arriveHTML).appendTo('.arrive');

    $.each(data.schedule[$(this).val()], (key, val) => {
      $(`<option value="${key}">${departure[key]}</option>`).appendTo('.arrive');
    });
  });

  // On change of arrive select
  $('.arrive').on('change', function() {
    const arriveValue = $('.leave').val();
    const leaveValue = $(this).val();
    const sailingData = data.schedule[arriveValue][leaveValue];

    $.each(sailingData, (key, val) => {
      const duration = val;
      $.each(sailingData.sailings, (key, val) => {
        results(val, duration);
      });
    });
  });

});


// Populate body with results

function results(val, duration) {

  // Ferry Tile
    const tile = `
    <div class="ferry">
      <h2 class="ferry-info name">${val.vesselName}</h2>
      <h3 class="ferry-info time">${watch} ${val.time}</h3>
      <p class="ferry-info duration">${clock} ${duration}</p>
      <p class="ferry-info duration">${person} ${val.fill}</p>
      <p class="ferry-info duration">${car} ${val.carFill}</p>
      <p class="ferry-info duration">${lorry} ${val.oversizeFill}</p>
    </div>
  `;

  $('body').append(tile);
}