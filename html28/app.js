const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 4000;

const app = express();

const corsOptions = {
  origin: 'https://apis-sandbox.fedex.com/track/v1/associatedshipments',
  optionsSuccessStatus: 200,
};
// @desc middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api', (req, res) => {
  const { trackingNumber, shipDateBegin } = req.body;
  const masterTrackingNumberInfo = {
    trackingNumber,
    shipDateBegin,
  };
  console.log(trackingNumber);
  const post = async () => {
    const response = await fetch(
      'https://apis-sandbox.fedex.com/track/v1/associatedshipments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-locale': 'en-US',
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJDWFMiLCJTRUNVUkUiXSwiUGF5bG9hZCI6ImFLcEpEZEJ1MXN4WmY3bEpFOUxxd2g3OEFCZ3FCSzcxa2hvdkRnWHpWWUx6bC9mWXZUc1VyemJpL3g3M1R5YThEa2FVbnN1N2FYeUFYZ1FXb3FpUXdJV21tTXo3R2hUZldRT3VBbCtoWm1OSnpXSVAwQlF4UlFsN0FCMjJOdUNwZHVnNTNuV0d0RzVFQTltR3lET2NCcityeSswMkpUd0c4R3RDS1BYa05uRHY4WHJGSU90ajlVbXNRaGJqeG93SzJvRHJzM3c1a1JVc1pXNFhGUTljVmpVeHY5Y0hzMEIzdnV3cUlRbXFiSlBSVVAyaWljS1JyY3RYTHczOWZqdFZXTHVud1FHZ0xtYk5YMWVyb21oSVEvaHJRQzZMWTJwTHd0bGFaRkdRVzNFPSIsImV4cCI6MTY1MTk2OTc1NCwianRpIjoiYzM1NTM1MzYtMjlmMy00MDY0LWFkZGYtYTU3ZGRhOTI1NWI5IiwiY2xpZW50X2lkIjoibDcwMDQ2ZTExMzE0YTk0YmI1YWZkZGNiYjRhZGYwZmQxOSJ9.GfxO_e2Xc0-1ULJyqGhTjV-l3IarzpAsh5lDubZSY7m49gRFrpptCKYh2iEvdiLeD5D7VkwcTt4TgawhMoCg8scs3SXrOaV_VDVg4XHIohIaUbLLURtPcoGkdydcV4_Ey3hR6XbbcUqFZ3UNQjvuBrYNX_tSPdgx1KTTVsuUn3M28agAcrdqHtzK4YMMgJuBcKsY62dwHjcNvQnXHCK4D70EV5pfsbLPg0dpqEhu32joi2t22lcmYKrKzdlHEUfHp-eiOV7kWM51uq0btTfPBBaNuJ5MAZKx7kXiY28vznmCUJBZurw4J25WUQTHGHJbJowkZ4H1IUKuV4bUWnvLHLKxebNIcaK8O2o4M9VvD7MNrdWFftfFpB_TZWuoga1nIZAnBiKensIPgfZHQsmzTvZss8gVO-9hcEsC5RwPgls5lRj-txur3hlT-E-2RrqJdtUrwFI6xStvF7LBCS79F9Hnm7A3bOMi1NpXutBtJKTyJo7Fz2bkqFZVocdjpQzcPxGR0MmY5vdiMG9LPQBY-mH262iksfYN4EmiFCTzSx9-LllyxhR292gUKZ6nR98hGAlhtfA8BAMFQx2-1o806FRSg7gqxm97AQFnZ4R8bwkBmL3J-LdaT_z_pQumrlTgjeepTzWaxIbo-v5JeqMHyY9zdX2-C-X7WQ99XK8QKpg',
        },
        body: JSON.stringify(masterTrackingNumberInfo),
      }
    );

    const data = await response.json();
    console.log(data);
  };
  post();
});

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port ${PORT}`);
});
