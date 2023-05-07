import axios from 'axios';

const getPodcasts = async () => {
  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/search/',
    params: {
      q: 'podcasts',
      type: 'episode',
      offset: '0',
      limit: '10'
    },
    headers: {
      'X-RapidAPI-Key': '1179f3b153msh6098dabc7917d65p160579jsnf2656b48ce7a',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const podcasts = response.data.results; // extract podcast data from response
    // process and display the podcasts
    console.log(podcasts);
  } catch (error) {
    // handle error
    console.error(error);
  }
};

export default getPodcasts;
