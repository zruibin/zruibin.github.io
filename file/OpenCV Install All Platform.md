<!--BEGIN_DATA
{
    "create_date": "2014-10-20 13:24", 
    "modify_date": "2015-10-13 16:01", 
    "is_top": "0", 
    "summary": "", 
    "tags": "C/C++、配置", 
    "file_name": "OpenCV Install All Platform.md"
}
END_DATA-->

首页 - OpenCV China ：图像处理,计算机视觉库,Image Processing, Computer Vision

<a href='http://wiki.opencv.org.cn/index.php/%E9%A6%96%E9%A1%B5' target='blank'>http://wiki.opencv.org.cn/index.php/%E9%A6%96%E9%A1%B5</a>

##Mac os

一、安装OpenCV for MAC
 
1. is下载opencv for mac安装源文件，解压缩
2. 安装cmake程序。如果是Homebrew，在终端中输入：“brew install cmake”，自动安装cmake。<a href="http://mxcl.github.com/homebrew/" target="_blank" rel="nofollow">http://mxcl.github.com/homebrew/</a>
把网页最下方的命令拷入terminal即可
3. 进入存放解压后的opencv文件夹，新建一个空的文件夹build，进入该文件夹，编译安装opencv，使用命令如下：

```
mkdir build
cd build
cmake -G "Unix Makefiles" ..

// cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local .. 

make
sudo make install
```

P.S:如果提示说"

```
CMake Error: CMake was unable to find a build program corresponding to "Unix Makefiles". 
CMAKE_MAKE_PROGRAM is not set.  You probably need to select a different build tool."
```
等,那表示Cmake未安装完全,Xcode主页下载Command Line Tool.

安装好的lib文件存放在“/usr/local/lib”文件夹，h文件存放在“/usr/local/include”。
       至此，opencv for Mac 安装完毕，参考的网址如下：
       <a href="http://tilomitra.com/opencv-on-mac-osx/" target="_blank" rel="nofollow">http://tilomitra.com/opencv-on-mac-osx/</a>

修改Header Search Paths为 /usr/local/include/opencv和 /usr/local/include
修改Library Search Paths为/usr/local/lib

---- 2 ----

####1、安装OpenCV

1）首先下载opencv for mac安装源文件
2）安装cmake程序。
3）进入存放解压后的opencv文件夹，新建一个空的文件夹release，进入该文件夹，编译安装opencv，使用命令如下：

```
mkdir release
cd release
cmake -G "Unix Makefiles" ..  

// cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local ..  
make
sudo make install
```

4）安装好的lib文件存放在“/usr/local/lib”文件夹，h文件存放在“/usr/local/include”。
           至此，opencv for Mac 安装完毕

####2、使用CMake编译OpenCV程序

1）新建源程序文件

新建CMakeLists.txt文件

3)使用CMake编译生成XCode项目，搞定。

3、直接使用XCode开发

1）创建一个空的command line工程。
2）加入测试代码。

3）添加lib文件：右键点击工程名，选择“Add files to..”，在文件选择对话框弹出来时输入“/”，在弹出的路径框中输入：/usr/local/lib，全选该文件夹下的全部dylib文件，添加至工程。

4）添加lib文件查找支持: 点击工程名文件，进入“Build Settings”选项卡，在“Library Search Paths”栏中输入“/usr/local/lib”

5）添加头文件：点击工程名文件，进入“Build Settings”选项卡，在“Header Search Paths”栏中输入：“/usr/local/include   /usr/local/include/opencv”



【注意】不管用CMake还是手工创建XCode项目，都要将BuildSetting中的C++ Standard Library 改为libstdc++(GUN C++ standard library)，不然会产生编译错误，提示找不到"assert.h"文件



OpenCV2.4.10这个版本有Bug，建议安装新版。

但是新的3.0还不支持安卓，只能用2.4.10。

安装步骤见http://blogs.wcode.org/2014/10/howto-install-build-and-use-opencv-macosx-10-10/

期间我遇到了

```
/Users/edwalt/Downloads/opencv/opencv-2.4.10/modules/legacy/src/calibfilter.cpp:98:9: error:comparison of array 'this->latestPoints' not equal to a null pointer is always true
      [-Werror,-Wtautological-pointer-compare]
    if (latestPoints != NULL)
        ^~~~~~~~~~~~    ~~~~
/Users/edwalt/Downloads/opencv/opencv-2.4.10/modules/legacy/src/calibfilter.cpp:526:9: error:address of array 'this->latestCounts' will always evaluate to 'true' [-Werror,-Wpointer-bool-conversion]
    if( latestCounts )
    ~~  ^~~~~~~~~~~~
2 errors generated.
```

