<!--BEGIN_DATA
{
    "create_date": "2014-12-16 15:57", 
    "modify_date": "2015-10-13 19:14", 
    "is_top": "0", 
    "summary": "iOS Block、NSThread、NSOperation、GCD", 
    "tags": "iOS", 
    "file_name": "iOS Block、NSThread、NSOperation、GCD.md"
}
END_DATA-->

##Block

======ARC & Block======


ARC和Block合用的时候是最容易出问题的了。

1. Blocks 作为property的时候要使用copy

```
@property (nonatomic, copy) SomeBlockType someBlock;
```
2. 防止retain cycle造成内存泄漏。下面是一种比较好的作法。

```
SomeObjectClass *someObject = ...
__weak SomeObjectClass *weakSomeObject = someObject;
  
someObject.completionHandler = ^{
    SomeObjectClass *strongSomeObject = weakSomeObject;
    if (strongSomeObject == nil)
    {
        // The original someObject doesn't exist anymore.
        // Ignore, notify or otherwise handle this case.
    }
    else
    {
        // okay, NOW we can do something with someObject
        [strongSomeObject someMethod];
    }
};
```
当然，如果Block不会被赋值给SomeObjectClass的property就不需要先定义一个weak对象。 

相信大家为解决告警，又会得到一个比较圆满的解决方案，见下：

```
- (IBAction)onTest:(id)sender  
{  
    BlockDemo *demo = [[BlockDemo alloc]init];  
       
    __weak typeof(BlockDemo) *weakDemo = demo;  
       
    [demo setExecuteFinished:^{  
        if (weakDemo.resultCode == 200) {  
            NSLog(@"call back ok.");  
        }  
    }];  
    [demo executeTest];  
}
```
这样写，即去除了告警又保证了block的运行。


http://www.cnblogs.com/sunfrog/tag/%E5%A4%9A%E7%BA%BF%E7%A8%8B/

http://www.cocoachina.com/ios/20150731/12819.html

<br><hr><br>

##多线程之Thread

每个iOS应用程序都有个专门用来更新显示UI界面、处理用户的触摸事件的主线程，因此不能将其他太耗时的操作放在主线程中执行，不然会造成主线程堵塞(出现卡机现象)，带来极坏的用户体验。一般的解决方案就是将那些耗时的操作放到另外一个线程中去执行，多线程编程是防止主线程堵塞，增加运行效率的最佳方法。
     iOS支持多个层次的多线程编程，层次越高的抽象程度越高，使用也越方便，也是苹果最推荐使用的方法。
    
    下面根据抽象层次从低到高依次列出iOS所支持的多线程编程方法：
    1.Thread ：是三种方法里面相对轻量级的，但需要管理线程的生命周期、同步、加锁问题，这会导致一定的性能开销。
    2.Cocoa Operations：是基于OC实现的，NSOperation以面向对象的方式封装了需要执行的操作，不必关心线程管理、同步等问题。NSOperation是一个抽象基类，iOS提供了两种默认实现：NSInvocationOperation和NSBlockOperation，当然也可以自定义NSOperation。
    3.Grand Central Dispatch(简称GCD，iOS4才开始支持)：提供了一些新特性、运行库来支持多核并行编程，它的关注点更高：如何在多个cpu上提升效率。

