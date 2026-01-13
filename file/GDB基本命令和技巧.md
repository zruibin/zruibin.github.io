<!--BEGIN_DATA
{
    "create_date": "2014-12-18 01:26", 
    "modify_date": "2015-10-13 19:18", 
    "is_top": "0", 
    "summary": "gdb基本命令和技巧", 
    "tags": "C/C++、Makefile", 
    "file_name": "GDB基本命令和技巧.md"
}
END_DATA-->

###关于GDB 
 
对于大多数Cocoa程序员来说，最常用的debugger莫过于Xcode自带的调试工具了。而实际上，它正是gdb的一个图形化包装。相对于gdb，图形化带来了很多便利，但同时也缺少了一些重要功能。而且在某些情况下，gdb反而更加方便。因此，学习gdb，了解一下幕后的实质，也是有必要的。 
 
gdb可以通过终端运行，也可以在Xcode的控制台调用命令。本文将通过终端讲述一些gdb的基本命令和技巧。 
 
首先，我们来看一个例子： 
 
    #import <Foundation/Foundation.h>  
 
    int main(int argc, char **argv)  
    {  
        NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];  
        NSLog(@"Hello, world!");  
        [pool release];  
 
        return 0;  
    } 
 
我们把文件命名为test.m，然后编译： 
 
    gcc -g -framework Foundation test.m 
 
准备工作已经完成。现在我们可以开始调试了。只要把要调试的文件名作为参数，启动gdb： 
 
    gdb a.out 
 
gdb启动后会输出很多法律声明之类的信息。无视它们，最后我们看到一个提示： 
 
    (gdb) 
 
成功！现在debugger和刚才编译好的程序都被装载了。不过，现在程序还没有开始运行。因为gdb在程序开始前把它暂停了，好让我们有机会设置调试参数。这次我们不需要做特别设置，所以马上开始运行吧： 
 
    (gdb) run  
 
    Starting program: /Users/mikeash/shell/a.out  
    Reading symbols for shared libraries .++++....................... done  
    2011-06-16 20:28:53.658 a.out[2946:a0f] Hello, world!  
 
    Program exited normally.  
    (gdb) 
 
糟糕，程序竟然exited normally了（==|||）。这可不行，我们得让他崩溃才行。所以我们给这个小程序添加一个bug： 
 
    int x = 42;  
    NSLog("Hello, world! x = %@", x); 
nice。这样一来程序就会漂亮地崩溃了: 
 
    (gdb) run  
 
    Starting program: /Users/mikeash/shell/a.out  
    Reading symbols for shared libraries .++++....................... done  
 
    Program received signal EXC_BAD_ACCESS, Could not access memory.  
    Reason: 13 at address: 0x0000000000000000  
    0x00007fff84f1011c in objc_msgSend ()  
    (gdb) 
 
如果我们是在shell中直接运行的程序，在崩溃后就会回到shell。不过现在我们是通过gdb运行的，所以现在并没有跳出。gdb暂停了我们的程序，但依然使之驻留在内存中，让我们有机会做调试。 
 
首先，我们想知道具体是哪里导致了程序崩溃。gdb已经通过刚才的输出告知了我们： 函数objc_msgSend就是祸之根源。但是这个信息并不足够，因为这个objc_msgSend是objc运行时库中的函数。我们并不知道它是怎么调用的。我们关注的是我们自己的代码。 
要知道这一点，我们需要得到当前进程的函数调用栈的情况，以此回溯找到我们自己的方法。这时我们需要用到backtrace命令，一般简写为bt： 
 
    (gdb) bt  
    #0 0x00007fff84f1011c in objc_msgSend ()  
    #1 0x00007fff864ff30b in _CFStringAppendFormatAndArgumentsAux ()  
    #2 0x00007fff864ff27d in _CFStringCreateWithFormatAndArgumentsAux ()  
    #3 0x00007fff8657e9ef in _CFLogvEx ()  
    #4 0x00007fff87beab3e in NSLogv ()  
    #5 0x00007fff87beaad6 in NSLog ()  
    #6 0x0000000100000ed7 in main () at test.m:10 
 
现在我们可以看到，程序在test.m的第10行，调用NSLog方法时崩溃了。接下来我们想看一下这次调用的详细信息。这时我们要用到up命令。up命令可以在栈的各层之间跳转。本例中，我们的代码main是#6： 
 
    (gdb) up 6  
    #6 0x0000000100000ed7 in main () at test.m:10  
           NSLog("Hello, world! x = %@", x); 
