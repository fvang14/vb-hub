class CreatePosts < ActiveRecord::Migration[8.1]
  def change
    create_table :posts do |t|
      t.text :content
      t.references :user, null: true, foreign_key: true
      t.references :business, null: true, foreign_key: true

      t.timestamps
    end
  end
end
