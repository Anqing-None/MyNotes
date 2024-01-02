查看镜像列表
docker images

```bash
❯ docker images
REPOSITORY   TAG       IMAGE ID       CREATED      SIZE
node         latest    3b487d2a1a90   3 days ago   1.1GB
```

运行docker


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
使用docker run运行镜像容器
镜像是一个类，容器是一个实例


使用docker push可以把制作好的镜像发布到Docker Hub
使用docker pull可以拉取镜像


`docker tag [id] [name]`
为镜像命名

`docker rm [name]`
删除容器

docker run -itd -p 80:3000 --name webgpt node:latest
- `docker run`: 启动一个新的容器。
-  `-i`: 以交互模式运行容器，允许您与容器交互。
- `-t`: 为容器分配一个伪终端（TTY）。
- `-d`: 在后台（守护进程）模式下运行容器。
- `-p 80:3000`: 将容器内部的端口 3000 映射到主机上的端口 80。第一个数字是主机端口，第二个数字是容器内部的端口。
-  node:latest: 镜像名称。

docker exec -it CONTAINER_ID /bin/bash
- `docker exec`: 这是 Docker 命令的一部分，用于在运行中的容器内执行命令。
- `-it`: 这是两个选项的组合，分别表示“交互式”和“终端”。它们告诉 Docker 在终端会话中启动命令，并允许您与命令进行交互。通过这些选项，您可以与容器内的终端进行交互，就像您在本地计算机上运行终端一样。
- `CONTAINER_ID`: 这是您要进入的容器的实际 ID。您可以在运行 `docker ps` 命令以查找您的容器 ID。
- `/bin/bash`: 这是要在容器内部执行的命令。在这种情况下，我们正在启动 Bash 终端，这使您可以在容器内部执行各种命令。


docker ps -a
查看具有的容器
-a: 所有容器
