class DirectoryController < ApplicationController
  def index
    @businesses = Business.includes(:user).all
  end
end
