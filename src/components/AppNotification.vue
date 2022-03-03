<template>
    <div class="notification" v-if="message !== ''">
        <div class="notification__content">
            {{message}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Notification',
    props: {
        message: {
            type: String
        }
    }
}
</script>

<style lang="scss">
    .notification {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: var(--amaranth-red);
        color: var(--white);
    }
    .notification__content {
        font-size: 0.75rem;
        font-weight: bold;
    }
</style>