这个问题就是因为一个Bug所致，幸好这问题已经解决。
https://github.com/Itseez/opencv/commit/35f96d6da76099d80180439c857a4abe5cb17966
打开Finder进入所有文件，搜索calibfilter.cpp。参照此网页内的代码修改此文件。-的就是要删除的，+就是要加上的。保存后继续Terminal输入make编译正常了。


<br/><hr><br/>


##Linux



Cmake的安装

OpenCV 2.2以后版本需要使用Cmake生成makefile文件，因此需要先安装cmake。

ubuntu下安装cmake比较简单，

apt-get install cmake

如果觉得自带的版本不符合要求，可以下载安装包。

下载最新版的安装包：

<a href='http://www.cmake.org/cmake/resources/software.html' target='blank'>http://www.cmake.org/cmake/resources/software.html</a>

这里下载已经编译好的，这样只需要解压至需要的目录下即可使用：

```
tar zxvf cmake-2.8.10.2-Linux-i386.tar.gz –C /usr/local/
```

设置环境变量：

```
sudo gedit /home/emouse/.bashrc
```

在打开的文件后添加：

```
export PATH=$PATH:/usr/local/cmake-2.8.10.2-Linux-i386/bin
```

查看版本，测试是否安装成功：

```
root@emouse:/home# cmake --version 
cmake version 2.8.10.2
```

Ubuntu 下安装 OpenCV

软件环境：

Ubuntu 12.04

OpenCV 2.4.3

Cmake 2.8.10.1

gcc 4.6.3 （系统默认）

 

1、先安装 libgtk2.0-dev 和 pkg-config，，否则后期编译运行程序会出现类似如下的问题：

```
OpenCV Error: Unspecified error (The function is not implemented. Rebuild the library with Windows, GTK+ 2.x or Carbon support. If you are on Ubuntu or Debian, install libgtk2.0-dev and pkg-config, then re-run cmake or configure script) in cvNamedWindow, file /usr/local/opencv/OpenCV-2.0.0/src/highgui/window.cpp, line 100 
terminate called after throwing an instance of 'cv::Exception'
```

通过网络获取安装：

```
# apt-get install libgtk2.0-dev# apt-get install pkg-config
``` 

2、下载OpenCV ，文件名：OpenCV-2.4.3.tar.bz2，下载地址：

<a href='http://www.opencv.org.cn/index.php/Download' target='blank'>http://www.opencv.org.cn/index.php/Download</a>

解压：

```
#tar jxvf OpenCV-2.4.3.tar.bz2
```

得到文件夹 OpenCV-2.4.3

这里新建一个文件夹OpenCV-x86作为PC编译目录。

 

3、#cmake-gui 打开cmake的gui界面，开始进行配置。

cmake主要用于进行一些配置设定，从而生成用于编译安装的makefile文件，通过界面进行参数的配置和设定，非常直观、方便。在配置中指定源码和编译目录以及生成方式。

按照下图的步骤进行配置：

<a href="http://images.cnitblog.com/blog/337520/201302/22220405-92d39b75803a4167ac71dc372aed096b.png" rel="nofollow"><img title="image" alt="image" src="http://static.oschina.net/uploads/img/201410/20132645_1RBq.png" width="701" height="544"></a>


点击Finish后cmake即载入默认配置，如下图所示：

<a href="http://images.cnitblog.com/blog/337520/201302/22220411-4fbf65d125bd4458b79c4999ee1af90e.png" rel="nofollow"><img title="image" alt="image" src="http://static.oschina.net/uploads/img/201410/20132645_bEYD.png" width="711" height="552"></a>

如图所示，窗口的中间部分即配置列表，这里和使用cmake命令直接生成makefile文件一致的，如

```
$ cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/home/OpenCV
```

只是这里通过图形界面的方式来进行配置，更加直观方便。

这里指对一个地方进行修改，CMAKE_BUILD_TYPE 值输入RELEASE，其他保持不变，图中蓝色虚线部分显示了默认的安装目录，生成makefile文件最后执行 make install时就会安装到这个目录，这里可以根据个人需求更改。在这里的配置中我勾选了WITH_QT 去掉了WITH_TIFF，其他更多的配置也不清楚，OpenCV中文网站也没找到系统的说明，这里暂时不深究，点击Generate生成配置文件。

进入OpenCV-x86目录可以查看Makefile文件，可以留意文件的生成时间是否和刚才的生成时间一致。

4、接下来在OpenCV-x86 分别执行make和make install即可完成编译安装。

