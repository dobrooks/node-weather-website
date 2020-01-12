console.log('Client side js script loaded  ' )


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#p1')
const messageTwo = document.querySelector('#p2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    url = "http://127.0.0.1:3000/weather?address=" + location
    messageOne.textContent ="Loading ...."

    fetch(url).then((response) => {
    response.json().then((data)=> {
        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ""
            console.log(data.error)
        } else {

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
        
    })
})
    console.log(location)
})