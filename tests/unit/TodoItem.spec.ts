import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";
import TodoItem from "@/components/TodoItem.vue";

describe("TodoItem.vue", () => {
  const localVue = createLocalVue();
  let vuetify: Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("render item", async () => {
    const wrapper = mount(TodoItem, {
      localVue,
      vuetify,
      propsData: {
        id: 123,
        text: "This is a test text.",
        done: true,
      },
    });

    const checkbox = wrapper.findComponent({ name: "VCheckbox" });
    expect(checkbox.props()["inputValue"]).toBeTruthy;

    const text = wrapper.findComponent({ name: "VTextField" });
    expect(text.props()["value"]).toBe("This is a test text.");

    const btn = wrapper.findComponent({ name: "VBtn" });
    expect(btn.exists()).toBeTruthy();
  });

  it("change done (initial true)", async () => {
    const wrapper = mount(TodoItem, {
      localVue,
      vuetify,
      propsData: {
        id: 123,
        text: "This is a test text.",
        done: true,
      },
    });

    const checkbox = wrapper.findComponent({ name: "VCheckbox" });
    checkbox.find('input[type="checkbox"]').trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("change-done")).toBeTruthy();
    expect(wrapper.emitted("change-done")).toEqual([[123, false]]);
  });

  it("change done (initial false)", async () => {
    const wrapper = mount(TodoItem, {
      localVue,
      vuetify,
      propsData: {
        id: 123,
        text: "This is a test text.",
        done: false,
      },
    });

    const checkbox = wrapper.findComponent({ name: "VCheckbox" });
    checkbox.find('input[type="checkbox"]').trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("change-done")).toBeTruthy();
    expect(wrapper.emitted("change-done")).toEqual([[123, true]]);
  });

  it("change text", async () => {
    const wrapper = mount(TodoItem, {
      localVue,
      vuetify,
      propsData: {
        id: 123,
        text: "This is a test text.",
        done: false,
      },
    });

    const input = wrapper.findComponent({ name: "VTextField" });
    input.find('input[type="text"]').setValue("Updated text.");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("change-text")).toBeTruthy();
    expect(wrapper.emitted("change-text")).toEqual([[123, "Updated text."]]);
  });

  it("delte item", async () => {
    const wrapper = mount(TodoItem, {
      localVue,
      vuetify,
      propsData: {
        id: 123,
        text: "This is a test text.",
        done: false,
      },
    });

    const btn = wrapper.findComponent({ name: "VBtn" });
    btn.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("delete-item")).toBeTruthy();
    expect(wrapper.emitted("delete-item")).toEqual([[123]]);
  });
});
