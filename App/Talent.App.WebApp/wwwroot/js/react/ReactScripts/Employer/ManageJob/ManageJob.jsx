import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import moment from 'moment';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, PaginationItem, Container, Icon, Dropdown, Grid, Checkbox, Accordion, Form, Card, Button, Label, Segment } from 'semantic-ui-react';
import CreateJob from '../CreateJob/CreateJob.jsx';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                selectionIndex: "key1",
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPageCount: 1,
            activeIndex: 1
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.selectedStatus = this.selectedStatus.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        this.handleNextItem = this.handleNextItem.bind(this);
        this.handlePrevItem = this.handlePrevItem.bind(this);
        this.handleFirstItem = this.handleFirstItem.bind(this);
        this.handleLastItem = this.handleLastItem.bind(this);
        //your functions go here
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)

        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
        this.loadData();
    };

    //loadData(callback) {
    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        // your ajax call and other logic goes here
        console.log(this.state.sortBy.date);
        let selectionParams = {
            activePage: this.state.activePage,
            sortbyDate: this.state.sortBy.date,
            showActive: this.state.filter.showActive,
            showClosed: this.state.filter.showClosed,
            showDraft: this.state.filter.showDraft,
            showExpired: this.state.filter.showExpired,
            showUnexpired: this.state.filter.showUnexpired
        };
        console.log(selectionParams);

        $.ajax({
            url: 'http://localhost:51689/listing/listing/GetSortedEmployerJobs',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            data: selectionParams,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let jobsData = [];
                if (res.myJobs) {
                    jobsData = res.myJobs
                }
                let totalPage = res.totalPages;
                this.updateWithoutSave(jobsData, totalPage)
            }.bind(this),
            error: function (res) {
                console.log(res.status + "status")
            }
        })
        this.init()
    }

    updateWithoutSave(newData, totalPage) {
        this.setState({
            loadJobs: newData,
            totalPageCount: totalPage
        })
    }

    handlePaginationChange(e, data) {
        this.setState({ activePage: data.activePage + 1 })
    }

    handleNextItem() {
        if (this.state.activePage < this.state.totalPageCount) {
            this.setState({ activePage: this.state.activePage + 1 }, () => this.loadData())
        }

    }

    handlePrevItem() {
        if (this.state.activePage > 1) {
            this.setState({ activePage: this.state.activePage - 1 }, () => this.loadData())
        }

    }

    handleFirstItem() {
        this.setState({ activePage: 1 }, () => this.loadData())

    }

    handleLastItem() {
        if (this.state.totalPageCount > 0) {
            this.setState({ activePage: this.state.totalPageCount }, () => this.loadData())
        }

    }


    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }


    selectedStatus(txt) {
        switch (txt) {
            case 'key2':
                this.setState({
                    filter:
                        { showActive: true, showClosed: false, showDraft: true, showExpired: true, showUnexpired: true, selectionIndex: "key2" }
                    , activePage: 1
                }, (() => this.loadData()))
                break;
            case 'key3':
                this.setState({
                    filter:
                        { showActive: false, showClosed: true, showDraft: true, showExpired: true, showUnexpired: true, selectionIndex: "key3" }
                    , activePage: 1
                }, (() => this.loadData()))
                break;
            case 'key4':
                this.setState({
                    filter:
                        { showActive: true, showClosed: false, showDraft: true, showExpired: true, showUnexpired: true, selectionIndex: "key4" }
                    , activePage: 1
                }, (() => this.loadData()))
                break;
            case 'key5':
                this.setState({
                    filter:
                        { showActive: true, showClosed: true, showDraft: true, showExpired: true, showUnexpired: false, selectionIndex: "key5" }
                    , activePage: 1
                }, (() => this.loadData()))
                break;
            case 'key6':
                this.setState({
                    filter:
                        { showActive: true, showClosed: true, showDraft: true, showExpired: false, showUnexpired: true, selectionIndex: "key6" }
                    , activePage: 1
                }, (() => this.loadData()))
                break;
            default:
                break;
        };

    }

    render() {
        const { loadJobs, totalPageCount } = this.state;
        const datesort = [
            { key: 1, text: 'Newest first', value: "desc" },
            { key: 2, text: 'Oldest first', value: "asce" },
        ]

        const statussort = [
            { key: 1, text: 'Choose filter', value: "key1" },
            { key: 2, text: 'showActive', value: "key2" },
            { key: 3, text: 'showClosed', value: "key3" },
            { key: 4, text: 'showDraft', value: "key4" },
            { key: 5, text: 'showExpired', value: "key5" },
            { key: 6, text: 'showUnexpired', value: "key6" },

        ]


        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <div className="row">
                        <div className="sixteen wide column">
                            <h2>List of Jobs</h2>
                            <Icon name='filter' /> Filter:
                            <Dropdown options={statussort} value={this.state.filter.selectionIndex} onChange={(e, { value }) => {
                                this.selectedStatus(value)
                            }} />
                            <Icon name='calendar alternate' /> Sort by date:
                            <Dropdown options={datesort} value={this.state.sortBy.date} onChange={(e, { value }) => { this.setState({ sortBy: { date: value }, activePage: 1 }, (() => this.loadData())) }} />
                            <div>
                                {totalPageCount > 0 ?
                                    <Card.Group itemsPerRow={2}>
                                        {loadJobs.map(job => (
                                            <Card key={job.id}>
                                                <Card.Content>
                                                    <Card.Header>{job.title}</Card.Header>
                                                    <Label as='a' color='black' ribbon='right'>
                                                        <Icon name='user' />
                                                        {job.noOfSuggestions}
                                                    </Label>
                                                    <Card.Meta>{job.location.city},{job.location.country}</Card.Meta>
                                                    <Card.Description>
                                                        {job.summary}
                                                    </Card.Description>
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                </Card.Content>

                                                <Card.Content extra>
                                                    <Container>
                                                        <Label size='large' color='red'>
                                                            {moment(job.expiryDate) > moment() ? "Active" : "Expired"}
                                                        </Label>
                                                        <Button.Group floated='right'>
                                                            <JobSummaryCard deleteId={job.id} />
                                                            <Button floated='right' basic color='blue' href={"/EditJob/" + job.id}>
                                                                <Icon name='edit' />Edit
                                                            </Button>
                                                            <Button floated='right' basic color='blue' href={"/PostJob/" + job.id}>
                                                                <Icon name='copy' />Copy
                                                            </Button>
                                                        </Button.Group>
                                                    </Container>
                                                </Card.Content>
                                            </Card>
                                        )
                                        )}
                                    </Card.Group>

                                    :

                                    <h3> No Jobs found</h3>

                                }
                            </div>
                            <Pagination
                                ellipsisItem={null}
                                firstItem={{ content: <Icon name='angle double left' />, icon: true, onClick: () => this.handleFirstItem(), value: this.state.activePage }}
                                lastItem={{ content: <Icon name='angle double right' />, icon: true, onClick: () => this.handleLastItem(), value: this.state.activePage }}
                                prevItem={{ content: <Icon name='angle left' />, icon: true, onClick: () => this.handlePrevItem(), value: this.state.activePage }}
                                nextItem={{ content: <Icon name='angle right' />, icon: true, onClick: () => this.handleNextItem(), value: this.state.activePage }}
                                pageItem={{ content: this.state.activePage, value: this.state.activePage }}

                            />

                        </div>
                    </div>
                </div>
            </BodyWrapper>
        )
    }
}