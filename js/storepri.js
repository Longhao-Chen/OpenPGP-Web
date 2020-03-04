function PriSessSave(name,pri){
	if(typeof(Storage)!=="undefined"){
		if(typeof(sessionStorage.prikeys)!=="undefined"){
			if(JSON.parse(sessionStorage.prikeys).includes([name,pri])){ //这一段判断是否重复的代码似乎没有正常工作。
				window.alert("此私钥已保存");
			}else{
				data=JSON.parse(sessionStorage.prikeys);
				len=data.length;
				data[len]=[name,pri];
				sessionStorage.prikeys=JSON.stringify(data);
			}
		}else{
			sessionStorage.prikeys=JSON.stringify(new Array([name,pri]));
		}
	}else{
		window.alert("您的浏览器不支持此功能，请更新浏览器");
	}
}

function  PriLocalSave(name,pri){
	if(typeof(Storage)!=="undefined"){
		if(typeof(localStorage.prikeys)!=="undefined"){
			if(JSON.parse(localStorage.prikeys).includes([name,pri])){ //这一段判断是否重复的代码似乎没有正常工作。
				window.alert("此私钥已保存");
			}else{
				data=JSON.parse(localStorage.prikeys);
				len=data.length;
				data[len]=[name,pri];
				localStorage.prikeys=JSON.stringify(data);
			}
		}else{
			localStorage.prikeys=JSON.stringify(new Array([name,pri]));
		}
	}else{
		window.alert("您的浏览器不支持此功能，请更新浏览器");
	}
}

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

function PriDel(id){
	if(window.confirm("确认删除此私钥？")){
		data=JSON.parse(localStorage.prikeys);
		len=data.length;
		if(id<len){
			data[id]=data[len-1];
			data.pop();
			localStorage.prikeys=JSON.stringify(data);
		}else{
			data=JSON.parse(sessionStorage.prikeys);
			sesslen=data.length;
			data[id-len]=data[sesslen-1];
			data.pop();
			sessionStorage.prikeys=JSON.stringify(data);
		}
	}
}

function PriDelAll(){
	if(window.confirm("确认删除所有私钥？")){
		localStorage.removeItem("prikeys");
		sessionStorage.removeItem("prikeys");
	}
}