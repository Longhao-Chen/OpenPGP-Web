$(function () {
	var hash = window.location.hash.split("#");	//[0]是空的，有效字符从[1]开始
	if (hash[1] === "pub")
		exppub(hash[2]);
	else
		exppri(hash[2]);
});

function exppub(id) {
	document.getElementById("exp_key").value = PubRead(id);
}

async function exppri(id) {
	//修改背景
	$("*").addClass("bg-danger");
	$("*").removeClass("bg-dark");

	alert("警告：你正在导出私钥，请确保你能明白此操作的后果");

	//对有密码的先进行密码验证
	var privateKeyArmored = PriRead(id);
	const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);
	if (privateKey.isDecrypted())
		document.getElementById("exp_key").value = privateKeyArmored;
	else {
		try {
			var passphrase = window.prompt("请输入此密钥的口令以进行身份验证");
			await privateKey.decrypt(passphrase);
		} catch (e) {
			alert("密码错误，导出失败！");
			return
		}
		document.getElementById("exp_key").value = privateKeyArmored;
	}
}