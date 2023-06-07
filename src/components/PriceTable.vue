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
                <th>
                  <p>Day 1</p>
                  <p>Price x Quantity</p>
                </th>
                <th>
                  <p>Day 2</p>
                  <p>Price x Quantity</p>
                </th>
                <th>
                  <p>Day 3</p>
                  <p>Price x Quantity</p>
                </th>
                <th>
                  <p>Day 4</p>
                  <p>Price x Quantity</p>
                </th>
                <th>
                  <p>Day 5</p>
                  <p>Price x Quantity</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in vm.prices">
                <td></td>
                <td v-for="(itemChild) in item"
                   :class="{ selected : isSelected}"
                   @mouseenter="hoverCell"
                   @click="selectedCell(itemChild.price)">
            
                  <div class="price">{{ itemChild.price }} x {{ itemChild.quantity }}</div>
                  <!-- <div class="quantity">{{ itemChild.quantity }}</div> -->
                  <!-- <div class="business_day">{{ itemChild.business_day }}</div> -->
                </td>
              </tr>
            </tbody>
          </table>
          <div class="see-more">
            <button class="button button-see-more" @click="seeAllData">See more</button>
          </div>
        </div>

      </div>
    </div>
    <div class="area two">
      <div class="order-price">
        <span>Order price:</span><span>&#165;</span><span>{{ valueClicked }}</span>
      </div>
      <button class="button button-cart">Cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch, onBeforeMount, onMounted, computed } from "vue";
import axios from "axios";

const isHover = ref(false);
const isSelected = ref(false);

const vm = ref([] as any);
const vmTemp = ref([] as any);
let paperSize = "A4";


const price = ref('');
const orderPrice = ref('');
let valueClicked = '';

const hoverCell = () => {
  isHover.value = !isHover.value
}
const selectedCell = (inputValueSelected : any) => {
  isSelected.value = !isSelected.value;
  valueClicked = inputValueSelected;
}

const onChangePaperSize = () => {
  get5Items();
};

const seeAllData = () => {
  getList();
};

const get5Items = async () => {
  await getList();
  vm.value.prices = vm.value.prices.slice(0,5);
};


const getList = async () => {
  let api = "https://us-central1-fe-ws-test.cloudfunctions.net/prices?paper_size=" + paperSize;
  //"https://us-central1-fe-ws-test.cloudfunctions.net/prices?paper_size=A4"



  const response = await axios.get(api);
  vm.value =  response.data;
};

onMounted(() => {
  get5Items();
});
</script>
