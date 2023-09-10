<template>
    <main>
        <OskonLogo />
        <FileDragArea
            :file="file"
            :insert-file="insertFile"
            :clear-file="clearFile"
        />
        <CustomButton
            :is-loading="isLoading"
            :on-click="process"
            text="Process"
            styles="process-button"
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
    import OskonLogo from '../../common/components/oskon-logo';
    import CustomButton from '../../common/components/custom-button';
    import FileDragArea from './file-drag-area';

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
</script>
