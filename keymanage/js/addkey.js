async function successalert(){	//保存成功后的回调函数
	$("#keyaddalert").show("slow");
	$("#btn-addkey").hide("slow");
}

async function addkey(){
	var key=document.getElementById("key").value;	//要保存的密钥
	var name=document.getElementById("keyalias").value;	//密钥别名
	if(name===''){
		alert("别名不能为空！");
	}else if(key===''){
		alert("密钥输入不能为空！");
	} else {
		try{
			var keydata=(await openpgp.key.readArmored(key)).keys[0];
			if(typeof(keydata)==="undefined")
				throw new Error("密钥已损坏");
		}catch(e){
			alert("密钥读取错误！\n"+e);
			return
		}
		if(keydata.isPublic()){
			//公钥保存
			if(window.confirm("确认添加公钥?\n密钥信息:\n"+keydata.getUserIds().toString()))
			{
				if(await PubSave(name,key))
					successalert();
			}
		}else if(keydata.isPrivate()){
			//私钥保存
			if(window.confirm("确认添加私钥?\n密钥信息:\n"+keydata.getUserIds().toString())){
				if(window.confirm("使用持久储存？\n如果选择取消，则将使用临时储存保存密钥，则关闭浏览器后此私钥会被清除")){
					if(await PriLocalSave(name,key))
						successalert();
				}else{
					if(await PriSessSave(name,key))
						successalert();
				}
			}
		}else{
			alert("密钥损坏或不支持此类型");
			return
		}
	}
}

//文本框的清理和隐藏
function cleanall(){
	document.getElementById("key").value='';
	document.getElementById("keyalias").value='';
	$("#keymsg").hide();
	$("#keyaddalert").hide();
	$("#btn-addkey").show();
}

async function keyinfo(input,msgbox) {
	try{
		const key=`${document.getElementById(input).value}`;
		var keydata=(await openpgp.key.readArmored(key)).keys[0];
		if(typeof(keydata)==="undefined"){
			alert("密钥为空或密钥已损坏");
			return
		}
		var msg="用户标识："+keydata.getUserIds().toString();
		msg=msg+"\n密钥指纹："+keydata.getFingerprint().toString();
		msg=msg+"\n创建时间："+keydata.getCreationTime().toString();
		document.getElementById(msgbox).value=msg;
		$("#"+msgbox).show("fast");
	}catch(e){
		alert("出错："+e);
	}
}
$(function(){
	$("#keymsg").hide();
})