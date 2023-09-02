<template>
    <main>
        <button class="upload-button" @click="openFileExplorer">
            Choose File
        </button>
        <button class="process-button">Process</button>
        <input name="file" class="hide" type="file" ref="fileInput" />
    </main>
</template>

<script setup>
    import { ref } from 'vue';

    const fileInput = ref(null);

    const openFileExplorer = () => fileInput.value.click();

    const processCv = () =>
        google.script.run
            .withSuccessHandler(message => console.log(message))
            .withFailureHandler(err => console.log(err.message))
            .test();
</script>
