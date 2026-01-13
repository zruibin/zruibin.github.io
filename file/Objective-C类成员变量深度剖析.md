<!--BEGIN_DATA
{
    "create_date": "2015-10-21 17:02", 
    "modify_date": "2015-10-21 17:12", 
    "is_top": "0", 
    "summary": "Objective-C类成员变量深度剖析", 
    "tags": "iOS", 
    "file_name": "Objective-C类成员变量深度剖析.md"
}
END_DATA-->

原文出处：<a href='http://quotation.github.io/objc/2015/05/21/objc-runtime-ivar-access.html' target='blank'>Objective-C类成员变量深度剖析</a>

#### 目录
<!-- MarkdownTOC -->

- Non Fragile ivars
- 为什么Non Fragile ivars很关键
- 如何寻址类成员变量
- 真正的“如何寻址类成员变量”
- Non Fragile ivars布局调整
- 为什么Objective-C类不能动态添加成员变量
- 总结

<!-- /MarkdownTOC -->


看下面的代码，考虑Objective-C里最常见的操作之一——类成员变量访问。

```
- (void)doSomething:(SomeClass *)obj
{
    obj->ivar1 = 42;         // 访问obj对象的public成员变量
    int n = self->ivar2;     // 访问当前类实例的成员变量
    ivar2 = n + 1;           // 访问当前类的成员变量
}
```

可能大多数人都没有意识到的是：

* Objective-C的 `->` 操作符不是C语言指针操作！
* Objective-C对象不能简单对应于一个C struct，访问成员变量不等于访问C struct成员！

我一直到昨天中午之前也不知道这些。当明白真相后，发现还没有文章真正讲清楚过Objective-C的类成员变量（ivar，instance variables，类实例变量），于是有必要做个深度剖析。

## Non Fragile ivars

我们常说Objective-C是“C语言的超集”，直觉上认为C语言的语法和特性在Objective-C里都有，Objective-C只是在C的基础上增加了面向对象、动态特性、block等等。我也一直不假思索地以为，Objective-C的成员变量跟C++相同。在C++中，成员变量的访问会被编译器转成一条指令，用“对象地址”加“成员变量偏移值”即可访问到成员变量的值。

昨天一个朋友问我runtime的问题，我看着“non-fragile instance variables”的概念，突然意识到，这不能用C++的对象内存模型来解决。

> The most notable new feature is that instance variables in the modern runtime are “non-fragile”:

> In the legacy runtime, if you change the layout of instance variables in a class, you must recompile classes that inherit from it.
> In the modern runtime, if you change the layout of instance variables in a class, you do not have to recompile classes that inherit from it.

