const express = require('express');
const cors = require('cors');
const axios = require('axios');
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

app.post('/', (req, res) => {
  const { grant_type, client_id, client_secret } = req.body;
  const obj = { grant_type, client_id, client_secret };
  console.log(obj);
  const posts = async () => {
    try {
      const response = await axios.post(
        'https://apis-sandbox.fedex.com/oauth/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(obj),
        }
      );

      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(data.errors);
      throw new Error(error.message);
    }
  };
  posts();
});

app.post('/api', (req, res) => {
  const { trackingNumber, shipDateBegin } = req.body;
  const masterTrackingNumberInfo = {
    trackingNumber,
    shipDateBegin,
  };
  console.log(trackingNumber);
  const posts = async () => {
    const response = await fetch(
      'https://apis-sandbox.fedex.com/track/v1/associatedshipments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-locale': 'en-US',
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        body: JSON.stringify(masterTrackingNumberInfo),
      }
    );

    const data = await response.json();
    console.log(data);
  };
  posts();
});

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port ${PORT}`);
});
