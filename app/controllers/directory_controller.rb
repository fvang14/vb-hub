class DirectoryController < ApplicationController
  def index
    @businesses = Business.includes(:user).all

    @businesses = @businesses.where("name ILIKE ?", "%#{params[:query]}%") if params[:query].present?
    @businesses = @businesses.where("description ILIKE ?", "%#{params[:query]}%") if params[:query].present?
    @businesses = @businesses.where(industry: params[:industry]) if params[:industry].present?
    @businesses = @businesses.where(location: params[:location]) if params[:location].present?

    @industries = Business.select(:industry).distinct.where.not(industry: nil).pluck(:industry).sort
    @locations = Business.select(:location).distinct.where.not(location: nil).pluck(:location).sort
  end
end
