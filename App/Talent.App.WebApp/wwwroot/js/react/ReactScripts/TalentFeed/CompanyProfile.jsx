import React from 'react';
import { Loader, Card, Label, Icon, Image, Segment } from 'semantic-ui-react';
import Cookies from 'js-cookie'

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "",
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let employer = null;
                if (res.employer) {
                    employer = res.employer
                }
                this.updateWithoutSave(employer)
            }.bind(this),
            error: function (res) {
                console.log(res.status + "status")
            }
        })
    }

    updateWithoutSave(employer) {
        this.setState({
            company: employer
        })
    }


    render() {
        const { company } = this.state;

        return (
            <Card>
                {company ?
                    <React.Fragment>
                        <Card.Content>
                            <div align='center'>
                                <Image src='/images/square-image.png' size='mini' spaced='center' circular />
                            </div>
                            <br />
                            <Card.Header align='center'>{company.companyContact.name}</Card.Header>
                            <Card.Meta align='center'><Icon name='map marker' />{company.companyContact.location.city},{company.companyContact.location.country}</Card.Meta>
                            <h5>We currently do not have specific skills that we desire</h5>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name='phone' />: {company.companyContact.phone}
                            <br />
                            <Icon name='mail' />: {company.companyContact.email}
                        </Card.Content>
                    </React.Fragment>
                    : null}
            </Card>
        )
    }
}