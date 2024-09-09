import {el, setChildren} from 'redom';
import bootstrap from 'bootstrap';
import * as validator from 'card-validator';
//https://www.npmjs.com/package/card-validator

function checkCardNumber()
{
    let number = document.getElementById('getCardNum');
    let date = document.getElementById('getCardDate');

    if (date.value.length != 5)
    {
        return alert(`Date type: mm/yy (${formatDate(new Date())})`);
    }

    if (number.value.length < 8 || number.value.length > 19)
    {
        return alert('Minimum length: 8, Maximum length: 19'); 
    }

    return el('label');
}

function formatDate(date) //https://learn.javascript.ru/datetime#%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B8-%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4-%D0%B4%D0%B0%D1%82:~:text=%D0%B2%D1%81%D0%B5%20%D0%B2%20%D0%BF%D0%BE%D1%80%D1%8F%D0%B4%D0%BA%D0%B5.-,%D0%9F%D0%BE%D0%BB%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%B4%3A,-function%20formatDate(
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
                        el('label', 'Enter card date: ', {for: 'getCardDate'}),
                        el('input', {type: 'вфеу', id: 'getCardDate', pattern: '[0-9]{2}\/[0-9]{2}\/'}), //mm.yy 09/24
                        el('button', 'Check!', {type: 'button', onclick: checkCardNumber})
                    ]
                 )
            );
}

setChildren(window.document.body, createForm());