const back1 = document.querySelector('.back1');
const back2 = document.querySelector('.back2');
const foliage = document.querySelector('.foliage');
const front = document.querySelector('.front');
const text = document.querySelector('.forest');
const lamp = document.querySelector('.lamp');
const home = document.querySelector('#home');
const services = document.querySelector('#services');

const menuBtn = document.querySelector('#menu_btn');
const menu = document.querySelector('.menu');
let windowWidth;


function setSizes() {
    windowWidth = window.innerWidth;
    let height;

    if (windowWidth > 900) height = windowWidth / 1.7;
    else height = windowWidth / 1.5;

    home.style.height = height + "px";
    foliage.style.height = windowWidth / 3.5 + "px";
    text.style.fontSize = windowWidth / 4 + "px"
}

document.addEventListener('DOMContentLoaded', () => {
    type();
    setSizes();
    if(windowWidth < 700){
        //-------hide the menu while scrolling-------
        document.addEventListener('scroll', hideMenu);
        //-------hide the menu while click on it-------
        menu.addEventListener('click', hideMenu);
    }
});



/* Storing user's device details in a variable*/
let details = navigator.userAgent;
/* Creating a regular expression 
containing some mobile devices keywords 
to search it in details string*/
let regexp = /android|iphone|kindle|ipad/i;

/* Using test() method to search regexp in details
it returns boolean value*/
let isMobileDevice = regexp.test(details);


if (isMobileDevice) {
    lamp.style.display = "none";
    document.querySelector('.explore_btn').style.display = "none";
    document.addEventListener('scroll', hideMenu);
    menu.addEventListener('click', hideMenu);
} else {
    window.addEventListener('resize', setSizes)

    // ----the lamp follows the cursor--------
    services.addEventListener('mousemove', (e) => {
        if (windowWidth > 900) {
            let x = -((windowWidth / 100 * 200 / 2) - e.x);
            let y = -((635 / 100 * 200 / 2) - e.y);
            if (y < -(635 / 100 * 200 / 5)) {
                lamp.style.left = x + "px";
                // a 200 persentage of Window width(section width) == the image's width
                // the image's width / 2 == the center of the image(X axis)
                // the center of the image(X axis) - x == the x(left) coordinate
                lamp.style.top = y + "px";
                // a 200 persentage of Window height(section height == 100vh == 635px) == the image's height
                // the image's height / 2 == the center of the image(Y axis)
                // the center of the image(Y axis) - y == the y(top) coordinate
            }
        }
    })


    // ----parallax effect------------
    home.addEventListener('mousemove', (e) => {
        if (windowWidth > 500) {
            let x = e.x;
            let y = e.y;
            let size;
            if (windowWidth > 900) {
                size = windowWidth / 20;
                back1.style.bottom = y * 0.12 - size + 20 + "px";
                back2.style.bottom = y * 0.11 + size + "px";
                front.style.left = x / 100 * 10 - 300 + "px";
            } else {
                size = windowWidth / 22;
                back1.style.bottom = y * 0.05 + size + "px";
                back2.style.bottom = y * 0.06 + size + size + size / 2 + "px";
                front.style.left = x / 100 * 10 - 150 + "px";
            }

            back1.style.left = x / 3000 * 100 - 50 + "px";
            back2.style.left = x / 6000 * 100 - 50 + "px";

            foliage.style.left = x / 1000 * 100 - 140 + "px";
            foliage.style.top = y / 6000 * 100 - 20 + "px";
        }
    })
}


// ----typing effect------------
const headingTextArea = document.querySelector('.heading_text');
const cursor = document.querySelector('.cursor');
const headingText = "about us";
let charIndex = 0;

function type() {
    if (charIndex < headingText.length) {
        headingTextArea.innerHTML += headingText[charIndex++];
        setTimeout(type, 300);
    } else {
        cursor.classList.remove('typing')
        setTimeout(erase, 3000);
    }
}

function erase() {
    if (charIndex > 0) {
        cursor.classList.add('typing')
        headingTextArea.innerHTML = headingText.substring(0, charIndex-- - 1)
        setTimeout(erase, 50);
    } else {
        setTimeout(type, 300);
    }
}


// ----img click effect------------
const images = document.querySelectorAll('.box img');
images.forEach(img => {
    img.addEventListener('click', () => {
        img.parentElement.childNodes[1].style.display = "flex";
        img.style.filter = "blur(3px)";
    })
})

const backBtns = document.querySelectorAll('.back');
backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.parentElement.style.display = "none";
        btn.parentElement.parentElement.parentElement.childNodes[0].style.filter = "none";
    })
})



menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    setTimeout(() => {
        menuBtn.classList.toggle('fa-times')
    }, 200);
    if (menuBtn.classList.contains('fa-times')) {
        menu.classList.toggle('active');
        setTimeout(() => {
            menu.style.display = "none";
        }, 400);
    }else{
        menu.style.display = "flex";
        setTimeout(() => {
            menu.classList.toggle('active');
        }, 1);
    }
    
})

function hideMenu() {
    menu.classList.remove('active');
    menuBtn.classList.remove('active');
    setTimeout(() => {
        menuBtn.classList.remove('fa-times')
    }, 200);
    setTimeout(() => {
        menu.style.display = "none";
    }, 400);
}

