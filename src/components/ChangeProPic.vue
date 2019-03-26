<template>
<div class="photo-upload">
    <br>
    <h3>Upload a profile picture.</h3>
    <h4>Press Upload to make sure your file was uploaded successfully.</h4>
    <br>
    <input type="file" @change="onFileChanged">
    <v-btn @click="onUpload">Upload</v-btn>
    <h3 v-if="uploadFinished" id="green">Uploaded successfully</h3>
</div>
</template>

<script>
/*eslint-disable*/

export default {
    methods: {
        // file uploading
        onFileChanged(event) {
            console.log("Files: ", event.target.files);
            this.selectedFile = event.target.files[0];
            console.log("Selected file: ", this.selectedFile);
        },

        onUpload() {
            const storageRef = Firebase.storage().ref();
            var file = this.selectedFile;
            var metadata = {
                contentType: 'image/jpeg'
            };
            var uploadTask = storageRef.child(this.uuid + "/" + file.name).put(file, metadata);
            console.log('upload task', uploadTask);
            let that = this;
            uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED,
                function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case Firebase.storage.TaskState.PAUSED:
                            console.log('Upload is paused');
                            break;
                        case Firebase.storage.TaskState.RUNNING:
                            console.log('Upload is running');
                            break;
                    }
                },
                function (error) {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                },
                async function () {
                    // Upload completed successfully, now we can get the download URL
                    var url = await uploadTask.snapshot.ref.getDownloadURL();
                    console.log('url: ', url);
                    Vue.set(that, 'propicUrl', url);
                    Vue.set(that, 'uploadFinished', true);
                }
            );
        }
    }
}
</script>

<style>
.photo-upload {
    margin-bottom: 70px;
}
</style>
