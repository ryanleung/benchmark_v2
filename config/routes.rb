Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resources :sessions, only: [:create, :show]
    delete 'sessions' => 'sessions#destroy'

    resources :industries do
      resources :companies
    end

    resources :companies do
      resources :metrics
    end
  end
  root "static_pages#root"
end
