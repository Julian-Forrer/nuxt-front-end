// tests/pages/index.spec.js
import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'; // Importing vitest

import Index from '/pages/index.vue'



//below here is my first test, i test if i can find a sentence in my index page
describe('Index Page', () => {
  it('renders the expected message', () => {
    const wrapper = mount(Index) // mounting the index page
    expect(wrapper.text()).toContain('this is my front end for the csv application') // expecting the senctence to be in the index.vue file
  })
})


describe('Index Page API call', () => {
  it('calls the API with the correct URL', async () => {
    // Mocking the fetch function for a api call
    global.$fetch = vi.fn(() => Promise.resolve('Mocked response'))

    // Mounting the index component
    const wrapper = mount(Index)

    
    wrapper.vm.fileInput = { files: [new File(['dummy content'], 'example.csv')] } // Simulating a file called example.csv

    // calling on the uploadCsv function
    await wrapper.vm.uploadCsv()

    // expect the fetch to call with the api url
    expect(global.$fetch).toHaveBeenCalledWith('http://localhost:8080/api/import-csv', expect.any(Object))
  })
})


// below here i use a stub, stubs are used to replace components that you dont want to render in your tests, i ran into some issuess calling the Nuxtlink on its 
// own so i made a stub out of it
describe('Index Page', () => {
  it('should find the NuxtLink to the data route and check its attributes', () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>', 
            props: ['to'] 
          }
        }
      }
    })

    const dataLinkItem = wrapper.find('li.li:nth-child(2)') // here i will find the second list item because that is the route to the data page
    expect(dataLinkItem.exists()).toBe(true)

  
    const link = dataLinkItem.find('a') // finding the a tag
    expect(link.exists()).toBe(true)

    // Controlling if the text is data
    expect(link.text()).toBe('data')

    // controling the link to the data page
    expect(link.attributes('href')).toBe('/data')
  })
})

















