$(function(){
	$(".gen_keys").hide();
	$("#gen_adv").hide();

	//初始化
	if(document.getElementById("gen_show_passwd").checked){
		$("#gen_passwd").attr("type","text");
	}else{
		$("#gen_passwd").attr("type","password");
	}
	if(document.getElementById("gen_show_adv").checked){
		$("#gen_adv").show("fast");
	}else{
		$("#gen_adv").hide("fast");
	}

	$("#gen_show_passwd").click(function(){
		if(document.getElementById("gen_show_passwd").checked){
			$("#gen_passwd").attr("type","text");
		}else{
			$("#gen_passwd").attr("type","password");
		}
	});
	$("#gen_show_adv").click(function(){
		if(document.getElementById("gen_show_adv").checked){
			$("#gen_adv").show("fast");
		}else{
			$("#gen_adv").hide("fast");
		}
	});
})

async function genkey(){
	$("#gen_savealert").hide();
	$(".gen_keys").hide("fast");
	if(document.getElementById("gen_name").value===''){
		alert("姓名不能为空！");
		throw new Error("姓名为空");
	}else{
		$("#gen_alert").show("slow");
		var type=document.getElementById("keytype").innerHTML.trim();
		try{
			if(type.match("RSA") != null){
				var { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
					userIds: [{ name: document.getElementById("gen_name").value, email: document.getElementById("gen_mail").value }], // you can pass multiple user IDs
					rsaBits: type.substr(0,4),	// RSA key size
					passphrase: document.getElementById("gen_passwd").value	// protects the private key
				});
			}
			if(type == "curve25519"){
				var { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
					userIds: [{ name: document.getElementById("gen_name").value, email: document.getElementById("gen_mail").value }],	// you can pass multiple user IDs
					curve: 'curve25519',	// ECC curve name
					passphrase: document.getElementById("gen_passwd").value	// protects the private key
				});
			}

			document.getElementById("gen_pub").value=publicKeyArmored;
			document.getElementById("gen_pri").value=privateKeyArmored;
			$(".gen_keys").show("slow");
			$("#gen_alert").hide("slow");
		}catch(e){
			$("#gen_alert").hide("slow");
			alert("出错："+e);
			throw new Error(e);
		}
	}
}

//设定密钥位数
function settype(type){
	document.getElementById("keytype").innerHTML=type;
}

//保存生成的密钥
function gen_save(){
	var name=document.getElementById("gen_name").value;
	if(name===''){
		alert("姓名不能为空！");
	}else{
		var pub=document.getElementById("gen_pub").value;
		var pri=document.getElementById("gen_pri").value;
		PubSave(name,pub);
		PriLocalSave(name,pri);
		$("#gen_savealert").show("slow");
		$("#btn-savekeys").hide("slow");
	}
}