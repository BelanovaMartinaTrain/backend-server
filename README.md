# Backend API server

## Main purpose:

-   Serves content
-   Acceses public APIs and stores the response in REDIS database to reduce public API calls
-   Data are served in more concised/formatted format
-   With 2 server deployment and load balancer it provides redundancy

## Deployment:

-   **Docker** image of **Node.js Express** server written in **Typescript**
-   Digital Ocean **Cloud Services**
-   2 **Linux Ubuntu** droplets (basic droplet / 512 MB / 1 vCPU)
-   1 Load Balancer
-   Domain: **https://aurora-api.cloud/**

## Database

-   **REDIS**

## API Endpoints:

| Endpoint                                                         |                  Data description                   |
| ---------------------------------------------------------------- | :-------------------------------------------------: |
| /api/planetary-k-index                                           |  Planetary KP index by minute for the next 6 hours  |
| /api/planetary-k-index-mod                                       |      Last recorded value of planetary KP index      |
| /api/sunstorm-events                                             |          Probability and level of suntorms          |
| /api/solar-wind-density-5min                                     | Solar wind speed and density in the last 5 minutes  |
| /api/solar-wind-density-3day                                     |   Solar wind speed and density in the last 3 days   |
| /api/solar-wind                                                  |                  Solar wind speed                   |
| /api/magnetic-field                                              |       Last magnetic field values of Bt and Bz       |
| /api/flux                                                        |              Last recorded flux value               |
| /api/yr-met-weather-10hours?lon={longitude}&lat={latitude}       |       Weather forecast for the next 10 hours        |
| /api/yr-met-weather-complete?lon={longitude}&lat={latitude}      |        Weather forecast for the next 9 days         |
| /api/planetary-k-3h                                              |           Planetary KP index every 3hours           |
| /api/27-days-forecast                                            |       Planetary KP index forecast for 27 days       |
| /api/image-ovation?format={format}&width={width}&height={height} | Image transformation of Aurora Ovation latest image |
|                                                                  |

-   weather - longitute and latitude are required
-   image transformation - height is optional, format and width have default values (webp, 300)
