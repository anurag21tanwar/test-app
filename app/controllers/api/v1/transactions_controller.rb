class Api::V1::TransactionsController < ApplicationController
  def index
    @transactions = Transaction.all

    if filter_params.present?
      @transactions = @transactions.where(category: filter_params[:category])
    end

    render json: @transactions
  end

  private

  def filter_params
    params.permit(:category)
  end
end