这是苹果官方文档[Objective-C Runtime Programming Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtVersionsPlatforms.html#//apple_ref/doc/uid/TP40008048-CH106-SW1)上的一段话，意思是在“modern runtime”里，如果你修改了基类的成员变量布局（比如增加成员变量），子类不需要重新编译。这是一个巨大的改动，在文档中当做“modern runtime”最重要的修改点被提出来。

Cocoa Samurai的文章[Understanding the Objective-C Runtime](http://www.sealiesoftware.com/blog/archive/2009/01/27/objc_explain_Non-fragile_ivars.html)用几张图清晰地解释了Non Fragile ivars。以下借助他的图举例说明。

1) 用旧版OSX SDK编译的MyObject类成员变量布局是这样的，MyObject的成员变量依次排列在基类NSObject的成员后面。

![旧版本SDK的成员变量布局](http://quotation.github.io/images/20150521/nf1.png)

2) 当苹果发布新版本OSX SDK后，NSObject增加了两个成员变量。如果没有Non Fragile ivars特性，我们的代码将无法正常运行，因为MyObject类成员变量布局在编译时已经确定，有两个成员变量和基类的内存区域重叠了。此时，我们只能重新编译MyObject代码，程序才能在新版本系统上运行。如果更悲催一点，MyObject类是来自第三方提供的静态库，我们就只能眼巴巴等着库作者更新版本了。

![新版本SDK的成员变量布局](http://quotation.github.io/images/20150521/nf2.png)

3) Non Fragile ivars特性出场了。在程序启动后，runtime加载MyObject类的时候，通过计算基类的大小，runtime动态调整了MyObject类成员变量布局，把MyObject成员变量的位置向后移动8个字节。于是我们的程序无需编译，就能在新版本系统上运行。

![Runtime调整后的布局](http://quotation.github.io/images/20150521/nf3.png)

## 为什么Non Fragile ivars很关键

这个特性的重大意义在于，Objective-C的库从此具有了**“二进制兼容性”**。举例来说，你在项目里用了第三方提供的静态库SDK，包含一些`.h`和一个`.a`文件。当iOS SDK的版本从6升到了7，又从7升到了8时，你都不需要更新这个SDK。虽然iOS SDK版本升级时，苹果在UIView等基类中加入了更多的成员变量，但是以前发布的静态库SDK不需要重新编译还能正常使用。

幸好我们已经不在那个黑暗时代了，iOS从一开始就是用的modern runtime。可以想象以前的Mac开发者是如何忍受这个问题的：每次MacOS发布新版本，都要重新编译自己的程序，跟着发布新版本。

Non Fragile ivars的基本原理就是这样。听起来并没多么先进，很多编程语言都能做到，比如Java、C#，都有二进制兼容性。可是Objective-C毕竟不是“那么”动态的语言，Objective-C代码编译后是真正的native二进制，不是byte code。Objective-C程序也不是运行在VM上，底下只有个很小的runtime。这两点，Java、C#做不到。

那Non Fragile ivars是如何实现的呢？最关键的点是，**当成员变量布局调整后，静态编译的native程序怎么能找到变量的新偏移位置呢**？

## 如何寻址类成员变量

我们借助两个工具来探索答案：Objective-C runtime源码和LLVM。

首先去[http://opensource.apple.com/](http://opensource.apple.com/)下载runtime源码，在“OSX”分类里，当前最新版本是objc4-646.tar.gz。解压后打开Xcode工程，查找`struct objc_object`定义。

我们已经知道，每个Objective-C对象对应于`struct objc_object`，后者的`isa`指向类定义，即`struct objc_class`。

```
struct objc_object {
private:
    isa_t isa;
    //...
};

struct objc_class : objc_object {
    // Class ISA;
    Class superclass;
    cache_t cache;             // formerly cache pointer and vtable
    class_data_bits_t bits;    // class_rw_t * plus custom rr/alloc flags

    class_rw_t *data() { 
        return bits.data();
    }
    //...
};
```

沿着`objc_class`的`data()->ro->ivars`找下去，`struct ivar_list_t`是类所有成员变量的定义列表。

```
struct ivar_list_t {
    uint32_t entsize;
    uint32_t count;
    ivar_t first;
};
```

通过`first`字段，可以取得类里任意一个类成员变量的定义。

```
struct ivar_t {
    int32_t *offset;
    const char *name;
    const char *type;
    //...
};
```

我们看到了敏感词`offset`，这里一定是记录着这个成员变量在对象中的偏移位置喽。也就是说，runtime在发现基类大小变化时，通过修改`offset`，来更新子类成员变量的偏移值。那Objective-C中获取对象的第N个成员变量偏移位置就需要这样一长串代码：

```
*((&obj->isa.cls->data()->ro->ivars->first)[N]->offset)
```

这么多次寻址，看起来很可怕吧。每个成员变量都这样访问的话，性能一定无法接受。看看编译器到底是如何实现的吧，我们祭出LLVM。

## 真正的“如何寻址类成员变量”

LLVM在编译时，首先生成一种中间语言（IR，intermediate representation）；后续的一些优化、分析步骤都在IR上进行；最后再把IR转化成native可执行文件。由于IR比汇编可读性要好，我们利用IR来分析编译后的Objective-C程序是怎么执行的。

创建测试代码`test.m`。

```
#import <Foundation/Foundation.h>

// 特意选个大一点的基类，方便看
@interface MyClass : NSError {
@public
    int myInt;
}
@end

@implementation MyClass
@end

int main()
{
    MyClass *obj = [[MyClass alloc] init];
    obj->myInt = 42;
}
```

在命令行执行

```
clang -cc1 -S -emit-llvm -fblocks test.m
```

编译结果`test.ll`就是LLVM IR代码。推荐用Sublime Text安装LLVM插件，有语法高亮。可以看到IR格式比较繁琐，比汇编简单，比C复杂。这里就不写出IL的分析过程了，直接说结论。

编译后的`obj->myInt = 42`调用对应于如下的简单C语言代码。

```
int32_t g_ivar_MyClass_myInt = 40;  // 全局变量

*(int32_t *)((uint8_t *)obj + g_ivar_MyClass_myInt) = 42;
```

两条CPU指令搞定。第一条取`g_ivar_MyClass_myInt`的值，第二条寻址并赋值。根本不需要一长串的指针调用。LLVM为**每个类**的**每个成员变量**都分配了一个全局变量，用于存储该成员变量的偏移值。

这也就是为什么`ivar_t.offset`用**int指针**来存储偏移值，而不是直接放一个int的原因。在这个设计中，真正存放偏移值的地址是固定不变的，在编译时就确定了下来。因此才能用区区2条指令搞定动态布局的成员变量。

这就是Objective-C类成员变量的寻址方式。编译器通过这种方式，达到了灵活性和执行效率的完美平衡！

## Non Fragile ivars布局调整

有了这种灵活而高效的寻址方式，那runtime是在什么时候调整成员变量偏移值的呢？从IR中可以看到，在编译时，LLVM计算出基类NSError对象的大小为40字节，然后记录在MyClass的类定义中，如下是对应的C代码。在编译后的可执行程序中，写死了“40”这个魔术数字，记录了在此次编译时MyClass基类的大小。

```
class_ro_t class_ro_MyClass = {
    .instanceStart = 40,
    .instanceSize = 48,
    //...
}
```

现在假如苹果发布了OSX 11 SDK，NSError类大小增加到48字节。当我们的程序启动后，runtime加载MyClass类定义的时候，发现基类的真实大小和MyClass的`instanceStart`不相符，得知基类的大小发生了改变。于是runtime遍历MyClass的所有成员变量定义，将`offset`指向的值增加8。具体的实现代码在`runtime/objc-runtime-new.mm`的`moveIvars()`函数中。

并且，MyClass类定义的`instanceSize`也要增加8。这样runtime在创建MyClass对象的时候，能分配出正确大小的内存块。

## 为什么Objective-C类不能动态添加成员变量

这个问题的答案与Non Fragile ivars无关，但既然此文是关于类成员变量的，因此一并讨论。很多人在学到Category时都会有疑问，既然允许用Category给类增加方法和属性，那为什么不允许增加成员变量？

在[Objective-C提供的runtime函数](https://developer.apple.com/library/mac/documentation/Cocoa/Reference/ObjCRuntimeRef/index.html)中，确实有一个`class_addIvar()`函数用于给类添加成员变量，但是文档中特别说明：

> This function may only be called after objc_allocateClassPair and before objc_registerClassPair. Adding an instance variable to an existing class is not supported.

意思是说，这个函数只能在“构建一个类的过程中”调用。一旦完成类定义，就不能再添加成员变量了。经过编译的类在程序启动后就被runtime加载，没有机会调用addIvar。程序在运行时动态构建的类需要在调用`objc_registerClassPair`之后才可以被使用，同样没有机会再添加成员变量。

我们设想一下如果Objective-C允许动态增加成员变量，会发生什么事情。假设如下代码可以执行。

![成员变量布局](http://quotation.github.io/images/20150521/nf1.png)

```
MyObject *obj = [[MyObject alloc] init];

// 基类增加一个4字节的成员变量someVar
class_addIvar([NSObject class], "someVar", 4, ...);
// 基类增加方法someMethod，用到了someVar
class_addMethod([NSObject class], @selector(someMethod), ...);

// 调用someMethod，修改了someVar
[obj someMethod];

// 访问子类成员变量，会发生什么？
[obj->students length];
```

显然，这样做会带来严重问题，为基类动态增加成员变量会导致所有已创建出的子类实例都无法使用。那为什么runtime允许动态添加方法和属性，而不会引发问题呢？

因为方法和属性并不“属于”类实例，而成员变量“属于”类实例。我们所说的“类实例”概念，指的是一块内存区域，包含了isa指针和所有的成员变量。所以假如允许动态修改类成员变量布局，已经创建出的类实例就不符合类定义了，变成了无效对象。但方法定义是在`objc_class`中管理的，不管如何增删类方法，都不影响类实例的内存布局，已经创建出的类实例仍然可正常使用。

## 总结
Objective-C的“Non Fragile ivars”特性，以极低的运行时开销换取了程序的二进制兼容性。并且可执行文件仍然是目标平台上的native程序，不需要运行在VM上。实在是设计权衡取舍的典范。

