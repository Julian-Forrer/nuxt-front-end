import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'; 


import data from '/pages/data.vue'



describe('Sharesquare Page', () => {
    let wrapper;
  
    beforeEach(() => {
      // Mock de fetch functie
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
      // Unmount de wrapper na elke test, alleen als het gedefinieerd is
      if (wrapper) {
        wrapper.unmount();
      }
      vi.restoreAllMocks(); // Herstel mocks naar hun originele staat
    });
  
    it('should display the mocked data in the table', async () => {
      // Wacht op de DOM-update
      await wrapper.vm.$nextTick();
  
      // Zoek naar alle <tr> elementen in de tabel
      const dataRows = wrapper.findAll('tbody tr');
  
      // Controleer of het juiste aantal rijen wordt weergegeven
      expect(dataRows.length).toBe(3); // Verwacht dat er 3 rijen zijn
  
      // Controleer de inhoud van de rijen
      expect(dataRows[0].findAll('td')[1].text()).toContain('John');  // Eerste rij, tweede cel
      expect(dataRows[1].findAll('td')[1].text()).toContain('Jane');  // Tweede rij, tweede cel
      expect(dataRows[2].findAll('td')[1].text()).toContain('Jim');    // Derde rij, tweede cel
    });





  });
  