```
//************    一：初始化   **************//
    // 1 . 动态方法
     
    NSThread *thread = [[NSThread alloc] initWithTarget:self selector:@selector(runOne) object:nil];
    thread.threadPriority = 1;
    [thread start];
     
    // 2. 静态方法
     
    [NSThread detachNewThreadSelector:@selector(runOne) toTarget:self withObject:nil];
    // 调用完毕后，会马上创建并开启新线程
     
    // 3. 隐式的创建线程
    [self performSelectorInBackground:@selector(runOne) withObject:nil];
 
    //************    二：获取当前线程   **************//
     
    NSThread *currentTh = [NSThread currentThread];
     
     
    //************    三：获取主线程  **************//
     
    NSThread *main = [NSThread mainThread];
   
    //************      四、暂停当前线程 **************//
     
    // 暂停2s
    [NSThread sleepForTimeInterval:2];
     
    NSDate *date = [NSDate dateWithTimeInterval:2 sinceDate:[NSDate date]];
    [NSThread sleepUntilDate:date];
     
    //************      五、线程间的通信 **************//
     
    //1.在指定线程上执行操作
    NSThread *currentThread = [NSThread currentThread];
    [self performSelector:@selector(runOne) onThread:currentThread withObject:nil waitUntilDone:NO];
     
    //2.在主线程上执行操作
     
    [self performSelectorOnMainThread:@selector(runOne) withObject:nil waitUntilDone:YES];
     
    //3.在当前线程执行操作
    [self performSelector:@selector(runOne) withObject:nil];
     
    //************      六、优缺点**************//
     
 
//    1.优点：NSThread比其他两种多线程方案较轻量级，更直观地控制线程对象
//    2.缺点：需要自己管理线程的生命周期，线程同步。线程同步对数据的加锁会有一定的系统开销
```

###多线程之NSOperation

####一、NSOperation
1.简介
NSOperation实例封装了需要执行的操作和执行操作所需的数据，并且能够以并发或非并发的方式执行这个操作。
NSOperation本身是抽象基类，因此必须使用它的子类，使用NSOperation子类的方式有2种：
1> Foundation框架提供了两个具体子类直接供我们使用:NSInvocationOperation和NSBlockOperation
2> 自定义子类继承NSOperation，实现内部相应的方法

2.执行操作
NSOperation调用start方法即可开始执行操作，NSOperation对象默认按同步方式执行,也就是在调用start方法的那个线程中直接执行。NSOperation对象的isConcurrent方法会告诉我们这个操作相对于调用start方法的线程,是同步还是异步执行。isConcurrent方法默认返回NO,表示操作与调用线程同步执行


3.取消操作
operation开始执行之后, 默认会一直执行操作直到完成，我们也可以调用cancel方法中途取消操作

```
[operation cancel];
```
4.监听操作的执行
如果我们想在一个NSOperation执行完毕后做一些事情，就调用NSOperation的setCompletionBlock方法来设置想做的事情

```
operation.completionBlock = ^() {  
    NSLog(@"执行完毕");  
};
```
或者

```
[operation setCompletionBlock:^() {  
    NSLog(@"执行完毕");  
}];
```

####二、NSInvocationOperation
1.简介
基于一个对象和selector来创建操作。如果你已经有现有的方法来执行需要的任务,就可以使用这个类

2.创建并执行操作

```
// 这个操作是：调用self的run方法  
NSInvocationOperation *operation = [[NSInvocationOperation alloc] initWithTarget:self selector:@selector(run) object:nil];  
// 开始执行任务(同步执行)  
[operation start];
```

####三、NSBlockOperation

1.简介

	能够并发地执行一个或多个block对象，所有相关的block都执行完之后,操作才算完成

2.创建并执行操作

```
NSBlockOperation *operation = [NSBlockOperation blockOperationWithBlock:^(){  
        NSLog(@"执行了一个新的操作，线程：%@", [NSThread currentThread]);  
}];  
 // 开始执行任务(这里还是同步执行)  
[operation start];
```
3.通过addExecutionBlock方法添加block操作

```
NSBlockOperation *operation = [NSBlockOperation blockOperationWithBlock:^(){  
    NSLog(@"执行第1次操作，线程：%@", [NSThread currentThread]);  
}];  
   
[operation addExecutionBlock:^() {  
    NSLog(@"又执行了1个新的操作，线程：%@", [NSThread currentThread]);  
}];  
   
[operation addExecutionBlock:^() {  
    NSLog(@"又执行了1个新的操作，线程：%@", [NSThread currentThread]);  
}];  
   
[operation addExecutionBlock:^() {  
    NSLog(@"又执行了1个新的操作，线程：%@", [NSThread currentThread]);  
}];  
   
// 开始执行任务  
[operation start];
```
打印信息如下：

