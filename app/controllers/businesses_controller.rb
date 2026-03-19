class BusinessesController < ApplicationController
  before_action :authenticate_user!, except: [ :show ]
  before_action :set_business, only: [ :show, :edit, :update, :destroy ]
  before_action :authorize_business, only: [ :edit, :update, :destroy ]

  def index
    @businesses = current_user.businesses.order(created_at: :desc)
  end

  def show
  end

  def new
    @business = current_user.businesses.build
  end

  def create
    @business = current_user.businesses.build(business_params)
    if @business.save
      redirect_to @business, notice: "Business created!"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @business.update(business_params)
      redirect_to @business, notice: "Business updated!"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @business.destroy
    redirect_to businesses_path, notice: "Business deleted."
  end

  private

  def set_business
    @business = Business.find(params[:id])
  end

  def business_params
    params.require(:business).permit(:name, :description, :industry, :location, :website_url)
  end

  def authorize_business
    redirect_to businesses_path, alert: "Not authorized." unless @business.user == current_user
  end
end
