class CreateTransactions < ActiveRecord::Migration[7.2]
  def change
    create_table :transactions do |t|
      t.string :description
      t.decimal :amount
      t.string :category
      t.string :status

      t.timestamps
    end
  end
end
