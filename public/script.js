let updateBtns = document.querySelectorAll('.update-btn')
let updateRecord = document.getElementById('update-record')
let form = document.getElementById('update-form');


updateBtns.forEach(btn => {
    btn.addEventListener('click', e => {
    	window.location = `/spendings/${e.target.dataset.id}/update`
    })
})

form.addEventListener('create', e => {
    e.preventDefault()

    let formData = new FormData(form)

    fetch(`/spendings/update/${e.target.dataset.id}`, {
    	method: 'PUT',
    	headers: {
    		'Content-Type': 'application/json'
    	},
    	body: JSON.stringify({ data: Object.fromEntries(formData)})
    })
    .then(res => res.json())
    .then(data => {
    	console.log(data)
    })
})