这回不仅是函数名，连出错的那行代码也打印出来了。但是，我们还可以使用list(简写为l)命令，打印出更多信息： 
ps: 如果需要回到栈列表。可以使用down命令。 
 
    (gdb) l  
        
       int main(int argc, char **argv)  
       {  
           NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];  
           int x = 42;  
          NSLog("Hello, world! x = %@", x);  
          [pool release];  
           
          return 0;  
      } 
 
啊，整个代码都被列出来了。虽然我们用编辑器打开test.m文件然后找到第10行也可以打到同样效果，但显然没有上面的方法更有效率。（当然没有Xcode自带的那个快就是了） 
 
好了，现在我们再来看看这个bug（虽然是我们自己弄出来的）。很明显，在格式化字符串前少加了一个@。我们改正它，并重新运行一遍程序： 
 
    (gdb) run  
    Starting program: /Users/mikeash/shell/a.out  
    Reading symbols for shared libraries .++++....................... done  
 
    Program received signal EXC_BAD_ACCESS, Could not access memory.  
    Reason: KERN_INVALID_ADDRESS at address: 0x000000000000002a  
    0x00007fff84f102b3 in objc_msgSend_fixup ()  
    (gdb) bt  
    #0 0x00007fff84f102b3 in objc_msgSend_fixup ()  
    #1 0x0000000000000000 in ?? () 
 
啊咧，程序还是崩溃了。更杯具的是，栈信息没有显示出这个objc_msgSend_fixup方法是从哪里调用的。这样我们就没法用上面的方法找到目标代码了。这时，我们只好请出一个debugger最常用的功能：断点。 
 
在gdb中，设置断点通过break命令实现。它可以简写为b。有两种方法可以确定断点的位置：传入一个已定义的符号，或是直接地通过一个file:line对设置位置。 
现在让我们在main函数的开始处设置一个断点： 
 
    (gdb) b test.m:8  
    Breakpoint 1 at 0x100000e8f: file test.m, line 8. 
 
debugger给了我们一个回应，告诉我们断点设置成功了，而且这个断点的标号是1。断点的标号很有用，可以用来给断点排序&停用&启用&删除等。不过我们现在不需要理会，我们只是接着运行程序: 
 
    (gdb) run  
    The program being debugged has been started already.  
    Start it from the beginning? (y or n) y  
    Starting program: /Users/mikeash/shell/a.out  
 
    Breakpoint 1, main (argc=1, argv=0x7fff5fbff628) at test.m:8  
    8       NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init]; 
debugger在在我们期望的地方停下了。现在我们使用next(简写n)命令单步调试程序，看看它到底是在哪一行崩溃的： 
 
    (gdb) n  
           int x = 42;  
    (gdb)  
          NSLog(@"Hello, world! x = %@", x);  
    (gdb)  
 
    Program received signal EXC_BAD_ACCESS, Could not access memory.  
    Reason: KERN_INVALID_ADDRESS at address: 0x000000000000002a  
    0x00007fff84f102b3 in objc_msgSend_fixup () 
值得注意的是，我只键入了一次n命令，随后直接敲了2次回车。这样做的原因是gdb把任何空输入当作最近一次输入命令的重复。所以这里相当于输入了3次n。 
 
现在我们可以看到，崩溃之处依然是NSLog。原因嘛，当然是在格式化输出的地方用%@表示int型变量x了。我们仔细看一下输出信息：崩溃原因是错误地访问了0x000000000000002a这个地址。而2a的十进制表示正是42－－我们为x赋的值。编译器把它当作地址了。 
 
###输出数值 
 
一个很重要的调试方法是输出表达式和变量的值。在gdb中，这是通过print命令完成的。 
 
    (gdb) p x  
    $1 = 42 
 
在print命令后追加/format可以格式化输出。/format是一个gdb的格式化字符串，比较有用的格式化字符有 x:十进制数; c:字符; a:地址等。 
 
    (gdb) p/x x  
    $2 = 0x2a 
 
print－object方法(简写为po)用来输出obj-c中的对象。它的工作原理是，向被调用的对象发送名为debugDescription的消息。它和常见的description消息很像。 
 
