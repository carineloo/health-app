import { IonButton } from '@ionic/react';

const Login = ({ handleSubmit, setEmail, setPassword, message }) => {

  return (
    <div className="account-form">
      <h2>Log In</h2>
      <div id="center"><hr /></div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email..."
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password..."
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="submit-btn">
          <IonButton type="submit">Submit</IonButton>
        </div>
        <p id="error-msg">{message}</p>
      </form>
    </div>
  )
}
export default Login
