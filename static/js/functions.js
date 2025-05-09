import * as DOM from './domElements.js';
import { dayColors, japaneseDays } from './utils.js';

// Fetch weather data and update the circle
export function getWeatherInCircle(city) {
    fetch(`/weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
            DOM.cityElement.textContent = data.city;
            DOM.tempElement.textContent = `${Math.round(data.temp)}°`;
        })
        .catch(error => console.error("Error fetching weather data:", error));
}

// Set the background color of the weather circle and day indicators
export function setDayColors(dayOfWeek) {
    // Set the background color of the weather circle
    const circleColor = dayColors[dayOfWeek];
    DOM.circleElement.style.backgroundColor = circleColor;
    DOM.circleElement.style.boxShadow = `0 0 30px ${circleColor}4D`;

    // Loop through the day indicators and assign colors
    DOM.dayIndicators.forEach((indicator, index) => {
        const colorIndex = (dayOfWeek + index) % 7; // Calculate the day index cyclically
        indicator.style.backgroundColor = dayColors[colorIndex];
    });
}

// Set the day names and date
export function setDayNames(today, dayOfWeek) {
    const dayOfWeekEnglish = today.toLocaleString('en-US', { weekday: 'long' }); // Get the English name of the current day
    const dayOfWeekJapanese = japaneseDays[dayOfWeek]; // Get the Japanese character for the current day

    DOM.dayElement.textContent = dayOfWeekEnglish; // Set the English name of the current day
    DOM.japaneseDayElement.textContent = dayOfWeekJapanese; // Set the Japanese character for the current day

    const month = today.toLocaleString('en-US', { month: 'long' });

    function getOrdinalSuffix(n) {
        if (n > 3 && n < 21) return 'th';
        switch (n % 10) {
          case 1:  return 'st';
          case 2:  return 'nd';
          case 3:  return 'rd';
          default: return 'th';
        }
    }

    const day = today.getDate();
    const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
    const formatted = `${dayWithSuffix} ${month}`;

    DOM.dateElement.textContent = formatted; // Set the formatted date
}
