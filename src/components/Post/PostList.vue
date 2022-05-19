<template>
	<div class="container">
	<div class="row">
		<div class="col-12">
			<main class="form-post">
				<form @submit.prevent="onSubmitPost">
						<div class="card mb-3">
						<!-- <img src="..." class="card-img-top" alt="..."> -->

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
				<!-- <img src="..." class="card-img-top" alt="..."> -->

				<!-- <div class="card-body text-start">
					<p class="card-text">{{ post.written_text }}</p>
					<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
					
					<div class="float-holder clearfix">
						<div class="form-group col-10 float-right">
							<textarea class="comment float-start form-control" placeholder="Leave a comment here"></textarea>
						</div>
						<button type="button" class="btn btn-primary btn-sm col-1 float-start"  @click="doComment(post.id)">Comment</button>
					</div>

					<section class="float-none col-12">
						<span class="like" @click="doLike(post.id)">Like</span>
					</section>
				</div> -->

    <div class="col-md-7 text-start">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <h3 class="mb-0">{{ post.written_text }}</h3>
          <p class="card-text mb-auto">Last updated 3 mins ago</p>
          <div class="row">
						<button class="col-md-6">Like (10)</button> <button class="col-md-6">Comment</button>
					</div>
        </div>
        <div class="col-auto d-none d-lg-block">
          <svg class="bd-placeholder-img" width="200" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
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
    export default {
        name: 'post-list',
        components: {
        },
        data() {
            return {
								writtenText: '',
								mediaLocation: 'https://image.shutterstock.com/image-photo/green-hello-world-260nw-1311244001.jpg',
								options: {
									headers: {
										'Content-Type': 'application/json', 
										'Authorization' : 'Bearer ' + localStorage.access_token
									}
								},
								moment: moment,
                posts: []
            }
        },
        methods: {
					async onSubmitPost(){
						const formData = { user_id: localStorage.id, written_text: this.writtenText, media_location: this.mediaLocation };
						console.log("formData", formData);
						try {
							const res = await axios.post(process.env.VUE_APP_ROOT_API + '/v1/post', formData, this.options).then(res => res.data);
		
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
							console.log("headers", this.options)
							let response = await axios.get(process.env.VUE_APP_ROOT_API + '/v1/post', this.options)
							this.posts = response.data.posts
							console.log("res", response.data)
					},
					async doLike(post_id) {
						const formData = { user_id: localStorage.id, post_id: post_id, like: 1 };

						try {
							const res = await axios.post(process.env.VUE_APP_ROOT_API + '/v1/like', formData, this.options).then(res => res.data);
						
							if( typeof res.user === 'undefined' ) {
								console.log("inside");
								this.$router.push({ name: 'Login' })
								return
							}

							this.success = true;
							this.$router.push({ name: 'Login' })
						
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

