// tests/pages/index.spec.js
import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'; // Importeren van Vitest

import Index from '/pages/index.vue' // Pas het pad aan op basis van de structuur van je project

//below here is my first test, i test if i can find a sentence in my index page
describe('Index Page', () => {
  it('renders the expected message', () => {
    const wrapper = mount(Index) // De Index component wordt gemount
    expect(wrapper.text()).toContain('this is my front end for the csv application') // Controleer of de verwachte zin aanwezig is
  })
})


describe('Index Page API call', () => {
  it('calls the API with the correct URL', async () => {
    // Mock de $fetch functie
    global.$fetch = vi.fn(() => Promise.resolve('Mocked response'))

    // Mount de component
    const wrapper = mount(Index)

    // Stel de waarde van fileInput in
    wrapper.vm.fileInput = { files: [new File(['dummy content'], 'example.csv')] } // Simuleer een bestand

    // Roep de uploadCsv functie aan
    await wrapper.vm.uploadCsv()

    // Controleer of $fetch met de juiste URL is aangeroepen
    expect(global.$fetch).toHaveBeenCalledWith('http://localhost:8080/api/import-csv', expect.any(Object))
  })
})



describe('Index Page', () => {
  it('should find the NuxtLink to the data route and check its attributes', () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>', // Mock NuxtLink met een :href attributen
            props: ['to'] // Voeg props toe aan de mock
          }
        }
      }
    })

    // Zoek naar het list item met de NuxtLink naar /data
    const dataLinkItem = wrapper.find('li.li:nth-child(2)') // Dit pakt de tweede <li>, die naar /data verwijst
    expect(dataLinkItem.exists()).toBe(true)

    // Zoek de gemockte NuxtLink binnen het list item
    const link = dataLinkItem.find('a') // Zoek naar de gemockte <a> tag
    expect(link.exists()).toBe(true)

    // Controleer of de tekst van de link correct is
    expect(link.text()).toBe('data')

    // Controleer of de link naar de juiste pagina verwijst door het href attribuut te controleren
    expect(link.attributes('href')).toBe('/data') // Hier controleren we het href attribuut
  })
})

















// describe('Index Page API Call', () => {
//   it('calls the API with the correct URL', async () => {
//     // Mock de $fetch functie
//     global.$fetch = vi.fn(() => Promise.resolve('File uploaded successfully'));

//     // Mock de alert functie
//     global.alert = vi.fn();

//     // Mount de Index component
//     const wrapper = mount(Index);

//     // Roep de uploadCsv functie aan zonder een bestand te simuleren
//     await wrapper.vm.uploadCsv();

//     // Controleer of de $fetch functie is aangeroepen met de juiste URL en configuratie
//     expect($fetch).toHaveBeenCalledTimes(1); // Controleer of $fetch één keer is aangeroepen
//     expect($fetch).toHaveBeenCalledWith('http://localhost:8080/api/import-csv', {
//       method: 'POST',
//       body: expect.any(FormData), // Controleer dat er een FormData object is verzonden
//     });
//   });
// });