5、安装完成后需要对系统相关环境变量进行配置：

sudo gedit /etc/ld.so.conf.d/opencv.conf
将以下内容添加到最后：

/usr/local/lib

接下来配置库：

sudo ldconfig
更改环境变量：

sudo gedit /etc/bash.bashrc
在文件后添加：

PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib/pkgconfig 
export PKG_CONFIG_PATH
保存退出，在运行下面的例程之前，需要重新开启终端来使配置生效。

例程测试

拷贝步骤2中解压的的/OpenCV-2.4.3/samples/c 将c文件夹拷贝出来，下面运行一下这里面的一个例程，初步体验下OpenCV。拷贝完成后进入这个文件夹：

chmod +x build_all.sh

./build_all.sh

这样就对例程目录下的源文件进行了编译，这里运行一个人脸检测的程序，下面摘录自本文参考资料3。

Some of the training data for object detection is stored in /usr/local/share/opencv/haarcascades. You need to tell OpenCV which training data to use. I will use one of the frontal face detectors available. Let’s find a face:

终端中运行：

```
./facedetect --cascade="/usr/local/share/OpenCV/haarcascades/haarcascade_frontalface_alt.xml" --scale=1.5 lena.jpg
```
得到的结果如下图：

<a href="http://images.cnitblog.com/blog/337520/201302/22220416-35bf6f36c14548718759c0cd84a471b8.png" rel="nofollow"><img title="image" alt="image" src="http://static.oschina.net/uploads/img/201410/20132645_6A6L.png" width="723" height="556"></a><a href="http://images.cnitblog.com/blog/337520/201302/22220448-28c63501d5ec4fdc9ee1166e69397f93.png" rel="nofollow"><img title="image" alt="image" src="http://static.oschina.net/uploads/img/201410/20132645_6ezY.png" width="514" height="589"></a>

到这里基本的就写完了，OpenCV我之前也没有任何基础，这里只是把平台配置起来跑通，后续的工作还有很多，欢迎各位参考。转载请注明<a href='http://emouse.cnblogs.com/' target='blank'>http://emouse.cnblogs.com/</a>



----- 2 ------

我的系统是Ubuntu 12.04LTS ，下载的OpenCV版本是目前最新的OpenCV 2.4.2

1、准备好源码，可以直接下载，也可以svn弄下来
要准备的东东就是上网下载个Linux版的OpenCV啦，zip格式的。解压到一个地方，我放到机子的地方是/home/star/apps/里面。
如今的目录状态是：/home/star(这是我的用户名啊，和你不一样)/apps(这是我习惯放程序的地方，神码pdf阅读器就是放这的)/OpenCV/(这里就好多OpenCV的文件，下面要在里面cmake的)

2、下载OpenCV所需要的依赖文件
sudo -sH 变成超人
然后狂apt-get install。。。。
具体install什么，就看下面的链接啦，如果是新手的话，建议全部都install啊。。不然就会有最低下的错误，而且弄了好久都不知到怎么回事。
<a href='http://opencv.willowgarage.com/wiki/InstallGuide%20%3A%20Debian' target='blank'>http://opencv.willowgarage.com/wiki/InstallGuide%20%3A%20Debian</a>

3、编译OpenCV
回到步骤1的那个OpenCV目录，新建一个叫release的文件夹，然后在里面cmake，具体也可参考上面的链接
    cd ~/opencv # the directory containing INSTALL, CMakeLists.txt etc.    mkdir release    cd release    cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local -D BUILD_PYTHON_SUPPORT=ON -D BUILD_EXAMPLES=ON ..

看到上面的cmake命令没有！！！搞定的话第一小步就完成了

然后就第二小步： make
这一步非常久啊。。。很久很久很久。。。。。。
然后就很轻松的： make install


4、小配置

这一步关乎你的程序能不能找到那些include，和lib。

大家可以参考这篇文章～～很后才找到的。。。为什么没有早点发现呢。。。走了好多冤枉路啊= =

<a href='http://www.samontab.com/web/2010/04/installing-opencv-2-1-in-ubuntu/' target='blank'>http://www.samontab.com/web/2010/04/installing-opencv-2-1-in-ubuntu/</a>

下面的是从这个链接copy的。。。人家图文并茂，都懒得翻译了。。怕翻译错了。。。

Now you have to configure the library. First, open the opencv.conf file with the following code:

1 sudo gedit /etc/ld.so.conf.d/opencv.conf

Add the following line at the end of the file(it may be an empty file, that is ok) and then save it:

1 /usr/local/lib



Run the following code to configure the library:

1 sudo ldconfig

