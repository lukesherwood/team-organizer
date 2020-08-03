Rails.application.routes.draw do
  resources :teams do
    resources :events
  end
  resources :users, only: [:create, :destroy]
  root 'application#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
