<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !firstName.isValid}">
      <label for="firstname">First name</label>
      <input type="text" id="firstname" v-model.trim="firstName.val" @blur="clearError('firstName')"/>
      <p v-if="!firstName.isValid">First name must not be empty</p>
    </div>
    <div class="form-control" :class="{invalid: !lastName.isValid}">
      <label for="lastname">Last name</label>
      <input type="text" id="lastname" v-model.trim="lastName.val" @blur="clearError('lastName')"/>
      <p v-if="!lastName.isValid">Last name must not be empty</p>
    </div>
    <div class="form-control" :class="{invalid: !description.isValid}">
      <label for="description">Description</label>
      <input type="textarea" id="description" rows="5" v-model.trim="description.val" @blur="clearError('description')"/>
      <p v-if="!description.isValid">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{invalid: !rate.isValid}">
      <label for="rate">Hourly rate</label>
      <input type="number" id="rate" v-model.number="rate.val" @blur="clearError('rate')"/>
      <p v-if="!description.isValid">Number must not be empty nor negative</p>
    </div>
    <div class="form-control" :class="{invalid: !areas.isValid}">
      <h3>Areas of expertise</h3>
      <div>
        <label for="frontend">Frontend</label>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas.val" @blur="clearError('areas')"/>
      </div>
      <div>
        <label for="backend">Backend</label>
        <input type="checkbox" id="backend" value="backend" v-model="areas.val" @blur="clearError('areas')"/>
      </div>
      <div>
        <label for="career">Career</label>
        <input type="checkbox" id="career" value="career" v-model="areas.val" @blur="clearError('areas')"/>
      </div>
      <p v-if="!areas.isValid">Check at least one expertise</p>
    </div>
    <p v-if="!formIsValid">Fix above errors before submitting</p>
    <BaseButton>Register</BaseButton>
  </form>
</template>

<script>
export default{
  emits: ['save-data'],
  data(){
    return{
      firstName: {
        val: '',
        isValid: true
      },
      lastName: {
        val: '',
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      rate: {
        val: null,
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      formIsValid: true
    }
  },
  methods: {
    clearError(input){
      this[input].isValid = true
    },
    validateForm(){
      this.formIsValid = true
      if (this.firstName.val === ''){
        this.firstName.isValid = false
        this.formIsValid = false
      }
      if (this.lastName.val === ''){
        this.lastName.isValid = false
        this.formIsValid = false
      }
      if (this.description.val === ''){
        this.description.isValid = false
        this.formIsValid = false
      }
      if (!this.rate.val || this.rate.val < 0){
        this.rate.isValid = false
        this.formIsValid = false
      }
      if (!this.areas.val.length === 0){
        this.areas.isValid = false
        this.formIsValid = false
      }
    },
    submitForm(){
      this.validateForm()
      if(!this.formIsValid) return
      const formData = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        description: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val
      }
      this.$emit('save-data', formData)
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

p {
  color: red;
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