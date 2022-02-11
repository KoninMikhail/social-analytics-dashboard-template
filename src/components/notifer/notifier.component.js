const CLASS_NAME_NOTIFIER = 'notifier';
const CLASS_NAME_NOTIFIER_ACTIVE = 'notifier--active';

export default class Notifier {
    constructor(target) {
        this._elementRoot = typeof target === 'string' ? document.querySelector(target) : target;

        if (!(this._elementRoot.classList.contains(CLASS_NAME_NOTIFIER))){
            this._elementRoot.classList.add(CLASS_NAME_NOTIFIER);
        }
        this._elementRoot.innerHTML = Notifier.template();

        this._elementRoot.addEventListener('click', this._onClick.bind(this));
    }
    _onClick() {
        this.reset();
    }

    reset() {
        this._elementRoot.classList.remove(CLASS_NAME_NOTIFIER_ACTIVE);
    }
    alert() {
        this._elementRoot.classList.add(CLASS_NAME_NOTIFIER_ACTIVE);
    }
}

Notifier.template = () => {
    return `<div class="notifier__icon">
                <svg class="notifier__icon--svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.0206 11.8002V8.91016C18.0206 5.61016 15.3206 2.91016 12.0206 2.91016C8.71058 2.91016 6.02058 5.60016 6.02058 8.91016V11.8002C6.02058 12.4102 5.76058 13.3402 5.45058 13.8602L4.30058 15.7702C3.59058 16.9502 4.08058 18.2602 5.38058 18.7002C9.69058 20.1402 14.3406 20.1402 18.6506 18.7002C19.8606 18.3002 20.3906 16.8702 19.7306 15.7702" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                    <path d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z" stroke="#currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.0195 19.0601C15.0195 20.7101 13.6695 22.0601 12.0195 22.0601C11.1995 22.0601 10.4395 21.7201 9.89953 21.1801C9.35953 20.6401 9.01953 19.8801 9.01953 19.0601" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"/>
                </svg>
            </div>
            <div class="notifier__ticker"></div>`;
};