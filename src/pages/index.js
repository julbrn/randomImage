import './index.css';
import {clientID} from "../components/Api.js";
import {
  imageContainer,
  button,
  randomCaption,
  author,
  userInfo,
  likes,
  downloadLink,
  buttonText,
  form,
  formInput,
  downloaderButton,
  extraInfo,
  radioBoxes
} from "../components/utils.js";

/**Изменение текста и цвета текста кнопки при ожидании ответа с сервера*/
const renderLoading = (isLoading, loadingText='Please wait...') => {
  if (isLoading) {
    button.textContent = loadingText;
    button.animate([{color: '#f9bc60'}, {color: '#fffffe'}], 1000)
  } else {
    button.textContent = buttonText;
  }
}

function selectRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) }

function showTable() {
  downloaderButton.classList.add('visible');
  extraInfo.classList.add('visible');
}

function changePhoto(preference, selectedColor) {
  renderLoading(true);
  const randomNum = selectRandomNum(1, 3)
  fetch(`https://api.unsplash.com/search/photos?query=${preference}${selectedColor}&orientation=landscape&client_id=${clientID}`)
    .then(function(response) {
      return response.json()
    })
    .then(function(data){
      console.log(data);
      imageContainer.style.backgroundImage =
        'url(' + data.results[randomNum].urls.regular +')';
      randomCaption.textContent = 'Info: ' + (data.results[randomNum].description || data.results[randomNum].alt_description || 'Too good to be described');
      author.textContent = data.results[randomNum].user.name;
      const userAbout = data.results[randomNum].user.bio == null ? (`Preferred not to share`) : data.results[randomNum].user.bio;
      userInfo.textContent = userAbout;
      likes.textContent = Number(data.results[randomNum].likes).toLocaleString();
      downloadLink.href = data.results[randomNum].links.download;
      showTable();
      /**Страница для скачивания фото открывается в новом окне*/
      downloadLink.setAttribute('target', '_blank');
    })
    .catch(function(error) {
      console.log(error);
      alert('Oopsie-doopsie, something went wrong! :( Please try selecting another query.')
    })
    .finally(() => {renderLoading(false)})
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const preference = formInput.value;
  let selectedColor;
  for (const radioBox of radioBoxes) {
    if (radioBox.checked && (radioBox.value !== 'noColor')) {
      selectedColor = `&color=${radioBox.value}`;
      break;
    }
    selectedColor = '';
  }
  changePhoto(preference, selectedColor);
});
