function sessionSave(name,pri){
	if(typeof(Storage)!=="undefined"){
		if(typeof(sessionStorage.prikeys)!=="undefined"){
			if(sessionStorage.prikeys.includes([name,pri])){
				window.alert("此私钥已保存");
			}else{
				sessionStorage.prikeys.push([name,pri]);
			}
		}else{
			sessionStorage.prikeys=new Array();
			sessionStorage.prikeys[0]=[name,pri];
		}
	}else{
		window.alert("您的浏览器不支持此功能，请更新浏览器");
	}
}

function  localSave(name,pri){
	if(typeof(Storage)!=="undefined"){
		if(typeof(localStorage.prikeys)!=="undefined"){
			if(localStorage.prikeys.includes([name,pri])){
				window.alert("此私钥已保存");
			}else{
				localStorage.prikeys.push([name,pri]);
			}
		}else{
			localStorage.prikeys=new Array();
			localStorage.prikeys[0]=[name,pri];
		}
	}else{
		window.alert("您的浏览器不支持此功能，请更新浏览器");
	}
}

function readIndex(){
	len=localStorage.prikeys.length;
	res=new Array();
	for(var i=0;i<len;++i){
		res[i]=[i,localStorage.prikeys[i][0]];
	}
	if(typeof(sessionStorage.prikeys)!=="undefined"){
		sesslen=sessionStorage.prikeys.length;
		for(var i=len;i<sesslen+len;++i){
			res[i]=[i,sessionStorage.prikeys[i-len][0]];
		}
	}
	return res;
}

function read(id){
	len=localStorage.prikeys.length;
	if(id<len){
		return localStorage.prikeys[id][1];
	}else{
		return sessionStorage.prikeys[id-len][1];
	}
}

function del(id){
	len=localStorage.prikeys.length;
	if(id<len){
		localStorage.pubkeys[id]=localStorage.pubkeys[len-1];
		localStorage.pubkeys.pop();
	}else{
		sesslen=sessionStorage.prikeys.length;
		sessionStorage.prikeys[id-len]=sessionStorage.prikeys[sesslen-1];
		sessionStorage.prikeys.pop();
	}
}

function delAll(){
	localStorage.removeItem("prikeys");
	sessionStorage.removeItem("prikeys");
}