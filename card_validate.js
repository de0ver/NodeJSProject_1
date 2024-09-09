import {el, setChildren} from 'redom';
import bootstrap from 'bootstrap';
import * as validator from 'card-validator';
//https://www.npmjs.com/package/card-validator

function checkCardNumber()
{
    let number = document.getElementById('getCardNum');
    let date = document.getElementById('getCardDate');
    let checkDate = validator.expirationDate(date.value, (new Date().getFullYear() % 100)).isValid;
    let checkNumber = validator.number(number.value);
    const errorMessageN = document.getElementById('errorMessageNum');
    const errorMessageD = document.getElementById('errorMessageDate');
    
    if (!(checkDate.isValid))
    {
        errorMessageD.textContent = `Date type: mm/yy (${formatDate(new Date())})`;
        errorMessageD.style.color = 'red'; 
    } else {
        errorMessageD.textContent = 'Good!';
        errorMessageD.style.color = 'green'; 
    }
    
    //if (!(/^\d{8,19}$/.test(number.value)))
    if (!(/^\d[0-9]{8,19}$/.test(number.value)) && !(/^\d[0-9]{4}\s\d[0-9]{4}\s\d[0-9]{4}\s\d[0-9]{4}$/.test(number.value))) //!1234567891234567 || !1234 5678 9123 4567
    {
        errorMessageN.textContent = 'Enter a valid Credit Card Number (exactly 8-19 digits)';
        errorMessageN.style.color = 'red'; 
    } else {
        errorMessageN.textContent = 'Good!';
        errorMessageN.style.color = 'green';
    }

    if (!(checkNumber.isValid) || !(checkDate.isValid))
        return;

    return console.log(`Type: ${checkNumber.card.niceType}`);
}

function formatDate(date) //https://learn.javascript.ru/datetime#%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B8-%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4-%D0%B4%D0%B0%D1%82:~:text=formatDate(date)%2C%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%B0%D1%8F%20%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4%D0%B8%D1%82%20%D0%B4%D0%B0%D1%82%D1%83%20date%20%D0%B2%20%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B5%20%D0%B4%D0%B4.%D0%BC%D0%BC.%D0%B3%D0%B3%3A
{
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return mm + '/' + yy;
}

function createForm()
{
    const body = el('div', {className: 'card'}, 'Loading...');
    setChildren(body);
    return el('div', {className: 'container'}, 
                el('form', {className: 'cardCheck', action: ''}, 
                    [
                        el('h1', 'Card validate'), 
                        body, 
                        el('label', 'Enter card number: ', {for: 'getCardNum'}), 
                        el('input', {type: 'text', id: 'getCardNum', inputmode: 'numeric', minlength: '8', maxlength: '19'}), //4 * 4 + 3 пробела = 19 символов https://en.wikipedia.org/wiki/Payment_card_number#:~:text=Payment%20card%20numbers%20are%20composed%20of%208%20to%2019%20digits
                        el('br'),
                        el('small', {id: 'errorMessageNum', className: 'form-text'}),
                        el('br'),
                        el('label', 'Enter card date: ', {for: 'getCardDate'}),
                        el('input', {type: 'text', id: 'getCardDate', pattern: '[0-9]{2}\/[0-9]{2}\/', size: '5'}), //mm.yy 09/24
                        el('br'),
                        el('small', {id: 'errorMessageDate', className: 'form-text'}),
                        el('br'),
                        el('button', 'Check!', {type: 'button', onclick: checkCardNumber})
                    ]
                 )
            );
}

setChildren(window.document.body, createForm());