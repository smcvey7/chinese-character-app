Rails.application.routes.draw do
  
  get "/availability/:username", to: "availability#show"

  resources :tests
  resources :students
  resources :class_groups
  resources :teachers
  resources :characters
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!

  get '/me', to: 'sessions#show'
  post '/login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
