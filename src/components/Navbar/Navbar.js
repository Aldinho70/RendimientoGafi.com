import { Navbar } from '../../config/config.js';

$(document).ready(() =>{
    $(`#Navbar_root`).html(`
        <a class="navbar-brand p-2" href="#">
            <img src="${Navbar.img_brand}" alt="Logo Izquierdo">
            ${Navbar.brand}
        </a>
        <div class="navbar-icons text-light">
        <a class="navbar-brand p-2" href="#">
            <img src="${Navbar.img_brand_2}" alt="Logo Izquierdo">
            Jornada digital
        </a>
        </div>`
    );

    const styles = `
    <style>
        .navbar-custom {
            background-color: #343a40;
            padding: 10px 20px;
        }
        .navbar-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
        }
        .navbar-brand img {
            width: 40px;
            height: 40px;
        }
        .navbar-icons {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .navbar-icons img {
            width: 35px;
            height: 35px;
        }
    </style>`;
});
