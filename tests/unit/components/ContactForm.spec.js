import Vue from 'vue';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import ContactForm from '@/components/ContactForm.vue';

let wrapper, vuetify, button, nameField, emailField, subjectField, messageField;
const localVue = createLocalVue();
beforeEach(() => {
  vuetify = new Vuetify();
  wrapper = mount(ContactForm, {
    localVue,
    vuetify,
  });
  button = wrapper.find('.v-card__actions > button');
  nameField = wrapper.find("#nameField .v-messages__wrapper");
  emailField = wrapper.find("#emailField .v-messages__wrapper");
  subjectField = wrapper.find("#subjectField .v-messages__wrapper");
  messageField = wrapper.find("#messageField .v-messages__wrapper");
});

afterEach(() => {
  wrapper.destroy();
});

describe("ActuatorController.vue", () => {
  // when form is empty and submit button is clicked
  it ('should validate contact form', async () => {
    button.trigger('click');
    await Vue.nextTick();
    expect(nameField.text()).toBe("This field is required");
    expect(emailField.text()).toBe("This field is required");
    expect(subjectField.text()).toBe("");
    expect(messageField.text()).toBe("This field is required");
  });

  // name field validations
  test("when invalid characters entered in name field", async () => {
    await wrapper.setData({ contactForm: {
      name: 'qd-qd*)*)&)',
      email: '',
      subject: '',
      message: '',
    }});
    button.trigger('click');
    await Vue.nextTick();
    expect(nameField.text()).toBe("Allowed characters 0-9 a-z A-Z - _");
  });

  test("when invalid length entered in name field", async () => {
    await wrapper.setData({ contactForm: {
      name: 'qdhodoqhdoqhdowqudhowqudwqoudhwqouduowqdwqodugwqguduwqgdouqwgdogquodgwqo',
      email: '',
      subject: '',
      message: '',
    }});
    button.trigger('click');
    await Vue.nextTick();
    expect(nameField.text()).toBe("Invalid character length, required 5 - 50");
  });

  test("when valid input is entered in name field", async () => {
    await wrapper.setData({ contactForm: {
      name: 'fake name',
      email: '',
      subject: '',
      message: '',
    }});
    button.trigger('click');
    await Vue.nextTick();
    expect(nameField.text()).toBe("");
  });

  // email field validations
  test("when invalid mail id is entered in email field", async () => {
    const invalidEmails = ["fwfewfew", "eewfe@", "dwqr@wd."];
    invalidEmails.forEach( async (emailId) => {
      await wrapper.setData({ contactForm: {
        name: '',
        email: emailId,
        subject: '',
        message: '',
      }});
      button.trigger('click');
      await Vue.nextTick();
      expect(emailField.text()).toBe("Please enter a valid email");
    });
  });

  test("when valid mail id is entered in email field", async () => {
    await wrapper.setData({ contactForm: {
      name: '',
      email: 'eeww@wed.movie',
      subject: '',
      message: '',
    }});
    button.trigger('click');
    await Vue.nextTick();
    expect(emailField.text()).toBe("");
  });

  // subject field validations
  test("when invalid characters length entered in subject field", async () => {
    await wrapper.setData({ contactForm: {
      name: '',
      email: '',
      subject: `dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew`,
      message: '',
    }});
    button.trigger('click');
    await Vue.nextTick();
    expect(subjectField.text()).toBe("Invalid character length, required 0 - 100");
  });

  // message field validations
  test("when invalid characters length entered in subject field", async () => {
    await wrapper.setData({ contactForm: {
      name: '',
      email: '',
      subject: '',
      message: `dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew
      dwdwddddddddddddddddddddddqwdqwdwqdwqdqwdwqdwqdwqdwqdwqdwdew`,
    }});
    button.trigger('click');
    await Vue.nextTick();
    expect(messageField.text()).toBe("Invalid character length, required 0 - 500");
  });
});