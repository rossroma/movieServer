webpackJsonp([8,6],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var u=n(87),a=(i(u),n(117)),o=i(a),s=n(88),r=(i(s),n(118)),l=i(r),f=n(95),c=(i(f),n(128)),d=i(c),h=n(96),g=(i(h),n(129)),m=i(g),p=n(91),v=(i(p),n(122)),w=i(v),_=n(94),y=(i(_),n(127)),b=i(y),F=n(97),N=(i(F),n(130)),$=i(N),M=n(83),x=(i(M),n(112)),C=i(x),A=n(86),R=(i(A),n(114)),L=i(R),j=n(92),S=(i(j),n(123)),H=i(S),O=n(82),k=(i(O),n(111)),E=i(k),P=n(93),I=(i(P),n(124)),B=i(I),T=n(84),z=(i(T),n(113)),D=i(z),J=n(81),q=(i(J),n(33)),G=i(q),K=n(85),Q=(i(K),n(34)),U=i(Q),V=n(80),W=(i(V),n(9)),X=(i(W),n(52)),Y=i(X),Z=n(1),tt=i(Z),et=n(190),nt=i(et),it=n(134),ut=i(it),at=n(109),ot=i(at);tt.default.use(ot.default),tt.default.use(Y.default),tt.default.use(U.default),tt.default.use(G.default),tt.default.use(D.default),tt.default.use(B.default),tt.default.use(E.default),tt.default.use(H.default),tt.default.use(L.default),tt.default.use(C.default),tt.default.use($.default),tt.default.use(b.default),tt.default.use(w.default),tt.default.use(m.default),tt.default.use(d.default),tt.default.use(l.default),tt.default.use(o.default),tt.default.use(ut.default);var st=function(t){return!function(){var e=[n(70)];t.apply(null,e)}.call(this)},rt=function(t){return n.e(3,function(e){var n=[e(203)];t.apply(null,n)}.bind(this))},lt=function(t){return n.e(5,function(e){var n=[e(202)];t.apply(null,n)}.bind(this))},ft=function(t){return n.e(2,function(e){var n=[e(204)];t.apply(null,n)}.bind(this))},ct=function(t){return n.e(1,function(e){var n=[e(205)];t.apply(null,n)}.bind(this))},dt=[{path:"/",component:st},{path:"/datalist",component:rt},{path:"/about",component:lt},{path:"/login",component:ft},{path:"/user",component:ct}],ht=new ut.default({routes:dt});new tt.default({el:"#app",router:ht,render:function(t){return t(nt.default)}})},8:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var u=n(1),a=i(u),o={path:"/"},s=new a.default;s._val=o,e.default=s},9:function(t,e){},70:function(t,e,n){var i,u;n(107),i=n(183);var a=n(220);u=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(u=i=i.default),"function"==typeof u&&(u=u.options),u.render=a.render,u.staticRenderFns=a.staticRenderFns,t.exports=i},80:function(t,e){},81:function(t,e){},82:function(t,e){},83:function(t,e){},84:function(t,e){},85:function(t,e){},86:function(t,e){},87:function(t,e){},88:function(t,e){},90:function(t,e){},91:function(t,e){},92:function(t,e){},93:function(t,e){},94:function(t,e){},95:function(t,e){},96:function(t,e){},97:function(t,e){},100:function(t,e){},105:function(t,e){},107:function(t,e){},170:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var u=n(70),a=i(u);e.default={name:"app",components:{home:a.default}}},177:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var u=n(90),a=(i(u),n(9)),o=(i(a),n(120)),s=i(o),r=n(8),l=i(r);e.default={created:function(){l.default.$on("get-new",this.clearFilm),l.default.$on("loading",this.scrLoading)},beforeDestroy:function(){l.default.$off("get-new",this.clearFilm),l.default.$off("loading",this.scrLoading)},mounted:function(){var t=this,e=document.getElementsByClassName("v-scr")[0];e.onload=function(){t.loading=!1,l.default.$emit("screen-height",e.height)}},data:function(){return{filmName:"",message:"",loading:!1}},props:["images","answerText","rightAnswer","userid"],methods:{enterAnswer:function(){this.filmName?(this.answerMatch(this.filmName,this.rightAnswer.title,this.rightAnswer.original_title)?(this.notify(1,this.ranMessage(1)),this.gameLog("right")):(this.notify(0,this.ranMessage(),"error"),this.gameLog()),l.default.$emit("answer-show",!0)):l.default.$emit("get-new")},answerMatch:function(t,e,n){function i(t,e){return t.length<=3?t===e:Boolean(t.search(e)+1)&&e.length>=3}function u(t,e){return t.length>1&&(t.length<=5?t.toLowerCase()===e.toLowerCase():Boolean(t.search(RegExp(e,"i"))+1)&&e.length>=6)}this.regcn=function(t){return t.replace(/[^\u4e00-\u9fa5]/g,"")},this.regen=function(t){return t.replace(/[^a-z]/i,"")};var a=i(this.regcn(e),this.regcn(t))||u(this.regen(n),this.regen(t));return a},notify:function(t,e,n){(0,s.default)({title:t?"答对啦！":"答错了！",message:e,type:n||"success"})},ranMessage:function(t){var e=void 0;e=t?["厉害了我的哥，这都能猜对！","大哥，你这是蒙对的吧！","哎呦！不错哦！下一题还能才对么？","6翻了，无敌是多么寂寞！","就你牛逼！","我不相信这是你猜对的，除非你亲我一下！","又对了，你咋不上天呢！"]:["猜不中了吧，要加油啊！","这都没猜对，蓝瘦，香菇！","这一题我闭着眼睛都能猜对！","前辈！在下对你的答案有不同的看法！","你这么回答是什么意思？","对方不想和你说话，并向你丢了一个正确答案！"];var n=Math.floor(Math.random()*e.length);return e[n]},gameLog:function(t){this.userid&&this.$http.get(l.default._val.path+"gamelog/"+this.userid+"?result="+t).then(function(t){200===t.status?console.log(t.body):console.log(t.status)})},clearFilm:function(){this.filmName=""},scrLoading:function(t){this.loading=t}}}},183:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var u=n(197),a=i(u),o=n(8),s=i(o);e.default={created:function(){s.default.$on("get-new",this.getNewFilm),s.default.$on("answer-show",this.showAnswer),s.default.$on("screen-height",this.resetHeight)},beforeDestroy:function(){s.default.$off("get-new",this.getNewFilm),s.default.$off("answer-show",this.showAnswer),s.default.$off("screen-height",this.resetHeight)},mounted:function(){this.getCount(),this.loginStatus()},data:function(){return{currentFilm:{},answerShow:!1,imgHeight:0,userName:"",userObid:""}},components:{screen:a.default,answer:function(t){n.e(4,function(e){var n=[e(191)];t.apply(null,n)}.bind(this))},upload:function(t){n.e(0,function(e){var n=[e(199)];t.apply(null,n)}.bind(this))}},methods:{getCount:function(){var t=this;this.$http.get(s.default._val.path+"getCount").then(function(e){200===e.status?t.getNewFilm(e.body.count):console.log(e.status)})},loginStatus:function(){var t=this;this.$http.get(s.default._val.path+"loginstatus").then(function(e){200===e.status?e.body&&(t.userName=e.body.name,t.userObid=e.body.obid):console.log(e.status)})},getNewFilm:function(t){var e=this;s.default.$emit("loading",!0),this.$http.get(s.default._val.path+"rd-pic?count="+t).then(function(t){200===t.status?e.currentFilm=t.body.results[0]:console.log(t.status)})},showAnswer:function(t){t?this.answerShow=!0:this.answerShow=!1},resetHeight:function(t){this.imgHeight=t}},computed:{newImg:function(){return this.currentFilm.images?this.currentFilm.images+"-large":""}}}},190:function(t,e,n){var i,u;n(100),i=n(170);var a=n(211);u=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(u=i=i.default),"function"==typeof u&&(u=u.options),u.render=a.render,u.staticRenderFns=a.staticRenderFns,t.exports=i},197:function(t,e,n){var i,u;n(105),i=n(177);var a=n(217);u=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(u=i=i.default),"function"==typeof u&&(u=u.options),u.render=a.render,u.staticRenderFns=a.staticRenderFns,t.exports=i},211:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("router-view",[n("home")],1)},staticRenderFns:[]}},217:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"v-screen"},[n("div",{staticClass:"v-img"},[n("img",{staticClass:"v-scr",attrs:{src:t.images}}),t._v(" "),n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"el-loading-demo",staticStyle:{position:"absolute"}})]),t._v(" "),t.answerText?n("el-input",{directives:[{name:"model",rawName:"v-model",value:t.filmName,expression:"filmName"}],attrs:{placeholder:"请输入电影名称",number:!0,size:"large"},domProps:{value:t.filmName},on:{input:function(e){t.filmName=e}}},[n("el-button",{nativeOn:{click:function(e){t.enterAnswer(e)}},slot:"append"},[t._v("确定&跳过")])],1):t._e()],1)},staticRenderFns:[]}},220:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrap"},[n("h1",[t._v("猜电影")]),t._v(" "),n("screen",{attrs:{images:t.newImg,rightAnswer:t.currentFilm.movie,answerText:!t.answerShow}}),t._v(" "),t.answerShow?n("answer",{attrs:{iHeight:t.imgHeight,movie:t.currentFilm.movie,picId:t.currentFilm.objectId}}):t._e(),t._v(" "),n("upload",{attrs:{login:t.userName}}),t._v(" "),n("div",{staticClass:"v-foot-nav"},[n("router-link",{attrs:{to:"/about"}},[t._v("About")]),t._v(" "),t.userName?t._e():n("router-link",{attrs:{to:"/login"}},[t._v("Login")]),t._v(" "),t.userName?n("router-link",{attrs:{to:"/user"}},[t._v(t._s(t.userName))]):t._e()],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=app.fdcaab7abab730d24c7d.js.map