/* Photo upload section */
import React, { Component } from 'react';
import { Image, Icon, Button, Input, Label } from 'semantic-ui-react'
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            changePhotoSection: false,
            file: " ",
            imagePreviewUrl: "  "
        }

        this.updatePhoto = this.updatePhoto.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)



    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            imagePreviewUrl: nextProps.imageId
        })
    }

    updatePhoto() {

        var url = this.props.savePhotoUrl;
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: url,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.imagePreviewUrl),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Profile Photo updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile Photo did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res.success + "errormess")
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }


    handleSubmit(e) {
        e.preventDefault();
        this.updatePhoto()
        this.setState({
            changePhotoSection: false
        })
    }

    handleChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                changePhotoSection: true,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let { imagePreviewUrl } = this.state;
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <div className="add-media">
                        {this.state.changePhotoSection ?
                            <React.Fragment>
                                <div className="imgPreview">
                                    <Image for="myuniqueid" className="profileImg" src={imagePreviewUrl} size='small' circular />
                                    <br />
                                    <br />
                                    <Button hidden='true' className="submitButton"
                                        type="submit"
                                        onClick={(e) => this.handleSubmit(e)}>Upload Image</Button>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Input id="myuniqueid" dispaly='none' className="fileInput"
                                    type="file"
                                    onChange={(e) => this.handleChange(e)}
                                />
                                <label for="myuniqueid">
                                    {imagePreviewUrl ?
                                        <Image className="profileImg" src={imagePreviewUrl} size='small' circular />
                                        :
                                        <Icon name='camera' circular />
                                    }
                                </label>
                            </React.Fragment>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

