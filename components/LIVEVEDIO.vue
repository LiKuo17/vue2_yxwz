<!-- 直播播放 -->
<template>
    <div class="liveVedio" ref="liveVedio">
        <div id="id_test_video" style="width:100%;display: flex; align-items: center; "></div>
    </div>
</template>

<script>
export default {
    props: ["jsonObj", "playingProgress"],
    data() {
        return {
            obj: "",
            islive: true,
            vediosIndex: 0,
            player: undefined,
            playerTime: 0,
            vedioLength: -1, //播放视频长度
        };
    },
    created() {
        //this.init();
    },
    methods: {
        init1() {
            let _this = this;
            this.$nextTick(function() {
                //http://kbs-dokdo.gscdn.com/dokdo_300/_definst_/dokdo_300.stream/playlist.m3u8 韩国
                //http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8

                this.player = new TcPlayer("id_test_video", {
                    mp4: this.obj.url, //请替换成实际可用的播放地址
                    autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
                    width: document.body.clientWidth, //视频的显示宽度，请尽量使用视频分辨率宽度
                    height: document.body.clientHeight, //视频的显示高度，请尽量使用视频分辨率高度
                    controls: "none",
                    systemFullscreen: false,
                    playsinline: true,
                    x5_type: "h5",
                    // poster: {
                    // 	"style": "stretch",
                    // 	"src": this.obj.background
                    // },
                    wording: {
                        2032: "请求视频失败，请检查网络",
                        2048: "请求网络失败，可能是网络错误或者跨域问题",
                        5: "不支持当前视频格式!",
                        4: "网络错误",
                    },
                    listener: function(msg) {
                        if (msg.type == "error") {
                            if (msg.detail.code == 2) {
                                //console.log("111");
                            }
                        }else if(msg.type=="load") {
							let videoTag = document.getElementsByTagName("video")[0]
                            videoTag.setAttribute("x5-video-player-type","h5-page")
						}else if (msg.type == "ended") {
                            //console.log("放完了");
                            _this.vediosIndex++;
                            _this.$emit("setjsonObj", _this.vediosIndex);
                        } else if (msg.type == "loadedmetadata") {
                            _this.$emit("setBackgroundShow", false);
                            _this.$emit("getVedioLength", _this.player.duration());
                            let playingProgress = window.sessionStorage.getItem("playingProgress");
                            if (playingProgress) {
                                _this.setTiming(playingProgress);
                            }
                        } else if (msg.type == "timeupdate") {
                            _this.$emit("getVedioLength", _this.player.duration());
                            // _this.$toast(_this.player.currentTime());
                            //console.log(_this.player.currentTime());
                            _this.$emit("setPlayingProgress", _this.player.currentTime());
                        }
                    },
                });
                // player.load(this.obj.url)
                // setTimeout(function(){
                // 	// alert(player.playing());
                // 	player.play();
                // },4000);
            });
            // setTimeout(function(){
            //  try{
            //   player.play();
            //  }
            //  catch(err){
            //   alert(err)
            //  }

            // },5000)
        },
        init() {
            let _this = this;
            this.$nextTick(function() {
                //http://kbs-dokdo.gscdn.com/dokdo_300/_definst_/dokdo_300.stream/playlist.m3u8 韩国
                //http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8

                this.player = new TcPlayer("id_test_video", {
                    m3u8: this.obj.url, //请替换成实际可用的播放地址
                    autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
                    // poster: {
                    // 	"style": "stretch",
                    // 	"src": this.obj.background
                    // },
                    width: document.body.clientWidth, //视频的显示宽度，请尽量使用视频分辨率宽度
                    height: document.body.clientHeight, //视频的显示高度，请尽量使用视频分辨率高度
                    x5_type: "h5",
                    live: true,
                    controls: "none",
                    systemFullscreen: false,
                    playsinline: true,
                    wording: {
                        2032: "请求视频失败，请检查网络",
                        2048: "请求m3u8文件失败，可能是网络错误或者跨域问题",
                        5: "不支持当前视频格式!",
                    },
                    listener: function(msg) {
                        if (msg.type == "error") {
                            if (msg.detail.code == 2) {
                            }
                        }else if(msg.type=="load") {
							let videoTag = document.getElementsByTagName("video")[0]
							videoTag.setAttribute("x5-video-player-type","h5-page")
						} else if (msg.type == "ended") {
                            _this.vediosIndex++;
                            //console.log("放完了");
                            _this.$emit("setjsonObj", _this.vediosIndex);
                        } else if (msg.type == "loadedmetadata") {
                            _this.$emit("setBackgroundShow", false);
                        }
                    },
                });
                // setTimeout(function(){
                // 	// alert(player.playing());
                // 	player.play();
                // },4000);
            });
            // setTimeout(function(){
            //  try{
            //   player.play();
            //  }
            //  catch(err){
            //   alert(err)
            //  }

            // },5000)
        },
        doplay() {
            if (this.player != undefined) {
                this.player.play();
            }
        },
        onload(url) {
            if (this.player != undefined) {
                this.player.load(url);
            }
        },
        suspend() {
            if (this.player != undefined) {
                this.player.pause();
            }
        },
        doDestroy() {
            if (this.player != undefined) {
                this.player.destroy();
            }
        },
        setBanMusic() {},
        getTiming() {
            //获取当前时间
        },
        setTiming(_time) {
            //设置当前播放时间
            this.player.currentTime(_time);
        },
    },
    watch: {
        jsonObj: function(value) {
            // alert(this.$props['jsonObj'])
            this.obj = JSON.parse(value);
            if (this.obj.livemode) {
                //直播模式
                this.islive = true;
                this.init();
            } else {
                //视频播放模式
                this.islive = false;
                this.init1();
            }
            // alert(newvalue);
        },
        playingProgress: function(value) {
            this.setTiming(value);
            // this.player.doplay()
        },
    },
};
</script>
<style scoped>
.liveVedio {
    height: 100vh;
}
</style>
