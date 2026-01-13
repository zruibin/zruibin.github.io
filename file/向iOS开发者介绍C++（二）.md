<!--BEGIN_DATA
{
    "create_date": "2014-05-05 23:23", 
    "modify_date": "2015-10-13 14:15", 
    "is_top": "0", 
    "summary": "向iOS开发者介绍C++（二）", 
    "tags": "iOS、C/C++", 
    "file_name": "向iOS开发者介绍C++（二）.md"
}
END_DATA-->

<p>
    <span style="font-family:&#39;Microsoft YaHei&#39;, 宋体, &#39;Myriad Pro&#39;, Lato, &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:14px;line-height:21px;background-color:#FFFFFF;">原文出处：&nbsp;</span> <a target="_blank" href="http://www.raywenderlich.com/62990/introduction-c-ios-developers-part-2">Matt Galloway</a> <span style="font-family:&#39;Microsoft YaHei&#39;, 宋体, &#39;Myriad Pro&#39;, Lato, &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:14px;line-height:21px;background-color:#FFFFFF;">&nbsp;&nbsp;&nbsp;译文出处：&nbsp;</span> <a target="_blank" href="http://www.cocoachina.com/applenews/devnews/2014/0417/8182.html">cocoachina</a> <span style="font-family:&#39;Microsoft YaHei&#39;, 宋体, &#39;Myriad Pro&#39;, Lato, &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:14px;line-height:21px;background-color:#FFFFFF;">。欢迎加入</span> <a target="_blank" href="http://www.jobbole.com/groups/6/">技术翻译小组</a> <span style="font-family:&#39;Microsoft YaHei&#39;, 宋体, &#39;Myriad Pro&#39;, Lato, &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:14px;line-height:21px;background-color:#FFFFFF;">。</span> <br/> <br/> 
</p>

欢迎回到向iOS开发者介绍C++系列的第二部分（<a href="http://blog.jobbole.com/66887/" target="_blank">向iOS开发者介绍C++（一）</a>） ！在第一部分，我们了解了类和内存管理。在第二部分部分我们将深入了解类以及其他有意思的特征。你将会了解到什么是“模板”以及标准模板库。

多态性

简单地说，多态性是一个重载子类中函数的概念。在Objective-C中，你可能已经做过很多次，例如，子类化UIViewController和重载viewDidLoad。
<a href="http://jbcdn2.b0.upaiyun.com/2014/05/7508ee1d44ce5a2784d2051062586f0e.jpg"><img alt="parfwefrot_lion-480x305" src="http://static.oschina.net/uploads/img/201405/05232311_45Ij.jpg"/></a>

C++的多态性比Objective-C的多态性更进一层。因此，当我解释这个强大的功能时要紧跟我的思路。

首先，以下为在类中重载成员函数的例子：

```objective-c
class Foo {
  public:
    int value() { return 5; }
};
 
class Bar : public Foo {
  public:
    int value() { return 10; }
};
```

但是，如果你这样做会发生什么呢：

```objective-c
Bar *b = new Bar();
Foo *f = (Foo*)b;
printf(“%i”, f->value());
// Output = 5
```

哇，这可不是你所期望的输出！我猜你认为输出值应该是10，对么？这就是C++和Objective-C最大的不同。

在Objective-C中，将子类指针转换成基类指针是无关紧要的。如果你向对象发消息（如调用函数），是运行时找到对象的类并调用最先派生的方法。因此，Objective-C中这种情况下，子类Bar中的方法被调用。这里凸显出了我在第一部分提到的编译时和运行时的不同。

在上面的例子中，编译器调用value()时，编译器的职责是计算出哪个函数需要被调用。由于f的类型是指向Foo类的指针，
它执行跳至Foo：value()的代码。编译器不知道f实际上是Bar类的指针。

在这个简单的例子中，你可以认为编译器能推断出f是Bar类的指针。但是想一想如果f确实是一个函数的输入值的话将会发生什么呢？这种情况下编译器将不会知道它是一个继承了Foo类的指针。

静态绑定和动态绑定
上面的例子很好的证明了C++和Objective-C最主要的区别–静态绑定和动态绑定。上面的例子是静态绑定的例子。编译器负责解决调用哪个函数，并且在编译完成后这个过程将被存储为二进制。在运行时不能改变这个过程。

