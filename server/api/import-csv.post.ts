// composables/useUploadCsv.ts


// export const useUploadCsv = async (file: File) => {
//     const formData = new FormData();
//     formData.append('file', file);
  
//     try {
//       // Verzend naar de Laravel API op poort 8080
//       const { data, error } = await $fetch('http://localhost:8080/api/import-csv', {
//         method: 'POST',
//         body: formData,
//       });
  
//       if (error.value) {
//         throw new Error(`Upload-fout: ${error.value.message}`);
//       }
  
//       return data.value;
//     } catch (err: any) {
//       const errorMessage = err instanceof Error ? err.message : 'Er is een onbekende fout opgetreden.';
//       throw new Error(`Upload-fout: ${errorMessage}`);
//     }
//   };
  