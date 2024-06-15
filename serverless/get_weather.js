let fetch;

export async function handler(event, context) {
  if (!fetch) {
    fetch = (await import("node-fetch")).default;
  }

  const params = JSON.parse(event.body);
  const { lat, lon, units } = params;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${process.env.WEATHER_API_KEY}`;
  try {
    const weatherStream = await fetch(url);
    const weatherJson = await weatherStream.json();
    return {
      statusCode: 200,
      body: JSON.stringify(weatherJson),
    };
  } catch (err) {
    return { statusCode: 422, body: err.stack };
  }
}
