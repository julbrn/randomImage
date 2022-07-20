let imageContainer = document.querySelector('.image');
let button = document.querySelector('.button');
let randomizerButton = document.querySelector('.button_type_randomizer');
let randomCaption = document.querySelector('.image__caption');
let author = document.getElementById('author');
let userLocation = document.getElementById('location');
let views = document.getElementById('views')
let downloadLink = document.querySelector('.downloadLink');
let buttonText = button.textContent;
let clientID = 'W5HbyIan__nswXh8qdM8bYd5_VWX9EjeKJsxbQ7vdE0';
let endpoint =
  `https://api.unsplash.com/photos/random/?query=bird&orientation=landscape&client_id=${clientID}`;

const renderLoading = (isLoading, loadingText='Please wait...') => {
  if (isLoading) {
    button.textContent = loadingText;
    button.animate([{color: '#e16162'}, {color: '#001e1d'}], 1000)
  } else {
    button.textContent = buttonText;
  }
}


function changePhoto() {
  renderLoading(true);
  fetch(endpoint)
    .then(function(response) {
      return response.json()
    })
    .then(function(data){
      imageContainer.style.backgroundImage =
        'url(' + data.urls.regular +')';
      randomCaption.textContent = 'Info: ' + (data.description || data.alt_description);
      author.textContent = data.user.name;
      userLocation.textContent = data.location.title || data.location.country || 'Preferred not' +
        ' to share';
      views.textContent = Number(data.views).toLocaleString();
      downloadLink.href = data.links.download;
      console.log(downloadLink.href)
    })
    .catch(function(error) {
      console.log(error)
    })
    .finally(() => {renderLoading(false)})
}
randomizerButton.addEventListener('click', changePhoto);
