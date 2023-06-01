const randomPoS = (arr) => {
  let total = 0;
  arr.forEach((element) => {
    total += element.coin;
  });
  let random = Math.floor(Math.random() * total);
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].coin;
    if (random < sum) {
      return arr[i];
    }
  }
};
module.exports = randomPoS;
//PoW: client hash index, nonce, timestamp, data, prevHash để ra 1 cái hash mới cho đến khi thoả mãn
// độ khó đã đề ra (x số 0 đầu) thì gửi lên server. Server sẽ kiểm tra lại nếu thoả mãn thì lưu
// block lại . Client sẽ được thưởng 1 coin

// PoA: client khi bấm mine sẽ gửi lên server 1 socket thông báo tham gia vào quá trình mine.
// server sẽ lưu lại socket id . Khi có hơn 2 client kết nối đến thì server sẽ chọn ngẫu nhiên
// 1 client để tạo block. Server sẽ gửi đến client được chọn 1 socket thông báo là được chọn.
// CLient sẽ tạo 1 mã block có index, nonce, timestamp, data, prevHash và hash. Client sẽ gửi
// đến server block vừa tạo. Server sẽ kiểm tra lại block vừa tạo có hợp lệ không. Nếu hợp lệ thì
// gửi mã hash và index đến tất cả các client đang kết nối.
// Client được chọn sẽ được thưởng 1 coin.

// PoS: Client sẽ gửi đến server 1 socket chứa socket id, số coin đặt cược, email. Nếu hơn 2
// client kết nối thì server sẽ dựa vào số coin đặt cược để chọn ngẫu nhiên 1 client. Server sẽ
// gửi đến client được chọn 1 socket thông báo là được chọn.
// CLient sẽ tạo 1 mã block có index, nonce, timestamp, data, prevHash và hash. Client sẽ gửi
// đến server block vừa tạo. Server sẽ kiểm tra lại block vừa tạo có hợp lệ không. Nếu hợp lệ thì
// gửi mã hash và index đến tất cả các client đang kết nối.
// Client được chọn sẽ được thưởng 1 coin.
