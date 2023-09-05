<template>
    <main>
        <button class="upload-button" @click="onSelectFileClick">
            <span class="upload-button-action-text">Choose a file</span> or drag
            it here.
        </button>
        <button
            class="process-button"
            @click="onProcessButtonClick"
            :disabled="loading"
        >
            {{ loading ? 'Processing...' : 'Process' }}
        </button>
        <input
            name="file"
            class="hide"
            type="file"
            accept="application/pdf"
            ref="fileInput"
            @change="onFileChanged"
        />
        <div v-if="error">{{ error.message }}</div>
    </main>
</template>

<script setup>
    import { ref, watch } from 'vue';

    const fileInput = ref(null);
    const fileObj = ref(null);
    const base64File = ref(null);
    const loading = ref(false);
    const error = ref(null);

    //TODO: handle onDrag

    const onSelectFileClick = () => fileInput.value.click();

    const onFileChanged = event => (fileObj.value = event.target.files[0]);

    const onProcessButtonClick = () => {
        loading.value = true;
        createBase64File();
    };

    const processCv = async () => {
        if (!base64File.value) {
            error.value = new Error('No file selected');
            loading.value = false;
            return;
        }

        console.log(base64File.value);

        google.script.run
            .withSuccessHandler(message => console.log(message))
            .withFailureHandler(err => console.log(err.message))
            .processCv({ base64File: base64File.value });

        loading.value = false;
    };

    const createBase64File = () => {
        if (!fileObj.value) {
            error.value = new Error('No file selected');
            loading.value = false;
            return;
        }

        loading.value = true;

        const reader = new FileReader();
        reader.onload = () => (base64File.value = reader.result);
        reader.readAsDataURL(fileObj.value);
    };

    watch(base64File, processCv);
</script>
