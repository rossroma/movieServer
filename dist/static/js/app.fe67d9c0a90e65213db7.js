webpackJsonp([7,8],[,,,,,,,,function(t,e){},,,,,,,,,,function(t,e,n){n(106);var u=n(19)(n(110),n(102),"data-v-10a3e8b7",null);t.exports=u.exports},,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){n(107);var u=n(19)(n(109),n(103),null,null);t.exports=u.exports},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,function(t,e,n){"use strict";function u(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),a=u(i),o=n(17),s=u(o);a.default.use(s.default);var r="/",f=function(t,e,n){a.default.http.get(""+r+t,{params:e}).then(function(t){200===t.status?n(t.body):console.log(t.status)})},l=function(t,e,n){a.default.http.post(""+r+t,e).then(function(t){200===t.status?n(t.body):console.log(t.status)})},c=function(){return{set:function(t,e){window.sessionStorage.setItem(t,e)},get:function(t){return window.sessionStorage.getItem(t)},remove:function(t){window.sessionStorage.removeItem(t)}}},d=new a.default;d.path=r,d.get=f,d.post=l,d.storage=c,e.default=d},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrap"},[n("h1",[t._v("猜电影")]),t._v(" "),n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"v-screen"},[n("div",{staticClass:"v-img"},[n("img",{ref:"pictrue",attrs:{src:t.newImg}})]),t._v(" "),t.inputShow?n("el-input",{attrs:{placeholder:"请输入电影名称",number:!0,size:"large"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.enterAnswer(e)}},model:{value:t.filmName,callback:function(e){t.filmName=e},expression:"filmName"}},[n("el-button",{nativeOn:{click:function(e){t.enterAnswer(e)}},slot:"append"},[t._v("确定&跳过")])],1):t._e(),t._v(" "),t.answerShow?n("answer",{attrs:{movie:t.movieInfos,picId:t.imageId,userAnswer:t.filmName,isRight:t.isRight},on:{"get-new":t.getNewFilm}}):t._e()],1),t._v(" "),n("upload",{attrs:{login:t.userName}}),t._v(" "),n("div",{staticClass:"v-foot-nav"},[n("router-link",{attrs:{to:"/about"}},[t._v("About")]),t._v(" "),t.userName?t._e():n("router-link",{attrs:{to:"/login"}},[t._v("Login")]),t._v(" "),t.userName?n("router-link",{attrs:{to:"/user"}},[t._v(t._s(t.userName))]):t._e()],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("router-view",[n("home")],1)},staticRenderFns:[]}},,function(t,e){},function(t,e){},function(t,e){},,function(t,e,n){"use strict";function u(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(18),a=u(i);e.default={name:"app",components:{home:a.default}}},function(t,e,n){"use strict";function u(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(105),a=(u(i),n(8)),o=(u(a),n(68)),s=u(o),r=n(63),f=u(r);e.default={data:function(){return{pictrue:"",imageId:"",movieInfos:{},inputShow:!0,answerShow:!1,picHeight:0,userName:"",userObid:"",pageCount:"",loading:!0,filmName:"",isRight:!1}},computed:{newImg:function(){return this.pictrue?this.pictrue+"-large":this.pictrue}},mounted:function(){this.getNewFilm(),this.getCount(),this.loginStatus()},methods:{getCount:function(){var t=this;f.default.get("getCount",{},function(e){t.pageCount=e.count})},loginStatus:function(){var t=this;f.default.get("loginstatus",{},function(e){t.userName=e.name,t.userObid=e.obid})},getNewFilm:function(){var t=this;this.loading=!0,this.pictrue="",this.clearFilm(),this.answerShow=!1;var e={rdNum:this.getRandom()};f.default.get("rd-pic",e,function(e){t.pictrue=e.images,t.imageId=e.objectId,t.loading=!1})},showAnswer:function(t){this.answerShow=!!t},getRandom:function(){if(!this.pageCount)return Math.ceil(100*Math.random());var t=f.default.storage().get("RANDOM_ARRAY");if(t){var e="["+t+"]";return this.sendRandom(JSON.parse(e))}return this.initRandom()},initRandom:function(){for(var t=[],e=0;e<this.pageCount;e++)t.push(e);return f.default.storage().set("RANDOM_ARRAY",t),this.sendRandom(t)},sendRandom:function(t){if(t.length){var e=Math.floor(Math.random()*t.length);return window.setTimeout(function(){t.splice(e,1),f.default.storage().set("RANDOM_ARRAY",t)},50),t[e]}return this.initRandom()},enterAnswer:function(){var t=this;if(this.filmName){this.inputShow=!1;var e={answer:this.filmName,objectId:this.imageId};f.default.get("answerMatch",e,function(e){e.isMatch?(t.notify(1,t.ranMessage(1)),t.gameLog("right")):(t.notify(0,t.ranMessage()),t.gameLog()),t.isRight=e.isMatch,t.movieInfos=e,t.answerShow=!0})}else this.getNewFilm()},notify:function(t,e){(0,s.default)({title:t?"答对啦！":"答错了！",message:e,type:t?"success":"error"})},ranMessage:function(t){var e=void 0;return e=t?["厉害了我的哥，这都能猜对！","大哥，你这是蒙对的吧！","哎呦！不错哦！下一题还能猜对么？","6翻了，无敌是多么寂寞！","就你牛逼！","我不相信这是你猜对的，除非你亲我一下！","又对了，你咋不上天呢！"]:["猜不中了吧，要加油啊！","这都没猜对，蓝瘦，香菇！","这一题我闭着眼睛都能猜对！","前辈！在下对你的答案有不同的看法！","你这么回答是什么意思？","对方不想和你说话，并向你丢了一个正确答案！"],e[Math.floor(Math.random()*e.length)]},gameLog:function(t){if(this.userid){var e="gamelog/"+this.userid,n={result:t};f.default.get(e,n,function(t){})}},clearFilm:function(){this.filmName="",this.inputShow=!0}},components:{answer:function(t){n.e(4).then(function(){var e=[n(115)];t.apply(null,e)}.bind(this)).catch(n.oe)},upload:function(t){n.e(0).then(function(){var e=[n(116)];t.apply(null,e)}.bind(this)).catch(n.oe)}}}},function(t,e){},function(t,e,n){"use strict";function u(t){return t&&t.__esModule?t:{default:t}}var i=n(54),a=(u(i),n(34)),o=u(a),s=n(61),r=(u(s),n(41)),f=u(r),l=n(47),c=(u(l),n(28)),d=u(c),h=n(51),m=(u(h),n(31)),p=u(m),g=n(52),v=(u(g),n(32)),w=u(v),_=n(58),b=(u(_),n(38)),N=u(b),R=n(59),M=(u(R),n(39)),y=u(M),A=n(53),I=(u(A),n(33)),S=u(I),C=n(57),O=(u(C),n(37)),k=u(O),x=n(60),F=(u(x),n(40)),j=u(F),L=n(46),P=(u(L),n(27)),D=u(P),Y=n(50),E=(u(Y),n(30)),J=u(E),$=n(55),z=(u($),n(35)),H=u(z),T=n(45),q=(u(T),n(26)),B=u(q),G=n(56),K=(u(G),n(36)),Q=u(K),U=n(48),V=(u(U),n(29)),W=u(V),X=n(44),Z=(u(X),n(7)),tt=u(Z),et=n(49),nt=(u(et),n(10)),ut=u(nt),it=n(43),at=(u(it),n(8)),ot=(u(at),n(23)),st=u(ot),rt=n(2),ft=u(rt),lt=n(42),ct=u(lt),dt=n(62),ht=u(dt),mt=n(17),pt=u(mt);ft.default.use(pt.default),ft.default.use(st.default),ft.default.use(ut.default),ft.default.use(tt.default),ft.default.use(W.default),ft.default.use(Q.default),ft.default.use(B.default),ft.default.use(H.default),ft.default.use(J.default),ft.default.use(D.default),ft.default.use(j.default),ft.default.use(k.default),ft.default.use(S.default),ft.default.use(y.default),ft.default.use(N.default),ft.default.use(w.default),ft.default.use(p.default),ft.default.use(d.default),ft.default.use(f.default),ft.default.use(o.default),ft.default.use(ht.default);var gt=function(t){return Promise.resolve().then(function(){var e=[n(18)];t.apply(null,e)}.bind(this)).catch(n.oe)},vt=function(t){return n.e(2).then(function(){var e=[n(99)];t.apply(null,e)}.bind(this)).catch(n.oe)},wt=function(t){return n.e(5).then(function(){var e=[n(98)];t.apply(null,e)}.bind(this)).catch(n.oe)},_t=function(t){return n.e(3).then(function(){var e=[n(100)];t.apply(null,e)}.bind(this)).catch(n.oe)},bt=function(t){return n.e(1).then(function(){var e=[n(101)];t.apply(null,e)}.bind(this)).catch(n.oe)},Nt=[{path:"/",component:gt},{path:"/datalist",component:vt},{path:"/about",component:wt},{path:"/login",component:_t},{path:"/user",component:bt}],Rt=new ht.default({routes:Nt});new ft.default({el:"#app",router:Rt,render:function(t){return t(ct.default)}})}],[112]);