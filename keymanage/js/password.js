$(async function () {
	$("#success").hide();
	var index = window.location.hash.split("#")[1];
	document.getElementById("title").innerHTML = "修改 " + PriReadName(index) + "的密码";
});

//检查新密码是否有效
async function check() {
	var password_new = document.getElementById("password_new").value;
	var password_confirm = document.getElementById("password_confirm").value;

	if (password_confirm === password_new)
		return true;
	else {
		alert("密码不一致");
		return false;
	}
}

async function re_password() {
	if (!check())
		return

	var index = window.location.hash.split("#")[1];
	var privateKey = (await openpgp.key.readArmored(PriRead(index))).keys[0];
	var password_new = document.getElementById("password_new").value;

	//判断原来是否有密码
	if (!privateKey.isDecrypted()) {
		try {
			var password_old = document.getElementById("password_old").value;
			await privateKey.decrypt(password_old);
		} catch (e) {
			alert("解密密码错误！");
			return
		}
	}
	if (password_new != "")
		await privateKey.encrypt(password_new);
		
	PriCover(index, privateKey.armor());
	success();
}

//成功后回调的函数
function success() {
	$("#success").show("slow");
	$("#confirm").hide("slow");
}