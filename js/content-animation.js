//elements
const contents = document.querySelectorAll('.content');

const menuButton = document.querySelector('.open-menu-button');
const menu = document.querySelector('.menu');
let menuOpen = false;

//menu button
menuButton.addEventListener('click', () => {
  if (!menuOpen) {
    menu.classList.add('menu-open');
    menuButton.classList.add('open-menu-button-open');
    menuOpen = true;
  } else {
    menu.classList.remove('menu-open');
    menuButton.classList.remove('open-menu-button-open');
    menuOpen = false;
  }
});

//movement control
document.addEventListener("scroll", function (e) {
  //profile text
  for (const text of contents) {
    if (text.getClientRects()[0].top - window.innerHeight < -200 &&
      text.getClientRects()[0].bottom > 200) {
      text.style.opacity = 1;
      text.style.transform = "translateY(0)";
    } else {
      text.style.opacity = 0;
      text.style.transform = "translateY(100px)";
    }
  }
});


/*
  -- Start Rolling --
*/
