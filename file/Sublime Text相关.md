<!--BEGIN_DATA
{
    "create_date": "2014-10-27 13:56", 
    "modify_date": "2015-10-13 17:45", 
    "is_top": "0", 
    "summary": "", 
    "tags": "其它、配置", 
    "file_name": "Sublime Text相关.md"
}
END_DATA-->

###sublime text2怎么修改字体

选择Preferences下的Setings-User，将如下代码粘贴至大括号里面

    "font_face": "Segoe UI Light",

    "font_size": 14.5

第一行意思是修改字体和加不加粗，带上bold代表加粗，去掉代表正常字体，第二行意思是修改字体大小。

然后保存即可，字体就会变了。


sublime text2 配置tab为4个空格

Preference-defalut:

【将Tab键自动替换为4个空格】

```
// The number of spaces a tab is considered equal to

“tab_size”: 4,

// Set to true to insert spaces when tab is pressed

“translate_tabs_to_spaces”: true,
```


<p style="color:red;">/Data/Packages 下各个目录中都有.sublime-build文件可以参考，User目录则为处定义的。另，cmd中第一个参数可以是全路径，也可以是命令行中的命令，如可以是D:/gwin_x86/bin/gcc.exe或gcc，命令行中必须有添加才行，否则为全路径！</p>

<br/><hr><br/>


1、安装包控制（Package Control）

打开Sublime Text 2，按快捷键 ctrl+` 或者点击 Tools → Command Palette 调出控制台Console；
将以下代码复制粘贴进命令行后回车：

```
import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
```
重新启动Sublime Text 2，如果在Preferences → Package Settings 中看到 Package Control 这一项，就说明安装成功了。

2、安装Alignment插件

对于喜欢整齐的玛民来说，这不失为一个省事的插件。该插件可以通过上面安装好的 Package Control 来安装：
按ctrl + shift + P调出命令面板；
输入 install 调出 Package Control：Install Package 选项，并回车；
输入Alignment，选中并按回车安装；
重启Sublime Text 2，选中文本并按ctrl + alt + a 就可以进行对齐操作了。

3、安装 Soda 主题

这里的主题不同于针对代码的 color scheme，而是针对Sublime Text 2该软件本身的主题，该主题也可以通过万能的 Package Control 来安装。

按ctrl + shift + P调出命令面板；

输入 install 调出 Package Control：Install Package 选项，并回车；

输入 theme soda 选中后回车即可安装；

安装完之后要激活主题，打开 Preferences → Global Settings – User，加上以下代码保存即可生效：

```
"theme": "Soda Light.sublime-theme" 或者 "theme" : "Soda Dark.sublime-theme"
```

4、安装cTags插件

首先，从Ctags官网下载压缩包下来，解压到电脑的某个地方，比如“C:\Program Files\ctags”，然后把cTags添加到系统变量里去：

在“我的电脑”右键属性 → 高级 → 环境变量 → 在“系统变量”里找到“Path”，点击“编辑” → 把“;C:\Program Files\ctags”（不包括双引号）复制到最后 → 最后一路“确定”保存。

然后通过 Package Control 来安装 cTags 插件：

按ctrl + shift + P调出命令面板；

输入 install 调出 Package Control：Install Package 选项，并回车；

输入 ctags 选中后回车即可安装。

安装完之后，在项目的当前目录下按ctrl + t, ctrl + r，会生成.tags的文件。当光标停留在某个函数上时，按快捷键 ctrl+t, ctrl+t就可以打开函数所在的文件，并跳转到相应的位置了。

PS：安装这个插件折腾了我蛮久，主要是不知道还要从ctags官网下载压缩包，以及修改系统的变量，后来还是一博友给我发的国外的参考资料才知道要这样配置的。刚开始知道这软件之所以没用是因为没有像eclipse可以追踪函数的功能，后来才知道可以通过安装cTags插件来实现。装上此功能后，就更喜欢用Sublime Text 2了。

5、jsFormat插件

格式化js：选中一段文本，control+alt+f。

6、DocBlockr

在JS函数上方输入/**，然后回车，doc就生成好了非常好用。

7、sublime-jslint

打开一个js文件，control+j，即可输出jsLint检查的结果。打开Packages目录，找到插件目录sublime-jslint，打开sublime-jslint.sublime-settings文件，可以修改jsLint配置，还可以配置文件保存时自动检查等，如：

{ // Path to the jslint jar. // Leave blank to use bundled jar. "jslint_jar": "",   // Options pass to jslint. // Jerry Qu注：全部可用配置参考这里，https://github.com/fbzhong/sublime-jslint/wiki/Available-jslint4java-options "jslint_options": "--encoding utf-8 --bitwise --browser --cap --css --devel --debug --evil --forin --fragment --on --sub --white --windows --sloppy",   // Ignore errors, regex. "ignore_errors": [ // "Expected an identifier and instead saw 'undefined' \(a reserved word\)" ],   // run jslint on save. "run_on_save": false,   // debug flag. "debug":false }

8、SideBarEnhancements

推荐通过 Package Control 安装 SideBarEnhancements 这个插件，可以大大加强在侧栏目录树中右键的选项

9、Zen Coding

10、jQuery Package for sublime Text

11、Clipboard History

12、Bracket Highlighter

13、GBK to UTF8

14、Git

<p><span style="color: rgb(255, 0, 0); font-size: 24px;">我用的插件</span></p>

<a href='https://github.com/kenwheeler/brogrammer-theme' target='blank'>https://github.com/kenwheeler/brogrammer-theme</a>

Package Control

CTags(函数跳转，要安装源码)

Alignment(对齐)

DocBlockr(注释，需在keys-User中改快捷键，内容复制Default的)

Sublime定位文件的功能：在已经打开的文件的代码中右键，点击Reveal in Side Bar


<p><span style="color: rgb(255, 0, 0); font-size: 24px;">主题</span></p>
Brogrammer

<a href='https://github.com/kenwheeler/brogrammer-theme' target='blank'>https://github.com/kenwheeler/brogrammer-theme</a>

安装方式按README来做即可


<p><span style="color: rgb(255, 0, 0); font-size: 24px;">我的通用设置</span></p>


```
{
	"color_scheme": "Packages/Theme - Brogrammer/brogrammer.tmTheme",
	"font_face": "Segoe UI Light",
	"font_size": 16,
	"ignored_packages":
	[
		"Vintage"
	],
	"tab_size": 4,
	"theme": "Brogrammer.sublime-theme",
	"translate_tabs_to_spaces": true,
	"bold_folder_labels": true,
	"show_encoding": true,
	"highlight_line": true
}

