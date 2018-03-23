const LYRICS_URL = "https://private-anon-b1f27724d6-lyricsovh.apiary-proxy.com/v1";
const SWEARS_URL = "https://neutrinoapi.com/bad-word-filter";
const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";

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
    console.log(data3);
    console.log("this works");
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
    console.log(data);
    const count = data['bad-words-total'];
    const swearWords = data['bad-words-list'];

    console.log("howdy");
    console.log(count);
    console.log(swearWords);
}

function displaySearchData(data) {
 results = data.lyrics;
 getSwearApi(results, displaySwearApiData);
 $(".js-search-results").html(results);
 console.log(data);
}

//watches for the form to be submitted
function watchSubmit() {
  $('.js-search-form').submit(event => {
    //prevent it from resetting
    event.preventDefault();
    //save as constants to clear out form after submission.
    const artistInput = $(this).find('.artist');
    const titleInput = $(this).find('.title');
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