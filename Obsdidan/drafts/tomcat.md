
### 安装

```zsh
brew install tomcat
```

查看安装信息
```zsh
brew info tomcat
==> tomcat: stable 10.1.18 (bottled)
Implementation of Java Servlet and JavaServer Pages
https://tomcat.apache.org/
/opt/homebrew/Cellar/tomcat/10.1.18 (638 files, 16.0MB) *
  Poured from bottle using the formulae.brew.sh API on 2024-01-11 at 09:31:44
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/t/tomcat.rb
License: Apache-2.0
==> Dependencies
Required: openjdk ✔
==> Caveats
Configuration files: /opt/homebrew/etc/tomcat

To start tomcat now and restart at login:
  brew services start tomcat
Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/tomcat/bin/catalina run
==> Analytics
install: 1,790 (30 days), 5,276 (90 days), 16,577 (365 days)
install-on-request: 1,783 (30 days), 5,263 (90 days), 16,536 (365 days)
build-error: 0 (30 days)

```


通过`Configuration files: /opt/homebrew/etc/tomcat`得知tomcat配置文件路径
通过`/opt/homebrew/opt/tomcat/bin/catalina run`得知运行tomcat方式

### 修改管理用户

进入`/opt/homebrew/etc/tomcat`配置文件路径，找到`tomcat-users.xml`文件，添加用户。

```xml
<?xml version="1.0" encoding="UTF-8"?>

<tomcat-users xmlns="http://tomcat.apache.org/xml"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://tomcat.apache.org/xml tomcat-users.xsd"
              version="1.0">

<user username="admin" password="admin" roles="manager-gui"/>

</tomcat-users>
Ï

```
### 启动tomcat

运行命令`/opt/homebrew/opt/tomcat/bin/catalina run`

浏览器访问`http://localhost:8080/manager`，使用admin登陆后找到部署一栏，上传war文件，即可完成部署。