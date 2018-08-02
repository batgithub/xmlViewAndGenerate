// Item Generator
var minLikesRandom = 40
var maxLikesRandom = 800


// var newGuid = 0
//
// $( ".infos" ).ready(function() {
//   var lastGuid = parseFloat(guids[0])
//   newGuid = lastGuid+1
//   $('#inputGuid').val(newGuid)
//
// })

function templateSelected() {
  var category = $( "#selectTemplate ").find(":selected").text().toLowerCase()
  buildForm(category)
  listenInput(category)
}


function buildForm(category) {
  var inputs
  var categoryInput

  var idInput =                setInputNumber('guid','inputGuid',category)
  var usernameInput =          setInputText('User Name','InputUserName',category,'Rose')
  var userPictureUrlInput =    setInputTextLong('link image User profil','InputUserPictureUrl',category,'https://storage.googleapis.com/picta-prd-marketing/Feed/Profile/rose_picture.jpeg')
  var pubDateInput =           setInputDate('Publication Date',category)
  var nbLikeInput =            setInputNumber('Nombre de likes','InputnbLike',category,randomNumber(minLikesRandom, maxLikesRandom ))
  var imageInput =             setInputTextLong('Image link','InputImageLink',category,'')
  var descriptionInput =       setInputTextLong('Description','Inputdescription',category,'')
  var tagsInput =              setInputTags('Tags (separate with ",")','InputTags',category)
  var titleInput =             setInputText('title','InputTitle',category,'')
  var titleLongInput =             setInputTextLong('title','InputTitleLong',category,'')
  var linkInput =              setInputTextLong('link article','InputLink',category,'')
  var questionInput =          setInputTextLong('Question','questionInput',category,'')
  var nb_answerersInput =      setInputNumber('Nombre de reponses','Inputnb_answerers',category,'')
  var answers =                setPollSection('Poll anserws', category,'')
  var deepLink =               setInputTextLong('Deeplink','deeplink',category,'')

  switch (category) {
    case 'image':
      inputs =
      idInput+
      imageInput+
      deepLink+
      descriptionInput+
      tagsInput+
      nbLikeInput+
      pubDateInput+
      usernameInput+
      userPictureUrlInput

      break

    case 'article':
      inputs =
      idInput+
      linkInput+
      titleInput+
      descriptionInput+
      imageInput+
      tagsInput+
      nbLikeInput+
      pubDateInput+
      usernameInput+
      userPictureUrlInput+
      deepLink

      break

    case 'quote':
      inputs =
      idInput+
      titleLongInput+
      deepLink+
      tagsInput+
      nbLikeInput+
      pubDateInput+
      usernameInput+
      userPictureUrlInput
      break


    case 'poll':
      inputs =
      idInput+
      questionInput+
      answers+
      nb_answerersInput+
      tagsInput+
      pubDateInput+
      usernameInput+
      userPictureUrlInput+
      deepLink

      break



  }


  var idAnswer = 1
  $(".fillTemplate").html(inputs)
  $( "#addNewAnswerButton" ).click(function() {
    idAnswer = idAnswer+1
    addNewAnswer(idAnswer,'poll')
    listenInput(category)

  })
  addNewAnswer(idAnswer,category)
  $('#InputPubDate').val(moment().format('YYYY-MM-DD'))
  $('#InputPubTime').val(moment().format('HH:mm:ss'))
}


function setInputNumber(label, id, category, defaultValue){
  return "<div class='input text'>\
            <label class='label'>"+label+"</label>\
            <input  type='number' class='number' value='"+defaultValue+"' id='"+id+"' oninput='listenInput(\""+category+"\")'>\
          </div>"
}
function setInputPercentage(label, id, category, defaultValue){
  return "<div class='input text'>\
            <label class='label'>"+label+"</label>\
            <input  type='number' class='percentage' max='100' value='"+defaultValue+"' id='"+id+"' oninput='listenInput(\""+category+"\")'>\
          </div>"
}
function setInputText(label, id, category, textdefault){
  return "<div class='input text'>\
            <label class='label'>"+label+"</label>\
            <input  type='text' class='text' id='"+id+"' value='"+textdefault+"'\ oninput='listenInput(\""+ category+ "\")'>\
          </div>"
}

function setInputTextLong(label, id, category, textdefault){
  return '<div class="input">\
            <label class="label" for="">'+label+'</label>\
              <textarea  class="textareaURL" id="'+id+'" \ oninput="listenInput(\''+ category+ '\')">'+textdefault+'</textarea>\
          </div>'
}

function setInputTags(label, id, category){
  return '<div class="input">\
            <label class="label" for="InputTags">'+label+'</label>\
            <input  name="InputTags" type="text" id="'+id+'" oninput="listenInput(\''+ category+ '\')" placeholder="Type_tags, Like, That">\
          </div>'
}


function setInputDate(label,category){
  return "<div class='input date'>\
              <label class='label'>"+label+"</label>\
            <div class='inputsDate'>\
              <input class='input'type='date'  id='InputPubDate'  oninput='listenInput(\""+category+"\")'>\
              <input  class='input'type='time' id='InputPubTime' oninput='listenInput(\""+category+"\")'>\
            </div>\
          </div>"
}



function setPollSection(label,category){
  return "<div class='input poll' ><div id='pollAnswers'></div><button id='addNewAnswerButton' class='button secondary'>Add an answer</button></div>"
}

function addNewAnswer(idAnswer,category){
  var answerID = 'answer'+idAnswer
  var answer =  "<div class='input answer'>\
                    <label class='labelAnswer'>Answer "+idAnswer+"</label>\
                  <div class='inputsAnswer'>\
                  "+setInputText('answer',answerID , category,'' )+setInputPercentage('Percentage',answerID,category,'')+"\
                  </div>\
                </div>"
  // $(answer).insertAfter(".input .answer")
  $('#pollAnswers').append(answer)
}


function randomNumber(min,max) {
  var number = Math.floor((Math.random() * max) + min)
  return number
}
