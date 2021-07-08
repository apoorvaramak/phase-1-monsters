document.addEventListener("DOMContentLoaded", (e) => {
    let form = document.createElement('FORM'); 
    form.id = "form"; 
    let name = document.createElement('INPUT');
    name.setAttribute('type', 'text'); 
    name.placeholder = 'name'
    let age = document.createElement('INPUT');
    age.setAttribute('type', 'text'); 
    age.placeholder = 'age'
    let desc = document.createElement('INPUT');
    desc.setAttribute('type', 'text'); 
    desc.placeholder = 'description'
    let submitBtn = document.createElement("button");
    submitBtn.id = "submitBtn"; 
    submitBtn.textContent = "Create a Monster";
    form.append(name, age, desc, submitBtn); 
    document.querySelector("#create-monster").append(form); 
    addMonster(); 
    let x = 1
    fiftyMonsters(x);
    document.querySelector("#forward").addEventListener('click', (e) => {
        fiftyMonsters(x++);
    })
    document.querySelector("#back").addEventListener('click', (e) => {
        fiftyMonsters(x--);
    })
})

function fiftyMonsters(page){
    let x = 1;
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => populatePage(element));
    })



}

function populatePage(data){
    let name = document.createElement('h2');
    let age = document.createElement('h4');
    let desc = document.createElement('h5'); 

    name.textContent = data.name;
    age.textContent = `Age: ${data.age}`;
    desc.textContent = `Bio: ${data.description}`

    document.querySelector('#monster-container').append(name, age, desc);
}

function addMonster(){
    document.querySelector('#form').addEventListener("submit", (e) =>{
        e.preventDefault(); 
        let name = document.createElement('h2');
        let age = document.createElement('h4');
        let desc = document.createElement('h5'); 

        name.textContent = e.target[0].value;
        age.textContent = `Age: ${e.target[1].value}`;
        desc.textContent = `Bio: ${e.target[2].value}`

        document.querySelector('#monster-container').append(name, age, desc);

        fetch("http://localhost:3000/monsters",{
            method: 'POST', 
            headers: 
            {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(
            { name: `${e.target[0].value}`, age: `${e.target[1].value}`, description: `${e.target[0].value}` } )
        }).then(response => response.json())
        .then(json => console.log(json))
    })

}