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
          >
            <option value="A4">A4</option>
            <option value="A5">A5</option>
            <option value="B4">B4</option>
            <option value="B5">B5</option>
          </select>
        </div>
        <div class="apply">
          <button @click="applyClick" class="button button-apply">Apply</button>
        </div>
      </div>

      </div>
      <div class="price-table-box">
        <h3>Price table: <span>{{ titlePriceTable }}</span></h3>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>
                  <p>Day 1</p>
                  <p>Price | Quantity</p>
                </th>
                <th>
                  <p>Day 2</p>
                  <p>Price | Quantity</p>
                </th>
                <th>
                  <p>Day 3</p>
                  <p>Price | Quantity</p>
                </th>
                <th>
                  <p>Day 4</p>
                  <p>Price | Quantity</p>
                </th>
                <th>
                  <p>Day 5</p>
                  <p>Price | Quantity</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in vm.prices">
                <td></td>
                <td v-for="(itemChild) in item"
                   :class="{ selected : itemChild.isSelected, hover : itemChild.isHover}"
                   @mouseenter="selectedCell(itemChild.id)"
                   @click="selectedCell(itemChild.id)">
                  <div class="info">
                    <span v-text="formatNumberWithCommas(itemChild.price)"></span>
                    <span class="divider">|</span>
                    <span>{{ itemChild.quantity }}</span>
                  </div>
                  <!-- <div class="business_day">{{ itemChild.business_day }}</div> -->
                </td>
              </tr>
            </tbody>
          </table>
          <div class="see-more">
            <button :hidden="isHideSeeMoreButton" class="button button-see-more" @click="seeAllData">See more</button>
            <button :hidden="isHideSeeLessButton" class="button button-see-less" @click="showSeeLessButton">See less</button>
          </div>
        </div>

      </div>
    </div>
    <div class="area two">
      <div class="order-price">
        <span>Order price:</span><span class="unit">&#165;</span><div v-text="formatNumberWithCommas(orderPrice)"></div>
      </div>
      <button class="button button-cart">Cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const isHover = ref(false);
const isHideSeeMoreButton = ref(false);
const isHideSeeLessButton = ref(true);

const vm = ref([] as any);
const paperSize = ref("A4");

const orderPrice = ref(0);

const titlePriceTable = ref('');

// const hoverCell = () => {
//   isHover.value = !isHover.value
// }

const applyClick = () => {
  get5Items();
  titlePriceTable.value = paperSize.value;
}

const showSeeLessButton = () => {
  get5Items();
  isHideSeeMoreButton.value = false;
  isHideSeeLessButton.value = true;
}


const selectedCell = (inputValueId : any) => {
  let rowX, colY;
  vm.value?.prices?.forEach((element:any, row:any) => {
    element.forEach((itemChild:any, col:any) => {
    if(itemChild.id == inputValueId) {
      itemChild.isSelected = !itemChild.isSelected;
        //orderPrice.value = itemChild.price * itemChild.quantity;
        orderPrice.value = itemChild.price;
        rowX = row;
        colY = col;
    }
    else {
      itemChild.isSelected = false;
    }
    });
  });
  highlight(rowX, colY);
}


const seeAllData = () => {
  isHideSeeMoreButton.value = true;
  isHideSeeLessButton.value = false;
  getList();
};

const get5Items = async () => {
  await getList();
  vm.value.prices = vm.value.prices.slice(0,5);
};


const getList = async () => {
  let api = "https://us-central1-fe-ws-test.cloudfunctions.net/prices?paper_size=" + paperSize.value; 
  //"https://us-central1-fe-ws-test.cloudfunctions.net/prices?paper_size=A4"

  const response = await axios.get(api);
  
  //Add isSelected property
  let index = 0;
  response.data?.prices.forEach((price: any) => {
    price.forEach((price:any) => {
      price.isSelected = false;
      price.id = index;
      index++;
    });
  });
  vm.value = response.data;
};

const formatNumberWithCommas = (number:any) => {
  let numberString = String(number);
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  numberString = numberString.replace(regex, ",");

  return numberString;
}

const formatNumberWithCommasOpt = (number:any) => {
  let numberString = String(number);

  const parts = numberString.split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1] || "";

  const formattedDigits = [];

  for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
    if (count > 0 && count % 3 === 0) {
      formattedDigits.unshift(",");
    }
    formattedDigits.unshift(integerPart[i]);
  }

  const formattedNumber = formattedDigits.join("") + (decimalPart ? "." + decimalPart : "");

  return formattedNumber;
}

const highlight = (row :any, col:any) => {
  for (let i = 0; i < vm.value?.prices?.length; i++) {
    for (let j = 0; j < vm.value?.prices[i].length; j++) {
      if(i==row && j==col) {
        vm.value.prices[i][j].isHover = false;
      }
      else if(i==row || j==col) {
        vm.value.prices[i][j].isHover = true;
      }
      else {
        vm.value.prices[i][j].isHover = false;
      }
    }
  }

  return null; 
}

onMounted(() => {
  get5Items();
});
</script>
