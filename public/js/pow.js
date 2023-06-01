const calHash = (str) => {
  return CryptoJS.SHA256(str).toString();
};
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const socket = io("https://bc-demo.herokuapp.com/");
// const socket = io("http://localhost:5000");
const mine = async(difficulty) => {
  let i = 0;
  nonce = random(1, 10000000);
  index = $("#index").val();
  prevHash = $("#prevHash").val();
  timestamp = Date.now();
  data = $("#data").val();
  let key = i.toString().padStart(difficulty, "0");
  do {
    nonce = random(1, 10000000);
    $("#nonce").val(nonce);
    console.log("nonce: ", nonce);
    hash = calHash(index + nonce + timestamp + data + prevHash);
    key = i.toString().padStart(difficulty, "0");
    $("#hash").val(hash);
  } while ($("#hash").val().substr(0, difficulty) !== key);
  console.log("hash: ", $("#hash").val());
  // socket.emit('mined', {block: {index, prevHash, timestamp, data, hash, nonce}});
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post("/pow", {
    block: { index, prevHash, timestamp, data, hash, nonce },
    user,
  });
    if (res.data.code === 200) {
        $("#userCoin").text(res.data.user.coin + "$");
        $("#index").val(res.data.block.index + 1);
        $("#prevHash").val(res.data.block.hash);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        $("#hash").val(
            calHash(
              $("#index").val() +
                $("#nonce").val() +
                Date.now().toString() +
                $("#data").val() +
                $("#prevHash").val()
            )
          );
    }
    nonce = random(1, 10000000);
  };

socket.on('lastest hash', ({hash, index}) => {
    $("#index").val(index + 1);
    $("#prevHash").val(hash);
    $("#hash").val(
        calHash(
          $("#index").val() +
            $("#nonce").val() +
            Date.now().toString() +
            $("#data").val() +
            $("#prevHash").val()
        )
      );
})


$(document).ready(function () {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    $("#username").text(user?.name);
    $("#userCoin").text(user?.coin + "$");
  } else {
    location.assign("/login");
  }

  $("#hash").val(
    calHash(
      $("#index").val() +
        $("#nonce").val() +
        Date.now().toString() +
        $("#data").val() +
        $("#prevHash").val()
    )
  );
});