这与Objective-C中方法调用形成了对比，这就是动态绑定的一个例子。运行时本身负责决定调用哪个函数。

动态绑定会使Objective-C很强大。你可能已经意识到了在运行时可以为类方法或者交换方法实现。这在静态绑定语言中是不能实现的，静态绑定是在编译时调用方法的。

但是，在C++中还不止这样！C++通常是静态绑定，但是也可以使用动态绑定机制，即“虚函数”。

虚函数和虚表

虚函数提供动态绑定机制。通过使用table lookup（每个类定义一个表），虚函数推迟到runtime时选择调用哪个函数。然而，跟静态绑定相比，这确实引起了运行时轻微的间接成本。除了调用函数外，table lookup是必须的。静态绑定时仅需要执行调用的函数。

使用虚函数很简单，只需要将关键词“virtual”添加到谈及的函数。例如上面的例子用虚函数方式写的话，如下：

```objective-c
class Foo {
  public:
    virtual int value() { return 5; }
};
 
class Bar : public Foo {
  public:
    virtual int value() { return 10; }
};
```

现在想一想运行同样的代码会发生什么：

```objective-c
Bar *b = new Bar();
Foo *f = (Foo*)b;
printf(“%i”, f->value());
// Output = 10
```

这正是前面所预期的输出值，对吧？因此在C++中可以用动态绑定，但是你需要根据遇到的情况决定是用静态绑定还是动态绑定。

在C++中这种类型的灵活性是司空见惯的，这使C++成为一种多范型的语言。Objective-C很大程度上迫使你进入严格的模式，尤其是用Cocoa框架时。而C++中，很多都是由开发者决定的。

现在开始了解虚拟函数是如何发挥作用的吧！

<a href="http://jbcdn2.b0.upaiyun.com/2014/05/46e5e3e18ec1bc64e837ae6f995d072a.png"><img alt="picrgregregerg3" src="http://static.oschina.net/uploads/img/201405/05232311_e1iF.png" /></a>

虚函数的内部功能

在你明白虚函数是怎样工作之前，你需要知道非虚函数是如何工作的。

想一想下面的代码：

```objective-c
MyClass a;
a.foo();
```

如果foo()是个非虚函数，那么编译器将会把它转换成代码，直接跳到MyClass类的foo()函数。

但是记住，这就是非虚函数的问题所在。回想之前的例子，如果这个类是多态的，那么编译器由于不知道变量的全部类型，也就不知道应该跳到哪个函数。这就需要一种方法在运行时查找到正确的函数。

要完成这种查找，虚函数要使用“virtual table”(也称“v-table”，虚表)。虚表是一个查找表来将函数映射到其实现上，并且每个类都访问一个表。当一个虚函数被调用时，编译器发出代码来检索对象的虚表从而查找到正确的函数。

回顾上面的例子来看看这是如何工作的：

```objective-c
class Foo {
  public:
    virtual int value() { return 5; }
};
 
class Bar : public Foo {
  public:
    virtual int value() { return 10; }
};
 
Bar *b = new Bar();
Foo *f = (Foo*)b;
printf(“%i”, f->value());
// Output = 10
```

当你创建一个类指针b和一个Bar类的实例，那么它的虚表将是Bar类的虚表。当b指针转换为Foo类的一个指针时，它并没有改变对象的内容，虚表仍然是Bar类的虚表而不是Foo类的。因此当查找v-table以调用value()时，结果是将调用Bar::value()。

构造函数和析构函数

每个对象在其生命周期中都要经历两个重要阶段：构造函数和析构函数。C++允许你同时控制这两个阶段。在Objective-C中与这两阶段相同的是初始化方法（例如，init或者以init开头的其他方法）和dealloc(释放内存)。

C++中定义构造函数时与类同名。正如在Objective-C中有多个初始化方法，你也可以定义多个构造函数。

例如，下面这个类中有两个不同的构造函数：

```objective-c
classFoo {
  private:
    intx;
 
  public:
    Foo() {
        x = 0;
    }
 
    Foo(intx) {
        this->x = x;
    }
};
```

这就是两个构造函数，一个是默认构造函数Foo()，另一个构造函数含有一个参数来设置成员变量。

