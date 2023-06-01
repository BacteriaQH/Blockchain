$(document).ready(function () {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      $("#username").text(user?.name);
      $("#userCoin").text(user?.coin + "$");
    }else{
      location.assign('/login');
    }
  });
  