<!--BEGIN_DATA
{
    "create_date": "2014-10-31 12:04", 
    "modify_date": "2015-10-23 11:29", 
    "is_top": "0", 
    "summary": "iOS查找错误日志与性能优化系列", 
    "tags": "iOS", 
    "file_name": "iOS查找错误日志与性能优化系列.md"
}
END_DATA-->

###第一种方法：

```
dwarfdump --uuid xx.app.dSYM     用来得到app的UUID。

dwarfdump --lookup 0x9d70 -arch armv7 xx.app.dSYM  使错误的日志能看懂，把相应的内存地址对应到正确的地方。

```
如果一开始dwarfdump命令不能用的话，要先装Command Line Tools,这个在设置里面能下载（cmd+“，”打开设置）。另外还必须在进入.DSYM所在文件夹。


###第二种方法：

```
atos -o YourApp.app.dSYM/Contents/Resources/DWARF/YourApp 0x00062867
```

在XCODE编译项目之后,会在app旁看见一个同名的dSYM文件.
他是一个编译的中转文件,简单说就是debug的symbols包含在这个文件中.

他有什么作用? 当release的版本 crash的时候,会有一个日志文件,包含出错的内存地址, 使用symbolicatecrash工具能够把日志和dSYM文件转换成可以阅读的log信息,也就是将内存地址,转换成程序里的函数或变量和所属于的 文件名.

有一篇详细的blog讲了这个过程

http://www.anoshkin.net/blog/2008/09/09/iphone-crash-logs/

将类似

```
Thread 0 Crashed:
0 libobjc.A.dylib 0×300c87ec 0×300bb000 + 55276
1 MobileLines 0×00006434 0×1000 + 21556
2 MobileLines 0×000064c2 0×1000 + 21698
3 UIKit 0×30a740ac 0×30a54000 + 131244
```

的log信息转换成

```
Thread 0 Crashed:
0 libobjc.A.dylib 0×300c87ec objc_msgSend + 20
1 MobileLines 0×00006434 -[BoardView setSelectedPiece:] (BoardView.m:321)
2 MobileLines 0×000064c2 -[BoardView touchesBegan:withEvent:] (BoardView.m:349)
3 UIKit 0×30a740ac -[UIWindow sendEvent:] + 264
```

的有用信息.

工具symbolicatecrash隐藏在/Developer/Platforms/iPhoneOS.platform/Developer /Library/Xcode/Plug-ins/iPhoneRemoteDevice.xcodeplugin/Contents/Resources/symbolicatecrash

所以一般复制到/usr/local/bin/ 成为命令行直接调用

```
$ sudo cp /Developer/Platforms/iPhoneOS.platform/Developer/Library/Xcode/Plug-ins/iPhoneRemoteDevice.xcodeplugin/Contents/Resources/symbolicatecrash /usr/local/bin/

```

```
export DEVELOPER_DIR="/Applications/Xcode.app/Contents/Developer​"
find /Applications/Xcode.app -name symbolicatecrash -type f
```

这个时候运行

```
$ symbolicatecrash -h
```

就能看见帮助信息了.

这个时候,问题又来了..每次编译后的dsym文件都要手动保存一次,很是麻烦.

于是有人写了一个脚本,自动在编译后保存该文件.
请参考:<a href='http://www.cimgf.com/2009/12/23/automatically-save-the-dsym-files/' target='blank'>http://www.cimgf.com/2009/12/23/automatically-save-the-dsym-files/</a>

脚本我复制过来在下面

