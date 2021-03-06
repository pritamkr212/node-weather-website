console.log('client side javascript file in loader');

// -->>fetch schema
// fetch('https://--link').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })



const weatherForm =document.querySelector('form')
const search=document.querySelector('input')

const messageOne=document.querySelector('#message-1')
// messageOne.textContent='loading'

const messageTwo=document.querySelector('#message-2')
// messageTwo.textContent=''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value;
    messageOne.textContent='Loading...'
    messageTwo.textContent='';
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                console.log(data.error);
                messageOne.textContent=data.error;
            }
            else 
            {
                console.log(data.location);
                console.log(data.forecast);
                messageOne.textContent=data.location,
                messageTwo.textContent=data.forecast
            }
        })
    })
})