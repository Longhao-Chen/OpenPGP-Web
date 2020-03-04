function PubSave(name,pub) {
	if(typeof(Storage)!=="undefined")
	{
		if(typeof(localStorage.pubkeys)!=="undefined"){
			if(JSON.parse(localStorage.getItem('pubkeys')).includes([name,pub])){ //这一段判断是否重复的代码似乎没有正常工作。
				window.alert("此公钥已保存");
			}else{
				data=JSON.parse(localStorage.getItem('pubkeys'));
				len=data.length;
				data[len]=[name,pub];
				localStorage.pubkeys=JSON.stringify(data);
			}
		}else{
			localStorage.pubkeys=JSON.stringify(new Array([name,pub]));
		}
	} else {
		window.alert("您的浏览器不支持此功能，请更新浏览器");
	}

}

function PubReadIndex(){
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

function PubDel(id){
	if(window.confirm("确认删除此公钥？")){
		data=JSON.parse(localStorage.pubkeys);
		len=data.length;
		data[id]=data[len-1];
		data.pop();
		localStorage.pubkeys=JSON.stringify(data);
	}
}

function PubDelAll(){
	if(window.confirm("确认删除所有公钥？")){
		localStorage.removeItem("pubkeys");
	}
}