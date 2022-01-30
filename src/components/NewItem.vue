<template>
  <v-dialog v-model="dialog" max-width="500">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">Add New Item</v-btn>
    </template>

    <v-card>
      <v-card-title>New Todo Item</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field v-model="text" label="todo text"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="close()">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="save()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  emits: {
    save: (text: string) => text.length > 1,
  },
  setup(_props, { emit }) {
    const dialog = ref(false);
    const text = ref("");

    const close = () => {
      dialog.value = false;
      text.value = "";
    };

    const save = () => {
      emit("save", text.value);
      close();
    };

    return {
      dialog,
      text,
      close,
      save,
    };
  },
});
</script>
