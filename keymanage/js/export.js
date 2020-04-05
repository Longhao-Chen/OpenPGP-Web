$(function(){
	$(".exp_prikey").hide();
	$(".exp_pubkey").hide();
})

$(function (){
	var res=PubReadIndex();
	var len=res.length;
	var msg='';
	if(len===0){
		msg='<a class="dropdown-item" >无已保存的公钥</a>'
	}else{
		for(var i=0;i<len;++i){
			msg=msg+'<a class="dropdown-item pubdelreload" onclick="exppub('+res[i][0]+');">'+res[i][1]+'</a>'
		}
	}
	document.getElementById("exppubmenu").innerHTML=msg;

	var res=PriReadIndex();
	var len=res.length;
	var msg='';
	if(len===0){
		msg='<a class="dropdown-item" >无已保存的私钥</a>'
	}else{
		for(var i=0;i<len;++i){
			msg=msg+'<a class="dropdown-item pubdelreload" onclick="exppri('+res[i][0]+');">'+res[i][1]+'</a>'
		}
	}
	document.getElementById("expprimenu").innerHTML=msg;
});

function exppub(id){
	document.getElementById("exp_pubkey").value=PubRead(id);
	$(".exp_pubkey").show("slow");
}
function exppri(id){
	document.getElementById("exp_prikey").value=PriRead(id);
	$(".exp_prikey").show("slow");
}