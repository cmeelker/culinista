<template>
  <div class="header">
    <div class="navbar">
      <div class="mobile-menu">
        <q-btn flat @click="toggleMenu">
          <q-icon name="ion-menu" size="md" />
        </q-btn>
      </div>
      <div class="logo" @click="router.push('/')">
        <h4>Culinista</h4>
      </div>
    </div>
    <div class="menu-section" id="menu-section">
      <div class="menu">
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
import router from "@/router/index";

function toggleMenu() {
  const x = document.getElementById("menu-section");

  if (x) {
    if (x.className === "menu-section") {
      x.className += "-hide";
    } else {
      x.className = "menu-section";
    }
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

.logo {
  :hover {
    cursor: pointer;
  }
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
  display: flex;
  justify-content: center;
  .button {
    color: $dark;
  }
}

@media screen and (max-width: 600px) {
  .header {
    flex-direction: column;
  }

  .mobile-menu {
    display: block;
  }

  .menu-section {
    display: none;
  }

  .menu {
    width: 100%;
  }

  nav ul {
    flex-direction: column;
    padding-left: 5px;
    margin-top: 0px;

    li {
      margin-right: 2px !important;
      padding: 15px;
      margin-bottom: -1px;
      border-top: 1px solid #d4d4d3;
      border-bottom: 1px solid #d4d4d3;
    }
  }
}

.menu-section-hide {
  flex-direction: column;
  position: relative;
  background-color: $background;
  border-bottom: 1px solid black;
  margin-right: 0px !important;
  padding-bottom: 15px;
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
