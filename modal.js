import galleryItems from './app.js';

const galleryEl = document.querySelector('.gallery')
const openModalBtn = document.querySelector('.lightbox')
const closeModalBtn = document.querySelector('.lightbox__button')
const overlay = document.querySelector('.lightbox__overlay');
const imageEl = document.querySelector('.lightbox__image')


const makeAddEl = galleryItems.reduce((acc ,el) => 
    acc + `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${el.original}"
  >
    <img
      class="gallery__image"
      src="${el.preview}"
      data-source="${el.original}"
      alt="${el.description}"
    />
  </a>
</li>`,
     "")
galleryEl.insertAdjacentHTML('afterbegin', makeAddEl);

const onOpenModal = (el) => {
  el.preventDefault();
  if (el.target.nodeName !== 'IMG') {
      return;
  };
  galleryItems.forEach(elem=> {
    if (el.target.getAttribute('src') === elem.preview) {
      imageEl.setAttribute('src', elem.original);
      imageEl.setAttribute('alt', elem.description);
    }
  })
    window.addEventListener('keydown',escPress)
    openModalBtn.classList.add('is-open')

  }
const onCloseModal = () => {
    window.removeEventListener('keydown',escPress)
    openModalBtn.classList.remove('is-open');
}
const clickOverlay = (e) => {
    if (e.currentTarget === e.target) {
        onCloseModal()
    }
}
const escPress = (e) => {
    if (e.code === 'Escape') {
        onCloseModal()
    }
}

galleryEl.addEventListener('click', onOpenModal)
closeModalBtn.addEventListener('click', onCloseModal)
window.addEventListener('keydown', escPress)
overlay.addEventListener('click',clickOverlay)