<template>
    <div class="v-field"
         :class="[!focus || 'v-field--focused']">
        <div class="v-field_slot-input">
            <label class="v-field--label"
                for="city"
                :class="focus || value.length ? 'v-field--label-active' : ''">
                {{ label }}</label>
            <input class="v-field--input"
                type="text"
                id="city"
                v-model="value"
                @keyup.enter="$emit('enter')"
                @focus="focus = true"
                @blur="focus = false"
                @input="$emit('input', $event.target.value)"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VInput",
        data() {
            return {
                focus: false,
                value: '',
            }
        },
        model: {
            prop: 'setValue',
            event: 'input'
        },
        props: {
            label:{
                type: String,
                default: '',
            },
            setValue: {
                type: String,
                default: '',
            }
        },
        watch: {
            setValue(val) {
                this.value = val;
            }
        }
    }
</script>

<style scoped>

</style>