如上例中，如果在构造函数中给成员变量初始化，有用少量代码实现的方法。不需要自己去设置成员变量的值，你可以用下面的语法：

```objective-c
classFoo {
  private:
    intx;
 
  public:
    Foo() : x(0) {
    }
 
    Foo(intx) : x(x) {
    }
};
```

通常来讲，如果仅仅是给成员变量赋值的话可以用上面这种方式。但是如果你需要用到逻辑或者调用其他函数的话，那么你就要实现函数主体。你也可以结合以上两种方式。

当用继承时，你需要调用父类的构造函数。在Objective-C中，你通常采用先调用父类指定的初始化程序的方法。

在C++中，你可以这样做：

```objective-c
classFoo {
  private:
    intx;
 
  public:
    Foo() : x(0) {
    }
 
    Foo(intx) : x(x) {
    }
};
 
classBar :publicFoo {
  private:
    inty;
 
  public:
    Bar() : Foo(), y(0) {
    }
 
    Bar(intx) : Foo(x), y(0) {
    }
 
    Bar(intx,inty) : Foo(x), y(y) {
    }
};
```

函数签名后，列表中的第一个元素表示对父类构造函数的调用。你可以调用任何一个你想要的超类构造函数。

C++没有一个指定的初始化程序。目前，没有办法调用同一个类的构造函数。在Objective-C中，有一个指定的初始化程序可以被其他初始化程序调用，并且只有这个指定的初始化程序去调用超类的指定初始化程序，例如：

```objective-c
@interface Foo : NSObject
@end
 
@implementation Foo
 
- (id)init {
    if (self = [super init]) { ///< Call to super’s designated initialiser
    }
    return self;
}
 
- (id)initWithFoo:(id)foo {
    if (self = [self init]) { ///< Call to self’s designated initialiser
        // …
    }
    return self;
}
 
- (id)initWithBar:(id)bar {
    if (self = [self init]) { ///< Call to self’s designated initialiser
        // …
    }
    return self;
}
 
@end
```

在C++中，虽然你可以调用父类的构造函数，但是目前调用自己的构造函数仍是不合法的。因此，下面的解决方案很常见：

```objective-c
classBar :publicFoo {
  private:
    inty;
    voidcommonInit() {
        // Perform common initialisation
    }
 
  public:
    Bar() : Foo() {
        this->commonInit();
    }
 
    Bar(inty) : Foo(), y(y) {
        this->commonInit();
    }
};
```

然而，这十分麻烦。为什么你不能用Bar(int y)调用Bar(),然后在Bar()中这样写“Bar::commonInit()”呢？毕竟，Objective-C中恰恰是这样写的。

2011年发布了最新版的C++标准：C++11。在这个更新的标准中确实可以这样做。目前仍有许多C++代码还没有按C++11标准来更新，所以知道这两种方法很重要。任何2011年前标准的C++代码都按以下这种方式：

```objective-c
classBar :publicFoo {
  private:
    inty;
 
  public:
    Bar() : Foo() {
        // Perform common initialisation
    }
 
    Bar(inty) : Bar() {
        this->y = y;
    }
};
```

这种方法唯一一个不足的地方是，你不能在同一个类中调用构造函数的同时设置一个成员变量。上面的例子中，成员变量y在构造函数主体中设置。

注意：在2011年C++11标准成为一个完整的标准，起初称为C++ 0x。意思是在2000年至2009年之间这项标准成熟的话，x可以替换为这一年的最后一个数字。然而比预期的时间要晚，因此以11为结尾！所有的现代编译器，包括clang，现在都支持C++11标准。

以上为构造函数，那么析构函数呢？当一个堆对象被删除或者一个栈函数溢出时会调用析构函数。在析构函数中你需要做的事情就是清理对象。

析构函数中不能有任何参数。同样，在Objective-C中dealloc也不需要任何参数。因此每个类中只有一个析构函数。

在类中定义析构函数时在函数名字前要加前缀–波浪号(~)。如下：

```objective-c
class Foo {
  public:
    ~Foo() {
        printf(“Foo destructor\n”);
    }
};
```

看一下当你的类被继承时，会发生什么：

```objective-c
class Bar : public Foo {
  public:
    ~Bar() {
        printf(“Bar destructor\n”);
    }
};
```

