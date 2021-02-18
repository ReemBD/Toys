import { addToy, editToy } from '../store/actions/toyActions.js'
import { toyService } from '../services/toyService.js'
import { Form, Formik, ErrorMessage, Field } from 'formik'
import Button from '@material-ui/core/button'
import { TextField } from '@material-ui/core';
import { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { doNotification } from '../store/actions/modalActions.js'
import { Title } from '../cmps/Title.jsx'
import Uploader from '../cmps/Uploader.jsx'

class _ToyEdit extends Component {
    state = {
        toy: {
            name: '',
            price: '',
            type: '',
            inStock: false
        }
    }

    componentDidMount() {
        const toyId = this.props.match.params.toyId
        if (toyId) {
            const toy = this.props.toys
                .find(toy => toy._id === toyId)
            this.setState({ toy })
        }
    }

    onSaveToy = (toy) => {
        console.log('toy to save: ', toy)
        if (!toy._id) {
            toyService.save(toy)
                .then(toy => {
                    this.props.addToy(toy)
                    this.props.doNotification(`Added ${toy.name}`)
                })
                .then(() => { this.props.history.push('/') })

        }
        else {
            toyService.save(toy)
                .then(toy => {
                    console.log('toy: ', toy);
                    this.props.editToy(toy)
                    this.props.doNotification(`Editted ${toy.name}`)

                })
                .catch(err => {
                    console.log('err: ', err);
                }
                )
                .then(() => { this.props.history.push('/') })
        }
    }

    validate = (values) => {
        const errors = {}
        if (!values.name) {
            errors.name = 'Required'
        }
    }

    onFinishUpload = async (url) => {
        const toyCopy = { ...this.state.toy, imgUrl: url }
        this.setState({ toy: toyCopy })
    }

    render() {
        const { toy } = this.state
        if (!toy) return <h1>loading...</h1>
        return (
            <Formik enableReinitialize={true}
                initialValues={toy}
                validate={this.validate}
                onSubmit={this.onSaveToy}>

                {() => (
                    <Fragment>
                        <Title classNames="title">{toy._id ? 'Edit' : 'Add'} Toy</Title>
                        <div className="toy-edit" >
                            <Form className=" frm">
                                <div className="grid-container grid">
                                    <div className="col-labels flex flex-column">
                                        <label htmlFor="name" >Name:</label>
                                        <label htmlFor="price">Price:</label>
                                        <label htmlFor="type" className="type-label">Type:</label>
                                        <label htmlFor="inStock" >In stock:</label>
                                    </div>
                                    <div className="col-inputs flex flex-column">
                                        <Field type="text" name="name" id="name" placeholder="Name: " as={TextField} />
                                        <ErrorMessage name="name" />
                                        <Field type="number" name="price" id="price" placeholder="Price: " as={TextField} />
                                        <Field as="select" className="type-input" name="type" id="type">
                                            <option value="Children">Children</option>
                                            <option value="Adult">Adults</option>
                                            <option value="Cute">Cute</option>
                                            <option value="Attractive">Attractive</option>
                                        </Field>
                                        <Field type="checkbox" className="inStock-input" name="inStock" />
                                    </div>
                                    <Uploader onFinishUpload={this.onFinishUpload}></Uploader>
                                    <Button type="submit" className="save-btn" color="primary" variant="contained">Save</Button>
                                </div>

                            </Form>
                        </div>
                    </Fragment>
                )}
            </Formik>
        )
    }
}

const mapStateToProps = state => {
    const { toys } = state.toy
    return {
        toys
    }
}

const mapDispatchToProps = {
    addToy,
    editToy,
    doNotification
}

export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit)