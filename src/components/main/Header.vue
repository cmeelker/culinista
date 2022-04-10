<template>
  <div class="header">
    <div class="navbar">
      <div class="logo">
        <img src="@/assets/culinista.png" />
      </div>
      <div class="login">
        <q-btn class="login-button" outline label="Log in" />
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="slogan">
          <h3>
            Al je recepten <br />
            op één plek
          </h3>
        </div>
        <div class="add-recipe">
          <q-btn class="add-button" label="Recept toevoegen" />
        </div>
      </div>
      <div class="right">
        <img src="@/assets/pasta-bro.png" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/quasar.variables.scss";

.header {
  display: flex;
  flex-direction: column;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

.logo {
  img {
    height: 40px;
  }
}

.login {
  .button {
    color: $dark;
  }
}

.content {
  display: flex;
  height: 100%;
}

.left {
  flex: 10;
}

.slogan {
  margin-left: 30%;
  h3 {
    margin-bottom: 20px;
    color: $dark;
  }
}

.add-button {
  margin-left: 30%;
}

.add-button {
  color: white;
  background-color: $primary;
}

.right {
  flex: 8;
  img {
    position: absolute;
    height: 400px;
    top: -50px;
  }
}

@media only screen and (max-width: 500px) {
  .content {
    display: none;
  }
}
</style>
