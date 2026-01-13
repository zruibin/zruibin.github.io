<!--BEGIN_DATA
{
    "create_date": "2014-05-13 14:44", 
    "modify_date": "2015-10-13 14:40", 
    "is_top": "0", 
    "summary": "Lua Install All Platform", 
    "tags": "其它", 
    "file_name": "Mac常用.md"
}
END_DATA-->

###Mac下PATH环境变量设置

如果没特殊说明,设置PATH的语法都为：

```
#中间用冒号隔开
export PATH=$PATH:<PATH 1>:<PATH 2>:<PATH 3>:------:<PATH N>
```

1.创建并以 TextEdit 的方式打开 ~/.bash_profile 文件

touch ~/.bash_profile;

open -t ~/.bash_profile


2.新增环境变量

```
export PATH="$HOME/.rbenv/bin:$PATH"
```

3.让以上所做的配置生效

```
source ~/.bash_profile
```

4.查看是否生效（有时可能需要关闭当前 Terminal 窗口重新开启一个）

```
echo $PATH
```

需要注意的一点（冒号乃环境变量的分隔符）：

```
$HOME/.rbenv/bin:$PATH 中的 $PATH 特指 /usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin
```

如果要添加多个环境变量的话，需按照如下的方式来书写：

```
export PATH="$PATH:/Applications/MacVim-snapshot-68"
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```

显示/隐藏Mac隐藏文件命令如下(注意其中的空格并且区分大小写)：
显示Mac隐藏文件的命令：defaults write com.apple.finder AppleShowAllFiles -bool true

隐藏Mac隐藏文件的命令：defaults write com.apple.finder AppleShowAllFiles -bool false

或者显示Mac隐藏文件的命令：defaults write com.apple.finder AppleShowAllFiles YES

隐藏Mac隐藏文件的命令：defaults write com.apple.finder AppleShowAllFiles NO

输完单击Enter键，退出终端，重新启动Finder就可以了

重启Finder：鼠标单击窗口左上角的苹果标志-->强制退出-->Finder-->重新启动打开终端,进到所在的目录,然后出入一下代码find . -name ".svn" | xargs rm -Rf

<br/>
<hr>
<br/>

###mac忘记密码的解决办法
开机， 启动时按“cmd+S”。这时，你会进入Single User Model，出现像DOS一样的提示符 #root>。请在#root>下 输入 (注意空格, 大小写)

　　fsck -y

　　mount -uaw /

　　rm /var/db/.AppleSetupDone

　　reboot

　　紧接着，苹果电脑会重启 ，并且在开机后出现新装机时的欢迎界面。你需要像第一次打开苹果电脑一样， 重新建立一个新的管理员账号(数据会保留)。当开机完毕之后，在新的管理员下请打开 系统预制 - 账户。打开最下面的锁， 当跳出密码框时， 输入新的管理员帐号密码。这时，你会看到出现至少两个账号，包括了新的管理员的帐号和你原来的帐号。你可以点中原来的账号, 选 密码 - 更改密码。注意，你不需要有原先的密码就直接可以设定新密码了。下一步就是点下面的登陆选项 (小房子)。选中自动以右边的身份登陆， 同时在下拉菜单中选你原先的账号。当重启或注销之后，你可以用新密码登陆原帐户了。当然，你也可以将刚刚新建的帐户删除。


<br/>
<hr>
<br/>

###CocoaPods pod install/pod update更新慢的问题

最近使用CocoaPods来添加第三方类库，无论是执行pod install还是pod update都卡在了Analyzing dependencies不动
原因在于当执行以上两个命令的时候会升级CocoaPods的spec仓库，加一个参数可以省略这一步，然后速度就会提升不少。加参数的命令如下：

```
pod install --verbose --no-repo-update
pod update --verbose --no-repo-update
```
```
命令行更新（安装）步骤
$ sudo gem update --system // 先更新gem，国内需要切换源
$ gem sources --remove  
$ gem sources -a  
$ gem sources -l
\*\*\* CURRENT SOURCES \*\*\*
  
$ sudo gem install cocoapods // 安装cocoapods
$ pod setup
```

<br/>
<hr>
<br/>

###item2是mac下非常好用的一款终端。但默认的配色实在不好用，经过一翻搜索终于找到了比较满意的。

配色（Terminal终端要变色也要设置第一步）
1.先要修改~/.bash_profile.代码如下

```
#enables colorin the terminal bash shell export
export CLICOLOR=1
 
#sets up thecolor scheme for list export
export LSCOLORS=gxfxcxdxbxegedabagacad
 
#sets up theprompt color (currently a green similar to linux terminal)
export PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;36m\]\w\[\033[00m\]\$ '
 
#enables colorfor iTerm
export TERM=xterm-256color
```

每个代码都有注释，第二三行设置终端名，也就是当前用户名、目录，并且变色处理，方便认别。

2.选择喜欢的配色方案。

 在Preferences->Profiles->Colors的load presets可以选择某个配色方案。也可以自己下载。在网站http://iterm2colorschemes.com/，几乎可以找到所有可用的配色方案。大家自己选择吧

