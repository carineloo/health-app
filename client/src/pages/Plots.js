// imports
import Nav from '../components/Nav'
import { useCookies } from 'react-cookie'

const Plots = () => {

  const [cookies] = useCookies(['user'])
  const authToken = cookies.AuthToken

  return (
    <>
      <Nav authToken={authToken} />
      <div className="plots">
        Plots go here.
      </div>
    </>
  )
}

export default Plots
