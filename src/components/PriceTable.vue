<template>
  <div class="price-table-page">
    <div class="area one">
      <div class="sidebar">
        <h3>Select paper size</h3>
        <div class="wrap-box">
          <div class="select-box">
          <select
            id="papersize"
            v-model="paperSize"
            @change="onChangePaperSize()"
          >
            <option value="A4">A4</option>
            <option value="A5">A5</option>
            <option value="B4">B4</option>
            <option value="B5">B5</option>
          </select>
        </div>
        <div class="apply">
          <button class="button button-apply">Apply</button>
        </div>
      </div>

      </div>
      <div class="price-table-box">
        <h3>Price table</h3>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Day 1</th>
                <th>Day 2</th>
                <th>Day 3</th>
                <th>Day 4</th>
                <th>Day 5</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in vm.prices">
                <td></td>
                <td>
                  <div class="price">{{ item[0].price }}</div>
                  <div class="quantity">{{ item[0].quantity }}</div>
                  <div class="business_day">{{ item[0].business_day }}</div>
                </td>
                <td 
                    :class="{ selected : isSelected}"
                   @mouseenter="hoverCell"
                   @click="selectedCell()">
                  
                </td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
          <div class="see-more">
            <button class="button button-see-more">See more</button>
          </div>
        </div>

      </div>
    </div>
    <div class="area two">
      <div class="order-price">
        <span>Order price:</span><span>&#165;</span><span>9999</span>
      </div>
      <button class="button button-cart">Cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch, onBeforeMount, onMounted } from "vue";
import axios from "axios";

const isHover = ref(false);
const isSelected = ref(false);

const vm = ref([] as any);
let paperSize = "A4";


const price = ref('');
const orderPrice = ref('');

const hoverCell = () => {
  isHover.value = !isHover.value
}
const selectedCell = () => {
  isSelected.value = !isSelected.value
}

const onChangePaperSize = () => {
  getList();
};

const getList = () => {
  //Function to Show data api by axios api
  let api = "https://us-central1-fe-ws-test.cloudfunctions.net/prices?paper_size=" + paperSize;
    //"https://us-central1-fe-ws-test.cloudfunctions.net/prices?paper_size=" + paperSize;
    
  // axios.get(api).then((response) => {
  //     vm.value = response.data;
  //     console.log("Data API is:", vm.value);
  // })
  // or
  axios.get(api).then((response) => {
    vm.value = response.data;
    console.log(vm.value);
    console.log("5 rows", vm.value.prices.slice(0, 5).length);
    console.log("see more", vm.value.prices.length);
    console.log("Price A4", vm.value.paper_size);


    const getPrice = (prices:any) => {
      return price.value = prices.price
    }
  });
};

onMounted(() => {
  getList();
});
</script>
