<!--BEGIN_DATA
{
    "create_date": "2014-05-05 23:05", 
    "modify_date": "2015-10-13 13:39", 
    "is_top": "0", 
    "summary": "", 
    "tags": "Python", 
    "file_name": "python注意.md"
}
END_DATA-->

###什么是pyc文件

pyc是一种二进制文件，是由py文件经过编译后，生成的文件，是一种byte code，py文件变成pyc文件后，加载的速度有所提高，而且pyc是一种跨平台的字节码，是由python的虚拟机来执行的，这个是类似于JAVA或者.NET的虚拟机的概念。pyc的内容，是跟python的版本相关的，不同版本编译后的pyc文件是不同的，2.5编译的pyc文件，2.4版本的python是无法执行的。


###为什么需要pyc文件

这个需求太明显了，因为py文件是可以直接看到源码的，如果你是开发商业软件的话，不可能把源码也泄漏出去吧？所以就需要编译为pyc后，再发布出去。当然，pyc文件也是可以反编译的，不同版本编译后的pyc文件是不同的，根据python源码中提供的opcode，可以根据pyc文件反编译出py文件源码，网上可以找到一个反编译python2.3版本的pyc文件的工具，不过该工具从python2.4开始就要收费了，如果需要反编译出新版本的pyc文件的话，就需要自己动手了（俺暂时还没这能力^--^）,不过你可以自己修改python的源代码中的opcode文件，重新编译python，从而防止不法分子的破解。


###生成单个pyc文件

python就是个好东西，它提供了内置的类库来实现把py文件编译为pyc文件，这个模块就是 py_compile 模块。

使用方法非常简单，如下所示，直接在idle中，就可以把一个py文件编译为pyc文件了。(假设在windows环境下)

```python
import py_compile
py_compile.compile(r'H:/game/test.py')
```
compile函数原型：

```python
compile(file[, cfile[, dfile[, doraise]]])
```
file 表示需要编译的py文件的路径

cfile 表示编译后的pyc文件名称和路径，默认为直接在file文件名后加c 或者 o，o表示优化的字节码

dfile 这个参数英文看不明白，请各位大大赐教。(鄙视下自己)原文：it is used as the name of the source 
file in error messages instead of file

doraise 可以是两个值，True或者False，如果为True，则会引发一个PyCompileError，否则如果编译文件出错，则会有一个错误，默认显示在sys.stderr中，而不会引发异常



###批量生成pyc文件

一般来说，我们的工程都是在一个目录下的，一般不会说仅仅编译一个py文件而已，而是需要把整个文件夹下的py文件都编译为pyc文件，python又为了我们提供了另一个模块：compileall 。使用方法如下：

```python
import compileall
compileall.compile_dir(r'H:/game')
```
这样就把game目录，以及其子目录下的py文件编译为pyc文件了。嘿嘿，够方便吧。来看下compile_dir函数的说明：
```python
compile_dir(dir[, maxlevels[, ddir[, force[, rx[, quiet]]]]])
```
dir 表示需要编译的文件夹位置

maxlevels 表示需要递归编译的子目录的层数，默认是10层，即默认会把10层子目录中的py文件编译为pyc

ddir 英文没明白，原文：it is used as the base path from which the filenames used in error messages will be generated。

force 如果为True，则会强制编译为pyc，即使现在的pyc文件是最新的，还会强制编译一次，pyc文件中包含有时间戳，python编译器会根据时间来决定，是否需要重新生成一次pyc文件

rx 表示一个正则表达式，比如可以排除掉不想要的目录，或者只有符合条件的目录才进行编译

quiet 如果为True，则编译后，不会在标准输出中，打印出信息



###总结

通过上面的方法，可以方便的把py文件编译为pyc文件了，从而可以实现部分的源码隐藏，保证了python做商业化软件时，保证了部分的安全性吧，继续学习下，看怎么修改opcode。


---
 

一般情况下，一些程序的调试过程中我们会让它输出一些信息，特别是一些大型的程序，我们通过这些信息可以了解程序的运行情况，python提供了一个日志模块logging，它可以把我们想要的信息全部保存到一个日志文件中，方面我们查看。我们先看一个简单的例子。

```python
>>> import logging
>>> LOG_FILENAME="C:\Python25\log_test.txt"
>>> logging.basicConfig(filename=LOG_FILENAME,level=logging.DEBUG)
>>> logging.debug("This message should go to the log file")
```
然后我们就可以在C盘python25目录下发现一个名为log_test.txt的文件，打开里面的内容为：    DEBUG:root:This message should go to the log file

然后我们重复运行最后一句，会发现这个文本文件每次都会多出一行：DEBUG:root:This message should go to the log file

下面我们看一个更标准的程序：

```python
>>> import logging
>>> logger=logging.getLogger()
>>> handler=logging.FileHandler("Log_test.txt")
>>> logger.addHandler(handler)
>>> logger.setLevel(logging.NOTSET)
>>> logger.error("This is an error message")
>>> logger.info("This is an info message")
>>> logger.critical("This is a critical message")
```
日志文件中会出现三行内容：

```python
This is an error message
This is an info message
This is a critical message
```
上面程序的第2行是生成一个日志对象，里面的参数时日志的名字，可以带，也可以不带。第3行是生成了一个handler，logging支持很多种Handler，像FileHandler，SocketHandler等待，这里由于我们要写文件，所以用了FileHandler，它的参数就是filename，默认当前路径，当然我们可以自己指定路径。

第5行设置日志信息输出的级别。Logging提供了多种日志级别，如NOTSET,DEBUG,INFO,WARNING,ERROR,CRITICAL等，每个级别都对应一个数值，如果我们不自己设置输出级别，那么系统会执行缺省级别，值为30，就warning。Logging也提供了一个方法来查看缺省日志级别，getLevelName（logger，getEffectiveLevel（））。

---

###python模块——logging(日志管理)

日志对象对于不同的级别信息提供不同的函数进行输出，如：info(), error(), debug()等。当写入日志时，小于指定级别的信息将被忽略。因此为了输出想要的日志级别一定要设置好此参数。这里我设为NOTSET（值为0），也就是想输出所有信息。系统默认的日志级别排序为，CRITICAL,ERROR,WARNING,INFO,DEBUG,NOTSET。比如说我们要输出的信息为CRITICAL，但是我们的日志级别为DEBUG，那么这个信息将被忽略掉。我们看下面的例子：

```python
import logging
import sys
LEVELS={'debug':logging.DEBUG,
        'info':logging.INFO,
        'warning':logging.WARNING,
        'error':logging.ERROR,
        'critical':logging.CRITICAL}
  
if len(sys.argv)>1:
    level_name=sys.argv[1]
    level=LEVELS.get(level_name,logging.NOTSET)
    logging.basicConfig(level=level)
  
logging.debug("This is a debug message")
logging.info("This is an info message")
logging.warning("This is a warning message")
logging.error("This is an error message")
logging.critical("This is a critical error message")
```
运行时候，我们根据给的参数时debug，info等等，来看看输出情况，就可以知道各个日志级别的输出情况了，下面是结果：

####python模块——logging(日志管理)

可以看到过滤进行的很明显。当我们设置级别最低位debug时，所有的信息都输出了，当我们设为最高位critical时候，只有critical输出了，低于critical的被过滤了。

Logging是非常有用的，一个程序的健壮性也这个有关，当一个程序包含很多的调试信息时，可以方便我们发现问题，发现错误。



