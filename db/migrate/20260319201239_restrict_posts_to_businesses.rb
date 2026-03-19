class RestrictPostsToBusinesses < ActiveRecord::Migration[8.1]
  def up
    # Clean up any existing posts that don't have a business
    execute "DELETE FROM posts WHERE business_id IS NULL"

    remove_foreign_key :posts, :users
    remove_column :posts, :user_id
    change_column_null :posts, :business_id, false
  end

  def down
    add_column :posts, :user_id, :bigint
    add_index :posts, :user_id
    add_foreign_key :posts, :users
    change_column_null :posts, :business_id, true
  end
end
