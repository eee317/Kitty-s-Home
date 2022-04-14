<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="mb-3 text-center">
          <img
            class="img-fluid"
            src="@/libs/img/undraw_happy_Finish.svg"
            style="height: 300px"
            alt=""
          />
        </div>
        <div
          class="
            bg-light
            mb-4
            d-flex
            justify-content-center
            align-items-center
            flex-column
            text-center
          "
        >
          <div class="p-4 text-primary lh-lg text-center">
            <h3>捐款完成</h3>
            <router-link class="btn btn-primary mt-3" to="/donate"
              >返回捐款列表</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
