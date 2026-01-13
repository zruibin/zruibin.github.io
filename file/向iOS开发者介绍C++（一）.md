<!--BEGIN_DATA
{
    "create_date": "2014-05-05 23:18", 
    "modify_date": "2015-10-13 13:48", 
    "is_top": "0", 
    "summary": "向iOS开发者介绍C++（一）", 
    "tags": "iOS、C/C++", 
    "file_name": "向iOS开发者介绍C++（一）.md"
}
END_DATA-->

<p>
    <span style="font-family:&#39;Microsoft YaHei&#39;, 宋体, &#39;Myriad Pro&#39;, Lato, &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:14px;line-height:21px;background-color:#FFFFFF;">原文出处：&nbsp;</span> <a target="_blank" href="http://www.raywenderlich.com/62989/introduction-c-ios-developers-part-1">Matt Galloway</a> <span style="font-family:&#39;Microsoft YaHei&#39;, 宋体, &#39;Myriad Pro&#39;, Lato, &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:14px;line-height:21px;background-color:#FFFFFF;">&nbsp;&nbsp;&nbsp;译文出处：&nbsp;</span> <a target="_blank" href="http://www.cocoachina.com/applenews/devnews/2014/0415/8163.html">cocoachina</a> <span style="font-family:&#39;Microsoft YaHei&#39;, 宋体, &#39;Myriad Pro&#39;, Lato, &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:14px;line-height:21px;background-color:#FFFFFF;">。欢迎加入</span> <a target="_blank" href="http://www.jobbole.com/groups/6/">技术翻译小组</a> <span style="font-family:&#39;Microsoft YaHei&#39;, 宋体, &#39;Myriad Pro&#39;, Lato, &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:14px;line-height:21px;background-color:#FFFFFF;">。</span> <br/> <br/> 
</p> 

你已经精通了Objective-C，并且一直想学更酷的东西？看看这篇文章吧！本文将向iOS开发者介绍C++。稍后我会介绍，Objective-C能够无缝地使用C和C++代码。因此，基于以下几点原因，iOS开发者理解C++将会很有帮助：

1.有时候你想在应用中使用一个用C++编写的库。
2.你可能用C++写一部分应用程序的代码，以便更容易跨平台移植。
3. 了解其他语言通常能帮助你更好地理解编程。
这篇文章针对那些已经理解Objective-C的iOS开发者。前提是假定你已明白怎么写Objective-C代码，并熟悉基本的C概念，比如类型、指针、函数等。

准备好学C++了么？那么就马上开始吧！

开始：语言简史

C++和Objective-C有一些共源：它们都根植于老式的好用的C语言，都是C语言的“超集”。因此，你可以在这两种语言中使用C语言的一些功能，和每种语言的附加特性。

如果你熟悉Objective-C，那么你将能粗略地理解你所遇到的C++代码。例如，两种语言中的数值类型（int型、float型和char型）的表现方式和使用规则都是完全一样的。

Objective-C和C++都在C语言基础上添加了面向对象的特征。如果你不熟悉“面向对象”，那么你真正需要明白的是面向对象指数据是由对象表示的，而对象是类的实例。事实上，C++最初称为“C with Classes”，内在的涵义是使C++面向对象。

“那么有什么区别么？”我听到了你的疑问。最大的区别是面向对象特性的方法。在C++中，很多行为是发生在编译时，而在Objective-C中，大多数是发生在运行时。你可能已经修改了Objective-C的运行时间来实现了一个类似method swizzling的诡计，而在C++中这是不可能的。

C++也不像Objective-C一样有大量内省以及映射方法。在C++中，没有办法获得C++对象的类，而在Objective-C中你可以在一个实例中调用“类”方法。同样的，在C++中也没有相当于isMemberOfClass或者isKindOfClass的类。

以上对C++的粗略介绍显示了C++和Objective-C的历史和主要不同点。历史部分已经完成了，到我们继续学习一些C++特征的时间了。

C++ 类

在任何面向对象语言中，首先你要知道的是如何定义一个类。在Objective-C中，你通过创建一个头文件和一个执行文件来定义一个类，在C++中同样如此，语法也十分相似。

