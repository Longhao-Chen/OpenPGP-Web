$(menu=function (){
	var res=PubReadIndex();
	var len=res.length;
	var msg='';
	if(len===0){
		msg='<a class="dropdown-item" >无已保存的公钥</a>'
	}else{
		for(var i=0;i<len;++i){
			msg=msg+'<a class="dropdown-item pubdelreload" onclick="PubDel('+res[i][0]+');menu();">'+res[i][1]+'</a>'
		}
	}
	document.getElementById("delpubmenu").innerHTML=msg;

	var res=PriReadIndex();
	var len=res.length;
	var msg='';
	if(len===0){
		msg='<a class="dropdown-item" >无已保存的私钥</a>'
	}else{
		for(var i=0;i<len;++i){
			msg=msg+'<a class="dropdown-item" onclick="PriDel('+res[i][0]+');menu();">'+res[i][1]+'</a>'
		}
	}
	document.getElementById("delprimenu").innerHTML=msg;
});