import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  console.log('start request');
  config.requestStart = performance.now();
  return config;
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  const end = performance.now();
  const waitingTime = end - response.config.requestStart;
  console.log(`end request, waiting time: ${waitingTime}ms`);
  return response;
});

const { data: articles } = await axios.get('/api/data/articles?timeout=3000');

document.querySelector('#data').innerHTML = articles[0].content;
