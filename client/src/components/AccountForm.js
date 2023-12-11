import { useCookies } from 'react-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IonButton } from '@ionic/react';
import axios from 'axios'

const AccountForm = () => {
  const [cookies] = useCookies(['user']);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    last_name: "",
    d_day_dob: "",
    d_month_dob: "",
    d_year_dob: "",
    phone: "",
    address_no: "",
    address_post: "",
    address_street: "",
    address_city: "",
    address_country: "",
    avatar: ""
  })

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    console.log('submitted')
    e.preventDefault()
    try {
      const response = await axios.put('//' + process.env.REACT_APP_API_HOST + '/user', { formData })
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

  return (
    <div className="create-account">
      <div className='account-form'>
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">*Name</label>
            <div className="multiple-input">
              <input
                id="first_name"
                type='text'
                name="first_name"
                placeholder="First Name"
                required
                value={formData.first_name}
                onChange={handleChange}
              />
              <input
                id="last_name"
                type='text'
                name="last_name"
                placeholder="Last Name"
                required
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <label>*Date of birth</label> {/*birthday*/}
            <div className="multiple-input">
              <input
                id="d_day_dob"
                type="number"
                name="d_day_dob"
                placeholder="DD"
                required
                value={formData.d_day_dob}
                onChange={handleChange}
              />
              <input
                id="d_month_dob"
                type="number"
                name="d_month_dob"
                placeholder="MM"
                required
                value={formData.d_month_dob}
                onChange={handleChange}
              />
              <input
                id="d_year_dob"
                type="number"
                name="d_year_dob"
                placeholder="YYYY"
                required
                value={formData.d_year_dob}
                onChange={handleChange}
              />
            </div>
            <label htmlFor="phone">*Mobile number</label>
            <input
              id="phone"
              type="number"
              name="phone"
              placeholder="Mobile no."
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <label htmlFor='address_no'>*Address</label>
            <div className="multiple-input">
              <input
                id="address_no"
                type='text'
                name="address_no"
                placeholder="Address line 1"
                required
                value={formData.address_no}
                onChange={handleChange}
              />
              <input
                id="address_post"
                type='text'
                name="address_post"
                placeholder="Postcode"
                required
                value={formData.address_post}
                onChange={handleChange}
              />
            </div>
            <input
              id="address_street"
              type='text'
              name="address_street"
              placeholder="Street"
              required
              value={formData.address_street}
              onChange={handleChange}
            />
            <input
              id="address_city"
              type='text'
              name="address_city"
              placeholder="City"
              required
              value={formData.address_city}
              onChange={handleChange}
            />
            <input
              id="address_country"
              type='text'
              name="address_country"
              placeholder="Country"
              required
              value={formData.address_country}
              onChange={handleChange}
            />
            <label>Picture (optional)</label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              onChange={handleChange}
            />
            <div className="container-for-picture">
              {formData.avatar && <img src={formData.avatar} alt="avatar" />}
            </div>
            
            <div className="submit-btn">
              <IonButton type="submit">Submit</IonButton>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}
export default AccountForm
