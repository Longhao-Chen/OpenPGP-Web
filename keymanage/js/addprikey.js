$(function(){
	$("#primsg").hide();
})

function addpri(){
	var pri=document.getElementById("prikey").value;
	var name=document.getElementById("prialias").value;
	if(name===''){
		alert("私钥别名不能为空！");
	} else if(pri===''){
		alert("私钥输入不能为空！");
	} else {
		if(document.getElementById("onlocal").checked){
			PriLocalSave(name,pri);
		}else{
			if(window.confirm("警告：你现在选择的是保存私钥到临时储存，关闭浏览器后此私钥会被清除，"+
					"请确保私钥有备份"))
			PriSessSave(name,pri);
			else
				return
		}
		$("#priaddalert").show("slow");
		$("#btn-addpri").hide("slow");
	}
}
//文本框的清理和隐藏
function cleanall(){
	document.getElementById("prikey").value='';
	$("#primsg").hide();
}
async function priinfo(input,msgbox) {
	try{
		const key=`${document.getElementById(input).value}`;
		var msg="用户标识："+((await openpgp.key.readArmored(key)).keys)[0].getUserIds().toString();
		msg=msg+"\n密钥指纹："+((await openpgp.key.readArmored(key)).keys)[0].getFingerprint().toString();
		msg=msg+"\n创建时间："+((await openpgp.key.readArmored(key)).keys)[0].getCreationTime().toString();
		document.getElementById(msgbox).value=msg;
		$("#"+msgbox).show("fast");
	}catch(e){
		alert("出错："+e);
		throw new Error(e);
	}
}
$(function (){
	var res=PriReadIndex();
	var len=res.length;
	var msg='';
	if(len===0){
		msg='无已保存的私钥'
	}else{
		for(var i=0;i<len;++i){
			msg=msg+res[i][1]+"\n"
		}
	}
	document.getElementById("prisaved").value=msg;
});