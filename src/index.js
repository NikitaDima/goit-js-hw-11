import './css/styles.css';
import Notiflix from 'notiflix';
import fetchPicture from './js/fetchPicture';

const ref = {
  searchForm: document.querySelector('#search-form'),
};

ref.searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const name = e.target.elements.searchQuery.value.trim();
  if (name === '') {
    return;
  }
  fetchPicture(name);
}
