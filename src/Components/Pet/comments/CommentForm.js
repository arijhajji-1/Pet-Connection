import { useState } from "react";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text,submitLabel);
    setText("");
  };
  return (
    <div className="comment-form">
    <div className="comments-title">
        <h2>Leave a Reply</h2>
    </div>

    <form onSubmit={onSubmit}>
        <div className="row">
            
            
            <div className="col-lg-12">
                <div className="form-inner mb-40">
                    <textarea placeholder="Your message"  value={text}
        onChange={(e) => setText(e.target.value)} ></textarea>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-inner two">
                    <button className="primary-btn3 btn-lg" disabled={isTextareaDisabled}>
       Send
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="primary-btn3 btn-lg"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
                </div>
            </div>
        </div>
    </form>
</div>
   
  );
};

export default CommentForm;
