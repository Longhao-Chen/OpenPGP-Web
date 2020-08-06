async function PriSessSave(name, pri) {
	if (typeof (Storage) !== "undefined") {
		try {
			var keydata = (await openpgp.key.readArmored(pri)).keys[0];
			if (!(keydata.isPrivate())) {	//判断密钥是否为私钥
				alert("错误：此密钥不是私钥。");
				return false;
			}
			if (typeof (sessionStorage.prikeys) !== "undefined") {
				if (typeof (sessionStorage.prikeysidindex) === "undefined")
					await PriGenIndex();
				var data = JSON.parse(sessionStorage.prikeys);
				var keysindex = JSON.parse(sessionStorage.prikeysidindex);
				var len = data.length;
				data[len] = [name, pri];
				var keyidlen = keydata.getKeyIds().length;
				var keyid = new Array();
				for (ii = 0; ii < keyidlen; ++ii)
					keyid[ii] = keydata.getKeyIds()[ii].toHex();
				keysindex[len] = [keyid, len];
				sessionStorage.prikeys = JSON.stringify(data);
				sessionStorage.prikeysidindex = JSON.stringify(keysindex);
			} else {
				sessionStorage.prikeys = JSON.stringify(new Array([name, pri]));
				var keyidlen = keydata.getKeyIds().length;
				var keyid = new Array();
				for (ii = 0; ii < keyidlen; ++ii)
					keyid[ii] = keydata.getKeyIds()[ii].toHex();
				sessionStorage.prikeysidindex = JSON.stringify(new Array([keyid, 0]));
			}
		} catch (e) {
			alert("出错：\n调用函数：PriSessSave(" + name + ',' + pri + ")\n错误代码：" + e);
			return false;
		}
	} else {
		window.alert("您的浏览器不支持此功能，请更新浏览器");
		return false;
	}
	return true;
}

async function PriLocalSave(name, pri) {
	if (typeof (Storage) !== "undefined") {
		try {
			var keydata = (await openpgp.key.readArmored(pri)).keys[0];
			if (!(keydata.isPrivate())) {	//判断密钥是否为私钥
				alert("错误：此密钥不是私钥。");
				return false;
			}
			if (typeof (localStorage.prikeys) !== "undefined") {
				if (typeof (localStorage.prikeysidindex) === "undefined")
					await PriGenIndex();
				var data = JSON.parse(localStorage.prikeys);
				var keysindex = JSON.parse(localStorage.prikeysidindex);
				var len = data.length;
				data[len] = [name, pri];
				var keyidlen = keydata.getKeyIds().length;
				var keyid = new Array();
				for (ii = 0; ii < keyidlen; ++ii)
					keyid[ii] = keydata.getKeyIds()[ii].toHex();
				keysindex[len] = [keyid, len];
				localStorage.prikeys = JSON.stringify(data);
				localStorage.prikeysidindex = JSON.stringify(keysindex);
			} else {
				localStorage.prikeys = JSON.stringify(new Array([name, pri]));
				var keyidlen = keydata.getKeyIds().length;
				var keyid = new Array();
				for (ii = 0; ii < keyidlen; ++ii)
					keyid[ii] = keydata.getKeyIds()[ii].toHex();
				localStorage.prikeysidindex = JSON.stringify(new Array([keyid, 0]));
			}
		} catch (e) {
			alert("出错：\n调用函数：PriLocalSave(" + name + ',' + pri + ")\n错误代码：" + e);
			return false;
		}
	} else {
		window.alert("您的浏览器不支持此功能，请更新浏览器");
		return false;
	}
	return true;
}

//返回保存的id和密钥别名
function PriReadIndex() {
	if ((typeof (localStorage.prikeys) !== "undefined") || (typeof (sessionStorage.prikeys) !== "undefined")) {
		var len = 0;
		var res = new Array();
		if ((typeof (localStorage.prikeys) !== "undefined") && (localStorage.prikeys.length !== 0)) {
			var localdata = JSON.parse(localStorage.prikeys);
			len = localdata.length;
			for (var i = 0; i < len; ++i) {
				res[i] = [i, localdata[i][0]];
			}
		}
		if ((typeof (sessionStorage.prikeys) !== "undefined") && (sessionStorage.prikeys.length !== 0)) {
			var sessdata = JSON.parse(sessionStorage.prikeys);
			var sesslen = sessdata.length;
			for (var i = len; i < sesslen + len; ++i) {
				res[i] = [i, sessdata[i - len][0]];
			}
		}
		return res;
	} else {
		return [];
	}
}

function PriRead(id) {
	var len = 0;
	if (typeof (localStorage.prikeys) !== "undefined") {
		var data = JSON.parse(localStorage.prikeys);
		len = data.length;
	}
	if (id < len) {
		return data[id][1];
	} else {
		return JSON.parse(sessionStorage.prikeys)[id - len][1];
	}
}

