//check if service worker is supported on browser
if ('serviceWorker' in navigator){
    console.log('Service Worker Supported')

    //load serbice worker on page load
    window.addEventListener('load', () => {
        //access sw object
        navigator.serviceWorker
            .register('/sw.js')       //register service worker
            .then((result) => console.log('SW registered Successfully'))
            .catch((err) => console.log(`Error occured, ${err}`))
    })
}else{
    console.log('SW not supported')
}

// function whodis(){
//     console.log(this)
// }

// const jeff = {
//     name: 'jef',
//     age: 23,
//     whodis,
// }


// jeff.whodis()


gsap.from('.nav-container', {duration: 3.5, x:'-100%', ease: 'expo'});
// gsap.from('.library-section', {duration: 2.5, x: '400%', ease: 'expo', delay: 1.5 })


gsap.registerPlugin(ScrollTrigger);

gsap.from('.library-section', {

    scrollTrigger: {
        trigger: '.library-section',
        toggleActions: 'restart none none none',
        scrub: 1,
    },
    duration: 2.5,
    x: '400%',
    ease: 'expo',

    // scrollTrigger: {
    //     trigger: '.library-section',
    //     start: 'top 80%',
    //     // end: 'top 50%',
    //     toggleActions: 'play play play play '
    // }
});



// let elements = document.querySelectorAll('.text');
// elements.forEach((element) => {
//     //get inner text
//     const innerText = element.innerText
//     element.innerHTML = ''; //?

//     let textContainer = document.createElement('div');  //create div element for each letter
//     textContainer.classList.add('block');       //add block class to each div for each letter
// })