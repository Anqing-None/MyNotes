

### docker run 

使用docker run运行镜像容器

示例：

``` bash
docker run -itd -p 80:3000 --name webgpt node:latest
```


- `docker run`: 启动一个新的容器
- `-i`:  interact 以交互模式运行容器，允许您与容器交互
- `-t`:  terminal 为容器分配一个伪终端（TTY）
- `-d`:  demeon 在后台（守护进程）模式下运行容器
- `-p 80:3000`:  port 将容器内部的端口 3000 映射到主机上的端口 80，第一个数字是主机端口，第二个数字是容器内部的端口
- node:latest: 镜像名称，从docker hub中下载

## docker exec

执行命令

```bash
docker exec -it CONTAINER_ID /bin/bash
```

- `docker exec`: 这是 Docker 命令的一部分，用于在运行中的容器内执行命令
- `-i`:  interact 表示“交互式”
- `-t`:  terminal 表示使用终端
- `CONTAINER_ID`: 容器 ID，可以使用 `docker ps` 查找容器 ID
- `/bin/bash`: 这是要在容器内部执行的命令，启动容器的bash终端，操作容器。


## docker images

查看镜像列表
镜像是一个类，容器是一个实例
可以使用镜像创建多个实例

```bash
❯ docker images
REPOSITORY   TAG       IMAGE ID       CREATED      SIZE
node         latest    3b487d2a1a90   3 days ago   1.1GB
```

运行docker

docker run

## Dockerfile

使用Dockerfile文件定制镜像，文件名称首字母必须大写并且不能有后缀名

```Dockerfile
// Dockerfile

FROM node:latest
// FROM关键字指定镜像名称，:后面指定镜像的版本

WORKDIR /egg
// 指定容器工作目录

RUN npm install
// 允许终端命令

EXPOSE 3000
// 暴露容器端口号 只有文档作用，不起实际作用

CMD ["node" "app.js"]
// 运行命令

```

使用docker build命令构建镜像




使用docker push可以把制作好的镜像发布到Docker Hub
使用docker pull可以拉取镜像


`docker tag [id] [name]`
为镜像命名

`docker rm [name]`
删除容器






## docker ps


`docker ps`

查看运行的容器
Ï
`docker ps -a`

-a: 所有容器


## docker start

启动停止的容器

通过`docker ps -a`获取到容器ID

`docker start [ID]`




