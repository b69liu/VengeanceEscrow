import {join} from 'lodash';

export default function printMe() {
    console.log('I get called from print.js!');
    console.log(join(['Another', 'module', 'loaded!'], ' '));
}