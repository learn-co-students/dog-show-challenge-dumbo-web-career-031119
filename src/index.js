document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.getElementById('table-body')
    const dogForm = document.getElementById('dog-form')
    //loadDogs
    const loadDogs = () => {
        fetch('http://localhost:3000/dogs/').then(stuff => stuff.json())
            .then(dogs => {
                dogs.forEach(element => {
                    postDog(element)
                });
            });
    }
    loadDogs()
    const postDog = dog => {
        // console.log(dog)
        dogTable.innerHTML += `<tr id=${dog.id}><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id=${dog.id}>Edit</button></td></tr>`
    }
    // console.log(dogForm.name.value = 'test')


    const fillDogInfo = (event) => {
        // console.log(event.target.dataset.id)
        dogForm.dataset.id = event.target.dataset.id
        currentTr = event.target.parentElement.parentElement
        dogForm.name.value = (event.target.parentElement.parentElement.cells[0].innerHTML)
        dogForm.breed.value = (event.target.parentElement.parentElement.cells[1].innerHTML)
        dogForm.sex.value = (event.target.parentElement.parentElement.cells[2].innerHTML)
    }

    const submitDogInfo = (event) => {
        event.preventDefault()

        fetch(`http://localhost:3000/dogs/${dogForm.dataset.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: event.target.name.value,
                breed: event.target.breed.value,
                sex: event.target.sex.value
            })
        }).then(res => res.json()).then((edited) => {
            //find by dogId
            var dogLi = document.getElementById(dogForm.dataset.id)
            dogLi.innerHTML = `<td>${edited.name}</td> <td>${edited.breed}</td> <td>${edited.sex}</td> <td><button data-id=${edited.id}>Edit</button></td>`
        })
    }

    dogTable.addEventListener('click', fillDogInfo)
    dogForm.addEventListener('submit', submitDogInfo)
})