const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('#header');
const body = document.querySelector('body');
const menuList = document.querySelector('#header .nav-list ul');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobile_menu.classList.toggle('active');
  body.classList.toggle('no-scroll');
  
  // Check if the mobile menu is open or closed and set the background color accordingly
  if (mobile_menu.classList.contains('active')) {
    menuList.style.backgroundColor = '#212529';
  } else {
    menuList.style.backgroundColor = '#fff';
  }
});

document.addEventListener('scroll', () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 150) {
    header.style.backgroundColor = '#212529';
  } 
});

menu_item.forEach((item) => {
  item.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
    body.classList.remove('no-scroll');
    
    // When a menu item is clicked and the menu is closed, set the background color to white
    if (!mobile_menu.classList.contains('active')) {
      menuList.style.backgroundColor = '#fff';
    }
  });
});

