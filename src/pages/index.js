import './index.css';
import {endpoint} from "../components/Api.js";
import {
  imageContainer,
  button,
  randomizerButton,
  randomCaption,
  author,
  userLocation,
  views,
  downloadLink,
  buttonText,
} from "../components/utils.js";

/**Изменение текста и цвета текста кнопки при ожидании ответа с сервера*/
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
      /**Страница для скачивания фото открывается в новом окне*/
      downloadLink.setAttribute('target', '_blank');
    })
    .catch(function(error) {
      console.log(error)
    })
    .finally(() => {renderLoading(false)})
}

randomizerButton.addEventListener('click', changePhoto);
