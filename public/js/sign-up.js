const form = document.querySelector('form')


async function sendData(){
    const formData = new FormData(form);

    try{
        const response = await fetch('http://localhost:3000/sign-up', {
            method: 'POST',
            body: formData,
        });

        if (response.ok){
            alert('SUCCESSFUL')
            window.location.href = '/login'
        }else{
            // console.log('ERROR BELOW')
            console.error(response.status);
            alert('FAILED TO SUBMIT')
        }

        const responseData = await response.json
        console.log(responseData)
    }catch(e){console.error(e)}
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    sendData()
})
