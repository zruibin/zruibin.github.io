<!--BEGIN_DATA
{
    "create_date": "2015-04-14 14:30", 
    "modify_date": "2015-10-13 19:34", 
    "is_top": "0", 
    "summary": "iOS 简单的动画自定义方法（旋转、移动、闪烁等）与 如何让view只响应一个按钮 与 让自己开发的iOS App允许用户通过itunes共享文件", 
    "tags": "iOS", 
    "file_name": "iOS 简单的动画自定义方法（旋转、移动、闪烁等）与 如何让view只响应一个按钮 与 让自己开发的iOS App允许用户通过itunes共享文件.md"
}
END_DATA-->

<a href='http://www.cnblogs.com/kenshincui/p/3972100.html' target='blank'>iOS核心动画</a>


```
#define kDegreesToRadian(x) (M_PI * (x) / 180.0)
  
#define kRadianToDegrees(radian) (radian*180.0)/(M_PI)
  
- (void)viewDidLoad
{
    [superviewDidLoad];
    self.title = @"测试动画";
    self.view.backgroundColor = [UIColorlightGrayColor];
     
     
    myTest1 = [[UILabelalloc]initWithFrame:CGRectMake(10, 100, 60, 40)];
    myTest1.backgroundColor = [UIColorblueColor];
    myTest1.textAlignment = NSTextAlignmentCenter;
    myTest1.text = @"Test...";
    myTest1.textColor = [UIColorwhiteColor];
    [self.viewaddSubview:myTest1];
     
      //闪烁效果。
//    [myTest1.layer addAnimation:[self opacityForever_Animation:0.5] forKey:nil];
      ///移动的动画。
//    [myTest1.layer addAnimation:[self moveX:1.0f X:[NSNumber numberWithFloat:200.0f]] forKey:nil];
    //缩放效果。
//    [myTest1.layer addAnimation:[self scale:[NSNumber numberWithFloat:1.0f] orgin:[NSNumber numberWithFloat:3.0f] durTimes:2.0f Rep:MAXFLOAT] forKey:nil];
     //组合动画。
//    NSArray *myArray = [NSArray arrayWithObjects:[self opacityForever_Animation:0.5],[self moveX:1.0f X:[NSNumber numberWithFloat:200.0f]],[self scale:[NSNumber numberWithFloat:1.0f] orgin:[NSNumber numberWithFloat:3.0f] durTimes:2.0f Rep:MAXFLOAT], nil];
//    [myTest1.layer addAnimation:[self groupAnimation:myArray durTimes:3.0f Rep:MAXFLOAT] forKey:nil];
    //路径动画。
//    CGMutablePathRef myPah = CGPathCreateMutable();
//    CGPathMoveToPoint(myPah, nil,30, 77);
//    CGPathAddCurveToPoint(myPah, nil, 50, 50, 60, 200, 200, 200);//这里的是控制点。
//    [myTest1.layer addAnimation:[self keyframeAnimation:myPah durTimes:5 Rep:MAXFLOAT] forKey:nil];
    //旋转动画。
    [myTest1.layeraddAnimation:[selfrotation:2degree:kRadianToDegrees(90)direction:1repeatCount:MAXFLOAT] forKey:nil];
     
     
}
  
#pragma mark === 永久闪烁的动画 ======
-(CABasicACnimation *)opacityForever_Animation:(float)time
{
    CABasicAnimation *animation = [CABasicAnimationanimationWithKeyPath:@"opacity"];//必须写opacity才行。
    animation.fromValue = [NSNumbernumberWithFloat:1.0f];
    animation.toValue = [NSNumbernumberWithFloat:0.0f];//这是透明度。
    animation.autoreverses = YES;
    animation.duration = time;
    animation.repeatCount = MAXFLOAT;
    animation.removedOnCompletion = NO;
    animation.fillMode = kCAFillModeForwards;
     animation.timingFunction=[CAMediaTimingFunctionfunctionWithName:kCAMediaTimingFunctionEaseIn];///没有的话是均匀的动画。
    return animation;
}
  
#pragma mark =====横向、纵向移动===========
-(CABasicAnimation *)moveX:(float)time X:(NSNumber *)x
{
    CABasicAnimation *animation = [CABasicAnimationanimationWithKeyPath:@"transform.translation.x"];///.y的话就向下移动。
    animation.toValue = x;
    animation.duration = time;
    animation.removedOnCompletion = NO;//yes的话，又返回原位置了。
    animation.repeatCount = MAXFLOAT;
    animation.fillMode = kCAFillModeForwards;
    return animation;
}
  
#pragma mark =====缩放-=============
-(CABasicAnimation *)scale:(NSNumber *)Multiple orgin:(NSNumber *)orginMultiple durTimes:(float)time Rep:(float)repertTimes
{
    CABasicAnimation *animation = [CABasicAnimationanimationWithKeyPath:@"transform.scale"];
    animation.fromValue = Multiple;
    animation.toValue = orginMultiple;
    animation.autoreverses = YES;
    animation.repeatCount = repertTimes;
    animation.duration = time;//不设置时候的话，有一个默认的缩放时间.
    animation.removedOnCompletion = NO;
    animation.fillMode = kCAFillModeForwards;
    return  animation;
}
  
#pragma mark =====组合动画-=============
-(CAAnimationGroup *)groupAnimation:(NSArray *)animationAry durTimes:(float)time Rep:(float)repeatTimes
{
    CAAnimationGroup *animation = [CAAnimationGroupanimation];
    animation.animations = animationAry;
    animation.duration = time;
    animation.removedOnCompletion = NO;
    animation.repeatCount = repeatTimes;
    animation.fillMode = kCAFillModeForwards;
    return animation;
}
  
#pragma mark =====路径动画-=============
-(CAKeyframeAnimation *)keyframeAnimation:(CGMutablePathRef)path durTimes:(float)time Rep:(float)repeatTimes
{
    CAKeyframeAnimation *animation = [CAKeyframeAnimationanimationWithKeyPath:@"position"];
    animation.path = path;
    animation.removedOnCompletion = NO;
    animation.fillMode = kCAFillModeForwards;
    animation.timingFunction = [CAMediaTimingFunctionfunctionWithName:kCAMediaTimingFunctionEaseIn];
    animation.autoreverses = NO;
    animation.duration = time;
    animation.repeatCount = repeatTimes;
    return animation;
}
  
#pragma mark ====旋转动画======
-(CABasicAnimation *)rotation:(float)dur degree:(float)degree direction:(int)direction repeatCount:(int)repeatCount
{
    CATransform3D rotationTransform = CATransform3DMakeRotation(degree, 0, 0, direction);
    CABasicAnimation *animation = [CABasicAnimationanimationWithKeyPath:@"transform"];
    animation.toValue = [NSValue valueWithCATransform3D:rotationTransform];
    animation.duration  =  dur;
    animation.autoreverses = NO;
    animation.cumulative = NO;
    animation.fillMode = kCAFillModeForwards;
    animation.repeatCount = repeatCount;
    animation.delegate = self;
  
    return animation;
  
}

```