```
#!/bin/sh

if [ "$BUILD_STYLE" == "Debug" ]; then
echo “Skipping debug”
exit 0;
fi

if [ "$EFFECTIVE_PLATFORM_NAME" == "-iphonesimulator" ]; then
echo “Skipping simulator build”
exit 0;
fi

SRC_PATH=${DWARF_DSYM_FOLDER_PATH}/${DWARF_DSYM_FILE_NAME}
RELATIVE_DEST_PATH=dSYM/${EXECUTABLE_NAME}.$(date +%Y%m%d%H%M%S).app.dSYM
DEST_PATH=${PROJECT_DIR}/${RELATIVE_DEST_PATH}
echo “moving ${SRC_PATH} to ${DEST_PATH}”

mv “${SRC_PATH}” “${DEST_PATH}”

if [ -f ".git/config" ]; then
git add “${RELATIVE_DEST_PATH}”
git commit -m “Added dSYM file for ${BUILD_STYLE} build” “${RELATIVE_DEST_PATH}”
fi
```
------------------------------------------------------------------------------------------------------------------



###一：性能优化策略

这一系列文章是我的读书笔记，整理一下，也算是温故而知新。

性能问题的处理流程

发现/重现问题

利用工具剖析

形成假设

改进代码和设计

iOS应用性能问题处理流程

在以上的四个步骤中循环反复，直到问题解决。

Profile!不要猜!

性能优化的主要策略：

不要做无用功：不要在启动时花几百ms来做logging，不要为同样的数据做多次查询

试图重用：对于创建过程昂贵的对象，要重用而不是重新创建

Table View的cell

Date/Number的formatter

正则表达式

SQLite语句

使用更快的方式设计、编程：选择正确的集合对象和算法来进行编程、选择适合的数据存储格式（plist、SQLite）、优化SQLite查询语句

事先做优化

对于昂贵的计算，要进行事先计算。iCal中的重复事件，是预先计算出来的，并保存到数据库中。

事先计算并缓存一些对象，可能会占用大量的内存。注意不要将这些对象声明为static并常驻内存。

事后做优化：异步加载、懒加载

为伸缩性而做优化：当数据有10条、100条、1000条甚至更多的时候，应用程序的性能不应该对应的呈数量级式的增长，否则无法使用。

说起来惭愧，我真的很少遇到性能问题。以前假设中的性能问题，很多是根本不存在的。事前计划也杜绝了不了性能问题的产生，所以不如暂时忘记它吧。当然对于一些常识性的提高性能的设计，仍然是必须的。

###二：iOS应用启动速度优化

很多app的开发者都不重视app的启动速度，这对于碎片化使用情景的用户来说，简直是灾难。

iOS应用的启动速度

应用启动时，会播放一个放大的动画。iPhone上是400ms，iPad上是500ms。最理想的启动速度是，在播放完动画后，用户就可以使用。

如果应用启动过慢，用户就会放弃使用，甚至永远都不再回来。抛开代码不谈，如果抱着PC端游和单机游戏的思维，在游戏启动时强加公司Logo，启动动画，并且用户不可跳过，也会使用户的成功使用率大大降低。

iOS系统的“看门狗"

为了防止一个应用占用过多的系统资源，开发iOS的苹果工程师门设计了一个“看门狗”的机制。在不同的场景下，“看门狗”会监测应用的性能。如果超出了该场景所规定的运行时间，“看门狗”就会强制终结这个应用的进程。开发者们在crashlog里面，会看到诸如0x8badf00d这样的错误代码(“看门狗”吃了坏的食物，它很不高兴)。

场景 “看门狗”超时时间

启动 20秒

恢复运行 10秒

悬挂进程 10秒

退出应用 6秒

后台运行 10分钟

值得注意的是，Xcode在Debug的时候，会禁止“看门狗”。

如何测试启动时间

两种方法：一种使用NSLog，另外一种使用Time Profiler。

使用NSLog

```
CFAbsoluteTime StartTime;

int main(int argc, char **argv) {
     StartTime = CFAbsoluteTimeGetCurrent();
      // ...
}
 
 - (void)applicationDidFinishLaunching:(UIApplication *)app {
      dispatch_async(dispatch_get_main_queue(), ^{
         NSLog(@"Launched in %f sec", CFAbsoluteTimeGetCurrent() - StartTime);
      });
      // ...
}
```
使用Time Profiler

Instruments->Time Profiler

Profile你的app

切换到CPU strategy view，找到你的app启动的第一帧

