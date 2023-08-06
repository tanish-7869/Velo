if(localStorage.getItem('startTime')==null){
    document.getElementById('endRideButton').hidden = true;
}

const myHeaders = new Headers();
myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
const currentUser = localStorage.getItem('currentUser');
const url2 = 'http://localhost:8080/user/' + currentUser;
async function callApi(url2) {
    const response = await fetch(url2, {
        headers: myHeaders
    });
    const data = await response.json();
    const fullName = data.firstName + " " + data.lastName;
    document.getElementById('userName').innerHTML = fullName;
};
callApi(url2);
const id = localStorage.getItem('bike_id');
const url = 'http://localhost:8080/bike/' + id;
async function callBikeApi(url) {
    const response = await fetch(url, {
        headers: myHeaders
    });
    const data = await response.json();
    document.getElementById('companyName').innerHTML = data.company;
    if (data.basket == true) {
        document.getElementById('basket').innerHTML = 'Available';
    } else {
        document.getElementById('basket').innerHTML = 'Not Available';
    }
    if (data.gear == true) {
        document.getElementById('gear').innerHTML = 'Available';
    } else {
        document.getElementById('gear').innerHTML = 'Not Available';
    }
    document.getElementById('bikeID').innerHTML = 'Bike ID: ' + data.id;
    document.getElementById('rate').innerHTML = 'Rate: ₹' + data.rate + '/minute';
}
callBikeApi(url);


function startRide() {
    let current = new Date();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    localStorage.setItem('startTime', cTime);
    window.alert('Ride Started at time: ' + cTime);
    document.getElementById('endRideButton').hidden = false;
    document.getElementById('startRideButton').hidden = true;
}

function endRide() {
    let current = new Date();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    localStorage.setItem('endTime', cTime);
    const url = 'http://localhost:8080/trip/';
    async function saveTrip(url) {
        const response = await fetch(url, {
            method: 'POST',
            // headers: myHeaders,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
                // 'Authorization': 'Bearer '+localStorage.getItem('token'),
                // 'Access-Control-Allow-Origin' : '*'
            },
            body: JSON.stringify({
                user : {
                    rollNumber : localStorage.getItem('currentUser')
                },
                bike : {
                    id : localStorage.getItem('bike_id')
                },
                startTime : localStorage.getItem('startTime'),
                endTime : localStorage.getItem('endTime')
            })
        });
        const data = await response.json();
        const tripId = data.tripId;
        localStorage.setItem("tripId", tripId);
    };
    saveTrip(url);
    window.alert('Ride ended at: ' + cTime);
    window.location.href = '/payment page/2.html';
}

function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('bike_id');
    localStorage.removeItem('startTime');
    localStorage.removeItem('endTime');
    localStorage.removeItem('tripId');
    window.location.href = '/index.html';
}