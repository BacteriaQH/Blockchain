const socket = io("https://bc-demo.herokuapp.com/");

$(document).ready(function () {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    $("#username").text(user?.name);
    $("#userCoin").text(user?.coin + "$");
  } else {
    location.assign("/login");
  }

  const rdNonce = randomNonce();
  // $("#nonce").val(rdNonce);
});

const randomNonce = () => {
  return Math.floor(Math.random() * (999999 - 100000) + 100000);
};

const calHash = (str) => {
  return CryptoJS.SHA256(str).toString();
};

socket.on("choosen", (dataf) => {
  alert("You are choosen to create new block");
  const rdNonce = randomNonce();
  const index = $("#index").val();
  const prevHash = $("#prevHash").val();
  const timestamp = Date.now().toString();
  const data = $("#data").val();
  const user = JSON.parse(localStorage.getItem("user"));
  $("#nonce").val(rdNonce);
  $("#hash").val(calHash(index + rdNonce + timestamp + data + prevHash));
  socket.emit("mined", {
    block: {
      index,
      prevHash,
      timestamp,
      data,
      hash: calHash(index + rdNonce + timestamp + data + prevHash),
      nonce: rdNonce,
    },
    user,
    socketId: dataf.socketId,
  });
});

socket.on("orther choosen", () => {
  alert("You are not choosen to create new block");
});

const mine = () => {
  socket.emit("join mine");
};

socket.on("last hash", (data) => {
  localStorage.removeItem("user");
  localStorage.setItem("user", JSON.stringify(data.user));
  $("#prevHash").val(data.block.hash);
  $("#userCoin").text(data.user.coin + "$");
  $("#index").val(data.block.index + 1);
});
socket.on("lastest hash", (data) => {
  $("#prevHash").val(data.hash);
  $("#index").val(data.index + 1);
});
