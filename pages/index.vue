

<!-- below here i make a button with a function uploadcsv the sumbit.prevent function makes it so that you can insert
     the file and you can still decide what to do with it -->
     <template>

    
        <header>
            <nav>
            <ul class="css">
                <li class="li"><NuxtLink to="/">Home</nuxtLink></li>
                <li class="li"><NuxtLink to="/data">data</NuxtLink></li>
            </ul>
            </nav>
        </header>


        <div class="css">
        <h1>this is my front end for the csv application</h1>
        </div>
        
        
        <div class="css">
          <form @submit.prevent="uploadCsv">
              <input type="file" ref="fileInput" accept=".csv"/>
              <button type="submit">Upload CSV file</button>
          </form>
        </div>
        
        
        <div class="css">
        <p>with this button above i can insert a data.csv file and insert it in my database i also added a data page where you can see the imported data and delete it if you want it to</p>
        </div>


        </template>
        
        
        <script setup>
        
        // importing ref variable to make it interactive
        import { ref } from 'vue';
        
        // make the fileinput reactive 
        const fileInput = ref(null); 
        
        // Function to upload csv file using a asynchronic fucntion. the function lets the other code be completed while the upload csv loads.
        // the => is an arrow funtion wich is like a compact version of a function that uses a different syntax 
        const uploadCsv = async () => {
        
            // below here i check if a csv has been imported in the input type of fileinput i use === 0 to check if a file was actually selected
            if (!fileInput.value || fileInput.value.files.length === 0) {
                alert('Select a file to import.'); 
                return; 
            }
        
            // below here i make a new variable formData, append means that it will add it to a certain "thing" in this case a 
            // database
            const formData = new FormData();
            formData.append('file', fileInput.value.files[0]); 
        
            try {
                // below here i make a fetch request to my laravel api that sits on localhost 8080 and i ad a methode post because when 
                // tried it without the method i got a get request and an error from laravel so i added a post method.
        
                const result = await $fetch('http://localhost:8080/api/import-csv', {
                    method: 'POST',
                    body: formData, // you need to send the request in the body of the request ( i looked it up on the interwebs so it should be fine)
                });
        
        
                
                alert('yes!!!!!your file has been succesfully uploaded', result); // give an alert message when the file has been succesfully uploaded. after the result variable
        
                // if the file was not succesfully uploaded you catch the error and alert an error that the file was nog uploaded
            } catch (error) {
                alert('Error: your file could not be uploaded', error); 
                 
            }
        };
        </script>
        
        
        
        
        
        
        