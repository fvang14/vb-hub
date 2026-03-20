class Business < ApplicationRecord
  belongs_to :user
  has_many :posts, dependent: :destroy

  validates :name, presence: true
  validates :description, presence: true
  validate :website_url_is_safe

  before_validation :normalize_website_url

  private

  def normalize_website_url
    return if website_url.blank?

    unless website_url.match?(%r{\Ahttps?://}i)
      self.website_url = "https://#{website_url}"
    end
  end

  def website_url_is_safe
    return if website_url.blank?

    uri = Addressable::URI.parse(website_url)
    unless %w[http https].include?(uri.scheme)
      errors.add(:website_url, "must use http or https protocol")
    end
  rescue Addressable::URI::InvalidURIError
    errors.add(:website_url, "is an invalid URL")
  end
end