// 字体大小
"font_size": 17

// 高亮编辑中的那一行
"highlight_line": true

// 焦点丢失后自动保存
"save_on_focus_lost": true

// 显示当前文件的编码
"show_encoding": true

// 保存的时候把无用的空格去掉
"trim_trailing_white_space_on_save": true

// Tab转换
"tab_size": 2,
"translate_tabs_to_spaces": true

// 自动换行
"word_wrap": false

// 宽度指导线
"rulers": [80]

// 拼写检查
"spell_check": false

// 要不要滚过头
"scroll_past_end": true

// Vim模式
"ignored_packages": [
  "Vintage"
]

// 显示Tab、空格
"draw_white_space": "all"

// 加粗文件夹名称
"bold_folder_labels": true

// 显示全路径
"show_full_path": true

```

###自定义Build System


```
//mac node 
{
    "cmd": ["/usr/local/bin/node", "$file", "$file_base_name"],
    "working_dir": "${project_path:${folder}}",
    "selector": "*.js"
}
```


<br/><hr><br/>


###Sublime Text 2中的快捷键不完全翻译版本

<p><span style="color: rgb(255, 0, 0); font-family: 'Microsoft Yahei'; font-size: 20px; line-height: 20px;"><br></span></p><table><tbody><tr><th>快捷键</th><th>功能</th></tr><tr><td>ctrl+shift+n</td><td>打开新Sublime</td></tr><tr><td>ctrl+shift+w</td><td>关闭Sublime，关闭所有打开文件</td></tr><tr><td>ctrl+shift+t</td><td>重新打开最近关闭文件</td></tr><tr><td>ctrl+n</td><td>新建文件</td></tr><tr><td>ctrl+s</td><td>保存</td></tr><tr><td>ctrl+shift+s</td><td>另存为</td></tr><tr><td>ctrl+f4</td><td>关闭文件</td></tr><tr><td>ctrl+w</td><td>关闭</td></tr><tr><td>ctrl+k, ctrl+b</td><td>切换侧边栏显示状态</td></tr><tr><td>f11</td><td>切换全屏状态</td></tr><tr><td>shift+f11</td><td>免打扰模式状态切换</td></tr><tr><td>backspace</td><td>删除左侧</td></tr><tr><td>shift+backspace</td><td>左侧删除</td></tr><tr><td>ctrl+shift+backspace</td><td>左侧全部删除</td></tr><tr><td>delete</td><td>右侧删除</td></tr><tr><td>enter</td><td>插入</td></tr><tr><td>shift+enter</td><td>插入</td></tr><tr><td>ctrl+z</td><td>撤消</td></tr><tr><td>ctrl+shift+z</td><td>重做</td></tr><tr><td>ctrl+y</td><td>重做或重复</td></tr><tr><td>ctrl+u</td><td>软撤消</td></tr><tr><td>ctrl+shift+u</td><td>软重做</td></tr><tr><td>ctrl+shift+v</td><td>粘贴并格式化</td></tr><tr><td>shift+delete</td><td>剪切</td></tr><tr><td>ctrl+insert</td><td>拷贝</td></tr><tr><td>shift+insert</td><td>粘贴</td></tr><tr><td>ctrl+x</td><td>剪切</td></tr><tr><td>ctrl+c</td><td>拷贝</td></tr><tr><td>ctrl+v</td><td>粘贴</td></tr><tr><td>left</td><td>移动</td></tr><tr><td>right</td><td>移动</td></tr><tr><td>up</td><td>移动</td></tr><tr><td>down</td><td>移动</td></tr><tr><td>shift+left</td><td>移动并选择</td></tr><tr><td>shift+right</td><td>移动并选择</td></tr><tr><td>shift+up</td><td>移动并选择</td></tr><tr><td>shift+down</td><td>移动并选择</td></tr><tr><td>ctrl+left</td><td>按\w规则移动（跳跃）</td></tr><tr><td>ctrl+right</td><td>按\w规则移动（跳跃）</td></tr><tr><td>ctrl+shift+left</td><td>按\w规则移动并选择（跳跃）</td></tr><tr><td>ctrl+shift+right</td><td>按\w规则移动并选择（跳跃）</td></tr><tr><td>alt+left</td><td>按单词移动</td></tr><tr><td>alt+right</td><td>按单词移动</td></tr><tr><td>alt+shift+left</td><td>按单词移动并选择</td></tr><tr><td>alt+shift+right</td><td>按单词移动并选择</td></tr><tr><td>ctrl+alt+up</td><td>选择多行进行编辑</td></tr><tr><td>ctrl+alt+down</td><td>选择多行进行编辑</td></tr><tr><td>pageup</td><td>移动</td></tr><tr><td>pagedown</td><td>移动</td></tr><tr><td>shift+pageup</td><td>移动+选择</td></tr><tr><td>shift+pagedown</td><td>移动+选择</td></tr><tr><td>home</td><td>移动到行首</td></tr><tr><td>end</td><td>移动到行尾</td></tr><tr><td>shift+home</td><td>选择到行首</td></tr><tr><td>shift+end</td><td>选择到行尾</td></tr><tr><td>ctrl+home</td><td>移动到页首行头</td></tr><tr><td>ctrl+end</td><td>移动到页尾行尾</td></tr><tr><td>ctrl+shift+home</td><td>选择到页首行头</td></tr><tr><td>ctrl+shift+end</td><td>选择到页尾行尾</td></tr><tr><td>ctrl+up</td><td>滚动行</td></tr><tr><td>ctrl+down</td><td>滚动行</td></tr><tr><td>ctrl+pagedown</td><td>下一视图（视觉位置）</td></tr><tr><td>ctrl+pageup</td><td>前一视图</td></tr><tr><td>ctrl+tab</td><td>栈中下一视图（打开顺序）</td></tr><tr><td>ctrl+shift+tab</td><td>栈中前一视图</td></tr><tr><td>ctrl+a</td><td>全选</td></tr><tr><td>ctrl+shift+l</td><td>选择多行编辑</td></tr><tr><td>escape</td><td>单个选择</td></tr><tr><td>escape</td><td>清除字段</td></tr><tr><td>escape</td><td>清除字段</td></tr><tr><td>escape</td><td>隐藏面板</td></tr><tr><td>escape</td><td>hide overlay</td></tr><tr><td>escape</td><td>hide auto complete</td></tr><tr><td>tab</td><td>insert best completion</td></tr><tr><td>tab</td><td>insert best completion</td></tr><tr><td>tab</td><td>replace completion with next completion</td></tr><tr><td>tab</td><td>reindent</td></tr><tr><td>tab</td><td>indent</td></tr><tr><td>tab</td><td>next field</td></tr><tr><td>tab</td><td>commit completion</td></tr><tr><td>shift+tab</td><td>insert</td></tr><tr><td>shift+tab</td><td>unindent</td></tr><tr><td>shift+tab</td><td>unindent</td></tr><tr><td>shift+tab</td><td>unindent</td></tr><tr><td>shift+tab</td><td>prev field</td></tr><tr><td>ctrl+]</td><td>缩进</td></tr><tr><td>ctrl+[</td><td>不缩进</td></tr><tr><td>insert</td><td>toggle overwrite</td></tr><tr><td>ctrl+l</td><td>选择行，重复可依次增加选择下一行</td></tr><tr><td>ctrl+d</td><td>选择单词，重复可增加选择下一个相同的单词</td></tr><tr><td>ctrl+k, ctrl+d</td><td>find under expand skip</td></tr><tr><td>ctrl+shift+space</td><td>expand selection</td></tr><tr><td>ctrl+shift+m</td><td>expand selection</td></tr><tr><td>ctrl+m</td><td>跳转到对应括号</td></tr><tr><td>ctrl+shift+j</td><td>expand selection</td></tr><tr><td>ctrl+shift+a</td><td>expand selection</td></tr><tr><td>alt+.</td><td>close tag</td></tr><tr><td>ctrl+q</td><td>toggle record macro</td></tr><tr><td>ctrl+shift+q</td><td>run macro</td></tr><tr><td>ctrl+enter</td><td>run macro file</td></tr><tr><td>ctrl+shift+enter</td><td>在当前行前插入新行</td></tr><tr><td>enter</td><td>commit completion</td></tr><tr><td><span style="color: rgb(255, 0, 0);">ctrl+p</span></td><td><span style="color: rgb(255, 0, 0);">搜索项目中的文件</span></td></tr><tr><td><span style="color: rgb(255, 0, 0);">ctrl+shift+p</span></td><td><span style="color: rgb(255, 0, 0);">打开命令面板</span></td></tr><tr><td>ctrl+alt+p</td><td>prompt select project</td></tr><tr><td><span style="color: rgb(255, 0, 0);">ctrl+r</span></td><td><span style="color: rgb(255, 0, 0);">前往Method</span></td></tr><tr><td><span style="color: rgb(255, 0, 0);">ctrl+g</span></td><td><span style="color: rgb(255, 0, 0);">跳转到第几行</span></td></tr><tr><td>ctrl+;</td><td>show overlay</td></tr><tr><td>ctrl+i</td><td>show panel</td></tr><tr><td>ctrl+shift+i</td><td>show panel</td></tr><tr><td>ctrl+f</td><td>查找</td></tr><tr><td>ctrl+h</td><td>查找替换</td></tr><tr><td>ctrl+shift+h</td><td>查找替换下一个</td></tr><tr><td>f3</td><td>下一个匹配项</td></tr><tr><td>shift+f3</td><td>上一个匹配项</td></tr><tr><td>ctrl+f3</td><td>下一个匹配项</td></tr><tr><td>ctrl+shift+f3</td><td>find under prev</td></tr><tr><td>alt+f3</td><td>find all under</td></tr><tr><td>ctrl+e</td><td>slurp find string</td></tr><tr><td>ctrl+shift+e</td><td>slurp replace string</td></tr><tr><td>ctrl+shift+f</td><td>show panel</td></tr><tr><td>f4</td><td>next result</td></tr><tr><td>shift+f4</td><td>prev result</td></tr><tr><td>f6</td><td>toggle setting</td></tr><tr><td>ctrl+f6</td><td>next misspelling</td></tr><tr><td>ctrl+shift+f6</td><td>prev misspelling</td></tr><tr><td>ctrl+shift+up</td><td>swap line up</td></tr><tr><td>ctrl+shift+down</td><td>swap line down</td></tr><tr><td>ctrl+backspace</td><td>delete word</td></tr><tr><td>ctrl+shift+backspace</td><td>run macro file</td></tr><tr><td>ctrl+delete</td><td>delete word</td></tr><tr><td>ctrl+shift+delete</td><td>run macro file</td></tr><tr><td>ctrl+/</td><td>当前行注释状态切换</td></tr><tr><td>ctrl+shift+/</td><td>当前位置注释状态切换</td></tr><tr><td>ctrl+j</td><td>选择标签内容，将后继行附加到行尾</td></tr><tr><td>ctrl+shift+d</td><td>duplicate line</td></tr><tr><td>ctrl+`</td><td>show panel</td></tr><tr><td>ctrl+space</td><td>auto complete</td></tr><tr><td>ctrl+space</td><td>replace completion with auto complete</td></tr><tr><td>ctrl+alt+shift+p</td><td>show scope name</td></tr><tr><td>f7</td><td>build</td></tr><tr><td>ctrl+b</td><td>build</td></tr><tr><td>ctrl+shift+b</td><td>build</td></tr><tr><td>ctrl+break</td><td>exec</td></tr><tr><td>ctrl+t</td><td>transpose</td></tr><tr><td>f9</td><td>行排序</td></tr><tr><td>ctrl+f9</td><td>行排序</td></tr><tr><td>// Auto-pair quotes</td><td><br></td></tr><tr><td>\</td><td>insert snippet</td></tr><tr><td>\</td><td>insert snippet</td></tr><tr><td>\</td><td>move</td></tr><tr><td>backspace</td><td>run macro file</td></tr><tr><td>// Auto-pair single quotes</td><td><br></td></tr><tr><td>'</td><td>insert snippet</td></tr><tr><td>'</td><td>insert snippet</td></tr><tr><td>'</td><td>move</td></tr><tr><td>backspace</td><td>run macro file</td></tr><tr><td>// Auto-pair brackets</td><td><br></td></tr><tr><td>(</td><td>insert snippet</td></tr><tr><td>(</td><td>insert snippet</td></tr><tr><td>)</td><td>move</td></tr><tr><td>backspace</td><td>run macro file</td></tr><tr><td>// Auto-pair square brackets</td><td><br></td></tr><tr><td>[</td><td>insert snippet</td></tr><tr><td>[</td><td>insert snippet</td></tr><tr><td>]</td><td>move</td></tr><tr><td>backspace</td><td>run macro file</td></tr><tr><td>// Auto-pair curly brackets</td><td><br></td></tr><tr><td>{</td><td>insert snippet</td></tr><tr><td>{</td><td>insert snippet</td></tr><tr><td>}</td><td>move</td></tr><tr><td>backspace</td><td>run macro file</td></tr><tr><td>enter</td><td>run macro file</td></tr><tr><td>shift+enter</td><td>run macro file</td></tr><tr><td>ctrl+1</td><td>focus group</td></tr><tr><td>ctrl+2</td><td>focus group</td></tr><tr><td>ctrl+3</td><td>focus group</td></tr><tr><td>ctrl+4</td><td>focus group</td></tr><tr><td>ctrl+shift+1</td><td>move to group</td></tr><tr><td>ctrl+shift+2</td><td>move to group</td></tr><tr><td>ctrl+shift+3</td><td>move to group</td></tr><tr><td>ctrl+shift+4</td><td>move to group</td></tr><tr><td>ctrl+0</td><td>focus side bar</td></tr><tr><td>alt+1</td><td>select by index</td></tr><tr><td>alt+2</td><td>select by index</td></tr><tr><td>alt+3</td><td>select by index</td></tr><tr><td>alt+4</td><td>select by index</td></tr><tr><td>alt+5</td><td>select by index</td></tr><tr><td>alt+6</td><td>select by index</td></tr><tr><td>alt+7</td><td>select by index</td></tr><tr><td>alt+8</td><td>select by index</td></tr><tr><td>alt+9</td><td>select by index</td></tr><tr><td>alt+0</td><td>select by index</td></tr><tr><td>f2</td><td>next bookmark</td></tr><tr><td>shift+f2</td><td>prev bookmark</td></tr><tr><td>ctrl+f2</td><td>标记状态切换</td></tr><tr><td>ctrl+shift+f2</td><td>clear bookmarks</td></tr><tr><td>alt+f2</td><td>select all bookmarks</td></tr><tr><td>ctrl+shift+k</td><td>run macro file</td></tr><tr><td>alt+q</td><td>wrap lines</td></tr><tr><td>ctrl+k, ctrl+u</td><td>upper case</td></tr><tr><td>ctrl+k, ctrl+l</td><td>lower case</td></tr><tr><td>ctrl+k, ctrl+space</td><td>set mark</td></tr><tr><td>ctrl+k, ctrl+a</td><td>select to mark</td></tr><tr><td>ctrl+k, ctrl+w</td><td>delete to mark</td></tr><tr><td>ctrl+k, ctrl+x</td><td>swap with mark</td></tr><tr><td>ctrl+k, ctrl+y</td><td>yank</td></tr><tr><td>ctrl+k, ctrl+k</td><td>run macro file</td></tr><tr><td>ctrl+k, ctrl+backspace</td><td>run macro file</td></tr><tr><td>ctrl+k, ctrl+g</td><td>clear bookmarks</td></tr><tr><td>ctrl+k, ctrl+c</td><td>show at center</td></tr><tr><td>ctrl++</td><td>increase font size</td></tr><tr><td>ctrl+=</td><td>increase font size</td></tr><tr><td>ctrl+keypad plus</td><td>increase font size</td></tr><tr><td>ctrl+-</td><td>decrease font size</td></tr><tr><td>ctrl+keypad minus</td><td>decrease font size</td></tr><tr><td>alt+shift+w</td><td>insert snippet</td></tr><tr><td>ctrl+shift+[</td><td>折叠(代码)</td></tr><tr><td>ctrl+shift+]</td><td>不折叠</td></tr><tr><td>ctrl+k, ctrl+1</td><td>按层级折叠(代码），数字是层级数</td></tr><tr><td>ctrl+k, ctrl+2</td><td>按层级折叠(代码），数字是层级数</td></tr><tr><td>ctrl+k, ctrl+3</td><td>按层级折叠(代码），数字是层级数</td></tr><tr><td>ctrl+k, ctrl+4</td><td>按层级折叠(代码），数字是层级数</td></tr><tr><td>ctrl+k, ctrl+5</td><td>按层级折叠(代码），数字是层级数</td></tr><tr><td>ctrl+k, ctrl+6</td><td>按层级折叠(代码），数字是层级数</td></tr><tr><td>ctrl+k, ctrl+7</td><td>按层级折叠(代码），数字是层级数</td></tr><tr><td>ctrl+k, ctrl+8</td><td>按层级折叠(代码），数字是层级数</td></tr><tr><td>ctrl+k, ctrl+9</td><td>按层级折叠(代码），数字是层级数</td></tr><tr><td>ctrl+k, ctrl+0</td><td>unfold all</td></tr><tr><td>ctrl+k, ctrl+j</td><td>unfold all</td></tr><tr><td>ctrl+k, ctrl+t</td><td>fold tag attributes</td></tr><tr><td>context menu</td><td>context menu</td></tr><tr><td>alt+c</td><td>toggle case sensitive</td></tr><tr><td>alt+r</td><td>toggle regex</td></tr><tr><td>alt+w</td><td>toggle whole word</td></tr><tr><td>alt+a</td><td>toggle preserve case</td></tr><tr><td>// 查找面板的按键绑定</td><td><br></td></tr><tr><td>enter</td><td>向后查找</td></tr><tr><td>shift+enter</td><td>向前查找</td></tr><tr><td>alt+enter</td><td>查找全部</td></tr><tr><td>// 替换面板的按键绑定</td><td><br></td></tr><tr><td>enter</td><td>查找下一个</td></tr><tr><td>shift+enter</td><td>查找前一个</td></tr><tr><td>alt+enter</td><td>查找全部</td></tr><tr><td>ctrl+alt+enter</td><td>替换全部</td></tr><tr><td>// Incremental find panel key bindings</td><td><br></td></tr><tr><td>enter</td><td>hide panel</td></tr><tr><td>shift+enter</td><td>find prev</td></tr><tr><td>alt+enter</td><td>find all</td></tr></tbody></table>


