var AdminIndex=function(){var c=new Object();var b="SESSION_STORAGE_LAST_HASH";var a=function(){var e=$("#header_notification_bar");if(e.size()>0){e.ajaxJsonUrl("/admin/notify-message/count",function(g){var h=g.data;if(h>0){var j="<a href='#/admin/profile/notify-message?readed=no'>您有 "+h+" 条未读公告信息</a>";$(".message-info",e).html(j);$(".badge",e).html(h).show()}else{var j="<a href='#/admin/profile/notify-message' data-path='公告信息列表'>暂无未读，点击查看公告信息列表</a>";$(".message-info",e).html(j);$(".badge",e).html(0).hide()}$(".number-notify-message-count").html(h)})}var f=$("#header_inbox_bar");if(f.size()>0){f.ajaxJsonUrl("/admin/account-message/count",function(g){var h=g.data;if(h>0){var j="<a href='#/admin/profile/account-message?readed=no'>您有 "+h+" 条未读个人消息</a>";$(".message-info",f).html(j);$(".badge",f).html(h).show()}else{var j="<a href='#/admin/profile/account-message'>暂无未读，点击查看个人消息列表</a>";$(".message-info",f).html(j);$(".badge",f).html(0).hide()}$(".number-user-message-count").html(h)})}};var d=function(){c["/admin/dashboard"]="Dashboard";if(sessionStorage.getItem(b)){var f=JSON.parse(sessionStorage.getItem(b));c[f.uri]=f.path}if(Config.isDebugEnable()){console.log("Init HASH_MAPPING_DATA: "+JSON.stringify(c))}var e=$(".page-sidebar-menu");if(e.size()>0){var g=function(l,n){var k=l.initOpen?(l.url?"":"open"):"";var m=l.active?"active":"";var i=l.url?"/admin":"javascript:;";var o=l.name;var j=false;if(l.url){j=(Pinyin.getCamelChars(o)+"").toLowerCase()}var h='<li data-id="'+l.id+'" data-parent="'+l.parent.id+'" class="nav-item '+m+" "+k+'" data-path="'+n+'">';h+='<a  data-path="'+n+'"';h+=(j?' data-py="'+j+'"':"");h+=' href="'+(l.url?"#"+l.url:"javascript:;")+'"';h+=' class="nav-link '+(l.url?"":" nav-toggle")+'"';h+=">";if(l.style){h+='<i class="fa '+l.style+'"></i>'}else{if(l.depth==1){h+='<i class="fa fa-cogs"></i>'}else{if(l.url){h+='<i class="fa fa-dot-circle-o"></i>'}else{h+='<i class="fa fa-ellipsis-vertical"></i>'}}}if(l.depth==1){h+='<span class="title">'+o+"</span>";h+='<span class="selected"></span>'}else{h+=o}if(!l.url){h+='<span class="arrow  '+k+'"></span></a></li>'}h+="</a></li>";return h};e.ajaxJsonUrl("/admin/menus",function(i){$.each(i,function(k,l){if(l.depth==1){e.append(g(l,l.name))}else{var n=e.find("li[data-id='"+l.parent.id+"']");var j=n.find("> ul.sub-menu");if(j.size()==0){j=$('<ul class="sub-menu" style="display: '+(n.is(".open")?"block":"none")+';">').appendTo(n)}var m=n.attr("data-path")+":"+l.name;j.append(g(l,m))}});if(sessionStorage.getItem(b)){var h=JSON.parse(sessionStorage.getItem(b));$.address.value(h.uri)}else{$.address.value("/admin/dashboard")}});$("body").on("click",'a[href^="#/"]',function(k){var h=$(this);var j=h.attr("href").replace("#","");var i=h.data("path");if(i===undefined){i=h.text()}c[j]=i;if(Config.isDebugEnable()){console.log("Updated HASH_MAPPING_DATA: "+JSON.stringify(c))}$.address.value(j)});$.address.change(function(i){var l=i.value;if(l==""||l=="/"||!Util.startWith(l,"/")){return false}AdminIndex.addOrActivePanel(l);var k=$('.page-sidebar-menu li.nav-item > a[href^="#'+l+'"]');if(k.size()>0){var h=$(".page-sidebar-menu").find("li");var j=c[l];h.each(function(){var m=$(this);m.removeClass("active");if(Util.startWith(j+":",m.data("path")+":")){m.addClass("active");m.children(".sub-menu").show()}});return true}});$('.sidebar-search input[name="search"]').autocomplete({autoFocus:true,source:function(j,h){var i=e.find("a[data-py]");return h(i.map(function(){var n=j.term.toLowerCase();var k=$(this);var m=k.text();var l=k.attr("data-py");if(l.indexOf(n)>-1||m.indexOf(n)>-1){return{label:$.trim(m),link:k,href:k.attr("href")}}}))},minLength:1,select:function(i,j){var h=j.item;$(this).parent().find(".submit").data("link",h.link);h.link.click();return true}}).focus(function(){$(this).select()}).val("").focus();$('.sidebar-search input[name="search"]').parent().find(".submit").click(function(){var h=$(this).data("link");if(h){h.click()}return false})}};return{init:function(){d();var f=$("div.page-content");if(f.size()>0){var g=$(window).height()-f.offset().top-$("div.footer").outerHeight()-8;f.css({"min-height":g})}$(".theme-panel .theme-options").find("select").each(function(){$(this).val($(this).attr("data-selected")).change()});var e=$(window).height()-$("body > .header").height()-$("body > .footer").height()-15;$(".page-container > .page-content").css({"min-height":e+"px"});$("#a-logout").click(function(){Global.confirm("注销登录","确认注销当前登录吗？",function(){sessionStorage.removeItem("SESSION_STORAGE_LAST_HASH");window.location.href=Util.smartParseURL("/admin/logout")})});$("div#portlet-layout > .portlet-title-layout > .tools > .reload").click(function(l){var h=$("div#portlet-layout").find(" > .portlet-body > .portlet-tabs");var k=h.find("> .nav > li.active > a");var j=h.find(k.attr("href"));var i=k.attr("data-url");j.ajaxGetUrl(i)});$("div#portlet-layout > .portlet-title-layout > .tools > .reload").click(function(l){var h=$("div#portlet-layout").find(" > .portlet-body > .portlet-tabs");var k=h.find("> .nav > li.active > a");var j=h.find(k.attr("href"));var i=k.attr("data-url");j.ajaxGetUrl(i)});jQuery("body").on("click","#layout-nav .btn-close-active",function(k){var j=$("#layout-nav");var i=j.next(".tab-content").find(".panel-content:visible").attr("data-url");var h=j.find(" > .btn-group > ul.dropdown-menu");h.find("a[href='"+i+"']").find(".badge").click()});jQuery("body").on("click","ul.nav > li.tools > .reload",function(l){l.preventDefault();var h=$(this).closest(".nav");var k=h.find("li.active > a");var j=h.closest(".tabbable").find(k.attr("href"));if(k.attr("data-url")){var i=k.attr("data-url");j.ajaxGetUrl(i,function(){j.find(".tabbable:first > .nav > li.active > a").click()})}else{if(jQuery().jqGrid){j.find("table.ui-jqgrid-btable").each(function(){var m=$(this);m.trigger("clearToolbar");var n=m.attr("data-url");m.jqGrid("setGridParam",{datatype:"json",url:n}).trigger("reloadGrid")})}}});jQuery("body").on("click","tbody.select-table-checkbox",function(i){var h=$(this).find(".table-checkbox :checkbox");if(!(h.is(i.target)||h.find(i.target).length)){h.attr("checked",!h.is(":checked"))}});a();setTimeout(function(){a()},10*60*1000)},updateMessageCount:function(){a()},addOrActivePanel:function(g){var o=c[g];if(o==undefined){o=""}sessionStorage.setItem(b,JSON.stringify({uri:g,path:o}));var e=Util.smartParseURL(g);var l=o.split(":");var h=l[l.length-1];var o='<li><a href="#/admin/dashboard" class="btn-dashboard" data-path="Dashboard"><i class="fa fa-home"></i> 首页 </a></li> ';var j=$("#layout-nav");$.each(l,function(q,p){p=p;if(q<l.length-1){o+='<li class="hidden-inline-xs"><i class="fa fa-angle-right"></i> '+p+" </li>"}else{o+='<li class="hidden-inline-xs"><i class="fa fa-angle-right"></i> <a class="reload" href="javascript:;">'+p+"</a> </li>"}});j.children(".page-breadcrumb").html(o);var i=j.next(".tab-content");var n=i.find("> div[data-url='"+e+"']");if(n.length==0){n=$('<div data-url="'+e+'" class="panel-content"></div>').appendTo(i);n.ajaxGetUrl(e)}else{n.show()}i.find("> div").not(n).hide();var f=j.find(" > .page-toolbar > .btn-group > ul.dropdown-menu");var k=f.find("> li > a[rel='address:"+g+"']");if(k.length==0){k=$('<a href="javascripts:;" rel="address:'+g+'">'+h+'<span class="badge badge-default">X</span></a>').appendTo(f).wrap("<li/>");k.find(".badge").click(function(r){r.preventDefault();r.stopPropagation();var q=false;n.find("form[method='post']:not(.form-track-disabled)[form-data-modified='true']").each(function(){var t=$(this);if(!confirm("当前表单有修改数据未保存，确认离开当前表单吗？")){q=true;return false}});if(!q){k.parent("li").remove();n.remove();var p=1;f.find("> li").not(k).each(function(){var t=$(this).attr("count");if(t){if(Number(t)>p){p=Number(t)}}});var s=f.find("> li[count='"+p+"'] > a");if(s.length>0){s.click()}else{$("#layout-nav >  li > .btn-dashboard").click()}}})}var m=1;f.find("> li").each(function(){$(this).removeClass("active");var p=$(this).attr("count");if(p){if(Number(p)>m){m=Number(p)}}});k.parent("li").addClass("active");k.parent("li").attr("count",m+1);j.find("> ul.page-breadcrumb a.reload").click(function(p){p.preventDefault();n.ajaxGetUrl(e)})}}}();