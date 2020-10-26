console.log('CLient side javaSript is running')



const form = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')




form.addEventListener('submit', (e) => {
    e.preventDefault()

    const address=search.value

    message1.textContent = 'Loading..........'
    message2.textContent = ' '

    fetch('http://localhost:3001/weather?address='+address).then((resp)=>{
        resp.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
            }else{
                message1.textContent = data.Location 
                message2.textContent = data.response
            }
        })
    })
})