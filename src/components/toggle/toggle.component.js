const CLASS_NAME_TOGGLE = 'toggle';
const CLASS_NAME_TOGGLE_ACTIVE = 'toggle--active';

export default class Toggle {
    constructor(target, position, onChangeFunc) {
        this._elementRoot = typeof target === 'string' ? document.querySelector(target) : target;
        this._positionState = typeof position === 'boolean' ? position : false;
        this._onChange = onChangeFunc;

        if (!(this._elementRoot.classList.contains(CLASS_NAME_TOGGLE))){
            this._elementRoot.classList.add(CLASS_NAME_TOGGLE);
        };
        this._elementRoot.innerHTML = Toggle.template(this._onChange);

        if (this._positionState == true){
            this.checked();
        }

        this._elementRoot.addEventListener('click', this._onClick.bind(this));
    }

    _onClick() {
        const type = this._elementRoot.classList.contains(CLASS_NAME_TOGGLE_ACTIVE);

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
        this._elementRoot.classList.add(CLASS_NAME_TOGGLE_ACTIVE);
    }

    unchecked() {
        this._elementRoot.classList.remove(CLASS_NAME_TOGGLE_ACTIVE);
    }

    toggle() {
        if (this._elementRoot.classList.contains(CLASS_NAME_TOGGLE_ACTIVE)) {
            this.checked();
        } else {
            this.unchecked();
        }
    }
    get value() {
        return this._elementRoot.classList.contains(CLASS_NAME_TOGGLE_ACTIVE);
    }

    set value(value) {
        if (value == true) {
            this.checked();
        } else {
            this.unchecked();
        }
    }
}

Toggle.template = () => {
    return `<input type="checkbox" class="toggle-value"><span class="round-btn"></span>`;
};
