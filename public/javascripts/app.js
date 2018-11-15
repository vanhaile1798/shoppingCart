let qty = document.getElementsByClassName('qty');

let selectTag = document.getElementsByTagName('select');
if (document.getElementsByClassName('total-qty').length > 0) {
	var totalQty = parseInt(document.querySelector('.total-qty').innerHTML);
}

if (document.getElementById('total-amount')) {
	var totalAmount = parseInt(document.getElementById('total-amount').innerHTML);
}

let price = document.getElementsByClassName('price');

// Xử lý sau khi add to cart, add nhiều lần thì select tag sẽ thay đổi, ví dụ add 1 item lần thứ 2 thì option sẽ là 2
for (let i = 0; i < selectTag.length; i++) {
	for (let j = 0; j <= 9; j++) {
		if (parseInt(selectTag[i][j].value) == parseInt(qty[i].innerHTML)) {
			selectTag[i][j].setAttribute('selected', true);
		} 
	}

}

// Giá trị số lượng trước khi thay đổi
var preVal = 0;



for (let i = 0; i < selectTag.length; i++) {
	selectTag[i].addEventListener('change', function() {
		var totalAmt = 0; 
		let val = parseInt(selectTag[i].value); //Sau khi thay đổi option thì giá trị mới sẽ được gán cho value

		let perPrice = parseInt(price[i].innerHTML) / parseInt(qty[i].innerHTML); // Tính giá trị của 1 sản phẩm
		let priceChange = perPrice * val; // Tổng giá trị sau khi tăng số lượng muốn mua
		price[i].innerHTML = priceChange; // Thay đổi tổng giá trị sau khi thay đổi option của select


		preVal = parseInt(qty[i].innerHTML); //Số lượng sản phẩm trước khi thay đổi
		totalQty = totalQty - preVal + val; // Tổng số lượng sản phẩm trong giỏ hàng sau khi thay đổi


		document.getElementsByClassName('total-qty')[0].innerHTML = totalQty; // Thay đổi tổng số lượng của cart
		document.getElementsByClassName('total-qty')[1].innerHTML = totalQty; // Như trên

		for (let j = 0; j < price.length; j++) {
			totalAmt += parseInt(price[j].innerHTML);
		}
		document.getElementById('total-amount').innerHTML = totalAmt; // Tổng giá trị của cart
		qty[i].innerHTML = val; // Sau khi thay đổi thì lưu giá trị sau khi thay đổi thành giá trị hiện tại

		let data = {
			id: document.getElementsByClassName('id')[i].innerHTML,
			qty: val,
			totalAmount: totalAmt,
			totalQty: totalQty
		};
		
		axios.post('/cart/update', data) 
					.then(function (response) {
    					console.log(response);
  				})
  				.catch(function (error) {
    				console.log(error);
  				});
	});
}