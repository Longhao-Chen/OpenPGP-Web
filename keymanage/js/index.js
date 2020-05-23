$(load=async function(){
	var index=PubReadIndex();
	if(index.length!==0){
		var msg="";
		var key;
		for(var i=0;i<index.length;++i){
			key=(await openpgp.key.readArmored(PubRead(index[i][0]))).keys[0];
			var userid="";
			for(var ii=0;ii<key.getUserIds().length;++ii)
				userid+=char_conv(key.getUserIds()[ii])+'<br>';
			msg=msg+"<tr><td>"+index[i][1]+"</td><td>"+userid+"</td><td>"+
			'<a type="button" href="export.html#pub#'+index[i][0]+'">导出此密钥</a><br>'+
			'<a type="button" href="showkey.html#pub#'+index[i][0]+'">查看密钥详情</a><br>'+
			'<a type="button" onclick="PubDel('+index[i][0]+');load();" class="btn-danger">删除此密钥</a>'+
			"</td></tr>";
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
			msg=msg+"<tr><td>"+index[i][1]+"</td><td>"+userid+"</td><td>"+
			'<a type="button" href="export.html#pri#'+index[i][0]+'">导出此密钥</a><br>'+
			'<a type="button" href="showkey.html#pri#'+index[i][0]+'">查看密钥详情</a><br>'+
			'<a type="button" onclick="PriDel('+index[i][0]+');load();" class="btn-danger">删除此密钥</a>'+
			"</td></tr>";
		}
	}else{
		msg="<tr><td colspan='6'>没有已保存的密钥</td></tr>";
	}
	document.getElementById("prisavedkeystable").innerHTML=msg;
});
