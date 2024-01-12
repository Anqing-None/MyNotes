JDK
Java Development Kit
开发环境包

JVM
Java Virture Machine
Java虚拟机，允许编译后的Java代码

JAVAC
Java Compile
Java编译器





查看电脑安装的JDK版本

```bash
❯ java --version
openjdk 11.0.12 2021-07-20
OpenJDK Runtime Environment Microsoft-25199 (build 11.0.12+7)
OpenJDK 64-Bit Server VM Microsoft-25199 (build 11.0.12+7, mixed mode)
```





抽象类

```java
abstract class AbstractClass {

}

```

抽象类不能实例化
抽象类可以被继承

抽象类的子类必须实现父类中定义的抽象方法

使用场景：一些通用的功能被多个子类复用时使用


接口

```java
public interface Interface {

}
```


接口的所有字段、方法都会在编译阶段自动添加`public static final`关键字

常量字段会对子类中的变量命名空间造成污染。


访问修饰符

public
对所有类可见

private
同一类中可见

pretected
对同一包内的类和所有子类可见

default
同一包内可见


控制反转
IOC(Inversion Of Control)

使用对象是不是直接new一个对象，而是由外部提供对象，此过程中对象创建的控制权由内向外转移，此思想称为控制反转。


Spring技术对IOC思想进行了实现
Spring提供了一个容器，称为IOC容器，用来充当IOC思想中的“外部”


IOC容器

IOC容器负责对象的创建、初始化等一系列工作，其中包含了数据层和业务层的类对象
被创建或被管理的对象在IOC容器中统称为Bean
IOC容器中放的就是一个个的Bean对象


当IOC容器中创建好service和dao对象后，程序能正确执行么?

不行，因为service运行需要依赖dao对象，IOC容器中虽然有service和dao对象，但是service对象和dao对象没有任何关系，需要把dao对象交给service,也就是说要绑定service和dao对象之间的关系，才能正确执行

像这种在容器中建立对象与对象之间的绑定关系就要用到DI


DI（Dependency Injection）依赖注入

在容器中建立bean与bean之间的依赖关系的整个过程，称为依赖注入

"由外部提供对象"可以理解为由外部注入对象

IOC容器中哪些bean之间要建立依赖关系呢?

这个需要程序员根据业务需求提前建立好关系，如业务层需要依赖数据层，service就要和dao建立依赖关系

介绍完Spring的IOC和DI的概念后，我们会发现这两个概念的最终目标就是:==充分解耦==，具体实现靠:

* 使用IOC容器管理bean（IOC)
* 在IOC容器内将有依赖关系的bean进行关系绑定（DI）
* 最终结果为:使用对象时不仅可以直接从IOC容器中获取，并且获取到的bean已经绑定了所有的依赖关系.

这节比较重要，重点要理解`什么是IOC/DI思想`、`什么是IOC容器`和`什么是Bean`：

(1)什么IOC/DI思想?

* IOC:控制反转，控制反转的是对象的创建权
* DI:依赖注入，绑定对象与对象之间的依赖关系

(2)什么是IOC容器?

Spring创建了一个容器用来存放所创建的对象，这个容器就叫IOC容器

(3)什么是Bean?

容器中所存放的一个个对象就叫Bean或Bean对象









