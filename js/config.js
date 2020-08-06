$(function () {
	//不显示版本号
	openpgp.config.show_version = false;

	//注释信息
	openpgp.config.commentstring = "https://github.com/chenlhlinux/OpenPGP-Web";

	//使用压缩
	openpgp.config.compression = openpgp.enums.compression.zlib;
})