<template>
    <main>
        <OskonLogo />
        <FileDragArea
            :file="file"
            :insert-file="insertFile"
            :clear-file="clearFile"
            :disabled="isLoading"
        />
        <CustomButton
            :is-loading="isLoading"
            :on-click="process"
            text="Process"
            styles="process-button"
        />
        <ErrorMessage
            v-if="error"
            :message="error.message"
            :on-close-click="clearError"
        />
    </main>
</template>

<script setup>
    import OskonLogo from '../../common/components/oskon-logo';

    import CustomButton from '../../common/components/custom-button';
    import ErrorMessage from '../../common/components/error-message';

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
