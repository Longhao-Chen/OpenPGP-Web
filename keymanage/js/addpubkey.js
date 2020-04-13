$(function(){
	$("#pubmsg").hide();
})

//核心的一些处理函数
function addpub(){
	var pub=document.getElementById("pubkey").value;
	var name=document.getElementById("pubalias").value;
	if(name===''){
		alert("公钥别名不能为空！");
	}else if(pub===''){
		alert("公钥输入不能为空！");
	} else {
		PubSave(name,pub);
		$("#pubaddalert").show("slow");
		$("#btn-addpub").hide("slow");
	}
}
//文本框的清理和隐藏
function cleanall(){
	document.getElementById("pubkey").value='';
	$("#pubmsg").hide();
}
async function pubinfo(input,msgbox) {
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
$(async function (){
	var res=PubReadIndex();
	var len=res.length;
	var msg='';
	if(len===0){
		msg='无已保存的公钥'
	}else{
		for(var i=0;i<len;++i){
			msg=msg+res[i][1]+"\n"
		}
	}
	document.getElementById("pubsaved").value=msg;
});