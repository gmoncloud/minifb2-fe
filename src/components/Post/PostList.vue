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
									<button type="submit" class="btn btn-primary btn-sm col-1 float-start">Submit</button>
								</div>
						</div>
					</div>
				</form>
			</main>
		</div>
	</div>
  <div class="row">
    <div class="col-12" v-if="posts.length" >
			
			<div class="card mb-3" v-for="post in posts" :key="post.id">
				<!-- <img src="..." class="card-img-top" alt="..."> -->

				<div class="card-body">
					<p class="card-text">{{ post.written_text }}</p>
					<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
					
					<div class="float-holder clearfix">
						<div class="form-group col-10 float-right">
							<textarea class="comment float-start form-control" placeholder="Leave a comment here"></textarea>
						</div>
						<button type="button" class="btn btn-primary btn-sm col-1 float-start">Submit</button>
					</div>

					<section class="float-none col-12">
						<span class="like" @click="doComment(post.id)">Like</span>
					</section>
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

