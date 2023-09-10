<template>
    <section class="error-message">
        <i class="fa-solid fa-circle-info"></i>
        {{ message }}
        <CustomButton
            styles="error-message-button"
            :on-click="onCloseClick"
            icon-class="fa fa-times"
        />
    </section>
</template>

<script setup>
    import { defineProps, toRefs } from 'vue';
    import CustomButton from './custom-button.vue';

    const props = defineProps({
        message: { type: String, required: true },
        onCloseClick: { type: Function, default: () => {} }
    });

    const { message, onCloseClick } = toRefs(props);
</script>