```
2013-02-02 21:38:46.102 thread[4602:c07] 又执行了1个新的操作，线程：<NSThread: 0x7121d50>{name = (null), num = 1}  
2013-02-02 21:38:46.102 thread[4602:3f03] 又执行了1个新的操作，线程：<NSThread: 0x742e1d0>{name = (null), num = 5}  
2013-02-02 21:38:46.102 thread[4602:1b03] 执行第1次操作，线程：<NSThread: 0x742de50>{name = (null), num = 3}  
2013-02-02 21:38:46.102 thread[4602:1303] 又执行了1个新的操作，线程：<NSThread: 0x7157bf0>{name = (null), num = 4}
```
可以看出，这4个block是并发执行的，也就是在不同线程中执行的，num属性可以看成是线程的id


####四、自定义NSOperation
1.简介

如果NSInvocationOperation和NSBlockOperation对象不能满足需求, 你可以直接继承NSOperation, 并添加任何你想要的行为。继承所需的工作量主要取决于你要实现非并发还是并发的NSOperation。定义非并发的NSOperation要简单许多,只需要重载-(void)main这个方法，在这个方法里面执行主任务,并正确地响应取消事件; 对于并发NSOperation, 你必须重写NSOperation的多个基本方法进行实现（这里暂时先介绍非并发的NSOperation）

2.非并发的NSOperation
比如叫做DownloadOperation，用来下载图片

1> 继承NSOperation，重写main方法，执行主任务
DownloadOperation.h

```
#import <Foundation/Foundation.h>  
@protocol DownloadOperationDelegate;  
   
@interface DownloadOperation : NSOperation  
// 图片的url路径  
@property (nonatomic, copy) NSString *imageUrl;  
// 代理  
@property (nonatomic, retain) id<DownloadOperationDelegate> delegate;  
   
- (id)initWithUrl:(NSString *)url delegate:(id<DownloadOperationDelegate>)delegate;  
@end  
   
// 图片下载的协议  
@protocol DownloadOperationDelegate <NSObject>  
- (void)downloadFinishWithImage:(UIImage *)image;  
@end
```

DownloadOperation.m

```
#import "DownloadOperation.h"  
   
@implementation DownloadOperation  
@synthesize delegate = _delegate;  
@synthesize imageUrl = _imageUrl;  
   
// 初始化  
- (id)initWithUrl:(NSString *)url delegate:(id<DownloadOperationDelegate>)delegate {  
    if (self = [super init]) {  
        self.imageUrl = url;  
        self.delegate = delegate;  
    }  
    return self;  
}  
// 释放内存  
- (void)dealloc {  
    [super dealloc];  
    [_delegate release];  
    [_imageUrl release];  
}  
   
// 执行主任务  
- (void)main {  
    // 新建一个自动释放池，如果是异步执行操作，那么将无法访问到主线程的自动释放池  
    @autoreleasepool {  
        // ....  
    }  
}  
@end
```

2> 正确响应取消事件

operation开始执行之后,会一直执行任务直到完成,或者显式地取消操作。取消可能发生在任何时候,甚至在operation执行之前。尽管NSOperation提供了一个方法,让应用取消一个操作,但是识别出取消事件则是我们自己的事情。如果operation直接终止, 可能无法回收所有已分配的内存或资源。因此operation对象需要检测取消事件,并优雅地退出执行

NSOperation对象需要定期地调用isCancelled方法检测操作是否已经被取消,如果返回YES(表示已取消),则立即退出执行。不管是自定义NSOperation子类,还是使用系统提供的两个具体子类,都需要支持取消。isCancelled方法本身非常轻量,可以频繁地调用而不产生大的性能损失

以下地方可能需要调用isCancelled:
* 在执行任何实际的工作之前
* 在循环的每次迭代过程中,如果每个迭代相对较长可能需要调用多次
* 代码中相对比较容易中止操作的任何地方
* 
DownloadOperation的main方法实现如下

