class AddVolleyballFieldsToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :name, :string
    add_column :users, :role, :string
    add_column :users, :home_facility, :string
    add_column :users, :volleyball_bio, :text
  end
end
