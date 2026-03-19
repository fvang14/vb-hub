class HomeController < ApplicationController
  def index
    @posts = Post.includes(:user, :business).order(created_at: :desc)
  end
end
