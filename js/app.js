'use strict';

window.addEventListener('load', () => {
  setTimeout(function() {
    const spiner = document.querySelector('.spiner');

    spiner.classList.add('hide');
  }, 2500);
  sideBar();
  requestMenu();
});

// request menu from server
function requestMenu() {
  const url = './db.json';

  return fetch(url).then(response => {
      return response.json();
    })
    .then(data => getMenuData(data))
    .catch(error => console.log('Nooooooo' + error));
}

// get menu from promise
function getMenuData(data) {
  const menuBar = data.menuBar;
  const menuKitchen = data.menuKitchen;

  displayMenu(menuBar);
  displayButtons(menuBar);
  filterMenu(menuBar);
}
// Sidebar menu
function sideBar() {
  const burger = document.querySelector('.sidebar-toggle');
  const sideBar = document.querySelector('.sidebar');
  const closeBtn = document.querySelector('.close-btn');

  burger.addEventListener('click', toggleSideBar);

  closeBtn.addEventListener('click', toggleSideBar);

  function toggleSideBar() {
    sideBar.classList.toggle('show-sidebar');
  }
}

// show menu 

const btnContainer = document.querySelector('.btn-container');

function displayButtons(data) {
  // const allCategory = menu.map(item => item.category); Drygoi sposob ->
  // const uniqueCategory = new Set(allCategory); naiti ynikalnue znacheniya 

  const categories = data.reduce((values, item) => {
    if (!values.includes(item.category)) {
      values.push(item.category);
    }
    return values;
  }, ['all']);

  categories.forEach(category => {
    const btn = `<button type="button" class="filter-btn" data-id="${category}">${category}</button>`;

    btnContainer.innerHTML += btn;
  });
}

function displayMenu(menu) {
  const menuSection = document.querySelector('.section-center');

    menuSection.innerHTML = '';

    menu.forEach(item => {
      const menuCard = `
      <article class="menu-item" data-id="${item.id}">
        <img src="${item.img}" alt="${item.name}" class="photo">
        <div class="item-info">
          <header>
            <h4>${item.name}</h4>
            <h4 class="price">$${item.price}</h4>
          </header>
          <p class="item-text">
            ${item.desc}
          </p>
        </div>
      </article>
    `;

      menuSection.innerHTML += menuCard;
    });
}

// filter menu
function filterMenu(data) {
  btnContainer.addEventListener('click', e => {
    const ALL = 'all';
    const target = e.target;
    const category = e.target.dataset.id;

    if (target && target.classList.contains('filter-btn')) {
      const menuCategory = data.filter(menuItem => menuItem.category === category);

      if (category === ALL) {
        displayMenu(data);
      } else {
        displayMenu(menuCategory);
      }
    }
  });
}