```
- (void)main {  
    // 新建一个自动释放池，如果是异步执行操作，那么将无法访问到主线程的自动释放池  
    @autoreleasepool {  
        if (self.isCancelled) return;  
           
        // 获取图片数据  
        NSURL *url = [NSURL URLWithString:self.imageUrl];  
        NSData *imageData = [NSData dataWithContentsOfURL:url];  
           
        if (self.isCancelled) {  
            url = nil;  
            imageData = nil;  
            return;  
        }  
           
        // 初始化图片  
        UIImage *image = [UIImage imageWithData:imageData];  
           
        if (self.isCancelled) {  
            image = nil;  
            return;  
        }  
           
        if ([self.delegate respondsToSelector:@selector(downloadFinishWithImage:)]) {  
            // 把图片数据传回到主线程  
            [(NSObject *)self.delegate performSelectorOnMainThread:@selector(downloadFinishWithImage:) withObject:image waitUntilDone:NO];  
        }  
    }  
}
```

###GCD

####一、简介

在iOS所有实现多线程的方案中，GCD应该是最有魅力的，因为GCD本身是苹果公司为多核的并行运算提出的解决方案。GCD在工作时会自动利用更多的处理器核心，以充分利用更强大的机器。GCD是Grand Central Dispatch的简称，它是基于C语言的。如果使用GCD，完全由系统管理线程，我们不需要编写线程代码。只需定义想要执行的任务,然后添加到适当的调度队列(dispatch queue)。GCD会负责创建线程和调度你的任务，系统直接提供线程管理

####二、调度队列(dispath queue)

1.GCD的一个重要概念是队列，它的核心理念：将长期运行的任务拆分成多个工作单元，并将这些单元添加到dispath queue中，系统会为我们管理这些dispath queue，为我们在多个线程上执行工作单元，我们不需要直接启动和管理后台线程。

2.系统提供了许多预定义的dispath queue，包括可以保证始终在主线程上执行工作的dispath queue。也可以创建自己的dispath queue，而且可以创建任意多个。GCD的dispath queue严格遵循FIFO(先进先出)原则，添加到dispath queue的工作单元将始终按照加入dispath queue的顺序启动。

3.dispatch queue按先进先出的顺序,串行或并发地执行任务

1> serial dispatch queue一次只能执行一个任务, 当前任务完成才开始出列并启动下一个任务
2> concurrent dispatch queue则尽可能多地启动任务并发执行

####三、创建和管理dispatch queue

1.获得全局并发Dispatch Queue (concurrent dispatch queue)

1> 并发dispatch queue可以同时并行地执行多个任务,不过并发queue仍然按先进先出的顺序来启动任务。并发queue会在之前的任务完成之前就出列下一个任务并开始执行。并发queue同时执行的任务数量会根据应用和系统动态变化,各种因素包括:可用核数量、其它进程正在执行的工作数量、其它串行dispatch queue中优先任务的数量等.

2> 系统给每个应用提供三个并发dispatch queue,整个应用内全局共享,三个queue的区别是优先级。你不需要显式地创建这些queue,使用dispatch_get_global_queue函数来获取这三个queue:

```
// 获取默认优先级的全局并发dispatch queue  
dispatch_queue_t  queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
```
第一个参数用于指定优先级，分别使用DISPATCH_QUEUE_PRIORITY_HIGH和DISPATCH_QUEUE_PRIORITY_LOW两个常量来获取高和低优先级的两个queue；第二个参数目前未使用到，默认0即可

3> 虽然dispatch queue是引用计数的对象,但你不需要retain和release全局并发queue。因为这些queue对应用是全局的,retain和release调用会被忽略。你也不需要存储这三个queue的引用,每次都直接调用dispatch_get_global_queue获得queue就行了。

2.创建串行Dispatch Queue (serial dispatch queue)

