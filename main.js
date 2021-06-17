// DOM elements
/** @type {HTMLSpanElement} */
const resultEl = document.querySelector('#result')
/** @type {HTMLInputElement} */
const lengthEl = document.querySelector('#length')
/** @type {HTMLInputElement} */
const uppercaseEl = document.querySelector('#uppercase')
/** @type {HTMLInputElement} */
const lowercaseEl = document.querySelector('#lowercase')
/** @type {HTMLInputElement} */
const numbersEl = document.querySelector('#numbers')
/** @type {HTMLInputElement} */
const symbolsEl = document.querySelector('#symbols')
/** @type {HTMLButtonElement} */
const generateEl = document.querySelector('#generate')
/** @type {HTMLButtonElement} */
const clipboardEl = document.querySelector('#clipboard')

// list of all random functions
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
}

// listeners
// generate event listener
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value
  const hasLower = lowercaseEl.checked
  const hasUpper = uppercaseEl.checked
  const hasNumber = numbersEl.checked
  const hasSymbol = symbolsEl.checked

  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
  const password = resultEl.innerText

  if (!password) {
    return
  }

  if ('clipboard' in navigator && 'writeText' in navigator.clipboard) {
    // current way of doing it
    navigator.clipboard.writeText(password)
  } else {
    // old way deprecated and may be removed
    const textarea = document.createElement('textarea')
    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }

  alert('Password copied to clipboard')
})

/**
 * Generate password function
 *
 * @param {boolean} lower
 * @param {boolean} upper
 * @param {boolean} number
 * @param {boolean} symbol
 * @param {number} length
 *
 * @returns {string}
 */
function generatePassword(lower, upper, number, symbol, length) {
  // 1. Initialize password variable
  // 2. Filter out unchecked types
  // 3. Loop over the length. call generator function for each type
  // 4. Add final password to the password variable  and return it
  let generatedPassword = ''

  const typesCount = lower + upper + number + symbol

  const typeArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])

  // no option checked return empty string
  if (typesCount === 0) {
    return ''
  }

  for (let i = 0; i < length; i += typesCount) {
    typeArr.forEach(type => {
      const functionName = Object.keys(type)[0]
      generatedPassword += randomFunc[functionName]()
    })
  }

  const finalPassword = generatedPassword.slice(0, length)

  return finalPassword
}

// Generator functions

/**
 * Generate a random lower-case string
 *
 * @returns {string}
 */
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

/**
 * Generate a random upper-case string
 *
 * @returns {string}
 */
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

/**
 * Generate a random number
 *
 * @returns {number}
 */
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

/**
 * Generate a random symbol
 *
 * @returns {string}
 */
function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)]
}
