let cardname_display = document.querySelector('.card__1--name');
let cardname_input = document.querySelector('#card__name');
let cardnum_display = document.querySelector('.card__1--cardnum');
let cardnum_input = document.querySelector('#card__number');
let cardnum_input_error = document.querySelector('.card__number-error');
let carddate_input_error = document.querySelector('.card__date-error');
let cardcvc_input_error = document.querySelector('.card__cvc-error');
let cardate_display_mm = document.querySelector('.card__1--expdate-mm');
let cardate_display_yy = document.querySelector('.card__1--expdate-yy');
let cardate_input_mm = document.querySelector('#date');
let cardate_input_yy = document.querySelector('#year');
let cardcvc_input = document.querySelector('#cvc');
let cardcvc_display = document.querySelector('.cvc');
let submit_btn = document.querySelector('.submit__btn');
let completed_sect =  document.querySelector('.completed');
let completed_sectBtn =  document.querySelector('.continue__btn');
let form =  document.querySelector('form');
let cardnum = ""
let invalid_value = true;

//Add listeners for all inputs on change
cardname_input.addEventListener('input',()=>{
    setCardName();
})
cardnum_input.addEventListener('input',()=>{
    setCardNumber();
})
cardate_input_mm.addEventListener('input',()=>{
    setCardMonth();
})
cardate_input_yy.addEventListener('input',()=>{
    setCardYear();
})
cardcvc_input.addEventListener('input',()=>{
    setCVC();
})

//Add onclick listeners for the buttons
submit_btn.addEventListener('click',(e)=>{
    if(checkInvalidValues()){
        e.preventDefault()   
    } else{
        e.preventDefault()
        form.style.display = "none";
        completed_sect.style.display = "flex";
        animate_complete_banner();
        animate_cards();
    }
})
completed_sectBtn.addEventListener('click',(e)=>{
        form.style.display = "flex";
        completed_sect.style.display = "none";
        animate_cards();
})


//Setter Functions
let setCardName = () =>{
    let cardname = cardname_input.value.trim().split(" ");
    let capitalized_names = []
    for (let index = 0; index < 2; index++) {
        let element = cardname[index];
        if(!element&&index===0){
            element = "JANE"
        }else if(!element&&index===1){
            element = "APPLESEED"
        }
        capitalized_names.push(element.toUpperCase());
    }
    cardname_display.innerHTML=capitalized_names.join(" ");
    card_1_animate()
}

let setCardNumber = () =>{
    cardnum = cardnum_input.value.trim().split(" ").join("");
    if (!(cardnum.length)) {
        cardnum_display.innerHTML="0000 0000 0000 0000";
    }
    else{
        const splittedString = chunkStr(cardnum, 4, []);
        cardnum = splittedString.join(" ");
        cardnum_display.innerHTML=cardnum;
        cardnum_input.value=cardnum;
    }
    validateCardNumberInput(cardnum_input);
    card_1_animate();
}

let setCardMonth = () =>{
    let card_date_mm = cardate_input_mm.value.trim();
    if (!(card_date_mm.length)) {
        cardate_display_mm.innerHTML="00/";
    }
    else{
        card_date_mm = card_date_mm.substring(0,2);
        card_date_mm = parseInt(card_date_mm) < 13 ? ((card_date_mm.length<2) && card_date_mm < 10 ? "0" + card_date_mm: card_date_mm)+ "/" : 12 + "/";
        cardate_display_mm.innerHTML = card_date_mm;
    }
    validateOtherNumInput(cardate_input_mm, carddate_input_error);
    card_1_animate();
}

let setCardYear = () =>{
    let card_date_yy = cardate_input_yy.value.trim();
    if (!(card_date_yy.length)) {
        cardate_display_yy.innerHTML="00";
    }
    else{
        card_date_yy = card_date_yy.substring(0,2);
        cardate_display_yy.innerHTML = (card_date_yy.length<2) && parseInt(card_date_yy) < 10 ? "0" + card_date_yy: card_date_yy;
    }
    validateOtherNumInput(cardate_input_yy, carddate_input_error);
    card_1_animate();
}

let setCVC = () =>{
    let card_cvc = cardcvc_input.value.trim();
    if (!(card_cvc.length)) {
        cardcvc_display.innerHTML="000";
    }
    else{
        card_cvc = card_cvc.substring(0,3);
        cardcvc_display.innerHTML = card_cvc;
    }
    validateOtherNumInput(cardcvc_input, cardcvc_input_error);
    card_2_animate();
}


// Helper function to recursively break a string into n number of chunks
const chunkStr = (str, n, acc) => {     
    if (str.length === 0) {
        return acc;
    } else if(str.length > 16){
        acc.push(str.substring(0, n));
        return chunkStr(str.substring(4, 16), n, acc);
    }
    else{
        acc.push(str.substring(0, n));
        return chunkStr(str.substring(n), n, acc);
    }
}


//Helper functions to validate Numerical Inputs
function validateCardNumberInput(element) {
    if (!(element.value.length)) {
        // invalid_value = true;
        element.classList.add("error-input");
        cardnum_input_error.innerHTML="Can't be blank";
        return true;
    }
    else if (parseInt(element.value) < 0) {
        // invalid_value = true;
        element.classList.add("error-input");
        return true;
    }
    //regExp to ensure params is an Int or Space
    else if (!(/^(?=.*\d)[\d ]+$/.test(element.value))) {
        // invalid_value = true;
        element.classList.add("error-input");
        cardnum_input_error.innerHTML="Wrong format, numbers only";
        return true;
    } 
    else if (element.value.length<19) {
        // invalid_value = true;
        element.classList.add("error-input");
        cardnum_input_error.innerHTML="Card number incomplete: "+(16-element.value.length+3)+" value(s) remaining";
        return true;
    }
    else {
        // invalid_value = false;
        element.classList.remove("error-input");
        cardnum_input_error.innerHTML="";
        return false;
    }
}

function validateOtherNumInput(element, error_element) {
    if (!(element.value.length)) {
        // invalid_value = true;
        element.classList.add("error-input");
        error_element.innerHTML="Can't be blank";
        return true;
    }
    else if (parseInt(element.value) < 0) {
        // invalid_value = true;
        element.classList.add("error-input");
        return true;
    }
    //regExp to ensure params is an Int Only
    else if (!(/^\d+$/.test(element.value))) {
        // invalid_value = true;
        element.classList.add("error-input");
        error_element.innerHTML="Wrong format, numbers only";
        return true;
    } else {
        // invalid_value = false;
        element.classList.remove("error-input");
        error_element.innerHTML="";
        return false;
    }
}


function checkInvalidValues() {
  //If any of this functions return true, it means an invalid number is detected
  if (validateCardNumberInput(cardnum_input)||
    validateOtherNumInput(cardate_input_mm, carddate_input_error)||
    validateOtherNumInput(cardate_input_yy, carddate_input_error)||
    validateOtherNumInput(cardcvc_input, cardcvc_input_error)) {
    return true;
  } else {
    return false;
  }
}


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
function animate_complete_banner() {
     gsap.fromTo(".completed", {duration : 1, x:250, ease:'back'}, {duration : 1, x:0, ease:'back'});
}
function animate_form() {
     gsap.fromTo("form", {duration : 1, x:-250, ease:'back'}, {duration : 1, x:0, ease:'back'});
}

animate_cards();

