require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "should be valid with content and business" do
    post = Post.new(content: "Test post", business: businesses(:one))
    assert post.valid?
  end

  test "should be invalid without content" do
    post = Post.new(business: businesses(:one))
    assert_not post.valid?
  end

  test "should be invalid without business" do
    post = Post.new(content: "Test post")
    assert_not post.valid?
  end
end
