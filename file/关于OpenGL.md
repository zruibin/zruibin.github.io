<!--BEGIN_DATA
{
    "create_date": "2014-05-31 10:34", 
    "modify_date": "2015-10-13 15:10", 
    "is_top": "0", 
    "summary": "关于OpenGL 与Visual Stdio tracker.exe is missing 解决办法", 
    "tags": "配置", 
    "file_name": "关于OpenGL.md"
}
END_DATA-->

<p>opengl: <a href="http://www.cnblogs.com/yangxi/category/322690.html" rel="nofollow">http://www.cnblogs.com/yangxi/category/322690.html</a> </p>



1、 MacOS中：

MacOS默认集成了OpenGL，在codeblocks中只需要create new project，选择glut project即可，codeblocks会自动生成一个main.c文件，点击编译运行，即可成功运行出现界面；

2、 Window环境：

windows环境配置稍微复杂些

（1）下载codeblocks，最好是带mingw的版本，不然则要自己配置mingw；

（2）下载GLUT bin文件 http://www.xmission.com/~nate/glut.html，解压，将glut32.dll复制到C:\windows\system目录，将glut32.lib复制到mingw\lib目录，将glut.h复制到mingw\include目录，mingw为你的mingw目录，如果是codeblocks自带的，则在codeblocks安装目录下；

（3）新建工程，选择GLUT project，一路确认即可，完成后可看到系统自动生成了一个main.cpp文件，里面有若干行代码；

（4）添加头文件#include <windows.h>，注意这一步非常重要

（5）点击build options--->link libraries，点击add，选择刚才复制到mingw\lib目录下的glut32.lib文件，提示选择no，然后确定，然后直接编译运行程序就可看到效果了


<br/><hr><br/>


GLUT 3.7 下载地址：http://www.opengl.org/resources/libraries/glut/glutdlls37beta.zip

下载下来的 GLUT压缩包有 glut.dll, glut.h, glut.lib, glut32.dll,  glut32.lib

 

将glut.h 放在 MinGW\include\GL 下

将glut.lib, glut32.lib 放在 MinGW\lib 下

将glut.dll, glut32.dll 放在 windows\System32 下

　　（有人说放在 windows\SysWOW64 下，我之前测试的时候两个都放了）

 新建Porject -> GLUT projcet

 之后会有一句： "Please select GLUT's location"，选择MinGW就好

 新建的项目要 #include <windows.h>，之后应该就可以了。



VS2012 error : Required file tracker.exe is missing 解决办法


其实就是找到你的项目文件xxxx.vcxproj,使用编辑器打开，是xml格式的定义文件，查找关键字 PropertyGroup

会发现有几个这样的配置，然后在这样的关键附近插入如下代码：

```
<!-- for example in the project file --> 

     <PropertyGroup> 

         <TrackFileAccess>false</TrackFileAccess> 

     </PropertyGroup>
```

加入后，我的项目文件的代码定义像下面这个样子：

```
</ItemGroup> 

        <PropertyGroup> 

         <TrackFileAccess>false</TrackFileAccess> 

     </PropertyGroup> 

  <PropertyGroup Label="Globals"> 

    <ProjectGuid>{325EC88B-5F85-493D-92C0-E5CEBCA0BB39}</ProjectGuid> 

    <RootNamespace>MFCQQChat</RootNamespace> 

    <Keyword>MFCProj</Keyword> 

  </PropertyGroup> 

  <Import Project="$(VCTargetsPath)\Microsoft.Cpp.Default.props" /> 

  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'" Label="Configuration"> 

    <ConfigurationType>Application</ConfigurationType> 

    <UseDebugLibraries>true</UseDebugLibraries> 

    <PlatformToolset>v110_xp</PlatformToolset> 

    <CharacterSet>Unicode</CharacterSet> 

    <UseOfMfc>Static</UseOfMfc> 

  </PropertyGroup>
```


保存文件后，编译运行，通过！！！！