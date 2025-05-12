import {Footer} from '../../config/config.js';

$(document).ready(() => {
    $(`#Footer_root`).html(Footer.copyright);
})