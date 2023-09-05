<template>
    <main>
        <OskonLogo />
        <div class="upload-button">
            <i class="fa fa-upload upload-icon"></i>
            <div>
                <button
                    class="upload-button-action-text"
                    @click="onSelectFileClick"
                >
                    Choose a file
                </button>
                <span> or drag it here. </span>
            </div>
        </div>
        <button
            class="process-button"
            @click="onProcessButtonClick"
            :disabled="loading"
        >
            <div v-if="loading" class="loader"></div>
            <span v-else>Process</span>
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
    import OskonLogo from '../common/components/oskon-logo.vue';
    import { ref, watch } from 'vue';
    //TODO: Separate into separate components
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

        error.value = null;

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

        error.value = null;
    };

    watch(base64File, processCv);
</script>
