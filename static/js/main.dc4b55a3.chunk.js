(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n(45)},22:function(e,t,n){},43:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var o=n(1),a=n.n(o),s=n(9),i=n.n(s),c=(n(22),n(10)),r=n(11),l=n(14),u=n(12),h=n(15),p=n(13),d=n.n(p),w=(n(43),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log(window.location.hash),window.location.hash.includes("#")&&d.a.get("https://www.googleapis.com/drive/v2/files?access_token="+window.location.hash.split("&")[0].split("=")[1]).then(function(t){var n=t.data;e.setState({response:n})})}},{key:"parseResponse",value:function(){}},{key:"render",value:function(){if(console.log(this.state.response),this.state.response&&this.state.response.items){var e=this.state.response.items.map(function(e){return a.a.createElement("li",null,e.title)});return a.a.createElement("div",null,a.a.createElement("ul",null,e))}return a.a.createElement("div",null,a.a.createElement("a",{href:"https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&include_granted_scopes=true&redirect_uri=http://localhost:3000&response_type=token&client_id=219412377030-f3vst5pe2d1srk8b6tjeaocdai04bfkf.apps.googleusercontent.com"},"Sign in"))}}]),t}(o.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[16,2,1]]]);
//# sourceMappingURL=main.dc4b55a3.chunk.js.map