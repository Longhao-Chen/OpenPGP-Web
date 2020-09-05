//在服务器上搜索密钥

//通过密钥id来搜索，失败返回 未定义
async function searchById(keyid) {
	var hkp = new openpgp.HKP();
	try {
		var publicKeyArmored = await hkp.lookup({
			keyId: keyid
		});
	} catch (e) {
		alert("搜索密钥时出现错误，错误代码:\n" + e);
	}
	return publicKeyArmored;
}

//通过邮箱来搜索，失败返回 未定义
async function searchByEmail(email) {
	var hkp = new openpgp.HKP();
	try {
		var publicKeyArmored = await hkp.lookup({
			query: email
		});
	} catch (e) {
		alert("搜索密钥时出现错误，错误代码:\n" + e);
	}
	return publicKeyArmored;
}