<template>
  <v-list-item>
    <v-list-item-action>
      <v-checkbox :input-value="done" @change="changeDone"></v-checkbox>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>
        <v-text-field v-model="value"></v-text-field>
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon color="red" @click="deleteItem">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/composition-api";

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    "change-done": (id: number, done: boolean) =>
      id > 0 && typeof done === "boolean",
    "change-text": (id: number, text: string) =>
      id > 0 && typeof text === "string",
    "delete-item": (id: number) => id > 0,
  },
  setup(props, { emit }) {
    const value = ref(props.text);

    watch(value, () => {
      emit("change-text", props.id, value.value);
    });

    const changeDone = () => {
      emit("change-done", props.id, !props.done);
    };

    const deleteItem = () => {
      emit("delete-item", props.id);
    };

    return {
      value,
      changeDone,
      deleteItem,
    };
  },
});
</script>
