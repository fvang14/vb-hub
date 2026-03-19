class PostsController < ApplicationController
  before_action :authenticate_user!, only: [ :create, :destroy ]
  before_action :set_post, only: [ :destroy ]
  before_action :authorize_post, only: [ :destroy ]

  def index
    @posts = Post.includes(:user, :business).order(created_at: :desc)
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      redirect_to root_path, notice: "Post created!"
    else
      redirect_to root_path, alert: "Failed to create post."
    end
  end

  def destroy
    @post.destroy
    redirect_to root_path, notice: "Post deleted."
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:content)
  end

  def authorize_post
    redirect_to root_path, alert: "Not authorized." unless @post.user == current_user
  end
end
