class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    # A newly created user begins as a free user
    @user.account_type = User::ACCOUNT_TYPE_FREE_USER

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end