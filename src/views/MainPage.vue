<template>
  <v-card class="mx-auto" max-width="960px">
    <v-card-title>Vuetify Todo Example</v-card-title>
    <v-card-actions>
      <v-checkbox v-model="hideDone" label="Hide Done"></v-checkbox>
      <v-spacer></v-spacer>
      <new-item @save="addItem"></new-item>
    </v-card-actions>
    <v-card-text v-if="isEmpty">todo not found.</v-card-text>
    <v-list v-else>
      <todo-item
        v-for="item in visibleItems"
        :key="item.id"
        :id="item.id"
        :text="item.text"
        :done="item.done"
        @change-done="changeDone"
        @change-text="changeText"
        @delete-item="deleteItem"
      />
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/composition-api";

import NewItem from "../components/NewItem.vue";
import TodoItem from "../components/TodoItem.vue";

interface todo {
  id: number;
  text: string;
  done: boolean;
}

let lastId = 1;

export default defineComponent({
  components: {
    "new-item": NewItem,
    "todo-item": TodoItem,
  },
  setup() {
    const hideDone = ref(true);
    const items = ref([] as Array<todo>);

    const isEmpty = computed(() => {
      return items.value.length === 0;
    });

    const visibleItems = computed(() => {
      return hideDone.value
        ? items.value.filter((item) => !item.done)
        : items.value;
    });

    const addItem = (text: string) => {
      items.value.push({
        id: lastId++,
        text: text,
        done: false,
      });
    };

    const findItem = (id: number, cb: (idx: number) => void) => {
      const idx = items.value.findIndex((v) => {
        return v.id === id;
      });

      if (idx === -1) {
        console.error(`${id} is not found`);
        return;
      }

      cb(idx);
    };

    const changeDone = (id: number, done: boolean) => {
      findItem(id, (idx) => {
        items.value[idx].done = done;
      });
    };

    const changeText = (id: number, text: string) => {
      findItem(id, (idx) => {
        items.value[idx].text = text;
      });
    };

    const deleteItem = (id: number) => {
      findItem(id, (idx) => {
        items.value.splice(idx, 1);
      });
    };

    return {
      hideDone,
      isEmpty,
      visibleItems,
      addItem,
      changeDone,
      changeText,
      deleteItem,
    };
  },
});
</script>