function PriReadName(id) {
	var len = 0;
	if (typeof (localStorage.prikeys) !== "undefined") {
		var data = JSON.parse(localStorage.prikeys);
		len = data.length;
	}
	if (id < len) {
		return data[id][0];
	} else {
		return JSON.parse(sessionStorage.prikeys)[id - len][0];
	}
}

function PriDel(id) {
	if (window.confirm("确认删除此私钥？")) {
		var len = 0;
		if (typeof (localStorage.prikeys) !== "undefined") {
			var data = JSON.parse(localStorage.prikeys);
			var keysindex = JSON.parse(localStorage.prikeysidindex);
			len = data.length;
		}
		if (id < len) {
			data[id] = data[len - 1];
			keysindex[id] = keysindex[len - 1];
			keysindex[id][1] = id;	//更新索引
			data.pop();
			keysindex.pop();
			localStorage.prikeys = JSON.stringify(data);
			localStorage.prikeysidindex = JSON.stringify(keysindex);
		} else {
			var data = JSON.parse(sessionStorage.prikeys);
			var keysindex = JSON.parse(sessionStorage.prikeysidindex);
			var sesslen = data.length;
			data[id - len] = data[sesslen - 1];
			keysindex[id - len] = keysindex[sesslen - 1];
			keysindex[id - len][1] = id - len;	//更新索引
			data.pop();
			keysindex.pop();
			sessionStorage.prikeys = JSON.stringify(data);
			sessionStorage.prikeysidindex = JSON.stringify(keysindex);
		}
	}
}

function PriDelAll() {
	if (window.confirm("确认删除所有私钥？")) {
		localStorage.removeItem("prikeys");
		sessionStorage.removeItem("prikeys");
		localStorage.removeItem("prikeysidindex");
		sessionStorage.removeItem("prikeysidindex");
		alert("已删除所有私钥");
	}
}

//生成密钥id到保存id的索引
async function PriGenIndex() {
	if (typeof (Storage) !== "undefined") {
		try {
			if (typeof (localStorage.prikeys) !== "undefined") {
				var data = JSON.parse(localStorage.prikeys);
				var len = data.length;	//获取持久存储的大小
				var Index = new Array();
				for (var i = 0; i < len; ++i) {
					var keyidlen = (await openpgp.key.readArmored(PriRead(i))).keys[0].getKeyIds().length;
					var keyid = new Array();
					for (var ii = 0; ii < keyidlen; ++ii)
						keyid[ii] = (await openpgp.key.readArmored(PriRead(i))).keys[0].getKeyIds()[ii].toHex();
					Index[i] = [keyid, i];
				}
				localStorage.prikeysidindex = JSON.stringify(Index);
			} else {	//防止在未使用持久存储时所产生的未定义错误
				var Index = new Array();
				localStorage.prikeysidindex = JSON.stringify(Index);
			}
			if (typeof (sessionStorage.prikeys) !== "undefined") {
				var Index1 = new Array();
				var data = JSON.parse(sessionStorage.prikeys);
				var len1 = data.length;
				for (var i = len; i < len1 + len; ++i) {
					var keyidlen = (await openpgp.key.readArmored(PriRead(i))).keys[0].getKeyIds().length;
					var keyid = new Array();
					for (var ii = 0; ii < keyidlen; ++ii)
						keyid[ii] = (await openpgp.key.readArmored(PriRead(i))).keys[0].getKeyIds()[ii].toHex();
					Index1[i - len] = [keyid, i];
				}
				sessionStorage.prikeysidindex = JSON.stringify(Index1);
			}
		} catch (e) {
			alert("出错：\n调用函数：PriGenIndex()\n错误代码：" + e);
		}
	} else {
		window.alert("您的浏览器不支持此功能，请更新浏览器");
	}
}

//从密钥id搜索保存id
function PriSearchId(input) {
	if (typeof (localStorage.prikeys) !== "undefined" || typeof (sessionStorage.prikeys) !== "undefined") {
		if (typeof (localStorage.prikeysidindex) === "undefined") {
			PriGenIndex();
		}
		var data = JSON.parse(localStorage.prikeysidindex);
		for (var i = 0; i < input.length; ++i) {
			for (var ii = 0; ii < data.length; ++ii) {
				if (data[ii][0].includes(input[i]))
					return data[ii][1];
			}
			if (typeof (sessionStorage.prikeysidindex) !== "undefined") {
				var sessdata = JSON.parse(sessionStorage.prikeysidindex);
				for (var ii = 0; i < sessdata.length; ++ii) {
					if (sessdata[ii][0].includes(input[i]))
						return sessdata[ii][1];
				}
			}
		}
		return -1;
	} else
		return -1;
}