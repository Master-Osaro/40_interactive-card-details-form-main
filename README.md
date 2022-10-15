# Frontend Mentor - Interactive card details form

![Design preview for the Interactive card details form coding challenge](./design/desktop-preview.jpg)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I Learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page



### Links

- Live Site URL: [Live Demo](#)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Flexbox
- [GSAP animation library](https://greensock.com/)

### What I Learned

- GSAP Animation lib
```js
//GSAP animations
function card_1_animate() {
    gsap.fromTo(".card__1", {duration : 1, x:15, ease:'back'}, {duration : 1, x:0, ease:'back'});
}
function card_2_animate() {
    gsap.fromTo(".card__2", {duration : 1, x:25, ease:'back'}, {duration : 1, x:0, ease:'back'});
}
function animate_cards() {
    gsap.fromTo(".cards", {duration : 1, x:50, ease:'back'}, {duration : 1, x:0, ease:'back'});
}

```




## Author
- Frontend Mentor - [@Master-Osaro](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@iyoha_osaro](https://www.twitter.com/yourusername)

**Had fun building!** 🚀
