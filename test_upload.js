import fs from 'fs';

async function testUpload() {
    const formData = new FormData();
    formData.append('tags', 'portrait');
    formData.append('image', new Blob([fs.readFileSync('package.json')]), 'package.json');

    try {
        console.log('Uploading...');
        const response = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        console.log('Upload response:', data);
    } catch (error) {
        console.error('Upload failed:', error);
    }
}

testUpload();
