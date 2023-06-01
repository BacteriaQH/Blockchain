const handleLogin = async () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const res = await axios.post('/login', {email, password});

    if(res.status === 200){
        alert('success', 'Login success!');
        localStorage.setItem('user', JSON.stringify(res.data.user));
        location.assign('/');
    }else{
        alert('error', res.response.data.message);
    }

}