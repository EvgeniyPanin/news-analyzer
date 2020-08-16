class SearchInput {
  constructor(form, ERROR_MESSAGES, searchNews) {
    this._form = form;
    this._input = form.elements.input;
    this._errorItem = form.querySelector('.search-form__error');
    this._ERROR_MESSAGES = ERROR_MESSAGES;
    this._button = form.querySelector('button');
    this._searchNews = searchNews;
    this._setEventListeners();
  }

  _checkFormValidity(input) {
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(this._ERROR_MESSAGES.emptyString);
      return false
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this._ERROR_MESSAGES.errorLength);
      return false
    }

    return input.checkValidity();
  }

  _toggleInputError(field) {
    this._errorItem.textContent = field.validationMessage;
  }

  handlerInputForm = () => {
    const valid = this._checkFormValidity(this._input);
    this._toggleInputError(this._input);

    this.setSubmitButtonState(valid);
  }

  _handlerSubmitForm = (evt) => {
    evt.preventDefault();
    const word = this._input.value;
    this._searchNews(word);
  }

  setSubmitButtonState(state) {
    if (state) {
      this._button.removeAttribute('disabled');
      this._button.classList.remove('button_disabled');
    } else {
      this._button.setAttribute('disabled', 'disabled');
      this._button.classList.add('button_disabled');
    }
  }

  _setEventListeners() {
    this._input.addEventListener('input', this.handlerInputForm);
    this._form.addEventListener('submit', this._handlerSubmitForm);
  }

  setInputContent = (content) => {
    this._input.value = content;
  }

  _removeEventListeners() {

  }
}

export default SearchInput;
