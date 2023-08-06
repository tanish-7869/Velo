const form = document.getElementById('formRegister');


form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    if (formData.get('rollNumber').trim() == "" || formData.get('password').trim() == "" || formData.get('firstName').trim() == "" || formData.get('lastName').trim() == "" || formData.get('hostelName').trim() == "" || formData.get('phoneNumber').trim() == "") {
        alert("Blank values not allowed");
    }
    else if(formData.get('rollNumber').length!=9){
        alert("Invalid roll Number");
    }
    else if(formData.get('phoneNumber').length!=10){
        alert('Invalid Phone number');
    }
    else {
        const register = "http://localhost:8080/user/register";

    const response = await fetch(register, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            rollNumber: formData.get('rollNumber'),
            password: formData.get('password'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phoneNumber: formData.get('phoneNumber'),
            hostelName: formData.get('hostelName'),

        })
    });
    const data = response.json();
    console.log(response.status);
    if(response.status=='201'){
        window.location.href = '/index.html';
    }
    }
    
});
