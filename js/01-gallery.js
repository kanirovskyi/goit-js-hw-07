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
  const isClickable = event.target.classList.contains("gallery__image");
  if (!isClickable) {
    return
  }

  if (event.target) {
    createModalImage();
  }
}
// функция создания Большой картинка в модалке
function createModalImage() {
  const instance = basicLightbox.create(`
  <img width="1400" height="900" src="${event.target.dataset.source}">
  `);
  instance.show();

  document.addEventListener("keydown", closeModalImage);
}
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