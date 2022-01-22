import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";
import NewItem from "@/components/NewItem.vue";

describe("NewItem.vue", () => {
  const localVue = createLocalVue();
  let vuetify: Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("render button", async () => {
    const wrapper = mount(NewItem, {
      localVue,
      vuetify,
    });

    const btn = wrapper.findComponent({ name: "VBtn" });
    expect(btn.text()).toBe("Add New Item");
  });

  it("render dialog", async () => {
    const wrapper = mount(NewItem, {
      localVue,
      vuetify,
    });

    expect(wrapper.findComponent({ name: "VCard" }).exists()).toBeFalsy();

    wrapper.findComponent({ name: "VBtn" }).trigger("click");
    await wrapper.vm.$nextTick();

    const card = wrapper.findComponent({ name: "VCard" });

    const title = card.findComponent({ name: "VCardTitle" });
    expect(title.text()).toBe("New Todo Item");

    const input = card.findComponent({ name: "VTextField" });
    expect(input.find('input[type="text"]').text()).toBe("");

    const actions = card.findAllComponents({ name: "VBtn" });
    expect(actions.length).toBe(2);
    expect(actions.at(0).text()).toBe("Cancel");
    expect(actions.at(1).text()).toBe("Save");
  });

  it("click cancel", async () => {
    const wrapper = mount(NewItem, {
      localVue,
      vuetify,
    });

    wrapper.findComponent({ name: "VBtn" }).trigger("click");
    await wrapper.vm.$nextTick();

    const card = wrapper.findComponent({ name: "VCard" });
    const actions = card.findAllComponents({ name: "VBtn" });
    expect(actions.length).toBe(2);

    const input = card.findComponent({ name: "VTextField" });
    await input.find('input[type="text"]').setValue("This is a test text.");

    actions.at(0).trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("save")).toBeFalsy();
    expect(wrapper.findComponent({ name: "VCard" }).isVisible()).toBeFalsy();
  });

  it("click save", async () => {
    const wrapper = mount(NewItem, {
      localVue,
      vuetify,
    });

    wrapper.findComponent({ name: "VBtn" }).trigger("click");
    await wrapper.vm.$nextTick();

    const card = wrapper.findComponent({ name: "VCard" });
    const actions = card.findAllComponents({ name: "VBtn" });
    expect(actions.length).toBe(2);

    const input = card.findComponent({ name: "VTextField" });
    input.find('input[type="text"]').setValue("This is a test text.");
    actions.at(1).trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("save")).toBeTruthy();
    expect(wrapper.emitted("save")).toEqual([["This is a test text."]]);

    expect(wrapper.findComponent({ name: "VCard" }).isVisible()).toBeFalsy();
  });
});
