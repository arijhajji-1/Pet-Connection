import axios from 'axios';

async function textToSpeech(text) {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://text-to-speech-api3.p.rapidapi.com/speak',
      params: {
        text: text,
        lang: 'en',
        speed: 'normal',
        voice: 'mp3-normal'
      },
      headers: {
        'X-RapidAPI-Key': '1179f3b153msh6098dabc7917d65p160579jsnf2656b48ce7a',
        'X-RapidAPI-Host': 'text-to-speech-api3.p.rapidapi.com'
      },
      responseType: 'arraybuffer'
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default textToSpeech;
