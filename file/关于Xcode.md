<!--BEGIN_DATA
{
    "create_date": "2014-05-09 10:07", 
    "modify_date": "2015-10-13 14:31", 
    "is_top": "0", 
    "summary": "关于Xcode", 
    "tags": "配置", 
    "file_name": "关于Xcode.md"
}
END_DATA-->

 如何在同一个xcode中装入多个版本的ios sdk

如果你真想在一个Xcode下安装多个ios SDK，只需要把 /Developer/Platforms/iPhoneOS.platform/Developer/SDKs 下的 iPhoneOSxx.sdk 拷贝到某一个Xcode下相同的位置就行了～ 
<img src="http://static.oschina.net/uploads/img/201405/16132738_Hw9e.png" alt=""></p>

---


编译xcode5.1以前版本的Architecture的改动，因为旧版本有些库不支持64位，改成32位的！

$(ARCHS_STANDARD_32_BIT)



Xcode 5.1默认使用ARC对于手动管理内存，编译报错:garbage collection is no longer supported

 解决方案:打开程序后 当弹出提示框时，点击“Not Now”，然后去 "build settings" 在最下面 删除 "GCC_ENABLE_OBJC_GC" 即可。


---


XCode兼容ARC和非ARC代码的方法  

ARC提高开发效率，毋庸置疑。

在ARC开发模式下引用非ARC文件或库需进行如下操作以告诉编译器此代码需按照非ARC模式对待：

XCode中项目文件-》TARGETS-》Compile Sources

选择需要标记的文件，将该文件的Compiler Flags编辑为：-fno-objc-arc

同理，若想在非ARC工程中标记ARC文件，将对应文件标记为：-fobjc-arc

---


在linux下编译c++ 程序要使用g++ 编译器,如果你要是使用gcc编译器就会有上面的报错信息,只要在在gcc后加上 -lstdc++就ok了

eg:  g++ example.c -lstdc++

（二）gcc 和 g++ 是有区别的

（1）gcc和g++都是GNU(组织)的一个编译器。

（2）后缀名为.c的程序和.cpp的程序g++都会当成是c++的源程序来处理。而gcc不然，gcc会把.c的程序处理成c程序。

（3）对于.cpp的程序，编译可以用gcc/g++，而链接可以用g++或者gcc -lstdc++。（个人觉得这条是最重要的）

---


关于EXC_ARITHMETIC (code=EXC_I386_DIV, subcode=0x0))错误  

EXC_ARITHMETIC (code=EXC_I386_DIV, subcode=0x0))

断点的代码为：

startTick(m_iActionFps, m_iTotalTime / m_iTotalFrames);

仔细研究上下文并没有空指针，而且iphone上跑一直没问题。后来google了很久，才找到这个非常容易忽略的问题。。。。

错误在于：

m_iTotalTime / m_iTotalFrames中，m_iTotalFrames这个分母为0了。。。

网上说这个错误是除0错误，而且神奇的是ios7没问题，android和ios虚拟机却运行时崩溃了

---

最近使用CocoaPods来添加第三方类库，无论是执行pod install还是pod update都卡在了Analyzing dependencies不动
原因在于当执行以上两个命令的时候会升级CocoaPods的spec仓库，加一个参数可以省略这一步，然后速度就会提升不少。加参数的命令如下：
pod install --verbose --no-repo-update
pod update --verbose --no-repo-update


在你项目的Podfile里面加入这个第三方库的地址
```
pod 'XCAsyncTestCase', :git => 'https://github.com/iiiyu/XCAsyncTestCase.git'
```