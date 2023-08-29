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

/*
  !!!!!
  == This might cause a Stack Overflowing error, bacause of endless recursion, use carefully ==
  !!!!!
*/

const container = document.querySelector('.images-line')
const basis = container.querySelectorAll('.rolling-image').length || 0

function rolling (loop) {
  if (container) {
    const imageList = container.querySelectorAll('.rolling-image')
    const basicWidth = imageList[0].offsetWidth + parseInt(getComputedStyle(imageList[0]).marginLeft) + parseInt(getComputedStyle(imageList[0]).marginRight)

    let translation = 0
      
    if (!loop) {
      if (imageList && imageList.length !== 0) {
        const urlList = []
        imageList.forEach(image => {
          urlList.push(image.src)
        })

        urlList.forEach((url, i) => {
          const image = document.createElement('img')
          image.classList.add('rolling-image')
          image.src = urlList[i]
          image.alt = imageList[i].alt

          container.append(image)

          if (i < urlList.length / 2) {
             translation -= basicWidth
          }
        })

        container.classList.add('rolling')
        container.style.transform = `translateX(${translation}px)`
        container.style.transition = 'transform 6s linear'

        setInterval(() => {
          container.style.transform = 'translateX(0)'
          container.style.transition = 'none'
          
          rolling(true)
        }, 6000)
      }
    } else {
      if (imageList && imageList.length !== 0) {
        const urlList = [] 
        imageList.forEach(image => {
          urlList.push(image.src)
        })

        urlList.forEach((url, i) => {
          if (i < urlList.length / 2) {
            if (i < urlList.length / 4) {
              translation -= basicWidth
            }
          }
        })
        
        container.style.transform = `translateX(${translation}px)`
        container.style.transition = 'transform 6s linear'

        setInterval(() => {
          container.style.transform = 'translateX(0)'
          container.style.transition = 'none'
          
          rolling(true)
        }, 6000)
      }
    }
    
    return
  }
  
  return
}

window.addEventListener('load', rolling(false))
