async function PubSave(name,pub) {
	if(typeof(Storage)!=="undefined")
	{
		try{
			if(typeof(localStorage.pubkeys)!=="undefined"){
				if(typeof(localStorage.pubkeysidindex)==="undefined")
					await PubGenIndex();
				var data=JSON.parse(localStorage.pubkeys);
				var keysindex=JSON.parse(localStorage.pubkeysidindex);
				var len=data.length;
				data[len]=[name,pub];
				var keyids=(await openpgp.key.readArmored(pub)).keys[0].getKeyIds();
				var keyidlen=keyids.length;
				var keyid=new Array();
				for(ii=0;ii<keyidlen;++ii)
					keyid[ii]=keyids[ii].toHex();
				keysindex[len]=[keyid,len];
				localStorage.pubkeys=JSON.stringify(data);
				localStorage.pubkeysidindex=JSON.stringify(keysindex);
			}else{
				localStorage.pubkeys=JSON.stringify(new Array([name,pub]));
				var keyids=(await openpgp.key.readArmored(pub)).keys[0].getKeyIds();
				var keyidlen=keyids.length;
				var keyid=new Array();
				for(ii=0;ii<keyidlen;++ii)
					keyid[ii]=keyids[ii].toHex();
				localStorage.pubkeysidindex=JSON.stringify(new Array([keyid,0]));
			}
		}catch(e){
			alert("出错：\n调用函数：PubSave("+name+','+pub+")\n错误代码："+e);
		}
	} else {
		window.alert("您的浏览器不支持此功能，请更新浏览器");
	}
}

function PubReadIndex(){
	if(typeof(localStorage.pubkeys)==="undefined"){
		return [];
	}
	if(localStorage.pubkeys.length===0){
		return [];
	}
	var data=JSON.parse(localStorage.pubkeys);
	var len=data.length;
	var res=new Array();
	for(var i=0;i<len;++i){
		res[i]=[i,data[i][0]];
	}
	return res;
}

function PubRead(id){
	try{
		return JSON.parse(localStorage.pubkeys)[id][1];
	}catch(e){
		alert("出错：\n调用函数：PubRead("+id+")\n错误代码："+e);
	}
}

function PubReadName(id){
	try{
		var data=JSON.parse(localStorage.pubkeys);
		return data[id][0];
	}catch(e){
		alert("出错：\n调用函数：PubReadName("+id+")\n错误代码："+e);
	}
}

function PubDel(id){
	if(window.confirm("确认删除此公钥？")){
		var data=JSON.parse(localStorage.pubkeys);
		var keysindex=JSON.parse(localStorage.pubkeysidindex);
		var len=data.length;
		data[id]=data[len-1];
		keysindex[id]=keysindex[len-1];
		data.pop();
		keysindex.pop();
		localStorage.pubkeys=JSON.stringify(data);
		localStorage.pubkeysidindex=JSON.stringify(keysindex);
	}
}

function PubDelAll(){
	if(window.confirm("确认删除所有公钥？")){
		localStorage.removeItem("pubkeys");
		localStorage.removeItem("pubkeysidindex");
		alert("已删除所有公钥");
	}
}

//生成密钥id到保存id的索引
async function PubGenIndex(){
	if(typeof(Storage)!=="undefined"){
		try{
			var len=PubReadIndex().length;	//获取持久存储的大小
			var Index=new Array();
			for(i=0;i<len;++i){
				var key=PubRead(i);
				var keyids=(await openpgp.key.readArmored(key)).keys[0].getKeyIds();
				var keyidlen=keyids.length;
				var keyid=new Array();
				for(ii=0;ii<keyidlen;++ii){
					keyid[ii]=keyids[ii].toHex();
				}
				Index[i]=[keyid,i];
			}
			localStorage.pubkeysidindex=JSON.stringify(Index);
		}catch(e){
			alert("出错：\n调用函数：PubGenIndex()\n错误代码："+e);
		}
	}else{
		window.alert("您的浏览器不支持此功能，请更新浏览器");
	}
}

//从密钥id搜索保存id
function PubSearchId(input){
	if(typeof(localStorage.pubkeys)!=="undefined"){
		if(typeof(localStorage.pubkeysidindex)==="undefined")
			PubGenIndex();
		var data=JSON.parse(localStorage.pubkeysidindex);
		for(i=0;i<input.length;++i){
			for(ii=0;ii<data.length;++ii){
				if(data[ii][0].includes(input[i]))
					return data[ii][1];
			}
		}
		return -1;
	}else
		return -1;
}