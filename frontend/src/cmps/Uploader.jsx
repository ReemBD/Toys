import { Component } from 'react'
import { cloudinaryService } from '../services/cloudinaryService.js'
import Button from '@material-ui/core/button'

export default class Uploader extends Component {
    state = {
        imgUrl: null,
        width: 200,
        height: 250,
        isUploading: false
    }
    onUploadImg = async ev => {
        this.setState({ isUploading: true })
        console.log('ev.target.files', ev.target.files[0])
        const { secure_url, height, width } = await cloudinaryService.uploadImg(ev.target.files[0])
        this.setState({ imgUrl: secure_url, isUploading: false })
        this.props.onFinishUpload(secure_url)
    }
    render() {
        const { imgUrl, isUploading, height, width } = this.state
        const uploadStyle = {
            backgroundImage: `url(${imgUrl})`,
            height: height + 'px',
            width: width + 'px'
        }
        return (
            <div className="uploader flex align-center justify-center"
                style={uploadStyle}>
                <label className="upload-label" htmlFor="imageUploader">
                    {isUploading ? 'Uploading....' : 'Upload Image'}
                </label>
                <input onChange={this.onUploadImg} hidden
                    type="file" accept="image/*" id="imageUploader" />
            </div>
        )
    }
}
