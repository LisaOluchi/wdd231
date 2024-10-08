// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#captionDesc');

// OpenWeatherMap API URL and API key (replace 'your_api_key_here' with your actual API key)
const url = 'https://api.openweathermap.org/data/2.5/weather?q=Trier,de&appid=3e5e6abb8a06e2e60eba45aec0d962ec';
// Asynchronous function to fetch weather data
async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); 
        displayResults(data); 
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      console.log(error); 
    }
  }
  
  // Function to display the results on the webpage
  function displayResults(data) {
    
    currentTemp.innerHTML = `${data.main.temp}&deg;C`; // 
  
    // Get the icon and description from the API data
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;
  
    
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
  }
  
 
  apiFetch();