搜索-[UIApplication _reportAppLaunchFinished]

找到包含-[UIApplication _reportAppLaunchFinished]的最后一帧，即可计算出启动时间

iOS App启动过程

链接并加载Framework和static lib

UIKit初始化

应用程序callback

第一个Core Animation transaction

链接并加载Framework及static lib时需要注意：

每个Framework都会增加启动时间和占用的内存

不必要的Framework，不要链接

必要的Framework，不要票房为Optional

只在使用在Deployment Target之后发布的Framework时，才使用Optional（比如你的Deployment Target是iOS 3.0，需要链接StoreKit的时候）

避免创建全局的C++对象

初始化UIKit时需要注意：

字体、状态栏、user defaults、main nib会被初始化

保持main nib尽可能的小

User defaults本质上是一个plist文件，保存的数据是同时被反序列化的，不要在user defaults里面保存图片等大数据

应用程序的回调：

application:willFinishLaunchingWithOptions:

恢复应用程序的状态

application:didFinishLaunchingWithOptions:

我一直认为设计的本质是折衷。当你为了100ms的启动速度优化欢欣不已，而无视那长达10秒的启动动画时，应该想想究竟什么是应该做的。做正确的事情比把事情做好更重要。

三：事件处理-拯救主线程

用户经常评论app的一个用词是“卡顿”，很大的因素是因为主线程被占用了。用户的事件是在主线程被处理的，包括点击、滚动、加速计、Proximity Sensor。

为了保证事件的平滑处理，需要进行如下优化：

最小化主线程的CPU占用

将工作“搬离”主线程

不要阻塞主线程

最小化主线程的CPU占用

前面两篇文章，我们接触到了Time Profiler。使用它可以剖析不同线程的CPU使用情况，并给出调用堆栈的CPU时间占用百分比。如果app“卡顿”，并且在Time Profiler的结果可以找到明确的高占用堆栈，你需要把它优化掉。

将工作“搬离”主线程 - 隐式并发

为了得到更流畅的交互体验，iOS已经帮我们做了很多事情，Android就没有这么好运了。iOS将以下这些事情搬离了主线程：

View和layer的动画（动画绘制前的计算，而不是drawing过程）

Layer的组合计算（drawing后的叠加）

PNG的解码（是的，你没看错；而且利用了CPU的多核心）

注意滚动（Scrolling）不是一个动画，而是在Main Run Loop中不断接收事件并且处理。

将工作“搬离”主线程 - 显式并发

这里是需要开发者们搞定的部分。磁盘、网络等I/O会阻塞线程，不要把它们放到主线程里。常用的技术有：

Grand Central Dispatch(GCD)

NSOperationQueue

NSThread

iOS 4.0后，易用的GCD技术被广泛使用。例如：

```
dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0),

^{

    // do something in background

    dispatch_async(dispatch_get_main_queue(), ^{

        // do something on main thread

    });

});
```

###GCD的陷阱

GCD其实就是线程，只不过提供了一个更高层次的抽象。过多的线程一定会带来性能损失，因此GCD设计了一个最高允许的线程值（对开发者透明，不用管到底有多少）。那么如何解决这个问题呢？

将队列串行化

使用Dispatch sources

使用带有限制的NSOperationQueue

使用Cocoa Touch提供的异步方法

另外一个陷阱是线程安全：

UIKit必须要在主线程使用，除了UIGraphics，UIBezierPath，UIImage

大多数CG、CA、Foundation的类，不是线程安全的

如果你使用了ojbc runtime来进行introspection，由于它是thread safe的，可能会导致竞争

此外，iOS 4.3添加了DISPATCH_QUEUE_PRIORITY_BACKGROUND，它拥有非常低的优先级。这个优先级只用于不太关心完成时间的真正的后台任务，如果要表示较低的优先级，你通常需要的是DISPATCH_QUEUE_PRIORITY_LOW。

不要阻塞主线程