Now you have to open another file:

1 sudo gedit /etc/bash.bashrc

Add these two lines at the end of the file and save it:

1 PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib/pkgconfig

2 export PKG_CONFIG_PATH



Finally, open a new console, restart the computer or logout and then login again. OpenCV will not work correctly until you do this.

5、写程序！！！
在自己的工作目录里面，新建DisplayImage.cpp
然后从这个地方，copy一下源代码
<a herf='http://docs.opencv.org/doc/tutorials/introduction/linux_gcc_cmake/linux_gcc_cmake.html' target='blank'>http://docs.opencv.org/doc/tutorials/introduction/linux_gcc_cmake/linux_gcc_cmake.html</a>
然后就编译了，编译的方法有三种：

1）直接gcc

2）用cmake建makefile然后make一下

3）IDE法，传说有个万能IDE叫eclipse。。。。
第一种，

g++ `pkg-config --cflags opencv` -o hello hello.cpp `pkg-config --libs opencv`

<a href='http://stackoverflow.com/questions/11532963/cant-compile-opencv-in-linux' target='blank'>http://stackoverflow.com/questions/11532963/cant-compile-opencv-in-linux</a>
给个链接出来，是要告诉你，libs要放在后面啊。。不然会出错滴～～

第二种，
建一个CMakeLists.txt的东西，输入下面的东西
project( DisplayImage )find_package( OpenCV REQUIRED )add_executable( DisplayImage DisplayImage )target_link_libraries( DisplayImage ${OpenCV_LIBS} )
然后。。。还是看这篇文章。。。http://docs.opencv.org/doc/tutorials/introduction/linux_gcc_cmake/linux_gcc_cmake.html

cmake之后，就有个可执行文件，然后就能显示图片啦～～～（怎么又是Lena。。。。）

我遇到的问题：
1、没有编译错误，但运行程序的时候出现下面这个错误
OpenCV ERROR: Unspecified error (The function is not implemented. Rebuild the library with Windows, GTK+ 2.x or Carbon support)
意思是，你木有某些东西的支持，建议你安装什么libgtk2.0(这个忘了是什么)，和pkg-config。
然后我就安装了libgtk神马的啊。然后运行了还不行。（请耐心看下去，最下面解决了～～）
有个GG说看这篇文章可以搞定http://mathiasirwans.blogspot.com/2007/07/my-experience-with-ubuntu-610-opencv-10.html
但是我看了还搞不定。。。
后来深思了出错提示，在安装了上面所说缺少的东西之后，重新cmake+make+make install后，终于搞定了～～～（因为make的过程很痛苦，所以我之前一直回避make。。这次证实我真错了。。。）

2、对视频文件的读写都有问题。应该是ffmepg没设置好
参考这篇文章：<a href='http://www.360doc.com/content/11/0726/10/1217721_135894185.shtml' target='blank'>http://www.360doc.com/content/11/0726/10/1217721_135894185.shtml</a>

还有这个：<a href='http://www.360doc.com/content/11/0726/10/1217721_135894185.shtml' target='blank'>http://www.360doc.com/content/11/0726/10/1217721_135894185.shtml</a>



<br/><hr><br/>



##windows


安装codeblocks
如果大家没有接触过codeblocks的话，那么请在Google上面搜索一下把，这个可是鼎鼎有名的跨平台的C++的一个集成调试工具，简称（IDE），您也可以访问它的网站codeblocks.org。本文的主要目的，就是向您介绍在windows下面如何在codeblocks里面的使用和配置情况。您只需要下载codeblocks下载地址里面的对应的包就可以了，我这里推荐下载的是那个 codeblocks-8.02mingw-setup.exe 文件，安装此文件以后，MinGW编译器也一并安装完毕了。 注意，codebocks支持多种编译器和多种平台，本文介绍的是windows平台下，在codeblocks里面使用MinGW编译器（一种windows下面的gcc编译器和相关工具的移植版本）。


