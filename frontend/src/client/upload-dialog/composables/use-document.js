import { ref } from 'vue';

const errorType = {
    NO_FILE: new Error('No such file selected'),
    UNKNOWN: new Error('Oops! Something went wrong')
};

const createBase64File = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject(reader.error);
        reader.readAsDataURL(file.value);
    });

exports.useDocument = () => {
    const state = {
        file: ref(null),
        error: ref(null),
        isLoading: ref(false)
    };

    const process = async () => {
        if (!state.file.value) {
            state.error.value = errorType.NO_FILE;
            state.isLoading.value = false;
            return;
        }

        state.isLoading.value = true;

        try {
            const base64File = await createBase64File(state.file.value);
            google.script.run.processCv({ base64File });
        } catch (error) {
            state.error.value = errorType.UNKNOWN;
        }

        state.isLoading.value = false;
    };

    return {
        file: state.file,
        error: state.error,
        isLoading: state.isLoading,
        insertFile: file => (state.file.value = file),
        clearFile: () => (state.file.value = null),
        clearError: () => (state.error.value = null),
        process
    };
};
