<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
  <div class="container-fluid">
    <router-link class="navbar-brand" to='/'>浪貓之家</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <!-- <a class="nav-link active" aria-current="page" href="#">動物故事</a> -->
        <router-link class="nav-link mt-2" to="/about">關於我們</router-link>
        <!-- <a class="nav-link" href="#">愛心名冊</a> -->
        <router-link class="nav-link mt-2" to="/donate">我要捐款</router-link>
        <router-link class="nav-link bi bi-bag-heart-fill fs-4" to="/cart"></router-link>
      </div>
    </div>
  </div>
</nav>
</template>
