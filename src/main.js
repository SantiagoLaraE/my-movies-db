import { API_KEY } from "./secrets.js";

navToggleBtn.addEventListener('click', function () {
    if(headerNav.classList.contains('open')){
        headerNav.classList.remove('open');
        this.classList.remove('open');
    }else{
        this.classList.add('open');
        headerNav.classList.add('open');
    }
});

navSearchToggleBtn.addEventListener('click', function () {
    if(headerSearch.classList.contains('open')){
        headerSearch.classList.remove('open');
        this.classList.remove('open');
    }else{
        this.classList.add('open');
        headerSearch.classList.add('open');
    }
});