function PriSessSave(name,pri){
	(async () => {
		if(typeof(Storage)!=="undefined"){
			if(typeof(sessionStorage.prikeys)!=="undefined"){
				if(JSON.parse(sessionStorage.prikeys).includes([name,pri])){ //这一段判断是否重复的代码似乎没有正常工作。
					window.alert("此私钥已保存");
				}else{
					data=JSON.parse(sessionStorage.prikeys);
					keysindex=JSON.parse(localStorage.prikeysidindex);
					len=data.length;
					data[len]=[name,pri];
					keyidlen=(await openpgp.key.readArmored(pri)).keys[0].getKeyIds().length;
					keyid=new Array();
					for(ii=0;ii<keyidlen;++ii)
						keyid[ii]=(await openpgp.key.readArmored(pri)).keys[0].getKeyIds()[ii].toHex();
					keysindex[len]=[keyid,len];
					sessionStorage.prikeys=JSON.stringify(data);
					sessionStorage.prikeysidindex=JSON.stringify(keysindex);
				}
			}else{
				sessionStorage.prikeys=JSON.stringify(new Array([name,pri]));
				keyidlen=(await openpgp.key.readArmored(pri)).keys[0].getKeyIds().length;
				keyid=new Array();
				for(ii=0;ii<keyidlen;++ii)
					keyid[ii]=(await openpgp.key.readArmored(pri)).keys[0].getKeyIds()[ii].toHex();
				sessionStorage.prikeysidindex=JSON.stringify(new Array([keyid,0]));
			}
		}else{
			window.alert("您的浏览器不支持此功能，请更新浏览器");
		}
	})();
}

function  PriLocalSave(name,pri){
	(async () => {
		if(typeof(Storage)!=="undefined"){
			if(typeof(localStorage.prikeys)!=="undefined"){
				if(JSON.parse(localStorage.prikeys).includes([name,pri])){ //这一段判断是否重复的代码似乎没有正常工作。
					window.alert("此私钥已保存");
				}else{
					data=JSON.parse(localStorage.prikeys);
					keysindex=JSON.parse(localStorage.prikeysidindex);
					len=data.length;
					data[len]=[name,pri];
					keyidlen=(await openpgp.key.readArmored(pri)).keys[0].getKeyIds().length;
					keyid=new Array();
					for(ii=0;ii<keyidlen;++ii)
						keyid[ii]=(await openpgp.key.readArmored(pri(i))).keys[0].getKeyIds()[ii].toHex();
					keysindex[len]=[keyid,len];
					localStorage.prikeys=JSON.stringify(data);
					localStorage.prikeysidindex=JSON.stringify(keysindex);
				}
			}else{
				localStorage.prikeys=JSON.stringify(new Array([name,pri]));
				keyidlen=(await openpgp.key.readArmored(pri)).keys[0].getKeyIds().length;
				keyid=new Array();
				for(ii=0;ii<keyidlen;++ii)
					keyid[ii]=(await openpgp.key.readArmored(pri)).keys[0].getKeyIds()[ii].toHex();
				localStorage.prikeysidindex=JSON.stringify(new Array([keyid,0]));
			}
		}else{
			window.alert("您的浏览器不支持此功能，请更新浏览器");
		}
	})();
}

//返回保存的id和密钥别名
function PriReadIndex(){
	if((typeof(localStorage.prikeys)!=="undefined")||(typeof(sessionStorage.prikeys)!=="undefined")){
		if(localStorage.prikeys.length!==0){
			localdata=JSON.parse(localStorage.prikeys);
			len=localdata.length;
			res=new Array();
			for(var i=0;i<len;++i){
				res[i]=[i,localdata[i][0]];
			}
		}
		if((typeof(sessionStorage.prikeys)!=="undefined")&&(sessionStorage.prikeys.length!==0)){
			sessdata=JSON.parse(sessionStorage.prikeys);
			sesslen=sessdata.length;
			for(var i=len;i<sesslen+len;++i){
				res[i]=[i,sessdata[i-len][0]];
			}
		}
		return res;
	}else{
		return [];
	}
}

