<template>
<div class="modal-backdrop">
    <div class="modal">
        <header class="modal-header" id="modalTitle">
            <slot name="header">
                <!--slot: allow for custom code so we can reuse modal-->
                Are you sure?
                <v-icon @click="close()">close</v-icon>
            </slot>
        </header>

        <section class="modal-body">
            <slot name="body">
                This action cannot be undone.
            </slot>
        </section>

        <footer class="modal-footer">
            <slot name="footer">
                <v-btn @click="deleteEvent()">Delete</v-btn>
                <!--TODO: Use slots to generalize-->
            </slot>
        </footer>
    </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'Popup',
    methods: {
        close() {
            console.log("closing");
            let that = this;
            that.$emit('close');
        }
	},
	props: ['deleteEvent']		// will it accept if not registered in index.js?
}
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    border-bottom: 1px solid #eeeeee;
    color: darkcyan;
    justify-content: space-between;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
}

#modalTitle {
	font-weight: bold;
}
</style>