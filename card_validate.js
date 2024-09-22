import {el, setChildren} from 'redom';
import bootstrap from 'bootstrap';
import * as validator from 'card-validator';
import * as email from 'email-validator';
//https://www.npmjs.com/package/card-validator

const imagesArr = new Map([  //node_modules\credit-card-type\dist\types.d.ts
    ['American Express', 'https://www.svgrepo.com/show/473532/americanexpress.svg'],
    ['Diners Club', 'https://www.svgrepo.com/show/361985/diners-2.svg'],
    ['Discover', 'https://www.svgrepo.com/show/473587/discover.svg'],
    ['Elo', 'https://www.svgrepo.com/show/361992/elo-2.svg'],
    ['Hiper', 'https://www.svgrepo.com/show/328065/hiper.svg'],
    ['Hipercard', 'https://www.svgrepo.com/show/328082/hipercard.svg'],
    ['JCB', 'https://www.svgrepo.com/show/362000/jcb-2.svg'],
    ['Maestro', 'https://www.svgrepo.com/show/362010/maestro-old-1.svg'],
    ['Mastercard', 'https://www.svgrepo.com/show/362017/mastercard-old-1.svg'],
    ['Mir', 'https://www.svgrepo.com/show/328067/mir.svg'],
    ['UnionPay', 'https://i7.uihere.com/icons/631/896/3/unionpay-3989e4b888e59ebbaf3d3e564c3d00f1.png'],
    ['Visa', 'https://www.svgrepo.com/show/473823/visa.svg']
]
);

const green = '#00FF00';
const red = '#FF0000';
const good = 'Good!';

const author_name = '64656E6973406B6973656C65762E7275';
function hex_to_ascii(str1) { //https://www.w3resource.com/javascript-exercises/javascript-string-exercise-28.php
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

function checkCVC()    { return validator.cvv(cvc.value).isValid; }
function checkDate()   { return validator.expirationDate(month.value + "/" + year.value, (new Date().getFullYear() % 100)).isValid; }
function checkEmail()  { return email.validate(email.value); }
function checkNumber() { return validator.number(number.value).isValid; }

function checker(id)
{
    switch (id)
    {
        case 'getNumber':
            if (validator.number(number.value).isValid)
            {
                errorNumber.textContent = good;
                errorNumber.style.color = green;
            } else {
                errorNumber.textContent = 'Enter a valid Credit Card Number (exactly 13-19 digits)';
                errorNumber.style.color = red; 
            }
        break;
        case 'getMonth':
        case 'getYear':
            if (validator.expirationDate(month.value + "/" + year.value, (new Date().getFullYear() % 100)).isValid)
            {
                errorDate.innerText = good;
                errorDate.style.color = green;
            } else {
                errorDate.innerText = 'Incorrect Date!';
                errorDate.style.color = red;
            }
        break;
        case 'getEmail':
            if (email.validate(email.value))
            {
                errorEmail.innerText = good;
                errorEmail.style.color = green;
            } else {
                errorEmail.innerText = 'Incorrect Email!';
                errorEmail.style.color = red;
            }
        break;
        case 'getCVC':
            if (validator.cvv(document.getElementById('getCVC').value).isValid)
            {
                errorCVV.innerText = good;
                errorCVV.style.color = green;
            } else {
                errorCVV.innerText = 'Incorrect CVC/CVV!';
                errorCVV.style.color = red;
            }
        break;   
    }
}

function disableButton()
{
    (!checkNumber() || !checkDate() || !checkEmail() || !checkCVC()) ? btnpay.setAttribute('disabled', 'disabled') : btnpay.removeAttribute('disabled');
    return btnpay.hasAttribute('disabled');
}

function blurEvent(id)
{
    switch (id)
    {
        case 'getNumber':
            checkNumber();
        break;
        case 'getMonth':
        case 'getYear':
            checkDate();
        break;
        case 'getEmail':
            checkEmail();
        break;
        case 'getCVC':
            checkCVC();
        break;   
    }

    checker(id);
    drawImage();

    return;
}

function clearError(id)
{
    switch (id)
    {
        case 'getNumber':
            errorNumber.textContent = '';
        break;
        case 'getMonth':
        case 'getYear':
            errorDate.textContent = '';
        break;
        case 'getEmail':
            errorEmail.textContent = '';
        break;
        case 'getCVC':
            errorCVV.textContent = '';
        break;   
    }

    disableButton();

    return;
}

function drawImage()
{
    if (number.value)
    {
        if (!checkNumber() || !checkDate() || !checkEmail() || !checkCVC())
        image.src = '';

        if (imagesArr.has(validator.number(number.value).card.niceType))
            image.src = imagesArr.get(validator.number(number.value).card.niceType);
    }

    return image.src == '';
}

function formatDate(date) //https://learn.javascript.ru/datetime#%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B8-%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4-%D0%B4%D0%B0%D1%82:~:text=formatDate(date)%2C%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%B0%D1%8F%20%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4%D0%B8%D1%82%20%D0%B4%D0%B0%D1%82%D1%83%20date%20%D0%B2%20%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B5%20%D0%B4%D0%B4.%D0%BC%D0%BC.%D0%B3%D0%B3%3A
{
    var mm = date.getMonth() + 1;
    if (mm < 10) 
        mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) 
        yy = '0' + yy;

    return mm + '/' + yy;
}