<br/><hr><br/>


Build Systems
Build systems run external programs to process your project’s files and print captured output to the output panel. Ultimately, they call subprocess.Popen.
File Format

Build systems use JSON. Here’s an example build system:

```
{
    "cmd": ["python", "-u", "$file"],
    "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
    "selector": "source.python"
}
```
<h2>Options<a href="http://sublimetext.info/docs/en/reference/build_systems.html#options" rel="nofollow">¶</a></h2><ul><li><p><span style="background-color: transparent; font-weight: bold;">cmd</span></p></li><li><p style="line-height: 1.4em; margin-top: 0px !important;">Array containing the command to run and its desired arguments.</p><p style="line-height: 1.4em; margin-top: 0px; margin-bottom: 0px; font-weight: bold; padding: 0px;">Note</p><p style="line-height: 1.4em; margin-top: 0px; margin-bottom: 0px; padding: 0px;">Under Windows, GUIs are supressed.</p></li><li><p><span style="background-color: transparent; font-weight: bold;">file_regex</span></p></li><li><p>Optional. Regular expression to capture error output of&nbsp;<span style="background-color: transparent;">cmd</span>.</p></li><li><p><span style="background-color: transparent; font-weight: bold;">line_regex</span></p></li><li><p>Optional. If the&nbsp;<span style="background-color: transparent;">file_regex</span>&nbsp;doesn’t match on the current line, but there’s a&nbsp;<span style="background-color: transparent;">line_regex</span>&nbsp;specified, and it does match the current line, then walk backwards through the buffer until a line matching the file regex is found: use these two matches to determine the file and line to go to.</p></li><li><p><span style="background-color: transparent; font-weight: bold;">selector</span></p></li><li><p>Optional. Used when&nbsp;<strong>Tools | Build System | Automatic</strong>&nbsp;is set to&nbsp;<span style="background-color: transparent;">true</span>. Sublime Text uses this scope selector to find the appropriate build system for the active view.</p></li><li><p><span style="background-color: transparent; font-weight: bold;">working_dir</span></p></li><li><p>Optional. Directory to change the current directory to before running&nbsp;<span style="background-color: transparent;">cmd</span>.</p></li><li><p><span style="background-color: transparent; font-weight: bold;">encoding</span></p></li><li><p>Optional. Output encoding of&nbsp;<span style="background-color: transparent;">cmd</span>. Must be a valid python encoding. Defaults to&nbsp;<span style="background-color: transparent;">utf-8</span>.</p></li><li><p><span style="background-color: transparent; font-weight: bold;">target</span></p></li><li><p>Optional. Sublime Text command to run. Defaults to&nbsp;<span style="background-color: transparent;">exec</span>&nbsp;(<span style="background-color: transparent;">Packages/Default/exec.py</span>).</p></li><li><p><span style="background-color: transparent; font-weight: bold;">env</span></p></li><li><p>Optional. Dictionary of environment variables to be merged with the current process’ that will be passed to&nbsp;<span style="background-color: transparent;">cmd</span>.</p></li><li><p><span style="background-color: transparent; font-weight: bold;">shell</span></p></li><li><p>Optional. If&nbsp;<span style="background-color: transparent;">true</span>,&nbsp;<span style="background-color: transparent;">cmd</span>&nbsp;will be run through the shell (<span style="background-color: transparent;">cmd.exe</span>,&nbsp;<a href="http://sublimetext.info/docs/en/reference/build_systems.html#id1" rel="nofollow">``</a>bash``…).</p></li><li><p><span style="background-color: transparent; font-weight: bold;">path</span></p></li><li><p>Optional. This string will replace the current process’&nbsp;<span style="background-color: transparent;">PATH</span>&nbsp;before calling&nbsp;<span style="background-color: transparent;">cmd</span>. The old&nbsp;<span style="background-color: transparent;">PATH</span>&nbsp;value will be restored after that.</p></li></ul><h3>Capturing Error Output with&nbsp;<span style="background-color: transparent;">file_regex</span><a href="http://sublimetext.info/docs/en/reference/build_systems.html#capturing-error-output-with-file-regex" rel="nofollow"></a></h3><p style="line-height: 1.4em;">The&nbsp;<span style="background-color: transparent;">file_regex</span>&nbsp;option uses a Perl-style regular expression to capture up to four fields of error information from the build program’s output, namely:&nbsp;<em>file name</em>,&nbsp;<em>line number</em>,&nbsp;<em>column number</em>&nbsp;and&nbsp;<em>error message</em>. Use groups in the pattern to capture this information. The&nbsp;<em>file name</em>&nbsp;field and the&nbsp;<em>line number</em>&nbsp;field are required.</p><p style="line-height: 1.4em;">When error information is captured, you can navigate to error instances in your project’s files with&nbsp;<span style="background-color: transparent;">F4</span>&nbsp;and&nbsp;<span style="background-color: transparent;">Shift+F4</span>. If available, the captured&nbsp;<em>error message</em>&nbsp;will be displayed in the status bar.</p><h3>Platform-specific Options<a href="http://sublimetext.info/docs/en/reference/build_systems.html#platform-specific-options" rel="nofollow"></a></h3><p style="line-height: 1.4em;"><span style="background-color: transparent;">windows</span>,&nbsp;<span style="background-color: transparent;">osx</span>&nbsp;and&nbsp;<span style="background-color: transparent;">linux</span>&nbsp;are additional options which override any build system options for the corresponding platform only. Here’s an example:</p>

