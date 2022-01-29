import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";
import MainPage from "@/views/MainPage.vue";
import NewItem from "@/components/NewItem.vue";
import TodoItem from "@/components/TodoItem.vue";

describe("MainPage.vue", () => {
  const localVue = createLocalVue();
  let vuetify: Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("render initial view", async () => {
    const wrapper = mount(MainPage, {
      localVue,
      vuetify,
    });

    expect(wrapper.findComponent(NewItem).exists()).toBe(true);
    expect(wrapper.findAllComponents(TodoItem)).toHaveLength(0);
    expect(wrapper.findComponent({ name: "VCardText" }).text()).toBe(
      "todo not found."
    );
  });

  it("handle list events", async () => {
    const wrapper = mount(MainPage, {
      localVue,
      vuetify,
    });

    const newItem = wrapper.findComponent(NewItem);
    newItem.vm.$emit("save", "one");
    newItem.vm.$emit("save", "two");
    newItem.vm.$emit("save", "three");
    await wrapper.vm.$nextTick();

    const items1 = wrapper.findAllComponents(TodoItem);
    expect(items1).toHaveLength(3);
    expect(items1.at(0).props()).toEqual({ id: 1, text: "one", done: false });
    expect(items1.at(1).props()).toEqual({ id: 2, text: "two", done: false });
    expect(items1.at(2).props()).toEqual({ id: 3, text: "three", done: false });

    items1.at(0).vm.$emit("change-done", 1, true);
    await wrapper.vm.$nextTick();

    const items2 = wrapper.findAllComponents(TodoItem);
    expect(items2).toHaveLength(2);
    expect(items2.at(0).props()).toEqual({ id: 2, text: "two", done: false });
    expect(items2.at(1).props()).toEqual({ id: 3, text: "three", done: false });

    items2.at(1).vm.$emit("change-text", 3, "333");
    await wrapper.vm.$nextTick();

    const items3 = wrapper.findAllComponents(TodoItem);
    expect(items3).toHaveLength(2);
    expect(items3.at(0).props()).toEqual({ id: 2, text: "two", done: false });
    expect(items3.at(1).props()).toEqual({ id: 3, text: "333", done: false });

    items3.at(0).vm.$emit("delete-item", 2);
    await wrapper.vm.$nextTick();

    await wrapper.find('input[type="checkbox"]').setChecked(false);

    const items4 = wrapper.findAllComponents(TodoItem);
    expect(items4).toHaveLength(2);
    expect(items4.at(0).props()).toEqual({ id: 1, text: "one", done: true });
    expect(items4.at(1).props()).toEqual({ id: 3, text: "333", done: false });
  });
});
