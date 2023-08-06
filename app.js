if (localStorage.getItem('token') != null) {
    window.location.href = './main page/index.html';
}

document.getElementById('register-btn').addEventListener('click', function () {
    window.location.href = '/register page/register.html';
});

const form = document.getElementById('login');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const payload = new FormData(form);
    if (payload.get('rollNumber').trim() == "" || payload.get('password').trim() == "") {
        alert("Blank values not allowed");
    }
    else {
        const response = await fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            body: JSON.stringify({ rollNumber: payload.get('rollNumber'), password: payload.get('password') })
        });

        console.log(response.status);
        if (response.status == '404') {
            alert('Username does not exist');
        }
        else if (response.status == '401') {
            alert('Incorrect password');
        }
        else if (response.status == '400') {
            alert('invalid username format, use numbers only');
        }
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', payload.get('rollNumber'));
        window.location.href = '/main page/index.html';
    }

});