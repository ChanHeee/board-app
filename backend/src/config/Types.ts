import "reflect-metadata"

const Types = {
  App: Symbol("App"),
  AppDataSource: Symbol("AppDataSource"),
  PassportConfig: Symbol("PassportConfig"),
  AuthService: Symbol("AuthService"),

  //* Posts
  CreatePostService: Symbol("CreatePostService"),
  DeletePostService: Symbol("DeletePostService"),
  GetManyPostsService: Symbol("GetManyPostsService"),
  GetPostService: Symbol("GetPostService"),
  UpdatePostService: Symbol("UpdatePostService"),
  PostRepository: Symbol("PostRepository"),

  UpvotePostService: Symbol("UpvotePostService"),
  DownvotePostService: Symbol("DownvotePostService"),
  DeletePostVoteService: Symbol("DeletePostVoteService"),
  PostVoteRepository: Symbol("PostVoteRepository"),

  //* Category
  GetPopularCategoriesService: Symbol("GetPopularCategoriesService"),
  CategoryRepository: Symbol("CategoryRepository"),

  //* User
  CreateUserService: Symbol("CreateUserService"),
  GetUserService: Symbol("GetUserService"),
  DeleteUserService: Symbol("DeleteUserService"),
  UpdateUserService: Symbol("UpdateUserService"),
  EditPasswordService: Symbol("EditPasswordService"),
  UserRepository: Symbol("UserRepository"),

  //* Comment
  ReplyToPostService: Symbol("ReplyToPostService"),
  ReplyToCommentService: Symbol("ReplyToCommentService"),
  GetParentCommentsService: Symbol("GetParentCommentsService"),
  GetChildCommentsService: Symbol("GetChildCommentsService"),
  EditTextService: Symbol("EditTextService"),
  CommentRepository: Symbol("CommentRepository"),
  UpvoteCommentService: Symbol("UpvoteCommentService"),
  DownvoteCommentService: Symbol("DownvoteCommentService"),
  DeleteCommentVoteService: Symbol("DeleteCommentVoteService"),
  CommentVoteRepository: Symbol("CommentVoteRepository"),
}

export default Types
