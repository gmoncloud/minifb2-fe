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
										<textarea v-model="writtenText" name="written_text" class="comment float-start form-control" placeholder="Whats on your mind"></textarea>
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
    <div class="col-12" v-if="posts.length" >
			<div class="card mb-2" v-for="post in posts" :key="post.id">
				<div class="col-md-7 text-start">
						<div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
							<div class="col p-4 d-flex flex-column position-static">
								<h3 class="mb-0">{{ post.written_text }}</h3>
								<p class="card-text mb-auto">Last updated 3 mins ago</p>
								<div class="row">
									<button class="col-md-4" @click="doLike(post.id)">Like (10)</button> <button class="col-md-4">Comment</button>
									<button type="button" class="btn btn-primary col-md-4" data-bs-toggle="modal" data-bs-target="#exampleModal" :data-post-id="post.id" @click="editPost(post.id)">
										Edit Post
									</button>
								</div>
							</div>
							<div class="col-auto d-none d-lg-block">
								<img v-if="post.post_image" :src="post.post_image" alt="post-image" height="150" width="150" />
								<img v-else :src="defaultImage" alt="no-image-available" height="150" width="150" />
							</div>
														
								<!-- Modal Candidate -->
								<!-- Modal -->
								<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div class="modal-dialog">
										<form @submit.prevent="updatePostForm" enctype="multipart/form-data">
											<div class="modal-content">
												<div class="modal-header">
													<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
													<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
												</div>

												<!-- Modal Candidate -->
												<div class="modal-body">
													<div class="container-fluid">
														<main class="form-post">
															<div class="card mb-3">
																<input type="file" class="form-control" v-on:change="onChange">
																	<div class="card-body">						
																		<div class="float-holder clearfix">
																			<div class="form-group col-12 float-right">
																				<textarea v-model="postDetail.written_text" name="written_text" class="comment float-start form-control" placeholder="Whats on your mind"></textarea>
																			</div>
																		</div>
																</div>
															</div>
														</main>
													</div>
												</div>

												<div class="modal-footer">
													<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
													<button type="submit" class="btn btn-primary" @click="updatePost(postDetail.id)">Save changes</button>
												</div>
											</div>
										</form>
									</div>
								</div>

						
						</div>
					</div>
				</div>
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
    import axios from 'axios'
		import image from '@/assets/no-image-available.jpg'
    export default {
        name: 'post-list',
        components: {
        },
        data() {
            return {
								defaultImage: image,
								writtenText: '',
								mediaLocation: 'https://image.shutterstock.com/image-photo/green-hello-world-260nw-1311244001.jpg',
								options: {
									headers: {
										'Content-Type': 'application/json', 
										'Authorization' : 'Bearer ' + localStorage.access_token
									}
								},
								optionImage: {
									headers: {
										'Content-Type': 'multipart/form-data', 
										'Authorization' : 'Bearer ' + localStorage.access_token
									}
								},
								moment: moment,
                posts: [],
								postDetail: {
									id: '',
									user_id: '',
									written_text: '',
									post_image: ''
								}
            }
        },
        methods: {
					async updatePost(post_id) {
					const url = process.env.VUE_APP_ROOT_API + '/v1/post/' + post_id;
					this.success = false;
					this.error = null;
					try {
						let data = new FormData()
						data.append('user_id', localStorage.id)
						data.append('written_text', this.postDetail.written_text)
						data.append('post_image', this.file)
						data.append('_method', 'PUT')

						const res = await axios.post(url, data, this.optionImage).then(res => res.data);
					
						if( typeof res.profile === 'undefined' ) {
							console.log("Something went wrong!");
							return
						}

						this.success = true;
					
					} catch (err) {
						this.error = err.message;
					}
					},
					async editPost(post_id) {
						console.log("post_id", post_id)
						let response = await axios.get(process.env.VUE_APP_ROOT_API + '/v1/post/' + post_id, this.options)
						this.postDetail = response.data.post
						console.log("edit post", this.postDetail)
					},
					onChange(e) {
						this.file = e.target.files[0];
						console.log(this.file)
					},
					async onSubmitPost(){
						try {
							let data = new FormData()
							data.append('user_id', localStorage.id)
							data.append('written_text', this.writtenText)
							data.append('post_image', this.file)

							const res = await axios.post(process.env.VUE_APP_ROOT_API + '/v1/post', data, this.optionImage).then(res => res.data);
		
							if( typeof res.post === 'undefined' ) {
								this.$router.push({ name: 'Post' })
								return
							}

							this.success = true;
							console.log("test", this.success)
							this.$router.push({ name: 'Post' })
						
						} catch (err) {
							this.error = err.message;
						}

					},
					async loadPosts() {
							let response = await axios.get(process.env.VUE_APP_ROOT_API + '/v1/post', this.options)
							this.posts = response.data.posts
							console.log("res", response.data)
					},
					async doLike(post_id) {
						const formData = { user_id: localStorage.id, post_id: post_id, like: 1 };

						try {
							const res = await axios.post(process.env.VUE_APP_ROOT_API + '/v1/like', formData, this.options).then(res => res.data);
						
							if( typeof res.like === 'undefined' ) {
								console.log("Something went wrong")
								return
							}

							this.success = true;
						
						} catch (err) {
							this.error = err.message;
						}
					}
        },
        mounted() {
            this.loadPosts()
        }
    }
</script>

