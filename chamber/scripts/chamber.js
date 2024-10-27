
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('currentyear').textContent = new Date().getFullYear();
  document.getElementById('lastmodified').textContent = document.lastModified;
  
  //  member data
  async function fetchMemberData(viewType) {
      const response = await fetch('data/members.json');
      const members = await response.json();
      displayMembers(members, viewType);
  }

  function displayMembers(members, viewType) {
      const container = document.getElementById('cards');
      container.innerHTML = '';
      members.forEach(member => {
          const card = document.createElement('article');
          card.classList.add('card');
          if (viewType === 'list') {
              card.classList.add('list-view');
          }
          card.innerHTML = `
              <img src="${member.logo}" alt="${member.name} logo" class="member-logo">
              <h3>${member.name}</h3>
              <p>${member.address}</p>
              <p>${member.phone}</p>
              <p><a href="${member.website}" target="_blank">${member.website}</a></p>
              <p>Membership Level: ${getMembershipLevel(member.membershipLevel)}</p>
          `;
          container.appendChild(card);
      });
  }

  function getMembershipLevel(level) {
      switch (level) {
          case 1: return 'Member';
          case 2: return 'Silver';
          case 3: return 'Gold';
          default: return 'Unknown';
      }
  }

  function toggleView(viewType) {
      fetchMemberData(viewType);
  }

  const gridViewBtn = document.getElementById('grid-view-btn');
  const listViewBtn = document.getElementById('list-view-btn');
  const cardsContainer = document.getElementById('cards');
  let currentView = 'grid';

  gridViewBtn.addEventListener('click', () => {
      if (currentView !== 'grid') {
          currentView = 'grid';
          toggleView('grid');
      }
  });

  listViewBtn.addEventListener('click', () => {
      if (currentView !== 'list') {
          currentView = 'list';
          toggleView('list');
      }
  });

  fetchMemberData('grid');

  // Weather code
  if (document.querySelector('#current-temp')) {
      const currentTemp = document.querySelector('#current-temp');
      const weatherDesc = document.querySelector('#weather-desc');
      const weatherIcon = document.querySelector('#weather-icon');
      const captionDesc = document.querySelector('#captionDesc');
      const forecastContainer = document.querySelector('#forecast');
      const apiKey = '3e5e6abb8a06e2e60eba45aec0d962ec';
      const lat = '-26.2041';
      const lon = '28.0473';
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;

      async function fetchWeatherData() {
          try {
              const response = await fetch(url);
              if (response.ok) {
                  const data = await response.json();
                  console.log(data);
                  displayCurrentWeather(data);
                  displayForecast(data);
              } else {
                  throw Error(await response.text());
              }
          } catch (error) {
              console.error('Error fetching weather data:', error);
          }
      }

      function displayCurrentWeather(data) {
          currentTemp.innerHTML = `${data.current.temp}&deg;C`;
          weatherDesc.textContent = data.current.weather[0].description;

          const iconSrc = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
          const desc = data.current.weather[0].description;

          weatherIcon.setAttribute('src', iconSrc);
          weatherIcon.setAttribute('alt', desc);
          captionDesc.textContent = desc;
      }

      function displayForecast(data) {
          forecastContainer.innerHTML = '';
          for (let i = 1; i <= 3; i++) {
              const day = data.daily[i];
              const listItem = document.createElement('li');
              const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
              });

              listItem.innerHTML = `
                  <strong>${date}</strong>: ${day.temp.day}&deg;C (${day.weather[0].description})
              `;
              forecastContainer.appendChild(listItem);
          }
      }

      fetchWeatherData();
  }

  async function fetchSpotlightMembers() {
      const response = await fetch('data/members.json');
      const members = await response.json();
      const eligibleMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
      const selectedMembers = shuffleArray(eligibleMembers).slice(0, 3);
      displaySpotlightMembers(selectedMembers);
  }

  function displaySpotlightMembers(members) {
      const spotlightContainer = document.getElementById('spotlight-container');
      spotlightContainer.innerHTML = '';
      members.forEach(member => {
          const spotlight = document.createElement('article');
          spotlight.classList.add('spotlight');
          spotlight.innerHTML = `
              <h3>${member.name}</h3>
              <p>${member.description || 'No description available.'}</p>
              <p><strong>Address:</strong> ${member.address || 'N/A'}</p>
              <p><strong>Phone:</strong> ${member.phone || 'N/A'}</p>
              <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website || 'N/A'}</a></p>
              <p>Membership Level: ${getMembershipLevel(member.membershipLevel)}</p>
          `;
          spotlightContainer.appendChild(spotlight);
      });
  }

  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }

  fetchSpotlightMembers();

  function openModal(modalId) {
      document.getElementById(modalId).showModal();
  }

  function closeModal(modalId) {
      document.getElementById(modalId).close();
  }

  // Set current timestamp
  document.getElementById('timestamp').value = new Date().toISOString();
});
