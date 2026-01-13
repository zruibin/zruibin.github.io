<!--BEGIN_DATA
{
    "create_date": "2014-10-23 18:40", 
    "modify_date": "2015-10-13 16:29", 
    "is_top": "0", 
    "summary": "Lua Install All Platform", 
    "tags": "Lua、配置", 
    "file_name": "Lua Install All Platform.md"
}
END_DATA-->

<a href='http://www.lua.org/' target='blank'>Lua</a> is implemented in pure ANSI C and compiles unmodified in all platforms that have an ANSI C compiler. Lua also compiles cleanly as C++.

Lua is very easy to build and install. There are detailed instructions in the package but here is a simple terminal session that downloads the current release of Lua and builds it in Linux:

```
curl -R -O http://www.lua.org/ftp/lua-5.2.3.tar.gz
tar zxf lua-5.2.3.tar.gz
cd lua-5.2.3
make linux test
```
For Mac OS X, use make macosx test.

------------------------------------------------------------------------------------------------------------------ 

lua是一个脚本语言，它的编译器非常简单。一般而言，lua在游戏里面使用得比较多。它可以通过类似于脚本的形式把函数的功能串行起来，实现很多不可思议的效果。现在关于lua的资料比较少，主要有两个文档可以介绍一下。一个是云风翻译的lua手册，另外一本就是lua作者编写的《Programming in lua》。可是很多朋友看完了这两本资料之后还是不太清楚该怎么使用。今天乘着有空，可以把自己的一些使用经验来写一写。 我们可以把lua看成是lib库，在使用的时候把这个lib添加到自己的工程里面就可以了。这里介绍的方法是windows编译lua的方法，如果是linux系统请参考其他文档。

（1）下载lua工程，下载地址为http://www.lua.org/ftp/，可以随便挑选一个版本即可；

（2）利用vs2005创建一个solution；

（3）在solution中创建两个工程，一个是lualib，一个是lua；

（4）将下载的lua工程解压，同时把src/下面的代码添加到lualib工程中；

（5）将lua.c中的main函数修改为lua_main，将luac.c中的main函数修改为luac_main；

（6）编译lualib工程生成lualib.lib；

（7）在lua工程中添加code.c，同时修改include dir、lib dir，同时在Additional Dependencies中添加lualib.lib；

（8）在code.c中添加代码，内容如下，

```c
#include <stdio.h>
 
#include "lua.h"
#include "lualib.h"
#include "lauxlib.h"
#include "luaconf.h"
 
 
int main(int argc, char* argv[])
{
    lua_State* L = luaL_newstate();
    luaL_openlibs(L);
    luaL_dofile(L, "C:/Documents and Settings/fxx/桌面/lua/debug/test.lua");
    lua_close(L);
 
    return 0;
}
```
（9）此时，我们还需要创建test.lua文件，内容如下   

```lua
function show()
    local b = {}
    local index
     
    for index = 1,10,1 do
        print(index)
    end
end
 
show()
```
（10）编译lua工程，ctrl+F5运行，如果你此时看到了10个打印的数字，那说明lua编译成功了。



--------------------------------------------------------------

1、首先安装lua

linux系统

make linux

make install



2、编译


```
gcc -lm  -g -o test test.c /usr/local/lib/liblua.a -ldl
```


如果少-ldl，那么编译就会报：

```
gcc -lm  -g -o test test.c /usr/local/lib/liblua.a  
```

