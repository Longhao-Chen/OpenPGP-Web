# GnuPG-Web

## 简介
GnuPG-Web 是一个完全运行在浏览器中的GPG加密程序，所以的操作和数据均在本地进行和保存，不会有任何数据会被发送到网络上。你可以在 [https://chenlhlinux.github.io/gpgweb/](https://chenlhlinux.github.io/gpgweb/) 尝试本程序。  
此程序使用经过安全审计且完全开源的 [OpenPGP.js](https://github.com/openpgpjs/openpgpjs/)

* 安全提醒：本程序目前采用 `localStorage` 和 `localStorage` 保存密钥，可能会存在安全问题。

## 目前已实现的功能：
* 加密，加密和签名（目前仅能选择单个密钥）
* 解密（**验证签名未实现**）
* 密钥生成（2048位 RSA）
* 密钥的保存（使用 `localStorage` 和 `localStorage`）

## 下一步准备实现的功能：
* 签名验证
* 同时使用多个密钥进行加密
* 使用更安全的方法保存密钥
* 直接创建签名