import Notiflix from 'notiflix';
import { MyApi } from './js/fetchPicture';
import './css/styles.css';

const ref = {
  searchForm: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  searchInput: document.querySelector('.search-input'),
  // observedEl: document.querySelector()
};
const myApi = new MyApi();

ref.searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  // myApi.query = ref.searchInput.value.trim();
  myApi.query = e.currentTarget.elements.query.value.trim();
  myApi.clearPage;

  ref.galleryEl.innerHTML = '';

  if (!myApi.query) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  fetchResult();
}

function fetchResult() {
  // scroll.unobserve(observedEl);
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
    // scroll.observe(observedEl);
    // lightbox.refresh
    if (myApi.page === Math.ceil(totalHits / 40)) {
      // scroll.unobserve(observedEl);
      // лайтбокс.refresh()
      return Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    myApi.addPage();
  });
}

function addMarkup(hits) {
  const markup = hits
    .mape(
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
      <a href="${largeImageURL}>
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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

  ref.galleryEl.insertAdjacementHTML('beforeend', markup);
}

// // let callback = (entries) => {
//   entries.forEach((entry) => {
// if (entry.intersecting && myApi.query === ''){
// if(myApi.page === 1) {
//   return
// } renderOnRequest()}

//     //   entry.intersecting

//   });
// }; в середені треба передати посилання renderOnRequest()
