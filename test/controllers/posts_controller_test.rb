require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:one)
    @business = businesses(:one) # Assumes business fixture 'one' belongs to user 'one'
    @post = posts(:one)
    sign_in @user
  end

  test "should create post as business" do
    assert_difference("Post.count") do
      post posts_url, params: { post: { content: "New business post", business_id: @business.id } }
    end
    assert_redirected_to root_path
    assert_equal "Post created!", flash[:notice]
  end

  test "should not create post as someone else's business" do
    other_business = businesses(:two)
    assert_no_difference("Post.count") do
      post posts_url, params: { post: { content: "Sneaky post", business_id: other_business.id } }
    end
    assert_response :not_found
  end

  test "should destroy post" do
    assert_difference("Post.count", -1) do
      delete post_url(@post)
    end
    assert_redirected_to root_path
  end

  test "should not destroy someone else's business post" do
    other_post = posts(:two) # Assumes business fixture 'two' does NOT belong to user 'one'
    delete post_url(other_post)
    assert_redirected_to root_path
    assert_equal "Not authorized.", flash[:alert]
  end
end
