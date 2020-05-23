$(async function(){
	var index=window.location.hash.split("#")[2];
	if(window.location.hash.split("#")[1]=="pub")
		var key=(await openpgp.key.readArmored(PubRead(index))).keys[0];
	else
		var key=(await openpgp.key.readArmored(PriRead(index))).keys[0];

	var userid="";
	for(var ii=0;ii<key.getUserIds().length;++ii)	//必须在外面读取，子密钥无法读取用户id
		userid+=char_conv(key.getUserIds()[ii])+'<br>';
	//读取主密钥信息
	var msg="<tr><td>"+userid+"</td><td>"+key.getCreationTime().toString()+"</td><td>"+key.getKeyId().toHex()+"</td><td>"+key.getFingerprint()+"</td></tr>";

	key=key.getSubkeys();
	for(var i=0;i<key.length;++i){
		msg=msg+"<tr><td>此为子密钥</td><td>"+key[i].getCreationTime().toString()+"</td><td>"+key[i].getKeyId().toHex()+"</td><td>"+key[i].getFingerprint()+"</td></tr>";
	}
	document.getElementById("keytable").innerHTML=msg;
});
