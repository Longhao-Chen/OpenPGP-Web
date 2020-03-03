function save(name,pub) {
	if(typeof(Storage)!=="undefined")
	{
		if(typeof(localStorage.pubkeys)!=="undefined"){
			if(localStorage.pubkeys.includes([name,pub])){
				window.alert("此公钥已保存");
			}else{
				localStorage.pubkeys.push([name,pub]);
			}
		}else{
			localStorage.pubkeys=new Array();
			localStorage.pubkeys[0]=[name,pub];
		}
	} else {
		window.alert("您的浏览器不支持此功能，请更新浏览器");
	}

}

function readIndex(){
	len=localStorage.pubkeys.length;
	res=new Array();
	for(var i=0;i<len;++i){
		res[i]=[i,localStorage.pubkeys[i][0]];
	}
	return res;
}

function read(id){
	return localStorage.pubkeys[id][1];
}

function del(id){
	len=localStorage.pubkeys.length;
	localStorage.pubkeys[id]=localStorage.pubkeys[len-1];
	localStorage.pubkeys.pop();
}

function delAll(){
	localStorage.removeItem("pubkeys");
}