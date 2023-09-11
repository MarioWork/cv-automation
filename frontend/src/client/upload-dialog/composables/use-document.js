import { ref } from 'vue';

import { createBase64File } from '../../common/utils/create-base-64-file';
import { runServerFunction } from '../../common/utils/run-server-function';

const errorType = {
    NO_FILE: new Error('No such file selected'),
    UNKNOWN: new Error('Oops! Something went wrong')
};

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

        state.error.value = null;
        state.isLoading.value = true;

        try {
            const base64File = await createBase64File(state.file.value);
            await runServerFunction({
                functionName: 'processCv',
                data: { base64File }
            });
        } catch (error) {
            console.log(error);
            state.error.value = error.message;
            /*             state.error.value = errorType.UNKNOWN; */
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
