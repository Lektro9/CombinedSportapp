(function(e){function t(t){for(var a,o,s=t[0],c=t[1],l=t[2],d=0,f=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&f.push(r[o][0]),r[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(f.length)f.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(a=!1)}a&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},r={app:0},i=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0140":function(e,t,n){e.exports=n.p+"static/img/08HalfOneArm.3cafd753.jpg"},"034f":function(e,t,n){"use strict";var a=n("19b3"),r=n.n(a);r.a},"06a1":function(e,t,n){e.exports=n.p+"static/img/03WallHand.3075856c.jpg"},"192e":function(e,t,n){e.exports=n.p+"static/img/04Half.4f46852a.jpg"},"19b3":function(e,t,n){},"19dd":function(e,t,n){e.exports=n.p+"static/img/07Uneven.f3b07d93.jpg"},"1be7":function(e,t,n){e.exports=n.p+"static/img/04FlatFrogRaises.645d1e7b.jpg"},"1dd2":function(e,t,n){e.exports=n.p+"static/img/03Angled.c8c60d38.jpg"},"1f92":function(e,t,n){e.exports=n.p+"static/img/01Wall.bc26bb1e.jpg"},"24b0":function(e,t,n){},"27f6":function(e,t,n){e.exports=n.p+"static/img/05Full.a025dbdd.jpg"},"290a":function(e,t,n){e.exports=n.p+"static/img/04Head.56aa1821.jpg"},"2d31":function(e,t,n){e.exports=n.p+"static/img/06Close.c38dca83.jpg"},"34bb":function(e,t,n){e.exports=n.p+"static/img/09AssistedOneLeg.8e6ad154.jpg"},"369a":function(e,t,n){e.exports=n.p+"static/img/09Closing.3d46acfb.jpg"},"3d95":function(e,t,n){e.exports=n.p+"static/img/08HalfOneArm.00976f4d.jpg"},"447f":function(e,t,n){e.exports=n.p+"static/img/01Short.a5ece3fb.jpg"},"522a":function(e,t,n){e.exports=n.p+"static/img/08HangingFrog.e7349ab1.jpg"},"56d7":function(e,t,n){"use strict";n.r(t);n("4de4"),n("4160"),n("0d03"),n("b0c0"),n("d3b7"),n("159b");var a=n("9a2e"),r=(n("96cf"),n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("2b0e")),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{staticClass:"primary",attrs:{id:"inspire",dark:""}},[n("v-navigation-drawer",{attrs:{app:"",clipped:"",right:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",{staticClass:"title"},[e._v("Menu")])],1)],1),n("v-list",{attrs:{dense:""}},[n("v-list-item",{attrs:{disabled:!this.onLine},on:{click:function(t){return e.clearCache()}}},[n("v-list-item-action",[n("v-icon",[e._v(e._s(e.clearCacheIcon))])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Clear Cache")])],1)],1)],1),n("v-list",{attrs:{dense:""}},[n("v-list-item",{attrs:{disabled:!this.onLine},on:{click:function(t){return e.fetchDataFromServer()}}},[n("v-list-item-action",[n("v-icon",[e._v(e._s(e.loadServerDataIcon))])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Load Serverdata")])],1)],1)],1),n("v-list",{attrs:{dense:""}},[n("v-list-item",{attrs:{disabled:!this.onLine&&this.filtered},on:{click:function(t){return e.syncCards()}}},[n("v-list-item-action",[n("v-icon",[e._v(e._s(e.syncIcon))])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Synchronize Cards")])],1)],1)],1)],1),n("v-snackbar",{attrs:{color:"warning",timeout:6e3,top:!0},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v(" You are currently not online. "),n("v-btn",{attrs:{dark:"",text:""},on:{click:function(t){e.snackbar=!1}}},[e._v("Close")])],1),n("v-app-bar",{staticClass:"primary",attrs:{dark:"",app:""}},[n("v-row",{attrs:{justify:"space-between"}},[n("v-col",[n("v-btn",{staticClass:"mt-2",attrs:{text:""},on:{click:function(t){e.dialog=!0}}},[e._v("guide")])],1),n("v-col",[n("v-toolbar-title",{staticClass:"mt-2 text-center"},[e._v("Calisthenics")])],1),n("v-col",{staticClass:"text-right"},[n("v-row",[n("v-dialog",{attrs:{width:"600px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("guideModal",{on:{closeModal:function(t){e.dialog=!1}}})],1)],1),n("v-btn",{staticClass:"primary",attrs:{dark:"",fab:""},on:{click:function(t){e.drawer=!e.drawer}}},[n("v-icon",{attrs:{large:""}},[e._v(e._s(e.menuIcon))])],1)],1)],1)],1),n("v-content",[n("v-offline",{attrs:{"online-class":"online","offline-class":"offline"},on:{"detected-condition":e.amIOnline}}),n("v-menu",{attrs:{"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on;return[n("v-btn",e._g({staticClass:"primary botleft",attrs:{icon:"",dark:"",fab:""}},a),[n("v-icon",{attrs:{large:""}},[e._v(e._s(e.plusIcon))])],1)]}}])},[n("v-list",e._l(e.allKategorie,(function(t,a){return n("v-list-item",{key:a,on:{click:function(n){return e.addCard(t)}}},[n("v-list-item-title",[e._v(e._s(t.name))])],1)})),1)],1),n("v-select",{staticClass:"filterInput mt-5",attrs:{"append-icon":e.closeIcon,items:void 0!==e.allKategorie?e.allKategorie.map((function(e){return e.name})):void 0,label:"Categoryfilter"},on:{"click:append":function(t){return e.resetFilter()},input:function(t){return e.setFilter()}},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}}),n("jw-pagination",{attrs:{items:e.filtered?e.allSporteintragFilter:e.allSporteintrag},on:{changePage:e.onChangePage}}),n("v-container",{attrs:{fluid:""}},[n("v-row",{staticClass:"grey lighten-5 justify-center"},e._l(e.pageOfItems,(function(t,a){return n("exerciseCard",{key:a,class:t.category.name,attrs:{exerciseData:t,allUebung:e.allUebung}})})),1)],1)],1)],1)},o=[],s=(n("a4d3"),n("e01a"),n("d28b"),n("99af"),n("d81d"),n("a434"),n("accc"),n("3ca3"),n("ddb0"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return!1===e.exerciseData.markedDeleted?n("v-card",{staticClass:"ma-3 pa-4",attrs:{width:"300",height:"350",elevation:"10",raised:""}},[n("v-row",{staticClass:"pa-2",attrs:{justify:"space-between"}},[n("v-icon",{staticClass:"calicon"},[e._v(e._s(e.calenderIcon))]),!e.isEdit||e.exerciseData.id>0?n("div",{staticClass:"date"},[e._v(e._s(e.makeDateReadable()))]):e._e(),e.isEdit&&e.exerciseData.id<0?n("input",{directives:[{name:"model",rawName:"v-model",value:e.exerciseData.dateOfEntry,expression:"exerciseData.dateOfEntry"}],attrs:{type:"date"},domProps:{value:e.exerciseData.dateOfEntry},on:{input:function(t){t.target.composing||e.$set(e.exerciseData,"dateOfEntry",t.target.value)}}}):e._e(),n("v-menu",{staticClass:"moreicon",attrs:{"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on;return[n("v-btn",e._g({attrs:{icon:""}},a),[n("v-icon",[e._v(e._s(e.moreIcon))])],1)]}}],null,!1,45099705)},[n("v-list",{attrs:{dense:""}},[n("v-list-item",{on:{click:function(t){e.isEdit=!e.isEdit}}},[n("v-list-item-title",[e._v("Edit")])],1),n("v-list-item",{on:{click:function(t){return e.markDelete()}}},[n("v-list-item-title",[e._v("Delete")])],1)],1)],1)],1),n("v-row",{attrs:{justify:"center"}},[null!=e.exerciseData.category?n("v-card-title",{staticClass:"pa-0 ma-0",attrs:{justify:"center"}},[e._v(e._s(e.exerciseData.category.name))]):e._e()],1),n("ActualExercises",{attrs:{exercises:e.exerciseData.uebungseintragSet,isEdit:e.isEdit,cardID:e.exerciseData.id,category:e.exerciseData.category,possibleChoices:e.getUebungen()}}),n("v-divider"),!0===e.exerciseData.markedDeleted?n("p",[e._v("will be deleted")]):e._e(),e.isEdit&&e.exerciseData.id<0?n("v-textarea",{attrs:{filled:"","auto-grow":"",label:"Two rows",rows:"2","row-height":"20"},model:{value:e.exerciseData.commentOfTheDay,callback:function(t){e.$set(e.exerciseData,"commentOfTheDay",t)},expression:"exerciseData.commentOfTheDay"}}):e._e(),e._v(" "+e._s(e.showComment())+" "),e.exerciseData.id<0?n("v-icon",{staticClass:"botright"},[e._v(e._s(e.SyncOff))]):e._e()],1):e._e()}),c=[],l=(n("ac1f"),n("25f0"),n("1276"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[e._v("Warmup:")]),e._l(e.exercises,(function(t,a){return n("div",{key:a+"warm"},[t.isWorkout||t.markedDeleted?e._e():n("div",[e._v(" "+e._s(t.numberOfSets)+" x "+e._s(t.numberOfReps)+" "+e._s(t.exercise?t.exercise.name:"")+" "+e._s(t.markedDeleted?"del":"")+" "),e.isEdit?n("v-btn",{attrs:{icon:"",small:"",color:"red"},on:{click:function(n){return e.deleteExerciseEntry(t.id)}}},[n("v-icon",[e._v(e._s(e.minusIcon))])],1):e._e()],1)])})),e.isEdit?n("v-btn",{attrs:{icon:"",small:"",color:"green"},on:{click:function(t){e.newEntryFieldWarm=!e.newEntryFieldWarm}}},[n("v-icon",[e._v(e._s(e.plusIcon))])],1):e._e(),n("v-container",{attrs:{fluid:""}},[e.newEntryFieldWarm?n("v-row",{attrs:{align:"center"}},[n("v-text-field",{staticClass:"smallnumber mr-2",attrs:{"hide-details":!0,solo:"",dense:"",type:"number"},model:{value:e.newEntryObj.sets,callback:function(t){e.$set(e.newEntryObj,"sets",t)},expression:"newEntryObj.sets"}}),n("v-icon",{staticClass:"mr-2"},[e._v(e._s(e.timesIcon))]),n("v-text-field",{staticClass:"smallnumber mr-2",attrs:{"hide-details":!0,solo:"",dense:"",type:"number"},model:{value:e.newEntryObj.reps,callback:function(t){e.$set(e.newEntryObj,"reps",t)},expression:"newEntryObj.reps"}}),n("v-select",{staticClass:"mr-2 pa-0",attrs:{"hide-details":!0,dense:"","item-text":"name",items:e.possibleChoices,"item-value":"id",label:"Exercise",solo:""},on:{change:e.setExName},model:{value:e.newEntryObj.exID,callback:function(t){e.$set(e.newEntryObj,"exID",t)},expression:"newEntryObj.exID"}}),n("v-btn",{attrs:{icon:"",small:""},on:{click:function(t){return e.createExerciseEntry(!1,e.newEntryObj)}}},[n("v-icon",[e._v(e._s(e.checkIcon))])],1)],1):e._e()],1),n("div",[e._v("Workout:")]),e._l(e.exercises,(function(t,a){return n("div",{key:a+"work"},[t.isWorkout&&!t.markedDeleted?n("div",[e._v(" "+e._s(t.numberOfSets)+" x "+e._s(t.numberOfReps)+" "+e._s(t.exercise?t.exercise.name:"")+" "+e._s(t.markedDeleted?"del":"")+" "),e.isEdit?n("v-btn",{attrs:{icon:"",small:"",color:"red"},on:{click:function(n){return e.deleteExerciseEntry(t.id)}}},[n("v-icon",[e._v(e._s(e.minusIcon))])],1):e._e()],1):e._e()])})),e.isEdit?n("v-btn",{attrs:{icon:"",small:"",color:"green"},on:{click:function(t){e.newEntryFieldWork=!e.newEntryFieldWork}}},[n("v-icon",[e._v(e._s(e.plusIcon))])],1):e._e(),n("v-container",{attrs:{fluid:""}},[e.newEntryFieldWork?n("v-row",{attrs:{align:"center"}},[n("v-text-field",{staticClass:"smallnumber mr-2",attrs:{"hide-details":!0,solo:"",dense:"",type:"number"},model:{value:e.newEntryObj.sets,callback:function(t){e.$set(e.newEntryObj,"sets",t)},expression:"newEntryObj.sets"}}),n("v-icon",{staticClass:"mr-2"},[e._v(e._s(e.timesIcon))]),n("v-text-field",{staticClass:"smallnumber mr-2",attrs:{"hide-details":!0,solo:"",dense:"",type:"number"},model:{value:e.newEntryObj.reps,callback:function(t){e.$set(e.newEntryObj,"reps",t)},expression:"newEntryObj.reps"}}),n("v-select",{staticClass:"mr-2 pa-0",attrs:{"hide-details":!0,dense:"","item-text":"name",items:e.possibleChoices,"item-value":"id",label:"Exercise",solo:""},on:{change:e.setExName},model:{value:e.newEntryObj.exID,callback:function(t){e.$set(e.newEntryObj,"exID",t)},expression:"newEntryObj.exID"}}),n("v-btn",{attrs:{icon:"",small:""},on:{click:function(t){return e.createExerciseEntry(!0,e.newEntryObj)}}},[n("v-icon",[e._v(e._s(e.checkIcon))])],1)],1):e._e()],1)],2)}),u=[],d=n("94ed"),f=n("2c82");function p(){var e=Object(a["a"])(["\n  mutation newExEn($work: Boolean, $spEn: ID, $sets: Int, $reps: Int, $exID: Int, $exName: String) {\n    createExerciseEntry(isWorkout: $work, sportEntryId: $spEn, sets: $sets, reps: $reps, exID: $exID, exName: $exName) @client {\n      id\n      numberOfSets\n      numberOfReps\n      exercise {\n        id\n        name\n      }\n      isWorkout\n      markedDeleted @client\n      sportEntry {\n        id\n      }\n    }\n  }\n"]);return p=function(){return e},e}var m=Object(f["a"])(p());function g(){var e=Object(a["a"])(["\n  mutation($id: Int!) {\n    markDeleteExerciseEntry(id: $id) @client {\n      retID\n    }\n  }\n"]);return g=function(){return e},e}function v(){var e=Object(a["a"])(["\n  mutation($id: Int!) {\n    deleteExerciseEntry(id: $id) {\n      retID\n    }\n  }\n"]);return v=function(){return e},e}function b(){var e=Object(a["a"])(["\n  mutation($id: ID!) {\n    deleteExerciseEntryOffline(id: $id) @client {\n      id\n    }\n  }\n"]);return b=function(){return e},e}var y=Object(f["a"])(b()),h=Object(f["a"])(v()),x=Object(f["a"])(g());function S(){var e=Object(a["a"])(["\n  query {\n    allSporteintrag {\n      id\n      dateOfEntry\n      commentOfTheDay\n      category {\n        id\n        name\n      }\n      uebungseintragSet {\n        id\n        numberOfSets\n        numberOfReps\n        exercise {\n          id\n          name\n        }\n        isWorkout\n        markedDeleted @client\n      }\n      markedDeleted @client\n    }\n  }\n"]);return S=function(){return e},e}function O(){var e=Object(a["a"])(["\n  query ($filter: String) {\n    allSporteintragFilter (filter: $filter) @client {\n      id\n      dateOfEntry\n      commentOfTheDay\n      category {\n        id\n        name\n      }\n      uebungseintragSet {\n        id\n        numberOfSets\n        numberOfReps\n        exercise {\n          id\n          name\n        }\n        isWorkout\n        markedDeleted @client\n      }\n      markedDeleted @client\n    }\n  }\n"]);return O=function(){return e},e}function E(){var e=Object(a["a"])(["\n  query {\n    allSporteintrag @client {\n      id\n      dateOfEntry\n      commentOfTheDay\n      category {\n        id\n        name\n      }\n      uebungseintragSet {\n        id\n        numberOfSets\n        numberOfReps\n        exercise {\n          id\n          name\n        }\n        isWorkout\n        markedDeleted @client\n      }\n      markedDeleted @client\n    }\n  }\n"]);return E=function(){return e},e}var w=Object(f["a"])(E()),k=Object(f["a"])(O()),j=Object(f["a"])(S()),D={name:"ActualExercises",props:["exercises","isEdit","cardID","category","possibleChoices"],data:function(){return{plusIcon:d["j"],minusIcon:d["i"],timesIcon:d["c"],checkIcon:d["b"],newEntryFieldWarm:!1,newEntryFieldWork:!1,newEntryObj:{sets:0,reps:0,exID:0,exName:""}}},computed:{getExerciseName:function(){var e=[],t=!0,n=!1,a=void 0;try{for(var r,i=this.possibleChoices[Symbol.iterator]();!(t=(r=i.next()).done);t=!0){var o=r.value;e.push(o.name)}}catch(s){n=!0,a=s}finally{try{t||null==i.return||i.return()}finally{if(n)throw a}}return e}},methods:{setExName:function(e){var t=this;this.possibleChoices.forEach((function(n){n.id==e&&(t.newEntryObj.exName=n.name)}))},createExerciseEntry:function(e,t){this.newEntryFieldWarm=!1,this.newEntryFieldWork=!1,this.$apollo.mutate({mutation:m,variables:{work:e,spEn:this.cardID,sets:t.sets,reps:t.reps,exID:t.exID,exName:t.exName},update:function(e,t){var n=t.data.createExerciseEntry,a=e.readQuery({query:w});a.allSporteintrag.forEach((function(e){e.id===n.sportEntry.id&&e.uebungseintragSet.push(n)})),e.writeQuery({query:w,data:a})}})},deleteExerciseEntry:function(e){e<0?this.$apollo.mutate({mutation:y,variables:{id:e},update:function(e,t){var n=t.data.deleteExerciseEntryOffline,a=e.readQuery({query:w});for(var r in a.allSporteintrag)for(var i in a.allSporteintrag[r].uebungseintragSet)a.allSporteintrag[r].uebungseintragSet[i].id===n.id&&a.allSporteintrag[r].uebungseintragSet.splice(i,1);e.writeQuery({query:w,data:a})}}):this.$apollo.mutate({mutation:x,variables:{id:e}})}}},_=D,C=(n("8a4d"),n("2877")),I=n("6544"),$=n.n(I),q=n("8336"),F=n("a523"),U=n("132d"),P=n("0fd9"),V=n("b974"),A=n("8654"),H=Object(C["a"])(_,l,u,!1,null,"4acd59fc",null),L=H.exports;function W(){var e=Object(a["a"])(["\n  mutation($id: Int!) {\n    deleteSportEntry(id: $id) @client {\n      ok\n    }\n  }\n"]);return W=function(){return e},e}function T(){var e=Object(a["a"])(["\n  mutation($id: Int!) {\n    deleteSportEntry(id: $id) {\n      ok\n    }\n  }\n"]);return T=function(){return e},e}$()(H,{VBtn:q["a"],VContainer:F["a"],VIcon:U["a"],VRow:P["a"],VSelect:V["a"],VTextField:A["a"]});var N=Object(f["a"])(T()),R=Object(f["a"])(W()),Q={name:"ExerciseCard",props:["exerciseData","allUebung"],components:{ActualExercises:L},data:function(){return{isEdit:!1,moreIcon:d["g"],minusIcon:d["i"],calenderIcon:d["a"],SyncOff:d["l"],readableDate:""}},created:function(){},computed:{},methods:{getUebungen:function(){var e=this,t=[];return this.allUebung.filter((function(n){n.category.name===e.exerciseData.category.name&&t.push(n)})),t},showComment:function(){if(!this.isEdit)return this.exerciseData.commentOfTheDay},makeDateReadable:function(){var e=new Date(this.exerciseData.dateOfEntry),t=e.toString().split(" ")[0],n=e.getDate(),a=e.getMonth()+1,r=e.getYear()+1900;return this.readableDate=t+" "+n+"."+a+"."+r,this.readableDate},editMethod:function(e){return this.$refs.test[e]},markDelete:function(){var e=this.exerciseData.id;this.$apollo.mutate({mutation:R,variables:{id:e}})},deleteCard:function(){var e=this.exerciseData.id;this.$apollo.mutate({mutation:N,variables:{id:e},update:function(t,n){var a=n.data.deleteSportEntry;console.log(a);var r=t.readQuery({query:w});r.allSporteintrag=r.allSporteintrag.filter((function(t){return t.id!==e})),t.writeQuery({query:w,data:r})},optimisticResponse:{deleteSportEntry:{ok:!0,__typename:"DeleteSportEntry"}},context:{serializationKey:"CARDS"}})}}},B=Q,K=(n("be75"),n("b0af")),M=n("99d9"),J=n("ce7e"),z=n("8860"),Y=n("da13"),G=n("5d23"),X=n("e449"),Z=n("a844"),ee=Object(C["a"])(B,s,c,!1,null,null,null),te=ee.exports;function ne(){var e=Object(a["a"])(["\n  mutation($dateNow: String!) {\n    createSportEntry(createdAt: $dateNow) {\n      sportEntry {\n        id\n        dateOfEntry\n        commentOfTheDay\n        uebungseintragSet {\n          id\n        }\n        category {\n          id\n          name\n        }\n        markedDeleted @client\n      }\n    }\n  }\n"]);return ne=function(){return e},e}function ae(){var e=Object(a["a"])(["\n  mutation($dateNow: String!, $categoryID: Int!, $categoryName: String!) {\n    createSportEntryOffline(createdAt: $dateNow, categoryID: $categoryID, categoryName: $categoryName) @client {\n      sportEntry {\n        id\n        dateOfEntry\n        commentOfTheDay\n        uebungseintragSet {\n          id\n        }\n        category {\n          id\n          name\n        }\n        markedDeleted @client\n      }\n    }\n  }\n"]);return ae=function(){return e},e}$()(ee,{VBtn:q["a"],VCard:K["a"],VCardTitle:M["b"],VDivider:J["a"],VIcon:U["a"],VList:z["a"],VListItem:Y["a"],VListItemTitle:G["b"],VMenu:X["a"],VRow:P["a"],VTextarea:Z["a"]});var re=Object(f["a"])(ae());Object(f["a"])(ne());function ie(){var e=Object(a["a"])(["\n  query {\n    allUebung {\n      id\n      name\n      level\n      category {\n        id\n        name\n      }\n    }\n  }\n"]);return ie=function(){return e},e}var oe=Object(f["a"])(ie());function se(){var e=Object(a["a"])(["\nmutation ($sportCard: SportCard!) {\n    createOrUpdateCard(sportCard: $sportCard) {\n      newOrExistingSportCard {\n        id\n        dateOfEntry\n        commentOfTheDay\n        category {\n          id\n          name\n        }\n        uebungseintragSet {\n          id\n          numberOfSets\n          numberOfReps\n          exercise {\n            id\n            name\n          }\n          isWorkout\n          markedDeleted @client\n        }\n        markedDeleted @client\n      }\n    }\n  }\n  "]);return se=function(){return e},e}var ce=Object(f["a"])(se());function le(){var e=Object(a["a"])(["\nquery allCats {\n  allKategorie {\n    id\n    name\n  }\n}\n  "]);return le=function(){return e},e}var ue=Object(f["a"])(le()),de=n("05fb"),fe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[e._v("Convict Conditioning")])]),n("v-select",{attrs:{items:e.guide.map((function(e){return e.name}))},model:{value:e.CategoryName,callback:function(t){e.CategoryName=t},expression:"CategoryName"}}),e._l(e.showExercises(),(function(t,a){return n("v-card",{key:a,staticClass:"ma-3"},[n("v-card-title",[e._v(e._s(t.name))]),n("v-img",{attrs:{src:t.image}})],1)})),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(t){return e.$emit("closeModal")}}},[e._v("Close")])],1)],2)},pe=[],me={name:"guideModal",data:function(){return{CategoryName:"",guide:[{name:"Push-Ups",exercises:[{name:"01. Wall Push-Ups",image:n("5e52")},{name:"02. Incline Push-Ups",image:n("ea7e")},{name:"03. Kneeling Push-Ups",image:n("9bb2")},{name:"04. Half Push-Ups",image:n("b183")},{name:"05. Full Push-Ups",image:n("bd96")},{name:"06. Close Push-Ups",image:n("a8e3")},{name:"07. Uneven Push-Ups",image:n("5ee5")},{name:"08. Half One Arm Push-Ups",image:n("0140")},{name:"09. Lever Push-Ups",image:n("eb88")},{name:"10. One-Arm Push-Ups",image:n("5fc4")}]},{name:"Pull-Ups",exercises:[{name:"01. Vertical Pulls",image:n("fc31")},{name:"02. Horizontal Pulls",image:n("6ef6")},{name:"03. Jackknife Pulls",image:n("a340")},{name:"04. Half Pull-Ups",image:n("c690")},{name:"05. Full Pull-Ups",image:n("27f6")},{name:"06. Close Pull-Ups",image:n("2d31")},{name:"07. Uneven Pull-Ups",image:n("609e")},{name:"08. Half One Arm Pull-Ups",image:n("3d95")},{name:"09. Assisted Pull-Ups",image:n("ae8b")},{name:"10. One-Arm Pull-Ups",image:n("8506")}]},{name:"Bridges",exercises:[{name:"01. Short Bridges",image:n("447f")},{name:"02. Straight Bridges",image:n("cf97")},{name:"03. Angled Bridges",image:n("1dd2")},{name:"04. Head Bridges",image:n("290a")},{name:"05. Half Bridges",image:n("70b6")},{name:"06. Full Bridges",image:n("b9f1")},{name:"07. Wall Walking (Down)",image:n("5a3b")},{name:"08. Wall Walking (Up)",image:n("9acb")},{name:"09. Closing Bridges",image:n("369a")},{name:"10. Stand-To-Stand Bridges",image:n("fb8f")}]},{name:"Handstands",exercises:[{name:"01. Wall Headstands",image:n("1f92")},{name:"02. Crow Stands",image:n("91f0")},{name:"03. Wall Handstands",image:n("06a1")},{name:"04. Half Handstand Push-Ups",image:n("e7db")},{name:"05. Handstand Push-Ups",image:n("603e")},{name:"06. Close Handstand Push-Ups",image:n("576f")},{name:"07. Uneven Handstand Push-Ups",image:n("f3d9")},{name:"08. Half One-Arm Handstand Push-Ups",image:n("e4a8")},{name:"09. Lever Handstand Push-Ups",image:n("fe5d")},{name:"10. One-Arm Handstand Push-Ups",image:n("c622")}]},{name:"Leg Raises",exercises:[{name:"01. Knee Tucks",image:n("ad90")},{name:"02. Flat Knee Raises",image:n("d6c2")},{name:"03. Flat Bent Leg Raises",image:n("d460")},{name:"04. Flat Frog Raises",image:n("1be7")},{name:"05. Flat Straight Leg Raises",image:n("fcab")},{name:"06. Hanging Knee Raises",image:n("776d")},{name:"07. Hanging Bent Leg Raises",image:n("cda0")},{name:"08. Hanging Frog Raises",image:n("522a")},{name:"09. Partial Straight Leg Raises",image:n("ac06")},{name:"10. Hanging Straight Leg Raises",image:n("f4ca")}]},{name:"Squats",exercises:[{name:"01. Shoulderstand Squats",image:n("dc4f")},{name:"02. Jackknife Squats",image:n("860a")},{name:"03. Supported Squats",image:n("6017")},{name:"04. Half Squats",image:n("192e")},{name:"05. Full Squats",image:n("7b21")},{name:"06. Close Squats",image:n("be8e")},{name:"07. Uneven Squats",image:n("19dd")},{name:"08. Half One-Leg Squats",image:n("585c")},{name:"09. Assisted One-Leg Squats",image:n("34bb")},{name:"10. One-Leg Squats",image:n("76c0")}]}]}},methods:{showExercises:function(){var e,t=this;return this.guide.filter((function(n){n.name===t.CategoryName&&(e=n.exercises)})),e}}},ge=me,ve=n("adda"),be=n("2fa4"),ye=Object(C["a"])(ge,fe,pe,!1,null,null,null),he=ye.exports;$()(ye,{VBtn:q["a"],VCard:K["a"],VCardActions:M["a"],VCardTitle:M["b"],VImg:ve["a"],VSelect:V["a"],VSpacer:be["a"]}),window.addEventListener("load",(function(){window.history.pushState({},"")}));var xe={props:{source:String},components:{ExerciseCard:te,VOffline:de["a"],guideModal:he},data:function(){return{drawer:null,exampleData:[],allSporteintrag:[],allSporteintragFilter:[],plusIcon:d["j"],menuIcon:d["h"],syncIcon:d["k"],clearCacheIcon:d["f"],loadServerDataIcon:d["e"],closeIcon:d["d"],pageOfItems:[],filtered:!1,filter:"",onLine:!1,onlineSlot:"online",offlineSlot:"offline",snackbar:!1,dialog:!1}},created:function(){this.$apollo.addSmartQuery("queryOnlineData",{query:j,fetchPolicy:"network-only",update:function(e){return e.allSporteintrag},skip:!0}),this.$apollo.addSmartQuery("allUebungServer",{query:oe,fetchPolicy:"network-only",update:function(e){return e.allUebung},skip:!0}),this.$apollo.addSmartQuery("AllKategorieServer",{query:ue,fetchPolicy:"network-only",update:function(e){return e.allKategorie},skip:!0}),this.$apollo.addSmartQuery("AllFilteredEntries",{query:k,fetchPolicy:"network-only",update:function(e){return e.allSporteintragFilter},skip:!0})},computed:{},methods:{amIOnline:function(e){this.onLine=e,this.onLine||(this.snackbar=!0)},resetFilter:function(){this.filtered=!1,this.filter=""},setFilter:function(){this.filtered=!0,this.$apollo.queries.allSporteintragFilter.refetch({filter:this.filter})},onChangePage:function(e){this.pageOfItems=e},clearCache:function(){window.localStorage.clear(),window.location.reload()},fetchDataFromServer:function(){this.$apollo.queries.queryOnlineData.skip=!1,this.$apollo.queries.queryOnlineData.refresh(),this.$apollo.queries.allUebungServer.skip=!1,this.$apollo.queries.allUebungServer.refresh(),this.$apollo.queries.AllKategorieServer.skip=!1,this.$apollo.queries.AllKategorieServer.refresh(),this.$apollo.queries.AllFilteredEntries.skip=!1,this.$apollo.queries.AllFilteredEntries.refresh()},addCard:function(e){var t=this,n=(new Date).toISOString();this.$apollo.mutate({mutation:re,variables:{dateNow:n,categoryID:e.id,categoryName:e.name},update:function(e,t){var n=t.data.createSportEntryOffline,a=e.readQuery({query:w});a.allSporteintrag.unshift(n.sportEntry),e.writeQuery({query:w,data:a})}}).then((function(){t.filtered&&t.setFilter()})).catch((function(e){console.error(e)}))},syncCards:function(){var e=this,t=this.allSporteintrag.filter((function(e){if(e.id<0&&!e.markedDeleted)return e})),n=this.allSporteintrag.filter((function(e){if(e.id>0){var t=!0,n=!1,a=void 0;try{for(var r,i=e.uebungseintragSet[Symbol.iterator]();!(t=(r=i.next()).done);t=!0){var o=r.value;if(o.id<0)return e}}catch(s){n=!0,a=s}finally{try{t||null==i.return||i.return()}finally{if(n)throw a}}}}));n=n.map((function(e){return e.uebungseintragSet=e.uebungseintragSet.filter((function(e){if(e.id<0)return e})),e}));var a=t.concat(n),r=!0,i=!1,o=void 0;try{for(var s,c=function(){var t=s.value;e.$apollo.mutate({mutation:ce,variables:{sportCard:{id:t.id<0?null:t.id,createdAt:new Date(t.dateOfEntry).toISOString(),comment:t.commentOfTheDay,categoryID:t.category.id,listOfSets:t.uebungseintragSet.map((function(e){return{numberOfSets:e.numberOfSets,numberOfReps:e.numberOfReps,uebungsID:e.exercise.id,workout:e.isWorkout}}))}},update:function(e,n){var a=n.data.createOrUpdateCard,r=e.readQuery({query:w});r.allSporteintrag=r.allSporteintrag.filter((function(e){if(e.id>0)return e})),t.id<0?r.allSporteintrag.push(a.newOrExistingSportCard):r.allSporteintrag.forEach((function(e){e.id==a.newOrExistingSportCard.id&&(e.uebungseintragSet=a.newOrExistingSportCard.uebungseintragSet)})),e.writeQuery({query:w,data:r})}}).then((function(){e.filtered&&e.setFilter(),e.fetchDataFromServer()})).catch((function(e){console.error(e)}))},l=a[Symbol.iterator]();!(r=(s=l.next()).done);r=!0)c()}catch(j){i=!0,o=j}finally{try{r||null==l.return||l.return()}finally{if(i)throw o}}var u=this.allSporteintrag.filter((function(e){if(e.markedDeleted)return e})),d=!0,f=!1,p=void 0;try{for(var m,g=function(){var t=m.value;e.$apollo.mutate({mutation:N,variables:{id:t.id},update:function(e){var n=e.readQuery({query:w});n.allSporteintrag=n.allSporteintrag.filter((function(e){return e.id!==t.id})),e.writeQuery({query:w,data:n})},optimisticResponse:{deleteSportEntry:{ok:!0,__typename:"DeleteSportEntry"}},context:{serializationKey:"CARDS"}})},v=u[Symbol.iterator]();!(d=(m=v.next()).done);d=!0)g()}catch(j){f=!0,p=j}finally{try{d||null==v.return||v.return()}finally{if(f)throw p}}var b=[];this.allSporteintrag.forEach((function(e){e.uebungseintragSet.forEach((function(e){b.push(e)}))})),b=b.filter((function(e){if(e.markedDeleted)return e}));var y=!0,x=!1,S=void 0;try{for(var O,E=b[Symbol.iterator]();!(y=(O=E.next()).done);y=!0){var k=O.value;this.$apollo.mutate({mutation:h,variables:{id:k.id},update:function(e,t){var n=t.data.deleteExerciseEntry,a=e.readQuery({query:w});for(var r in a.allSporteintrag)for(var i in a.allSporteintrag[r].uebungseintragSet)a.allSporteintrag[r].uebungseintragSet[i].id==n.retID&&a.allSporteintrag[r].uebungseintragSet.splice(i,1);e.writeQuery({query:w,data:a})}}).then((function(){e.fetchDataFromServer()}))}}catch(j){x=!0,S=j}finally{try{y||null==E.return||E.return()}finally{if(x)throw S}}}},apollo:{allSporteintrag:{query:w,fetchPolicy:"cache-first"},allSporteintragFilter:{query:k,variables:{filter:"Pushups"},fetchPolicy:"cache-first"},allUebung:{query:oe,fetchPolicy:"cache-first"},allKategorie:{query:ue,fetchPolicy:"cache-first"}}},Se=xe,Oe=(n("034f"),n("7496")),Ee=n("40dc"),we=n("62ad"),ke=n("a75b"),je=n("169a"),De=n("1800"),_e=n("f774"),Ce=n("2db4"),Ie=n("2a7f"),$e=Object(C["a"])(Se,i,o,!1,null,null,null),qe=$e.exports;$()($e,{VApp:Oe["a"],VAppBar:Ee["a"],VBtn:q["a"],VCol:we["a"],VContainer:F["a"],VContent:ke["a"],VDialog:je["a"],VIcon:U["a"],VList:z["a"],VListItem:Y["a"],VListItemAction:De["a"],VListItemContent:G["a"],VListItemTitle:G["b"],VMenu:X["a"],VNavigationDrawer:_e["a"],VRow:P["a"],VSelect:V["a"],VSnackbar:Ce["a"],VToolbarTitle:Ie["a"]});var Fe=n("f309");r["a"].use(Fe["a"]);var Ue=new Fe["a"]({icons:{iconfont:"mdiSvg"},theme:{themes:{light:{primary:"#002B36",secondary:"#00C5A6",accent:"#FFF7D6",error:"#b71c1c"}}}}),Pe=n("74ca"),Ve=n("522d"),Ae=n("2bf2"),He=n("453b"),Le=n("478e"),We=n("0125"),Te=n("5404"),Ne=n.n(Te),Re=n("73fe"),Qe=n.n(Re),Be=n("d634"),Ke=n("9483");Object(Ke["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var Me=n("eb2e"),Je=n.n(Me);function ze(){var e=Object(a["a"])(["\n  extend type SporteintragType {\n    markedDeleted: Boolean\n  }\n  extend type UebungseintragType {\n    markedDeleted: Boolean\n  }\n"]);return ze=function(){return e},e}var Ye="http://localhost:8000/graphql",Ge=new Le["a"]({uri:Ye}),Xe=new We["a"]({attempts:{max:1/0}}),Ze=new Ne.a;window.addEventListener("offline",(function(){return Ze.close()})),window.addEventListener("online",(function(){return Ze.open()}));var et=new Qe.a,tt=Be["ApolloLink"].from([Ze,et,Xe,Ge]),nt=new Ae["a"]({});function at(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(Object(He["persistCache"])({cache:nt,storage:window.localStorage}));case 2:case"end":return e.stop()}}))}var rt=Object(f["a"])(ze());nt.writeData({data:{allSporteintrag:[]}});var it={Query:{allSporteintragFilter:function(e,t,n){var a=t.filter,r=n.cache,i=r.readQuery({query:w}),o=i.allSporteintrag.filter((function(e){if(e.category.name===a)return e}));return o}},Mutation:{createSportEntryOffline:function(e,t){var n=t.createdAt,a=t.categoryID,r=t.categoryName,i={createSportEntry:{sportEntry:{id:-Date.now(),dateOfEntry:n,commentOfTheDay:"",uebungseintragSet:[],category:{id:a,name:r,__typename:"KategorieType"},__typename:"SporteintragType"},__typename:"CreateSportEntry"}};return i.createSportEntry},deleteSportEntry:function(e,t,n){var a=t.id,r=n.cache,i=r.readQuery({query:w});return i.allSporteintrag.forEach((function(e){e.id===a&&(e.markedDeleted=!e.markedDeleted)})),r.writeQuery({query:w,data:i}),null},createExerciseEntry:function(e,t){var n=t.isWorkout,a=t.sportEntryId,r=t.sets,i=t.reps,o=t.exID,s=t.exName,c={id:-Date.now(),numberOfSets:r,numberOfReps:i,exercise:{id:o,name:s,__typename:"UebungType"},sportEntry:{id:a,__typename:"SporteintragType"},isWorkout:n,__typename:"UebungseintragType"};return c},deleteExerciseEntryOffline:function(e,t){var n=t.id,a={id:n,__typename:"notImportant"};return a},markDeleteExerciseEntry:function(e,t,n){var a=t.id,r=n.cache,i=r.readQuery({query:w});return i.allSporteintrag.forEach((function(e){e.uebungseintragSet.forEach((function(e){e.id===a&&(e.markedDeleted=!e.markedDeleted)}))})),r.writeQuery({query:w,data:i}),null}},SporteintragType:{markedDeleted:function(){return!1}},UebungseintragType:{markedDeleted:function(){return!1}}},ot=new Ve["a"]({defaultClient:new Pe["a"]({link:tt,cache:nt,typeDefs:rt,resolvers:it})});r["a"].config.productionTip=!1,r["a"].use(Ve["a"]),r["a"].component("jw-pagination",Je.a),at().then((function(){new r["a"]({vuetify:Ue,apolloProvider:ot,render:function(e){return e(qe)}}).$mount("#app")}))},"576f":function(e,t,n){e.exports=n.p+"static/img/06Close.86c6bc38.jpg"},"585c":function(e,t,n){e.exports=n.p+"static/img/08HalfOneLeg.9b524c01.jpg"},"5a3b":function(e,t,n){e.exports=n.p+"static/img/07WallWalkingDown.2245e942.jpg"},"5e52":function(e,t,n){e.exports=n.p+"static/img/01WallPushups.dc57fd1b.jpg"},"5ee5":function(e,t,n){e.exports=n.p+"static/img/07Uneven.dbf0e117.jpg"},"5fc4":function(e,t,n){e.exports=n.p+"static/img/10OneArm.3de45f16.jpg"},6017:function(e,t,n){e.exports=n.p+"static/img/03Supported.b13b3e8a.jpg"},"603e":function(e,t,n){e.exports=n.p+"static/img/05Full.2ae7fd8d.jpg"},"609e":function(e,t,n){e.exports=n.p+"static/img/07Uneven.3594575e.jpg"},"6ef6":function(e,t,n){e.exports=n.p+"static/img/02Horizontal.c1f2beed.jpg"},"70b6":function(e,t,n){e.exports=n.p+"static/img/05Half.a33616fa.jpg"},"76c0":function(e,t,n){e.exports=n.p+"static/img/10OneLeg.13ea46e8.jpg"},"776d":function(e,t,n){e.exports=n.p+"static/img/06HangingKnee.0bd4c1a2.jpg"},"7b21":function(e,t,n){e.exports=n.p+"static/img/05Full.0c5ec083.jpg"},"826f":function(e,t,n){},8506:function(e,t,n){e.exports=n.p+"static/img/10OneArm.9be2c170.jpg"},"860a":function(e,t,n){e.exports=n.p+"static/img/02Jackknife.dfefa1e1.jpg"},"8a4d":function(e,t,n){"use strict";var a=n("24b0"),r=n.n(a);r.a},"91f0":function(e,t,n){e.exports=n.p+"static/img/02CrowStands.b4b768dc.jpg"},"9acb":function(e,t,n){e.exports=n.p+"static/img/08WallWalkingUp.c97774be.jpg"},"9bb2":function(e,t,n){e.exports=n.p+"static/img/03Kneeling.b055c991.jpg"},a340:function(e,t,n){e.exports=n.p+"static/img/03Jackknife.d8759682.jpg"},a8e3:function(e,t,n){e.exports=n.p+"static/img/06Close.6e8e631d.jpg"},ac06:function(e,t,n){e.exports=n.p+"static/img/09PartialStraight.1c0acb39.jpg"},ad90:function(e,t,n){e.exports=n.p+"static/img/01Knee.25d64dd6.jpg"},ae8b:function(e,t,n){e.exports=n.p+"static/img/09Assisted.9824fe82.jpg"},b183:function(e,t,n){e.exports=n.p+"static/img/04Half.b850ed33.jpg"},b9f1:function(e,t,n){e.exports=n.p+"static/img/06Full.0dd6e6e0.jpg"},bd96:function(e,t,n){e.exports=n.p+"static/img/05Full.ae2285fd.jpg"},be75:function(e,t,n){"use strict";var a=n("826f"),r=n.n(a);r.a},be8e:function(e,t,n){e.exports=n.p+"static/img/06Close.51f700f3.jpg"},c622:function(e,t,n){e.exports=n.p+"static/img/10OneArm.d2fd3ad9.jpg"},c690:function(e,t,n){e.exports=n.p+"static/img/04Half.a184882e.jpg"},cda0:function(e,t,n){e.exports=n.p+"static/img/07HangingBentLeg.ebf80466.jpg"},cf97:function(e,t,n){e.exports=n.p+"static/img/02Straight.4b0d4b90.jpg"},d460:function(e,t,n){e.exports=n.p+"static/img/03FlatBendLeg.7e6e6393.jpg"},d6c2:function(e,t,n){e.exports=n.p+"static/img/02FlatKnee.34a0de53.jpg"},dc4f:function(e,t,n){e.exports=n.p+"static/img/01Shoulderstand.6ee02d9f.jpg"},e4a8:function(e,t,n){e.exports=n.p+"static/img/08HalfOneArm.c335a82f.jpg"},e7db:function(e,t,n){e.exports=n.p+"static/img/04HalfHandstand.b47c18a9.jpg"},ea7e:function(e,t,n){e.exports=n.p+"static/img/02Incline.0e51ec3c.jpg"},eb88:function(e,t,n){e.exports=n.p+"static/img/09Lever.1da65b8b.jpg"},f3d9:function(e,t,n){e.exports=n.p+"static/img/07Uneven.d762e366.jpg"},f4ca:function(e,t,n){e.exports=n.p+"static/img/10HangingStraight.3693bd35.jpg"},fb8f:function(e,t,n){e.exports=n.p+"static/img/10StandToStand.b617767c.jpg"},fc31:function(e,t,n){e.exports=n.p+"static/img/01Vertical.82f61e44.jpg"},fcab:function(e,t,n){e.exports=n.p+"static/img/05FlatStraight.3ecb521e.jpg"},fe5d:function(e,t,n){e.exports=n.p+"static/img/09Lever.284053af.jpg"}});
//# sourceMappingURL=app.cb884efb.js.map