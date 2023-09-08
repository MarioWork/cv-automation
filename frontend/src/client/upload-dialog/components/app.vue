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
            @click.prevent="process"
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

        <div v-if="error" class="error-message">
            <i class="fa-solid fa-circle-info"></i>
            {{ error.message }}
            <button class="error-message-button" @click="clearError">
                <i class="fa fa-times"></i>
            </button>
        </div>
    </main>
</template>

<script setup>
    import { ref } from 'vue';

    import OskonLogo from '../../common/components/oskon-logo';

    import { useDocument } from '../composables/use-document';

    const {
        file,
        error,
        isLoading,
        insertFile,
        clearFile,
        clearError,
        process
    } = useDocument();

    const fileInput = ref(null);
    const isDragging = ref(false);

    const onRemoveFileClick = () => clearFile();

    const onDragOver = e => {
        isDragging.value = true;
        e.dataTransfer.dropeffect = 'copy';
    };

    const onDragLeave = () => (isDragging.value = false);

    const onDrop = e => {
        isDragging.value = false;
        insertFile(e.dataTransfer.files[0]);
    };

    const onSelectFileClick = () => fileInput.value.click();

    const onFileChanged = event => insertFile(event.target.files[0]);
</script>