1> 应用的任务需要按特定顺序执行时,就需要使用串行Dispatch Queue,串行queue每次只能执行一个任务。你可以使用串行queue来替代锁,保护共享资源 或可变的数据结构。和锁不一样的是,串行queue确保任务按可预测的顺序执行。而且只要你异步地提交任务到串行queue,就永远不会产生死锁

2> 你必须显式地创建和管理所有你使用的串行queue,应用可以创建任意数量的串行queue,但不要为了同时执行更多任务而创建更多的串行queue。如果你需要并发地执行大量任务,应该把任务提交到全局并发queue

3> 利用dispatch_queue_create函数创建串行queue,两个参数分别是queue名和一组queue属性

```
dispatch_queue_t queue;  
queue = dispatch_queue_create("cn.itcast.queue", NULL);
```

3.运行时获得公共Queue

GCD提供了函数让应用访问几个公共dispatch queue:

1> 使用dispatch_get_current_queue函数作为调试用途,或者测试当前queue的标识。在block对象中调用这个函数会返回block提交到的queue(这个时候queue应该正在执行中)。在block对象之外调用这个函数会返回应用的默认并发queue。

2> 使用dispatch_get_main_queue函数获得应用主线程关联的串行dispatch queue

3> 使用dispatch_get_global_queue来获得共享的并发queue

4.Dispatch Queue的内存管理

1> Dispatch Queue和其它dispatch对象(还有dispatch source)都是引用计数的数据类型。当你创建一个串行dispatch queue时,初始引用计数为 1,你可以使用dispatch_retain和dispatch_release函数来增加和减少引用计数。当引用计数到达 0 时,系统会异步地销毁这个queue

2> 对dispatch对象(如dispatch queue)retain和release 是很重要的,确保它们被使用时能够保留在内存中。和OC对象一样,通用的规则是如果使用一个传递过来的queue,你应该在使用前retain,使用完之后release

3> 你不需要retain或release全局dispatch queue,包括全局并发dispatch queue和main dispatch queue

4> 即使你实现的是自动垃圾收集的应用,也需要retain和release创建的dispatch queue和其它dispatch对象。GCD 不支持垃圾收集模型来回收内存

####四、添加任务到queue

要执行一个任务,你需要将它添加到一个适当的dispatch queue,你可以单个或按组来添加，也可以同步或异步地执行一个任务,也。一旦进入到queue,queue会负责尽快地执行你的任务。一般可以用一个block来封装任务内容。

1.添加单个任务到queue

1> 异步添加任务

你可以异步或同步地添加一个任务到Queue,尽可能地使用dispatch_async或dispatch_async_f函数异步地调度任务。因为添加任务到Queue中时,无法确定这些代码什么时候能够执行。因此异步地添加block或函数,可以让你立即调度这些代码的执行,然后调用线程可以继续去做其它事情。特别是应用主线程一定要异步地 dispatch 任务,这样才能及时地响应用户事件

2> 同步添加任务

少数时候你可能希望同步地调度任务,以避免竞争条件或其它同步错误。 使用dispatch_sync和dispatch_sync_f函数同步地添加任务到Queue,这两个函数会阻塞当前调用线程,直到相应任务完成执行。注意：绝对不要在任务中调用 dispatch_sync或dispatch_sync_f函数,并同步调度新任务到当前正在执行的 queue。对于串行queue这一点特别重要,因为这样做肯定会导致死锁;而并发queue也应该避免这样做。

3> 代码演示

```
// 调用前，查看下当前线程  
NSLog(@"当前调用线程：%@", [NSThread currentThread]);  
   
// 创建一个串行queue  
dispatch_queue_t queue = dispatch_queue_create("cn.itcast.queue", NULL);  
   
dispatch_async(queue, ^{  
    NSLog(@"开启了一个异步任务，当前线程：%@", [NSThread currentThread]);  
});  
   
dispatch_sync(queue, ^{  
    NSLog(@"开启了一个同步任务，当前线程：%@", [NSThread currentThread]);  
});  
// 销毁队列  
dispatch_release(queue);
```

打印信息：

