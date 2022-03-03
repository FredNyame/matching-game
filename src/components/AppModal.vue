<template>
    <div class="modal" v-if="show">
        <div class="modal__overlay visible">
            <div class="modal__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppModal',
    props: {
        show: {
            type: Boolean,
            require: true
        }
    },
    watch: {
        show: {
            immediate: true,
            handler(value) {
                if (value) {
                    if (this.preventBackgroundScroll) {
                        document.body.style.setProperty('overflow', 'hidden');
                    }
                } else {
                    document.body.style.removeProperty('overflow');
                }
            }
        }
    },
}
</script>

<style lang="scss">
    .modal {
        .modal__overlay {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #000;
            color: #fff;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            cursor: pointer;

            &.visible {
                display: flex;
                animation: overlay-grow 500ms forwards;
            }
        }
        .modal__content {
            display:  flex;
            flex-direction: column;
            justify-content: center;
            background: var(--platinum);
            padding: 4rem;
            border-radius: 5px;
            @media screen and (max-width: 768px) {
                padding: 3rem 2rem;
            }

            .modal__header {
                font-family: 'Press Start 2P', cursive;
                font-size: 5rem;
                text-align: center;
                color: var(--dark-gray);

                @media screen and (max-width: 768px) {
                    font-size: 3.5rem;
                }

                @media screen and (max-width: 500px) {
                    font-size: 2.5rem;
                }
            }

            .modal__button, .modal__button--small {
                background: transparent;
                border: 0px;
                color: #fff;
                cursor: pointer;
            }

            .modal__button {
                font-size: 6rem;
            }

            .modal__button--small {
                background: var(--blue-green-color-wheel);
                color: #fff;
                border-radius: 4px;
                margin: 1rem auto 0rem auto;
                width: auto;
                padding: 0.5rem 1.125rem;
                font-size: 1rem;
                font-weight: bold;
                letter-spacing: 1px;
            }
        }
    }
</style>