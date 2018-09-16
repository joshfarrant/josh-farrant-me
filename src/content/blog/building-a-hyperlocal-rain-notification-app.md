
## Building A Hyperlocal Rain Notification App

![Pushover heavy rain notification](/blog/images/forecast-pushover-notification.png)

I recently re-discovered [Forecast.io](https://www.forecast.io), a weather forecasting service that specialises in providing hyperlocal, short-term meteorological data, that started life as a [Kickstarter project](https://www.kickstarter.com/projects/jackadam/dark-sky-hyperlocal-weather-prediction-and-visuali) back in 2011. After playing around with their [API](https://developer.forecast.io/docs/v2) I decided to build a simple Node.js application to notify me if it was about to start raining in my location, and how heavy that rain would be. Rather than creating a dedicated app to receive and format the data, I decided that simply sending a notification to my phone would be sufficient, and [Pushover](https://pushover.net/) fit the bill nicely.

### Pushover

Sending your first notification with Pushover is extremely simple; just download their app to your device of choice ([iOS](https://itunes.apple.com/gb/app/pushover-notifications/id506088175), [Android](https://play.google.com/store/apps/details?id=net.superblock.pushover)), register the device to get your API keys, then POST a JSON object to their API. Notifications can be customised using a few different parameters such as a title, a message, a priority, and even the specific sound to play on the device when it receives the notification!

### Forecast.io

Forecast.io was built predominantly to provide short-term data. They do provide longer-term forecasts as well, such as daily and weekly, but these come at the obvious expense of accuracy. My inspiration for creating this app stemmed from wanting to know when I should expect rain during my cycle commutes just before I leave, without having to remember to check the weather every morning, so I could prepare accordingly for any rain. It made sense to use the most accurate, relevant, and current data available, so the minutely forecast data that covers the next 60 minutes fit the bill nicely. To keep things simple, I limited the amount of data that is returned from each API call to only this minutely data by appending an `exclude` query parameter to my request as follows.

```http
https://api.forecast.io/forecast/[API_KEY]/52.4782600,-1.8944970?exclude=flags,alerts,daily,hourly&units=si
```
The request also includes the geographic latitude and longitude of the location to return weather data for, which I set to the centre of Birmingham, to roughly cover my commute in both directions. You can also specify a `units` parameter in the request, which overrides the default Imperial units for the standardised, and undoubtedly more useful, SI units. The app queries the API once every two minutes, to remain within the free tier of 1,000 API calls/day.

### The Forecast-Pushover App

Once the request to the Forecast.io API has been made and the weather data has been returned, the app finds and groups any upcoming weather events, before assigning them an intensity and a priority based on the predicted amount rainfall in each event. If there is rain forecast within the next hour, the intensity of that weather event is then used to build the notification's title. The notification message is then built using the type of precipitation (rain, snow, sleet or hail) and the time until it begins. Different actions are then taken depending on the assigned priority of the upcoming weather event.

- Very low and low priority events (extremely light precipitation) are ignored and no notification is sent.

- Medium priority events (moderate precipitation) are limited to a maximum of one notification being sent every 20 minutes.

- High priority event notifications (heavy precipitation) are sent as soon as they are detected, overriding the rate-limiting.

If the priority check is passed then the JSON data is posted to the Pushover API, the notification is sent, and appears immediately on your phone.

![Pushover heavy rain notification dropdown](/blog/images/forecast-pushover-notification-dropdown.png)

All of the code from this project can be found in my [GitHub repository](https://github.com/joshfarrant/forecast-pushover "forecast-pushover"), along with instructions on how to get it up and running for yourself!

Questions or comments? Leave them below!