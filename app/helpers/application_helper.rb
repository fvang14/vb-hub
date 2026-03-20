module ApplicationHelper
  def safe_website_url(url)
    return nil if url.blank?

    uri = Addressable::URI.parse(url)
    return nil unless %w[http https].include?(uri.scheme)

    url
  rescue Addressable::URI::InvalidURIError
    nil
  end
end
