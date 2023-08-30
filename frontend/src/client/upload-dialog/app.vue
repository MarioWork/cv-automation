<template>
    <main
        style="
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        "
    >
        <button
            style="
                width: 200px;
                height: 200px;
                background-color: transparent;
                border-radius: 20px;
                border-style: dashed;
                border-color: red;
                cursor: pointer;
            "
            @click="openFileExplorer"
        >
            Choose File
        </button>

        <button
            style="
                width: 200px;
                background-color: red;
                color: white;
                padding: 15px;
                border: none;
                border-radius: 20px;
                cursor: pointer;
            "
        >
            Process
        </button>

        <input name="file" style="display: none" type="file" ref="fileInput" />
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