举例来说，让我们输出一下autorelease pool： 
 
    (gdb) po pool  
    <NSAutoreleasePool: 0x10010e820> 
 
这个命令不仅仅可以输出显式定义的对象，也可以输出表达式的结果。这次我们测试一下nsobject中debugDescription的方法签名： 
 
    (gdb) po [NSObject instanceMethodSignatureForSelector: @selector(debugDescription)]  
    <NSMethodSignature: 0x10010f320>  
        number of arguments = 2  
        frame size = 224  
        is special struct return? NO  
        return value: -------- -------- -------- --------  
            type encoding (@) '@'  
            flags {isObject}  
            modifiers {}  
            frame {offset = 0, offset adjust = 0, size = 8, size adjust = 0}  
            memory {offset = 0, size = 8}  
        argument 0: -------- -------- -------- --------  
            type encoding (@) '@'  
            flags {isObject}  
            modifiers {}  
            frame {offset = 0, offset adjust = 0, size = 8, size adjust = 0}  
            memory {offset = 0, size = 8}  
        argument 1: -------- -------- -------- --------  
            type encoding (:) ':'  
            flags {}  
            modifiers {}  
            frame {offset = 8, offset adjust = 0, size = 8, size adjust = 0}  
            memory {offset = 0, size = 8} 
 
是不是很方便。但是要注意，gdb也许会不能识别NSObject这样的类名。这时我们就要使用一些小技巧，比如说用NSClassFromString来获得类名： 
 
    (gdb) po [NSClassFromString(@"NSObject") instanceMethodSignatureForSelector: @selector(debugDescription)] 
 
返回值是对象的表达式可以用po命令输出结果，那么返回值是基本类型的方法又怎样呢？显然，它们是可以用p命令输出的。但是要小心，因为gdb并不能自动识别出返回值的类型。所以我们在输出前要显式地转换一下： 
 
    (gdb) p [NSObject instancesRespondToSelector: @selector(doesNotExist)]  
    Unable to call function "objc_msgSend" at 0x7fff84f100f4: no return type information available.  
    To call this function anyway, you can cast the return type explicitly (e.g. 'print (float) fabs (3.0)')  
    (gdb) p (char)[NSObject instancesRespondToSelector: @selector(doesNotExist)]  
    $5 = 0 '00' 
 
你也许发现了，doesNotExist方法的返回值是BOOL，而我们做的转换却是char。这是因为gdb也不能识别那些用typedef定义的类型。不仅仅是你定义的，即使是Cocoa框架里定义的也不行。 
 
你也许已经注意到，在用p进行输出的时侯，输出值前面会有一个类似"$1="的前缀。它们是gdb变量。它们可以在后面的表达式中使用，来指代它后面的值。在下面的例子里，我们开辟了一块内存，将其置零，然后释放。在这个过程中，我们使用了gdb变量，这样就不用一遍遍地复制粘贴地址了。 
 
    (gdb) p (int *)malloc(4)  
    $6 = (int *) 0x100105ab0  
    (gdb) p (void)bzero($6, 4)  
    $7 = void  
    (gdb) p *$6  
    $8 = 0  
    (gdb) p (void)free($6)  
    $9 = void 
 
我们也想把这个技巧用到对象上，但不幸的是po命令并不会把它的返回值存储到变量里。所以我们在得到一个新的对象时必须先使用p命令： 
 
    (gdb) p (void *)[[NSObject alloc] init]  
    $10 = (void *) 0x100105950  
    (gdb) po $10  
    <NSObject: 0x100105950>  
    (gdb) p (long)[$10 retainCount]  
    $11 = 1  
    (gdb) p (void)[$10 release]  
    $12 = void 
 
###检查内存 
 
有些时候，仅仅输出一个数值还不能帮助我们查找出错误。我们需要一次性地打印出一整块内存来窥视全局。这时候我们就需要使用x命令。 
 
x命令的格式是x/format address。其中address很简单，它通常是指向一块内存的表达式。但是format的语法就有点复杂了。它由三个部分组成： 
 
第一个是要显示的块的数量；第二个是显示格式(如x代表16进制,d代表十进制,c代表字符)；第三个是每个块的大小。值得注意的是第三部分，即块大小是用字符对应的。用b, h, w,  g 分别表示1, 2, 4, 8 bytes。举例来说，用十六进制方式，打印从ptr开始的4个4-byte块应该这样写： 
 
    (gdb) x/4xw ptr 
 
