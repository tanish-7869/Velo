if(localStorage.getItem('token')==null){
    document.getElementById('map').hidden = true;
}

const myHeaders = new Headers();
myHeaders.append('Authorization', 'Bearer '+localStorage.getItem('token'));

fetch('http://localhost:8080/bike/all', {headers: myHeaders}).then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Network response error");
    }
})
    .then(data => {
        createList(data);
    })
    .catch((error) => console.error("fetch error" + error));

function createList(data) {
    data.forEach((element, i) => {
        const main = document.querySelector(".row");

        const card = document.createElement('div');
        card.classList = 'pricing-col col-lg-4 col-md-6';

        const bikeCard = `
              <div class="card">
                <div class="card-body">
                    <h3>${data[i].company}</h3>
                    <p>${"ID: " + data[i].id}</p>
                    <h3>${"₹ " + data[i].rate}</h3>
                    <button type="button" class="btn btn-outline-dark btn-block btn-lg" onclick="buttonClick(${data[i].id})"}>Book bike</button>
                </div>
            </div>
    `;

        card.innerHTML += bikeCard;
        main.appendChild(card);
    });
}

const currentUser = localStorage.getItem('currentUser');
const url = 'http://localhost:8080/user/'+currentUser;
async function callApi(url) {
    const response = await fetch(url, {
        headers: myHeaders
    });
    const data = await response.json();
    const fullName = data.firstName + " " + data.lastName;
    console.log(fullName);
    createBar(fullName);
  };
callApi(url);
function createBar(data) {
    const userDiv = document.querySelector(".user");
    const user = document.createElement('div');
    user.classList = 'user';
    const userCard = `
    <span class="displayedUser">
        <h3>${"Current User: " + data}</h3>
    </span>
    `;

    user.innerHTML += userCard;
    userDiv.appendChild(user);
}

document.getElementById('logout').addEventListener('click', function(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('bike_id');
    localStorage.removeItem('startTime');
    localStorage.removeItem('endTime');
    localStorage.removeItem('tripId');
    window.location.href = '/index.html';
});

function buttonClick(id){
    localStorage.setItem('bike_id', id);
    window.location.href = '/bike info page/startridealt.html';
}