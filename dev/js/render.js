function listenInput(category) {

  var categoryValue =          addSimpleTag('category',category,1)
  var idValue =                addTagText('guid','#inputGuid', 1)
  var usernameValue =          addTagText('username','#InputUserName', 1)
  var userPictureUrlValue =    addTagText('userPictureUrl','#InputUserPictureUrl', 1)
  var pubDateValue =           addTagDate('#InputPub',1)
  var formatedDateValue =      ''
  var nbLikeValue =            addTagText('nbLike','#InputnbLike', 1)
  var imageUrlValue =          addTagText('image','#InputImageLink', 1)
  var descriptionValue =       addTagText('description','#Inputdescription', 1)
  var isPublishedValue =       addSimpleTag('isPublished','true',1)
  var tagsValue =              addTagTags('#InputTags',1)
  var titleValue =             addTagText('title','#InputTitle', 1)
  var titlelongValue =         addTagText('title','#InputTitleLong', 1)
  var linkValue =              addTagText('link','#InputLink', 1)
  var questionValue =          addTagText('question','#questionInput', 1)
  var nb_answerersValue =      addTagText('nb_answerers','#Inputnb_answerers', 1)
  var poll =                   addTagPoll('#pollAnswers', 1)
  var deeplink =               addTagDeeplink('deeplink','#deeplink', 1)


  var itemTagStart = '&lt;item&gt;</br>'
  var itemTagEnd = '&lt;/item&gt;'



  var code = []

  switch (category) {
    case 'image':
      code.push(
      itemTagStart+
      idValue+
      categoryValue+
      usernameValue+
      userPictureUrlValue+
      pubDateValue+
      nbLikeValue+
      imageUrlValue+
      descriptionValue+
      isPublishedValue+
      tagsValue+
      deeplink+
      itemTagEnd
      )
      break

    case 'article':
      code.push(
      itemTagStart+
      idValue+
      categoryValue+
      titleValue+
      linkValue+
      descriptionValue+
      imageUrlValue+
      usernameValue+
      userPictureUrlValue+
      pubDateValue+
      nbLikeValue+
      isPublishedValue+
      tagsValue+
      deeplink+
      itemTagEnd
      )
      break;

    case 'quote':
      code.push(
        itemTagStart+
        idValue+
        categoryValue+
        titlelongValue+
        usernameValue+
        userPictureUrlValue+
        pubDateValue+
        nbLikeValue+
        isPublishedValue+
        tagsValue+
        deeplink+
        itemTagEnd
      )
      break

    case 'poll':
      code.push(
      itemTagStart+
      idValue+
      categoryValue+
      questionValue+
      nb_answerersValue+
      poll+
      isPublishedValue+
      usernameValue+
      userPictureUrlValue+
      pubDateValue+
      tagsValue+
      deeplink+
      itemTagEnd
      )
      break
  }
  render(code)
}


function render(code) {
  $("#sourceCode").html(code.join(''))

  //highlighter
  $(document).ready(function() {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });

}


function addTagText(tag, id, nbTab){
  var idValue = $(id).val()
  var tab = addTab(nbTab)

  return tab+'&lt;'+tag+'&gt;</br>'+tab+'  '+idValue+'</br>'+tab+'&lt;/'+tag+'&gt;</br>'
}

function addTagDeeplink(tag, id, nbTab){
  var idValue = $(id).val()
  var tab = addTab(nbTab)
  if (idValue.length != 0) {
    return tab+'&lt;'+tag+'&gt;</br>'+tab+'  '+encodeURIComponent(idValue)+'</br>'+tab+'&lt;/'+tag+'&gt;</br>'
  }else {
    return ''
  }
}

function addTagDate(id, nbTab){
  var tag = 'pubDate'
  var tab = addTab(nbTab)
  var idValueDate = $(id+"Date").val()
  var idValueTime = $(id+"Time").val()
  var formatedDate = moment(idValueDate+" "+idValueTime).format('ddd, DD MMM YYYY HH:mm:ss')+' GMT'

  return tab+'&lt;'+tag+'&gt;</br>'+tab+'  '+formatedDate+'</br>'+tab+'&lt;/'+tag+'&gt;</br>'
}

function addTagTags(id, nbTab){
  var tab = addTab(nbTab)
  var doubleTab = addTab(nbTab+1)
  var tags = $(id)
  var tag = 'tags'
  if (tags.length === 0) {
  }else {
    tags = tags.val().replace(/\s/g, '').split(',')
    var tagsTagged = ''
    $.each(tags, function(index, value) {
      tagsTagged = tagsTagged + doubleTab+ '&lt;item&gt;' + value + '&lt;/item&gt;' + '</br>'
    })
    return tab+'&lt;'+tag+'&gt;</br>'+tagsTagged+tab+'&lt;/'+tag+'&gt;</br>'
  }
}

function addTagPoll(id, nbTab){
  var tab = addTab(nbTab)
  var doubleTab = addTab(nbTab+1)
  var tripleTab = addTab(nbTab+2)

  var answersBlocks = $(id).children().not('button')

  if ($(id).length === 0) {
  }else{
    var  answers = ''
    $.each(answersBlocks, function(index, value) {
      var identifier = index +1
      var answer = $(value).children('.inputsAnswer').children().children('.text').val()
      var percentage = $(value).children('.inputsAnswer').children().children('.percentage').val()
      answers = answers + doubleTab+ '&lt;item&gt;</br>'+addSimpleTag('identifier',identifier,3)+addSimpleTag('text',answer,3)+addSimpleTag('percentage',percentage,3)+doubleTab+'&lt;/item&gt;</br>'
    })
    return tab+'&lt;answers&gt;</br>'+answers+'</br>'+tab+'&lt;/answers&gt;</br>'
  }
}

function addTab(nb) {
  var nbTab = nb
  var tab = ''
  for (var i = 0; i < nbTab; i++) {
    tab = tab + '  '
  }

  return tab
}
function addSimpleTag(tagName, value, nbTab) {
  var tab = addTab(nbTab)
  var doubleTab = addTab(nbTab+1)
  return tab+'&lt;'+tagName+'&gt;</br>'+doubleTab+value+'</br>'+tab+'&lt;/'+tagName+'&gt;</br>'
}

templateSelected()



$( document ).ready(function() {
  var clipboard =  new ClipboardJS('#copyCode');

  clipboard.on('success', function(e) {
    $(e.trigger).text("Copied!");
    e.clearSelection();
    setTimeout(function() {
      $(e.trigger).text("Copy code");
    }, 2500);
  })
  clipboard.on('error', function(e) {
    $(e.trigger).text("Can't in Safari");
    setTimeout(function() {
      $(e.trigger).text("Copy");
    }, 2500);
   });
})
