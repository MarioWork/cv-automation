<template>
    <div
        class="drag-area"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
    >
        <div v-if="isDragging" class="drop-content">Drop here.</div>

        <div v-else-if="!isDragging && file" class="selected-file">
            <span> {{ file.name }}</span>
            <CustomButton
                :on-click="clearFile"
                :disabled="disabled"
                styles="remove-file-button"
                icon-class="fa fa-times"
            />
        </div>

        <div v-else class="drag-area-content">
            <i class="fa fa-upload upload-icon"></i>
            <span>
                <CustomButton
                    :on-click="onSelectFileClick"
                    text="Choose a file"
                    styles="drag-area-action-text"
                />
                <span> or drag it here. </span>
            </span>
        </div>
        <input
            name="file"
            class="hide"
            type="file"
            accept="application/pdf"
            ref="fileInput"
            @change="onFileChanged"
        />
    </div>
</template>

<script setup>
    import { ref, toRefs } from 'vue';

    import CustomButton from '../../common/components/custom-button.vue';

    const fileInput = ref(null);
    const isDragging = ref(false);

    const props = defineProps({
        file: { type: File, required: true },
        disabled: { type: Boolean, default: false },
        insertFile: {
            type: Function,
            args: [{ type: File }],
            required: true
        },
        clearFile: {
            type: Function,
            required: true
        }
    });
    //TODO: Fix bug when file name to long
    const { file, insertFile, clearFile, disabled } = toRefs(props);

    const onDragOver = e => {
        if (disabled.value) return;
        isDragging.value = true;
        e.dataTransfer.dropeffect = 'copy';
    };

    const onDragLeave = () => (isDragging.value = false);

    const onDrop = e => {
        if (disabled.value) return;
        isDragging.value = false;
        insertFile.value(e.dataTransfer.files[0]);
    };

    const onSelectFileClick = () => fileInput.value.click();

    const onFileChanged = event => {
        insertFile.value(event.target.files[0]);
        event.target.value = null;
    };
</script>
