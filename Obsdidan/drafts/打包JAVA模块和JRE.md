
```sh

#  编译到bin
echo "开始编译到bin目录"
javac -d bin src/module-info.java src/com/anqing/sample/*.java

echo "编译完成"

# 将bin目录所有class打包为jar
echo "打包文件为jar"
jar --create --file anqing.jar --main-class com.anqing.sample.Main -C bin .
echo "打包完成"
# 将打包好的jar文件转换为jmod
echo "转换为jmod"
/Users/anqing/Library/Java/JavaVirtualMachines/openjdk-21.0.1/Contents/Home/bin/jmod \
create --class-path anqing.jar anqing.jmod
echo "转换完成"
# 将jmod打包为jre
echo "jmod to jre"
jlink --module-path anqing.jmod --add-modules java.base,java.xml,oop.module --output jre/
echo "done"

# 运行jre
echo "run jre"
jre/bin/java --module oop.module

```
