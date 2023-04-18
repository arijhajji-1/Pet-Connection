import CommentForm from "./CommentForm";
const userFromLocalStorageString = localStorage.getItem('user');
const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId,
  currentUserId=user._id,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =currentUserId === comment.userId;
    // currentUserId === comment.userId && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId;;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  return (
    <li key={comment._id}>
                                            <div className="single-comment mb-50 d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap">
                                                <div className="comment-content">
                                                    <div className="c-header d-flex align-items-center justify-content-between">
                                                        <div className="author-area">
                                                            <div className="author-img">
                                                                <img src="/assets/images/blog/blog-author.png" alt="" />
                                                            </div>
                                                            <div className="author-details">
                                                                <h5 className="mb-0">{comment.username}</h5>
                                                                <div className="c-date">{createdAt}</div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="c-body">

                                                    {!isEditing && <div className="comment-text">{comment.body}</div>}                                                    </div>
                                                
                                                    {isEditing && (
                                                      <CommentForm
                                                        submitLabel="Update"
                                                        hasCancelButton
                                                        initialText={comment.body}
                                                        handleSubmit={(text) => updateComment(text, comment.id)}
                                                        handleCancel={() => {
                                                          setActiveComment(null);
                                                        }}
                                                      />
                                                    )}
                                                    <div className="comment-actions">
          {/* {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment._id, type: "replying" })
              }
            >
              Reply
            </div>
          )} */}
          {/* {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment._id, type: "editing" })
              }
            >
              Edit
            </div>
          )} */}
          {canDelete && (
            <button
              className="comment-action"
              onClick={() => deleteComment(comment._id)}
            >
              Delete
            </button>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
         {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
                                                </div>
                                            </div>
                                           
                                        </li>
   
  );
};

export default Comment;
