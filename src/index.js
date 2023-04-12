// Code here
const beerName = document.querySelector('#beer-name');
const beerImage = document.querySelector('#beer-image');
const beerDescription = document.querySelector('#beer-description');
const reviewList = document.querySelector('#review-list');
const beerList = document.querySelector('#beer-list');
const form = document.querySelector('#review-form');

function createChildren(parent, array) {
  parent.innerHTML = ''; // clear ant existing elements inside the parent
  array.forEach(element => {
    // 1) create a <li></li> element
    const li = document.createElement('li');
    // 2) set its text content to the review
    li.textContent = element;
    // 3) append the create <li></li> to its parent --- reviewList
    parent.appendChild(li);
  });
}

async function loadFirstBeer() {
  const response = await fetch('http://localhost:3000/beers/1'); // a promise
  // without desctructring
  //   const data = await response.json();
  //   beerName.textContent = data.name;
  //   beerImage.src = data.image_url;
  //   beerDescription.textContent = data.description;

  //   with object destructuring
  const { name, image_url, description, reviews } = await response.json(); // without desctructring
  beerName.textContent = name;
  beerImage.src = image_url;
  beerDescription.textContent = description;
  createChildren(reviewList, reviews);
}

async function setBeerNav() {
  const response = await fetch('http://localhost:3000/beers');
  const data = await response.json(); // its going to be an array of 10 objects
  const beerNames = data.map(beer => beer.name);
  createChildren(beerList, beerNames);
}

form.addEventListener('submit', event => {
  event.preventDefault(); //prevents the default behavior of the form - which submitting and reloading
  const textarea = document.querySelector('#review');
  const value = textarea.value;
  // 1) create a <li></li> element
  const li = document.createElement('li');
  // 2) set its text content to the review
  li.textContent = value;
  // 3) append the create <li></li> to its parent --- reviewList
  reviewList.appendChild(li);
  textarea.value = '';
});

loadFirstBeer();
setBeerNav();