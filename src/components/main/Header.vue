<template>
  <div class="header">
    <div class="navbar">
      <div class="mobile-menu">
        <q-btn flat @click="toggleMenu">
          <q-icon name="ion-menu" size="md" />
        </q-btn>
      </div>
      <div class="logo" @click="router.push('/'), hideMenu()">
        <h4>Culinista</h4>
      </div>
    </div>
    <div class="menu-section" id="menu-section">
      <div class="menu">
        <nav class="stroke">
          <ul>
            <li @click="router.push('/favourite'), hideMenu()">Favorieten</li>
            <li @click="router.push('/addRecipe'), hideMenu()">
              Recept toevoegen
            </li>
          </ul>
        </nav>
      </div>
      <div class="login">
        <q-btn
          v-if="isAuthenticated"
          class="login-button"
          outline
          label="Logout"
          @click="logoutUser"
        />
        <q-btn
          v-else
          class="login-button"
          outline
          label="Log in"
          @click="login"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router/index";
import { useAuth0 } from "@auth0/auth0-vue";

const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
async function login() {
  loginWithRedirect();
}
function logoutUser() {
  logout({ returnTo: window.location.origin });
}

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

function hideMenu() {
  const x = document.getElementById("menu-section");
  if (x) {
    x.className === "menu-section-hide";
    {
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

@media screen and (max-width: 650px) {
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
    margin-top: 0px;
    padding-left: 0 !important;

    li {
      margin-right: 0 !important;
      margin-left: 0 !important;
      padding: 15px !important;
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
nav ul li {
  padding: 10px;
  margin: 0px 20px 0px 10px;
  text-decoration: none;
  color: rgb(117, 117, 117);
  font-weight: 800;
  text-transform: uppercase;
}
nav ul li,
nav ul li:after,
nav ul li:before {
  transition: all 0.5s;
}
nav ul li:hover {
  color: $dark;
}

nav.stroke ul li {
  position: relative;
  cursor: pointer;
}
nav.stroke ul li:after {
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
nav.stroke ul li:hover:after {
  width: 100%;
}
</style>
