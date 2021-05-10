// import $ from 'jquery';

// (function($){
//     jQuery.fn.responsiveBlock = function(options){
//       options = $.extend({
//         defColor:"white", //цвет элемента над которым нет курсора
//         hoverColor:"red" //цвет элемента на который наведен курсор
//       }, options);

//       var make = function(){
//         // здесь переменная this будет содержать отдельный
//         // DOM-элемент, к которому и нужно будет применить
//         // воздействия плагина
//         $(this).css("background-color",options.defColor)
//         .mouseenter( function(){
//           $(this).css("background-color",options.hoverColor);
//         })
//         .mouseleave( function(){
//           $(this).css("background-color",options.defColor);
//         });
//       };

//       return this.each(make);
//     };
//   })(jQuery);

// // $('div').responsiveBlock();
