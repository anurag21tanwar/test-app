# config/routes.rb
Rails.application.routes.draw do
  resources :transactions
  namespace :api do
    namespace :v1 do
      resources :transactions, only: [:index]
    end
  end
end