```
{
    "cmd": ["ant"],
    "file_regex": "^ *\\[javac\\] (.+):([0-9]+):() (.*)$",
    "working_dir": "${project_path:${folder}}",
    "selector": "source.java",
 
    "windows":
    {
        "cmd": ["ant.bat"]
    }
}
```

In this case, ant.bat will be executed under Windows, while for the other platforms ant will be used instead.

####Variables

```
$file                   The full path to the current file, e. g., C:\Files\Chapter1.txt.
$file_path          The directory of the current file, e. g., C:\Files.
$file_name          The name portion of the current file, e. g., Chapter1.txt.
$file_extension         The extension portion of the current file, e. g., txt.
$file_base_name         The name only portion of the current file, e. g., Document.
$packages           The full path to the Packages folder.
$project            The full path to the current project file.
$project_path           The directory of the current project file.
$project_name           The name portion of the current project file.
$project_extension  The extension portion of the current project file.
$project_base_name  The name only portion of the current project file.
```
Place Holders for Variables¶

Snippet style formatting can be used with these variables, for example:

${project_name:Default}
This will emit the name of the current project if there is one, otherwise Default.

${file/\.php/\.txt/}
This will emit the full path of the current file, replacing .php with .txt.

Running Build Systems

Select Tools | Build in the Sublime Text menu or press F7.