如果你不这样写的话，当通过Foo指针删除Bar类的一个实例的时候将会发生异常，如下：

```objective-c
Bar *b = new Bar();
Foo *f = (Foo*)b;
delete f;
// Output:
// Foo destructor
```

这样是错误的。删除的应该是Bar类的实例，但是为什么是去调用Foo类的析构函数呢？

回想一下,之前发生的同样的问题,你是使用虚函数解决的。这个正是同样的问题。编译器看到是一个Foo需要被删除，因为Foo的析构函数并不是虚函数，所以编译器认为要调用的是Foo的析构函数。

解决这个问题的办法就是将析构函数定义为虚函数，如下：

```objective-c
classFoo {
  public:
    virtual~Foo() {
        printf(“Foo destructor\n”);
    }
};
 
classBar :publicFoo {
  public:
    virtual~Bar() {
        printf(“Bar destructor\n”);
    }
};
 
Bar *b =newBar();
Foo *f = (Foo*)b;
deletef;
// Output:
// Bar destructor
// Foo destructor
```

这就接近了期望的结果,但最终结果不同于之前使用虚函数得到的结果。在这里,两个函数都被调用了。首先Bar的析构函数被调用,然后Foo的析构函数被调用。为什么呢？

这是因为析构函数比较特殊。由于Foo的析构函数是父类的析构函数，所以Bar的析构函数自动调用Foo的析构函数。

这正是所需要的，正如Objective-c中的ARC方法中，你调用的是父类的dealloc。

<a href="http://jbcdn2.b0.upaiyun.com/2014/05/ddd35eaa843900a1e83751c0e608da15.png"><img alt="pregregergrgwrgic4" src="http://static.oschina.net/uploads/img/201405/05232311_6AQ4.png" /></a>

你可能在想这个：你认为编译器会为你做这个事情，但是并不是在所有类中都是最佳方法。

例如，如果你没有从某个类继承呢？如果析构函数是虚函数，那么每次都要通过虚表来删除一个实例，或许这种间接方法并不是你需要的。C++中你可以自己做决定，另一个方法很强大，但是开发者必须清楚发生了什么。

 注意：除非你确定你不需要继承一个类，否则一定要定义析构函数为虚函数。
运算符重载

在Objective-C中没有运算符重载的概念，但是这并不复杂。

操作符是实体，如我们熟悉的+，-，*，/。例如，你可以用“+”运算符与标准常量（操作数）做如下运算：

```objective-c
intx = 5;
inty = x + 5;///< y = 10
```

运算符“+”在这里的作用显而易见，将x加上5然后返回一个值。或许这个还不够明显，如果以函数的形式就很清楚了：

```objective-c
intx = 5;
inty = add(x, 5);
```

在函数add()中，两个参数相加并返回一个值。

在C++中，在类中使用操作符时是可以定义功能函数的。这一功能很强大。当然，这也不是总能行得通的。例如，将两个Person类相加就无任何实际意义。

然而，这一特性很有用处。考虑下面的类：

```objective-c
classDoubleInt {
  private:
    intx;
    inty;
 
  public:
    DoubleInt(intx,inty) : x(x), y(y) {}
};
```

这样做可能更好一些：

```objective-c
DoubleInt a(1, 2);
DoubleInt b(3, 4);
DoubleInt c = a + b;
```

我们想要将DoubleInt(4, 6)的值赋值给变量c，即将两个DoubleInt的实例x和y相加，然后赋值给c。事实证明这很简单。你需要做的就是给DoubleInt类添加一个方法，即：

```objective-c
DoubleInt operator+(constDoubleInt &rhs) {
    returnDoubleInt(x + rhs.x, y + rhs.y);
}
```

函数operator+很特别。编译器将使用这个函数，当它看到“+”运算符任一侧的DoubleInt时。“+”运算符左边的对象将调用这个函数，将“+”运算符右边的对象作为参数进行传递。因此，经常命名参数为“rhs”,意思是“右边”。

由于使用实参的副本不仅没必要还可能会改变值，函数的参数将作为引用，可能会创建一个新的对象。此外，这个对象将是常量，这是因为在相加的过程中，对于“+”运算符的右边来讲这是非法的。

