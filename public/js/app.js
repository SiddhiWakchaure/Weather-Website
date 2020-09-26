console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')//converts html form tag to javascript.
const search = document.querySelector('input')
const messegeOne = document.querySelector('#messege-1')
const messegeTwo = document.querySelector('#messege-2')


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    messegeOne.textContent = 'Loading weather info...'
    messegeTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>{//data is the name of object present on that pg (/weather).
        if (data.error){
            messegeOne.textContent = data.error
        }
        else{
            messegeOne.textContent = data.location
            messegeTwo.textContent = data.forecast
        }
    })
})
    
})

