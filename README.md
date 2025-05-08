
## Prerequisites

- [Node.js](https://nodejs.org/en/download/) >= 18
- [NPM](https://www.npmjs.com/get-npm) >= 8
- Generate a Google Maps API key: https://developers.google.com/maps/documentation/javascript/get-api-key
- Generate a Google Map Id: https://developers.google.com/maps/documentation/javascript/get-api-key
- Create a .env file in the root directory with the following variables:
  - VITE_GOOGLE_MAP_ID="< your google map id >"
  - VITE_GOOGLE_MAPS_API_KEY="< your google maps api key >"

## Installation
- npm install 
- npm run dev
- Access http://localhost:5173


## Datasets

The application will point to San Francisco Area once the map loads. You can find some sample GeoJsonLayer datasets to use with the application.

## Example of GeoJsonLayer datasets

San Francisco Area GeoJSON Datasets
1. BART Stations
   URL:
   https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json

Description: BART (Bay Area Rapid Transit) station locations.

2. BART Routes
   URL:
   https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart.geo.json

Description: GeoJSON representation of BART train lines (MultiLineStrings).

3. SF Neighborhoods
   URL:
   https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/san-francisco.geojson

Description: Neighborhood boundaries of San Francisco.

4. Earthquake data (near SF)
   URL (sample from USGS):
   https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

Description: Worldwide data, but includes recent quakes near SF. You can filter by geometry.coordinates and properties.place.

5. Street Trees SF (small sample)
   URL:
   https://data.sfgov.org/resource/2zah-tuvt.geojson?$limit=100

Description: Locations of publicly maintained trees in San Francisco. This endpoint uses Socrata API so you can paginate or filter.
