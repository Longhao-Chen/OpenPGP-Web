$(function () {
	//不显示版本号
	openpgp.config.show_version = false;

	//注释信息
	openpgp.config.commentstring = "https://github.com/Longhao-Chen/OpenPGP-Web";

	//使用压缩
	openpgp.config.compression = openpgp.enums.compression.zlib;

	//密钥服务器
	openpgp.config.keyserver = "https://keys.openpgp.org"
})