Troubleshooting Build Systems

External programs used in build systems need to be in your PATH. As a quick test, you can try to run them from the command line first and see whether they work. However, note that your shell’s PATH variable might differ to that seen by Sublime Text due to your shell’s profile. Also, note that you can use the path option in a .build-system to specify additional directories toPATH.



Sublime Text is currently the text editor of choice for a number of developers in the open-source community. It’s sophisticated, has powerful text selection and customization support and also includes a feature not used by many – its build system. In this post, I’d like to take you through the Sublime build system and share build scripts for working with many of the languages and tools we use today.


These will include scripts for Grunt, CoffeeScript, SASS and others.

###Introduction

Sublime Text build systems can be considered simplistic, but highly customizable. The basic idea is that each type of Build profile is powered by a “.sublime-build” file – a JSON representations of the commands, paths and configuration needed to build a project using a specific tool or set of tools.

Builds can be executed using a keyboard shortcut (Command+B on Mac is the default on Mac or F7 on Windows), via the Tools menu or when a file is saved. If a project is currently open, the build system we last selected (e.g grunt) will be remembered.

<img alt="" height="273" src="http://static.oschina.net/uploads/img/201410/27140446_OMed.png" title="Screen Shot 2012-08-17 at 2.33.01 PM" width="510" style="cursor: pointer;">

