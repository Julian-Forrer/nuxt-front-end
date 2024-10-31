<template>
    <div>
      
      <div class="css">
      <h1>ShareSquare Data</h1>
      </div>

      <header>
            <nav>
            <ul class="css">
                <li class="li"><NuxtLink to="/">Home</nuxtLink></li>
                <li class="li"><NuxtLink to="/data">data</NuxtLink></li>
            </ul>
            </nav>
        </header>


      <table>
        <thead>
          <tr>
            <th>Plan ID <icon name="icon-park-solid:abnormal" class="icon"></icon></th>
            <th>First Name  <icon name="fa-regular:hand-peace" class="icon"></icon></th>
            <th>Last Name  <icon name="fa-regular:kiss" class="icon"></icon></th>
            <th>Email  <icon name="ic:baseline-email" class="icon"></icon></th>
            <th>KPI <icon name="ic:baseline-emoji-food-beverage" class="icon"></icon></th>
            <th>Value <icon name="ic:baseline-attach-money" class="icon"></icon></th>
            <th>Date  <icon name="ic:baseline-calendar-month" class="icon"></icon></th>
            <th>delete <icon name="material-symbols:auto-delete-outline" class="icon"></icon></th>
          </tr>
        </thead>
        <tbody>
          <!-- here i do a loop to iterate through the index of the sharesqaure schema from my laravel app -->
          <tr v-for="(item, index) in sharesquare" :key="index">
            <td>{{ item.planid }}</td>
            <td>{{ item.firstname }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.kpi }}</td>
            <td>{{ item.value }}</td>
            <td>{{ item.date }}</td>
            
            <!-- below here i want to make a delete button to connect with my backend -->
            <td> <button @click="deleteRecord(item.id)"><icon name="material-symbols:auto-delete-outline" class="icon"></icon></button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>







  <script setup>

  // the onmounted function means that the code will run after the browser has loaded 
  import { ref, onMounted } from 'vue';
  
  // make a variabble interactive
  const sharesquare = ref([]);
  
  // make an asynch function with an arrow function to fetch the date from my laravel app at the sharesqaure table
  onMounted(async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sharesquare');
      if (!response.ok) {
        throw new Error(`the file could not be uploaded ${response.statusText}`);
      }
      sharesquare.value = await response.json();
    } catch (error) {
      console.error('error in retrieving the data', error);
    }
  });


    // below here i delete a record by its it id

    // here a variable with the async function to get the deleterecord with the id  
  const deleteRecord = async (id) => {

    const confirmed = confirm("are you sure you want to delete this record?"); // here i want you to confirm to delete this record

    if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/destroy/${id}`, { // here i call upon the destroy route in my laravel backend
      method: 'DELETE', // here i use the delete method do delete the record
    });


    
    if (!response.ok) {
      throw new Error(`this action has not been completed due to an error ${response.statusText}`);
    }
    
    // delete the table value and filter on the item.id from the loop
    sharesquare.value = sharesquare.value.filter(item => item.id !== id);
    alert('this record has been succesfully deleted');
  } catch (error) {
    console.error('this record couldnt be deleted', error);
    alert('please try again');
  }
};
  </script>
  