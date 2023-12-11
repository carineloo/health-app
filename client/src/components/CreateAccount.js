import { IonButton } from '@ionic/react';

const CreateAccount = ({handleSubmit, setEmail, setPassword, setConfirmPassword, message}) => {

  return (
    <div className="account-form">
    <h2>Create Account</h2>
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
      <input
        type="password"
        id="check-password"
        name="check-password"
        placeholder="confirm passsword..."
        required={true}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className="submit-btn">
        <IonButton type="submit">Submit</IonButton>
      </div>                  
      <p id="error-msg">{message}</p>
    </form>
  </div>
  )
}
export default CreateAccount