如下，是一个Objective-C类的例子：

```objective-c
// MyClass.h
 
#import <Foundation/Foundation.h>
 
@interface MyClass : NSObject
@end
 
// MyClass.m
 
#import “MyClass.h”
 
@implementation MyClass
@end
```
作为一个经验丰富的iOS开发者你应该很明白，但是看看同样用C++写的例子：

```objective-c
// MyClass.h
 
classMyClass {
};
 
// MyClass.cpp
 
#include “MyClass.h”
 
/* Nothing else in here */
```
这里有一些本质的区别。首先，C++中的实现文件中什么都没有，这是因为你并没有在类中声明任何的方法。同理，就像Objective-C，一个空类不需要@implemenation/@end模块。

在Objective-C中，几乎每个类都继承自NSObject。你可以创建自己的根类，这意味着你的类将没有任何superclass。但是，你可能从来没有这么做过，除非你只是为了运行时好玩儿。对比C++，正如上面的例子一样，创建一个没有超类的类是很普遍的。

另外一个微小的区别是#include和#import。Objective-C将#import预处理器指令添加到C。在C++中没有相同的，标准的C-style是使用#include。Objective-C中的#import是确保一个文件只被包含一次，但在C++中你必须自己检查。

类成员变量和成员函数

当然，有比声明一个类多得多的事情。正如，在Objective-C和C++中，你可以在类中添加实例变量和方法。或许，你知道在C++中这两个不是这样命名的，C++中通常称为成员变量和成员函数。

 注意：“method（实体方法）”这个术语通常不用于C++中，这个特性只用在Objective-C中。在Objective-C中，通过消息分派带调用“method（实体方法）”。另外，function（函数）通过一个静态的C-style函数被调用。稍后在这篇文章中我将更多的解释静态和动态。
那么接下来你要如何声明成员变量和成员函数呢？如下：

```objective-c
classMyClass {
    intx;
    inty;
    floatz;
 
    voidfoo();
    voidbar();
};
```
这里有三个成员变量和两个成员函数。但是在C++中这里要有更多，在C++中，你可以限定成员变量和成员函数的范围，并且可以声明它们是公开访问的还是私有访问的。这个可以用于限制什么代码可以访问每个变量或者函数。

思考下面这个例子：

```objective-c
classMyClass {
  public:
    intx;
    inty;
    voidfoo();
 
  private:
    floatz;
    voidbar();
}
```
这里，x,y和foo函数是公开访问。意思是可以在MyClass类的外部被调用。然而，z和bar函数是私有的。意味着只能在MyClass内部调用被调用。成员变量默认是私有的。

虽然这种区别确实存在于Objective-C中的实例变量中，但是很少使用。另外，在Objective-C中不太可能限制方法的调用范围。即使你只是在实现类内部声明一个方法而没有在接口中显示，技术上你还是可以外部调用这个方法。

Objective-C中的方法只约定为公开或私有。这就是为什么很多开发者选择给私有方法加前缀（例如“p_”前缀）来定义这个区别。这是为了和C++作比较，在C++中如果你试图从类的外部调用一个私有方法，编译器会抛出一个错误。

那么你要怎么使用类呢？和Objective-C非常相似，真的！你可以像下面这样创建一个实例：

```objective-c
MyClass m;
m.x = 10;
m.y = 20;
m.foo();
```
简单吧！这里创建了一个MyClass的实例，分别设x=10,y=20,然后调用foo函数。

实现类的成员函数

你已经看到了如何定义一个类接口，但是函数呢？事实证明，这个十分简单。有如下两种方法你可以定义。

第一个实现函数的方法是在类的实现文件中定义–.cpp文件。例如：

```objective-c
// MyClass.h
classMyClass {
    intx;
    inty;
    voidfoo();
};
 
// MyClass.cpp
#include “MyClass.h”
 
MyClass::foo() {
   // Do something
}
```
以上是第一个方法。在Objective-C中定义十分简单。注意MyClass::的用法，这就是你如何表明foo()函数已经作为MyClass类的一部分被实现了。

第二个实现函数的方法是你在Objective-C中不能做到的。在C++中，你可以直接在头文件中定义一个函数，如下：