接下来举一个比较实际的例子。我们看一下NSObject类的内容： 
 
    (gdb) x/4xg (void *)[NSObject class]  
    0x7fff70adb468 <OBJC_CLASS_$_NSObject>: 0x00007fff70adb440  0x0000000000000000  
    0x7fff70adb478 <OBJC_CLASS_$_NSObject+16>:  0x0000000100105ac0  0x0000000100104ac0 
 
接下来再看看一个NSObject实例的内容： 
 
    (gdb) x/1xg (void *)[NSObject new]  
    0x100105ba0:    0x00007fff70adb468 
 
现在我们看到，在实例开头引用了类的地址。 
 
###设置变量 
 
有时，查看数值程度的能力还是稍弱了一点，我们还想能够修改变量。这也很简单，只需要使用set命令： 
 
    (gdb) set x = 43 
 
我们可以用任意表达式给一个变量赋值。比如说新创建一个对象然后赋值： 
 
    (gdb) set obj = (void *)[[NSObject alloc] init] 
 
###断点 
 
我们可以在程序的某个位置设置断点，这样当程序运行到那里的时候就会暂停，而把控制权转移给调试器。就像之前提到的，我们用break命令来设置断点。下面详细地列出了如何设置断点的目标： 
 
SymbolName: 为断点指定一个函数名。这样断点就会设置在该函数上。 
file.c:1234: 把断点设置在指定文件的一行。 
-[ClassName method:name:]: 把断点设置在objc的方法上。用+代表类方法。 
*0xdeadbeef: 在内存的指定位置设置断点。这不是很常用，一般在没有源码的调试时使用。 
 
断点可以用enable命令和disable命令来切换到使用和停用状态，也可以通过delete命令彻底删除。想要查看现有断点的话，使用info breakpoints命令（可以简写成info b，或是i b）。 
 
另外，我们也可以用if命令，把断点升级成条件断点。顾名思义，条件断点只会在设定的条件成真时起作用。举例来说，下面的语句为MyMethod添加了一个条件断点，它只在参数等于5的时候有效： 
 
    (gdb) b -[Class myMethod:] if parameter == 5 
 
最后，在断点上可以附加gdb命令。这样，当断点中断时，附带的命令会自动执行。附加命令使用commands breakpointnumber。这时gdb就会进入断点指令输入状态。 
 
断点指令就是一个以end结尾的标准gdb指令序列。举个例子，我们想在每次NSLog被调用时输出栈信息： 
 
    (gdb) b NSLog  
    Breakpoint 4 at 0x7fff87beaa62  
    (gdb) commands  
    Type commands for when breakpoint 4 is hit, one per line.  
    End with a line saying just "end".  
    >bt  
    >end 
 
这很好理解，只有一点需要提一下：如果commands命令是作用在刚设置的断点上的话，那么就可以省略断点序号。 
 
有些时候，我们希望调试器输出一些信息，但是并不想中断程序运行。这实际上也可以通过追加指令实现。我们只需要在指令的最后增加continue指令就行了。在下面的例子里，我们在断点中断后打印栈信息和参数信息，随后继续运行： 
 
    (gdb) b -[Class myMethod:]  
    Breakpoint 5 at 0x7fff864f1404  
    (gdb) commands  
    Type commands for when breakpoint 5 is hit, one per line.  
    End with a line saying just "end".  
    >bt  
    >p parameter  
    >continue  
    >end 
 
最后一个奇特的运用是return命令。它和c中的同名命令一样，都用来跳出当前函数。如果设置了参数，这参数会作为函数的返回值。 
 
比如说，我们可以用这个技巧屏蔽掉NSLog函数： 
 
    (gdb) commands  
    Type commands for when breakpoint 6 is hit, one per line.  
    End with a line saying just "end".  
    >return  
    >continue  
    >end 
 
有一点需要提醒：虽然上述的技巧很有用，但同时它会带来副作用。例如上面屏蔽NSLog的技巧会严重拖慢程序的运行速度。因为每次断点中断，都会使控制权转移到debugger一边，然后运行命令。这些跨进程的操作很耗时间。 
 