C++能做的不仅是这些。你可能不仅仅想把DoubleInt添加至DoubleInt。你可能想要给DoubleInt添加一个整数。这些都是可能实现的！

为实现此操作，你需要实现如下成员函数：

```objective-c
DoubleInt operator+(constint&rhs) {
    returnDoubleInt(x + rhs, y + rhs);
}
```

然后你可以这样做：

```objective-c
DoubleInt a(1, 2);
DoubleInt b = a + 10;
// b = DoubleInt(11, 12);
```

很有用吧！

除了加法运算，其他运算也可以这样做。你可以重载++, –, +=, -=, *, ->等等。这里就不一一列举了。如果想要对运算符重载做更多了解，你可以访问learncpp.com，这里有整个章节在介绍运算符重载。

模板

在C++中，模板很有意思。

你是否发现你经常会重复写相同的函数或者类，但只是函数或者类的类型不同呢？例如，交换两个值的函数：

```objective-c
voidswap(int&a,int&b) {
    inttemp = a;
    a = b;
    b = temp;
}
```

 注：这里是对参数做引用传递，以确保是对函数的实参作交换。如果两个参数是用值传递，那么所交换的值只是实参的副本。这个例子很好的说明了C++中引用好处。
上面的例子只适用于整数类型。如果是浮点数类型，那么你需要写另一个函数：

```objective-c
voidswap(float&a,float&b) {
    floattemp = a;
    a = b;
    b = temp;
}
```

如果你重复写函数的主体，这样很不明智。C++介绍一种语法可以有效的忽略变量的类型。你可以通过模板这个特性来实现这一功能。取代上面的两种方法，在C++中，你可以这样写：

```objective-c
template<typenameT>
voidswap(T a, T b) {
    T temp = a;
    a = b;
    b = temp;
}
```

因此，你的函数可以交换任何类型的参数。你可以用以下任一种方式来调用函数：

```objective-c
intix = 1, iy = 2;
swap(ix, iy);
 
floatfx = 3.141, iy = 2.901;
swap(fx, fy);
 
Person px(“Matt Galloway”), py(“Ray Wenderlich”);
swap(px, py);
```

但是，你在用模板的时候仍需仔细。只有在头文件中实现模板函数，这种方法才能起作用。这是由模板的编译方式决定的。使用模板函数时，如果函数类型不存在，编译器会根据类型实例化一个函数模板。

考虑到编译器需要知道模板函数的实现，你需要在头文件中定义一个实现，并且在使用的时候必须要包含这个头文件。

同理，如果要修改模板函数中的实现，所有用到这个函数的文件都需要重编译。相比之下，如果在实现文件中修改函数或者实现类成员函数，那么只有这个实现文件需要重编译。

因此，过度地使用模板会使应用程序很繁琐。但是正如C++中很多方法，模板的作用很大。

模板类

不仅仅有模板函数，还可以在整个类中使用模板。

假设你的类中有三个值，这三个值用来存储一些数据。首先，你想用整数类型，因此你要这样写：

```objective-c
classIntTriplet {
  private:
    inta, b, c;
 
  public:
    IntTriplet(inta,intb,intc) : a(a), b(b), c(c) {}
 
    intgetA() {returna; }
    intgetB() {returnb; }
    intgetC() {returnc; }
};
```

但是，你继续写程序时发现你需要三个浮点型数据。这是你又要写一个类，如下：

```objective-c
classFloatTriplet {
  private:
    floata, b, c;
 
  public:
    FloatTriplet(floata,floatb,floatc) : a(a), b(b), c(c) {}
 
    floatgetA() {returna; }
    floatgetB() {returnb; }
    floatgetC() {returnc; }
};
```

这里，模板就会很有用。与模板函数相同，可以在类中使用模板。语法是一样的。上面的两个类可以写成这样：

```objective-c
template<typenameT>
classTriplet {
  private:
    T a, b, c;
 
  public:
    Triplet(T a, T b, T c) : a(a), b(b), c(c) {}
 
    T getA() {returna; }
    T getB() {returnb; }
    T getC() {returnc; }
};
```

但是，用模板类需要做一些细微的改动。使用模板函数不会改变代码，这是因为参数类型允许模板推断需要做什么。然而，使用模板类时，你要告诉编译器你需要模板类使用什么类型。

