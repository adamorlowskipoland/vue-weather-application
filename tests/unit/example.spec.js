import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

describe.skip('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe('BaseButton.vue', () => {
  it('renders props.type when passed', () => {
    const type = 'danger';
    const wrapper = shallowMount(BaseButton, {
      propsData: { type },
    });
    expect(wrapper.classes()).toContain('bg-red');
  });
});
