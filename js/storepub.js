function PubSave(name,pub) {
	(async () => {
		if(typeof(Storage)!=="undefined")
		{
			if(typeof(localStorage.pubkeys)!=="undefined"){
				if(JSON.parse(localStorage.getItem('pubkeys')).includes([name,pub])){ //这一段判断是否重复的代码似乎没有正常工作。
					window.alert("此公钥已保存");
				}else{
					data=JSON.parse(localStorage.getItem('pubkeys'));
					keysindex=JSON.parse(localStorage.pubkeysidindex);
					len=data.length;
					data[len]=[name,pub];
					keyidlen=(await openpgp.key.readArmored(pub)).keys[0].getKeyIds().length;
					keyid=new Array();
					for(ii=0;ii<keyidlen;++ii)
						keyid[ii]=(await openpgp.key.readArmored(pub)).keys[0].getKeyIds()[ii].toHex();
					keysindex[len]=[keyid,len];
					localStorage.pubkeys=JSON.stringify(data);
					localStorage.pubkeysidindex=JSON.stringify(keysindex);
				}
			}else{
				localStorage.pubkeys=JSON.stringify(new Array([name,pub]));
				keyidlen=(await openpgp.key.readArmored(pub)).keys[0].getKeyIds().length;
				keyid=new Array();
				for(ii=0;ii<keyidlen;++ii)
					keyid[ii]=(await openpgp.key.readArmored(pub)).keys[0].getKeyIds()[ii].toHex();
				localStorage.pubkeysidindex=JSON.stringify(new Array([keyid,0]));
			}
		} else {
			window.alert("您的浏览器不支持此功能，请更新浏览器");
		}
	})();
}

function PubReadIndex(){
	if(typeof(localStorage.pubkeys)==="undefined"){
		return [];
	}
	if(localStorage.pubkeys.length===0){
		return [];
	}
	data=JSON.parse(localStorage.pubkeys);
	len=data.length;
	res=new Array();
	for(var i=0;i<len;++i){
		res[i]=[i,data[i][0]];
	}
	return res;
}

function PubRead(id){
	return JSON.parse(localStorage.pubkeys)[id][1];
}

function PubReadName(id){
	data=JSON.parse(localStorage.pubkeys);
	return data[id][0];
}

function PubDel(id){
	if(window.confirm("确认删除此公钥？")){
		data=JSON.parse(localStorage.pubkeys);
		keysindex=JSON.parse(localStorage.pubkeysidindex);
		len=data.length;
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
	}
}

//生成密钥id到保存id的索引
function PubGenIndex(){
	(async () => {
		if(typeof(Storage)!=="undefined"){
			try{
				data=JSON.parse(localStorage.pubkeys);
				len=data.length;	//获取持久存储的大小
				Index=new Array();
				for(i=0;i<len;++i){
					keyidlen=(await openpgp.key.readArmored(PubRead(i))).keys[0].getKeyIds().length;
					keyid=new Array();
					for(ii=0;ii<keyidlen;++ii)
						keyid[ii]=(await openpgp.key.readArmored(PubRead(i))).keys[0].getKeyIds()[ii].toHex();
					Index[i]=[keyid,i];
				}
				localStorage.pubkeysidindex=JSON.stringify(Index);

			}catch(e){
				alert("出错：\n调用函数：PubGenIndex()\n错误代码："+e);
			}
		}else{
			window.alert("您的浏览器不支持此功能，请更新浏览器");
		}
	})();
}

//从密钥id搜索保存id
function PubSearchId(input){
	if(typeof(localStorage.pubkeysidindex)==="undefined")
		PubGenIndex();
	data=JSON.parse(localStorage.pubkeysidindex);
	for(i=0;i<input.length;++i){
		for(ii=0;i<data.length;++ii){
			if(data[ii][0].includes(input[i]))
				return data[ii][1];
		}
	}
	return -1;

}