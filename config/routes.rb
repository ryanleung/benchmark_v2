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

  # https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writting-manually
  # Catch-all option
  root "static_pages#root"
  get '*path', to: "static_pages#root"
end