```
2013-02-03 09:03:37.348 thread[6491:c07] 当前调用线程：<NSThread: 0x714fa80>{name = (null), num = 1}  
2013-02-03 09:03:37.349 thread[6491:1e03] 开启了一个异步任务，当前线程：<NSThread: 0x74520a0>{name = (null), num = 3}  
2013-02-03 09:03:37.350 thread[6491:c07] 开启了一个同步任务，当前线程：<NSThread: 0x714fa80>{name = (null), num = 1}
```

2.并发地执行循环迭代

如果你使用循环执行固定次数的迭代, 并发dispatch queue可能会提高性能。
例如下面的for循环：

```
int i;  
int count = 10;  
for (i = 0; i < count; i++) {  
   printf("%d  ",i);  
}
```

1> 如果每次迭代执行的任务与其它迭代独立无关,而且循环迭代执行顺序也无关紧要的话,你可以调用dispatch_apply或dispatch_apply_f函数来替换循环。这两个函数为每次循环迭代将指定的block或函数提交到queue。当dispatch到并发 queue时,就有可能同时执行多个循环迭代。用dispatch_apply或dispatch_apply_f时你可以指定串行或并发 queue。并发queue允许同时执行多个循环迭代,而串行queue就没太大必要使用了。

下面代码使用dispatch_apply替换了for循环,你传递的block必须包含一个size_t类型的参数,用来标识当前循环迭代。第一次迭代这个参数值为0,最后一次值为count - 1

```
// 获得全局并发queue  
dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);  
size_t count = 10;  
dispatch_apply(count, queue, ^(size_t i) {  
    printf("%zd ", i);  
});  
// 销毁队列  
dispatch_release(queue);
```

打印信息：

```
1 2 0 3 4 5 6 7 8 9
```
可以看出，这些迭代是并发执行的


和普通for循环一样,dispatch_apply和dispatch_apply_f函数也是在所有迭代完成之后才会返回，因此这两个函数会阻塞当前线程，主线程中调用这两个函数必须小心,可能会阻止事件处理循环并无法响应用户事件。所以如果循环代码需要一定的时间执行,可以考虑在另一个线程中调用这两个函数。如果你传递的参数是串行queue,而且正是执行当前代码的queue,就会产生死锁。

3.在主线程中执行任务

1> GCD提供一个特殊的dispatch queue,可以在应用的主线程中执行任务。只要应用主线程设置了run loop(由CFRunLoopRef类型或NSRunLoop对象管理),就会自动创建这个queue,并且最后会自动销毁。非Cocoa应用如果不显式地设置run loop, 就必须显式地调用dispatch_main函数来显式地激活这个dispatch queue，否则虽然你可以添加任务到queue,但任务永远不会被执行。

2> 调用dispatch_get_main_queue函数获得应用主线程的dispatch queue,添加到这个queue的任务由主线程串行化执行

3> 代码实现，比如异步下载图片后，回到主线程显示图片

```
// 异步下载图片  
dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{  
    NSURL *url = [NSURL URLWithString:@"http://car0.autoimg.cn/upload/spec/9579/u_20120110174805627264.jpg"];  
    UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL:url]];  
       
    // 回到主线程显示图片  
    dispatch_async(dispatch_get_main_queue(), ^{  
        self.imageView.image = image;  
    });  
});
```

4.任务中使用Objective-C对象

GCD支持Cocoa内存管理机制,因此可以在提交到queue的block中自由地使用Objective-C对象。每个dispatch queue维护自己的autorelease pool确保释放autorelease对象,但是queue不保证这些对象实际释放的时间。如果应用消耗大量内存,并且创建大量autorelease对象,你需要创建自己的autorelease pool,用来及时地释放不再使用的对象。

####五、暂停和继续queue

我们可以使用dispatch_suspend函数暂停一个queue以阻止它执行block对象;使用dispatch_resume函数继续dispatch queue。调用dispatch_suspend会增加queue的引用计数,调用dispatch_resume则减少queue的引用计数。当引用计数大于0时,queue就保持挂起状态。因此你必须对应地调用suspend和resume函数。挂起和继续是异步的,而且只在执行block之间（比如在执行一个新的block之前或之后）生效。挂起一个queue不会导致正在执行的block停止。

