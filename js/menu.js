'use strict';

const btnContainer = document.querySelector('.btn-container');
const sideBar = document.querySelector('.sidebar');
const menuSection = document.querySelector('.section-center');
const popup = document.createElement('div');

window.addEventListener('load', () => {
  setTimeout(function () {
    const spiner = document.querySelector('.spiner');

    spiner.classList.add('hide');
  }, 2500);

  requestMenu();
  showSideBarAndLinks();
  scrollTop();
});

// request menu from server
function requestMenu() {
  const url = '../db.json';

  return fetch(url).then(response => {
      return response.json();
    })
    .then(data => getMenuData(data))
    .catch(error => console.log('Nooooooo ' + error));
}

// Sidebar menu

function showSideBarAndLinks() {
  const burger = document.querySelector('.sidebar-toggle');
  const closeBtn = document.querySelector('.close-btn');

  burger.addEventListener('click', toggleSideBar);

  closeBtn.addEventListener('click', toggleSideBar);
}

function toggleSideBar() {
  sideBar.classList.toggle('show-sidebar');

  if (sideBar.classList.contains('show-sidebar')) {
    document.body.style.overflowX = 'hidden';
  } else {
    document.body.style.overflowX = 'auto';
  }
}

// get menu from promise
function getMenuData(data) {
  const menuBar = data.menuBar;
  const menuKitchen = data.menuKitchen;

  const links = document.querySelectorAll('.links a');
  const titleEl = document.querySelector('.title');
  const spanEl = document.createElement('span');

  spanEl.classList.add('sub-title');
  spanEl.classList.add('animation');

  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const target = event.currentTarget;

      titleEl.appendChild(spanEl);

      if (target.dataset.id === 'bar') {
        filterMenu(menuBar);
        displayButtons(menuBar);
        displayMenu(menuBar);
        showPopup(menuBar);

        sideBar.classList.remove('show-sidebar');
        titleEl.classList.remove('hide');
        btnContainer.classList.remove('hide');

        spanEl.innerHTML = 'Бар';
      } else if (target.dataset.id === 'kitchen') {
        filterMenu(menuKitchen);
        displayButtons(menuKitchen);
        displayMenu(menuKitchen);
        showPopup(menuKitchen);

        sideBar.classList.remove('show-sidebar');
        titleEl.classList.remove('hide');
        btnContainer.classList.remove('hide');

        spanEl.innerHTML = 'Кухня';
      }
    });
  });

  // displayMenu(menuBar);
  // displayButtons(menuBar);
  // filterMenu(menuBar);

  // spanEl.innerHTML = 'Бар';
}

// show menu 

function displayButtons(data) {
  // const allCategory = menu.map(item => item.category); Drygoi sposob ->
  // const uniqueCategory = new Set(allCategory); naiti ynikalnue znacheniya 
  btnContainer.innerHTML = '';

  const categories = data.reduce((values, item) => {
    if (!values.includes(item.category)) {
      values.push(item.category);
    }
    return values;
  }, ['Все']);

  categories.forEach(category => {
    const btn = `<button type="button" class="filter-btn animation" data-id="${category}">${category}</button>`;

    btnContainer.innerHTML += btn;
  });
}

function displayMenu(menu) {
  menuSection.innerHTML = '';

  menu.forEach(item => {
    const menuCard = `
      <article class="menu-item animation">
        <img src="${item.img}" alt="${item.name}" class="photo" data-id="${item.id}">
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
    const ALL = 'Все';
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

function showPopup(data) {
  menuSection.addEventListener('click', event => {
    const target = event.target;
    const id = target.dataset.id;

    popup.classList.add('popup');
    popup.classList.add('hide');
    popup.classList.add('animated');
    
    data.forEach(item => {
      if (id == item.id) {
        const popupBody = `
        <div class="popup-close">
          <i class="fas fa-times"></i>
        </div>
        <div class="popup-img">
          <img src="${item.img}" alt="lol">
        </div>
        <div class="popup-body">
          <h3>${item.name}</h3>
        </div>`;

        popup.innerHTML = popupBody;

        popup.classList.remove('hide');
        document.body.appendChild(popup);
        document.body.style.overflowY = 'hidden';
      }
    });
    closePopup();
  });
}

function closePopup() {
  const closePopupBtn = document.querySelector('.popup-close');

  closePopupBtn.addEventListener('click', event => {
    const target = event.target;

    if(target.classList.contains('fa-times')) {
      popup.classList.add('hide');
      document.body.style.overflowY = 'auto';
    }
  });
}

function scrollTop() {
  const arrow = document.querySelector('.arrow-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      arrow.classList.remove('hide');
    } else {
      arrow.classList.add('hide');
    }
  });

  arrow.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}