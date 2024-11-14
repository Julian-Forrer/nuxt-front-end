import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'; 


import data from '/pages/data.vue'


// this test is to test the api with some mock data
describe('Sharesquare Page', () => {

  // the wrapper is made to mount the component with (sort of save it)
    let wrapper;
  
    // before each and after each are "lifecycle hooks", they are used to setup and cleanup the resources used in the test  
    beforeEach(() => {
    
    // below here i "mock" the fetch function, so each time i call it the mocked data will be used
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              { planid: 1, firstname: 'John', lastname: 'Doe', email: 'john@example.com', kpi: 'KPI 1', value: 100, date: '2024-01-01' },
              { planid: 2, firstname: 'Jane', lastname: 'Doe', email: 'jane@example.com', kpi: 'KPI 2', value: 200, date: '2024-01-02' },
              { planid: 3, firstname: 'Jim', lastname: 'Beam', email: 'jim@example.com', kpi: 'KPI 3', value: 300, date: '2024-01-03' }
            ])
        })
      );
  
      // Mount de component
      wrapper = mount(data);
    });
  
    afterEach(() => {
      // after each so that the wrapper will cleanup the test envirement
      if (wrapper) {
        wrapper.unmount();
      }
      vi.restoreAllMocks(); 
    });


   // it is used to describe a particular test so here i test should display the mocked data in the table to test the table with some mocked data
    it('should display the mocked data in the table', async () => {
      
      
      
      await wrapper.vm.$nextTick();
  
      // looking for al the table body rows 
      const dataRows = wrapper.findAll('tbody tr');
  
      // expect the data to be 3 rows long
      expect(dataRows.length).toBe(3); 
  
      expect(dataRows[0].findAll('td')[1].text()).toContain('John');  
      expect(dataRows[1].findAll('td')[1].text()).toContain('Jane');  
      expect(dataRows[2].findAll('td')[1].text()).toContain('Jim');    
    });





  });
  
