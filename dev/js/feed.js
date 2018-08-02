var el
var elAnswers
var nbItem = 0
var nbImage = 0
var nbPoll = 0
var nbQuote = 0
var nbArticle = 0
window.guids = []
$.get("./feed.rss", function (data) {
    $(data).find('channel').children().not('header').each(function () { // or "item" or whatever suits your feed

        el = $(this);

        nbItem++

        var category =          getValueWithoutSpace("category")
        var id =                getValueWithoutSpace("guid")
        var username =          getValueWithoutSpace("username")
        var userPictureUrl =    getValueWithoutSpace("userPictureUrl")
        var pubDate =           getText("pubDate")
        var formatedDate =      FormateDate(pubDate)
        var nbLike =            getValueWithoutSpace("nbLike")
        var image =             getValueWithoutSpace("image")
        var description =       getText("description")
        var isPublished =       getValueWithoutSpace("isPublished")
        var tags =              parseChildren("tags")
        var title =             getText("title")
        var link =              getValueWithoutSpace("link")
        var linkHostname =      getHostName(link)
        var question =          getText("question")
        var nb_answerers =      getValueWithoutSpace("nb_answerers")

        guids.push(id)


        switch (category) {
          case 'image':
            $("#app").append("<div class='feedItem image'> <div class='header'> <div class='pictureprofil'> <img src='"+userPictureUrl+"'> </div> <div class='userName'> <span class='name'>"+username+"</span> <span class='date'>"+formatedDate+"</span> </div> </div> <div class='content'> <img src='"+image+"'> </div> <div class='infos'> <p>"+description+"</p> <p>"+nbLike+"  likes</p> <p><b>Category : </b> "+category+"</p><p><b>Is published : </b>"+isPublished+"</p><p><b>tags : </b>"+tags+"</p> <p><b>Id : </b>"+id+"</p></div> </div>")
            nbImage++

            break;

          case 'poll':
              $("#app").append("    <div class='feedItem item-poll'> <div class='header'> <div class='pictureprofil'> <img src='"+userPictureUrl+"'> </div> <div class='userName'> <span class='name'>"+username+"</span> <span class='date'>"+formatedDate+"</span> </div> </div> <div class='content'> <p class='quote'>"+question+"</p> <p class='nb-answers'>"+nb_answerers+" responses</p> <div class='answers' id='answers-"+nbPoll+"'></div> <div class='infos' > <p><b>Category : </b> "+category+"</p> <p><b>Is published : </b>"+isPublished+"</p> <p><b>tags : </b>"+tags+"</p> <p><b>Id : </b>"+id+"</p> </div> </div>")

              $(el).find('answers').children().each(function() {

                elAnswers= $(this)

                var percentage =   elAnswers.find("percentage").text().replace(/\s/g, '')
                var textAnswer =      elAnswers.find("text").text()


                $("#answers-"+nbPoll).append("<div class='answer-item'> <div class='text'> "+textAnswer+" • "+percentage+"% </div> <div class='percentage' style='width:"+percentage+"%;'> </div> </div> </div> ")
              })

              nbPoll++
            break;

          case 'quote':
            $("#app").append("<div class='feedItem image'> <div class='header'> <div class='pictureprofil'> <img src='"+userPictureUrl+"'> </div> <div class='userName'> <span class='name'>"+username+"</span> <span class='date'>"+formatedDate+"</span> </div> </div><div class='infos'> <p class='quote'>"+title+"</p> <p>"+nbLike+"  likes</p> <p><b>Category : </b> "+category+"</p><p><b>Is published : </b>"+isPublished+"</p><p><b>tags : </b>"+tags+"</p> <p><b>Id : </b>"+id+"</p></div> </div>")
            nbQuote++
            break;

          case 'article':
            $("#app").append("<div class='feedItem article'> <div class='header'> <div class='pictureprofil'> <img src='"+userPictureUrl+"'> </div> <div class='userName'> <span class='name'>"+username+"</span> <span class='date'>"+formatedDate+"</span> </div> </div> <div class='content'> <div class='thumb'> <img src='"+ image +"'> </div> <div class='content-infos'> <h3>"+title+"</h3> <p>"+description+"</p> <a href='"+link+"'>"+linkHostname+"</a> </div> </div> <div class='infos'> <p>"+nbLike+"  likes</p> <p><b>Category : </b> "+category+"</p> <p><b>Is published : </b>"+isPublished+"</p> <p><b>tags : </b>"+tags+"</p> <p><b>Id : </b>"+id+"</p> </div> </div>")
            nbArticle++
            break;

        }

    });


    $(".preview").append("<span class='preview-item'>Total items : "+nbItem+"</span><span class='preview-item'>Nb images : "+nbImage+"</span><span class='preview-item'>Nb Polls : "+nbPoll+"</span><span class='preview-item'>Nb Quotes : "+nbQuote+"</span><span class='preview-item'>Nb Articles : "+nbArticle+"</span>")


});



function getValueWithoutSpace(param){
  return el.find(param).text().replace(/\s/g, '')
}

function getText(param){
  return el.find(param).text()
}

function parseChildren(param){
  var tab = []
  $(el).find(param).children().each(function () {
    tab.push(" "+$(this).text())
  })
  return tab.toString()
}


function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}

function FormateDate(date){

  return moment(date).format('MMM Do, h:mm a')

}

//popup
$( "#showPopup" ).click(function() {
    $("#popup").toggle( true )
    $("#body").css( "overflow","hidden" )

});

$( "#hidePopup" ).click(function() {
    $("#popup").toggle( false )
    $("#body").css( "overflow","auto" )


});
