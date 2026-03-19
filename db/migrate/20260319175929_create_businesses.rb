class CreateBusinesses < ActiveRecord::Migration[8.1]
  def change
    create_table :businesses do |t|
      t.string :name
      t.text :description
      t.string :industry
      t.string :location
      t.string :website_url
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