```objective-c
// MyClass.h
classMyClass {
    intx;
    inty;
    voidfoo() {
        // Do something
    }
};
```
如果你只用过Objective-C，这看上去会很奇怪。确实奇怪，但是这种方法会十分有用。当一个函数以这种方式被声明时，编译器可以执行“内联”优化。这意味着当函数被调用时，整个函数代码在调用站点被内联编译而不是跳到一个新的代码块。

虽然内联可以使代码更快，但会增加编辑器代码的大小，因为如果函数被多次调用，代码将通过二进制复制。如果函数很大，或者被调用很多次，那么这可能会对二进制文件的大小产生重大的影响。由于很少的代码会在缓存中，这将会导致性能下降，这就意味着可能会有潜在的更多的缓存丢失。

我的目标是举例证明C++允许更多的灵活性。作为一个开发者，你需要去理解权衡并做决定。当然，唯一能真正明白哪种选择对你是正确的方法就是测试你的代码！

rgergrgerghh092435_1

命名空间

上面的例子介绍了一些你之前没有遇到过的新的语法–双冒号::，即指在C++中如何指代范围。双冒号用来告诉编译器应该在哪里可以找到foo函数。

下一次你会在使用命名空间的时候遇到双冒号。命名空间是分离代码的一种方式，以便减少命名冲突。

例如，你可能会在代码中定义一个叫Person的类，但是一个第三方库也可能命名一个叫Person的类。因此，在写C++代码时，你通常会将你的代码放到一个命名空间中来避免这些类型的命名冲突。

很容易做这个，套用以下命名空间声明即可：

```objective-c
namespaceMyNamespace {
    classPerson { … };
}
 
namespaceLibraryNamespace {
    classPerson { … };
}
```
现在，当使用任何一个Person类的实现时，你可以使用两个冒号消除歧义，如下：

```objective-c
MyNamespace::Person pOne;
LibraryNamespace::Person pTwo;
```
简单吧？

除了在类前加一个前缀来约定，在Objective-C中没有类似的命名空间。你确实这样命名类，对吧？如果不是这样命名的话，那就马上这样做吧！

 注意：在Objective-C中已经有很多命名空间的建议了。这样的方案可以在这里（链接）找到。我不知道在Objective-C中是否还能用到它们，但是我希望如此。
内存管理

哦，不……不是那个可怕的词吧！在任何语言中，内存管理都是需要理解的最重要的概念之一。Java基本上是用内存回收器来管理内存。Objective-C需要你明白引用计数以及ARC所扮演的角色。在C++中，嗯。。。C++又不同了。

首先，在C++中，要理解内存管理，你需要先了解堆和栈。即使你认为你知道这一点，我建议你继续往下阅读，或许你能略有收获。

栈是指用于运行应用程序的一个内存块。栈大小固定，并用于存储应用程序的代码的数据。栈基于puch/pop工作，当一个给定函数将数据压入栈中，当函数运行结束时，出栈的必须是等量的数据。因此，随着时间的推移，栈使用率不会增长。

堆同样也是运行应用程序的一个内存块。堆大小不固定，并且随着程序的运行而增长。应用程序倾向于使用堆来储存在函数范围外使用的数据。此外，大的数据单元通常会存储到堆中，因为存到栈中有可能会溢出。–记住，栈的大小是固定的。

以上是一个堆和栈原理的简述，以下为两者的C语言示例：

```objective-c
intstackInt = 5;
int*heapInt =malloc(sizeof(int));
*heapInt = 5;
free(heapInt);
```
这里，stackInt使用栈空间。程序返回后，用来存储“5”的这块内存就会自动释放。

然而，heapInt使用堆空间，在堆上调用malloc分配足够的空间来存储一个整数(int)。但是由于堆必须是由你分配，在用完数据后，开发者需要调用一个free函数来确保你没有内存泄露。

在Objective-C中，你只能在堆上创建对象。如果你试着在栈上创建对象，那么编译器就会报错。根本行不通。

思考下面的例子：

