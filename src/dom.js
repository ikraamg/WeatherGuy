const displayController = (() => {
  const displayImage = (source) => {
    const icon = document.createElement('IMG');
    icon.src = source;
    return icon;
  };

  const displayText = (text, element) => {
    const textElement = document.createElement(element);
    textElement.textContent = text;
    return textElement;
  };

  const currentWeather = (data, celcius = true) => {
    const { current } = data;

    const todayParent = document.querySelector('.todayParent');
    todayParent.appendChild(displayText(`Current Weather in ${data.location.name}:`, 'H3'));

    const todayRow = document.createElement('div');
    todayRow.classList.add('col-2', 'todayRow', 'd-flex', 'flex-column', 'align-items-center');
    const temp = celcius ? `${current.feelslike_c}°C` : `${current.feelslike_f}°F`;
    todayRow.appendChild(displayText(current.condition.text, 'p'));
    todayRow.appendChild(displayImage(current.condition.icon));
    todayRow.appendChild(displayText(temp, 'p'));
    todayParent.appendChild(todayRow);
  };

  const forecastedWeather = (data, celcius = true) => {
    const forecasted = data.forecast;

    const forecastParent = document.querySelector('.forecastParent');
    forecastParent.appendChild(displayText(`Forecasted Weather in ${data.location.name}:`, 'H3'));

    const forecastRow = document.createElement('div');
    forecastRow.classList.add('flex-row', 'd-flex', 'forecastRow', 'col-10');
    forecasted.forecastday.forEach(day => {
      const avgTemp = celcius ? `Avg: ${day.day.avgtemp_c}°C` : `Avg: ${day.day.avgtemp_f}°F`;
      const maxTemp = celcius ? `Max: ${day.day.maxtemp_c}°C` : `Max: ${day.day.maxtemp_f}°F`;
      const minTemp = celcius ? `Min: ${day.day.mintemp_c}°C` : `Min: ${day.day.mintemp_f}°F`;
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('dayDiv', 'col-4', 'd-flex', 'flex-column', 'align-items-center');
      dayDiv.appendChild(displayText(day.date, 'H5'));
      dayDiv.appendChild(displayText(day.day.condition.text, 'p'));
      dayDiv.appendChild(displayImage(day.day.condition.icon));
      dayDiv.appendChild(displayText(avgTemp, 'p'));
      dayDiv.appendChild(displayText(maxTemp, 'p'));
      dayDiv.appendChild(displayText(minTemp, 'p'));
      forecastRow.appendChild(dayDiv);
    });

    forecastParent.appendChild(forecastRow);
  };

  const clearWeather = () => {
    const today = document.querySelector('.todayParent');
    while (today.firstChild) {
      today.removeChild(today.lastChild);
    }

    const forecast = document.querySelector('.forecastParent');
    while (forecast.firstChild) {
      forecast.removeChild(forecast.lastChild);
    }
  };

  const displayWeather = (data) => {
    const toggleStatus = document.querySelector('#customSwitch1').checked;
    currentWeather(data, toggleStatus);
    forecastedWeather(data, toggleStatus);
  };

  return { displayWeather, clearWeather };
})();

export default displayController;