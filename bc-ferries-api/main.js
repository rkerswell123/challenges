// Imports
import { clock, watch, person, car, lorry } from './icons.js';

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

// Switch between Vanilla JS & jQuery versions
apiJquery();
// apiVanilla();




// jQuery Version
function apiJquery() {

  const leaveHTML = `<option selected disabled>Leave from where?</option>`;
  const arriveHTML = `<option selected disabled>Arrive where?</option>`;
  const leave = $('.leave');
  const arrive = $('.arrive');

  // Calculation for animated intro screen
  const marginTop = (window.innerHeight - $('.selection').height()) / 2;
  $('.selection').css('margin-top', marginTop);

  $.ajax(url)
  .done((data) => engine(data))
  .fail((err) => {
    console.log(err);
    alert('API Error - Check for syntax error or enable CORS plugin.');
  });

  // Engine
  async function engine(data) {
    leave.append(leaveHTML);

    await wait(400); // Must match the CSS Animation

    // Remove loader once data has loaded
    $('.initLoading').fadeOut();
    $('.leave, .arrive, .logo').fadeIn();

    $.each(data.schedule, (key, val) => {
      $(`<option value="${key}">${departure[key]}</option>`).appendTo('.leave');
    });

    // On change of leave select
    $('.leave').on('change', async function() {
      $('.results').fadeOut();

      // Reset back to loading screen from results screen
      if (!$('body').hasClass('start')) {
        await wait(400); // Must match the CSS Animation
        $('.selection').css('margin-top', marginTop);
      }

      onChangeRemoveHandler('.arrive', 'option');
      arrive.append(arriveHTML).removeAttr('disabled');

      $.each(data.schedule[$(this).val()], (key, val) => {
        $(`<option value="${key}">${departure[key]}</option>`).appendTo('.arrive');
      });
    });

    // On change of arrive select
    $('.arrive').on('change', async function() {
      $('.selection').css('margin-top', 30);
      $('body').removeClass('start');

      await wait(400); // Must match the CSS Animation

      $('.resultsLoading').fadeIn();
      onChangeRemoveHandler('.results', '.ferry');

      await wait(400); // Must match the CSS Animation

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
  function results(v, a) {

    // Ferry Tile
      const tile = `
      <div class="ferry col-12 col-lg-6" style="display: none;">
        <div class="ferry-block">
          <div class="ferry-info">
            <div class="ferry-data">
              <h2 class="data title">${v.vesselName}</h2>
            </div>
            <div class="ferry-data">
              <p class="data">${clock} ${a}</p>
              <p class="data">${person} ${v.fill}</p>
              <p class="data">${car} ${v.carFill}</p>
              <p class="data">${lorry} ${v.oversizeFill}</p>
            </div>
          </div>
          <h3 class="data time">${watch} ${v.time}</h3>
        </div>
      </div>
    `;

    $('.results').append(tile).fadeIn();
    $('.ferry').fadeIn();
  }

  // On change, fade in then remove handler
  function onChangeRemoveHandler(a, b) {
    $(a).fadeIn().find(b).remove();
  }

}




// Vanilla JS Version
function apiVanilla() {

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

  // Elements
  const leave = document.querySelector('.leave');
  const arrive = document.querySelector('.arrive');
  const logo = document.querySelector('.logo');
  const result = document.querySelector('.results');
  const initLoader = document.querySelector('.initLoading');
  const resultLoader = document.querySelector('.resultsLoading');
  const selection = document.querySelector('.selection');

  // Calculation for animated intro screen
  const margTop = (window.innerHeight - selection.clientHeight) / 2;
  selection.style.marginTop = `${margTop}px`;

  // Fetch
  fetch(url)
  .then((res) => res.json())
  .then((data) => engine(data))
  .catch((err) => {
    console.log(err);
    alert('API Error - Check for syntax error or enable CORS plugin.');
  });

  // Engine
  async function engine(data) {
    leave.appendChild(leaveOptionSetter());

    await wait(400); // Must match the CSS Animation

    // Remove loader once data has loaded
    fadeOutVanilla(initLoader);
    fadeInVanilla(leave);
    fadeInVanilla(arrive);
    fadeInVanilla(logo);

    Object.entries(data.schedule).forEach(([a, b]) => {
      const option = document.createElement('option');
      option.innerHTML = departure[a];
      option.setAttribute('value', a);
      leave.appendChild(option);
    });

    // On change of leave select
    leave.addEventListener('change', async function() {
      fadeOutVanilla(result);

      // Reset back to loading screen from results screen
      if (!document.body.classList.contains('start')) {
        await wait(400); // Must match the CSS Animation
        selection.style.marginTop = `${margTop}px`;
      }

      onChangeRemoveHandler('.arrive', 'option');
      arrive.appendChild(arriveOptionSetter());
      arrive.removeAttribute('disabled');

      Object.entries(data.schedule[this.value]).forEach(([a, b]) => {
        const option = document.createElement('option');
        option.innerHTML = departure[a];
        option.setAttribute('value', a);
        arrive.appendChild(option);
      });
    });

    // On change of arrive select
    arrive.addEventListener('change', async function() {
      selection.style.marginTop = '30px';
      document.body.classList.remove('start');
      fadeInVanilla(resultLoader);

      await wait(400); // Must match the CSS Animation

      onChangeRemoveHandler('.results', '.ferry', true);

      await wait(400); // Must match the CSS Animation

      fadeOutVanilla(resultLoader);

      const arriveValue = document.querySelector('.leave').value;
      const leaveValue = this.value;
      const sailingData = data.schedule[arriveValue][leaveValue];

      Object.entries(sailingData.sailings).forEach(([a, b]) => {
        results(b, sailingData.sailingDuration);
      });

    });
  }

  // Populate body with results
  function results(v, a) {

    // Ferry Tile
    const html = document.createElement('div');
    html.classList.add('ferry', 'col-12', 'col-lg-6');
    html.innerHTML = `
    <div class="ferry-block">
      <div class="ferry-info">
        <div class="ferry-data">
          <h2 class="data title">${v.vesselName}</h2>
        </div>
        <div class="ferry-data">
          <p class="data">${clock} ${a}</p>
          <p class="data">${person} ${v.fill}</p>
          <p class="data">${car} ${v.carFill}</p>
          <p class="data">${lorry} ${v.oversizeFill}</p>
        </div>
      </div>
      <h3 class="data time">${watch} ${v.time}</h3>
    </div>`;
    document.querySelector('.results').appendChild(html);
    fadeInVanilla(html);
  }

  // On change, fade in then remove handler
  function onChangeRemoveHandler(a, b, c) {
    if (c === true) fadeInVanilla(document.querySelector(a), 'flex');
    document.querySelectorAll(`${a} ${b}`).forEach((e) => e.remove());
  }

}




// Modular Functions

// Awaait Function
function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// FadeIn Vanilla
function fadeInVanilla(e, d = 'block', t = 400) {
  e.style.opacity = 0;
  e.style.display = d;
  function fade() {
    let val = parseFloat(e.style.opacity);
    if (!(val > 1)) {
      val += 0.1;
      e.style.opacity = val;
      setTimeout(() => { requestAnimationFrame(fade); }, t / 10);
    }
  };
  fade();
};

// FadeOut Vanilla
function fadeOutVanilla(e, t = 400) {
  e.style.opacity = 1;
  function fade() {
    e.style.opacity -= 0.1;
    if (e.style.opacity < 0) e.style.display = 'none';
    else setTimeout(() => { requestAnimationFrame(fade); }, t / 10);
  };
  fade();
};