有时候也许看不出来，但当执行的断点变多，或是你在诸如objc_msgSend这样的方法上添加了条件断点，那么也许你的程序会一直运行到天荒地老。 
 
###无源码时的参数 
 
有时我们需要在没有代码的地方调试。比如说，我们在用xcode调试时，经常会发现程序在Cocoa框架里的某个地方崩溃了。我们需要找到到底是在哪里出错了。这种时候，一个可行的方法就是查看崩溃处的参数，看看到底发生了什么。 
 
这是一篇很好的文章，它讲解了在不同的体系结构下，参数是如何存储的。不过它并没有讲到ARM（= =）。所幸ARM的存储很简单，参数只是按顺序被存储在$r0, $r1, $r2, $r3寄存器里。记住，在所有通过寄存器传递参数的体系结构里（i386不是），只有在函数开头的一小段里，寄存器里存的才是参数。因为在程序进行的过程中，它们随时都可能被其他变量替换掉。 
 
举例来说，我们可以打印出传给NSLog的参数： 
 
    Breakpoint 2, 0x00007fff87beaa62 in NSLog ()  
    (gdb) po $rdi  
    Hello, world! 
 
这里有个很常见的技巧：如果我们想给NSLog添加断点来巡查崩溃，就可以根据输出内容设置一下判断，让debugger不至于在每次NSLog时都中断： 
 
    (gdb) break NSLog if (char)[$rdi hasPrefix: @"crashing"] 
 
记住，方法的前两个参数是self和_cmd。所以我们的参数应该从$rdx(x86_64)或$rd2(ARM)开始计算。 
 
###异常 
 
异常会被运行时方法objc_exception_throw抛出。在这个方法里设置断点是很重要的。原因有两点： 
 
1. 抛出异常，通常是程序出现严重错误的信号。 
2. 被抛出的异常通常会被对应的代码捕获。如果你不在这里设置断点的话，就只能获得异常被捕获之后的信息，而不知道它到底是在哪里被抛出的。 
 
如果你设置了断点，程序就会在异常被抛出的时候停止。这样你就有机会查看栈信息，知道具体是哪里抛出了异常。 
 
为异常设置断点的方法也很简单，因为要抛出的异常是objc_exception_throw方法的唯一一个参数，所以我们可以用上一小节提到的方法来完成它。 
 
###线程 
 
现在，多线程代码随处可见。知道如何调试多线程程序也越来越重要。以下一段代码启动了几个后台运行的线程： 
 
    dispatch_apply(3, dispatch_get_global_queue(0, 0), ^(size_t x){  
        sleep(100);  
    }); 
 
运行debugger，在程序睡眠的时候用Control-C杀掉它： 
 
    (gdb) run  
    Starting program: /Users/mikeash/shell/a.out  
    Reading symbols for shared libraries .+++........................ done  
    ^C  
    Program received signal SIGINT, Interrupt.  
    0x00007fff88c6ff8a in __semwait_signal ()  
    (gdb) bt  
    #0 0x00007fff88c6ff8a in __semwait_signal ()  
    #1 0x00007fff88c6fe19 in nanosleep ()  
    #2 0x00007fff88cbcdf0 in sleep ()  
    #3 0x0000000100000ea7 in __main_block_invoke_1 (.block_descriptor=0x1000010a0, x=0) at test.m:12  
    #4 0x00007fff88cbbbc8 in _dispatch_apply2 ()  
    #5 0x00007fff88cb31e5 in dispatch_apply_f ()  
    #6 0x0000000100000e6a in main (argc=1, argv=0x7fff5fbff628) at test.m:11 
 
和我们想的一样，我们输出了一个线程的信息。但是，另外两个后台运行的线程在哪里？我们可以用info threads命令获取所有线程的列表： 
 
    (gdb) info threads  
      3 "com.apple.root.default-priorit" 0x00007fff88c6ff8a in __semwait_signal ()  
      2 "com.apple.root.default-priorit" 0x00007fff88c6ff8a in __semwait_signal ()  
    * 1 "com.apple.root.default-priorit" 0x00007fff88c6ff8a in __semwait_signal () 
 
