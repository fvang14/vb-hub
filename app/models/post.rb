class Post < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :business, optional: true

  validates :content, presence: true
  validate :author_must_be_present

  private

  def author_must_be_present
    if user_id.blank? && business_id.blank?
      errors.add(:base, "Post must have an author (user or business)")
    end
  end
end
