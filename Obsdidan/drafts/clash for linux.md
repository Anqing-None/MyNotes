# 如何在 Linux 中使用 clash

## 查看 clash 是否安装

尝试运行 `clash -v` 命令

## 查看 clash 是否正在运行

`ps aux | grep clash`

## 停止 clash

`kill [pid]`
发现关闭后又重启了，说明 clash 是以服务运行的。

## 查看 clash 服务状态

`systemctl status clash`

## 停止 clash 服务

`systemctl stop clash`

## 获取配置文件

`wget -O config.yaml [订阅链接https://...]`

## 运行 clash

`systemctl start clash`

## 使用 dashboard 配置

略

## 拉取 github 代码

略

## 使用 nginx 部署静态网站

### 确认是否安装 nginx

`nginx -v`

### 停止运行 nginx

`nginx -s quit`

### 配置 nginx

查找配置文件

```sh
root@hcss-ecs-802c:~# nginx -h
nginx version: nginx/1.18.0 (Ubuntu)
Usage: nginx [-?hvVtTq] [-s signal] [-c filename] [-p prefix] [-g directives]

Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /usr/share/nginx/)
  -c filename   : set configuration file (default: /etc/nginx/nginx.conf)
  -g directives : set global directives out of configuration file
```

nginx 默认配置文件的路径为 /etc/nginx/nginx.conf

查看默认配置文件内容

```nginx.conf
...
http {
  ...

	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}
...
```

默认配置文件引入了/etc/nginx/sites-enabled/\*下所有配置文件

查看/etc/nginx/sites-enabled/目录

```sh
root@hcss-ecs-802c:~# ll /etc/nginx/sites-enabled
total 8
drwxr-xr-x 2 root root 4096 Aug 24 20:14 ./
drwxr-xr-x 8 root root 4096 Aug 24 20:14 ../
lrwxrwxrwx 1 root root   34 Aug 24 20:14 default -> /etc/nginx/sites-available/default
```

查看 default 文件

```default
...
root /home/app/Anqing-None.github.io/.vitepress/dist;
...
```

修改 root 为静态 html 文件入口

### 启动 nginx

`nginx`

### 访问部署好的网站

略
