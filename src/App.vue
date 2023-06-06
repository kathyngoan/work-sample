<template>
<main>
  
  <div class="home">
      <div class="container">
         
          <div class="wrapBox position-relative aos-init aos-animate" data-aos="fade-up" data-aos-once="false"  data-aos-duration="3000">
              <div class="row box position-relative p-lg-5 p-4">
                  <div class="col-12 col-md-12 col-lg-4 mr-auto">
                      <div class="d-flex align-items-center h-100">
                          <div class="">
                              <h3 class="h4 textGradient mb-4 mt-4 mt-lg-0 aos-init aos-animate" data-aos="fade-right" >What we do
                              </h3>
                              <h2 class="h3 font-weight-bold mb-4">End-to-End Commerce Enablement Platform</h2>
                              <div class="mb-0 mb-lg-5 aos-init aos-animate" data-aos="fade-in" data-aos-delay="500">
                                  <p class="mb-0">
                                      Tap on software forming infrastructure that powers the next-generation of commerce. Unlock
                                      holistic data and functionality across key business functions, from manufacturing and e-commerce
                                      to logistics, marketing, and more.
                                  </p>
                              </div>
                              <a href="#" class="btn btn-outline-primary mb-2 aos-init aos-animate" data-aos="fade-in" data-aos-delay="500">DISCOVER MORE</a>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 col-md-12  col-lg-7">
                      <img class="w-100 mb-4 mb-lg-0" src="https://i2.au.reastatic.net/800x600/948ea0ed21babbcda649305c45693ed902e59e4fa06dbdb2a83f00b1fc6aaaa7/main.jpg" alt="What we do">
                  </div>
              </div>

              <div class="row boxShadow"></div>
          </div>

          <div class="newsHome px-4 py-5" id="custom-cards" data-aos="fade-up" data-aos-once="true">
                <!-- Show data api by axios api -->
                <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5 d-none">
                    <div class="col" v-for="item in vm" :key="item.id">
                        <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style="background-image: url('https://p4.wallpaperbetter.com/wallpaper/500/442/354/outrun-vaporwave-hd-wallpaper-thumb.jpg');">
                            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{{item.title}}</h2>
                                <ul class="d-flex list-unstyled mt-auto">
                                    <li class="me-auto">
                                        <img src="https://p4.wallpaperbetter.com/wallpaper/500/442/354/outrun-vaporwave-hd-wallpaper-thumb.jpg" alt="Bootstrap" width="32" height="32" class="rounded-circle border border-white">
                                    </li>
                                    <li class="d-flex align-items-center me-3">
                                        <svg class="bi me-2" width="1em" height="1em">
                                            <use xlink:href="#geo-fill" /></svg>
                                        <small>Earth</small>
                                    </li>
                                    <li class="d-flex align-items-center">
                                        <svg class="bi me-2" width="1em" height="1em">
                                            <use xlink:href="#calendar3" /></svg>
                                        <small>3d</small>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
          </div>

      </div>

  </div>
</main>
</template>

<style>
@import '@/assets/base.css';
</style>

<script setup lang="ts">
import { inject, ref, watch, onBeforeMount, onMounted } from "vue";
import axios from "axios";
const msg = ref("booo");
const vm = ref([] as any) ;


const getList = () =>  { //Function to Show data api by axios api
    let apiPost = "https://jsonplaceholder.typicode.com/posts";
    let api = "https://us-central1-fe-ws-test.cloudfunctions.net/prices?paper_size=A4"
    // axios.get(api).then((response) => {
    //     vm.value = response.data;
    //     console.log("Data API is:", vm.value);
    // })
    // or
    axios.get(api).then((response) => {
        vm.value = response.data;
        console.log(vm.value)
    })
};

onBeforeMount(() => {
    console.log("before");
});
onMounted(()=> {
    getList(); //Call Function to Show data api by axios api
});

</script>

