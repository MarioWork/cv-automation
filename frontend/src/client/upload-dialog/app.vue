<template>
    <button @click="openFileExplorer">Choose File</button>
    <input name="file" type="file" style="display: none" ref="fileInput" />
</template>

<script setup>
    /*  google.script.run
        .withSuccessHandler(message => console.log(message))
        .withFailureHandler(err => console.log(err.message))
        .test(); */
    import { ref } from 'vue';

    const fileInput = ref(null);

    const openFileExplorer = () => fileInput.value.click();
</script>