<br/><hr><br/>


###如何让view只响应一个按钮  

一些应用经常会在一个view上放多个按钮，比如登录页面，就会有注册与登录按钮。理论上讲注册和登录按钮是不能同时按下的，但是如果你同时按下这两个按钮，这两个东东都会显示响应高亮状态，其结果就不可预知了。这种情况经常会被测试童鞋当成bug如何让view只响应一个按钮 - 杨叫兽 - 青青子衿 悠悠我心。


其实UIView类属性有个exclusiveTouch属性，表示是否该view响应触摸是排他的。默认的设置是NO，即不排他。如果想让按钮排他响应，只需将按钮的exclusiveTouch设置为YES即可。

实际编程中我一般会在viewDidLoad方法中对self.view中的subview进行遍历，如果是按钮对象就将它的exclusiveTouch属性设为YES。

示例代码：

```
  for (UIView *subview in self.view.subviews) {
        if ([subview isKindOfClass:[UIButton class]]) {
            subview.exclusiveTouch = YES;
        }
    }
```

另外说明：手势识别会忽略exclusiveTouch设置。详见苹果官方例子：SimpleGestureRecognizers。


<br/><hr><br/>

###让自己开发的iOS App允许用户通过itunes共享文件

如果我们想在自己开发的应用中，支持这个服务，就需要在应用程序的配置文件也就是plist文件中

添加Application supports iTunes file sharing，设置为YES。
