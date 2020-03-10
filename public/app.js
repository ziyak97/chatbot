const form = document.querySelector('form')
const list = document.querySelector('.chatbot__list')
const listContainer = document.querySelector('.chatbot__list--container')

form.addEventListener('submit', e => {
    e.preventDefault()
    const input = document.querySelector('.chatbot__form--input').value
    if (!input) return
    const data = {
        query: input
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('/data', options)
        .then(res => res.json())
        .then(data => {
            list.innerHTML += `<li class="chatbot__item chatbot__item--client">${data.response}</li>`
            listContainer.scrollTo(0, scrollTo)
        })
    form.reset()
    list.innerHTML += `<li class="chatbot__item chatbot__item--user">${input}</li>`

    const scrollTo = list.scrollHeight
    listContainer.scrollTo(0, scrollTo)
})