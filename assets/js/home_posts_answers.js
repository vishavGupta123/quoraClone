class QuestionAnswers {
  constructor(questionId) {
    this.questionId = questionId;
    this.questionContainer = $(`#question-${questionId}`);
    this.newAnswerForm = $(`#answerform-${questionId}`);

    this.createAnswer(questionId);

    let self = this;
  }

  createAnswer(questionId) {
    let qSelf = this;

    this.newAnswerForm.submit(function (e) {
      e.preventDefault();
      let self = this;
      console.log(self, "self");
      console.log(qSelf, "qSelf");

      $.ajax({
        type: "post",
        url: "/answer/create",
        data: $(self).serialize(),
        success: function (data) {
          console.log(data);
          let newAnswer = qSelf.newAnswerDom(data);
          $(`#question-answers-${questionId}`).prepend(newAnswer);
          //change the
          new ToggleLike($(".toggle-like-button", newAnswer));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }

  newAnswerDom = function (data) {
    console.log("hey there", data.data.answer);
    return $(`<li id="answer-${data.data.answer._id}" style="box-shadow: 2px 2px 3px black; margin:10px;font-style: italic;">
    <p> 
      ${data.data.answer.content}
      <br>
      <small>
        ${data.data.user.username}
      </small>
    </p>
    <a class="toggle-like-button" data-likes="0" href="/like/toggle/?id=${data.data.answer._id}&type=Answer" style="display:block;text-decoration:double">
    0 <i class="far fa-thumbs-up"></i>
  </a>
         </li>`);
  };
}
