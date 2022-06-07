<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <main class="form-post">
          <form @submit.prevent="onSubmitPost" enctype="multipart/form-data">
            <div class="card mb-3">
              <input type="file" class="form-control" v-on:change="onChange">
              <div class="card-body">
                <div class="float-holder clearfix">
                  <div class="form-group col-10 float-right">
                    <textarea v-model="writtenText" name="written_text" class="comment float-start form-control"
                              placeholder="Whats on your mind"></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary btn-sm col-1 float-start">Post</button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
    <div class="row">
      <div class="col-12" v-if="posts.length">
        <div class="card mb-2" v-for="post in posts" :key="post.id">
          <div class="col-md-7 text-start">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div class="col p-4 d-flex flex-column position-static">
                <h2>{{ post.username }}</h2>
                <span>Posted by: {{ post.user.name }}</span>
                <hr>
                <h3 class="mb-0">{{ post.written_text }}</h3>
                <div class="row post-btn">
                  <button type="button" class="btn btn-primary col-md-3" @click="doLike(post.id)">Like
                    ({{ post.likes_count }})
                  </button>
                  <button type="button" class="btn btn-primary col-md-5" data-bs-toggle="modal"
                          data-bs-target="#commentModal" @click="doComment(post.id)">Comment ({{ post.comments_count }})
                  </button>
                  <button type="button" class="btn btn-primary col-md-2" data-bs-toggle="modal"
                          data-bs-target="#postModal" @click="editPost(post.id)">Edit
                  </button>
                  <button type="button" class="btn btn-primary col-md-2" @click="deletePost(post.id)">Delete</button>
                </div>
              </div>

              <div class="col-auto d-none d-lg-block">
                <img v-if="post.post_image" :src="post.post_image" alt="post-image" height="150" width="150"/>
                <img v-else :src="defaultImage" alt="no-image-available" height="150" width="150"/>
              </div>

              <div class="card" v-for="comment in post.comments" :key="comment.id">
                <div class="card-body">
                  <!-- <h5 class="card-title">Card title</h5> -->
                  <span class="fw-bold">{{ comment.user.name }}</span>
                  <p>{{ comment.comment_text }}</p>
                </div>
              </div>

              <!-- Modal Candidate -->
              <!-- Post Modal -->

              <div class="modal fade" id="postModal" tabindex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <form @submit.prevent="updatePostForm" enctype="multipart/form-data">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="postModalLabel">Edit Post</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <!-- Modal Candidate -->
                      <div class="modal-body">
                        <div class="container-fluid">
                          <main class="form-post">
                            <div class="card mb-3">
                              <div class="alert alert-danger" role="alert" v-if="errors && errors.post_image">
                                {{ errors.post_image[0] }}
                              </div>
                              <input type="file" class="form-control" v-on:change="onChange">
                              <div class="card-body">
                                <div class="float-holder clearfix">
                                  <div class="alert alert-danger" role="alert" v-if="errors && errors.written_text">
                                    {{ errors.written_text[0] }}
                                  </div>
                                  <div class="form-group col-12 float-right">
                                    <textarea v-model="postDetail.written_text" name="written_text"
                                              class="comment float-start form-control"
                                              placeholder="Whats on your mind"></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </main>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" @click="updatePost(postDetail.id)">Save changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <!-- Post Modal end here -->

              <!-- Comment Modal -->
              <div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="commentModalLabel"
                   aria-hidden="true">
                <div class="modal-dialog">
                  <form @submit.prevent="commentPostForm">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="commentModalLabel">Comment Section</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <!-- Modal Candidate -->
                      <div class="modal-body">
                        <div class="container-fluid">
                          <main class="form-post">
                            <div class="card mb-3">
                              <div class="card-body">
                                <div class="float-holder clearfix">
                                  <div class="form-group col-12 float-right">
                                    <textarea v-model="comment.comment_text" name="comment_text"
                                              class="comment float-start form-control"
                                              placeholder="Type your comment here..."></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </main>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" @click="commentPost(comment.post_id)">Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <!-- Comment Modal end here -->
            </div>
          </div>
        </div>
      </div>
      <div class="text-center" v-show="moreExist">
        <button type="button" class="btn btn-primary btn-sm col-3" @click="loadMore()">Load More</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment {
  margin-right: 10px
}

.like {
  cursor: pointer;
}
</style>

<script>
import moment from "moment";
import PostService from '@/services/post.service'
import LikeService from '@/services/like.service'
import CommentService from '@/services/comment.service'
import image from '@/assets/no-image-available.jpg'
import {createToaster} from "@meforma/vue-toaster"

const toaster = createToaster({ /* options */})
export default {
  name: 'user-post-list',
  data() {
    return {
      errors: {},
      moreExist: false,
      nextPage: 0,
      defaultImage: image,
      writtenText: '',
      moment: moment,
      posts: [],
      comments: [],
      postDetail: {
        id: '',
        user_id: '',
        written_text: '',
        post_image: ''
      },
      comment: {
        post_id: '',
        comment_text: ''
      }
    }
  },
  methods: {
    async updatePost(post_id) {
      let data = new FormData();
      data.append('user_id', localStorage.id);
      data.append('written_text', this.postDetail.written_text);
      data.append('post_image', this.file);
      data.append('_method', 'PUT');

      await PostService.update(post_id, data).then((response) => {
        this.postDetail = response.data.post;
      }).catch((error) => {
        this.errors = error.response.data.errors;
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },

    async editPost(post_id) {
      await PostService.getPostById(post_id).then((response) => {
        this.postDetail = response.data.post
      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },

    async doComment(post_id) {
      this.comment.post_id = post_id
    },

    onChange(e) {
      this.file = e.target.files[0];
    },

    async onSubmitPost() {
      let data = new FormData()
      data.append('user_id', localStorage.id)
      data.append('written_text', this.writtenText)
      data.append('post_image', this.file)

      await PostService.create(data).then((response) => {
        if (response.data) {
          this.posts = this.loadPosts()
        }
      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },

    async loadPosts() {
      await PostService.getAllUserPosts().then((response) => {
        this.posts = response.data.posts.data
        this.comments = response.data.posts.comments

        if (response.data.posts.current_page < response.data.posts.last_page) {
          this.moreExist = true
          this.nextPage = response.data.posts.current_page + 1
        } else {
          this.moreExist = false
        }

      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },

    async doLike(post_id) {
      const data = {user_id: localStorage.id, post_id: post_id};
      await LikeService.likePost(data).then((response) => {
        if (response.data) {
          this.posts = this.loadPosts()
        }
      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },

    async deletePost(post_id) {
      await PostService.delete(post_id).then((response) => {
        if (response.data) {
          this.posts = this.loadPosts()
        }
      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },

    async commentPost(post_id) {
      const data = {user_id: localStorage.id, post_id: post_id, comment_text: this.comment.comment_text}
      await CommentService.create(data).then((response) => {
        if (response.data) {
          this.posts = this.loadPosts()
        }
      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },

    async loadMore() {
      await PostService.loadMoreUserPosts(this.nextPage).then((response) => {
        if (response.data.posts.current_page < response.data.posts.last_page) {
          this.moreExist = true
          this.nextPage = response.data.posts.current_page + 1
        } else {
          this.moreExist = false
        }

        response.data.posts.data.forEach(data => {
          this.posts.push(data)
        });

      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },
  },
  mounted() {
    this.loadPosts()
  }
}
</script>

