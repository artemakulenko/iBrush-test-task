'use strict';
 

const form = document.querySelector('form.form')
const dropDownBtn = form.querySelector('.dropdown__button')
const dropDownBtnDefaultValue = dropDownBtn.textContent
const username = form.querySelector('#username');
const email = form.querySelector('#email');
const textarea = form.querySelector('#textarea');

const stars = Array.from(document.querySelectorAll('.feedback__star'))
const dropDown = Array.from(document.querySelectorAll('.dropdown'))

const statsMsg = document.querySelector('.stats')
const statsBtn = document.querySelector('.stats__remove')
let userRating = 0








// DropDown Logic 🔽
dropDown.forEach(function (dropDownWrapper) {
	const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
	const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
	const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
	const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

	// Select: Open/Close  
	dropDownBtn.addEventListener('click', function (e) {
    e.preventDefault()
		dropDownBtn.classList.toggle('dropdown__button--active')
		dropDownList.classList.toggle('dropdown__list--visible');
	});

	// Select dropdown element
	dropDownListItems.forEach(function (listItem) {
		listItem.addEventListener('click', function (e) {
			e.stopPropagation();
			dropDownBtn.innerText = this.innerText;
			dropDownBtn.focus();
			dropDownInput.value = this.dataset.value;
			dropDownBtn.classList.remove('dropdown__button--active')
			dropDownList.classList.remove('dropdown__list--visible');
		});
	});

	// Close dropdown when click outside btn
	document.addEventListener('click', function (e) {
		if (e.target !== dropDownBtn) {
			dropDownBtn.classList.remove('dropdown__button--active');
			dropDownList.classList.remove('dropdown__list--visible');
		}
	});

	// Tab / Escape => Close dropdown
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Tab' || e.key === 'Escape') {
			dropDownBtn.classList.remove('dropdown__button--active');
			dropDownList.classList.remove('dropdown__list--visible');
		}
	});
});
 


// Star Rating Logic 🔽
stars.forEach(item => {
  item.addEventListener('click', () => {
    const { itemValue } = item.dataset
    item.parentNode.dataset.totalValue = itemValue
    userRating = itemValue
  })
})







// ============= Form Validation 🔽  =============


// Regexp to check is email valid
const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


// Display input error in form group
const setError = (element, message) => {
  const formGroup = element.parentElement.parentElement;
  const errorDisplay = formGroup.querySelector('.form__error')

  errorDisplay.textContent = message

  formGroup.classList.add('error')
  formGroup.classList.remove('succes')
  formGroup.classList.remove('shake-horizontal')
  formGroup.offsetWidth
  formGroup.classList.add('shake-horizontal')
}


// Apply input success in form group
const setSuccess = element => {
  const formGroup = element.parentElement.parentElement;
  const errorDisplay = formGroup.querySelector('.form__error')

  errorDisplay.textContent = ''
  formGroup.classList.remove('error')
  formGroup.classList.add('success')
  formGroup.classList.remove('shake-horizontal')
}


// Validation 
const validate = () => {
  const usernameValue = username.value.trim()
  const emailValue = email.value.trim()
	const textareaValue = textarea.value.trim()
	const dropDownBtnValue = dropDownBtn.textContent;
  let valid = false  

  if(dropDownBtnValue == dropDownBtnDefaultValue){
    setError(dropDownBtn, 'Выберите книгу')
  } else{
    setSuccess(dropDownBtn)
    const hidenInput = dropDownBtn.parentElement.parentElement.querySelector('input')
    hidenInput.value = dropDownBtnValue
  }

  usernameValue == '' ? setError(username, 'Заполните имя') : setSuccess(username)

	textareaValue == '' ? setError(textarea, 'Заполните имя') : setSuccess(textarea)

  if (emailValue === '') setError(email, 'Заполните email')
  else if(!isValidEmail(emailValue)) setError(email, 'Введите валидный email')
  else setSuccess(email)
  
  const getAllInvalids = Array.from( form.querySelectorAll('.form__group.error') ).length

  getAllInvalids == 0 ? valid = true : valid = false

  return valid
}
















// Submit Form 
form.addEventListener('submit', (e) => {
  e.preventDefault();  


	if( validate() ){
    const inputs = [];
    form.querySelectorAll('.to-stats').forEach((input) => {
      const { name, value } = input;
      inputs.push({ name, value });
    });
    
		inputs.push({
      name: 'userRating',
      value: userRating
    })

    statsMsg.classList.remove('stats__disable')
    console.table(inputs);
    form.reset();
  } else return false
});




// Remove Stats message after success submit 🔽
statsBtn.addEventListener('click', function(){
  const stats = this.parentElement
  stats.classList.add('stats__disable')
})