```
/usr/local/lib/liblua.a(loadlib.o): In function `gctm':
loadlib.c:(.text+0x35): undefined reference to `dlclose'
/usr/local/lib/liblua.a(loadlib.o): In function `ll_loadfunc':
loadlib.c:(.text+0xc0): undefined reference to `dlopen'
loadlib.c:(.text+0xfc): undefined reference to `dlsym'
loadlib.c:(.text+0x198): undefined reference to `dlerror'
loadlib.c:(.text+0x1bb): undefined reference to `dlerror'
```



如果少liblua.a ，就会报如下问题：

```
[wangbin@tuan lua]$ gcc -lm  -g -o test test.c  -ldl                       
/tmp/ccCT0d24.o: In function `main':
/home/wangbin/work/tmp/lua/test.c:26: undefined reference to `luaL_newstate'
/home/wangbin/work/tmp/lua/test.c:27: undefined reference to `luaL_openlibs'
/home/wangbin/work/tmp/lua/test.c:29: undefined reference to `luaL_loadbufferx'
/home/wangbin/work/tmp/lua/test.c:29: undefined reference to `lua_pcallk'
/home/wangbin/work/tmp/lua/test.c:32: undefined reference to `lua_tolstring'
/home/wangbin/work/tmp/lua/test.c:33: undefined reference to `lua_settop'
/home/wangbin/work/tmp/lua/test.c:36: undefined reference to `lua_close'
collect2: ld returned 1 exit status
```


如果少-lm，那么编译结果如下：

```
[wangbin@tuan lua]$ gcc -g -o test test.c /usr/local/lib/liblua.a -ldl 
/usr/local/lib/liblua.a(lobject.o): In function `luaO_arith':
lobject.c:(.text+0xdf): undefined reference to `pow'
/usr/local/lib/liblua.a(lvm.o): In function `luaV_execute':
lvm.c:(.text+0x159a): undefined reference to `pow'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_sin':
lmathlib.c:(.text+0x3e): undefined reference to `sin'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_sinh':
lmathlib.c:(.text+0x6e): undefined reference to `sinh'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_cos':
lmathlib.c:(.text+0x9e): undefined reference to `cos'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_cosh':
lmathlib.c:(.text+0xce): undefined reference to `cosh'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_tan':
lmathlib.c:(.text+0xfe): undefined reference to `tan'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_tanh':
lmathlib.c:(.text+0x12e): undefined reference to `tanh'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_asin':
lmathlib.c:(.text+0x15e): undefined reference to `asin'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_acos':
lmathlib.c:(.text+0x18e): undefined reference to `acos'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_atan':
lmathlib.c:(.text+0x1be): undefined reference to `atan'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_atan2':
lmathlib.c:(.text+0x1fb): undefined reference to `atan2'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_fmod':
lmathlib.c:(.text+0x2db): undefined reference to `fmod'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_sqrt':
lmathlib.c:(.text+0x391): undefined reference to `sqrt'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_pow':
lmathlib.c:(.text+0x3d3): undefined reference to `pow'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_log':
lmathlib.c:(.text+0x450): undefined reference to `log'
lmathlib.c:(.text+0x460): undefined reference to `log'
lmathlib.c:(.text+0x486): undefined reference to `log10'
lmathlib.c:(.text+0x4aa): undefined reference to `log'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_log10':
lmathlib.c:(.text+0x4de): undefined reference to `log10'
/usr/local/lib/liblua.a(lmathlib.o): In function `math_exp':
lmathlib.c:(.text+0x50e): undefined reference to `exp'
collect2: ld returned 1 exit status
```


在Ubuntu 14.10下安装Lua 5.2出错的解决

系统环境为 Ubuntu 14.10，下载Lua安装文件。此处下载的版本为 Lua 5.2.3。

将Lua源代码进行解压：

```
tar xzvf lua-5.2.3.tar.gz
cd lua-5.2.3
```
使用下面的命令进行编译测试：

```
make linux test
```

如果遇到以下错误信息：

```
lua.c:67:31: fatal error: readline/readline.h: 没有那个文件或目录
```

说明缺少libreadline-dev依赖包，使用命令进行安装：

```
sudo apt-get install libreadline-dev
```

然后重新进行编译测试，如果不再有错误提示，可进行正式的编译和安装

```
make linux
sudo make install
```
到此，我的Lua已经在Ubuntu 14.10上成功安装。