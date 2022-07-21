import './index.css';
import {clientID} from "../components/Api.js";
import {
  imageContainer,
  button,
  randomCaption,
  author,
  userLocation,
  views,
  downloadLink,
  buttonText,
  form,
  formInput,
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

function changePhoto(preference) {
  renderLoading(true);
  fetch(`https://api.unsplash.com/photos/random/?query=${preference}&orientation=landscape&color=yellow&client_id=${clientID}`)
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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const preference = formInput.value;
  changePhoto(preference);
});
