import { shallowMount } from '@vue/test-utils'
import { expect } from 'vitest'
import SeriesDetails from '@/views/SeriesDetails.vue'
// import VueRouter from 'vue-router'q

describe('SeriesDetails.vue', () => {
  let wrapper;
  beforeEach(()=>{
    wrapper = shallowMount(SeriesDetails);
  })
  it('renders a vue instance of series Details view', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
})