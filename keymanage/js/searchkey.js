async function successalert() {	//保存成功后的回调函数
	$("#keyaddalert").show("slow");
	$("#btn-addkey").hide("slow");
}

//搜索密钥并导入
async function searchkey() {
	var email = document.getElementById("email").value;
	if (email == "") {
		alert("邮件地址不能为空");
		return
	}
	$("#searching_alert").show("slow");
	var pub = await searchByEmail(email);	//如果没有找到则会返回未定义
	$("#searching_alert").hide("fast");

	if (typeof (pub) === "undefined") {
		alert("没有从服务器上找到密钥，请检查邮件地址：\n" + email);
		return
	}

	await addKey(pub);
}

//保存密钥
async function addKey(key) {
	try {
		var keydata = (await openpgp.key.readArmored(key)).keys;
		if (typeof (keydata[0]) === "undefined")
			throw new Error("密钥已损坏");
	} catch (e) {
		alert("密钥读取错误！\n" + e);
		return
	}
	var len = keydata.length;
	for (var i = 0; i < len; ++i) {	//如果有多个密钥，则拆开保存
		try {
			if (window.confirm("确认添加公钥?\n密钥信息:\n" + keydata[i].getUserIds().toString())) {
				var name = window.prompt("要保存的别名：", keydata[i].getUserIds().toString());
				if (name == null || name == "")
					continue;
				if (await PubSave(name, keydata[i].armor()))
					successalert();
			}
		} catch (e) {
			alert("出现错误\n错误代码：" + e);
		}
	}
}

$(function () {
	$("#keyaddalert").hide();
	$("#searching_alert").hide();
})