幸运的是，这个很简单。用上面的模板类也很简单：

```objective-c
Triplet<int> intTriplet(1, 2, 3);
Triplet<float> floatTriplet(3.141, 2.901, 10.5);
Triplet<Person> personTriplet(Person(“Matt”), Person(“Ray”), Person(“Bob”));
```

很强大，对吧？

<a href="http://jbcdn2.b0.upaiyun.com/2014/05/e60be5ef685b10d6b1fb93793e6223af.png"><img alt="prgergrwegergic5" src="http://static.oschina.net/uploads/img/201405/05232311_1Lg1.png" /></a>

此外，模板函数和模板类并不局限于单个未知类型。三重态的类可以被扩展以支持任何三种类型，而不是每个值必须是同样的类型。

要做到这一点，只需要扩展提供更多类型的模板定义，如下：

```objective-c
template<typenameTA,typenameTB,typenameTC>
classTriplet {
  private:
    TA a;
    TB b;
    TC c;
 
  public:
    Triplet(TA a, TB b, TC c) : a(a), b(b), c(c) {}
 
    TA getA() {returna; }
    TB getB() {returnb; }
    TC getC() {returnc; }
};
```

以上模板中有三个不同类型，每个类型都在代码中的适当位置被使用。

使用这样的模板也很简单，如下所示:

1
Triplet<int,float, Person> mixedTriplet(1, 3.141, Person(“Matt”));
以上为模板的间接。接下来看看大量使用其特性的一个库–标准模板库

标准模板库（STL）

每个规范的编程语言都有一个标准库，这个标准库包含通用的数据结构、算法以及函数。在Objective-C中你有Foundation。其中，包含NSArray、NSDictionary等熟悉或者不熟悉的成员函数。在C++中，标准模板库（简称STL）包含这些标准代码。

之所以成为标准模板库，是因为在这个库中使用了大量的模板。

STL中有很多内容，要介绍所有需要很长时间，所以在这里我只介绍一些重要的。

容器

数组、字典和集合都是对象的容器。在Objective-C中，Foundation框架包含了大部分常用容器的实现。在C++中，STL包含了这些实现。实际上，STL所包含的的容器要比Foundation多一些。

在STL中有两点与NSArray不同。分别是vector（列表）和list（列表）。两个都可以存储对象的序列，但是每个容器都有自己的优点和缺点。在C++中，从所给的容器中选择你需要的很重要。

首先，看一看vector的用法：

```objective-c
#include <vector>
 
std::vector<int> v;
v.push_back(1);
v.push_back(2);
v.push_back(3);
v.push_back(4);
v.push_back(5);
```

 注意std::的用法，这是因为大部分STL位于命名空间内。STL将其所有的类放在自己的名为”std”的命名空间中以避免潜在的命名冲突。
上面的代码中，首先你创建一个vector来存放整型数据（int），然后五个整数被依次压入vector的栈顶。操作完成后，vector中将是从1到5的有序序列。

这里需要注意的是，正如Objective-C中，所有的容器都是可变的，没有可变或者不可变的变量。

访问一个vector的元素是这样完成的：

```objective-c
intfirst = v[1];
intoutOfBounds = v.at(100);
```

这两种方法都能有效地访问vector中的元素。第一种使用方括号的方法，这便是索引C语言数组的方法。Objective-C中的下标取值方法也是用这种方法索引NSArray。

上面例子中的第二行使用at()成员函数，和方括号功能相同，只是at()函数需要检查是否在vector范围内索引，超出范围的话会抛出异常。

vector被实现为一个单一的或连续的内存块。vector的空间大小等于所存储的对象的大小乘以vector中对象数（存储4字节或者8字节的整数取决于你使用的体系结构是32位还是64位的）。

向vector中添加元素是很昂贵的，因为一个新的内存块需要被分配给这个新的vector。然而，访问一个确定的索引很快，因为这仅仅是访问内存中的一个字

std::list与std::vector很相似。但是，list的实现方式稍稍有些不同。不是作为一个连续的内存块被实现而是作为一个双向链表被实现。这意味着，list中每个的元素都包含一个数据，一个指向前一个元素的指针和一个指向后一个元素的指针。