function createForm()
{
    return el('div', {className: 'container'}, 
                el('form', {className: 'cardCheck'}, 
                    [
                        el('h1', 'Order execution'), 
                        el('div', {className: 'card'}, 
                            [ 
                                el('div', {className: 'input-group mt-3'}, 
                                [
                                    el('span', 'Enter Credit Card Number: ', {className: 'input-group-text'}),
                                    el('input', {type: 'text', id: 'getNumber', minlength: '8', maxlength: '19', placeholder: '1234 5678 9012 3456', className: 'form-control'}), //4 * 4 + 3 пробела = 19 символов https://en.wikipedia.org/wiki/Payment_card_number#:~:text=Payment%20card%20numbers%20are%20composed%20of%208%20to%2019%20digits
                                ]),
                                el('small', {id: 'errorNumber', className: 'form-text'}),

                                el('div', {className: 'input-group mt-3'}, 
                                [
                                    el('span', 'Enter Credit Card Date: ', {className: 'input-group-text'}),
                                    el('input', {type: 'text', id: 'getMonth', pattern: '\d{2}', maxlength: '2', placeholder: `${formatDate(new Date()).substring(0, 2)}`, className: 'form-control'}), //mm.yy 09/24
                                    el('span', '/', {className: 'input-group-text'}),
                                    el('input', {type: 'text', id: 'getYear', pattern: '\d{4}', maxlength: '4', placeholder: `${formatDate(new Date()).substring(3, 5)}`, className: 'form-control'}),
                                ]),
                                el('small', {id: 'errorDate', className: 'form-text'}),

                                el('div', {className: 'input-group mt-3'}, 
                                [
                                    el('span', 'Enter Email: ', {className: 'input-group-text'}),
                                    el('input', {type: 'text', id: 'getEmail', placeholder: `${hex_to_ascii(author_name)}`, className: 'form-control'}),
                                ]),
                                el('small', {id: 'errorEmail', className: 'form-text'}),
                                
                                el('div', {className: 'input-group mt-3'}, //mt mb - margin top, margin bottom
                                [
                                    el('span', 'Enter CVV/CVC: ', {className: 'input-group-text'}),
                                    el('input', {type: 'text', id: 'getCVC', maxlength: 3, size: 3, placeholder: '123', className: 'form-control'}),
                                ]),
                                el('small', {id: 'errorCVV', className: 'form-text'}),
                                
                                el('img', {visible: 'false', id: 'bankLogo'/*, alt: 'Here card bank logo'*/}),
                                el('button', 'Pay!', {id: 'btnPay', disabled: 'disabled', type: 'button', className: 'btn btn-primary'}),
                            ]), 
                    ]
                 )
            );
}

setChildren(window.document.body, createForm());

const errorNumber = document.getElementById('errorNumber');
const errorEmail = document.getElementById('errorEmail');
const errorDate = document.getElementById('errorDate');
const errorCVV = document.getElementById('errorCVV');
const month = document.getElementById('getMonth');
const year = document.getElementById('getYear');
const image = document.getElementById('bankLogo');
const number = document.getElementById('getNumber');
const btnpay = document.getElementById('btnPay');
const email = document.getElementById('getEmail');
const cvc = document.getElementById('getCVC');

getNumber.onblur = () => blurEvent(getNumber.id); //0_0
getMonth.onblur = () => blurEvent(getMonth.id);
getYear.onblur = () => blurEvent(getYear.id);
getEmail.onblur = () => blurEvent(getEmail.id);
getCVC.onblur = () => blurEvent(getCVC.id);

getNumber.oninput = () => clearError(getNumber.id); //0_0
getMonth.oninput = () => clearError(getMonth.id);
getYear.oninput = () => clearError(getYear.id);
getEmail.oninput = () => clearError(getEmail.id);
getCVC.oninput = () => clearError(getCVC.id);

getNumber.onfocus = () => clearError(getNumber.id); //0_0
getMonth.onfocus = () => clearError(getMonth.id);
getYear.onfocus = () => clearError(getYear.id);
getEmail.onfocus = () => clearError(getEmail.id);
getCVC.onfocus = () => clearError(getCVC.id);