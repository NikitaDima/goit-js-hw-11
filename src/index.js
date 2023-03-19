import Notiflix from 'notiflix';
import { MyApi } from './js/fetchPicture';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';

const ref = {
  searchForm: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreEl: document.querySelector('.load-more'),
};
ref.loadMoreEl.classList.add('hidden');

const myApi = new MyApi();

ref.searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  myApi.query = e.target.elements.searchQuery.value.trim();
  myApi.clearPage;

  ref.galleryEl.innerHTML = '';

  if (!myApi.query) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  renderOnRequest();
}

function renderOnRequest() {
  myApi.fetchPicture().then(({ hits, totalHits }) => {
    if (myApi.page === 1) {
      if (myApi.query === '' || totalHits <= 2) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    addMarkup(hits);

    if (myApi.page === Math.ceil(totalHits / 40)) {
      ref.loadMoreEl.classList.add('hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    myApi.incrementPage();
  });
}

function addMarkup(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <div class="photo-card">
      <a href=${largeImageURL} target="_blank" data-gallery="my-gallery">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width=300 height=200/>
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div>`;
      }
    )
    .join('');

  ref.galleryEl.insertAdjacentHTML('beforeend', markup);
  ref.loadMoreEl.classList.remove('hidden');
  const lightbox = new SimpleLightbox('[data-gallery="my-gallery"]', {
    captions: true,
    captionsData: 'title',
    captionDelay: 250,
  });
}

ref.loadMoreEl.addEventListener('click', renderOnRequest);
