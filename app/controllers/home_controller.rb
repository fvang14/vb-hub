class HomeController < ApplicationController
  def index
    @posts = Post.includes(business: :user).order(created_at: :desc)
    @stats = {
      users: User.count,
      businesses: Business.count,
      posts: Post.count
    }
  end
end
