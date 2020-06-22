{
  //method to submit the question using ajax
  console.log("Hello everyone");
  let createPost = function () {
    let newPostForm = $("#questionform1");
    let textarea = $("#questionform1>textarea");
    console.log("This is the textarea", textarea);

    newPostForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/question/create",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log(data);
          let newQuestion = newQuestionDom(data.data.question);
          $("#question-list-container > ul").prepend(newQuestion);
          console.log($("#questionform1 > textarea"));
          textarea.val("Ask a question ...");
          console.log("HELLO");
          new QuestionAnswers(data.data.question._id);
          console.log("World");
          new ToggleLike($(".toggle-like-button", newQuestion));
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };
  //method to create a question in DOM
  let newQuestionDom = function (question) {
    return $(`<li id="question-${question._id}">${question.question} asked by ${question.user.username} 

      <a class="toggle-like-button" data-likes="0 "  href="/like/toggle/?id=${question._id}&type=Question" style="display:block;text-decoration:double">
        0 <i class="far fa-thumbs-up"></i>
      </a>
 
  <form action="/answer/create" method="POST" id="answerform-${question._id}">
      <textarea name="content" cols="70" rows="10" placeholder="type your answer here... " required></textarea>
      <input type="hidden" name="question" value=${question._id}>
      <input type="submit" value="Ans" style="width: 10%; display:block"> 
  </form>
  <div class="question-answer-list">
            <ul id="question-answers-${question._id}">
            </ul>
          </div>
          </li>`);
  };
  let convertQuestionsToAjax = function () {
    $("#question-list-container > ul > li").each(function () {
      let self = $(this);

      //get the question's id by splitting the id attribute
      let questionId = self.prop("id").split("-")[1];
      new QuestionAnswers(questionId);
    });
  };
  createPost();
  convertQuestionsToAjax();
}
