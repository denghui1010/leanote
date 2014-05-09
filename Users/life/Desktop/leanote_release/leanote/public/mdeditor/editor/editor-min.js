new function($){$.fn.setCursorPosition=function(pos){if($(this).get(0).setSelectionRange){$(this).get(0).setSelectionRange(pos,pos)}else if($(this).get(0).createTextRange){var range=$(this).get(0).createTextRange();range.collapse(true);range.moveEnd("character",pos);range.moveStart("character",pos);range.select()}$(this).focus()};$.fn.tabHandler=function(){$(this).keydown(function(e){if(e.keyCode===9){var start=this.selectionStart;var end=this.selectionEnd;var $this=$(this);var value=$this.val();$this.val(value.substring(0,start)+"    "+value.substring(end));this.selectionStart=this.selectionEnd=start+4;e.preventDefault()}})}}(jQuery);(function(){$("#wmd-input").tabHandler();var converter1=Markdown.getSanitizingConverter();Converter=converter1;Markdown.Extra.init(converter1,{extensions:["tables","fenced_code_gfm","def_list"],highlighter:"prettify"});bindMathJaxHooks(converter1);var markdownHelp=function(){window.open("http://www.leanote.com/blog/view/531b263bdfeb2c0ea9000002");return};var options={helpButton:{handler:markdownHelp},strings:Markdown.local.zh};var editor1=new Markdown.Editor(converter1,null,options);MarkdownEditor=editor1;var scrollLink=getScrollLink();ScrollLink=scrollLink;scrollLink.onLayoutCreated();editor1.hooks.chain("onPreviewRefresh",function(){$("pre").addClass("prettyprint linenums");prettyPrint();var counter=0;var nbAsyncPreviewCallback=2;function tryFinished(){if(++counter===nbAsyncPreviewCallback){scrollLink.onPreviewFinished()}}$("#wmd-preview").waitForImages(tryFinished);if(typeof MathJax!="undefined"){MathJax.Hub.Queue(["Typeset",MathJax.Hub,"wmd-preview"]);MathJax.Hub.Queue(tryFinished)}else{scrollLink.onPreviewFinished()}});scrollLink.onEditorConfigure(editor1);function popupEditorDialog(title,body,imageClass,placeholder){$("#editorDialog").find(".modal-body input").val("");$("#editorDialog").find(".modal-body input").attr("placeholder",placeholder);$("#editorDialog").find("#editorDialog-title").text(title);$("#editorDialog").find(".modal-body p").text(body);$("#editorDialog").find(".modal-body i").removeClass().addClass(imageClass);$("#editorDialog").modal({keyboard:true})}editor1.hooks.set("insertLinkDialog",function(callback){popupEditorDialog("链接","请输入链接地址","fa fa-link",'http://example.com/ "可选标题"');editorDialogCallback=callback;return true});var editorDialogCallback=null;editor1.hooks.set("insertImageDialog",function(callback){popupEditorDialog("图片","请输入图片地址","fa fa-picture-o",'http://example.com/images/diagram.jpg "可选标题"');editorDialogCallback=callback;return true});$("#editorDialog").on("hidden.bs.modal",function(){if(editorDialogCallback){var url=$("#editorDialog-confirm").data("url");if(url){$("#editorDialog-confirm").removeData("url");editorDialogCallback(url)}else{editorDialogCallback(null)}}});$("#editorDialog-confirm").click(function(event){var url=$("#editorDialog").find(".modal-body input").val();if(url){$(this).data("url",url)}$("#editorDialog").modal("hide")});$("#editorDialog").on("shown.bs.modal",function(){$("#editorDialog").find(".modal-body input").focus()});documentContent=undefined;var previewWrapper;previewWrapper=function(makePreview){var debouncedMakePreview=_.debounce(makePreview,500);return function(){if(documentContent===undefined){makePreview();documentContent=""}else{debouncedMakePreview()}}};$(window).resize(function(){scrollLink.buildSections()});mainHandler();function mainHandler(data){var article=null;var cursorPosition=0;editor1.run(previewWrapper);$("#wmd-bold-button > span").addClass("fa fa-bold");$("#wmd-italic-button > span").addClass("fa fa-italic");$("#wmd-link-button > span").addClass("fa fa-link");$("#wmd-quote-button > span").addClass("fa fa-quote-left");$("#wmd-code-button > span").addClass("fa fa-code");$("#wmd-image-button > span").addClass("fa fa-picture-o");$("#wmd-olist-button > span").addClass("fa fa-list-ol");$("#wmd-ulist-button > span").addClass("fa fa-list-ul");$("#wmd-heading-button > span").addClass("fa fa-list-alt");$("#wmd-hr-button > span").addClass("fa fa-minus");$("#wmd-undo-button > span").addClass("fa fa-undo");$("#wmd-redo-button > span").addClass("fa fa-repeat");$("#wmd-help-button > span").addClass("fa fa-question-circle");function buttonBinding(rowClassName,spanClassName){$(rowClassName).hover(function(){$(spanClassName).animate({color:"#F9F9F5"},400)},function(){$(spanClassName).animate({color:"#BBBBBB"},400)});$(spanClassName).hover(function(){$(this).addClass("icon-large")},function(){$(this).removeClass("icon-large")})}buttonBinding(".wmd-button-row",".wmd-button > span");buttonBinding(".preview-button-row",".preview-button > span");function getCurrentMode(){var currentMode={isFullEditor:false,isFullReader:false,isEditorReader:false};return currentMode}browserType={isIE:/msie/.test(window.navigator.userAgent.toLowerCase()),isIE_5or6:/msie 6/.test(window.navigator.userAgent.toLowerCase())||/msie 5/.test(window.navigator.userAgent.toLowerCase()),isOpera:/opera/.test(window.navigator.userAgent.toLowerCase()),isFirefox:/firefox/.test(window.navigator.userAgent.toLowerCase()),isChrome:/(chrome|chromium)/.test(window.navigator.userAgent.toLowerCase())};var keyEvent="keydown";if(browserType.isOpera||browserType.isFirefox){keyEvent="keypress"}$(document).on(keyEvent,function(key){if((key.ctrlKey||key.metaKey)&&!key.shiftKey){var currentMode=getCurrentMode();var keyCode=key.charCode||key.keyCode;var keyCodeStr=String.fromCharCode(keyCode).toLowerCase();switch(keyCodeStr){default:return}if(key.preventDefault){key.preventDefault()}if(window.event){window.event.returnValue=false}}});var currentMode=getCurrentMode();if(currentMode.isFullEditor){$("#wmd-input").setCursorPosition(cursorPosition);switchFullEditorMode()}else if(currentMode.isFullReader){switchFullReaderMode()}else{$("#wmd-input").setCursorPosition(cursorPosition)}}})();