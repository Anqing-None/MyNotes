windows开启启动路径

```
C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
```

将程序的快捷方式放入该路径，程序会在开机时启动。当然还有别的方式设置开机启动。

命令行运行`PS C:\Users\Administrator> taskschd.msc`命令查看定时任务。


vscode

合并多行代码 jion Lines
首先在编辑器中选中需要合并的多行代码
ctrl + shift + p打开命令面板，输入join Lines, Enter