Clash 是用 Go 语言写的不带图形界面的命令行程序。

Clash 提供了 http proxy 和 socks5 proxy 运行在两个不同端口。默认配置下 http proxy 在 7890 端口，而 socks proxy 在 7891 端口。

## general

打开常规设置中的 Allow LAN 可以开启**透明代理**，也就是开启后局域网内的设备都可以使用代理，比如连接同一个 WiFi 的手机只需要在 WiFi 设置中设置代理服务器即可。

笔记本电脑一般是 WLAN 所对应的 IP 地址（如192.168.0.104），端口默认为7890；



## Proxies

模式

- Global 即全局代理，所有的连接不加判断都走代理；
- Rule 即按规则走代理，这大概也是 Clash 最大的亮点，当然也更加进阶一些；
- Direct 即直连，不走代理；
- Script 也属于进阶操作，可以实现更加复杂的功能。







[用 Clash 做代理 (maintao.com)](https://maintao.com/2021/use-clash-as-a-proxy/)

[Clash for Windows 使用指北 ](https://mxy-3914fc.tcloudbaseapp.com/2020101017609)