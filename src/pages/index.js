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
  radioBoxes
} from "../components/utils.js";


console.log(radioBoxes);

/**Изменение текста и цвета текста кнопки при ожидании ответа с сервера*/
const renderLoading = (isLoading, loadingText='Please wait...') => {
  if (isLoading) {
    button.textContent = loadingText;
    button.animate([{color: '#e16162'}, {color: '#001e1d'}], 1000)
  } else {
    button.textContent = buttonText;
  }
}

function selectRandomNum(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function changePhoto(preference, selectedColor) {
  renderLoading(true);
  const randomNum = selectRandomNum(1, 3)
  fetch(`https://api.unsplash.com/search/photos?query=${preference}&color=${selectedColor}&orientation=landscape&client_id=${clientID}`)
    .then(function(response) {
      return response.json()
    })
    .then(function(data){
      console.log(data);
      imageContainer.style.backgroundImage =
        'url(' + data.results[randomNum].urls.regular +')';
      randomCaption.textContent = 'Info: ' + (data.results[randomNum].description || data.results[randomNum].alt_description || 'Too good to be described');
      author.textContent = data.results[randomNum].user.name;
      const userAbout = data.results[randomNum].user.bio == ('[object Object]' || 'null' || '') ? ('Preferred' +
        ' not' +
        ' to share') : data.results[randomNum].user.bio;
      userInfo.textContent = userAbout;
      likes.textContent = Number(data.results[randomNum].likes).toLocaleString();
      downloadLink.href = data.results[randomNum].links.download;
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
  let selectedColor;
  for (const radioBox of radioBoxes) {
    if (radioBox.checked) {
      selectedColor = radioBox.value;
      break;
    }
    selectedColor = 'white';
  }
  console.log(selectedColor)
  changePhoto(preference, selectedColor);
});
