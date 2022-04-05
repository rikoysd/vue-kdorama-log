<template>
  <div>
    <form class="form">
      <div class="top-wrapper">
        <div class="container">
          <div class="row register-page">
            <div class="error">{{ errorMessage }}</div>
            <div class="row">
              <div class="error">{{ errorLastName }}</div>
              <div class="error">{{ errorFirstName }}</div>
              <div class="input-field col s6">
                <input
                  id="last_name"
                  type="text"
                  class="validate"
                  v-model="lastName"
                  required
                />
                <label for="last_name">姓</label>
              </div>
              <div class="input-field col s6">
                <input
                  id="first_name"
                  type="text"
                  class="validate"
                  v-model="firstName"
                  required
                />
                <label for="first_name">名</label>
              </div>
            </div>
            <div class="row">
              <div class="error">{{ errorMailAddress }}</div>
              <div class="input-field col s12">
                <input
                  id="email"
                  type="email"
                  class="validate"
                  v-model="mailAddress"
                  required
                />
                <label for="email">メールアドレス</label>
              </div>
            </div>
            <div class="error">{{ errorZipCode }}</div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="zipcode"
                  type="text"
                  maxlength="8"
                  v-model="zipCode"
                />
                <label for="zipcode">郵便番号</label>
                <button class="btn" type="button" v-on:click="getAddress">
                  <span>住所検索</span>
                </button>
              </div>
            </div>
            <div class="row">
              <div class="error">{{ errorAddress }}</div>
              <div class="input-field col s12">
                <input id="address" type="text" v-model="address" />
                <label for="address">住所</label>
              </div>
            </div>
            <div class="row">
              <div class="error">{{ errorTelephone }}</div>
              <div class="input-field col s12">
                <input id="tel" type="tel" maxlength="14" v-model="telephone" />
                <label for="tel">電話番号</label>
              </div>
            </div>
            <div class="row">
              <div class="error">{{ errorPassword }}</div>
              <div class="input-field col s12">
                <input
                  id="password"
                  type="password"
                  class="validate"
                  minlength="8"
                  v-model="password"
                  required
                />
                <label for="password">パスワード</label>
              </div>
            </div>
            <div class="row">
              <div class="error">{{ errorPasswordConfirmation }}</div>
              <div class="input-field col s12">
                <input
                  id="confirmation_password"
                  type="password"
                  class="validate"
                  minlength="8"
                  v-model="passwordConfirmation"
                  required
                />
                <label for="confirmation_password">確認用パスワード</label>
              </div>
            </div>
            <div class="row register-admin-btn">
              <button class="btn" type="button" v-on:click="registerUser">
                <span>登録<i class="material-icons right">done</i></span>
              </button>
              <button type="button" v-on:click="reset" class="clear-btn">
                クリア
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped></style>
