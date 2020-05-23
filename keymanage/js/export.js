$(function (){
	var hash=window.location.hash.split("#");	//[0]是空的，有效字符从[1]开始
	if(hash[1]==="pub")
		exppub(hash[2]);
	else
		exppri(hash[2]);
});

function exppub(id){
	document.getElementById("exp_key").value=PubRead(id);
}
function exppri(id){
	alert("警告：你正在导出私钥，请确保你能明白此操作的后果");
	document.getElementById("exp_key").value=PriRead(id);
}