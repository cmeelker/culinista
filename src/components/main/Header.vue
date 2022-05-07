<template>
  <div class="header">
    <div class="navbar">
      <div class="mobile-menu">
        <q-btn flat @click="toggleMenu">
          <q-icon name="ion-menu" size="md" />
        </q-btn>
      </div>
      <div class="logo">
        <h4>Culinista</h4>
      </div>
    </div>
    <div class="menu-section">
      <div class="menu" id="menu">
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
</template>

<script setup lang="ts">
function toggleMenu() {
  alert("hallo");
  const x = document.getElementById("menu");

  if (x.className === "menu") {
    x.className += "-responsive";
  } else {
    x.className = "menu";
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/quasar.variables.scss";

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

.mobile-menu {
  display: none;
}

@media screen and (max-width: 600px) {
  .header {
    flex-direction: column;
  }

  .mobile-menu {
    display: block;
  }

  .menu-section {
    flex-direction: column;
  }
}

.menu-responsive {
}

.logo {
  h4 {
    font-weight: 800;
    text-transform: uppercase;
    color: $dark;
  }
}

.menu-section {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.login {
  .button {
    color: $dark;
  }
}

nav ul {
  list-style: none;
  text-align: center;
  display: flex;
}
nav ul li {
  margin-right: 20px;
}
nav ul li a {
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
