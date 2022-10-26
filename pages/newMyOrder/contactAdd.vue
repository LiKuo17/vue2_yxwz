<template>
    <div class="addressBox">
        <van-contact-edit
            is-edit
            show-set-default
            :contact-info="editingContact"
            set-default-label="设为默认联系人"
            @save="onSave"
            @delete="onDelete"
            />
    </div>
</template>
<script>
export default {
    components: {},
    data(){
        return {
            editingContact: {},
            
        }
    },
    methods: {
        onAdd(){
            this.$router.push('/addressAddNew')
        },
        onEdit(){},
        onSave(){},
        onDelete(){},
    }
}
</script>
<style lang="scss" scoped>
.addressBox {
    height: 100vh;
}
.buttonBox {
    position: fixed;
    bottom: 1%;
    width: 90%;
    left: 5%;
}
.van-button--primary {
    background-color: #c3a769 !important;
    border: #c3a769 !important;
}
/deep/ .van-address-item .van-radio__icon--checked .van-icon {
    background-color: #c3a769 !important;
    border: #c3a769;
}
/deep/ .van-button--danger {
    background-color: #c3a769 !important;
    border: #c3a769;
}
.address_content {
    background: #f6f6f6;
    /* height: 100%; */
}
</style>