安装OpenCV(1.0)
这一节的内容，与别的安装教程内容，比如VC6下安装与配置都是一样的。如果您已经安装和配置了OpenCV，那么请直接跳到#使用向导生成codeblocks项目
从http://www.opencv.org.cn 下载OpenCV安装程序。假如要将OpenCV安装到C:\Program Files\OpenCV。（下面附图为OpenCV 1.0rc1的安装界面，OpenCV 1.0安装界面与此基本一致。）在安装时选择"将\OpenCV\bin加入系统变量"（Add\OpenCV\bin to the systerm PATH）。
<a href="http://wiki.opencv.org.cn/index.php/Image:Opencv-install-step1.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_ofXp.png" alt="Image:Opencv-install-step1.png" width="503" height="385"></a>&nbsp;<a href="http://wiki.opencv.org.cn/index.php/Image:Opencv-install-step2.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_XgM1.png" alt="Image:Opencv-install-step2.png" width="503" height="385"></a>&nbsp;<a href="http://wiki.opencv.org.cn/index.php/Image:Opencv-install-step3.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_xFJN.png" alt="Image:Opencv-install-step3.png" width="503" height="385"></a>&nbsp;<a href="http://wiki.opencv.org.cn/index.php/Image:Opencv-install-step4.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_BWHy.png" alt="Image:Opencv-install-step4.png" width="503" height="385"></a>



配置Windows环境变量
检查C:\Program Files\OpenCV\bin是否已经被加入到环境变量PATH，如果没有，请加入。加入后需要注销当前Windows用户（或重启）后重新登陆才生效。(可以在任务管理器里重启explorer.exe)
<a href="http://wiki.opencv.org.cn/index.php/Image:Path-envirionment-var1.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_5xsb.png" alt="Image:Path-envirionment-var1.png" width="418" height="490"></a>&nbsp;<a href="http://wiki.opencv.org.cn/index.php/Image:Path-envirionment-var2.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_LQhj.png" alt="Image:Path-envirionment-var2.png" width="385" height="423"></a>



使用向导生成codeblocks项目
首先，使用向导，生成console模式下面的一个项目。如下图所示，注意选择红色框所示的Console application

<a href="http://wiki.opencv.org.cn/index.php/Image:Cb_opencv0.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_YFQZ.png" alt="Image:Cb_opencv0.png" width="594" height="440"></a>

随便去一个项目的名字，这里我取成 text_opencv

<a href="http://wiki.opencv.org.cn/index.php/Image:Cb_opencv1.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_u3Lm.png" alt="Image:Cb_opencv1.png" width="519" height="423"></a>

一路选择下一步，就创建完成了。整个项目里面，就一个main.cpp文件。
接着，修改main.cpp的代码如下

<a href="http://wiki.opencv.org.cn/index.php/Image:Cb_opencv4.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_uveX.png" alt="Image:Cb_opencv4.png" width="598" height="510"></a>

注意，上面的代码，可以从图像文件读入和显示直接copy代码得到。


添加库文件和头文件
完成了代码修改之后，并不能编译和生成exe文件，必须添加必要的头文件的路径和库文件的路径，以便于编译器和连接器找到这些文件。 先右键点击项目的名称，在右键菜单中选择“build options”，如下图所示。 注：若安装OpenCV 2.x,请参考本页页低的“英文的OpenCV wiki 里面的Codeblocks教程”.

<a href="http://wiki.opencv.org.cn/index.php/Image:Cb_opencv5.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_aFIW.png" alt="Image:Cb_opencv5.png" width="372" height="437"></a>

然后，按照下面的图，添加include路径。

<a href="http://wiki.opencv.org.cn/index.php/Image:Cb_opencv6.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_4IFT.png" alt="Image:Cb_opencv6.png" width="707" height="515"></a>

再按照下面的图，添加lib库的路径。

<a href="http://wiki.opencv.org.cn/index.php/Image:Cb_opencv7.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_alY9.png" alt="Image:Cb_opencv7.png" width="707" height="515"></a>

接着，添加库的编译选项，加入 -lhighgui -lcv -lcxcore ,如下图所示。
<a href="http://wiki.opencv.org.cn/index.php/Image:Cb_opencv8.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_dTNP.png" alt="Image:Cb_opencv8.png" width="707" height="515"></a>


大功告成，编译生成exe文件并运行
现在，就可以选择“build”按钮，生成exe文件，并且运行了。当然，可能你并没有设置需要显示的图片。你需要手工copy一个图片到项目的目录，比如 lena.jpg。然后添加到程序的命令行参数，如下图所示。

<a href="http://wiki.opencv.org.cn/index.php/Image:Cb_opencv9.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_3TdS.png" alt="Image:Cb_opencv9.png" width="234" height="256"></a><br><a href="http://wiki.opencv.org.cn/index.php/Image:Cb_opencv10.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_Y06Z.png" alt="Image:Cb_opencv10.png" width="283" height="373"></a>

以下就是程序运行并且显示的结果

<a href="http://wiki.opencv.org.cn/index.php/Image:Cb_opencv2.png" rel="nofollow"><img src="http://static.oschina.net/uploads/img/201410/20132459_22HW.png" alt="Image:Cb_opencv2.png" width="785" height="623"></a>