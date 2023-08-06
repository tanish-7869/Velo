async function getDuration(url){
    const response = await fetch(url, {
        headers: myHeaders
    });
    const data = await response.json();
    console.log(data);
    document.getElementById('rideDuration').innerHTML='Ride Duration: '+data;
}
async function getPrice(url){
    const response = await fetch(url, {
        headers: myHeaders
    });
    const data = await response.json();
    console.log(data);
    document.getElementById('totalAmount').innerHTML='Total Amount: ₹'+data;
}
const url = 'http://localhost:8080/trip/duration/'+localStorage.getItem('tripId');
const url2 = 'http://localhost:8080/trip/price/'+localStorage.getItem('tripId');
const myHeaders = new Headers();
myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
getDuration(url);
getPrice(url2);

function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('bike_id');
    localStorage.removeItem('startTime');
    localStorage.removeItem('endTime');
    localStorage.removeItem('tripId');
    window.location.href = '/index.html';
}