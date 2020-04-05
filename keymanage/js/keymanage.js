$(function(){
	$(".alertclose").click(function(){
		$(".alert").hide("slow");
	})
});
$(function(){
	$(".alert").hide();
})

//复制部分的代码
$(function(){
	var clipboard = new ClipboardJS('.copy');
	clipboard.on('success', function(e) {
		e.clearSelection();
		alert("已复制");
	});
	clipboard.on('error', function(e) {
		alert('复制失败，您的浏览器不支持！');
	});
});