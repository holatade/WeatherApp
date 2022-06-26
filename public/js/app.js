console.log('Client side javascript')

const getForecast = (address,callback) => fetch(`http://localhost:3000/weather?address=${address}`)
.then((response) => {
    response.json().then((data) => {
        callback(data);
    })
})
.catch((error) => {
    callback({error})
})

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageTwo.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = searchElement.value
    getForecast(location,(data) => {
        if(data.error){
            messageTwo.textContent = ''
            messageOne.textContent = data.error
            return
        }
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
    })
})