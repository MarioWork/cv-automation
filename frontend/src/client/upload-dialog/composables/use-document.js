import { ref } from 'vue';

exports.useDocument = () => {
    const state = {
        file: ref(null),
        error: ref(null)
    };

    return {
        file: state.file,
        error: state.error,
        setError: error => (state.error.value = error),
        insertFile: file => (state.file.value = file),
        clearFile: () => (state.file.value = null),
        clearError: () => (state.error.value = null)
    };
};