####六、Dispatch Group的使用

假设有这样一个需求：从网络上下载两张不同的图片，然后显示到不同的UIImageView上去，一般可以这样实现

```
// 根据url获取UIImage  
- (UIImage *)imageWithURLString:(NSString *)urlString {  
    NSURL *url = [NSURL URLWithString:urlString];  
    NSData *data = [NSData dataWithContentsOfURL:url];  
    return [UIImage imageWithData:data];  
}  
   
- (void)downloadImages {  
    // 异步下载图片  
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{  
        // 下载第一张图片  
        NSString *url1 = @"http://car0.autoimg.cn/upload/spec/9579/u_20120110174805627264.jpg";  
        UIImage *image1 = [self imageWithURLString:url1];  
           
        // 下载第二张图片  
        NSString *url2 = @"http://hiphotos.baidu.com/lvpics/pic/item/3a86813d1fa41768bba16746.jpg";  
        UIImage *image2 = [self imageWithURLString:url2];  
           
        // 回到主线程显示图片  
        dispatch_async(dispatch_get_main_queue(), ^{  
            self.imageView1.image = image1;  
               
            self.imageView2.image = image2;  
        });  
    });  
}
```

虽然这种方案可以解决问题，但其实两张图片的下载过程并不需要按顺序执行，并发执行它们可以提高执行速度。有个注意点就是必须等两张图片都下载完毕后才能回到主线程显示图片。Dispatch Group能够在这种情况下帮我们提升性能。下面先看看Dispatch Group的用处：

我们可以使用dispatch_group_async函数将多个任务关联到一个Dispatch Group和相应的queue中，group会并发地同时执行这些任务。而且Dispatch Group可以用来阻塞一个线程, 直到group关联的所有的任务完成执行。有时候你必须等待任务完成的结果,然后才能继续后面的处理。
下面用Dispatch Group优化上面的代码：

```
// 根据url获取UIImage  
- (UIImage *)imageWithURLString:(NSString *)urlString {  
    NSURL *url = [NSURL URLWithString:urlString];  
    NSData *data = [NSData dataWithContentsOfURL:url];  
    // 这里并没有自动释放UIImage对象  
    return [[UIImage alloc] initWithData:data];  
}  
   
- (void)downloadImages {  
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);  
       
    // 异步下载图片  
    dispatch_async(queue, ^{  
        // 创建一个组  
        dispatch_group_t group = dispatch_group_create();  
           
        __block UIImage *image1 = nil;  
        __block UIImage *image2 = nil;  
           
        // 关联一个任务到group  
        dispatch_group_async(group, dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{  
            // 下载第一张图片  
            NSString *url1 = @"http://car0.autoimg.cn/upload/spec/9579/u_20120110174805627264.jpg";  
            image1 = [self imageWithURLString:url1];  
        });  
           
        // 关联一个任务到group  
        dispatch_group_async(group, dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{  
            // 下载第一张图片  
            NSString *url2 = @"http://hiphotos.baidu.com/lvpics/pic/item/3a86813d1fa41768bba16746.jpg";  
            image2 = [self imageWithURLString:url2];  
        });  
           
        // 等待组中的任务执行完毕,回到主线程执行block回调  
        dispatch_group_notify(group, dispatch_get_main_queue(), ^{  
            self.imageView1.image = image1;  
            self.imageView2.image = image2;  
               
            // 千万不要在异步线程中自动释放UIImage，因为当异步线程结束，异步线程的自动释放池也会被销毁，那么UIImage也会被销毁  
               
            // 在这里释放图片资源  
            [image1 release];  
            [image2 release];  
        });  
           
        // 释放group  
        dispatch_release(group);  
    });  
}
```

dispatch_group_notify函数用来指定一个额外的block，该block将在group中所有任务完成后执行




