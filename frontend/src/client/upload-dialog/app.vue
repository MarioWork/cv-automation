<template>
    <div>Hello {{ name }}!</div>
</template>

<script setup>
    google.script.run
        .withSuccessHandler(message => console.log(message))
        .withFailureHandler(err => console.log(err.message))
        .test();

    const name = 'mario vieira';
</script>
