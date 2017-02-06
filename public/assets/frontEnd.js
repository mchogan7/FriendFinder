var questions = [
    'I like eating plants more than meat.',
    'I love swimming in the ocean.',
    'I like to fly!',
    'I am really big.',
    'I like having lots of horns.',
    'I am super smart.',
    'I am very lazy.',
    'I love to run.',
    'I like living in herds.',
    'I like to shoot venom from my face.'
]

//Loops through the questions and generates the html for the radio buttons.
for (var i = 0; i < questions.length; i++) {
    $('#survey').append('<h2>' + questions[i] + '</h2>' +
           '<span class="questionContainer invalid">' +
    '<span class="disagree">DISAGREE</span><label><input type="radio" name="q' + [i] + '" value="1"><span class="inside"></span></label>' +
    '<label><input type="radio" name="q' + [i] + '" value="2"><span class="inside"></span></label>' +
    '<label><input type="radio" name="q' + [i] + '" value="3"><span class="inside"></span></label>' +
    '<label><input type="radio" name="q' + [i] + '" value="4"><span class="inside"></span></label>' +
    '<label><input type="radio" name="q' + [i] + '" value="5"><span class="inside"></span></label><span class="agree">AGREE</span>' +
    '</span>')
}

//Retrieves the completed form data
$(document).on('click', '#submitButton', function(e) {
    e.preventDefault()
    var formData = ($("#surveyHolder").serializeArray());
    if(formData.length === 12){
    formParseAndSubmit(formData)
  } else {
    highlightMissing();
  }
})

function formParseAndSubmit(formData) {
    var name = formData[0].value
    var image = formData[1].value
    var scores = []
    for (var i = 2; i < formData.length; i++) {
        scores.push(parseInt(formData[i].value))
    }
    var dataObject = new friendObject(name, image, scores)
    sendFriendObjectToServer(dataObject)
}

function highlightMissing(){
   if ($(".questionContainer").hasClass('invalid')) {
    $('.invalid').css('background-color', 'rgba(252,67,73,.3)')
    $('#surveyHolder').append('<div class="error">Please fill in all entries.</div>')
}
}

function friendObject(name, image, scores) {
    this.name = name;
    this.image = image;
    this.scores = scores
}

function sendFriendObjectToServer(dataObject) {
    $.ajax({
        type: "POST",
        url: '/api/new',
        data: dataObject,
        success: function(data){
        displayMatch(data)
    },
        dataType: "JSON"
    })
    console.log(dataObject)
}


function displayMatch(data) {
  console.log(data)
  $('body').append(
 '<div class="modalContainer">'+
  '<div class="modalContent">' +
    '<span class="close">&times;</span>' +
    '<div class="friendImage"><img src="' + data.image + '"alt="Friend Image"></div>' +
    '<span class="friendName">' + data.name + ' is your new dino friend!</span>' +
  '</div>' +
'</div>'
)
}

$(document).on('click', '.close', function() {
  $('.modalContainer').css('display', 'none')
})

//Clears default text.
$('.textInput').focus(function() {
    $(this).val("")
})

$(":radio").on('click', function(){
  $(this).closest('.questionContainer').removeClass('invalid')
})
