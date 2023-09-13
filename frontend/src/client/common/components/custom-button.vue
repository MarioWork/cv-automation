<template>
    <button :class="styles" @click.prevent="onClick" :disabled="isLoading">
        <div v-if="isLoading" class="custom-button-loading-content">
            <span>{{ loadingMessage }}</span>
            <div class="loader"></div>
        </div>
        <span v-else-if="text && !iconClass">{{ text }}</span>
        <i v-else-if="iconClass && !text" :class="iconClass"></i>
    </button>
</template>

<script setup>
    import { defineProps, toRefs } from 'vue';

    const props = defineProps({
        isLoading: { type: Boolean, default: false },
        loadingMessage: { type: String, default: null },
        text: { type: String, default: null },
        styles: { type: String, required: true },
        iconClass: { type: String },
        onClick: { type: Function, default: () => {} }
    });

    const { isLoading, loadingMessage, text, styles, onClick } = toRefs(props);
</script>
