class Post < ApplicationRecord
  belongs_to :business

  validates :content, presence: true
end
