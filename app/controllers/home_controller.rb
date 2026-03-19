class HomeController < ApplicationController
  def index
    @posts = Post.includes(business: :user).order(created_at: :desc)
  end
end
