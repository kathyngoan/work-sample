<template>
  <div class="greetings">
    <h1 class="green"></h1>
    <h3>
      <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5 d-none">
        <div class="col" v-for="item in vm" :key="item.id">
          <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
            style="background-image: url('https://p4.wallpaperbetter.com/wallpaper/500/442/354/outrun-vaporwave-hd-wallpaper-thumb.jpg');">
            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
              <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{{ item.title }}</h2>
              <ul class="d-flex list-unstyled mt-auto">
                <li class="me-auto">
                  <img src="https://p4.wallpaperbetter.com/wallpaper/500/442/354/outrun-vaporwave-hd-wallpaper-thumb.jpg"
                    alt="Bootstrap" width="32" height="32" class="rounded-circle border border-white">
                </li>
                <li class="d-flex align-items-center me-3">
                  <svg class="bi me-2" width="1em" height="1em">
                    <use xlink:href="#geo-fill" />
                  </svg>
                  <small>Earth</small>
                </li>
                <li class="d-flex align-items-center">
                  <svg class="bi me-2" width="1em" height="1em">
                    <use xlink:href="#calendar3" />
                  </svg>
                  <small>3d</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </h3>
    <select id="papersize" v-model="paperSize" @change="onChangePaperSize()">
      <option value="A4">A4</option>
      <option value="A5">A5</option>
      <option value="B4">B4</option>
      <option value="B5">B5</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch, onBeforeMount, onMounted } from "vue";
import axios from 'axios'

const vm = ref([] as any) ;
let paperSize = 'A4';

const onChangePaperSize = () => {
    getList();
}

const getList = () => { //Function to Show data api by axios api
  let api = "https://us-central1-fe-ws-test.cloudfunctions.net/prices?paper_size=" + paperSize;
  // axios.get(api).then((response) => {
  //     vm.value = response.data;
  //     console.log("Data API is:", vm.value);
  // })
  // or
  axios.get(api).then((response) => {
    vm.value = response.data;
    console.log(vm.value);
    console.log('5 rows',vm.value.prices.slice(0, 5).length);
    console.log('see more', vm.value.prices.length);
  })
};


onMounted(() => {


  getList(); 
});
</script>
