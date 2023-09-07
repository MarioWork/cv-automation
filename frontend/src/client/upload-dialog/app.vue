<template>
    <main>
        <OskonLogo />
        <div
            class="drag-area"
            @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave"
            @drop.prevent="onDrop"
        >
            <div v-if="isDragging" class="drop-content">Drop here.</div>

            <div v-else-if="!isDragging && file" class="selected-file">
                <span> {{ file.name }}</span>
                <button
                    @click.prevent="onRemoveFileClick"
                    :disabled="isLoading"
                    class="remove-file-button"
                >
                    <i class="fa fa-times"></i>
                </button>
            </div>

            <div v-else class="drag-area-content">
                <i class="fa fa-upload upload-icon"></i>
                <span>
                    <button
                        class="drag-area-action-text"
                        @click.prevent="onSelectFileClick"
                    >
                        Choose a file
                    </button>
                    <span> or drag it here. </span>
                </span>
            </div>
        </div>
        <button
            class="process-button"
            @click.prevent="onProcessButtonClick"
            :disabled="isLoading"
        >
            <div v-if="isLoading" class="loader"></div>
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
    import OskonLogo from '../common/components/oskon-logo';
    import { ref, watch } from 'vue';

    //TODO: Separate code into separate components
    //TODO: when processing disable remove file button
    const fileInput = ref(null);
    const file = ref(null);
    const base64File = ref(null);
    const isDragging = ref(false);
    const isLoading = ref(false);
    const error = ref(null);

    const onRemoveFileClick = e => (file.value = null);

    const onDragOver = e => {
        isDragging.value = true;
        e.dataTransfer.dropeffect = 'copy';
    };

    const onDragLeave = e => {
        isDragging.value = false;
    };

    const onDrop = e => {
        isDragging.value = false;
        file.value = e.dataTransfer.files[0];
    };

    const onSelectFileClick = () => fileInput.value.click();

    const onFileChanged = event => (file.value = event.target.files[0]);

    const onProcessButtonClick = () => {
        isLoading.value = true;
        createBase64File();
    };

    const processCv = async () => {
        if (!base64File.value) {
            error.value = new Error('No file selected');
            isLoading.value = false;
            return;
        }

        error.value = null;

        google.script.run
            .withSuccessHandler(() => {
                isLoading.value = false;
                error.value = null;
            })
            .withFailureHandler(err => {
                isLoading.value = false;
                error.value = err;
                console.log(err.message);
            })
            .processCv({ base64File: base64File.value });
    };

    const createBase64File = () => {
        if (!file.value) {
            error.value = new Error('No file selected');
            isLoading.value = false;
            return;
        }

        isLoading.value = true;

        const reader = new FileReader();
        reader.onload = () => (base64File.value = reader.result.split(',')[1]);
        reader.readAsDataURL(file.value);

        error.value = null;
    };

    watch(base64File, processCv);
</script>
