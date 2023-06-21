import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const imagesContainer = document.querySelector(".gallery");

// функция создания карточки картинка в галерее
function createImage(images) {
    const imageItem = images.map(({ preview, original, description }) => `
   <li class="gallery__item">
   <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
   `).join("");
    
    imagesContainer.insertAdjacentHTML("beforeend", imageItem);
}

//рендерится разметка
createImage(galleryItems);

imagesContainer.addEventListener("click", openModal);

// функция открытия модалки
function openModal(event) {
  event.preventDefault();

  const dataSourse = event.target.dataset.source;
  if (!dataSourse) {
    return
  }
  
  instance.element().querySelector("img").src = dataSourse;
  instance.show();
  document.addEventListener("keydown", closeModalImage);
}

// функция создания Большой картинка в модалке
  const instance = basicLightbox.create(`
  <img width="1400" height="900" src=" ">
  `, {onShow: (instance) => window.addEventListener("click", openModal),
		onClose: (instance) => window.removeEventListener("click", openModal)});
  
// функция закрытия модалки и удаления слушателя событий
function closeModalImage(event) {
  const escKey = 'Escape';
  if (event.code === escKey) {
    deleteModalImage();

    document.removeEventListener("keydown", closeModalImage);
  }
}

// функция удаления Большой картинки в модалке
function deleteModalImage() {
  const instance = document.querySelector('.basicLightbox--visible');
  instance.remove();
}