即使占用了很少的CPU时间（如果你在Time Profiler中看到这些的数据），也可能会阻塞主线程。磁盘、网络、Lock、dispatch_sync以及向其它进程/线程发送消息都会阻塞主线程。Time Profiler只能检测出占用CPU过多的堆栈，但检测不了这些IO的问题。

大多数的阻塞事件，都会伴随着一个系统调用，如：

read/write - 读写文件

send/recv - 收发网络数据

psynch_mutex_wait - 获得锁

mach_msg - IPC

System Trace这个Instrumentor，记录了所有的系统调用，以及每次调用的等待时间。如果你在System Trace里面发现了CPU Time很低，但Wait Time很高的调用，说明在主线程处理I/O已经严重损害了app的性能。

保证主线程的低CPU占用，将I/O移至其它线程，可以大大地提高主线程对交互事件的处理能力。我建议开发者朋友们写代码的时候，除非是以前遇到过的问题，都没有必要假设问题存在。80%的优化都是不必要的。


<br/><hr><br/>


iOS应用是非常注重用户体验的，不光是要求界面设计合理美观，也要求各种UI的反应灵敏，我相信大家对那种一拖就卡卡卡的 TableView 应用没什么好印象。还记得12306么，那个速度，相信大家都受不了。为了提高 iOS 的运行速度，下面我将抛砖引玉介绍一些我实践过的用来提供iOS程序运行效率的方法，与大家分享，希望能得到更多的反馈和建议。

1，计算代码运行时间：相信数据，不要太相信感觉。不过要注意模拟器和真机的差异。

最简单的工具就是 NSDate，但精度不是太好。

NSDate* tmpStartData = [[NSDate date] retain]; //You code here... double deltaTime = [[NSDate date] timeIntervalSinceDate:tmpStartData]; NSLog(@">>>>>>>>>>cost time = %f", deltaTime);
或者将运行代码放到如下方法的 block 参数中，然后返回所运行的时间：

```
#import <mach/mach_time.h>  

// for mach_absolute_time() and friends      
CGFloat BNRTimeBlock (void (^block)(void)) {       
	mach_timebase_info_data_t info;       
	if (mach_timebase_info(&info) != KERN_SUCCESS) return -1.0;          
	uint64_t start = mach_absolute_time ();       
	block ();       
	uint64_t end = mach_absolute_time ();       
	uint64_t elapsed = end - start;          
	uint64_t nanos = elapsed * info.numer / info.denom;       
	return (CGFloat)nanos / NSEC_PER_SEC;   
}
	
```
2，善用性能分析工具。

XCode 自带了很多强大的分析工具，包括静态 Analyze 工具，以及运行时 Profile 工具。
<img width="497" height="223" alt="" src="http://static.oschina.net/uploads/img/201410/31120932_NNBL.jpg" style="cursor: pointer;">

3，关于图片

优先使用[UIImage imageNamed:@""]；

与[[UIImage alloc] initWithContentsOfFile:] 和 [UIImage alloc [initWithData:]] 相比，[UIImage imageNamed:]有着更好的效率，这是因为 iOS 会自带 cache 通过 [UIImage imageNamed:] 载入的图像，但该方法有一个缺点，那就是只能载入应用程序 bundle 中的图像，像网络下载的图像就无能无力了。我习惯的做法是自定义一个 ImageCache 类，自己来 cache 图像。

尽量不要使用全屏大小的背景图片；使用 gradient 图片来取代硬编码的 gradient；gradient 图片应当尽可能窄，然后将之拉伸运用到实际场合中去。

4，对于结构复杂的 View，使用 drawRect 自绘而不是从 nib 中载入。

5，对于 TableView，重用 cell；减少 cell 初始化的工作量，延迟装载；定制复杂 cell 时，使用 drawRect 自绘；Cache 尽可能多的东西，包括 cell 高度；尽可能让 cell 不透明；避免使用图像特性，比如 gradients。

6，在线程中使用 autoreleasepool。

7，将一些不太重要的任务放在 idle 时运行。

