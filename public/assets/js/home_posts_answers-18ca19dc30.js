class QuestionAnswers{constructor(e){this.questionId=e,this.questionContainer=$("#question-"+e),this.newAnswerForm=$("#answerform-"+e),this.textarea=$(`#answerform-${e}>textarea`),console.log("TEXTAREA ",this.textarea),this.createAnswer(e)}createAnswer(e){let n=this;this.newAnswerForm.submit((function(s){s.preventDefault();console.log(this,"self"),console.log(n,"qSelf"),$.ajax({type:"post",url:"/answer/create",data:$(this).serialize(),success:function(s){console.log(s);let t=n.newAnswerDom(s);$("#question-answers-"+e).prepend(t),new ToggleLike($(".toggle-like-button",t))},error:function(e){console.log(e.responseText)}})}))}newAnswerDom=function(e){return console.log("hey there",e.data.answer),$(`<li id="answer-${e.data.answer._id}" style="box-shadow: 2px 2px 3px black; margin:10px;font-style: italic;">\n    <p> \n      ${e.data.answer.content}\n      <br>\n      <small>\n        ${e.data.user.username}\n      </small>\n    </p>\n    <a class="toggle-like-button" data-likes="0" href="/like/toggle/?id=${e.data.answer._id}&type=Answer" style="display:block;text-decoration:double">\n    0 <i class="far fa-thumbs-up"></i>\n  </a>\n         </li>`)}}