function PriRead(id){
	data=JSON.parse(localStorage.prikeys);
	len=data.length;
	if(id<len){
		return data[id][1];
	}else{
		return JSON.parse(sessionStorage.prikeys)[id-len][1];
	}
}

function PriReadName(id){
	data=JSON.parse(localStorage.prikeys);
	len=data.length;
	if(id<len){
		return data[id][0];
	}else{
		return JSON.parse(sessionStorage.prikeys)[id-len][0];
	}
}

function PriDel(id){
	if(window.confirm("确认删除此私钥？")){
		data=JSON.parse(localStorage.prikeys);
		keysindex=JSON.parse(localStorage.prikeysidindex);
		len=data.length;
		if(id<len){
			data[id]=data[len-1];
			keysindex[id]=keysindex[len-1];
			data.pop();
			keysindex.pop();
			localStorage.prikeys=JSON.stringify(data);
			localStorage.prikeysidindex=JSON.stringify(keysindex);
		}else{
			data=JSON.parse(sessionStorage.prikeys);
			keysindex=JSON.parse(sessionStorage.prikeysidindex);
			sesslen=data.length;
			data[id-len]=data[sesslen-1];
			keysindex[id-len]=keysindex[sesslen-1];
			data.pop();
			keysindex.pop();
			sessionStorage.prikeys=JSON.stringify(data);
			sessionStorage.prikeysidindex=JSON.stringify(keysindex);
		}
	}
}

function PriDelAll(){
	if(window.confirm("确认删除所有私钥？")){
		localStorage.removeItem("prikeys");
		sessionStorage.removeItem("prikeys");
		localStorage.removeItem("prikeysidindex");
		sessionStorage.removeItem("prikeysidindex");
	}
}

//生成密钥id到保存id的索引
function PriGenIndex(){
	(async () => {
		if(typeof(Storage)!=="undefined"){
			try{
				if(typeof(localStorage.prikeys)!=="undefined"){
					data=JSON.parse(localStorage.prikeys);
					len=data.length;	//获取持久存储的大小
					Index=new Array();
					for(i=0;i<len;++i){
						keyidlen=(await openpgp.key.readArmored(PriRead(i))).keys[0].getKeyIds().length;
						keyid=new Array();
						for(ii=0;ii<keyidlen;++ii)
							keyid[ii]=(await openpgp.key.readArmored(PriRead(i))).keys[0].getKeyIds()[ii].toHex();
						Index[i]=[keyid,i];
					}
					localStorage.prikeysidindex=JSON.stringify(Index);
				}
				if(typeof(sessionStorage.prikeys)!=="undefined"){
					Index1=new Array();
					data=JSON.parse(sessionStorage.prikeys);
					len1=data.length;
					for(i=len;i<len1+len;++i){
						keyidlen=(await openpgp.key.readArmored(PriRead(i))).keys[0].getKeyIds().length;
						keyid=new Array();
						for(ii=0;ii<keyidlen;++ii)
							keyid[ii]=(await openpgp.key.readArmored(PriRead(i))).keys[0].getKeyIds()[ii].toHex();
						Index1[i-len]=[keyid,i];
					}
					sessionStorage.prikeysidindex=JSON.stringify(Index1);
				}

			}catch(e){
				alert("出错：\n调用函数：PriGenIndex()\n错误代码："+e);
			}
		}else{
			window.alert("您的浏览器不支持此功能，请更新浏览器");
		}
	})();
}

//从密钥id搜索保存id
function PriSearchId(input){
	if(typeof(localStorage.prikeysidindex)==="undefined"){
		PriGenIndex();
	}
	data=JSON.parse(localStorage.prikeysidindex);
	for(i=0;i<input.length;++i){
		for(ii=0;ii<data.length;++ii){
			if(data[ii][0].includes(input[i]))
				return data[ii][1];
		}
		if(typeof(sessionStorage.prikeysidindex)!=="undefined"){
			data=JSON.parse(sessionStorage.prikeysidindex);
			for(ii=0;i<data.length;++ii){
				if(data[ii][0].includes(input[i])){
					return data[ii][1];
				}
			}
		}
	}
	return -1;
}