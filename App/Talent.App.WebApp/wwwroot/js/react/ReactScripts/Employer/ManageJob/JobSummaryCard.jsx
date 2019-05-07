import React from 'react';
import Cookies from 'js-cookie';
import { Popup, Card, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            loaderData: loaderData
        };

    }

    componentDidMount() {
        this.selectJob()
    }


    selectJob(id) {
        //var id = this.props.deleteId
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:51689/listing/listing/closeJob',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(id),
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show(res.message, "success", null, null);
                    window.location = "/ManageJobs";

                }
            }.bind(this),

            error: function (res) {
                console.log(res.status + "status")
            }
        })
    }

    render() {
       

        return (
            <Button floated='right' basic color='blue' onClick={() => { this.selectJob(this.props.deleteId)}}>
                <Icon name='ban' />Close
            </Button>  
            
        )
    }

}