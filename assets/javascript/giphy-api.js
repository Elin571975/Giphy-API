//=================================================================================    
//CREATE THE BUTTON FOR USER INPUT

//when submit is clicked with the new sport to add

$("#submit").on("click", function() {
   console.log("testing function to creat a button for user input");

   var userInput = $("#typeYourSport").val().trim();
   console.log("userInput is " + userInput);
   var newSportButton= $("<button>");
   newSportButton.addClass("sportButton");
   newSportButton.attr("data-sport", userInput).text(userInput);
   $(".buttons").append(newSportButton);
  
});

//==================================================================================    
//RUN FIXED BUTTONS

$(document).on("click", ".sportButton", function() {

   var sport = $(this).attr("data-sport");
   console.log("sport clicked is " + sport);
  
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + 
                          "&api_key=B4C4Uz1A6qhdu53KDjGi5Ixt6wVhy3yW&limit=10";
   
        $.ajax({
        url: queryURL,
        method: "GET"
      })
  
      .then(function(response) {
      
      // Storing an array of results in the results variable
      var results = response.data;
      console.log(results);
        
      for (var i = 0; i < results.length; i++) {
      
         var individualGifDiv = $("<div>");
  
         // Storing the result item's rating
         var rating = results[i].rating;
           
         var p = $("<p>").text("Rating: " + rating);
        
         var sportImage = $("<img>");
         
         // Giving the image tag an src attribute of a proprty pulled off the result item
         sportImage.addClass("gif-image");
         sportImage.attr("src", results[i].images.fixed_height.url);

         // Attribute of motion
         sportImage.attr("state", "still");
         sportImage.attr("still-data", results[i].images.fixed_height_still.url);
         sportImage.attr("animated-data", results[i].images.fixed_height.url);        

         // Appending the paragraph and personImage we created to the "gifDiv" div we created
         individualGifDiv.append(p);
         individualGifDiv.append(sportImage);
  
         $(".gifs-container").prepend(individualGifDiv);
        }

      //Clicking to change state  
      $(".gif-image").unbind("click");
      $(".gif-image").on("click", function(){
         if($(this).attr("state") === "still") {
         $(this).attr("state", "animated");
         $(this).attr("src", $(this).attr("animated-data"));
                }
       else {
          $(this).attr("state", "still");
          $(this).attr("src", $(this).attr("still-data"));
          }
         });

      }); 
 
   });   





