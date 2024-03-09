import { shallowMount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import SeriesList from '@/views/SeriesList.vue'

describe('Seriesist.vue', () => {
  let wrapper;
  beforeEach(()=>{
    wrapper = shallowMount(SeriesList);
  })
  it('renders a vue instance of series list view', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
})