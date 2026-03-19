Rails.application.routes.draw do
  get "home/index"
  get "directory", to: "directory#index"
  get "profile/:id", to: "profiles#show", as: :profile

  devise_for :users

  root "home#index"

  resources :posts, only: [ :create, :destroy ]
  resources :businesses

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "pwa#service-worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
