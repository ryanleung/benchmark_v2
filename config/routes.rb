Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resources :sessions, only: [:create, :show]
    delete 'sessions' => 'sessions#destroy'

    resources :industries do
      resources :companies
    end

    # search route
    get 'companies/search' => 'companies#search'
    resources :companies do
      resources :metrics
    end

    # metrics dashboard route
    get 'companies/:company_id/metrics_dashboard' => 'metrics#metrics_dashboard'
  end

  # https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writting-manually
  # Catch-all option
  root "static_pages#root"
  get '*path', to: "static_pages#root"
end
