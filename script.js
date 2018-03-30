const LYRICS_URL = "https://private-anon-b1f27724d6-lyricsovh.apiary-proxy.com/v1";
const SWEARS_URL = "https://cryptic-badlands-95093.herokuapp.com/";
const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";

window.addEventListener('error', function(e) {
    console.log(e);
    console.log(e.target);
}, true);

function getDataFromApi(artist, title, callback) {
   
    const newURL = `${LYRICS_URL}/${artist}/${title}`;
    $.getJSON(newURL, callback);
    const youTubeString = `${artist} - ${title}`;
    getYoutubeDataFromApi(youTubeString, displayYoutubeApiData);
}

function getYoutubeDataFromApi(song, callback3) {
    const query = {
        key: "AIzaSyCOFx-c_YF08zb4utaaxy4yaTrmiR80xaY",
        q: song,
        part: 'snippet'
       };
        $.getJSON(YOUTUBE_URL, query, callback3);

    
   
}
function displayYoutubeApiData(data3) {
    if ( data3.items.length > 0) {
        
    
    console.log(data3);
    const displayTitle = data3.items[0].snippet.title;
    const videoUrl = data3.items[0].id.videoId;
    console.log(displayTitle);
    

    $(".title").html(`<h2>${displayTitle}</h2>`);
    $(".js-search-results").html(`<iframe class="video" src="https://www.youtube.com/embed/${videoUrl}" frameborder="0"" allowfullscreen></iframe>`);
    $(".main-title").hide();
    $(".submit").html("Search Again");
    }
    else {
        $(".title").html('<h2>There are no results. Please try again!</h2>');
    }
}

function getSwearApi(lyrics, callback2) {
    const query = {
        userId: "ryanmeeks613",
        apiKey: "jBv4yT3h3R2TOiy1jxtHj456q6C7mTmN6xsc2aTrbMax3ue8",
        content: lyrics,
        "output format": "JSON",
        "censor-character": "%"
    }
    $.getJSON(SWEARS_URL, query, callback2);

}
    
function displaySwearApiData(data) {
    
    const count = data['bad-words-total'];
    const swearWords = data['bad-words-list'].join(", ");
    
    if (count === 0) {
        $(".swear-results").html("<h2><strong>No Swears! Play Away!</strong></h2>");
        $("h2").removeClass().addClass("green");
    }

    else {
        $(".swear-results").html(`<p><strong>WARNING!!</strong> This song contains ${count} swear words. They are ${swearWords}`);
        $("h2").removeClass().addClass("red");
    }
}

function displaySearchData(data2) {
 const results = data2.lyrics;
 
 getSwearApi(results, displaySwearApiData);
      $(".js-search-results").append(results);

 console.log(data2);
}

//watches for the form to be submitted
function watchSubmit() {
  $('.js-search-form').submit(event => {
    //prevent it from resetting
    event.preventDefault();
    //save as constants to clear out form after submission.
    $(".title").empty();
    $(".js-search-results").empty();
    $(".swear-results").empty();
    const artistInput = $(this).find('.input-artist');
    const titleInput = $(this).find('.input-title');
    const artist = artistInput.val().trim();
    const title = titleInput.val().trim();
    artistInput.val('');
    titleInput.val('');
    
    getDataFromApi(artist, title, displaySearchData);
  });
}


$(watchSubmit);

//make function to call api,
// look at the output..
// figure out how to put it on the screen. 