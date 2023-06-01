const handleRegister = async(e) => {
    // e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const name = document.querySelector('#name').value;

    const res = await axios.post('/register', {email, name, password});

    if(res.data.code === 200){
        alert('success', 'Account created successfully!');
        window.setTimeout(() => {
            location.assign('/login');
        }, 1500);
    }
    return;
}

