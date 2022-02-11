const CLASS_NAME_HAMBURGER = 'hamburger';
const CLASS_NAME_HAMBURGER_ACTIVE = 'hamburger--active';

export default class Hamburger {
    constructor(target, position, onChangeFunc) {
        this._elementRoot = typeof target === 'string' ? document.querySelector(target) : target;
        this._positionState = typeof position === 'boolean' ? position : false;
        this._onChange = onChangeFunc;

        if (!(this._elementRoot.classList.contains(CLASS_NAME_HAMBURGER))){
            this._elementRoot.classList.add(CLASS_NAME_HAMBURGER);
        };

        this._elementRoot.innerHTML = Hamburger.template(this._onChange);

        if (this._positionState == true){
            this.checked();
        }

        this._elementRoot.addEventListener('click', this._onClick.bind(this));
    }

    _onClick() {
        const type = this._elementRoot.classList.contains(CLASS_NAME_HAMBURGER_ACTIVE);

        switch (type) {
            case true:
                this.unchecked();
                break;

            case false:
                this.checked();
                break;
        }
        if (this._onChange !== null && this._onChange !== undefined){
            this._onChange();
        }
    }

    checked() {
        this._elementRoot.classList.add(CLASS_NAME_HAMBURGER_ACTIVE);
    }

    unchecked() {
        this._elementRoot.classList.remove(CLASS_NAME_HAMBURGER_ACTIVE);
    }

    toggle() {
        if (this._elementRoot.classList.contains(CLASS_NAME_HAMBURGER_ACTIVE)) {
            this.checked();
        } else {
            this.unchecked();
        }
    }
    get value() {
        return this._elementRoot.classList.contains(CLASS_NAME_HAMBURGER_ACTIVE);
    }

    set value(value) {
        if (value == true) {
            this.checked();
        } else {
            this.unchecked();
        }
    }
}


Hamburger.template = () => {
    return `          <svg class="hamburger__svg" viewBox="0 0 100 100" width="65">
                          <path class="hamburger__line hamburger__line--top" d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
                          <path class="hamburger__line hamburger__line--middle" d="m 30,50 h 40" />
                          <path class="hamburger__line hamburger__line--bottom" d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
                      </svg>
    `;
};
