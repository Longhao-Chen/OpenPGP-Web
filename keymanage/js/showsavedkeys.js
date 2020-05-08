$(async function(){
	var index=PubReadIndex();
	if(index.length!==0){
		var msg="";
		var key;
		for(var i=0;i<index.length;++i){
			key=(await openpgp.key.readArmored(PubRead(index[i][0]))).keys[0];
			var userid="";
			for(var ii=0;ii<key.getUserIds().length;++ii)
				userid+=char_conv(key.getUserIds()[ii])+'<br>';
			msg=msg+"<tr><td>"+index[i][1]+"</td><td>"+userid+"</td><td>"+key.getCreationTime().toString()+"</td><td>"+key.getKeyId().toHex()+"</td><td>"+key.getFingerprint()+"</td></tr>";
		}
	}else{
		var msg="<tr><td colspan='6'>没有已保存的密钥</td></tr>";
	}
	document.getElementById("pubsavedkeystable").innerHTML=msg;

	index=PriReadIndex();
	if(index.length!==0){
		msg="";
		for(var i=0;i<index.length;++i){
			key=(await openpgp.key.readArmored(PriRead(index[i][0]))).keys[0];
			var userid="";
			for(var ii=0;ii<key.getUserIds().length;++ii)
				userid+=char_conv(key.getUserIds()[ii])+'<br>';
			msg=msg+"<tr><td>"+index[i][1]+"</td><td>"+userid+"</td><td>"+key.getCreationTime().toString()+"</td><td>"+key.getKeyId().toHex()+"</td><td>"+key.getFingerprint()+"</td></tr>";
		}
	}else{
		msg="<tr><td colspan='6'>没有已保存的密钥</td></tr>";
	}
	document.getElementById("prisavedkeystable").innerHTML=msg;
});
