

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


//image rolling horizontal
class RollingImage {
  image;
  imgScroll;
  constructor(image) {
    this.imgScroll = 0;
    this.image = image;
  }

}
const imageRoot = "./../image/life/";
const imageCount = 6;
const imageList = [];
const imagesContainer = document.querySelector('.life-pics');
const imageWidth = 500;
let currentWidth = 0;
let currentScroll = 0;
let moveSpeed = 1;
let currentGeneratingImage = 1;

function InfiniteImageRolling() {
  while (currentWidth < window.innerWidth + (imageWidth * 2)) {
    if (currentGeneratingImage > imageCount) {
      currentGeneratingImage = 1;
    }

    const img = document.createElement('img');
    img.src = imageRoot + currentGeneratingImage + ".jpg";
    img.classList.add('life-pic');
    imagesContainer.appendChild(img);
    let rollingImage = new RollingImage(img);
    rollingImage.imgScroll = currentWidth - imageWidth;
    imageList.push(rollingImage);

    currentGeneratingImage++;
    currentWidth += imageWidth;
  }

  for (const img of imageList) {
    img.imgScroll -= moveSpeed;
    img.image.style.transform = "translateX(" + img.imgScroll + "px)";
    if (img.imgScroll < -imageWidth * 2) {
      imagesContainer.removeChild(img.image);
      imageList.splice(imageList.indexOf(img), 1);
      currentWidth -= imageWidth;
    }
  }
}

setInterval(() => {
  requestAnimationFrame(InfiniteImageRolling);
}, 1);