When Sublime is passed references to external tools/binaries via a “.sublime-build” files, it can execute these applications with any arguments or flags that may be necessary. It is also able to pipe back the output of calling any of these apps using the built-in console in Sublime. Effectively this allows us to easily build projects without the need to leave our editor.

<img alt="" height="214" src="http://static.oschina.net/uploads/img/201410/27140447_Jai1.png" title="Screen Shot 2012-08-17 at 2.36.42 PM" width="510" style="cursor: pointer;">


####Adding a custom Build System

Sublime populates its Tools/Build System menu based on the “.sublime-build” files stored in the Sublime “Packages” directory. Should one need to locate this, it can be found in “~/Library/Application Support/Sublime Text 2/Packages/User” (if using OS X) or the corresponding Packages/User directory on other platforms.

<img alt="" height="298" src="http://static.oschina.net/uploads/img/201410/27140448_RbDm.png" title="Screen Shot 2012-08-17 at 2.36.08 PM" width="510" style="cursor: pointer;">

A basic “.sublime-build” file could be represented in key/value form as follows:

```
{
    "cmd": ["command", "argument", "--flag"],
    "selector": ["source.js"],
    "path": "/usr/local/bin",
    "working_dir": "/projects/"
}
```
Keys supported include:

cmd - An array containing a command to run and its desired arguments and flags. Note that Sublime will search your PATH for any tools listed unless an absolute path has been used to point to them.