由于是双向链表，插入和删除操作很简单。然而，如果要访问list中的第n个元素，就需要从0到n去遍历。

综上，list和vector的用法很相似：

```objective-c
#include <list>
 
std::list<int> l;
l.push_back(1);
l.push_back(2);
l.push_back(3);
l.push_back(4);
l.push_back(5);
```

正如上面的vector例子，这将创建一个从1到5的有序序列。但是，在list中你不能使用方括号或者at()成员函数去访问一个指定元素。你需要用一个迭代器（iterators）去遍历list。

你可以这样遍历list中的每个元素：

```objective-c
std::list<int>::iterator i;
for(i = l.begin(); i != l.end(); i++) {
    intthisInt = *i;
    // Do something with thisInt
}
```

大多数容器类有迭代器（iterator）的概念。迭代器是一个对象,可以遍历并指向一个特定的元素。你可以通过增量或减量来控制迭代前移或者后移。

用迭代器在当前位置获得元素的值与使用解引用运算符（*）一样简单。

 注：在上面的代码中，有两个运算符重载的实例。i++是迭代器重载增量运算符（++），*i是重载解引用操作符（*）。STL中大量使用了这样的运算符重载。
除了vector（向量）和list（列表），C++中还有很多容器。都有不同的特征。例如Objective-C中的集合，C++中为std::set；Objective-C中的字典，C++中为std::map。C++中，另一个常用的容器是std::pair，其中只存储两个值。

Shared Pointer

回想一下内存管理，当在C++中使用堆对象是，你需要自己处理内存。没有引用计数。在C++中确实是这样。但是在C++ 11标准中，STL中添加了一个新类，这个类中添加了引用计数，称之为shared_ptr，意思是“shared pointer”。

Shared Pointer是一个对象，这个对象定义一个指针以便在underlying pointer中实现引用计数。这与在Objective-C中在ARC下使用指针是相同的。例如，以下例子展示了如何用智能指针来定义一个指针去指向一个整数：

```objective-c
std::shared_ptr<int> p1(newint(1));
std::shared_ptr<int> p2 = p1;
std::shared_ptr<int> p3 = p1;
```

运行这三行代码后，每个shared pointer的引用计数为3。当每个shared pointer被删除或者被释放后，引用指数减少。直到最后一个包含underlying pointer的shared pointer被删除后，底层指针被删除。

由于shared pointer本身就是栈对象，溢出时就会被删除。因此，shared pointer与Objective-C中的自动引用计数（ARC）下的对象指针的约束规则相同。

下面的例子为shared pointer创建和删除的全过程：

```objective-c
std::shared_ptr<int> p1(newint(1));///< Use count = 1
 
if(doSomething) {
    std::shared_ptr<int> p2 = p1;///< Use count = 2;
    // Do something with p2
}
 
// p2 has gone out of scope and destroyed, so use count = 1
 
p1.reset();
 
// p1 reset, so use count = 0
// The underlying int* is deleted
```

把p1分配给p2是将p1的副本分配给p2。记住当一个函数参数是按值传递的话，是将参数的副本传给了函数。这一点是很有用处的，因为如果你将一个shared pointer传给一个函数，传递给这个函数的是一个新的shared pointer。当然，在函数结束时就会发生越界，从而被删除。所以在函数周期中，underlying pointer的使用数量将会增加。这与在Objective-C中的自动引用计数（ARC）下的引用计数功能相同。

当然，你需要能够获得或者使用underlying pointer，有两种方式可以实现这一操作。重载解引用操作符（*）和箭头操作符（->）以使shared pointer的工作方式本质上与一个正常的指针相同。如下：

```objective-c
std::shared_ptr<Person> p1(newPerson(“Matt Galloway”));
 
Person *underlyingPointer = *p1;///< Grab the underlying pointer
 
p1->doADance();///< Make Matt dance
```

Shared Pointer很好地给C++引入了引用计数的技术。当然，shared pointer也添加了一些少量的开销，但是这个开销带来了很明显的好处，所以也是值得的。

Objective-C++

C++很好，但是跟Objective-C有什么关系呢？

通过用Objective-C++可以将Objective-C和C++结合起来。它并不是一个全新的语言，而是Objective-C和C++两者的结合。

