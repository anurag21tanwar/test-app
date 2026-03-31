# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

CATEGORY = %w(food transport utilities entertainment health other)
STATUS = %w(settled pending)

10.times do |i|
  Transaction.create(description: "Transaction"+i.to_s, amount: i.to_f * (i.even? ? -1 : 1),
                     category: CATEGORY[rand(CATEGORY.size-1).round],
                     status: STATUS[rand(STATUS.size-1).round])
end