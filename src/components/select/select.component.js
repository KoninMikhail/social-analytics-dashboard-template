const CLASS_NAME_SELECT = 'select';
const CLASS_NAME_ACTIVE = 'select--show';
const CLASS_NAME_SELECTED = 'select__option_selected';
const SELECTOR_ACTIVE = '.select--show';
const SELECTOR_DATA = '[data-select]';
const SELECTOR_DATA_TOGGLE = '[data-select="toggle"]';
const SELECTOR_OPTION_SELECTED = '.select__option_selected';

export default class Select {
    constructor(target, params) {
        this._elementRoot = typeof target === 'string' ? document.querySelector(target) : target;
        this._params = params || {};
        if (this._params['options']) {
            if (!(this._elementRoot.classList.contains(CLASS_NAME_SELECT))){
                this._elementRoot.classList.add(CLASS_NAME_SELECT);
            };
            this._elementRoot.innerHTML = Select.template(this._params);
        }
        this._elementToggle = this._elementRoot.querySelector(SELECTOR_DATA_TOGGLE);
        this._elementRoot.addEventListener('click', this._onClick.bind(this));
    }
    _onClick(evt) {
        const target = evt.target;
        const type = target.closest(SELECTOR_DATA).dataset.select;
        switch (type) {
            case 'toggle':
                this.toggle();
                break;
            case 'option':
                this._changeValue(target);
                break;
        }
    }
    _update(option) {
        option = option.closest('.select__option');
        const selected = this._elementRoot.querySelector(SELECTOR_OPTION_SELECTED);
        if (selected) {
            selected.classList.remove(CLASS_NAME_SELECTED);
        }
        option.classList.add(CLASS_NAME_SELECTED);
        this._elementToggle.textContent = option.textContent;
        this._elementToggle.value = option.dataset['value'];
        this._elementToggle.dataset.index = option.dataset['index'];
        this._elementRoot.dispatchEvent(new CustomEvent('select.change'));
        this._params.onSelected ? this._params.onSelected(this, option) : null;
        return option.dataset['value'];
    }
    _reset() {
        const selected = this._elementRoot.querySelector(SELECTOR_OPTION_SELECTED);
        if (selected) {
            selected.classList.remove(CLASS_NAME_SELECTED);
        }
        this._elementToggle.textContent = 'Select';
        this._elementToggle.value = '';
        this._elementToggle.dataset.index = -1;
        this._elementRoot.dispatchEvent(new CustomEvent('select.change'));
        this._params.onSelected ? this._params.onSelected(this, null) : null;
        return '';
    }
    _changeValue(option) {
        if (option.classList.contains(CLASS_NAME_SELECTED)) {
            return;
        }
        this._update(option);
        this.hide();
    }
    show() {
        document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
            select.classList.remove(CLASS_NAME_ACTIVE);
        });
        this._elementRoot.classList.add(CLASS_NAME_ACTIVE);
    }
    hide() {
        this._elementRoot.classList.remove(CLASS_NAME_ACTIVE);
    }
    toggle() {
        if (this._elementRoot.classList.contains(CLASS_NAME_ACTIVE)) {
            this.hide();
        } else {
            this.show();
        }
    }
    dispose() {
        this._elementRoot.removeEventListener('click', this._onClick);
    }
    get value() {
        return this._elementToggle.value;
    }
    set value(value) {
        let isExists = false;
        this._elementRoot.querySelectorAll('.select__option').forEach((option) => {
            if (option.dataset['value'] === value) {
                isExists = true;
                return this._update(option);
            }
        });
        if (!isExists) {
            return this._reset();
        }
    }
    get selectedIndex() {
        return this._elementToggle.dataset['index'];
    }
    set selectedIndex(index) {
        const option = this._elementRoot.querySelector(`.select__option[data-index="${index}"]`);
        if (option) {
            return this._update(option);
        }
        return this._reset();
    }
}

Select.template = params => {
    const name = params['name'];
    const options = params['options'];
    const targetValue = params['targetValue'];
    let items = [];
    let selectedIndex = -1;
    let selectedValue = '';
    let selectedContent = 'Select';
    options.forEach((option, index) => {
        let selectedClass = '';
        if (option[0] === targetValue) {
            selectedClass = ' select__option_selected';
            selectedIndex = index;
            selectedValue = option[0];
            selectedContent = option[1];
        }
        items.push(`<li class="select__option${selectedClass}" data-select="option" data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);
    });
    return `<button type="button" class="select__toggle" name="${name}" value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">${selectedContent}</button>
  <div class="select__dropdown">
    <ul class="select__options">${items.join('')}</ul>
  </div>`;
};


document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.select')) {
        document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
            select.classList.remove(CLASS_NAME_ACTIVE);
        });
    }
});
