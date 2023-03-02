const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  pagination: {
   el: ".swiper-pagination",
   clickable: true,
  },
 
  slidesPerView: 1,
  loop: false,
  breakpoints: {
   320: {
    slidesPerView: 1,
    spaceBetween: 20,
   },
   767: {
    slidesPerView: 3,
    spaceBetween: 30,
   },
  },
 });