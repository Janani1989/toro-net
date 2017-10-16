<template>
  <div class="container">
   <div v-if="!this.$store.state.user.displayName">
<form @submit.prevent="validateBeforeSubmit" id="register" action="/users" method="post">
    <div class="form-group">
   
      <input type="text" class="form-control" placeholder="Display name" v-model="displayName" name="displayName">
    </div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Username" v-model="username" name="username">
    </div>
    <div class="form-group" :class="{'has-error': errors.has('email') }" >
          <input v-model="email" name="email" v-validate="'required|email'" data-vv-delay="500" type="text" data-vv-as="email address" placeholder="Email" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('email')">{{ errors.first('email') }}</p>
</div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Password" v-model="password" name="password">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Confirm password" v-model="passwordConf" name="passwordConf">
    </div>
    <button class="btn btn-success" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      displayName: '',
      username: '', 
      email: '',
      password: '',
      passwordConf: '' 
    }
  },
  methods: {
    registerUser() {
      const newUser = {
        displayName: this.displayName,
        username: this.username,
        email: this.email,
        password: this.password,
        passwordConf: this.passwordConf,
      }
      this.$store.dispatch('register', newUser)
    }
  },
 methods: {
    validateBeforeSubmit(e) {
        this.$validator.validateAll();
        if (!this.errors.any()) {
            this.submitForm()
        }
      },
    submitForm(){
      this.formSubmitted = true
    }
  } 

}
</script>