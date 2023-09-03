<template>
    <main>
        <button class="upload-button" @click="openFileExplorer">
            <span class="upload-button-action-text">Choose a file</span> or drag
            it here.
        </button>
        <button class="process-button" @click="processCv">Process</button>
        <input
            name="file"
            class="hide"
            type="file"
            accept="application/pdf"
            ref="fileInput"
        />
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
