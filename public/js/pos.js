const socket = io("https://bc-demo.herokuapp.com");
$(document).ready(function () {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    $("#username").text(user?.name);
    $("#userCoin").text(user?.coin + "$");
  } else {
    location.assign("/login");
  }
});

const calHash = (str) => {
  return CryptoJS.SHA256(str).toString();
};
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const mine = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userCoin = user?.coin;
  const coinRandom = random(1, userCoin);
  console.log("coinRandom: ", coinRandom);
  socket.emit("join mine pos", {
    coin: coinRandom,
    email: user.email,
    socketId: socket.id,
  });
};

socket.on("choosen pos", () => {
  alert("You are choosen to create new block");
  const user = JSON.parse(localStorage.getItem("user"));
  const prevHash = $("#prevHash").val();
  const timestamp = Date.now().toString();
  const data = $("#data").val();
  const index = $("#index").val();
  const rdNonce = random(100000, 999999);
  $("#nonce").val(rdNonce);
  $("#hash").val(calHash(index + rdNonce + timestamp + data + prevHash));
  socket.emit("mined pos", {
    block: {
      index,
      prevHash,
      timestamp,
      data,
      hash: calHash(index + rdNonce + timestamp + data + prevHash),
      nonce: rdNonce,
    },
    user,
    socketId: socket.id,
  });
});

socket.on("last hash pos", (data) => {
  localStorage.removeItem("user");
  localStorage.setItem("user", JSON.stringify(data.user));
  $("#prevHash").val(data.block.hash);
  $("#userCoin").text(data.user.coin + "$");
  $("#index").val(data.block.index + 1);
  $("#data").val("");
  $("#hash").val("");
});

socket.on("lastest hash pos", (data) => {
  $("#prevHash").val(data.hash);
  $("#index").val(data.index + 1);
  $("#data").val("");
  $("#hash").val("");
});