```objective-c
NSString stackString;
// Untitled 32.m:5:18: error: interface type cannot be statically allocated
//         NSString stackString;
//                  ^
//                  *
// 1 error generated.
```
这就是为什么在Objective-C代码上会看到星号，所有的对象都在堆上创建，并且所有对象都有指针。这在很大程度上归结为Objective-C处理内存管理。引用计数广泛应用于Objective-C中，对象需要在堆中以便它们的生命周期能被严格控制。

在C++中你既可以把数据存到栈中也可存到堆中。由开发者自己决定。然而，在C++中你也必须自己管理内存。数据放入栈中时内存将自动被处理；但用堆时，你必须自己管理内存，否则要面临内存泄露的风险。

C++中new和delete运算符

C++中引入一组关键词以帮助堆对象进行内存管理；他们分别用来创建和撤销堆中的对象。

创建对象：

```objective-c
Person *person =newPerson();
```
当你不用这个对象时，你就要撤销它：

```objective-c
deleteperson;
```
事实上，这同样适用于C++中标量类型：

```objective-c
int*x =newint();
*x = 5;
deletex;
```
你可以认为这些运算相当于Objective-C中的初始化和删除对象。在C++中初始化用的new Person()等同于Objective-C中的[[Person alloc] init]。

但是，在Objective-C中没有等同于delete的运算符。但是我想你已经意识到了，当引用计数归零时，运行时Objective-C对象的存储单元就会被释放。记住，C++不会自动处理引用计数，开发者调用对象完成后负责释放对象。

现在你对C++的内存管理有了大致了解，简言之，在C++中的内存管理要比Objective-C中的要复杂得多。你真的需要考虑下一步是怎样，并且要跟踪对象。
fherherheh415092751_1

访问栈和堆对象成员

你已经了解到，C++中既可以在栈上也可以在堆上创建对象。然而，这两种方法还有一点微妙但是很重要的区别，即访问成员变量和成员函数的方式稍有不同。

使用栈对象时，你需要点运算符(.)；使用堆对象时，你需要使用箭头操作符（–>）。如下：

```objective-c
Person stackPerson;
stackPerson.name = “Bob Smith”;///< Setting a member variable
stackPerson.doSomething();///< Calling a member function
 
Person *heapPerson =newPerson();
heapPerson->name = “Bob Smith”;///< Setting a member variable
heapPerson->doSomething();///< Calling a member function
```

区别很微妙，但是值得注意。

你还看到箭头操作符与this指针一起用，就像在Objective-C中的self指针一样，它用于类内部函数去访问当前的对象。

下面的C++例子展示了箭头操作符的用法：

```objective-c
Person::doSomething() {
    this->doSomethingElse();
}
```

这会引起一个常见的C++陷阱。在Objective-C中，你可以用空指针调用一个方法，你的应用程序仍会运行的很好：

```objective-c
myPerson = nil;
[myPerson doSomething]; // does nothing
```
然而，在C++中，如果你要用一个NULL指针调用一个方法或者访问一个实例，你的应用程序会崩溃：

```objective-c
myPerson = NULL;
myPerson->doSomething();// crash!
```
因此，你必须确保在C++中不要试图使用空指针。

引用

向函数传递对象时，你传递的是一个对象副本，而不是对象本身。例如，思考下面的C++代码：

```objective-c
voidchangeValue(intx) {
    x = 5;
}
 
// …
 
intx = 1;
changeValue(x);
// x still equals 1
```

很简单，没什么特别的。但是想一想当用一个函数做同样的事情，并且这个函数可以把一个对象作为一个参数。

```objective-c
class Foo {
  public:
    int x;
};
 
void changeValue(Foo foo) {
    foo.x = 5;
}
 
// …
 
Foo foo;
foo.x = 1;
changeValue(foo);
// foo.x still equals 1
```

这或许令你有些惊讶。仔细想想的话，和简单的int型例子没有不同。在将对象传递给函数之前，创建一个Foo object副本会发生什么情况？不过有时候确实需要传递一个实际对象。一种方法是改变函数指向对象的指针，而不是对象本身。但是无论什么时候调用函数都会产生附加代码。

对比上面列举的值传递的例子, C++定义了一个新的概念来允许通过引用来传递变量。这就意味着不需要创建对象副本。

