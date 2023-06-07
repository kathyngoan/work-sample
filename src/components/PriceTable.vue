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
                   :class="{ selected : itemChild.isSelected}"
                   @mouseenter="hoverCell"
                   @click="selectedCell(itemChild.id)">
            
                  <div class="price" v-text="formatNumberWithCommas1(itemChild.price * itemChild.quantity)"></div>
                  <!-- <div class="quantity">{{ itemChild.quantity }}</div> -->
                  <!-- <div class="business_day">{{ itemChild.business_day }}</div> -->
                </td>
              </tr>
            </tbody>
          </table>
          <div class="see-more">
            <button :hidden="isHideSeeMoreButton" class="button button-see-more" @click="seeAllData">See more</button>
          </div>
        </div>

      </div>
    </div>
    <div class="area two">
      <div class="order-price">
        <span>Order price:</span><span>&#165;</span><div v-text="formatNumberWithCommas1(orderPrice)"></div>
      </div>
      <button class="button button-cart">Cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch, onBeforeMount, onMounted, computed } from "vue";
import axios from "axios";

const isHover = ref(false);
const isHideSeeMoreButton = ref(false);

const vm = ref([] as any);
let paperSize = "A4";


const price = ref('');
const orderPrice = ref(0);
let valueClicked = '';

const hoverCell = () => {
  isHover.value = !isHover.value
}
const selectedCell = (inputValueId : any) => {
  let rowX, colY;
  vm.value?.prices?.forEach((element:any, row:any) => {
    element.forEach((elementChild:any, col:any) => {
    if(elementChild.id == inputValueId) {
        elementChild.isSelected = !elementChild.isSelected;
        orderPrice.value = elementChild.isSelected ? elementChild.price +  orderPrice.value : orderPrice.value - elementChild.price;
        console.log(row, col);
        rowX = row;
        colY = col;
    }
    else {
      elementChild.isSelected = false;
    }
    });
  });
  highlight(rowX, colY);
}

const onChangePaperSize = () => {
  //set value ở đây cho paperSize ở đây, khi nào bấm apply mới gọi get5Items
  //get5Items();
};

const seeAllData = () => {
  isHideSeeMoreButton.value = true;
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
  
  //Add isSelected property
  let index = 0;
  response.data?.prices.forEach((element: any) => {
    element.forEach((elementChild:any) => {
      elementChild.isSelected = false;
      elementChild.id = index;
      index++;
    });
  });
  vm.value = response.data;
};

//HoanNguyen
const formatNumberWithCommas1 = (number:any) => {
  // Convert the number to a string
  let numberString = String(number);

  // Add commas to the number
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  numberString = numberString.replace(regex, ",");

  return numberString;
}

const formatNumberWithCommas2 = (number:any) => {
  // Convert the number to a string
  let numberString = String(number);

  // Split the number into integer and decimal parts (if any)
  const parts = numberString.split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1] || "";

  // Create an array to store the formatted digits
  const formattedDigits = [];

  // Iterate over the integer part from right to left
  for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
    // Add a comma after every third digit
    if (count > 0 && count % 3 === 0) {
      formattedDigits.unshift(",");
    }
    formattedDigits.unshift(integerPart[i]);
  }

  // Combine the formatted digits and decimal part (if any)
  const formattedNumber = formattedDigits.join("") + (decimalPart ? "." + decimalPart : "");

  return formattedNumber;
}

const highlight = (row :any, col:any) => {
  for (let i = 0; i < vm.value?.prices?.length; i++) {
    for (let j = 0; j < vm.value?.prices[i].length; j++) {
      console.log('higjk', row, col);
      if(i==row || j==col) {
        vm.value.prices[i][j].isSelected = true;
      }
    }
  }

  return null; // Return null if the value is not found
}

onMounted(() => {
  get5Items();
});
</script>
