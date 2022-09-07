<template>
  <form @submit.prevent="submitForm">
    <div class="control">
      <label for="firstname">First name</label>
      <input type="text" id="firstname" v-model.trim="firstName"/>
    </div>
    <div class="control">
      <label for="lastname">Last name</label>
      <input type="text" id="lastname" v-model.trim="lastName"/>
    </div>
    <div class="control">
      <label for="description">Description</label>
      <input type="textarea" id="description" rows="5" v-model="description"/>
    </div>
    <div class="control">
      <label for="rate">Hourly rate</label>
      <input type="number" id="rate" v-model.number="rate"/>
    </div>
    <div class="control">
      <h3>Areas of expertise</h3>
      <div>
        <label for="frontend">Frontend</label>
        <input type="checkbox" id="frontend" v-model="areas"/>
      </div>
      <div>
        <label for="backend">Backend</label>
        <input type="checkbox" id="backend" v-model="areas"/>
      </div>
      <div>
        <label for="career">Career</label>
        <input type="checkbox" id="career" v-model="areas"/>
      </div>
    </div>
    <BaseButton>Register</BaseButton>
  </form>
</template>

<script>
export default{
  data(){
    return{
      firstName: '',
      lastName: '',
      description: '',
      rate: null,
      areas: []
    }
  },
  methods: {
    submitForm(){
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        description: this.description,
        rate: this.rate,
        areas: this.areas
      }
      console.log(formData)
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>