import { Container } from "inversify"
import { DataSource } from "typeorm"
import Types from "./Types"
import { AppDataSource } from "./DbConfig"
import { App } from "../app"
import { CreatePostService } from "../modules/post/application/createPost/CreatePostService"
import { PostRepository } from "../modules/post/domain/repository/PostRepository"
import { PostOrmRepository } from "../modules/post/infrastructure/PostOrmRepository"
import { CategoryRepository } from "../modules/category/domain/repository/CategoryRepository"
import { CategoryOrmRepository } from "../modules/category/infrastructure/CategoryOrmRepository"
import { UserRepository } from "../modules/user/domain/repository/UserRepository"
import { UserOrmRepository } from "../modules/user/infrastructure/UserOrmRepository"
import { DeletePostService } from "../modules/post/application/deletePost/DeletePostService"
import { GetManyPostsService } from "../modules/post/application/getManyPosts/GetManyPostsService"
import { GetPostService } from "../modules/post/application/getPost/GetPostService"
import { UpdatePostService } from "../modules/post/application/updatePost/UpdatePostService"
import { CreateUserService } from "../modules/user/application/createUser/CreateUserService"
import { GetUserService } from "../modules/user/application/getUser/GetUserService"
import { DeleteUserService } from "../modules/user/application/deleteUser/DeleteUserService"
import { EditPasswordService } from "../modules/user/application/editPassword/EditPasswordService"
import { ReplyToPostService } from "../modules/comment/application/replyToPost/ReplyToPostService"
import { CommentRepository } from "../modules/comment/domain/repository/CommentRepository"
import { CommentOrmRepository } from "../modules/comment/infrastructure/CommentOrmRepository"
import { ReplyToCommentService } from "../modules/comment/application/replyToComment/ReplyToCommentService"
import { GetParentCommentsService } from "../modules/comment/application/getParentComments/GetParentCommentsService"
import { GetChildCommentsService } from "../modules/comment/application/getChildComments/GetChildCommentsService"
import { GetPopularCategoriesService } from "../modules/category/application/getPopularCategories/getPopularCategoriesService"
import { AuthService } from "../modules/user/application/AuthService"
import {
  EnsureAuthenticated,
  IncludeDecodedTokenIfExists,
} from "../shared/middleware/authMiddleware"
import { UpvotePostService } from "../modules/post/application/upvotePost/UpvotePostService"
import { DownvotePostService } from "../modules/post/application/downvotePost/DownvotePostService"
import { DeletePostVoteService } from "../modules/post/application/deletePostVote/DeletePostVoteService"
import { PostVoteRepository } from "../modules/post/domain/repository/PostVoteRepository"
import { PostVoteOrmRepository } from "../modules/post/infrastructure/PostVoteOrmRepository"
import { CommentVoteRepository } from "../modules/comment/domain/repository/CommentVoteRepository"
import { CommentVoteOrmRepository } from "../modules/comment/infrastructure/CommentVoteOrmRepository"
import { UpvoteCommentService } from "../modules/comment/application/upvoteComment/UpvoteCommentService"
import { DownvoteCommentService } from "../modules/comment/application/downvoteComment/DownvoteCommentService"
import { DeleteCommentVoteService } from "../modules/comment/application/deleteCommentVote/DeleteCommentVoteService"

let container = new Container()

container.bind<App>(Types.App).to(App)
container.bind<DataSource>(Types.AppDataSource).toConstantValue(AppDataSource)

container.bind<AuthService>(Types.AuthService).to(AuthService)
container.bind<EnsureAuthenticated>(EnsureAuthenticated).toSelf()
container
  .bind<IncludeDecodedTokenIfExists>(IncludeDecodedTokenIfExists)
  .toSelf()

//* Post
container.bind<CreatePostService>(Types.CreatePostService).to(CreatePostService)
container.bind<DeletePostService>(Types.DeletePostService).to(DeletePostService)
container
  .bind<GetManyPostsService>(Types.GetManyPostsService)
  .to(GetManyPostsService)
container.bind<GetPostService>(Types.GetPostService).to(GetPostService)
container.bind<UpdatePostService>(Types.UpdatePostService).to(UpdatePostService)
container.bind<PostRepository>(Types.PostRepository).to(PostOrmRepository)

//* Post Vote
container.bind<UpvotePostService>(Types.UpvotePostService).to(UpvotePostService)
container
  .bind<DownvotePostService>(Types.DownvotePostService)
  .to(DownvotePostService)
container
  .bind<DeletePostVoteService>(Types.DeletePostVoteService)
  .to(DeletePostVoteService)
container
  .bind<PostVoteRepository>(Types.PostVoteRepository)
  .to(PostVoteOrmRepository)

//* Category
container
  .bind<GetPopularCategoriesService>(Types.GetPopularCategoriesService)
  .to(GetPopularCategoriesService)
container
  .bind<CategoryRepository>(Types.CategoryRepository)
  .to(CategoryOrmRepository)

//* User
container.bind<CreateUserService>(Types.CreateUserService).to(CreateUserService)
container.bind<GetUserService>(Types.GetUserService).to(GetUserService)
container.bind<DeleteUserService>(Types.DeleteUserService).to(DeleteUserService)
container
  .bind<EditPasswordService>(Types.EditPasswordService)
  .to(EditPasswordService)
container.bind<UserRepository>(Types.UserRepository).to(UserOrmRepository)

//* Comment
container
  .bind<ReplyToPostService>(Types.ReplyToPostService)
  .to(ReplyToPostService)
container
  .bind<ReplyToCommentService>(Types.ReplyToCommentService)
  .to(ReplyToCommentService)
container
  .bind<GetParentCommentsService>(Types.GetParentCommentsService)
  .to(GetParentCommentsService)
container
  .bind<GetChildCommentsService>(Types.GetChildCommentsService)
  .to(GetChildCommentsService)
container
  .bind<CommentRepository>(Types.CommentRepository)
  .to(CommentOrmRepository)

//* Comment Vote
container
  .bind<CommentVoteRepository>(Types.CommentVoteRepository)
  .to(CommentVoteOrmRepository)
container
  .bind<UpvoteCommentService>(Types.UpvoteCommentService)
  .to(UpvoteCommentService)
container
  .bind<DownvoteCommentService>(Types.DownvoteCommentService)
  .to(DownvoteCommentService)
container
  .bind<DeleteCommentVoteService>(Types.DeleteCommentVoteService)
  .to(DeleteCommentVoteService)
export default container
