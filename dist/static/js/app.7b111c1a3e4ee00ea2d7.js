webpackJsonp([2,0],[function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}var i=n(28),a=s(i),o=n(91),l=s(o),r=n(82),u=s(r);n(83);var c=n(110),h=s(c),d=n(111),f=s(d),m=n(99),p=s(m),g=n(39),_=s(g);a["default"].use(u["default"]),a["default"].use(h["default"]),a["default"].use(f["default"]);var v=[{path:"/",component:_["default"]},{path:"/datalist",component:p["default"]}],b=new f["default"]({routes:v});new a["default"]({el:"#app",router:b,render:function(t){return t(l["default"])}})},,function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(28),a=s(i),o={path:"http://123.206.213.35/"},l=new a["default"];l._val=o,e["default"]=l},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){var s,i;n(86),s=n(49);var a=n(102);i=s=s||{},"object"!=typeof s["default"]&&"function"!=typeof s["default"]||(i=s=s["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=s},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(39),a=s(i);e["default"]={name:"app",components:{home:a["default"]}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),a=s(i);e["default"]={data:function(){return{hard:0,likeMethod:!0,errorMethod:!0,rate:{}}},props:["movie","iHeight","picId"],computed:{scoreStar:function(){return this.movie.rating/2}},methods:{next:function(){this.hard&&this.rating(),a["default"].$emit("answer-show",!1),a["default"].$emit("get-new")},like:function(t,e){this.likeMethod&&(e.currentTarget.className="like-animate",this.$http.get(a["default"]._val.path+"like/"+this.picId+"?bol="+t).then(function(t){200===t.status?console.log(t.body):console.log(t.status)}),this.likeMethod=!1)},postErros:function(){this.errorMethod&&(this.$http.get(a["default"]._val.path+"addErrors?objectId="+this.picId).then(function(t){200===t.status?(this.message("bug已提交，谢谢你的反馈！","success"),console.log(t.body)):console.log(t.status)}),this.errorMethod=!1)},rating:function(){this.$http.get(a["default"]._val.path+"rate/"+this.picId+"?rating="+this.hard).then(function(t){200===t.status?console.log(t.body):console.log(t.status)})},message:function(t,e){this.$message({message:t,type:e})}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={data:function(){return{textarea:""}},methods:{getData:function(){this.$http({method:"GET",url:"https://api.bmob.cn/1/classes/movie/a0FZNNN0",headers:{"X-Bmob-Application-Id":"897d8343de907640340fa6b06684b181","X-Bmob-REST-API-Key":"8a3d04621f341624f41a5db35d688abd","Content-Type":"application/json"}}).then(function(t){console.log(t)},function(t){console.log(t)})}}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),a=s(i);e["default"]={mounted:function(){this.getMovieList()},data:function(){return{tableData:[],multipleSelection:[],totalPages:0,page:0,message:""}},props:["images"],methods:{getMovieList:function(){this.$http.get(a["default"]._val.path+"movie?page="+this.page).then(function(t){if(200===t.status){var e=t.body;this.tableData=e.results,this.totalPages=e.count}else console.log(t.status)})},delItem:function(t){this.$http.get(a["default"]._val.path+"delMovie/"+t).then(function(t){200===t.status?(this.message("删除成功","success"),this.getMovieList()):console.log(t.status)})},delItems:function(){var t="";if(this.multipleSelection.length){for(var e in this.multipleSelection)t+=this.multipleSelection[e].objectId+",";this.delItem(t.slice(0,-1))}else this.message("未选中任何数据","warning")},message:function(t,e){this.$message({message:t,type:e})},handleMultipleSelectionChange:function(t){this.multipleSelection=t},handleSizeChange:function(t){console.log("每页 "+t+" 条")},handleCurrentChange:function(t){this.page=15*(t-1),this.getMovieList()}}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),a=s(i);e["default"]={mounted:function(){this.getPictureList()},data:function(){return{tableData:[],multipleSelection:[],totalPages:0,page:0,message:""}},props:["images"],methods:{getPictureList:function(){this.$http.get(a["default"]._val.path+"picture?page="+this.page+"&status=2").then(function(t){if(200===t.status){var e=t.body;this.tableData=e.results,this.totalPages=e.count}else console.log(t.status)})},delItem:function(t,e){0!==e&&(e=1),console.log(e),this.$http.get(a["default"]._val.path+"delPicture/"+t+"?status="+e).then(function(t){200===t.status?(this.message("操作成功","success"),this.getPictureList()):console.log(t.status)})},delItems:function(){var t="";if(this.multipleSelection.length){for(var e in this.multipleSelection)t+=this.multipleSelection[e].objectId+",";this.delItem(t.slice(0,-1))}else this.message("未选中任何数据","warning")},message:function(t,e){this.$message({message:t,type:e})},handleMultipleSelectionChange:function(t){this.multipleSelection=t},handleSizeChange:function(t){console.log("每页 "+t+" 条")},handleCurrentChange:function(t){this.page=15*(t-1),this.getPictureList()}}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),a=s(i);e["default"]={mounted:function(){this.getPictureList()},data:function(){return{tableData:[],multipleSelection:[],totalPages:0,page:0,message:""}},props:["images"],methods:{getPictureList:function(){this.$http.get(a["default"]._val.path+"picture?page="+this.page+"&status=0").then(function(t){if(200===t.status){var e=t.body;this.tableData=e.results,this.totalPages=e.count}else console.log(t.status)})},delItem:function(t){this.$http.get(a["default"]._val.path+"delPicture/"+t+"?status=1").then(function(t){200===t.status?(this.message("删除成功","success"),this.getPictureList()):console.log(t.status)})},delItems:function(){var t="";if(this.multipleSelection.length){for(var e in this.multipleSelection)t+=this.multipleSelection[e].objectId+",";this.delItem(t.slice(0,-1))}else this.message("未选中任何数据","warning")},message:function(t,e){this.$message({message:t,type:e})},handleMultipleSelectionChange:function(t){this.multipleSelection=t},handleSizeChange:function(t){console.log("每页 "+t+" 条")},handleCurrentChange:function(t){this.page=15*(t-1),this.getPictureList()}}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),a=s(i);e["default"]={created:function(){a["default"].$on("get-new",this.clearFilm),a["default"].$on("loading",this.scrLoading)},beforeDestroy:function(){a["default"].$off("get-new",this.clearFilm),a["default"].$off("loading",this.scrLoading)},mounted:function(){var t=document.getElementsByClassName("v-scr")[0],e=this;t.onload=function(){e.loading=!1,a["default"].$emit("screen-height",t.height)}},data:function(){return{filmName:"",message:"",loading:!1}},props:["images","answerText","rightAnswer"],methods:{enterAnswer:function(){this.filmName?(this.answerMatch(this.filmName,this.rightAnswer.title,this.rightAnswer.original_title)?this.notify(1,this.ranMessage(1)):this.notify(0,this.ranMessage(),"error"),a["default"].$emit("answer-show",!0)):this.message()},answerMatch:function(t,e,n){function s(t,e){return t.length<=3?t===e:Boolean(t.search(e)+1)&&e.length>=3}function i(t,e){return t.length>1&&(t.length<=5?t.toLowerCase()===e.toLowerCase():Boolean(t.search(RegExp(e,"i"))+1)&&e.length>=6)}this.regcn=function(t){return t.replace(/[^\u4e00-\u9fa5]/g,"")},this.regen=function(t){return t.replace(/[^a-z]/i,"")};var a=s(this.regcn(e),this.regcn(t))||i(this.regen(n),this.regen(t));return a},notify:function(t,e,n){this.$notify({title:t?"答对啦！":"答错了！",message:e,type:n?n:"success"})},ranMessage:function(t){var e;e=t?["厉害了我的哥，这都能猜对！","大哥，你这是蒙对的吧！","哎呦！不错哦！下一题还能才对么？","6翻了，无敌是多么寂寞！","就你牛逼！","我不相信这是你猜对的，除非你亲我一下！","又对了，你咋不上天呢！"]:["猜不中了吧，要加油啊！","这都没猜对，蓝瘦，香菇！","这一题我闭着眼睛都能猜对！","前辈！在下对你的答案有不同的看法！","你这么回答是什么意思？","对方不想和你说话，并向你丢了一个正确答案！"];var n=Math.floor(Math.random()*e.length);return e[n]},message:function(){this.$message({message:"请输入电影名称",type:"warning"})},clearFilm:function(){this.filmName=""},scrLoading:function(t){this.loading=t}}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(52),a=s(i),o=n(2),l=s(o);e["default"]={data:function(){return{dialogVisible:!1,filmName:"",search:[],loading:!1,searchResult:!1,filmInfos:{},upimg:"",upimgResult:"",objectid:"",tab:!0}},methods:{handleClick:function(t){t=Number(t),1===t?this.tab=!0:this.tab=!1},triggerFile:function(){var t=document.forms.namedItem("fileinfo").file;t.click()},upLocalImg:function(){var t=document.forms.namedItem("fileinfo"),e=new RegExp(t.file.value.slice(-4),"i"),n=".jpg,.jpeg,.png";if(e.test(n)){var s=new FormData(t),i=new XMLHttpRequest;i.open("POST",l["default"]._val.path+"upimg",!0);var a=this;i.onload=function(t){200==i.status?a.upimgResult=i.responseText:console.log(i)},i.send(s)}else this.message("请上传正确的图片格式","warning")},CheckImgExists:function(t){var e=new Image;return e.src=t,e.fileSize>0||e.width>0&&e.height>0},onlineImg:function(){this.upimg&&this.CheckImgExists(this.upimg)?this.$http.get(l["default"]._val.path+"upimgUrl?pic="+this.upimg).then(function(t){200===t.status?this.upimgResult=t.body.path+t.body.name:console.log(t.status)}):this.message("图片地址有误，请检查后重新上传","warning")},getFilmData:function(t){this.search.length=0,this.searchResult=!1,this.loading=!0;var e=t.match(/[0-9]{7,8}/);this.$http.get(l["default"]._val.path+"getFilm?id="+e[0]).then(function(t){200===t.status?(this.filmInfos=t.body,this.loading=!1,this.searchResult=!0):console.log(t.status)}),this.$http.get(l["default"]._val.path+"exist?id="+e[0]).then(function(t){if(200===t.status){var e=t.body;e.results.length?this.objectid=e.results[0].objectId:this.objectid=""}else console.log(t.status)})},submitInfos:function(){if(this.objectid){var t={movie:{__type:"Pointer",className:"movie",objectId:this.objectid},images:this.upimgResult,rating:{average:0,stars:0,total:0},status:2};this.$http.post(l["default"]._val.path+"addPicture",t).then(function(t){200===t.status?(this.upSuccess(),console.log("已存在："+t.body)):console.log(t.status)})}else{var e=function(t){var e="";for(var n in t)e+="object"===(0,a["default"])(t[n])?t[n].name+" / ":t[n]+" / ";return e.slice(0,-2)},n={movie:{id:this.filmInfos.id,title:this.filmInfos.title,thumb:this.filmInfos.images.large,original_title:this.filmInfos.original_title,rating:this.filmInfos.rating.average,year:this.filmInfos.year,countries:e(this.filmInfos.countries),genres:e(this.filmInfos.genres),directors:e(this.filmInfos.directors),casts:e(this.filmInfos.casts),aka:e(this.filmInfos.aka),summary:this.filmInfos.summary.slice(0,160),status:0},picture:this.upimgResult};this.$http.post(l["default"]._val.path+"addMovie",n).then(function(t){200===t.status?(this.upSuccess(),console.log(t.body)):console.log(t.status)})}},upSuccess:function(){this.message("上传成功","success"),this.filmName="",this.upimgResult="",this.searchResult=!1,this.upimg=""},message:function(t,e){this.$message({message:t,type:e})}},watch:{filmName:function(t){t?this.$http.get(l["default"]._val.path+"search?keyword="+t).then(function(t){200===t.status?this.search=t.body:console.log(t.status)}):this.search.length=0}},computed:{upButton:function(){return!(!this.upimgResult||!this.searchResult)}}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(96),a=s(i),o=n(95),l=s(o),r=n(94),u=s(r);e["default"]={data:function(){return{tab:1}},components:{pictureList:a["default"],pendList:l["default"],movieList:u["default"]},methods:{handleClick:function(t){this.tab=Number(t)}}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(97),a=s(i),o=n(92),l=s(o),r=n(93),u=s(r),c=n(98),h=s(c),d=n(2),f=s(d);e["default"]={created:function(){f["default"].$on("get-new",this.getNewFilm),f["default"].$on("answer-show",this.showAnswer),f["default"].$on("screen-height",this.resetHeight)},beforeDestroy:function(){f["default"].$off("get-new",this.getNewFilm),f["default"].$off("answer-show",this.showAnswer),f["default"].$off("screen-height",this.resetHeight)},mounted:function(){this.getCount()},data:function(){return{currentFilm:{},answerShow:!1,imgHeight:0}},components:{screen:a["default"],answer:l["default"],comments:u["default"],upload:h["default"]},methods:{getCount:function(){this.$http.get(f["default"]._val.path+"getCount").then(function(t){200===t.status?this.getNewFilm(t.body.count):console.log(t.status)})},getNewFilm:function(t){f["default"].$emit("loading",!0),this.$http.get(f["default"]._val.path+"rd-pic?count="+t).then(function(t){200===t.status?this.currentFilm=t.body.results[0]:console.log(t.status)})},showAnswer:function(t){t?this.answerShow=!0:this.answerShow=!1},resetHeight:function(t){this.imgHeight=t}},computed:{newImg:function(){return this.currentFilm.images+"-large"}}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){var s,i;n(89),s=n(40);var a=n(107);i=s=s||{},"object"!=typeof s["default"]&&"function"!=typeof s["default"]||(i=s=s["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=s},function(t,e,n){var s,i;n(84),s=n(41);var a=n(100);i=s=s||{},"object"!=typeof s["default"]&&"function"!=typeof s["default"]||(i=s=s["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=s},function(t,e,n){var s,i;n(85),s=n(42);var a=n(101);i=s=s||{},"object"!=typeof s["default"]&&"function"!=typeof s["default"]||(i=s=s["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,i._scopeId="data-v-40af4c2a",t.exports=s},function(t,e,n){var s,i;s=n(43);var a=n(109);i=s=s||{},"object"!=typeof s["default"]&&"function"!=typeof s["default"]||(i=s=s["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=s},function(t,e,n){var s,i;s=n(44);var a=n(106);i=s=s||{},"object"!=typeof s["default"]&&"function"!=typeof s["default"]||(i=s=s["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=s},function(t,e,n){var s,i;s=n(45);var a=n(105);i=s=s||{},"object"!=typeof s["default"]&&"function"!=typeof s["default"]||(i=s=s["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=s},function(t,e,n){var s,i;n(90),s=n(46);var a=n(108);i=s=s||{},"object"!=typeof s["default"]&&"function"!=typeof s["default"]||(i=s=s["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=s},function(t,e,n){var s,i;n(87),s=n(47);var a=n(103);i=s=s||{},"object"!=typeof s["default"]&&"function"!=typeof s["default"]||(i=s=s["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,i._scopeId="data-v-5ae10592",t.exports=s},function(t,e,n){var s,i;n(88),s=n(48);var a=n(104);i=s=s||{},"object"!=typeof s["default"]&&"function"!=typeof s["default"]||(i=s=s["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=s},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"v-answer",style:{height:iHeight+"px"}},[_h("h2",[_s(movie.title)+" ",movie.title!==movie.original_title?_h("span",[_s(movie.original_title)]):_e()])," ",_h("div",{staticClass:"v-article"},[_h("div",{staticClass:"v-main-pic"},[_h("img",{attrs:{src:movie.thumb,alt:""}})," ",_m(0)," ",_h("div",{staticClass:"block"},[_m(1)," ",_h("el-rate",{directives:[{name:"model",rawName:"v-model",value:scoreStar,expression:"scoreStar"}],attrs:{disabled:"","text-template":"{value}"},domProps:{value:scoreStar},on:{input:function(t){scoreStar=t}}})," ",_h("span",{staticClass:"v-score"},[_s(movie.rating)])])])," ",_h("ul",{staticClass:"v-desc"},[_h("li",[_m(2),_s(movie.directors)])," ",_h("li",[_m(3),_s(movie.casts)])," ",_h("li",[_m(4),_s(movie.genres)])," ",_h("li",[_m(5),_s(movie.countries)])," ",_h("li",[_m(6),_s(movie.year)])," ",_h("li",[_m(7),_s(movie.aka)])," ",_h("li",[_m(8),_s(movie.summary)])])," ",_h("div",{staticClass:"v-option"},[_h("div",{staticClass:"block"},[_m(9)," ",_h("el-rate",{directives:[{name:"model",rawName:"v-model",value:hard,expression:"hard"}],attrs:{"show-text":"","void-color":"#999999",texts:["容易","容易","一般","困难","困难"]},domProps:{value:hard},on:{input:function(t){hard=t}}})])," ",_h("ul",{staticClass:"icon-list"},[_h("li",[_h("span",{on:{click:function(t){like(1,t)}}},[_m(10)," ",_m(11)])])," ",_h("li",[_h("span",{on:{click:function(t){like(0,t)}}},[_m(12)," ",_m(13)])])," ",_h("li",[_h("span",{on:{click:postErros}},[_m(14)," ",_m(15)])])])," ",_h("div",{staticClass:"v-next"},[_h("el-button",{attrs:{type:"info"},nativeOn:{click:function(t){next()}}},["下一题 ",_m(16)])])])])])},staticRenderFns:[function(){with(this)return _h("br")},function(){with(this)return _h("span",{staticClass:"demonstration"},["豆瓣评分"])},function(){with(this)return _h("span",{staticClass:"color-gray"},["导演: "])},function(){with(this)return _h("span",{staticClass:"color-gray"},["主演: "])},function(){with(this)return _h("span",{staticClass:"color-gray"},["类型: "])},function(){with(this)return _h("span",{staticClass:"color-gray"},["地区: "])},function(){with(this)return _h("span",{staticClass:"color-gray"},["年代: "])},function(){with(this)return _h("span",{staticClass:"color-gray"},["别名: "])},function(){with(this)return _h("span",{staticClass:"color-gray"},["简介: "])},function(){with(this)return _h("span",{staticClass:"demonstration"},["你觉得容易吗？"])},function(){with(this)return _h("i",{staticClass:"el-icon-good"})},function(){with(this)return _h("em",["Like"])},function(){with(this)return _h("i",{staticClass:"el-icon-bad"})},function(){with(this)return _h("em",["Unlike"])},function(){with(this)return _h("i",{staticClass:"el-icon-warning"})},function(){with(this)return _h("em",["有错误"])},function(){with(this)return _h("i",{staticClass:"el-icon-arrow-right el-icon-next"})}]}},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"v-comments"},[_m(0)," ",_h("div",{staticClass:"v-coments-list"},[_h("dl",[_m(1)," ",_h("dd",[_h("router-link",{attrs:{to:"/datalist"}},["@爱飞舞的鱼"]),"有种超现实的感觉~挺棒~"])," ",_m(2)])," ",_m(3)," ",_h("div",{staticClass:"v-comments-box"},[_m(4)," ",_h("el-input",{directives:[{name:"model",rawName:"v-model",value:textarea,expression:"textarea"}],attrs:{type:"textarea",autosize:{minRows:3,maxRows:5}},domProps:{value:textarea},on:{input:function(t){textarea=t}}})," ",_h("div",{staticClass:"v-text-right"},[_h("el-button",{nativeOn:{click:function(t){getData(t)}}},["回应"])])])])])},staticRenderFns:[function(){with(this)return _h("h2",["评论"])},function(){with(this)return _h("dt",{staticClass:"color-gray bg-gray-lighter"},[_h("span",{staticClass:"v-name"},["rossroma"]),"\n        2015-12-20 12:35\n      "])},function(){with(this)return _h("dd",{staticClass:"v-review color-gray hide"},[_h("a",["回应"])])},function(){with(this)return _h("dl",[_h("dt",{staticClass:"color-gray bg-gray-lighter"},[_h("span",{staticClass:"v-name"},["爱飞舞的鱼"]),"\n        2015-12-20 12:35\n      "])," ",_h("dd",["有种超现实的感觉~挺棒~"])," ",_h("dd",{staticClass:"v-review color-gray"},[_h("a",["回应"])])])},function(){with(this)return _h("div",{staticClass:"v-title"},["你的回应"])}]}},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"wrap"},[_m(0)," ",_h("screen",{attrs:{images:newImg,rightAnswer:currentFilm.movie,answerText:!answerShow}})," ",answerShow?_h("answer",{attrs:{iHeight:imgHeight,movie:currentFilm.movie,picId:currentFilm.objectId}}):_e()," ",_m(1)," ",_m(2)," ",_h("upload")])},staticRenderFns:[function(){with(this)return _h("h1",["猜电影"])},function(){with(this)return _h("br")},function(){with(this)return _h("br")}]}},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"v-upload"},[_h("el-button",{staticClass:"v-up",attrs:{type:"text"},nativeOn:{click:function(t){dialogVisible=!0}}},["上传剧照"])," ",_h("el-dialog",{directives:[{name:"model",rawName:"v-model",value:dialogVisible,expression:"dialogVisible"}],attrs:{size:"full"},domProps:{value:dialogVisible},on:{input:function(t){dialogVisible=t}}},[_m(0)," ",_h("div",{staticClass:"wrap"},[_m(1)," ",_h("el-tabs",{attrs:{type:"card"},on:{"tab-click":handleClick}},[_h("el-tab-pane",{attrs:{label:"本地图片上传"}})," ",_h("el-tab-pane",{attrs:{label:"在线图片上传"}})])," ",_h("el-row",{attrs:{gutter:20}},[_h("el-col",{attrs:{span:12}},[tab?_h("form",{attrs:{enctype:"multipart/form-data",method:"post",name:"fileinfo"}},[_h("input",{attrs:{type:"file",style:"display:none;",name:"file",required:""},on:{change:upLocalImg}})," ",_h("div",{staticClass:"v-uparea",on:{click:triggerFile}},["点击选择图片"])]):_e()," ",tab?_e():_h("div",[_h("el-input",{directives:[{name:"model",rawName:"v-model.trim",value:upimg,expression:"upimg",modifiers:{trim:!0}}],attrs:{placeholder:"输入图片的URL",style:"width: 400px;"},domProps:{value:upimg},on:{input:function(t){upimg=t}}},[_h("el-button",{slot:"append",nativeOn:{click:function(t){onlineImg(t)}}},["上传"])])])," ",upimgResult?_h("img",{staticClass:"v-img-result",attrs:{src:upimgResult,alt:""}}):_e()])," ",_h("el-col",{attrs:{span:12}},[_h("el-input",{directives:[{name:"model",rawName:"v-model",value:filmName,expression:"filmName"}],attrs:{placeholder:"请输入电影标题"},domProps:{value:filmName},on:{input:function(t){filmName=t}}})," ",search.length?_h("div",{staticClass:"v-result"},[_h("ul",[_l(search,function(t){return _h("li",{on:{click:function(e){getFilmData(t.url)}}},[_h("div",{staticClass:"v-thumb"},[_h("img",{attrs:{src:t.img,alt:""}})])," ",_h("div",{staticClass:"v-con"},[_h("p",[_s(t.title)+" ",_h("span",[_s(t.year)])])," ",_h("span",[_s(t.sub_title)])])])})])]):_e()])])," ",_m(2),_m(3)," ",loading?_h("div",{directives:[{name:"loading",rawName:"v-loading",value:loading,expression:"loading"}],staticClass:"el-loading-demo"}):_e()," ",searchResult?_h("el-row",{attrs:{gutter:20}},[_h("el-col",{attrs:{span:6}},[_h("img",{staticClass:"v-img",attrs:{src:filmInfos.images.large,alt:""}})])," ",_h("el-col",{staticClass:"v-sercon",attrs:{span:18}},[_h("el-row",{attrs:{gutter:20}},[_h("el-col",{attrs:{span:2}},["标题:"])," ",_h("el-col",{attrs:{span:22}},[_s(filmInfos.title)])])," ",_h("el-row",[_h("el-col",{attrs:{span:2}},["评分:"])," ",_h("el-col",{attrs:{span:22}},[_s(filmInfos.rating.average)])])," ",_h("el-row",[_h("el-col",{attrs:{span:2}},["导演:"])," ",_h("el-col",{attrs:{span:22}},[_l(filmInfos.directors,function(t){return _h("span",["\n                "+_s(t.name)+"  \n              "])})])])," ",_h("el-row",[_h("el-col",{attrs:{span:2}},["主演:"])," ",_h("el-col",{attrs:{span:22}},[_l(filmInfos.casts,function(t){return _h("span",["\n                "+_s(t.name)+"  \n              "])})])])," ",_h("el-row",[_h("el-col",{attrs:{span:2}},["类型:"])," ",_h("el-col",{attrs:{span:22}},[_l(filmInfos.genres,function(t){return _h("span",["\n                "+_s(t)+"  \n              "])})])])," ",_h("el-row",[_h("el-col",{attrs:{span:2}},["年代:"])," ",_h("el-col",{attrs:{span:22}},[_s(filmInfos.year)])])," ",_h("el-row",[_h("el-col",{attrs:{span:2}},["地区:"])," ",_h("el-col",{attrs:{span:22}},[_l(filmInfos.countries,function(t){return _h("span",["\n                "+_s(t)+"  \n              "])})])])," ",_h("el-row",[_h("el-col",{attrs:{span:2}},["又名:"])," ",_h("el-col",{attrs:{span:22}},[_l(filmInfos.aka,function(t){return _h("span",["\n                "+_s(t)+"  \n              "])})])])," ",_h("el-row",[_h("el-col",{attrs:{span:2}},["简介:"])," ",_h("el-col",{attrs:{span:22}},[_s(filmInfos.summary)])])])]):_e()])," ",_h("div",{slot:"footer",staticClass:"dialog-footer"},[upButton?_h("el-button",{attrs:{type:"primary",size:"large"},nativeOn:{click:function(t){submitInfos(t)}}},["提交"]):_e()])])])},staticRenderFns:[function(){with(this)return _h("h1",["上传我的剧照"])},function(){with(this)return _h("div",{staticClass:"v-tips"},[_h("h3",["上传小贴士："])," ",_h("ul",[_h("li",["① 尽量使用本地图片上传，因为个别网站（如豆瓣）有图片防盗链功能，会导致图片上传失败；"])," ",_h("li",["② 图片宽度要大于等于1000px，尽量选择横版剧照，不要上传竖版的剧照，只能上传jpg/png文件，且不超过600kb。"])," ",_h("li",["③ 剧照中不要有水印、电影名称、字幕和上下黑边，这会影响界面的美观度；"])," ",_h("li",["④ 图片上传后，如有缩略图显示则证明剧照上传成功，然后在右侧输入电影标题，在下拉列表中选择与之匹配的电影；"])," ",_h("li",["⑤ 检查电影剧照与电影信息，确认无误后点击提交按钮，剧照上传成功！"])])])},function(){with(this)return _h("br")},function(){with(this)return _h("br")}]}},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"wrap"},[_m(0)," ",_h("el-tabs",{attrs:{type:"card"},on:{"tab-click":handleClick}},[_h("el-tab-pane",{attrs:{label:"待审核"}})," ",_h("el-tab-pane",{attrs:{label:"电影剧照"}})," ",_h("el-tab-pane",{attrs:{label:"电影"}})])," ",1===tab?_h("pend-list"):_e()," ",2===tab?_h("picture-list"):_e()," ",3===tab?_h("movie-list"):_e()])},staticRenderFns:[function(){with(this)return _h("h1",["内容管理"])}]}},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"picture-list"},[_h("el-table",{attrs:{data:tableData,"selection-mode":"multiple",style:"width: 100%"},on:{selectionchange:handleMultipleSelectionChange}},[_h("el-table-column",{attrs:{type:"selection",width:"50"}})," ",_h("el-table-column",{attrs:{width:"100",label:"剧照"},inlineTemplate:{render:function(){with(this)return _h("img",{attrs:{height:"40",src:row.images+"-guessmovie",alt:""}})},staticRenderFns:[]}})," ",_h("el-table-column",{attrs:{label:"电影",width:"240"},inlineTemplate:{render:function(){with(this)return _h("span",[_s(row.movie.objectId)])},staticRenderFns:[]}})," ",_h("el-table-column",{attrs:{label:"难度",width:"100"},inlineTemplate:{render:function(){with(this)return _h("span",[_s(row.rating.average)])},staticRenderFns:[]}})," ",_h("el-table-column",{attrs:{property:"createdAt",sortable:"",label:"日期",width:"240"}})," ",_h("el-table-column",{attrs:{label:"操作"},inlineTemplate:{render:function(){with(this)return _h("div",[_h("a",{attrs:{href:"javascript:;"},on:{click:function(t){delItem(row.objectId)}}},["删除"])])},staticRenderFns:[]}})])," ",_h("div",{staticClass:"block mt10"},[_h("el-button",{attrs:{size:"small"}},[_h("span",{on:{click:function(t){delItems()}}},["批量删除"])])," ",_h("el-pagination",{attrs:{"current-page":1,"page-size":15,layout:"total, prev, pager, next",total:totalPages},on:{sizechange:handleSizeChange,currentchange:handleCurrentChange}})])])},staticRenderFns:[]}},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"picture-list"},[_h("el-table",{attrs:{data:tableData,"selection-mode":"multiple",style:"width: 100%"},on:{selectionchange:handleMultipleSelectionChange}},[_h("el-table-column",{attrs:{type:"selection",width:"50"}})," ",_h("el-table-column",{attrs:{width:"100",label:"剧照"},inlineTemplate:{render:function(){with(this)return _h("img",{attrs:{height:"40",src:row.images+"-guessmovie",alt:""}})},staticRenderFns:[]}})," ",_h("el-table-column",{attrs:{label:"电影",width:"240"},inlineTemplate:{render:function(){with(this)return _h("span",[_s(row.movie.objectId)])},staticRenderFns:[]}})," ",_h("el-table-column",{attrs:{label:"难度",width:"100"},inlineTemplate:{render:function(){with(this)return _h("span",[_s(row.rating.average)])},staticRenderFns:[]}})," ",_h("el-table-column",{attrs:{property:"createdAt",sortable:"",label:"日期",width:"240"}})," ",_h("el-table-column",{attrs:{label:"操作"},inlineTemplate:{render:function(){with(this)return _h("div",[_h("a",{attrs:{href:"javascript:;"},on:{click:function(t){delItem(row.objectId)}}},["删除"])," ",_h("a",{attrs:{href:"javascript:;"},on:{click:function(t){delItem(row.objectId,0)}}},["审核"])])},staticRenderFns:[]}})])," ",_h("div",{staticClass:"block mt10"},[_h("el-button",{attrs:{size:"small"}},[_h("span",{on:{click:function(t){delItems()}}},["批量删除"])])," ",_h("el-pagination",{attrs:{"current-page":1,"page-size":15,layout:"total, prev, pager, next",total:totalPages},on:{sizechange:handleSizeChange,currentchange:handleCurrentChange}})])])},staticRenderFns:[]}},function(module,exports){module.exports={render:function(){with(this)return _h("router-view",[_h("home")])},staticRenderFns:[]}},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"v-screen"},[_h("div",{staticClass:"v-img"},[_h("img",{staticClass:"v-scr",attrs:{src:images}})," ",_h("div",{directives:[{name:"loading",rawName:"v-loading",value:loading,expression:"loading"}],staticClass:"el-loading-demo",attrs:{style:"position:absolute"}})])," ",answerText?_h("el-input",{directives:[{name:"model",rawName:"v-model",value:filmName,expression:"filmName"}],attrs:{placeholder:"请输入电影名称",number:!0,size:"large"},domProps:{value:filmName},on:{input:function(t){filmName=t}}},[_h("el-button",{slot:"append",nativeOn:{click:function(t){enterAnswer(t)}}},["确定"])]):_e()])},staticRenderFns:[]}},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"picture-list"},[_h("el-table",{attrs:{data:tableData,"selection-mode":"multiple",style:"width: 100%"},on:{selectionchange:handleMultipleSelectionChange}},[_h("el-table-column",{attrs:{type:"selection",width:"50"}})," ",_h("el-table-column",{attrs:{width:"80",label:"缩略图"},inlineTemplate:{render:function(){with(this)return _h("img",{attrs:{height:"40",src:row.thumb,alt:""}})},staticRenderFns:[]}})," ",_h("el-table-column",{attrs:{property:"title",label:"标题",width:"240"}})," ",_h("el-table-column",{attrs:{property:"year",sortable:"",label:"年代",width:"80"}})," ",_h("el-table-column",{attrs:{property:"countries",label:"地区",width:"160"}})," ",_h("el-table-column",{attrs:{property:"rating",sortable:"",label:"评分",width:"80"}})," ",_h("el-table-column",{attrs:{label:"操作"},inlineTemplate:{render:function(){with(this)return _h("div",[_h("a",{attrs:{href:"javascript:;"},on:{click:function(t){delItem(row.objectId)}}},["删除"])])},staticRenderFns:[]}})])," ",_h("div",{staticClass:"block mt10"},[_h("el-button",{attrs:{size:"small"}},[_h("span",{on:{click:function(t){delItems()}}},["批量删除"])])," ",_h("el-pagination",{attrs:{"current-page":1,"page-size":15,layout:"total, prev, pager, next",total:totalPages},on:{sizechange:handleSizeChange,currentchange:handleCurrentChange}})])])},staticRenderFns:[]}}]);
//# sourceMappingURL=app.7b111c1a3e4ee00ea2d7.js.map