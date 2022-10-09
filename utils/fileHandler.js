const { google } = require('googleapis');
const { Readable } = require('stream');
module.exports = class fileHandler {
    constructor() {
        const KEYFILEPATH = `${__dirname}/../sommer-gdrive-key.json`;
        const SCOPES = ['https://www.googleapis.com/auth/drive'];

        const auth = new google.auth.GoogleAuth({
            keyFile: KEYFILEPATH,
            scopes: SCOPES,
        });
        this.service = google.drive({ version: 'v3', auth });
    }
    createNewFolder = async function (folderName, parent) {
        try {
            const fileMetaData = {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
                parents: [parent]
            };
            const file = await this.service.files.create({
                resource: fileMetaData,
                fields: 'id',
            })
            return file.data.id;
        }
        catch (err) {
            console.log(err);
        }
    };
    getAllFiles = async function () {
        try {
            const response = await this.service.files.list();
            const files = response.data.files.map(function (file) {
                return file
            });
            return files;
        } catch (err) {
            console.log(err);
        }
    };
    printAllFiles = async function () {
        try {
            const response = await this.service.files.list();
            const files = response.data.files.map(function (file) {
                return file
            });
            console.log(files);
        } catch (err) {
            console.log(err);
        }
    };
    deleteAllFiles = async function () {
        try {
            const response = await this.service.files.list();
            let files = response.data.files.map(function (file) {
                return file
            });
            files = files.filter(file => {
                return (file.id !== process.env.SOMMER_FOLDER)
            })
            Promise.all(files.map(async file => {
                await this.deleteFile(file.id);
                console.log(`deleted ${file.name}`);
            }))
        } catch (err) {
            console.log(err);
        }
    };
    deleteFile = async function (fileId) {
        try {
            if (!fileId) return;
            const response = await this.service.files.delete({
                fileId
            })

        } catch (err) {
            console.log(err);
        }
    }
    uploadSubtaskFile = async function (file, name, parent) {
        try {
            const fileMetaData = {
                name,
                parents: [parent]
            }
            let media = {
                mimeType: file.mimetype,
                body: Readable.from(file.buffer)
            }
            const response = await this.service.files.create({
                resource: fileMetaData,
                media,
                fields: 'id'
            })

            return response;
        }
        catch (err) {
            console.log(err);
        }

    }
    downloadFile = async function (fileId) {
        try {
            const file = await this.service.files.get({
                fileId,
                alt: 'media'
            })
            return file;
        } catch (err) {
            console.log(err);
        }
    };
}