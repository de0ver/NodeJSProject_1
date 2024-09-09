import {el, setChildren} from 'redom';
import bootstrap from 'bootstrap';
import * as validator from 'card-validator';
//https://www.npmjs.com/package/card-validator

function checkCardNumber(cardNumber)
{
    return console.log(validator.number(cardNumber));
}

function createForm()
{
    const body = el('div', {className: 'card'}, el('input', {type: 'text', id: 'getCard'}));
    setChildren(body);
}

setChildren(window.document.body, createForm());