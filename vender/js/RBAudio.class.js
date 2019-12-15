/**
  * RBAudio.class.js
  * zruibin.cc
  *
  * Created by Ruibin.Chow on 15/10/17.
  * Copyright (c) 2015年 Ruibin.Chow. All rights reserved.
  */
 
//http://jingyan.baidu.com/article/d5c4b52bc2f71dda570dc575.html
//http://www.cnblogs.com/jikey/archive/2011/05/13/2045005.html
//http://www.jb51.net/article/21197.htm

function RBAudio(audioId) {

    function $(ele){
        //http://www.runoob.com/jsref/met-document-queryselector.html
        return document.querySelector(ele);
        // return document.getElementById(ele);
    }

    /*------------------------------ 私有属性 -----------------------------*/

    var _playList = [];
    var _audio = null;
    var _playIndex = 0;
    var __current_time_Id = '';
    var _musicMode = 'list'; //list:列表循环;  shuffle:随机播放; repeat:单曲循环
    var _isPause = false;
    var _callback = function(){};

    //initialize；自定义构造方法
    function __init__(audioId) 
    { 
        if ($(audioId) == null) {
            console.warn('audio is null...');
            _audio = document.createElement("audio");
        } else {
            _audio = $(audioId);
        }
    }
    __init__(audioId);

    this.show = function() 
    {
        console.log(_playList, _audio);
        console.log(_playList.length);
    };

    /*------------------------------ 行为公共方法 -----------------------------*/

    this.play = function() 
    {
        if (_isPause == true) {
            _isPause = false;
            _audio.play();
            // return ;
        }
        if (_audio.paused == false) {
            console.log('already play()....');
        } else {
            initAudio();
        }
    }

    this.pause = function() 
    {
        _audio.pause();
        _isPause = true;
    }

    this.playNext = function() 
    {
        playMusicMode('next');
    }

    this.playPrev = function() 
    {
        playMusicMode('prev');
    }

    //调整是否为静音
    this.setAudioMuted = function() 
    {
        _audio.muted = !_audio.muted;
    }

    //返回已缓冲的音频的长度，未完善
    this.getAudioBufferedLength = function() 
    {
        var bufferIndex = _audio.buffered.length;
        console.log(_audio.duration);
        if (bufferIndex > 0 && _audio.buffered != undefined) {
                var bufferValue = _audio.buffered.end(bufferIndex - 1) / _audio.duration * 324;
                console.log(bufferIndex);
                return bufferValue;
        };
        return 0;
    }

    //返回当前音频的总时长，以秒为单位
    this.getAudioDuration = function()
    {
        return _audio.duration;
    }

    //设置当前进度的显示id
    this.setCurrentTimeTagId = function(tagId) 
    {
         _current_time_Id = $(tagId);
    }

    this.getAudioCurrentTime = function()
    {
        return _audio.currentTime;
    }

    this.setAudioCurrentTime = function(value)
    {
        if (value > 0 && value < _audio.duration) {
            _audio.currentTime = value;
        }
        console.log('CurrentTime', this.getAudioCurrentTime());
    }

    this.setCallBack = function(callback_) 
    {
        _callback = callback_;
    }

    this.isPlaying = function()
    {
        return !_isPause;
    }

    /*------------------------------ setter and getter -----------------------------*/

    this.setPlayList = function(list) 
    {
        _playList = list;
    }

    this.getPlayList = function()
    {
        return _playList;
    }

    //音量调整，value: 0~1
    this.setVolumeValue = function(value)
    {
        if (value < 0) { 
            value = 0 
        } else if (value > 1) {
            value = 1;
        }
        _audio.volume = value;
    }

    //获得当前音量
    this.getVolumeValue = function() 
    {
        return _audio.volume;
    }

    //设置播放模式
    this.setMusicMode = function(mode) 
    {
        _musicMode = mode;
    }

    //获得当前的播放模式
    this.getMusicMode = function() 
    {
        return _musicMode;
    }

    //设置播放第几首
    this.setPlayIndex = function(index) 
    {
        _playIndex = index;
    }

    //获得当前播放的列表里的下标
    this.getPlayIndex = function() 
    {
        return _playIndex;
    }

    //获得当前播放的详细内容
    this.getCurrentInfo = function()
    {
        return _playIndex[_playIndex];
    }

    /*------------------------------ 私有方法 -----------------------------*/

    function initAudio () 
    {
            /*playList格式未定*/
            _audio.setAttribute('src',_playList[_playIndex]); 
            _audio.autoplay = 'autoplay';
            _audio.load();
            console.log(_audio);
            _audio.play();
    }
    
    function playMusicMode(action) 
    {
        _isPause = false;
        var musicNum = _playList.length;
        var index = _playIndex;

        console.log('this---',this);
        console.log(musicNum, _playIndex, _musicMode);

        //列表循环
        if (_musicMode == 'list' ) {
            if (action == 'prev') {
                if (index == 0) { //如果是第一首歌，跳到最后一首
                    index = musicNum - 1;
                }
                else{
                    index -= 1;
                }
            }
            else if (action == 'next' || action == 'ended') {
                if (index == musicNum - 1) {//如果是最后一首歌，跳到第一首
                    index = 0;
                }
                else{
                    index += 1;
                }
            };
        };

        //随机播放
        if (_musicMode == 'shuffle') {
            var randomIndex = parseInt(musicNum * Math.random());
            index = randomIndex + 1;
            if (index == musicIndex - 1) {//下一首和当前相同，跳到下一首
                index += 1;
            };
        };

        //单曲循环
        if (_musicMode == 'repeat') {
            if (action == 'prev') {
                if (index == 0) { //如果是第一首歌，跳到最后一首
                    index = musicNum - 1;
                }
                else{
                    index -= 1;
                }
            }
            else if (action == 'next') {
                if (index == musicNum - 1) {//如果是最后一首歌，跳到第一首
                    index = 0;
                }
                else{
                    index += 1;
                }
            }else{
                //if ended 如果是播放结束自动跳转，不做操作
            }
        };

        _playIndex = index;
        // _playIndex(index-1);
        
        initAudio();
    }

    /*------------------------------ 监听器 -----------------------------*/
    
    _audio.addEventListener('timeupdate',function(){
        var current_time = _audio.currentTime;
        if (_callback) { _callback(); };
        // console.log(current_time);
        /*
        if (_current_time_Id !== null) {
            var surplus = _audio.currentTime;
            var surplusMin = parseInt(surplus/60);
            var surplusSecond = parseInt(surplus%60);
            if (surplusSecond < 10 ) {
                surplusSecond = '0'+surplusSecond;
            }
            _current_time_Id.innerHTML = "-" + surplusMin + ":" +surplusSecond;
        }
        //*/
        // if (!isNaN(audio.duration)) {
            //剩余时间
            // var surplus = audio.duration-audio.currentTime;
            // var surplusMin = parseInt(surplus/60);
            // var surplusSecond = parseInt(surplus%60);
            // if (surplusSecond < 10 ) {
            //     surplusSecond = '0'+surplusSecond;
            // };
            // $('.time').innerHTML = "-" + surplusMin + ":" +surplusSecond;

            // //播放进度条
            // var progressValue = audio.currentTime/audio.duration*324;
            // $('.progress').style.width = parseInt(progressValue) + 'px';
            // console.log(progressValue);
        // };
    },false);
    
    _audio.addEventListener('ended',function(){
        console.log('ended...');
        playMusicMode('ended');
    },false);



}













