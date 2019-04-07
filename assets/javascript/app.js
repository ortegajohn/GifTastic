
var animals = ["bear", "lion","tiger","rabbit"];


function renderButtons() {
    // event.preventDefault();
    console.log("renderButtons")
$(".buttons-view").empty();
for(i=0;i<animals.length;i++){
  let a = $("<button>")
    a.addClass("animal")
    a.attr("data-name",animals[i])
    a.text(animals[i])
    $(".buttons-view").append(a)
    console.log("animals[i]: ",animals[i])
    }

}

$("#add-animal").on("click", function() {
    event.preventDefault();
    var animal_add = $("#button-input").val().trim();
    // var movie = $("#movie-input").val();
    // YOUR CODE GOES HERE

    if(animals.indexOf(animal_add) > -1){
        animal_add = animals;
    }else{
        animals.push(animal_add);
    }
    // movies.push(movie);
    renderButtons();
    $("#button-input").val("")

  });

  renderButtons();

  $(document).on("click",".animal", function() {
      console.log("click: animal")

    //end point to getimages
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";

    //starting ajax method and passing two paramaters
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        // $(".gif_area").empty()

        var results = response.data;
    
        for (var i = 0; i < results.length; i++) {
            console.log(results);
            var animalDiv = $("<div>");
            animalDiv.addClass("click_to_move");
            var p1 = $("<p1>");
            p1 = $("<p1>").text("Rating: " +results[i].rating);//add rating

            var p2 = $("<p2>");
            p2 = $("<p2>").text("Title: " +results[i].title);//add rating


            var download_button = $("<button>");
            download_button.addClass("download_giph");
            download_button.text("Download");

            var aa = results[i].images.fixed_height.url
            var aaa =""

              for (ii = 0; ii < aa.length; ii++){
                if(aa[ii] ==="?"){
                   break
                }else{
                  aaa = aaa + aa[ii];
                }
                
              }
            download_button.attr("path",aaa)


            

            var animalImage = $("<img>");


            animalImage.attr("src", results[i].images.fixed_height_still.url);//set image src
            animalImage.attr("giph_still", results[i].images.fixed_height_still.url);//set image still
            animalImage.attr("giph_animate", results[i].images.fixed_height.url);//set image animate
            animalImage.attr("giph_state", "still");//set image state
            animalImage.attr("class", "giph");//set image state
            animalImage.attr("id","ID_"+i)

            // var text = "DOWNLOAD";
            // var className = "btn";

            // animalImage.addDownloadBtn(text, className);



            //download https://www.w3schools.com/howto/tryit.asp?filename=tryhow_html_download_link

            //append to page            
            animalDiv.append(animalImage);
            animalDiv.append("</br>");
            animalDiv.append(p1);
            animalDiv.append("</br>"); 
            animalDiv.append(p2); 
            animalDiv.append("</br>"); 
            animalDiv.append(download_button);
            $(".gif_area").prepend(animalDiv);




            // $(".download_giph").wrap('<a href="'+results[i].images.fixed_height.url +'" download></a>')
            // $(".download_giph").wrap('<a href="'+aaa +'" target="_blank"  download></a>')
            // $(".download_giph").wrap('<a href="'+aaa +'" target="_blank" download ='+aaa+'></a>')

        }




            });//.then
        });//.animal on click


        $(document).on("click",".giph", function(e) {

            state = $(this).attr("giph_state")
            console.log(".giph: ",state)
            if(state === 'still'){
                $(this).attr("src",$(this).attr('giph_animate'))
                $(this).attr('giph_state','animate')
              } else {
                $(this).attr("src",$(this).attr('giph_still')) 
                $(this).attr('giph_state','still')
        
              }
              console.log(e)



        });


        $(document).on("click","#clear_giph", function() {

                $(".gif_area").empty()
        });


        // $(".download_giph").wrap('<a href="'+aaa +'" target="_blank" download ='+aaa+'></a>')
        $(document).on("click",".download_giph", function(e) {
          e.preventDefault();  
            console.log("Click Download: ",$(this).attr("path"))
            // console.log("toDataURL: ",$(this).attr("path").toDataURL() )

  
            // var a = $("<a>")
            // .attr("href", $(this).attr("path"))
            // .attr("download", "img.png")
            // .attr("target","_blank")
            // .appendTo("body");        
            // a[0].click();   
            // console.log("a: ",a)
            // a.remove();

            // var xhr = new XMLHttpRequest();
            //   xhr.open("GET", $(this).attr("path"));
            //   xhr.responseType = "arraybuffer";

            //   xhr.onload = function () {
            //     console.log("xhr.onload: ",this)
            //       if (this.status === 200) {
            //           var blob = new Blob([xhr.response], {type: "application/gif"});
            //           var objectUrl = URL.createObjectURL(blob);
            //           window.open(objectUrl);
                      
            //           console.log("blob: ",blob)
            //           console.log("objectUrl: ",objectUrl)
            //           var url2 = objectUrl
            //           var a2 = document.createElement('a');
            //           a2.href = url2
            //           a2.download = '';
            //           a2.click();
            //           window.URL.revokeObjectURL(url2);

            //       }
            //   };
            //   xhr.send();
              downloadLink($(this).attr("path"))



      });
      $(document).on("click","#giph_control", function(e) {
        e.preventDefault(); 
              var link = document.getElementById('giphy_Con');
              console.log("giph_control: ",giph_control)
              link.click();


           });

           $(document).ready(function() {
            console.log( "ready!" );
            var link1 = document.getElementById('giphy_Con');
            link1.click();
            setTimeout(function(){ 

              var link2 = document.getElementById('ZZ');
              link2.click();
            }, 1);  
            // var link2 = document.getElementById('ZZ');
            // link2.click();



            // Just making the giphy conroles work on a short timeline.
            // $("#ZZ").hide()
            // $("#giphy_Con").hide()

        });
      
         
        function downloadLink(url){  
          console.log("downloadLink");

          // let parent =$(this).parent();
          // downloadLink = parent.attr("giph_animate");
          console.log("downloadLink: ",downloadLink);
          $.ajax({
              url:url,
              method:"GET",
              xhrFields: {
                  responseType: 'blob'
              }
          }).then(function(data){
              
              var binaryData = [];
              binaryData.push(data);
              var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/gif"}))
              console.log("url: ",url)
              //mobile support: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
              var a = document.createElement('a');
              a.href = url
              a.download = '';
              a.click();
              window.URL.revokeObjectURL(url);
              a.remove()
          })
      } 



      