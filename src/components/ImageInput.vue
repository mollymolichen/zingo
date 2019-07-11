<template>
<div>
    <!-- slot for parent component to activate the file changer -->
    <div @click="launchFilePicker()">
        <slot name="activator"></slot>
    </div>
    <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
    <input type="file"
       ref="file"
       :name="uploadFieldName"
       @change="onFileChange($event.target.name, $event.target.files)"
       style="display:none"/>
</div>
</template>

<script>
export default {
    name: 'image-input',
    data: () => ({
        uploadFieldName: 'file',
    }),
    props: {
        // Use "value" here to enable compatibility with v-model
        value: Object,
	},
	props: ['onFileChanged', 'setFormData'],
    methods: {
        launchFilePicker() {
            this.$refs.file.click();
		},
		
        onFileChange(fieldName, file) {
            let imageFile = file[0];
            if (file.length > 0) {
				let formData = new FormData()
				let imageURL = URL.createObjectURL(imageFile)
                formData.append(fieldName, imageFile)
                formData.fieldName = fieldName;
                formData.imageFile = imageFile;
                this.setFormData(formData, imageURL);
				this.$emit('input', {
					formData,
					imageURL
				});
            }
        }
    }
}
</script>