```
- (void)idleNotificationMethod {     
	 // do something here 
 }  

- (void)registerForIdleNotification  {     
	[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(idleNotificationMethod) name:@"IdleNotification" object:nil];     	NSNotification *notification = [NSNotification notificationWithName:@"IdleNotification" object:nil];     
	[[NSNotificationQueue defaultQueue] enqueueNotification:notification     postingStyle:NSPostWhenIdle]; 
}

```
8，不要在 viewWillAppear 中做费时的操作。

viewWillAppear: 在 view 显示之前被调用，出于效率考虑，在这个方法中不要处理复杂费时的事情；只应该在这个方法设置 view 的显示属性之类的简单事情，比如背景色，字体等。要不然，用户会明显感觉到 view 显示迟钝。

9，使用多线程来延迟加载资源。比如常见的 TableViewCell 中的网络图像显示，先使用一个默认图像，然后开启线程下载网络图像，当图像下载完成之后，再替换默认图像。

10，关于后台任务

系统进入 background 之后，一般只有10分钟的运行时间，因此有很多值得注意的事项：

a) 尽量减少内存的使用。当内存不足时，iOS将kill那些消耗内存最多的 App。

b) 释放所有的共享资源，比如 Calendar 与 Address book。当应用程序进入后台时，如果它还在使用或没有释放共享资源，iOS会立即kill掉该应用程序。

c) 正确处理App生命周期事件。当进入后台时，应该保持应用程序数据，以便回到前台时能够恢复。当进入 inactive 状态时，应该暂停当前的业务流。iOS运行App在后台运行的时间有限，因此后台代码不应该执行非常耗时的任务，可能的话就使用多线程。当进入后台 时，iOS会保存当前App的一个快照，以便之后在合适的时候（装载view和数据时）呈现给用户以提高用户体验，因此在进入后台时，应该避免在屏幕上呈 现用户信息，以免泄露用户个人资料。

d) 不要更新UI或者执行大量消耗CPU或电池的代码。进入后台之后，不应该执行不必要的任务，不要执行 OpenGL ES 调用，应取消 Bonjour 相关的服务，正确处理网络链接失败，避免更新 UI，清除所有的警告或其他弹出对话框。

e) 保证后台代码的执行工作正常，注意处理异常。

f) 在后台时正确响应系统变化。 如： 设备旋转消息UIDeviceOrientationDidChangeNotification ，重要的时间变化（新的一天开始或时区变化）UIApplicationSignificantTimeChangeNotification ，电池变化UIDeviceBatteryLevelDidChangeNotification 和 UIDeviceBatteryStateDidChangeNotification，用户默认设置变化 NSUserDefaultsDidChangeNotification，本地化语言变化 NSCurrentLocaleDidChangeNotification 等。

11，如果关键代码使用 C/C++/asm 效率更高就使用 C/C++/asm。

12，如果一个方法在一个循环次数非常多的循环中使用，在进入循环前使用 methodForSelector 获取该方法 IMP，然后在循环体中直接使用该 IMP。

13，关于内存释放

在 didReceiveMemoryWarning 中释放内存，比如cache 的图像，view 等，并记得调用 [supper didReceiveMemoryWarning]。清理函数 didReceiveMemoryWarning, viewDidUnload 和 dealloc 都是在方法结尾处调用 supper 的方法。

14，提高 APP 加载速度

避免使用静态初始化，包括静态c++对象，加载时会运行的代码，如+(void) load{} ，会造成在Main函数之前运行额外的代码。

16，利用 cache 空间换时间。cache 是一种常见的空间换时间的提供性能的收到，可以用在相当多的场合。

尽量 cache 那些可重复利用的对象，比如 table cell，date/number formatters，正则表达式，sqlite语句等。

17，关于数据库

缓存经常用到的 sqlite 语句；优化数据库查询语句，用sqlite3_trace和sqlite3_profile来查找性能差的语句；如果可能的话，缓存查询结果缓。

在使用 sqlite_prepare会将SQL查询编译成字节码，要使用bind，重用那些已经prepared的语句。