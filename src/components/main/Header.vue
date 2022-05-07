<template>
  <div class="header">
    <div class="navbar">
      <div class="logo">
        <img src="@/assets/culinista.png" />
      </div>
      <div class="right-section">
        <div>
          <nav class="stroke">
            <ul>
              <li><a href="#">Recept toevoegen</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
        <div class="login">
          <q-btn class="login-button" outline label="Log in" />
        </div>
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

.right-section {
  display: flex;
  align-items: center;
}

.login {
  .button {
    color: $dark;
  }
}

nav ul {
  list-style: none;
  text-align: center;
}
nav ul li {
  display: inline-block;
  margin-right: 20px;
}
nav ul li a {
  display: block;
  padding: 10px;
  margin: 0px 10px 0px 10px;
  text-decoration: none;
  color: rgb(117, 117, 117);
  font-weight: 800;
  text-transform: uppercase;
}
nav ul li a,
nav ul li a:after,
nav ul li a:before {
  transition: all 0.5s;
}
nav ul li a:hover {
  color: $dark;
}

nav.stroke ul li a {
  position: relative;
}
nav.stroke ul li a:after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 0%;
  content: ".";
  color: transparent;
  background: $accent;
  height: 2px;
}
nav.stroke ul li a:hover:after {
  width: 100%;
}
</style>
