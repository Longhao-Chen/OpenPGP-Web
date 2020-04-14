# OpenPGP-Web

## 简介
GnuPG-Web 是一个完全运行在浏览器中的GPG加密程序，所以的操作和数据均在本地进行和保存，不会有任何数据会被发送到网络上。你可以在 [https://chenlhlinux.github.io/pgpweb/](https://chenlhlinux.github.io/pgpweb/) 尝试本程序。
此程序使用经过安全审计且完全开源的 [OpenPGP.js](https://github.com/openpgpjs/openpgpjs/)

## 目前已实现的功能：
* 加密，加密和签名（目前仅能选择单个密钥及加密到签名者）
* 解密，解密和签名验证
* 使用密码加密和解密
* 密钥生成
* 密钥的保存（使用 `localStorage` 和 `sessionStorage`）
* 查看密钥信息
* 创建和验证明文签名

## 编译文档：
所需依赖：
```
Sphinx
sphinx_rtd_theme
```
编译方法:
直接在当前目录执行 `make`