大小写敏感
对于目录中经常有大写字母的情况，使用tab变得很麻烦。google之后找到了解决办法，取消大小写敏感。代码如下：

```
echo "set completion-ignore-case On" >> ~/.inputrc
```

快捷揵
这大概是item吸引用户的魅力所在了。

1.⌘ +数字在各 tab标签直接来回切换

2.选择即复制 + 鼠标中键粘贴，这个很实用

3.⌘ + f所查找的内容会被自动复制

4.⌘ + d 横着分屏 / ⌘ + shift + d 竖着分屏

5.⌘ + r = clear，而且只是换到新一屏，不会想 clear一样创建一个空屏

6.ctrl + u 清空当前行，无论光标在什么位置

7.输入开头命令后 按⌘ + ;会自动列出输入过的命令

8.⌘ + shift + h 会列出剪切板历史

9.可以在 Preferences > keys设置全局快捷键调出 iterm，这个也可以用过 Alfred实现

10.⌘← / ⌘→ 到一行命令最左边/最右边 ，这个功能同 C+a / C+e

11.⌥← /⌥→按单词前移/后移，相当与 C+f / C+b，其实这个功能在Iterm中已经预定义好了，⌥f /⌥b，看个人习惯了

再来些linux上也通用的快捷键：

C+a / C+e 这个几乎在哪都可以使用

C+p / !! 上一条命令

C+k 从光标处删至命令行尾 (本来 C+u是删至命令行首，但iterm中是删掉整行)

C+w A+d 从光标处删至字首/尾

C+h C+d 删掉光标前后的自负

C+y 粘贴至光标后

C+r 搜索命令历史，这个较常用

窗口说明

iterm2的窗口分为3个等级：window , tab , pane。请看下图。



此图下侧的是tab， 图中分左右的是pane。用上这两项，iterm2才真得是好用。

默认的话，新建pan是有快捷键的Cmd+d,切换pane有默认设置 Cmd+[ 和 Cmd+] .但是新建tab是没有默认快捷键的，这个用户可以自己设置，在Preferences->Keys。

笔者设新建tab的快捷键是Cmd+t 。

<br/>
<hr>
<br/>

###Macports


一.通过(.pkg)安装: Mac OS X Package (.pkg) Installer

访问官方网站: http://www.macports.org/install.php

http://distfiles.macports.org/MacPorts/MacPorts-2.1.1-10.7-Lion.pkg

二.通过(Source)安装MacPorts：Source Installation

1.cd到Downloads/目录下wget下载 MacPorts-2.1.1.tar.gz

输入: wget https://distfiles.macports.org/MacPorts/MacPorts-2.1.1.tar.gz

2.解压 MacPorts-2.1.1.tar.gz 输入: tar zxvf MacPorts-2.1.1.tar.gz (tar jxvf MacPorts2.1.1.tar.bz2)

3.cd到解压到的目录MacPorts-2.1.1输入: ./configure && make && sudo make install 安装

中间提示输入密码完成安装!

7.然后将/opt/local/bin和/opt/local/sbin添加到$PATH搜索路径中

编辑/etc/profile文件 $ sudo vim /etc/profile (特许编辑,强制保存退出 wq!)文件最后加上下面两句

```
export PATH=/opt/local/bin:$PATH
export PATH=/opt/local/sbin:$PATH
```

<br/>
<hr>
<br/>

###Homebrew

Homebrew是啥东东？apt-get和yum知道吧？Homebrew就相当于MacOS中的yum。

安装：终端中输入：

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

然后按提示输入管理员密码 如果发现安装失败，得到类似这样的错误信息：

```
error: unable to unlink old ‘Library/ENV/3.2.6′ (Permission denied)
```

那说明你遇到了权限问题，这样修复：

```
sudo chmod -R 775 /usr/local/Library
```
在安装完毕后，还需要执行这条：

```
sudo chmod -R 775 /usr/local/Cellar
```

如果安装软件后运行软件，发现提示command not found，查看一下/etc/paths文件，确保/usr/local/sbin有添加，我的paths文件内容如下：

```
/usr/local/bin
/usr/local/sbin
/usr/bin
/bin
/usr/sbin
/sbin
```

你ls -l /usr/local/sbin，会发现里面有你用brew安装过的软件的symlink：

```
lrwxr-xr-x  1 mac  admin  34  1 19 15:02 iftop -> ../Cellar/iftop/1.0pre4/sbin/iftop
lrwxr-xr-x  1 mac  admin  27  1 23 09:25 mtr -> ../Cellar/mtr/0.86/sbin/mtr
```

OS升级后，如果发现brew提示如下错误：

```
/usr/local/bin/brew: /usr/local/Library/brew.rb: /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/ruby: bad interpreter: No such file or directory
/usr/local/bin/brew: line 26: /usr/local/Library/brew.rb: Undefined error: 0
```

可以通过如下手段修复：

```
cd /usr/local/Library
git pull origin master


删除所有.svn目录

命令如下

 find . -type d -name ".svn"|xargs rm -rf

或者

find . -type d -iname ".svn" -exec rm -rf {} ";  