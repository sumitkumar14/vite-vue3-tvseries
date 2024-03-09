import { shallowMount } from '@vue/test-utils'
import ShowCard from '@/components/ShowCard.vue'
import { expect } from 'vitest'

describe('ShowCard.vue', () => {
  let wrapper;
  beforeEach(()=>{
    wrapper = shallowMount(ShowCard);
  })
  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
  it('renders props.movieDetails when passed', () => {
    const showInfo = {'name':"xyz", 'genres':['drama'], 'id':'758g877', 'rating':"{'average':'8'}", 'image':{'medium':'http//xyuz.png'}}
    const wrapper = shallowMount(ShowCard, {
      propsData: { showInfo }
    })
    expect(wrapper.props().showInfo).toBe(showInfo)
  })
})
