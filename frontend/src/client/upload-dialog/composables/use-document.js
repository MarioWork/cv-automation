import { ref } from 'vue';

import { createBase64File } from '../../common/utils/create-base-64-file';
import { runServerFunction } from '../../common/utils/run-server-function';

const errorType = {
    NO_FILE: new Error('No such file selected'),
    UNKNOWN: new Error('Oops! Something went wrong')
};

const processType = {
    CLEAN_UP: 'Cleaning up',
    EXTRACTING: 'Extracting data',
    WRITING: 'Writing data',
    EMPTY: ''
};

//TODO: add a label to button saying extracting and writting
exports.useDocument = () => {
    const state = {
        file: ref(null),
        error: ref(null),
        isLoading: ref(false),
        currentProcess: ref(processType.EMPTY)
    };

    const process = async () => {
        if (!state.file.value) {
            state.error.value = errorType.NO_FILE;
            state.isLoading.value = false;
            return;
        }

        state.error.value = null;
        state.isLoading.value = true;
        //TODO: server functions names be a enum
        try {
            state.currentProcess.value = processType.CLEAN_UP;
            await runServerFunction({ functionName: 'clearDocument' });

            state.currentProcess.value = processType.EXTRACTING;
            const base64File = await createBase64File(state.file.value);
            const data = await runServerFunction({
                functionName: 'processDocument',
                data: { base64File }
            });

            if (!data) throw Error();

            state.currentProcess.value = processType.WRITING;
            await runServerFunction({
                functionName: 'writeDataToDocument',
                data: data
            });
        } catch (error) {
            state.currentProcess.value = processType.EMPTY;
            state.error.value = errorType.UNKNOWN;
        }

        google.script.host.close();
        state.currentProcess.value = processType.EMPTY;
        state.isLoading.value = false;
    };

    return {
        file: state.file,
        error: state.error,
        isLoading: state.isLoading,
        currentProcess: state.currentProcess,
        insertFile: file => (state.file.value = file),
        clearFile: () => (state.file.value = null),
        clearError: () => (state.error.value = null),
        process
    };
};