selector – An optional string used to locate the best builder to use for the current file scope. This is only relevant if Tools/Build System/Automatic is true.

path – An optional string that replaces your current process’s PATH before calling the commands listed.

working_dir – An optional string defining a directory to switch the current directory to prior to calling any commands.

shell - An optional boolean that defines whether commands should be run through the shell (e.g bash).

file_regex – An optional regular expression used to capture error output from commands.

For a comprehensive list of keys supported in Sublime build scripts, see the unofficial docs.

Build Variables:

In addition, Sublime supports variable substitutions in build files such as $file_path (for the path to the current file) and more. These include:

$file_path – the directory of the current file being viewed

$file_name - only the name portion of the current file (extension included)

$file_base_name - the name portion of the current file (extension excluded)

$project_path - the directory path to the current project

$project_name – the name portion of the current project

A complete list of substitutions supported is also available.

Grouping build tasks

Some developers also like to group together tasks within an external bash script (or equivalent). For example, here’s a simple git-ftp deploy script you can use with Sublime to commit and push your latest changes with git and then upload your latest files to FTP.

Example: Commit, Push And Upload To FTP

deployment.sh:

#!/bin/bash
git add . && git commit -m 'deployment' && git push && git ftp init -u username  -p password - ftp://host.example.com/public_html
deployment.sublime-build:

```
{
  "cmd": ["deployment"],
  "working_dir": "${project_path:${folder}}"
}
```
If you haven’t used git-ftp before, Alex Fluger has a solid article about using it that may be of interest.

Targeting Platforms:

Sublime build files also support specifying configuration data for specific platforms (namely, OS X, Windows and Linux). Targeting a platform can easily be done by specifying another element in our config with the name of the platform. e.g

