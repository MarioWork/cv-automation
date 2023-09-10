<template>
    <button :class="styles" @click.prevent="onClick" :disabled="isLoading">
        <div v-if="isLoading" class="loader"></div>
        <span v-else-if="text && !iconClass">{{ text }}</span>
        <i v-else-if="iconClass && !text" :class="iconClass"></i>
    </button>
</template>

<script setup>
    import { defineProps, toRefs } from 'vue';

    const props = defineProps({
        isLoading: { type: Boolean, default: false },
        text: { type: String, default: null },
        styles: { type: String, required: true },
        iconClass: { type: String },
        onClick: { type: Function, default: () => {} }
    });

    const { isLoading, text, styles, onClick } = toRefs(props);
</script>
