<template>
    <main>
        <OskonLogo />
        <FileDragArea
            :file="file"
            :insertFile="insertFile"
            :clearFile="clearFile"
        />
        <button
            class="process-button"
            @click.prevent="process"
            :disabled="isLoading"
        >
            <div v-if="isLoading" class="loader"></div>

            <span v-else>Process</span>
        </button>

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