利用引用传递可以很简单的改变你的调用，你可以在函数签名前简单地在变量前使用ampersand (&)即可，如下：

```objective-c
voidchangeValue(Foo &foo) {
    foo.x = 5;
}
 
// …
 
Foo foo;
foo.x = 1;
changeValue(foo);
// foo.x equals 5
```

它也适用于non-class变量:

```objective-c
voidchangeValue(int&x) {
    x = 5;
}
 
// …
 
intx = 1;
changeValue(x);
// x equals 5
```

引用传递很有用，并能显著提高性能。当创建一个对象副本成本相当高的时候引用传递更加有用，例如使用一个大型链表，创建副本意味着要对对象执行深度复制。

继承

一个面向对象的语言没有继承就不完整。C++当然不会违反这一趋势。思考下面的两个Objective-C类，其中一个类从另一个类继承：

```objective-c
@interface Person : NSObject
@end
 
@interface Employee : Person
@end
```

同样的事情可以用C++以很相似的方式表达：

```objective-c
classPerson {
};
 
classEmployee :publicPerson {
};
```

唯一的区别是在C++中要加一个public关键词。这里Employee类公共的继承Person类。这就意味着person类中的公共成员在Employee类中也是公共类型的。如果用private代替public，那么Person类中的公共成员在Employee类中就将变为私有的。关于这个话题的更多信息，我建议读一篇很棒的关于继承和存储说明符的文章。

以上是关于“继承“的简单部分，下面我们开始复杂的部分。与Objective-C不同的是，C++中允许多重继承，即一个类可以继承两个或以上基类。如果你除了Objective-C没有用过其他语言，那么这对你来说一定很陌生。

下面是C++中多重继承的例子：

```objective-c
classPlayer {
    voidplay();
};
 
classManager {
    voidmanage();
};
 
classPlayerManager :publicPlayer,publicManager {
};
```

在这个例子中，有两个基类，一个类继承这两个基类。意思是PlayerManager类可以访问每个基类的所有成员变量和函数。简单吧？我确定你已经意识到了，在Objective-C中没有这种方法。

然而，这并不完全正确，对吧？

精明的读者一定注意到在Objective-C中有类似的方法，即protocols(协议)。虽然跟多重继承不太相似，但是两种技术都为了解决同样的问题：提供一个机制来连接两个有相似用途的类。

Protocols（协议）有一个微小的区别，那就是协议没有实现，只是描述类必须遵循哪个接口。

在Objective-C中，上面的例子可被写成：

```objective-c
@protocol Player
- (void)play;
@end
 
@protocol Manager
- (void)manage;
@end
 
@interface Player : NSObject <Player>
@end
 
@interface Manager : NSObject <Manager>
@end
 
@interface PlayerManager : NSObject <Player, Manager>
@end
```

当然，这个细小的差别你是能想象的到的。在Objective-C中你要在PlayerManager类中执行play和manager。在C++中你只要在每个基类中实现该方法，然后PlayerManager类会自动的继承每个实现。

虽然，在实践中，多重继承有时会另人混淆和复杂化。对C++开发者来说，多重继承是一个危险的方法，除非绝对必要，开发者会尽量避免使用。

为什么呢？想一想如果两个基类用同样的名字去实现一个函数，并接受同样的参数的话，那么这两个基类就会有同样的原型。在这种情况下，你就需要消除歧义。例如，假设Player和Manager两个类都有一个命名为foo的函数。

你需要这样消除歧义：

```objective-c
PlayerManager p;
p.foo();         ///< Error! Which foo?
p.Player::foo(); ///< Call foo from Player
p.Manager::foo();///< Call foo from Manager
```

这绝对是可行的，但是这增加了混淆，而且最好避免复杂性。这由PlayerManager类的使用者决定。使用协议直接使PlayerManager类实现函数foo,因此这里只有一次实现，没有混淆。

下一步

第一部分中我们了解了C++的简史，如何声明类以及C++中内存管理是如何工作的。当然，关于C++还有很多需要学习的！

第二部分中，在查阅Objective-C和C++标准库之前，学到了更多的高级类的特征和模板。

与此同时，如果你在学C++的过程中有任何问题或者观点，请加入下面的讨论！