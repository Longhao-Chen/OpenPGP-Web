async function successalert(){	//保存成功后的回调函数
	$("#keyaddalert").show("slow");
	$("#btn-addkey").hide("slow");
}

async function addkey(){
	var key=document.getElementById("key").value;	//要保存的密钥
	if(key===''){
		alert("密钥输入不能为空！");
	} else {
		try{
			var keydata=(await openpgp.key.readArmored(key)).keys;
			if(typeof(keydata[0])==="undefined")
				throw new Error("密钥已损坏");
		}catch(e){
			alert("密钥读取错误！\n"+e);
			return
		}
		var len=keydata.length;
		for(var i=0;i<len;++i){	//如果有多个密钥，则拆开保存
			if(keydata[i].isPublic()){
				//公钥保存
				try{
					if(window.confirm("确认添加公钥?\n密钥信息:\n"+keydata[i].getUserIds().toString())){
						var name=window.prompt("要保存的别名：",keydata[i].getUserIds().toString());
						if(name==null || name=="")
							continue;
						if(await PubSave(name,keydata[i].armor()))
							successalert();
					}
				}catch(e){
					alert("出现错误\n错误代码："+e);
				}
			}else if(keydata[i].isPrivate()){
				//私钥保存
				try{
					if(window.confirm("确认添加私钥?\n密钥信息:\n"+keydata[i].getUserIds().toString())){
						var name=window.prompt("要保存的别名：",keydata[i].getUserIds().toString());
						if(name==null || name=="")
							continue;
						if(window.confirm("使用持久储存？\n如果选择取消，则将使用临时储存保存密钥，则关闭浏览器后此私钥会被清除")){
							if(await PriLocalSave(name,keydata[i].armor()))
								successalert();
							if(window.confirm("是否保存公钥？")){
								PubSave(name,keydata[i].toPublic().armor());	//获取公钥
							}
						}else{
							if(await PriSessSave(name,keydata[i].armor()))
								successalert();
							if(window.confirm("是否保存公钥？")){
								PubSave(name,keydata[i].toPublic().armor());	//获取公钥
							}
						}
					}
				}catch(e){
					alert("出现错误\n错误代码："+e);
				}
			}else{
				alert("密钥损坏或不支持此类型");
			}
		}
	}
}

//文本框的清理和隐藏
function cleanall(){
	document.getElementById("key").value='';
	$("#keymsg").hide();
	$("#keyaddalert").hide();
	$("#btn-addkey").show();
}

async function keyinfo(input,msgbox) {
	try{
		const key=`${document.getElementById(input).value}`;
		var keydata=(await openpgp.key.readArmored(key)).keys;
		if(typeof(keydata[0])==="undefined"){
			alert("密钥为空或密钥已损坏");
			return
		}
		var msg='';
		for(var i=0;i<keydata.length;++i){
			msg=msg+"用户标识："+keydata[i].getUserIds().toString();
			msg=msg+"\n密钥指纹："+keydata[i].getFingerprint().toString();
			msg=msg+"\n算法信息：算法："+keydata[i].getAlgorithmInfo()['algorithm'];
			if(typeof(keydata[i].getAlgorithmInfo()['bits'])!=="undefined")	//ECC没有位数
				msg+='，位数：'+keydata[i].getAlgorithmInfo()['bits'];

			msg=msg+"\n创建时间："+keydata[i].getCreationTime().toString()+'\n\n';
		}
		document.getElementById(msgbox).value=msg;
		$("#"+msgbox).show("fast");
	}catch(e){
		alert("出错："+e);
	}
}
$(function(){
	$("#keymsg").hide();
})