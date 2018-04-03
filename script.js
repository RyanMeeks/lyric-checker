const LYRICS_URL = "https://api.lyrics.ovh/v1";
const SWEARS_URL = "https://cryptic-badlands-95093.herokuapp.com/";
const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";
let youTubeScore = false;
let lyricCheckerScore = false;

//API Call to GET lyrics using ajax
function getLyricDataFromApi(artist, title, callback)   {
    const settings = {
        url: `${LYRICS_URL}/${artist}/${title}`,
        datatype: 'json',
        type: 'GET',
        success: callback,
        error: function(err) {
            lyricCheckerScore = true;
            noResults(lyricCheckerScore);
        }
    };
    $.ajax(settings);
    console.log(settings);
    const youTubeString = `${artist} - ${title}`;
    getYoutubeDataFromApi(youTubeString, displayYoutubeApiData);
}

//checks NO RESULTS and Displays the outcome.
function noResults(lyricCheckerScore) {
    if (lyricCheckerScore === true && youTubeScore === true) {
        $(".lyrics").html('<h2 style="text-align:center">There are no results. Please check your spelling and try again!</h2>');
    }
    else if (lyricCheckerScore === true && youTubeScore === false) {
        $(".lyrics").html("<h2> No lyrics found. Please check the spelling and enjoy this related video.</h2>");
    }
}

//DISPLAY LYRICS
function displaySearchData(data2) {
    youTubeScore = false;
    const results = data2.lyrics;
    getSwearApi(results, displaySwearApiData);
    $(".lyrics").html(`${results}`);
}

//API CALL to get YouTube Video
function getYoutubeDataFromApi(song, callback3) {
    const query = {
        key: "AIzaSyCOFx-c_YF08zb4utaaxy4yaTrmiR80xaY",
        q: song,
        part: 'snippet'
    };
    $.getJSON(YOUTUBE_URL, query, callback3);
}

//DISPLAY YouTube API Data
function displayYoutubeApiData(data3) {
    if ( data3.items.length > 0) {
        const displayTitle = data3.items[0].snippet.title;
        const videoUrl = data3.items[0].id.videoId;
        $(".title").html(`<h2>${displayTitle}</h2>`);
        $(".js-search-results").html(`<iframe class="video" src="https://www.youtube.com/embed/${videoUrl}" title="${displayTitle}" frameborder="0" allowfullscreen></iframe>`);
        $(".main-title").hide();
        $(".submit").html("Search Again");
        youTubeScore = false;
    }
    else {
        youTubeScore = true;
    }
}

//API CALL to check lyrics for swears
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

//DISPLAY SWEAR API Data
function displaySwearApiData(data) {
    const count = data['bad-words-total'];
    const swearWords = data['bad-words-list'].join(" | ");
        
    if (count === 0) {
        $(".swear-results").html(`<p style="background-color: green">This song contains 0 swears. Play away, but check the lyrics for inappropriate innuendos!</p>`);
    }
    else if (count === 1) {
        $(".swear-results").html(`<p style="background-color:red"><strong class="blink_me">WARNING!!</strong> This song contains only one swear word. It is <strong>${swearWords}</strong>.</p>`);  
    }
    else {
        $(".swear-results").html(`<p style="background-color:red"><strong class="blink_me">WARNING!!</strong> This song contains ${count} swear words. They are <strong>${swearWords}</strong>.</p>`);
    }
} 

//watches for the form to be submitted
function watchSubmit() {
  $('.js-search-form').submit(event => {
    //prevent it from resetting
    event.preventDefault();
    
    $(".title").empty();
    $(".js-search-results").empty();
    $(".swear-results").empty();
    //save as constants to clear out form after submission.
    const artistInput = $(this).find('.input-artist');
    const titleInput = $(this).find('.input-title');
    const artist = artistInput.val().trim();
    const title = titleInput.val().trim();
    artistInput.val('');
    titleInput.val('');
    getLyricDataFromApi(artist, title, displaySearchData);
  });
}

$(watchSubmit);