通过两者的结合，你可以使用两者的语言特征。可以将C++的对象作为Objective-C的实例，反之亦然。如果在应用程序中使用C++库的话这将会很有用处。

要使编译器理解一个Objective-C++文件是很容易的。你需要做的只是将文件名从.m改为.mm。当你这样做的时候，编译器会考虑到这个文件的不同，并将允许你使用Objective-C++。

以下为如何在两者间使用对象的例子：

```objective-c
// Forward declare so that everything works below
@class ObjcClass;
class CppClass;
 
// C++ class with an Objective-C member variable
class CppClass {
  public:
    ObjcClass *objcClass;
};
 
// Objective-C class with a C++ object as a property
@interface ObjcClass : NSObject
@property (nonatomic, assign) std::shared_ptr<CppClass> cppClass;
@end
 
@implementation ObjcClass
@end
 
// Using the two classes above
std::shared_ptr<CppClass> cppClass(new CppClass());
ObjcClass *objcClass = [[ObjcClass alloc] init];
 
cppClass->objcClass = objcClass;
objcClass.cppClass = cppClass;
```

简单吧！注意这个属性被定义为assign,然而你不能用strong或者weak，因为这些对非OBjective-C对象类型没有意义。编译器不能“保留”或者“释放”一个C++对象类型，因为它并不是一个Objective-C对象。

assign的内存管理仍然是正确的，因为你使用了shared pointer。你可以使用raw pointer，但是你需要自己写一个setter来删除原来的实例并根据情况设置一个新的值。

 注：Objective-C++是有局限性的。C++的类不能继承Objective-C的类，反之亦然。异常处理也是需要注意的地方。现代编译器和运行时确实允许C++异常和Objective-C异常共存，但是仍需要注意。使用异常处理之前一定要阅读相关文档。
Objective-C++很有用处，因为很多好的库都是用C++写的。能够在iOS和Mac的应用程序上使用它是很有价值的。

需要注意的是，Objective-C++确实有它需要注意的地方。第一个需要注意的地方是内存管理。记住Objective-C的对象都是建立在堆上的，而C++的对象可以建立在栈上也可以是在堆上。如果Objective-C类的对象是建立在栈上的话会很奇怪。必须是在堆上，因为整个Objective-C对象都是建立在堆上的。

编译器通过自动在代码中添加alloc和dealloc来构造和析构C++栈对象以确保这种情况。在此过程中，编译器需要创建两个函数“.cxx_construct”和“.cxx_destruct”，这两个函数分别被alloc和delloc调用。在这写方法中，执行所有相关的C++处理是必要的。

 注：ARC实际上依托于“.cxx_destruct”，现在它为所有的Objective-C类创建了一个函数来写所有的自动消除代码。
这个处理所有基于栈的C++对象，但是你要记住任何基于堆的对象都需要在适当的情况下创建和销毁。你可以在指定的初始化程序中创建对象然后再dealloc中删除。

另一个在Objective-C++中需要注意的地方是减少对C++的依赖。这一点要尽量避免。要想明白这是为什么，看看下面这个使用Objective-C++的类。

```
// MyClass.h
#import <Foundation/Foundation.h>
#include <list>
 
@interface MyClass : NSObject
 
@property (nonatomic, assign) std::list<int> listOfIntegers;
 
@end
 
// MyClass.mm
#import “MyClass.h”
 
@implementation MyClass
// …
@end
```

MyClass类的实现文件必须是.mm文件，因为它是使用C++编写的。这没有错，但是想一想如果你想要使用MyCLass类的话会发生什么呢。你需要import MyClass.h，但是这样做你引入了一个使用C++编写的文件。所以即使其他的文件不需要用C++编写，也需要使用Objective-C++来进行编译。

因此，最好是在公共头文件中减少使用C++。你可以使用在实现文件中声明的私有属性或者实体变量实现这一目的。

下一步

C++是一个伟大的语言。它与Objective-C有相似的根源，但是它选择一种很不同的方式去编写程序。总之，学习C++可以很好的理解面向对象程序。而且C++能帮助你在objective – c代码做出更好的设计决策。我鼓励你去学习更多的C++知识并自己写程序。你可以在learncpp.com中找到很多好的资源。如果你有任何评论或者疑问或者C++问题，请留言。