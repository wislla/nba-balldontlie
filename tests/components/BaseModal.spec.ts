import { mount } from '@vue/test-utils'
import BaseModal from '@/components/BaseModal.vue'

describe('BaseModal', () => {
  it('exibe conteúdo quando aberto', () => {
    const wrapper = mount(BaseModal, {
      props: { isOpen: true },
      slots: {
        header: '<div>Header</div>',
        body: '<div>Body</div>',
        footer: '<div>Footer</div>',
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    expect(wrapper.text()).toContain('Header')
    expect(wrapper.text()).toContain('Body')
    expect(wrapper.text()).toContain('Footer')
  })

  it('não renderiza quando fechado', () => {
    const wrapper = mount(BaseModal, {
      props: { isOpen: false },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    expect(wrapper.find('[data-testid="modal-content"]').exists()).toBe(false)
  })
})