```
{
    "cmd": ...
    ...
    "windows":
    {
        "cmd":  ...
    },
    "osx":
    {
            "cmd": ...
    },
    "linux":
    {
            "cmd": ...
    }
}
```
Build files for popular front-end tools

To help you get started, I’ve written a collection of “.sublime-build” files for some of the front-end tools I’m aware web developers are using these days below.



Most of these will function fine without the need to specify path, but if you run into an issue with paths, try including it to your config (e.g "path": "/usr/local/bin").

####grunt:

```
{
    "cmd": ["grunt", "--no-color"],
    "selector": ["source.js", "source.less", "source.json"]
}
```
Node Build Script:

```
{
    "cmd": ["h5bp", "--no-color"],
    "selector": ["source.js", "source.less", "source.json"]
}
```
####CoffeeScript:

```
{
    "cmd": ["coffee","-c", "$file"],
    "selector" : "source.coffee"
}
```
####SASS:

```
{
    "cmd": ["sass", "--watch", ".:."],
    "working_dir": "$file_path",
    "selector": ["source.scss", "source.sass"]
}
```
Whilst a more verbose version with automatic minification and watch config could be written:

```
{
    "cmd": ["sass", "--watch", "sass:stylesheets", "--style", "compressed"],
    "working_dir": "$project_path",
    "selector": ["source.scss", "source.sass"]
}
```

####LESS:

```
{
    "cmd": ["lessc", "-x", "$file", "$file_path/$file_base_name.css", "--verbose"],
    "shell" : true,
    "selector": "source.css.less"
}
```
####Stylus:

```
{
    "cmd": ["stylus", "$file"],
    "file_regex": ".",
    "selector": "source.stylus"
}
```
(a more comprehensive version of this can be found in the LESS-build-sublimeproject.)

####Jade:

```
{
   "cmd": ["cmd", "/c", "jade", "$file"],
   "selector": "source.jade"
}
```
####r.js (RequireJS Optimizer):

```
{
    "cmd": ["node", "r.js", "-o", "app.build.js"],
    "working_dir": "$project_path",
    "selector": "source.js"
}
```
####UglifyJS:

```
{
   "cmd": [ "node", "uglifyjs", "-o", "${file_path}/${file_base_name}.min.js", "$file"],
   "selector": "source.js"
}
```
####Node (just passing in directly):

```
{
     "cmd": ["node", "$file"],
     "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
     "selector": "source.js"
}
```
####Pandoc (Markdown to HTML):

```
{
    "cmd": ["pandoc", "-S", "-s", "-f", "markdown", "-t", "html", "-o", "$file_base_name.html", "$file"],
    "selector": "text.html.markdown"
}
```
(and when it’s released, Yeoman):

```
{
     "cmd": ["yeoman", "build", "--no-color"],
     "selector": ["source.js", "source.scss", "source.sass", "source.html"]
}
```
####JSHint:

I imagine most web developers would want to run JSHint from within a broader build process, but if you’d also like to run it standalone via a Sublime build file, the sublime-jshint package has a build file that will work fine on both OS X and Windows.

Build files for specific programming languages

I also thought that while we were looking at build files, it would be useful to demonstrate how these can be used to build/compile with some popular programming languages. These may differ to those included with Sublime by default, but are useful for reference:

####Ruby (using RVM):

```
{
    "cmd": ["~/.rvm/bin/rvm-auto-ruby", "$file"],
    "file_regex": "^(...*?):([0-9]*):?([0-9]*)",
    "selector": "source.ruby"
}
```
####Python:

```
{
    "cmd": ["python", "-u", "$file"],
    "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
    "selector": "source.python"
}
```
####PHP:

```
{
    "cmd": ["/usr/bin/php", "-l", "$file"], <- Couldn't just use "php" ?
    "file_regex": "^Parse error: .* in (.*?) on line ([0-9]*)",
    "selector": "source.php"
}
```
####Java:

```
{
    "cmd": ["javac", "$file_name", "&&", "java", "$file_base_name"],
    "working_dir": "${project_path:${folder}}",
    "selector": "source.java",
    "shell": true
}
```
####.Net (Windows):

```
{
    "cmd": ["%WINDIR%\\Microsoft.NET\\Framework\\v4.0.30319\\msbuild", "${project_base_name}.sln"],
    "shell": true,
    "working_dir": "${project_path:${folder}}"
}
```
####C:

```
{
    "cmd": ["make && ./a.out"],
    "path": "/usr/bin:/usr/local/bin:...",
    "shell": true
}
```
####C++ (via g++):

(Note that we’re also able to specify OS-specific configurations too, as in the below):

```
{
    "cmd": ["g++", "$file", "-o", "$file_base_name", "-I/usr/local/include"],
    "selector": "source.c++",
    "windows": {
       "cmd": ["cl", "/Fo${file_path}", "/O2", "$file"]
    }
}
```
####Haskell:

```
{
    "cmd": ["runhaskell", "$file"],
    "file_regex": "^(...*?):([0-9]*):?([0-9]*)",
    "selector": "source.haskell"
}
```
Conclusions

Sublime build systems are awesome and can help you avoid the need to manually switch between your editor and external build tools regularly. As you’ve hopefully now learned, putting together your own custom build systems is a straight-forward process and I’d recommend trying it out if Sublime happens to be your editor of choice.








