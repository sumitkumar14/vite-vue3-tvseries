import { shallowMount } from '@vue/test-utils'
import SeriesList from '@/views/SeriesList.vue'
import vuetify from "vuetify"
import Vue from 'vue';

describe('Seriesist.vue', () => {
  let wrapper;
  beforeEach(()=>{
    Vue.use(vuetify);
    wrapper = shallowMount(SeriesList);
  })
  it('renders a vue instance of series list view', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
})