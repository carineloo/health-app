import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditAccForm = ({ user }) => {
    const [formData, setFormData] = useState(user);

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8080/user', { formData })
            const success = response.status === 200
            if (success) navigate('/myaccount')
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    // close button 
    const handleClose = () => {
        navigate('/myaccount')
        window.location.reload()
    }

    return (
        <div className="create-account edit-acc-form">
            <div className='account-form'>
                <div className="close-section">
                    <button id="close" onClick={handleClose}>ⓧ <span>close</span></button>
                </div>
                <h2>Please modify your changes.</h2>
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">Name</label>
                        <div className="multiple-input">
                            <input
                                id="first_name"
                                type='text'
                                name="first_name"
                                placeholder="First Name"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            <input
                                id="last_name"
                                type='text'
                                name="last_name"
                                placeholder="Last Name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </div>
                        <label>Date of birth</label> {/*birthday*/}
                        <div className="multiple-input">
                            <input
                                id="d_day_dob"
                                type="number"
                                name="d_day_dob"
                                placeholder="DD"
                                value={formData.d_day_dob}
                                onChange={handleChange}
                            />
                            <input
                                id="d_month_dob"
                                type="number"
                                name="d_month_dob"
                                placeholder="MM"
                                value={formData.d_month_dob}
                                onChange={handleChange}
                            />
                            <input
                                id="d_year_dob"
                                type="number"
                                name="d_year_dob"
                                placeholder="YYYY"
                                value={formData.d_year_dob}
                                onChange={handleChange}
                            />
                        </div>
                        <label htmlFor="phone">Mobile number</label>
                        <input
                            id="phone"
                            type="number"
                            name="phone"
                            placeholder="Mobile no."
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <label>Address</label>
                        <div className="multiple-input">
                            <input
                                id="address_no"
                                type='text'
                                name="address_no"
                                placeholder="Address line 1"
                                value={formData.address_no}
                                onChange={handleChange}
                            />
                            <input
                                id="address_post"
                                type='text'
                                name="address_post"
                                placeholder="Postcode"
                                value={formData.address_post}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            id="address_street"
                            type='text'
                            name="address_street"
                            placeholder="Street"
                            value={formData.address_street}
                            onChange={handleChange}
                        />
                        <input
                            id="address_city"
                            type='text'
                            name="address_city"
                            placeholder="City"
                            value={formData.address_city}
                            onChange={handleChange}
                        />
                        <input
                            id="address_country"
                            type='text'
                            name="address_country"
                            placeholder="Country"
                            value={formData.address_country}
                            onChange={handleChange}
                        />
                        <label>Picture (optional)</label>
                        <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            accept=".png, .jpg, .jpeg"
                            value={formData.avatar}
                            onChange={handleChange}
                        />
                        <div className="container-for-picture">
                            {formData.avatar && <img src={formData.avatar} alt="avatar" />}
                        </div>

                        <div id="ca-submit" >
                            <input type="submit" value="Update"/>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}
export default EditAccForm