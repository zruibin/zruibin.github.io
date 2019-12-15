#how to use

[sorces code](http://ensure.codeplex.com/)

[ensure - Ensure JavaScripts/HTML/CSS are loaded on-demand when needed](http://www.codeproject.com/Articles/26797/ensure-Ensure-JavaScripts-HTML-CSS-are-loaded-on-d)


```
ensure( {js:"some.js", html:"some.html", css: "some.css"}, function(){ ...do your work... } );
```


##Example

```
The following button loads a Javascript on-demand and calls a function:

<input type="button" value="Click me" onclick="ensure({js:'Components/SomeJS.js'}, function(){ SomeJS(); })" />

Click me
Some.js defines a function named SomeJS like this:

function SomeJS() { alert("Hi I am from SomeJS"); }
```

```
<input type="button" value="Load Html, CSS on-demand" onclick="ensure 
({html:'Components/HtmlSnippet.htm',
css:'Components/HtmlSnippet.css', 
parent:'resultDiv'}, 
function(){ 
document.getElementById('clickMe').
onclick = function() 
{ alert('Clicked'); } })"
/>
```

```
<input type="button" value="Show me the UI" onclick="showPopup()" />

Show me the UI
Here, showPopup() is defined as:

function showPopup()
{
ensure({
js: 'Components/BlockUI.js', 
html: ['Components/BlockUI.html',
'Components/Popup.aspx'], 
css: 'Components/Popup.css'
}, 
function()
{
BlockUI.show();
var popup = document.getElementById('Popup');
if( null == popup ) alert('Popup is not loaded!');
else popup.style.display = 'block';
});
} 
```