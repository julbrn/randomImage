export let imageContainer = document.querySelector('.image');
export let button = document.querySelector('.button');
export let randomizerButton = document.querySelector('.button_type_randomizer');
export let randomCaption = document.querySelector('.image__caption');
export let author = document.getElementById('author');
export let userLocation = document.getElementById('location');
export let views = document.getElementById('views')
export let downloadLink = document.querySelector('.downloadLink');
export let buttonText = button.textContent;
export let clientID = 'UBzeoRZp2HJ4hKExE0IYJ7pDUM8jFzUg25tnDfYg4OA';
export let endpoint =
  `https://api.unsplash.com/photos/random/?query=bird&orientation=landscape&client_id=${clientID}`;
