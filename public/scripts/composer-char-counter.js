$(document).ready(function() {
  


  $("#tweet-text").on("input", function() {
    
   let field = $("textarea");
   $(".counter").val(140 - field.val().length);
   $(".counter").css('color', 'charcoal');

   if ($(".counter").val() <= 0) {
    $(".counter").css('color', 'red');
   } else if ($(".counter").val() > 0) {
     $(".counter").css('color', 'charcoal');
   }
  
});
});