线程1前面有个星号，这表示它是现在活动中的线程。现在我们切换到线程2： 
 
    (gdb) thread 2  
    [Switching to thread 2 (process 4794), "com.apple.root.default-priority"]  
    0x00007fff88c6ff8a in __semwait_signal ()  
    (gdb) bt  
    #0 0x00007fff88c6ff8a in __semwait_signal ()  
    #1 0x00007fff88c6fe19 in nanosleep ()  
    #2 0x00007fff88cbcdf0 in sleep ()  
    #3 0x0000000100000ea7 in __main_block_invoke_1 (.block_descriptor=0x1000010a0, x=1) at test.m:12  
    #4 0x00007fff88cbbbc8 in _dispatch_apply2 ()  
    #5 0x00007fff88c4f7f1 in _dispatch_worker_thread2 ()  
    #6 0x00007fff88c4f128 in _pthread_wqthread ()  
    #7 0x00007fff88c4efc5 in start_wqthread () 
 
现在我们输出了线程2的信息。然后时线程3……是不是觉得这种方法效率太低了？我们只有3个线程，但如果有300个呢？幸好，gdb提供了thread apply all backtrace命令（简写为t a a bt），用来列出所有线程的详细信息。 
 
Thread 3 (process 4794): 

```
#0 0x00007fff88c6ff8a in __semwait_signal () 
#1 0x00007fff88c6fe19 in nanosleep () 
#2 0x00007fff88cbcdf0 in sleep () 
#3 0x0000000100000ea7 in __main_block_invoke_1 (.block_descriptor=0x1000010a0, x=2) at test.m:12 
#4 0x00007fff88cbbbc8 in _dispatch_apply2 () 
#5 0x00007fff88c4f7f1 in _dispatch_worker_thread2 () 
#6 0x00007fff88c4f128 in _pthread_wqthread () 
#7 0x00007fff88c4efc5 in start_wqthread () 
```

Thread 2 (process 4794): 

```
#0 0x00007fff88c6ff8a in __semwait_signal () 
#1 0x00007fff88c6fe19 in nanosleep () 
#2 0x00007fff88cbcdf0 in sleep () 
#3 0x0000000100000ea7 in __main_block_invoke_1 (.block_descriptor=0x1000010a0, x=1) at test.m:12 
#4 0x00007fff88cbbbc8 in _dispatch_apply2 () 
#5 0x00007fff88c4f7f1 in _dispatch_worker_thread2 () 
#6 0x00007fff88c4f128 in _pthread_wqthread () 
#7 0x00007fff88c4efc5 in start_wqthread () 
```

Thread 1 (process 4794): 

```
#0 0x00007fff88c6ff8a in __semwait_signal () 
#1 0x00007fff88c6fe19 in nanosleep () 
#2 0x00007fff88cbcdf0 in sleep () 
#3 0x0000000100000ea7 in __main_block_invoke_1 (.block_descriptor=0x1000010a0, x=0) at test.m:12 
#4 0x00007fff88cbbbc8 in _dispatch_apply2 () 
#5 0x00007fff88cb31e5 in dispatch_apply_f () 
#6 0x0000000100000e6a in main (argc=1, argv=0x7fff5fbff628) at test.m:11 
```

现在我们可以方便地查看整个程序中的线程了。如果想要更彻底地观察某个线程，只需要用thread命令切换到该线程，然后使用各种已经学过的gdb命令。 
 
###控制台参数和环境变量 
 
在用gdb调试带参数的程序时会遇到一个疑惑，即程序的参数究竟怎么输入： 
 
    $ gdb /bin/echo hello world  
    Excess command line arguments ignored. (world)  
    [...]  
    /Users/mikeash/shell/hello: No such file or directory 
 
如上，把参数直接缀在后面显然是不对的。因为这样它们会被解释成gdb的参数，而不是要调试程序的参数。运行结果也证明了这一点，gdb把hello和world都解释成了要运行的程序名。 
 
解决方法也很简单，即，在gdb启动之后，执行run命令的同时输入参数： 
 
    (gdb) run hello world  
    Starting program: /bin/echo hello world  
    Reading symbols for shared libraries +. done  
    hello world 
 
环境变量可以在启动gdb之前预先在shell中载入，通常情况下这么做也没有问题。但是，如果你操纵的环境变量会对每个程序都造成严重影响的话，这就不是一个好主意了。在这种情况下，我们用set env命令，做针对于目标程序的修改： 
 
    (gdb) set env DYLD_INSERT_LIBRARIES /gdb/crashes/if/this/is/inserted.dylib 